import type { LucideIcon } from "lucide-react";
import { FlaskConical, Palette, Route, Sparkles, Wrench } from "lucide-react";

export type StarterFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

/** Highlights bundled with the create-react-reps starter (shown on Practice). */
export const STARTER_FEATURES: StarterFeature[] = [
  {
    title: "Flexoki + Tailwind",
    description:
      "Flexoki palette wired into Tailwind v4 tokens—background, accent, and semantic colors with light/dark and accent themes.",
    icon: Palette,
  },
  {
    title: "shadcn/ui + lint",
    description:
      "Base Nova components on Tailwind, plus Vite+ lint with Oxlint, type-aware checks, and the @shadcn/lint plugin.",
    icon: Sparkles,
  },
  {
    title: "Vite+ toolchain",
    description:
      "Rolldown-powered dev/build, Oxfmt formatting, Oxlint, and vp scripts for check, test, and preview. Optional editor setup is documented on phmt.me/reps.",
    icon: Wrench,
  },
  {
    title: "React Router SPA",
    description:
      "Client-side routes with React Router—Practice and Palette pages, basename-aware for GitHub Pages deploys.",
    icon: Route,
  },
  {
    title: "Vitest",
    description:
      "Component tests with Vitest and happy-dom; run via vp test alongside the same Vite+ config as dev and build.",
    icon: FlaskConical,
  },
];
