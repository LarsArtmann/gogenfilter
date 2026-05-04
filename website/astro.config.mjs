import { defineConfig, fontProviders } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://gogenfilter.lars.software",
  compressHTML: true,

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
            { label: "Installation", slug: "getting-started/installation" },
            { label: "Quick Start", slug: "getting-started/quick-start" },
          ],
        },
        {
          label: "Guides",
          items: [
            { label: "Filter Options", slug: "guides/filter-options" },
            { label: "Pattern Matching", slug: "guides/pattern-matching" },
            { label: "Metrics", slug: "guides/metrics" },
            { label: "SQLC Config Discovery", slug: "guides/sqlc-config" },
            { label: "Custom Filesystems", slug: "guides/custom-filesystem" },
            { label: "Benchmarks", slug: "guides/benchmarks" },
          ],
        },
        {
          label: "API Reference",
          items: [
            { label: "Filter", slug: "api/filter" },
            { label: "Detection", slug: "api/detection" },
            { label: "Types", slug: "api/types" },
            { label: "Errors", slug: "api/errors" },
          ],
        },
        {
          label: "Supported Generators",
          slug: "generators",
        },
        {
          label: "Known Limitations",
          slug: "limitations",
        },
        {
          label: "Community",
          items: [
            { label: "Changelog", slug: "changelog" },
            { label: "Contributing", slug: "contributing" },
            { label: "Related Tools", slug: "related-tools" },
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
