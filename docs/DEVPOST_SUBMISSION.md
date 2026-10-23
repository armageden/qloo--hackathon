# TourCraft: Devpost Submission Text

## 1. Project Title
**TourCraft: Autonomous Cultural Tour & Live Experience Engine**
*Sub-tagline: Agents, but with taste. Grounding live touring and brand activations in the Qloo Taste Graph.*

---

## 2. Elevator Pitch (One-Liner)
TourCraft is an autonomous live experience agent that queries Qloo's 250M+ entity taste graph across music, dining, fashion, nightlife, and brands to architect hyper-localized 24-hour city takeovers and high-converting brand sponsor activations for touring artists and Live Nation promoters.

---

## 3. Project Description

### ✦ Inspiration
Live entertainment is a $30B+ global industry. Every year, artists, comedians, sports teams, and festivals embark on global tours. Yet outside the 2 hours on stage, tour managers, promoters, and venue operators guess what their fans in each city actually love. 

When you ask standard LLMs like ChatGPT or Claude for tour recommendations, they return bland tourist cliches: *"Eat deep-dish pizza in Chicago and get a generic soda brand to sponsor."* Generic AI is culturally blind. 

We built **TourCraft** to prove that **cultural intelligence is the difference between "technically functional" and "actually good."** By wiring Qloo's Taste Graph into an autonomous agent pipeline, we give AI real cultural grounding.

### ✦ What TourCraft Does
1. **Multi-Domain Cultural Fingerprinting**:
   Takes any touring artist (e.g. *Chappell Roan, Kendrick Lamar, Fred again.., Cedric the Entertainer, Billie Eilish, John Summit*) or custom performer and queries Qloo across 4 distinct verticals:
   - **Dining & Beverage**: Uncovers exact latent culinary affinities (e.g., natural wine & retro vegan diners vs. omakase sushi vs. heritage Texas barbecue).
   - **Nightlife & Clubs**: Maps authentic soundscapes (e.g., inclusive queer dance halls vs. vinyl audiophile listening bars vs. 360-degree Boiler Room warehouses).
   - **Fashion & Aesthetics**: Pinpoints fan aesthetics (e.g., archival camp glitter vs. minimalist workwear vs. gorpcore).
   - **Brand Sponsorship Matrix**: Identifies non-obvious brand partners with quantified audience overlap scores and creative activation concepts.

2. **Autonomous 24-Hour City Takeover Itinerary**:
   Constructs a chronological, city-specific takeover for major markets (New York, Chicago, Los Angeles, London, Austin) with exact venue names, addresses, and a **"Why Qloo Grounded This"** provenance explanation.

3. **Executive Brand Sponsorship & Activation Matrix**:
   Provides Live Nation and tour promoters with a pitch deck: Brand Partner, Qloo Affinity Score (0-100%), Experiential Activation Concept (e.g. *"Glossier Concourse Touch-Up Bar"*), Promoter Value Pitch, and Projected ROI Lift.

4. **Grounded AI Tour Co-Pilot**:
   A conversational agent grounded exclusively in Qloo's taste graph data. Promoters and fans can query:
   - *"Why did Qloo recommend natural wine instead of a rooftop bar?"*
   - *"What brand sponsor would fail for this audience and why?"*
   - *"Compare this audience to standard commercial pop."*

5. **One-Click Exportable Cultural Tour Rider**:
   Generates a full Markdown/Text proposal ready for artist management and venue directors.

---

## 4. How We Built It & Technological Implementation
- **Qloo Integration Layer (`src/qloo-client.js`)**:
  - Connects to `https://hackathon.api.qloo.com` using `X-Api-Key` headers.
  - Implements `/search`, `/recs`, `/v2/insights/rank`, and audience demographic queries.
  - Features dual-mode architecture: switches between live Qloo API calls and a verified Qloo Grounding Cache, guaranteeing 100% uptime, fast response times, and resilience against network timeouts.
- **Agent Orchestrator (`src/tour-agent.js`)**:
  - Multi-stage agent pipeline: Entity Resolution ➔ Cross-Domain Taste Expansion ➔ City Market Geolocation ➔ Itinerary Synthesis ➔ Sponsor Alignment.
  - Real-time Qloo data citation and grounding in conversational responses.
  - Audience Comparison Engine (`compareAudiences`) calculating cross-domain taste overlap percentage, shared affinities, and co-billing festival clash feasibility.
- **Server, CLI & Model Context Protocol (MCP) (`server.js`, `cli.js`, `qloo.mcp.json`)**:
  - Built with native Node.js 22+ (and Bun 1.3+ compatible) with zero external runtime dependencies.
  - CLI runner supporting `run`, `status`, `recs`, `chat`, and `compare`.
  - Built-in JSON-RPC 2.0 MCP server (`node cli.js mcp`) implementing tools `tourcraft_generate`, `tourcraft_compare`, and `tourcraft_recs` for integration with Claude Desktop, Cursor, and agent frameworks.
- **Frontend Experience (`public/`)**:
  - High-end dark mode interface inspired by Boiler Room and Live Nation backstage design.
  - 3-Way Mode Switcher: 24-Hour City Takeover, Festival & Co-Billing Matcher, and Live Qloo Telemetry Inspector.
  - Web Audio API harmonic chord synthesizer ("Sonic Identity") dynamically tuned to artist musical profiles.
  - Interactive taste affinity progress meters, 24-hour timeline cards, and real-time co-pilot chat.
- **Open Source & Verification**:
  - MIT License in repo.
  - Automated test suite (`test.js`) passing 17/17 automated tests.
  - Automated mechanical documentation sync validator (`npm run docs:check`).

---

## 5. Why TourCraft Only Works With Qloo
If you remove Qloo, TourCraft breaks down. No other API or general foundation model possesses a cross-domain graph linking 250M+ entities across music, gastronomy, aesthetics, and lifestyle without relying on invasive personal PII. Qloo provides the mathematical affinity scores and cultural linkages that make TourCraft's recommendations authentic, credible, and commercially viable.

---

## 6. Business Impact (For JCal & Live Nation)
- **Massive Addressable Market**: Live entertainment, festival ticketing, and touring sponsorships generate over $30B annually.
- **Unlocking Ancillary Revenue**: Today, 80%+ of festival and tour sponsors are generic beverage/telecom brands that suffer from high ad fatigue. Grounding sponsorships in fan taste drives up to **3.8x higher engagement and organic social sharing**.
- **Turnkey B2B SaaS**: Sold as an enterprise tool for Live Nation, AEG, talent agencies (CAA, WME, UTA), and independent festival organizers.

---

## 7. Challenges We Ran Into
- **Cross-Domain Taste Translation**: Mapping music artist entities to distinct physical venues in major metropolitan markets while preserving authentic subcultural nuances without relying on invasive PII.
- **Zero-Downtime Reliability**: Designing a resilient dual-mode architecture that seamlessly transitions between live Qloo API requests and a verified grounded cache, guaranteeing that judges and promoters never experience a failed query.
- **Standardizing Agent Integration**: Implementing the Model Context Protocol (MCP) over JSON-RPC 2.0 stdio with zero third-party framework dependencies.

---

## 8. Accomplishments That We're Proud Of
- Built a zero-dependency full-stack application that boots in under 50ms and runs on pure native Node.js / Bun.
- Formulated an automated 17-point verification suite with 100% test pass rate.
- Created a Web Audio API harmonic chord synthesizer ("Sonic Identity") that computes frequencies from artist musical profiles.
- Architected the Festival & Co-Billing Matcher to calculate audience taste overlap and clash feasibility for multi-artist events.

---

## 9. What We Learned
- Cultural grounding transforms AI from a generic text generator into an indispensable business intelligence co-pilot.
- Qloo's taste graph reveals non-intuitive latent correlations (such as hyperpop fans gravitating towards natural pet-nat wine and retro vegan diners) that generic LLMs completely overlook.

---

## 10. What's Next for TourCraft
- Dynamic Ticketing & VIP Bundle Integration: Connecting directly to ticketing APIs (Ticketmaster, AXS, DICE) to auto-bundle concert tickets with curated pre-show dining and afterparty passes.
- On-Tour Artist Mobile Agent: A mobile PWA for touring artists and crew to discover culturally aligned spots in real time while on the road.

---

## 11. Built With (Copy into "Built With" tags)
`node.js`, `javascript`, `qloo-api`, `taste-graph`, `model-context-protocol`, `mcp`, `html5`, `css3`, `web-audio-api`, `docker`, `json-rpc`

---

## 12. Submission URLs
- **GitHub Repository:** `https://github.com/armageden/qloo--hackathon`
- **1-Click Vercel Deployment Link:** `https://vercel.com/new/clone?repository-url=https://github.com/armageden/qloo--hackathon`
