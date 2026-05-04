import { defineConfig, fontProviders } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://gogenfilter.lars.software",

  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Space Grotesk",
      cssVariable: "--font-space-grotesk",
      weights: [300, 400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["monospace"],
    },
  ],

  integrations: [
    sitemap(),
    starlight({
      title: "gogenfilter",
      favicon: "/favicon.svg",
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Installation", slug: "docs/getting-started/installation" },
            { label: "Quick Start", slug: "docs/getting-started/quick-start" },
          ],
        },
        {
          label: "Guides",
          items: [
            { label: "Filter Options", slug: "docs/guides/filter-options" },
            { label: "Pattern Matching", slug: "docs/guides/pattern-matching" },
            { label: "Metrics", slug: "docs/guides/metrics" },
            { label: "SQLC Config Discovery", slug: "docs/guides/sqlc-config" },
            { label: "Custom Filesystems", slug: "docs/guides/custom-filesystem" },
            { label: "Benchmarks", slug: "docs/guides/benchmarks" },
          ],
        },
        {
          label: "API Reference",
          items: [
            { label: "Filter", slug: "docs/api/filter" },
            { label: "Detection", slug: "docs/api/detection" },
            { label: "Types", slug: "docs/api/types" },
            { label: "Errors", slug: "docs/api/errors" },
          ],
        },
        {
          label: "Supported Generators",
          slug: "docs/generators",
        },
        {
          label: "Known Limitations",
          slug: "docs/limitations",
        },
        {
          label: "Community",
          items: [
            { label: "Changelog", slug: "docs/changelog" },
            { label: "Contributing", slug: "docs/contributing" },
            { label: "Related Tools", slug: "docs/related-tools" },
          ],
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/LarsArtmann/gogenfilter",
        },
      ],
      head: [
        {
          tag: "meta",
          attrs: {
            name: "description",
            content:
              "Detect and filter auto-generated Go code files. Built for linters, static analysis tools, and code quality tools.",
          },
        },
      ],
    }),
  ],

  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
