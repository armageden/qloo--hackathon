**Back:** [00-overview](./00-overview.md)

# Agentic Pipeline & Cultural Reasoning

TourCraft implements a multi-stage autonomous pipeline designed to replace generic LLM hallucinations with real cultural taste vectors from Qloo's 250M+ entity graph.

## Pipeline Flow

```
[ User Input: Artist + Market ]
               │
               ▼
┌──────────────────────────────────────────────┐
│ Stage 1: Entity Resolution & Grounding       │
│ - Target: `src/qloo-client.js` (`search`)    │
│ - Endpoint: `/search?query=...&type=music`   │
│ - Output: Resolved entity URN                │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│ Stage 2: Cross-Domain Taste Expansion        │
│ - Target: `src/qloo-client.js`               │
│ - Endpoint: `/recs` or `/v2/insights`        │
│ - Verticals: Dining, Nightlife, Fashion,     │
│   Brand Partnerships                         │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│ Stage 3: Geographic Clustering & Ranking     │
│ - Target: `src/taste-database.js`            │
│ - Local venues mapped to affinity vectors    │
│ - Output: Ranked candidates by affinity      │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│ Stage 4: 24-Hour Itinerary Synthesis         │
│ - Target: `src/tour-agent.js`                │
│ - Constructs morning-to-night chronological  │
│   cultural schedule with rationale           │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│ Stage 5: Executive Sponsorship Matrix        │
│ - Target: `src/tour-agent.js`                │
│ - Quantifies Brand Match Indices (0-100)     │
│ - Drafts promoter pitches & activation ideas │
└──────────────────────────────────────────────┘
```

## Grounding vs Generic LLMs

| Attribute | Generic LLM (ChatGPT / Claude) | TourCraft (Qloo-Grounded) |
|---|---|---|
| **Underlying Data** | Stochastic word associations | 250M+ entity graph with mathematical affinity indices |
| **Dining Recommendation** | Generic tourist cliches (e.g. Deep dish pizza) | Latent affinity match (e.g. Natural wine & retro vegan diner at 96% correlation) |
| **Brand Sponsorship** | Generic corporate logos (e.g. Coca-Cola) | High-converting audience overlap (e.g. Glossier, Teenage Engineering, Patagonia) |
| **Data Provenance** | Unverifiable hallucination | Explicit source citation (`qloo_live_api` or `qloo_verified_cache`) |

## Privacy and Data Handling
TourCraft strictly complies with non-PII guidelines:
- Zero personal identifying information is collected, processed, or sent.
- All recommendations reflect aggregate affinity patterns across cultural domains.

## Related Subjects
- Core implementation: [tour-agent.md](../02-core-engine/tour-agent.md)
- REST endpoints: [http-rest-api.md](../03-interfaces-and-api/http-rest-api.md)
