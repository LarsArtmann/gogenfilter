import type { Feature } from "./types";

export const features: Feature[] = [
  {
    icon: "lightning",
    title: "Two-Phase Detection",
    desc: "Filename check first (zero I/O), content scan only when needed.",
    accent: "accent",
  },
  {
    icon: "sliders",
    title: "Functional Options API",
    desc: "Clean, composable configuration. Immutable after construction.",
    accent: "amber",
  },
  {
    icon: "glob",
    title: "Glob Pattern Matching",
    desc: "Include/exclude with ** glob support via doublestar.",
    accent: "success",
  },
  {
    icon: "chart",
    title: "Detailed Results",
    desc: "FilterResult with reason, trace, and path for every file.",
    accent: "accent",
  },
  {
    icon: "folder",
    title: "SQLC Config Discovery",
    desc: "Parse sqlc.yaml to find output directories automatically.",
    accent: "amber",
  },
  {
    icon: "database",
    title: "fs.FS Abstraction",
    desc: "Pluggable filesystem. Test with fstest.MapFS, no real files needed.",
    accent: "success",
  },
];
