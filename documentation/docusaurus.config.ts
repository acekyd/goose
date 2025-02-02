import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

require("dotenv").config();

const inkeepApiKey = process.env.INKEEP_API_KEY;
const inkeepIntegrationId = process.env.INKEEP_INTEGRATION_ID;
const inkeepOrgId = process.env.INKEEP_ORG_ID;

const config: Config = {
  title: "codename goose",
  tagline:
    "Your on-machine AI agent, automating engineering tasks seamlessly.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://block.github.io/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/goose/",

  // GitHub pages deployment config.
  organizationName: "block", // Usually your GitHub org/user name.
  projectName: "goose", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  staticDirectories: ["static"],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          exclude: ["**/v1/extensions/**"],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        pages: {
          exclude: ['/v1/extensions/detail/**']
        }
      } satisfies Preset.Options,
    ],
  ],

  themes: ["@inkeep/docusaurus/chatButton", "@inkeep/docusaurus/searchBar"],

  // Updated redirects plugin with wildcard
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: '/docs/getting-started/providers',
            from: '/v1/docs/getting-started/providers',
          },
          {
            to: '/docs/getting-started/installation',
            from: '/v1/docs/getting-started/installation',
          },
          {
            to: '/',
            from: '/v1/',
          }
        ],
      },
    ],
  ],

  themeConfig: {
    image: "img/home-banner.png",
    navbar: {
      title: "",
      logo: {
        alt: "Block Logo",
        src: "img/logo_light.png",
        srcDark: "img/logo_dark.png",
      },
      items: [
        {
          to: "/docs/quickstart",
          label: "Quickstart",
          position: "left",
        },
        {
          to: "/docs/category/getting-started",
          position: "left",
          label: "Docs",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          to: "https://block.github.io/goose/extensions/",
          label: "Extensions",
          position: "left",
        },
        {
          href: "https://discord.gg/block-opensource",
          label: "Discord",
          position: "left",
        },
        {
          href: "https://github.com/block/goose",
          label: "GitHub",
          position: "left",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "Quick Links",
          items: [
            {
              label: "Install Goose",
              to: "docs/getting-started/installation",
            },
            {
              label: "Extensions",
              to: "https://block.github.io/goose/extensions/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.gg/block-opensource",
            },
            {
              label: "YouTube",
              href: "https://www.youtube.com/@blockopensource",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/block-opensource",
            },
            {
              label: "Twitter / X",
              href: "https://x.com/blockopensource",
            },
            {
              label: "BlueSky",
              href: "https://bsky.app/profile/block-opensource.bsky.social",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/block/goose",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Block, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.nightOwl,
    },
    inkeepConfig: {
      baseSettings: {
        apiKey: inkeepApiKey,
        integrationId: inkeepIntegrationId,
        organizationId: inkeepOrgId,
        primaryBrandColor: "#1E1E1E",
      },
      aiChatSettings: {
        chatSubjectName: "goose",
        botAvatarSrcUrl:
          "https://storage.googleapis.com/organization-image-assets/block-botAvatarSrcUrl-1737745528096.png",
        botAvatarDarkSrcUrl:
          "https://storage.googleapis.com/organization-image-assets/block-botAvatarDarkSrcUrl-1737745527450.png",
        getHelpCallToActions: [
          {
            name: "GitHub",
            url: "https://github.com/block/goose",
            icon: {
              builtIn: "FaGithub",
            },
          },
        ],
        quickQuestions: ["What is Goose?"],
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
