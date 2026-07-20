export const logoPaths = [
  "/logos/sqlc.png",
  "/logos/templ.svg",
  "/logos/protobuf.svg",
  "/logos/go-enum.svg",
  "/logos/mockgen.svg",
  "/logos/moq.png",
  "/logos/wire.svg",
  "/logos/oapi-codegen.svg",
  "/logos/deepcopy-gen.svg",
  "/logos/stringer.svg",
  "/logos/generic.svg",
] as const;
export type LogoPath = (typeof logoPaths)[number];

export interface Generator {
  name: string;
  file: string;
  url: string;
  logo: LogoPath;
}

export const featureIconKeys = [
  "lightning",
  "sliders",
  "glob",
  "chart",
  "folder",
  "database",
] as const;
export type FeatureIcon = (typeof featureIconKeys)[number];

export type AccentColor = "accent" | "amber" | "success";

export interface Feature {
  icon: FeatureIcon;
  title: string;
  desc: string;
  accent: AccentColor;
}

export interface PhaseCard {
  phase: string;
  phaseColor: "accent" | "amber";
  title: string;
  patterns: string[];
  hint: string;
  hintColor: "accent" | "amber";
  hintIcon: UseCaseIcon;
}

export const useCaseIconKeys = ["cog", "chart", "refresh", "bolt", "check"] as const;
export type UseCaseIcon = (typeof useCaseIconKeys)[number];

export interface UseCase {
  title: string;
  desc: string;
  icon: UseCaseIcon;
  accent: AccentColor;
}

export const uiIconKeys = [
  "arrow-external",
  "arrow-right",
  "github",
  "menu",
  "close",
  "sun",
  "moon",
  "star",
] as const;
export type UIIcon = (typeof uiIconKeys)[number];

export type IconName = FeatureIcon | UseCaseIcon | UIIcon;
