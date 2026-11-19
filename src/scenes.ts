/**
 * Scene data for the scroll-scrub journey — THE file you fill in per build.
 *
 * Single-shot (the default): ONE entry in `scenes`, whose `clip` is the single
 * continuous film. Chapter copy still comes from `chapters` below, rendered as
 * semantic sections over that one clip.
 *
 * Multi-leg (opt-in): one entry per seam-locked leg, in journey order. Every
 * `poster` MUST be the exact first frame of the encoded clip beside it — never
 * a design board or an imagined destination still.
 *
 * Keep this array a module constant. Changing its identity on every render
 * intentionally rebuilds the media controller.
 */
import type {
  ScrollScrubScene,
  ScrollScrubTheme,
} from "./scroll-scrub/scroll-scrub";

/** Brand tokens for the journey layer. Set these from the design brief. */
export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#F2745F",
  background: "#0A2229",
  ink: "#F1F5F4",
  muted: "#9DBDBA",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    body: "El registro de pacientes para ortodoncistas, en tu celular.",
    clip: "/assets/world/scene-01.mp4",
    id: "scene-01",
    label: "Inicio",
    mobileClip: "/assets/world/scene-01-mobile.mp4",
    mobilePoster: "/assets/world/scene-01-mobile-poster.png",
    poster: "/assets/world/scene-01-poster.png",
    title: "Cada paciente, en su lugar.",
  },
];
