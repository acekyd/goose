<h1 align="center">
Goose is your on-machine developer agent, working for you, on your terms
</h1>

<p align="center">
  <img src="docs/assets/goose.png" width="400" height="400" alt="Goose Drawing"/>
</p>
<p align="center">
  Generated by Goose from its <a href="https://github.com/block-open-source/goose-plugins/blob/main/src/goose_plugins/toolkits/artify.py">VincentVanCode toolkit</a>.
</p>

<p align="center">
  <a href="https://block.github.io/goose/">
    <img src="https://img.shields.io/badge/Documentation-goose_docs-teal">
  </a>
  <a href=https://pypi.org/project/goose-ai>
    <img src="https://img.shields.io/pypi/v/goose-ai?color=green">
  </a>
  <a href="https://opensource.org/licenses/Apache-2.0">
    <img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg">
  </a>
  <a href="https://discord.gg/7GaTvbDwga">
    <img src="https://img.shields.io/discord/1287729918100246654?logo=discord&logoColor=white&label=Join+Us&color=blueviolet" alt="Discord">
  </a>
</p>

<p align="center">
<a href="#unique-features-of-goose-compared-to-other-ai-assistants">Unique features</a> 🤖 •
<a href="#what-users-have-to-say-about-goose"> Testimonials on Goose</a> 👩‍💻 •
<a href="#quick-start-guide">Quick start guide</a> 🚀 •
<a href="#getting-involved">Getting involved!</a> 👋
</p>

> [!TIP]
> **Quick install:**
> ```
> pipx install goose-ai
> ```

Each day, we have tasks that stretch our days. Maybe it is completing that half-complete change started by someone now
on holiday, or figuring out the tl;dr; of that 50 comment pull request. Wouldn't it be grand if someone else can do
this, or at least start the work for us?

**Goose** is your on-machine developer agent, working for you, on your terms. Guided by you, Goose intelligently
assesses what you need and generates required code or modifications. You are in charge: Do you prefer Goose to make a
draft, or complete the change entirely? Do you prefer to work in a terminal or in your IDE?

Doing our work requires a lot of tools like Jira, GitHub, Slack, as well APIs for infrastructure and data pipelines.
Goose handles all of these, and is extensible. Goose can run anything invokable by a shell command, Python or a plugin.

Like semi-autonomous driving, Goose handles the heavy lifting, allowing you to focus on other priorities. Simply set it
on a task and return later to find it completed, boosting your productivity with less manual effort. Read on to get
started!

<p align="center">
  <video src="https://github.com/user-attachments/assets/63ee7910-cb02-45c0-9982-351cbce83925" width="700" height="700" />
</p>



## Unique features of Goose compared to other AI assistants

- **Autonomy**: A copilot should be able to also fly the plane at times, which in the development world means running code, debugging tests, installing dependencies, not just providing text output and autocomplete or search. Goose moves beyond just generating code snippets by (1) **using the shell** and (2) by seeing what happens with the code it writes and starting a feedback loop to solve harder problems, **refining solutions iteratively like a human developer**. Your code's best wingman.

- **Extensibility**: Open-source and fully customizable, Goose integrates with your workflow and allows you to extend it for even more control. **Toolkits let you add new capabilities to Goose.** They are anything you can implement as a Python function (e.g. API requests, deployments, search, etc). We have a growing library of toolkits to use, but more importantly you can create your own. This gives Goose the ability to run these commands and decide if and when a tool is needed to complete your request! **Creating your own toolkits give you a way to bring your own private context into Goose's capabilities.**  And you can use *any* LLM you want under the hood, as long as it supports tool use.

## What users have to say about Goose

> With Goose, I feel like I am Maverick.
>
> Thanks a ton for creating this. 🙏
> I have been having way too much fun with it today.

-- P, Machine Learning Engineer


> I wanted to construct some fake data for an API with a large request body and business rules I haven't memorized. So I told Goose which object to update and a test to run that calls the vendor. Got it to use the errors descriptions from the vendor response to keep correcting the request until it was successful. So good!

-- J, Software Engineer


> I asked Goose to write up a few Google Scripts that mimic Clockwise's functionality (particularly, creating blocks on my work calendar based on events in my personal calendar, as well as color-coding calendar entries based on type and importance). Took me under an hour. If you haven't tried Goose yet, I highly encourage you to do so!

-- M, Software Engineer


> If anyone was looking for another reason to check it out: I just asked Goose to break a string-array into individual string resources across eleven localizations, and it performed amazingly well and saved me a bunch of time doing it manually or figuring out some way to semi-automate it.

-- A, Android Engineer


> Hi team, thank you for much for making Goose, it's so amazing. Our team is working on migrating Dashboard components to React components. I am working with Goose to help the migration.

-- K, Software Engineer


> Got Goose to update a dependency, run tests, make a branch and a commit... it was 🤌. Not that complicated but I was impressed it figured out how to run tests from the README.

--  J, Software Engineer


> Wanted to document what I had Goose do -- took about 30 minutes end to end! I created a custom CLI command in the `gh CLI` library to download in-line comments on PRs about code changes (currently they aren't directly viewable). I don't know Go *that well* and I definitely didn't know where to start looking in the code base or how to even test the new command was working and Goose did it all for me 😁

-- L, Software Engineer


> Hi Team, just wanted to share my experience of using Goose as a non-engineer! ... I just asked Goose to ensure that my environment is up to date and copied over a guide into my prompt. Goose managed everything flawlessly, keeping me informed at every step... I was truly impressed with how well it works and how easy it was to get started! 😍

-- M, Product Manager

**See more of our use-cases in our [docs][use-cases]!**

## Quick start guide

### Installation

To install Goose, use `pipx`. First ensure [pipx][pipx] is installed:

``` sh
brew install pipx
pipx ensurepath
```

Then install Goose:

```sh
pipx install goose-ai
```

### Running Goose

#### Start a session

From your terminal, navigate to the directory you'd like to start from and run:

```sh
goose session start
```

#### Set up a provider
Goose works on top of LLMs and by default, it uses `openai` as the LLM provider but you can customize it as needed. You'll be prompted to set an [OPENAI_API_KEY][openai-key] if you haven't set one previously.

>[!TIP]
> **Billing:**
>
> You will need to add credits to your Open AI accounts to be able to successfully make requests.
>


#### Make Goose do the work for you
You will see the Goose prompt `G❯`:

```
G❯ type your instructions here exactly as you would tell a developer.
```

Now you are interacting with Goose in conversational sessions - think of it as like giving direction to a junior developer. The default toolkit allows Goose to take actions through shell commands and file edits. You can interrupt Goose with `CTRL+D` or `ESC+Enter` at any time to help redirect its efforts.

> [!TIP]
> You can place a `.goosehints` text file in any directory you launch goose from to give it some background info for new sessions in plain language (eg how to test, what instructions to read to get started or just tell it to read the README!) You can also put a global one `~/.config/goose/.goosehints` if you like for always loaded hints personal to you.

### Running a goose tasks (one off)

You can run goose to do things just as a one off, such as tidying up, and then exiting:

```sh
goose run instructions.md
```

You can also use process substitution to provide instructions directly from the command line:

```sh
goose run <(echo "Create a new Python file that prints hello world")
```

This will run until completion as best it can. You can also pass `--resume-session` and it will re-use the first session it finds for context


#### Exit the session

If you are looking to exit, use `CTRL+D`, although Goose should help you figure that out if you forget.

#### Resume a session

When you exit a session, it will save the history in `~/.config/goose/sessions` directory and you can resume it later on:

``` sh
goose session resume
```

To see more documentation on the CLI commands currently available to Goose check out the documentation [here][cli]. If you’d like to develop your own CLI commands for Goose, check out the [Contributing document][contributing].

### Tracing with Langfuse
> [!NOTE]
> This Langfuse integration is experimental and we don't currently have integration tests for it.

The exchange package provides a [Langfuse](https://langfuse.com/) wrapper module. The wrapper serves to initialize Langfuse appropriately if the Langfuse server is running locally and otherwise to skip applying the Langfuse observe descorators.

#### Start your local Langfuse server

Run `just langfuse-server` to start your local Langfuse server. It requires Docker.

Read more about local Langfuse deployments [here](https://langfuse.com/docs/deployment/local).

#### Exchange and Goose integration

Import `from exchange.observers import observe_wrapper`, include `langfuse` in the `observers` list of your profile, and use the `observe_wrapper()` decorator on functions you wish to enable tracing for. `observe_wrapper` functions the same way as Langfuse's observe decorator.

Read more about Langfuse's decorator-based tracing [here](https://langfuse.com/docs/sdk/python/decorators).

In Goose, initialization requires certain environment variables to be present:

- `LANGFUSE_PUBLIC_KEY`: Your Langfuse public key
- `LANGFUSE_SECRET_KEY`: Your Langfuse secret key
- `LANGFUSE_BASE_URL`: The base URL of your Langfuse instance

By default your local deployment and Goose will use the values in `.env.langfuse.local`.



### Next steps

Learn how to modify your Goose profiles.yaml file to add and remove functionality (toolkits) and providing context to get the most out of Goose in our [Getting Started Guide][getting-started].

## Other ways to run goose

**Want to move out of the terminal and into an IDE?**

We have some experimental IDE integrations for VSCode and JetBrains IDEs:
* https://github.com/square/goose-vscode
* https://github.com/Kvadratni/goose-intellij

**Goose as a Github Action**

There is also an experimental Github action to run goose as part of your workflow (for example if you ask it to fix an issue):
https://github.com/marketplace/actions/goose-ai-developer-agent

**With Docker**

There is also a `Dockerfile` in the root of this project you can use if you want to run goose in a sandboxed fashion.

## Getting involved!

There is a lot to do! If you're interested in contributing, a great place to start is picking a `good-first-issue`-labelled ticket from our [issues list][gh-issues]. More details on how to develop Goose can be found in our [Contributing Guide][contributing]. We are a friendly, collaborative group and look forward to working together![^1]


Check out and contribute to more experimental features in [Goose Plugins][goose-plugins]!

Let us know what you think in our [Discussions][discussions] or the [**`#goose`** channel on Discord][goose-channel].

[^1]: Yes, Goose is open source and always will be. Goose is released under the ASL2.0 license meaning you are free to use it however you like.  See [LICENSE.md][license] for more details.



[goose-plugins]: https://github.com/block-open-source/goose-plugins

[pipx]: https://github.com/pypa/pipx?tab=readme-ov-file#install-pipx
[contributing]: https://github.com/block/goose/blob/main/CONTRIBUTING.md
[license]: https://github.com/block/goose/blob/main/LICENSE

[goose-docs]: https://block.github.io/goose/
[toolkits]: https://block.github.io/goose/plugins/available-toolkits.html
[configuration]: https://block.github.io/goose/configuration.html
[cli]: https://block.github.io/goose/plugins/cli.html
[providers]: https://block.github.io/goose/providers.html
[use-cases]: https://block.github.io/goose/guidance/applications.html
[getting-started]: https://block.github.io/goose/guidance/getting-started.html
[openai-key]: https://platform.openai.com/api-keys

[discord-invite]: https://discord.gg/7GaTvbDwga
[gh-issues]: https://github.com/block/goose/issues
[van-code]: https://github.com/block-open-source/goose-plugins/blob/de98cd6c29f8e7cd3b6ace26535f24ac57c9effa/src/goose_plugins/toolkits/artify.py
[discussions]: https://github.com/block/goose/discussions
[goose-channel]: https://discord.com/channels/1287729918100246654/1287729920319033345
