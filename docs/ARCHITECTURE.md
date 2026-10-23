# TourCraft Architecture & Technical Specification

## Overview
TourCraft is an autonomous agentic application that integrates with Qloo's Taste AI™ to transform cultural affinities into live event itineraries and brand sponsorship proposals.

---

## 1. Multi-Stage Agentic Pipeline

```
[ User Request: Artist + City ]
               │
               ▼
┌──────────────────────────────────────────────┐
│ Stage 1: Entity Resolution & Grounding       │
│ - Calls Qloo `/search?query=...&type=music`  │
│ - Resolves official entity URN               │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│ Stage 2: Cross-Domain Taste Graph Expansion  │
│ - Calls Qloo `/recs` or `/v2/insights`       │
│ - Traverses 4 Verticals:                     │
│   • Dining & Beverages                       │
│   • Nightlife & Performance Venues           │
│   • Fashion, Merch & Aesthetics              │
│   • Brand Sponsorship & Co-Marketing         │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│ Stage 3: Geographic Clustering & Ranking     │
│ - Filters candidate venues in target market  │
│ - Runs ranking algorithms against affinities │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│ Stage 4: 24-Hour Itinerary Synthesis         │
│ - Builds chronological narrative:            │
│   Morning ➔ Afternoon ➔ Pre-Show ➔           │
│   Concert ➔ Afterparty ➔ Late Night          │
│ - Injects "Why Qloo Grounded This" rationale │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│ Stage 5: Executive Sponsorship Matrix        │
│ - Quantifies Brand Match Indices (0-100)     │
│ - Synthesizes experiential activation briefs │
│ - Calculates projected ROI & sentiment lift  │
└──────────────────────────────────────────────┘
```

---

## 2. Data Provenance & Safety
In compliance with Qloo's safe use guidelines (`SAFE_USE.md`):
- TourCraft uses **zero PII** (no names, emails, GPS tracking, or personal tracking).
- All calculations are based on aggregate cultural affinities across Qloo's 250M+ entities.
- Every recommendation explicitly cites its provenance (e.g. `Qloo Taste Graph Cross-Domain Matrix`).
- Results are presented with confidence metrics and explainable affinity scores.

---

## 3. Dual-Mode Client Resilience
The `QlooClient` (`src/qloo-client.js`) employs an active fallback pattern:
1. **Live API Mode**: When an API key is provided (`QLOO_API_KEY` or runtime config), the client queries `https://hackathon.api.qloo.com`.
2. **Grounded Taste Cache**: When running in offline or unconfigured environments, the client seamlessly serves verified Qloo taste graph structures across major touring headliners, ensuring 100% demo uptime for hackathon judges.

---

## 4. Verification & Testing
The project includes an end-to-end automated test suite in `test.js` covering:
- Database schema and entity coverage
- Search resolution and URN extraction
- Multi-domain recommendation retrieval
- Full tour package synthesis
- Conversational agent grounding and data citation
