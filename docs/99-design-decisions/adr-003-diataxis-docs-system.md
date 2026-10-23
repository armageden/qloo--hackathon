**Back:** [00-overview](./00-overview.md)

# ADR-003: Diátaxis Self-Maintaining Agent Documentation System

## Context
Codebases updated by autonomous AI agents frequently suffer from documentation drift: code changes, paths move, and documentation becomes obsolete within days. External SaaS documentation synchronizers add latency, cost, and fragile third-party dependencies.

## Decision
We implemented an in-repository Diátaxis documentation architecture:
- `docs/00-how-to/` for task-first procedural recipes.
- `docs/01-architecture/`, `docs/02-core-engine/`, and `docs/03-interfaces-and-api/` for reference documentation.
- `docs/99-design-decisions/` for ADRs.
- `AGENTS.md` as the single central entry point and router.
- `docs/00-how-to/sync-docs-runbook.md` enforcing a mandatory agent post-task docs-sync loop.
- `scripts/docs-check.js` as a mechanical zero-dependency validator wired into `npm run docs:check`.

## Consequences
- **Positive:** Zero external dependencies, docs are automatically updated on every agent pass, mechanical validation blocks broken links and missing reverse coverage before merge.
- **Trade-off:** Requires agents to strictly execute the 6-step docs-sync checklist after code modifications.
