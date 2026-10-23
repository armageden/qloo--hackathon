# 99 - Architectural Decision Records (ADRs)

## Primary Source Paths
- `server.js`
- `src/qloo-client.js`
- `scripts/docs-check.js`
- `AGENTS.md`

## Purpose
Read this when seeking the rationale, trade-offs, and historical context behind major architectural choices in TourCraft.

## Table of Contents
- [adr-001-zero-dependency-server.md](./adr-001-zero-dependency-server.md) - Rationale for using native Node.js HTTP instead of external web frameworks.
- [adr-002-dual-mode-qloo-grounding.md](./adr-002-dual-mode-qloo-grounding.md) - Rationale for the dual-mode architecture (Live Qloo API + Grounded Taste Cache).
- [adr-003-diataxis-docs-system.md](./adr-003-diataxis-docs-system.md) - Rationale for a zero-SaaS, self-maintaining agent documentation loop.
