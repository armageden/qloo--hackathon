# TourCraft ✦ Agents, But With Taste
> **Autonomous Cultural Tour & Live Experience Engine powered by the Qloo Taste Graph (250M+ Entities)**  
> Built for the **Qloo Agentic Hackathon** • Judged by Jason Calacanis, Mike Diolosa (CTO Qloo), Michael Abrams (Live Nation), Cedric the Entertainer, Nicole Seligman (OpenAI Board), and Todd Boehly (Eldridge).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Runtime: Node.js 22+](https://img.shields.io/badge/Node.js-22%2B-brightgreen)](https://nodejs.org)
[![Engine: Qloo Taste AI](https://img.shields.io/badge/Powered%20By-Qloo%20Taste%20Graph-blueviolet)](https://qloo.com)
[![Status: Production Ready](https://img.shields.io/badge/Status-Verified%20%26%20Pass-success)](test.js)

---

## ⚡ The Big Idea & Problem

Every year, billions of dollars are spent mounting global concert tours, comedy arenas, festivals, and live sports events. 

Yet today, touring artists, festival curators, and promoters (like Live Nation) **guess** what their fans in each city actually care about outside the 2-hour show window:
* *Where should fans gather before the show?*
* *What local dining, speakeasies, and craft spots match the fanbase's cultural aesthetic?*
* *Which non-obvious brand sponsors should be pitched for activations that fans will celebrate instead of cringe at?*
* *Which afterparties, venues, and resident DJs will deliver authentic community energy?*

### Why Generic LLMs Fail
Ask ChatGPT or Claude: *"Where should fans of Chappell Roan or Kendrick Lamar hang out before the Chicago show, and what brands should sponsor the VIP lounge?"*
The generic LLM hallucinates cliches: *"Eat Chicago deep-dish pizza at Lou Malnati's, visit Millennium Park, and get Coca-Cola or Red Bull to sponsor."*

**Generic LLMs are culturally blind.** They have zero mathematical understanding of cultural taste graphs or latent cross-domain affinities.

### The Qloo Breakthrough: Only Possible With Taste AI™
Qloo connects **250M+ entities across music, dining, fashion, nightlife, film, and brands**. TourCraft gives agents real cultural grounding:
- **Music ➔ Dining**: Chappell Roan fans over-index 96% on natural wine bars and retro vegan diners over standard steakhouses.
- **Music ➔ Fashion**: Fans over-index 95% on archival thrift, camp glam, and Y2K aesthetic curation over fast-fashion.
- **Music ➔ Nightlife**: Fans demand inclusive queer dance halls and hyperpop club nights over generic bottle-service mega-clubs.
- **Music ➔ Brand Sponsorships**: Qloo surfaces high-affinity brand partners (e.g. *Glossier, Baggu, Dr. Martens, Polaroid*) with quantified conversion lift and tailored activation concepts (e.g. *"Glossier Concourse Touch-Up Lounge"*).

---

## 🌟 Key Features

1. **Autonomous 24-Hour City Takeover Itinerary**:
   - Synthesizes an end-to-end schedule: *Morning Fuel ➔ DIY Fashion Pop-Up ➔ Pre-Show Gathering ➔ Showtime Concourse ➔ Curated Afterparty ➔ Late-Night Street Eats*.
   - Every single stop is mathematically grounded with a **Qloo Affinity Match Index (0-100%)** and a *"Why Qloo Grounded This"* provenance explanation.

2. **Executive Brand Sponsorship Matrix (For Promoters & Live Nation)**:
   - Evaluates brand alignment across 250M+ entities.
   - Generates actionable sponsor pitch decks: Brand Name, Affinity Score, Experiential Activation Concept, Promoter Value Pitch, and Projected ROI Lift.

3. **Multi-Domain Cultural Fingerprint & Demographics**:
   - Visualizes audience Cultural Openness Index, core age/gender demographics, and top subcultural vectors.
   - Interactive cross-domain tabs for Dining, Nightlife, Fashion, and Brand Affinities.

4. **Grounded AI Tour Co-Pilot**:
   - Conversational agent that reasons strictly over Qloo's taste graph data.
   - Ask: *"Why natural wine instead of a rooftop lounge?"*, *"What brand sponsor would fail for this audience?"*, or *"Compare this fanbase to mainstream commercial pop."*

5. **One-Click Exportable Cultural Tour Rider**:
   - Generates clean Markdown/Text riders ready for tour managers, venue directors, and brand sponsorship leads.

6. **Dual Mode Architecture (Live API + Grounded Taste Cache)**:
   - Full live support for `https://hackathon.api.qloo.com` with `X-Api-Key`.
   - Built-in grounded cache for instant exploration without waiting for API keys.

---

## 🛠️ Architecture & Technology Stack

```
                        ┌──────────────────────────────────────────────┐
                        │              TourCraft UI                    │
                        │ (Dark Mode / Glassmorphism / Real-time Chat) │
                        └──────────────────────┬───────────────────────┘
                                               │
                                               ▼
                        ┌──────────────────────────────────────────────┐
                        │             Server Layer                     │
                        │ (Node.js 22 / Bun Native HTTP & REST API)    │
                        └───────┬──────────────────────────────┬───────┘
                                │                              │
                                ▼                              ▼
                 ┌───────────────────────────┐  ┌───────────────────────────┐
                 │     TourAgent Engine      │  │     TourCraft AI Chat     │
                 │ Multi-stage orchestration │  │ Grounded reasoning over   │
                 │ Itinerary & Sponsor Deck  │  │ Qloo data points          │
                 └──────────────┬────────────┘  └──────────────┬────────────┘
                                │                              │
                                └──────────────┬───────────────┘
                                               │
                                               ▼
                                ┌─────────────────────────────┐
                                │       QlooClient Layer      │
                                └───────┬─────────────┬───────┘
                                        │             │
                    ┌───────────────────┘             └───────────────────┐
                    ▼                                                     ▼
      ┌───────────────────────────┐                         ┌───────────────────────────┐
      │     Live Qloo API         │                         │ Verified Qloo Taste Graph │
      │ hackathon.api.qloo.com    │                         │  Grounding Cache (250M+)  │
      │ /search, /recs, /rank     │                         │ Music/Dining/Fashion/Club │
      └───────────────────────────┘                         └───────────────────────────┘
```

- **Runtime**: Node.js v22+ / Bun 1.3+ (zero external runtime dependencies required!).
- **Frontend**: Clean Modern Web UI (Plus Jakarta Sans, Space Grotesk, CSS Glassmorphism, Responsive Grid, SVG icons).
- **Backend**: Native Node.js HTTP/ES Modules server (`server.js`).
- **CLI Runner**: `cli.js` with full workflow support matching the `@qloo/qloo-harness` specification.
- **Testing**: Automated test suite (`test.js`) verifying database integrity, client searches, recommendations, itinerary generation, and chat reasoning.

---

## 🚀 Quickstart & Setup

### 1. Clone & Run Locally
```bash
# Clone the repository
git clone https://github.com/armageden/qloo--hackathon.git
cd qloo--hackathon

# Run the test suite
node test.js

# Start the web application
node server.js
```
Open **`http://localhost:3000`** in your browser!

### 2. Configure Qloo API Key (Optional)
To query live endpoints directly:
```bash
export QLOO_API_KEY="your-hackathon-api-key"
node server.js
```
*Or simply click the **"Qloo API Key"** button in the web header to enter and validate your key at runtime!*

### 3. Run via CLI
```bash
# Generate tour package for Chappell Roan in Chicago
node cli.js run "chappell-roan" "chicago"

# Check Qloo system status
node cli.js status

# Query cross-domain affinities
node cli.js recs "kendrick-lamar"

# Ask the grounded AI agent
node cli.js chat "Why did Qloo select natural wine for Chappell Roan fans?"
```

### 4. Deploy with Docker
```bash
docker build -t tourcraft .
docker run -p 3000:3000 tourcraft
```

---

## 🏆 Hackathon Judging Criteria Alignment

| Criteria | How TourCraft Delivers |
|---|---|
| **Technological Implementation** | Deep, non-trivial use of the Qloo Taste Graph across multiple domains (music ➔ dining ➔ fashion ➔ nightlife ➔ brand sponsors). Implements entity resolution, cross-domain recommendations, and ranking. Dual live API & grounded cache architecture. |
| **Design** | Coherent, beautiful product experience. Dark mode styling inspired by Live Nation backstage riders and Boiler Room aesthetics, interactive affinity gauges, timeline cards, sponsor matrix, and conversational co-pilot. |
| **Potential Impact** | Solves a multi-billion dollar problem in live touring, festivals, and venue hospitality. Direct pitch for **Jason Calacanis** (angel scalable software model) and **Michael Abrams** (Live Nation live music touring scale). |
| **Quality of the Idea** | Highly creative and non-obvious. Instead of another generic chatbot, TourCraft shows why cultural intelligence is the difference between "technically functional" and "actually good". Without Qloo, this product cannot exist. |

---

## 📄 License
This project is open-source and licensed under the [MIT License](LICENSE).
