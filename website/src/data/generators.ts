// This file is a thin wrapper around generated data.
// The actual data is produced by cmd/gendocs from the Go detectors table.
// To update: run `go generate ./...` from the project root.
// CI enforces freshness via `go generate ./... && git diff --exit-code`.
import generatorsData from "./generators.json";
import type { Generator } from "./types";

export const generators = generatorsData as Generator[];
export const generatorCount = generators.length;
