**Back:** [00-overview](./00-overview.md)

# Agent Documentation Synchronization Runbook

This runbook defines the mandatory procedure that all AI agents and contributors must execute after any task that modifies code, configurations, or scripts in this repository.

## The 6-Step Synchronization Checklist

### Step 1: Inspect Working Tree Changes
Run read-only inspection commands to list all modified, added, or deleted files:
```sh
git status
git diff --stat
```
*(Hard Rule: Do not run `git add` or `git commit`! See Rule 0 in `AGENTS.md`.)*

### Step 2: Map Modified Source Paths to Documentation
Use this mapping table to locate the documentation modules affected by your code modifications:

| Modified Source Path | Primary Docs Folder | Target Reference File |
|---|---|---|
| `server.js` | `docs/03-interfaces-and-api/` | `docs/03-interfaces-and-api/http-rest-api.md` |
| `cli.js` | `docs/03-interfaces-and-api/` | `docs/03-interfaces-and-api/cli-workflow.md` |
| `qloo.mcp.json` | `docs/03-interfaces-and-api/` | `docs/03-interfaces-and-api/cli-workflow.md` |
| `public/*` | `docs/03-interfaces-and-api/` | `docs/03-interfaces-and-api/frontend-ui.md` |
| `src/tour-agent.js` | `docs/02-core-engine/` | `docs/02-core-engine/tour-agent.md` |
| `src/qloo-client.js` | `docs/02-core-engine/` | `docs/02-core-engine/qloo-client.md` |
| `src/taste-database.js` | `docs/02-core-engine/` | `docs/02-core-engine/taste-database.md` |
| `package.json` | `docs/01-architecture/` | `docs/01-architecture/system-topology.md` |
| `Dockerfile`, `vercel.json` | `docs/01-architecture/` | `docs/01-architecture/system-topology.md` |
| `scripts/*` | `docs/00-how-to/` | `docs/00-how-to/sync-docs-runbook.md` |

### Step 3: Update Affected Reference Docs
Open the matched reference docs and update:
- Added, altered, or deleted function signatures, arguments, or return types.
- New or altered REST API query parameters or payload schemas.
- Modified environment variable keys or default values.

### Step 4: Reverse Coverage Verification
Verify that every newly created public entry point (new REST route handler in `server.js`, new CLI subcommand in `cli.js`, or new export in `src/`) is mentioned by file path in at least one reference document.

### Step 5: ADR-Lite Decision Logging
If your task introduced a major architectural change, new dependency, or changed an established convention, add an ADR file in `docs/99-design-decisions/` formatted as:
- **Context:** Why was the change needed?
- **Decision:** What was chosen?
- **Consequence:** What are the positive impacts and trade-offs?
Update `docs/99-design-decisions/00-overview.md` with the new file.

### Step 6: Execute the Mechanical Validator
Run the validator script to ensure path existence, link integrity, and reverse coverage:
```sh
npm run docs:check
```
Resolve all reported errors before finalizing the task.

## Mandatory Final Status Line
Every agent completion message MUST conclude with:
`Docs checked/updated: <comma-separated list of modified doc files, or "none required (reason)">`
