**Back:** [00-overview](./00-overview.md)

# Frontend User Interface

Implemented in `public/index.html`, `public/styles.css`, `public/script.js` (Mostar cinematic experience) and `public/tourcraft.html`, `public/tourcraft.css`, `public/tourcraft.js` (TourCraft intelligence console).

The frontend encompasses two complementary interfaces:
1. **Mostar Cinematic Experience (`public/index.html`):** A high-performance, multi-layered parallax scroll narrative recreating Mostar city with Ogg Medium typography, 3D layer depths, and seamless infinite card carousel.
2. **TourCraft Cultural Console (`public/tourcraft.html`):** A backstage tour rider and live experience console powered by Qloo taste graph intelligence.

## Architecture & Assets

- **Cinematic Landing Page:**
  - **Markup (`public/index.html`):** Precise 3-stage scroll layout with sticky 100vh stage, transparent PNG scene layers, and sight cards.
  - **Styles (`public/styles.css`):** Layer styling, fluid typography, and custom CSS variables governing multi-layer transforms.
  - **Animation Engine (`public/script.js`):** Sub-pixel lerp scroll smoothing, pointer parallax, and infinite carousel normalization.

- **TourCraft Experience Engine:**
  - **Markup (`public/tourcraft.html`):** Semantic HTML5 layout featuring header telemetry, tour generator controls, audience demographics, cross-domain affinity tabs, 24-hour timeline, sponsor activation grid, and conversational co-pilot.
  - **Client Logic (`public/tourcraft.js`, mirrored in `public/app.js`):** Reactive state manager handling artist selection, city switching, Markdown rider export, and interactive chat.
  - **Styles (`public/tourcraft.css`, mirrored in `public/style.css`):** Custom CSS design system, responsive typography, tactile obsidian cards, and electric acid chartreuse accents.

## Key UI Sections

1. **Header & Status Telemetry:**
   Displays connection state (`qlooStatusPill`) reflecting live Qloo API status or grounded cache operation.
2. **Tour Synthesizer Control Bar:**
   Enables 1-click selection of headliners or free-form text input for any touring performer.
3. **Cross-Domain Taste Affinities:**
   Tabbed interface switching between Dining, Nightlife, Fashion, and Brand vectors with percentage match progress bars.
4. **24-Hour Takeover Itinerary:**
   Chronological timeline cards detailing venue, address, and explicit *"Why Qloo Grounded This"* callouts.
5. **Brand Sponsorship Matrix:**
   Visual cards presenting activation concepts, promoter pitch arguments, and projected engagement lift.
6. **TourCraft AI Co-Pilot:**
   Interactive slide-down chat widget for exploring data provenance in real time.
7. **Co-Billing & Festival Stage Matcher:**
   Interactive view computing mathematical audience compatibility and divergence between two headliners.
8. **Qloo Live Telemetry & Raw Inspector:**
   Real-time drawer showing live gateway status, encryption parameters, and raw JSON payload inspect and copy.
9. **Sonic Identity Synthesizer:**
   Web Audio API harmonic ambient chord generator tailored to each performer's genre.

## Related Subjects
- REST API: [http-rest-api.md](./http-rest-api.md)
- Core agent engine: [tour-agent.md](../02-core-engine/tour-agent.md)
