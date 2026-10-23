**Back:** [00-overview](./00-overview.md)

# Frontend User Interface

Implemented in `public/index.html`, `public/app.js`, and `public/style.css`.

The frontend is a vanilla JavaScript client designed with an editorial cultural console aesthetic inspired by backstage tour riders, Live Nation production specs, and Boiler Room minimalism.

## Architecture & Assets

- **Markup (`public/index.html`):** Semantic HTML5 layout featuring header telemetry, tour generator controls, audience demographics, cross-domain affinity tabs, 24-hour timeline, sponsor activation grid, and conversational co-pilot.
- **Client Logic (`public/app.js`):** Reactive state manager handling:
  - Preset and custom artist selection
  - Tour market city switching
  - Dynamic API key validation modal
  - Real-time Markdown rider export formatting and file download
  - Interactive agent chat submission and quick prompt buttons
- **Styles (`public/style.css`):** Custom CSS design system, responsive typography (`Inter`, `Space Grotesk`, and `JetBrains Mono`), tactile obsidian cards, and electric acid chartreuse accents with zero external CSS frameworks.

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
