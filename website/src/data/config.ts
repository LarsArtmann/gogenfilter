export const siteConfig = {
  name: "gogenfilter",
  title: "gogenfilter — Skip Auto-Generated Go Code in Linters & CI",
  description:
    "Detect and skip auto-generated Go code files from sqlc, protobuf, templ, and more. Built for linters, static analysis, and CI pipelines.",
  ogDescription:
    "Stop linting code no human wrote. Detect and skip {count} Go code generators in your linters and CI.",
  siteUrl: "https://gogenfilter.lars.software",
  github: "https://github.com/LarsArtmann/gogenfilter",
  author: {
    name: "LarsArtmann",
    url: "https://larsartmann.com/",
  },
  pkgGoDev: "https://pkg.go.dev/github.com/LarsArtmann/gogenfilter/v3",
} as const;
