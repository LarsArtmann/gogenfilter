import type { Feature } from "./types";

export const features: Feature[] = [
  {
    icon: "lightning",
    title: "Two-Phase Detection",
    desc: "Filename check first (zero I/O), content scan only when needed.",
  },
  {
    icon: "sliders",
    title: "Functional Options API",
    desc: "Clean, composable configuration. Immutable after construction.",
  },
  {
    icon: "glob",
    title: "Glob Pattern Matching",
    desc: "Include/exclude with ** glob support via doublestar.",
  },
  {
    icon: "chart",
    title: "Thread-Safe Metrics",
    desc: "Track what was filtered and why, concurrently.",
  },
  {
    icon: "folder",
    title: "SQLC Config Discovery",
    desc: "Parse sqlc.yaml to find output directories automatically.",
  },
  {
    icon: "database",
    title: "fs.FS Abstraction",
    desc: "Pluggable filesystem. Test with fstest.MapFS, no real files needed.",
  },
];
