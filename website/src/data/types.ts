export interface Generator {
  name: string;
  file: string;
  url: string;
  logo: string;
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

export interface Feature {
  icon: FeatureIcon;
  title: string;
  desc: string;
}

export interface PhaseCard {
  phase: string;
  phaseColor: "accent" | "amber";
  title: string;
  patterns: string[];
  note: string;
  noteColor: "accent" | "amber";
  noteIcon: UseCaseIcon;
}

export type ComparisonVariant = "DIY" | "gogenfilter" | "Heavy";

export interface ComparisonItem {
  variant: ComparisonVariant;
  price: string;
  pros: string[];
  cons: string[];
  accent: boolean;
}

export const useCaseIconKeys = ["cog", "chart", "refresh", "bolt", "check"] as const;
export type UseCaseIcon = (typeof useCaseIconKeys)[number];

export interface UseCase {
  title: string;
  desc: string;
  icon: UseCaseIcon;
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
