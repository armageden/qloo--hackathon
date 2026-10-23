**Back:** [00-overview](./00-overview.md)

# ADR-002: Dual-Mode Qloo API Grounding & Offline Resilience

## Context
During hackathon evaluation, judges may test submissions without an active `QLOO_API_KEY` configured in their shell, or external API endpoints may experience intermittent latency or rate limits. If an agent crashes on first run because of an unconfigured credential, it fails the basic submission criteria.

## Decision
We implemented a dual-mode strategy in `src/qloo-client.js`:
1. **Live Mode:** When `QLOO_API_KEY` is present or set via the UI, requests route to `https://hackathon.api.qloo.com`.
2. **Grounded Cache Mode:** When unconfigured or offline, requests automatically fall back to verified cultural graph records stored in `src/taste-database.js`.
Every response explicitly reports its source (`qloo_live_api` vs `qloo_verified_cache`) and provenance string.

## Consequences
- **Positive:** 100% demo uptime, instantaneous response times during review, test suite runs without network flakiness, fully compliant with Qloo data handling rules.
- **Trade-off:** Grounded cache mode covers a curated set of top headliners and cities rather than the full 250M+ entities available via the live API.
