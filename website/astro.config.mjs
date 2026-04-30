import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gogenfilter.dev',
  integrations: [
    sitemap(),
    starlight({
      title: 'gogenfilter',
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Quick Start', slug: 'getting-started/quick-start' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Filter Options', slug: 'guides/filter-options' },
            { label: 'Pattern Matching', slug: 'guides/pattern-matching' },
            { label: 'Metrics', slug: 'guides/metrics' },
            { label: 'SQLC Config Discovery', slug: 'guides/sqlc-config' },
            { label: 'Custom Filesystems', slug: 'guides/custom-filesystem' },
          ],
        },
        {
          label: 'API Reference',
          items: [
            { label: 'Filter', slug: 'api/filter' },
            { label: 'Detection', slug: 'api/detection' },
            { label: 'Types', slug: 'api/types' },
            { label: 'Errors', slug: 'api/errors' },
          ],
        },
        {
          label: 'Supported Generators',
          slug: 'generators',
        },
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/LarsArtmann/gogenfilter',
        },
      ],
      head: [
        {
          tag: 'meta',
          attrs: {
            name: 'description',
            content: 'Detect and filter auto-generated Go code files. Built for linters, static analysis tools, and code quality tools.',
          },
        },
      ],
    }),
  ],
});
