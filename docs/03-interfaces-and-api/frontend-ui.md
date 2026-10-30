**Back:** [00-overview](./00-overview.md)

# Frontend User Interface

TourCraft ships two vanilla frontend surfaces. Both have been re-themed with the Wandor visual system — Geist UI type, Special Elite wordmarks, warm white surfaces, terracotta (`#905831`) accents, and liquid-glass panels — while preserving all original markup, interactions, and copy.

1. **TourCraft Cultural Console (`/` and `/tourcraft`):** Implemented in `public/index.html` (and mirrored in `public/tourcraft.html`), `public/app.js`, and `public/style.css`.
2. **Mostar Cinematic Experience (`/mostar`):** Implemented in `public/mostar.html`, `public/styles.css`, and `public/script.js`.

No frontend build step is required; `server.js` serves `public/` directly.

---

## 1. TourCraft Cultural Console (`/` and `/tourcraft`)

The console serves as the primary application interface, styling live Qloo intelligence and autonomous agent workflows into an executive touring spec:

- **Markup (`public/tourcraft.html`):** Semantic HTML5 layout featuring header telemetry, tour generator controls, audience demographics, cross-domain affinity tabs (Dining, Nightlife, Fashion, Brands, Film & TV), 24-hour timeline, sponsor activation grid, Live Nation deal calculator, multi-city routing planner, and conversational AI co-pilot. Stylesheet and script use root-relative `/style.css` and `/app.js` paths so both `/` and `/tourcraft` resolve the console assets.
- **Client Logic (`public/app.js`):** Dynamic REST API hydration from `/api/artists` and `/api/cities`, preset and custom artist selection, tour market city switching, deal economics calculator across venue tiers, tour leg routing, dual-mode LLM agent chat, Markdown rider export, Web Audio sonic identity, and MCP configuration drawer.
- **Styles (`public/style.css`):** The `:root` design tokens define the Wandor system:
  - Surfaces: `#FFFFFF` canvas/surfaces, warm `#F7F5F2` hover, `#F1EDE8` active.
  - Text: `#1A1A1A` main, `#4A4A4A` secondary, `#767676` muted.
  - Accent: terracotta `#905831` (replaces the former acid chartreuse).
  - Fonts: `Geist` for sans/mono, `Special Elite` for the display wordmark.
  - Soft light shadows and `rgba(0,0,0,...)` borders replace the former obsidian palette.

## Key Console Sections

1. **Header & Status Telemetry:** `qlooStatusPill` and `llmStatusPill` reflect live Qloo API and Gemini 3.8 Flash status or grounded cache operation.
2. **Tour Synthesizer Control Bar:** One-click headliner presets or free-form input, hydrated from `/api/artists` and `/api/cities`.
3. **Cross-Domain Taste Affinities:** Tabs for Dining, Nightlife, Fashion, Brands, and Film & TV with percentage match bars.
4. **24-Hour Takeover Itinerary:** Chronological timeline cards with venue, address, and "Why Qloo Grounded This" callouts.
5. **Brand Sponsorship Matrix:** Activation concepts, promoter pitches, and projected engagement lift.
6. **Live Nation Promoter Deal & ROI Calculator:** Quantified commercial unlock across venue tiers (`club`, `theater`, `arena`, `stadium`), multi-tier rights valuations, and per-head concourse spend lift.
7. **Festival & Co-Billing Matcher:** Audience compatibility, shared cultural vectors, and divergence between two headliners.
8. **Multi-City Tour Leg Planner:** Strategic tour leg routing, cumulative attendance, and multi-market brand synergy calculation.
9. **TourCraft AI Co-Pilot:** Conversational agent powered by Gemini 3.8 Flash grounded in Qloo data, with offline rule-engine fallback.
10. **Qloo Live Telemetry & Raw Inspector:** Live gateway status and raw JSON payload inspection.
11. **MCP Standard Integration Modal:** Interactive JSON-RPC configuration for Claude Desktop and Cursor.
12. **Sonic Identity Synthesizer:** Web Audio harmonic chord generator tailored to each performer.

---

## 2. Mostar Cinematic Experience (`/mostar`)

A standalone vanilla JavaScript and CSS three-screen scroll story showcasing cinematic choreography and cultural landmark discovery:

- **Markup (`public/index.html`):** Strict paint-order DOM tree featuring sticky cinema stage, remote layer assets (`sky`, `back-four`, `bazaar`, `splitframe` left/right, `bridge`, `frame-two`), hero title, intro highlights, facts breakdown, and an interactive sights slider.
- **Styling (`public/styles.css`):** Layer depth coordinate systems, responsive breakpoints (`1500px`, `1100px`, `640px`), frosted `.sight-card` surfaces, terracotta accents, and `prefers-reduced-motion` compliance.
- **Scroll Engine (`public/script.js`):** RequestAnimationFrame animation loop with smoothstep segment transitions, pointer parallax drift, and infinite looping carousel.
- **Cultural Console Link:** Primary navigation header includes a button routing directly back to the TourCraft engine.

## Related Subjects
- REST API: [http-rest-api.md](./http-rest-api.md)
- Core agent engine: [tour-agent.md](../02-core-engine/tour-agent.md)
