import os

import httpx

from exchange import Message, Tool
from exchange.content import Text, ToolResult, ToolUse
from exchange.providers.base import Provider, Usage
from tenacity import retry, wait_fixed, stop_after_attempt
from exchange.providers.utils import retry_if_status, raise_for_status
from exchange.observers import observe_wrapper

ANTHROPIC_HOST = "https://api.anthropic.com/v1/messages"

retry_procedure = retry(
    wait=wait_fixed(2),
    stop=stop_after_attempt(2),
    retry=retry_if_status(codes=[429], above=500),
    reraise=True,
)


class AnthropicProvider(Provider):
    """Provides chat completions for models hosted directly by Anthropic."""

    PROVIDER_NAME = "anthropic"
    REQUIRED_ENV_VARS = ["ANTHROPIC_API_KEY"]

    def __init__(self, client: httpx.Client) -> None:
        self.client = client

    @classmethod
    def from_env(cls: type["AnthropicProvider"]) -> "AnthropicProvider":
        cls.check_env_vars()
        url = os.environ.get("ANTHROPIC_HOST", ANTHROPIC_HOST)
        key = os.environ.get("ANTHROPIC_API_KEY")
        client = httpx.Client(
            base_url=url,
            headers={
                "x-api-key": key,
                "content-type": "application/json",
                "anthropic-version": "2023-06-01",
            },
            timeout=httpx.Timeout(60 * 10),
        )
        return cls(client)

    @staticmethod
    def get_usage(data: dict) -> Usage:  # noqa: ANN401
        usage = data.get("usage")
        input_tokens = usage.get("input_tokens")
        output_tokens = usage.get("output_tokens")
        total_tokens = usage.get("total_tokens")

        if total_tokens is None and input_tokens is not None and output_tokens is not None:
            total_tokens = input_tokens + output_tokens

        return Usage(
            input_tokens=input_tokens,
            output_tokens=output_tokens,
            total_tokens=total_tokens,
        )

    @staticmethod
    def anthropic_response_to_message(response: dict) -> Message:
        content_blocks = response.get("content", [])
        content = []
        for block in content_blocks:
            if block["type"] == "text":
                content.append(Text(text=block["text"]))
            elif block["type"] == "tool_use":
                content.append(
                    ToolUse(
                        id=block["id"],
                        name=block["name"],
                        parameters=block["input"],
                    )
                )
        return Message(role="assistant", content=content)

    @staticmethod
    def tools_to_anthropic_spec(tools: tuple[Tool, ...]) -> list[dict[str, any]]:
        return [
            {
                "name": tool.name,
                "description": tool.description or "",
                "input_schema": tool.parameters,
            }
            for tool in tools
        ]

    @staticmethod
    def messages_to_anthropic_spec(messages: list[Message]) -> list[dict[str, any]]:
        messages_spec = []
        # if messages is empty - just make a default
        for message in messages:
            converted = {"role": message.role}
            for content in message.content:
                if isinstance(content, Text):
                    converted["content"] = [{"type": "text", "text": content.text}]
                elif isinstance(content, ToolUse):
                    converted.setdefault("content", []).append(
                        {
                            "type": "tool_use",
                            "id": content.id,
                            "name": content.name,
                            "input": content.parameters,
                        }
                    )
                elif isinstance(content, ToolResult):
                    converted.setdefault("content", []).append(
                        {
                            "type": "tool_result",
                            "tool_use_id": content.tool_use_id,
                            "content": content.output,
                        }
                    )
            messages_spec.append(converted)
        if len(messages_spec) == 0:
            converted = {
                "role": "user",
                "content": [{"type": "text", "text": "Ignore"}],
            }
            messages_spec.append(converted)
        return messages_spec

    @observe_wrapper(as_type="generation")
    def complete(
        self,
        model: str,
        system: str,
        messages: list[Message],
        tools: list[Tool] = None,
        **kwargs: dict[str, any],
    ) -> tuple[Message, Usage]:
        if tools is None:
            tools = []
        tools_set = set()
        unique_tools = []
        for tool in tools:
            if tool.name not in tools_set:
                unique_tools.append(tool)
                tools_set.add(tool.name)

        payload = dict(
            system=system,
            model=model,
            max_tokens=4096,
            messages=self.messages_to_anthropic_spec(messages),
            tools=self.tools_to_anthropic_spec(tuple(unique_tools)),
            **kwargs,
        )
        payload = {k: v for k, v in payload.items() if v}

        response = self._post(payload)
        message = self.anthropic_response_to_message(response)
        usage = self.get_usage(response)

        return message, usage

    @staticmethod
    def recommended_models() -> tuple[str, str]:
        """Return the recommended model and processor for this provider"""
        return "claude-3-5-sonnet-20241022", "claude-3-5-sonnet-20241022"

    @retry_procedure
    def _post(self, payload: dict) -> httpx.Response:
        response = self.client.post(ANTHROPIC_HOST, json=payload)
        return raise_for_status(response).json()
