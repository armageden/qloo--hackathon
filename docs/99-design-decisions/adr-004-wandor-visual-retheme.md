**Back:** [00-overview](./00-overview.md)

# ADR-004: Wandor Visual Re-Theme of the Existing Frontends

## Context
The project needed a more modern, editorial visual language ("Wandor"): Geist for UI text, Special Elite for wordmarks, warm white surfaces, terracotta (`#905831`) accents, and liquid-glass panels. The existing frontend already had two fully working vanilla surfaces — the Mostar cinematic scroll story at `/` and the TourCraft cultural console at `/tourcraft`. The requirement was to re-theme those surfaces, not to replace them, rewrite their behavior, or change their branding.

## Decision
- Keep both existing pages, their markup structure, their JavaScript behavior, and their TourCraft copy intact.
- Apply the Wandor visual system through CSS only:
  - Add the Geist + Special Elite Google Fonts link to `public/index.html` and `public/tourcraft.html`.
  - Swap the `:root` design tokens in `public/style.css` (light surfaces, terracotta accent, Geist/Special Elite, soft shadows) and replace the former acid-chartreuse/obsidian literals.
  - Re-theme `public/styles.css` for the Mostar page: Geist display headings, Special Elite logo, white-to-transparent header gradient, frosted `.sight-card` panels, terracotta kickers/tags/buttons, and a frosted `.nav-tourcraft-link`.
- Do not add a frontend build step, framework, or new route. `server.js` continues to serve `public/` directly.

## Consequences
- **Positive:** All original functionality, interactions, content, and branding are preserved; the zero-dependency server and deployment pipeline are unchanged; the visual language is consistent across both pages.
- **Trade-off:** The re-theme is expressed through global CSS tokens and a small number of component overrides, so future visual changes must respect the existing selector structure rather than a component system.
