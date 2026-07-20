import { defineConfig, fontProviders } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://gogenfilter.lars.software",
  security: {
    csp: {
      scriptDirective: {
        resources: ["'self'"],
      },
      styleDirective: {
        resources: ["'self'", "'unsafe-inline'"],
      },
    },
  },

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
      customCss: ["./src/styles/starlight.css"],
      expressiveCode: {
        themes: ["github-light", "dracula"],
        frames: {
          showCopyToClipboardButton: true,
        },
      },
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
            { label: "SQLC Config Discovery", slug: "guides/sqlc-config" },
            { label: "Custom Filesystems", slug: "guides/custom-filesystem" },
            { label: "Gitignore Pre-Filtering", slug: "guides/gitignore-pre-filtering" },
            { label: "Benchmarks", slug: "guides/benchmarks" },
          ],
        },
        {
          label: "API Reference",
          items: [
            { label: "Detection", slug: "api/detection" },
            {
              label: "Full API on pkg.go.dev",
              link: "https://pkg.go.dev/github.com/LarsArtmann/gogenfilter/v3",
            },
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
            { label: "Who Uses gogenfilter", link: "/dependents" },
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

  vite: {
    plugins: [tailwindcss()],
  },
});
