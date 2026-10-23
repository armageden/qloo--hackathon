# AGENTS.md: TourCraft Central Agent Router

> **Single Source of Truth for Autonomous AI Agents and Contributors**  
> Operating in `TourCraft: Autonomous Cultural Tour & Live Experience Engine`.

---

## 1. Project Snapshot

- **Tech Stack:** Node.js v22+ / Bun v1.3+, Vanilla ES Modules (`"type": "module"`), HTML5, CSS3.
- **Package Manager & Build System:** npm (zero external runtime dependencies required).
- **Primary Archetype:** Full-Stack Web Application + Autonomous Agent CLI Engine.
- **Environment Setup:** Copy `.env.example` to `.env` or set `QLOO_API_KEY` (optional for local grounded cache).

### Verification & Execution Commands
- **Run Web Server:** `npm start` or `npm run dev` (`node server.js`, defaults to port `3000`).
- **Run Test Suite:** `npm test` (`node test.js`).
- **Run CLI Engine:** `npm run cli` or `node cli.js [command]`.
- **Run Mechanical Docs Check:** `npm run docs:check` (`node scripts/docs-check.js`).

---

## 2. Knowledge Base Index (Diátaxis Reference Layer)

> 💡 **Executing a common task? Start here:** [`docs/00-how-to/00-overview.md`](docs/00-how-to/00-overview.md)  
> Task-first recipes for adding artists, tour cities, API endpoints, and syncing documentation.

| Knowledge Area | Source Directory Paths Covered | Read When |
|---|---|---|
| [`docs/00-how-to/`](docs/00-how-to/00-overview.md) | `docs/00-how-to/`, `scripts/` | Executing common modification patterns or running the docs sync checklist. |
| [`docs/01-architecture/`](docs/01-architecture/00-overview.md) | `server.js`, `Dockerfile`, `vercel.json` | Understanding high-level system topology, deployment targets, or pipeline design. |
| [`docs/02-core-engine/`](docs/02-core-engine/00-overview.md) | `src/tour-agent.js`, `src/qloo-client.js`, `src/taste-database.js` | Modifying the recommendation engine, Qloo API adapter, or taste graph data. |
| [`docs/03-interfaces-and-api/`](docs/03-interfaces-and-api/00-overview.md) | `server.js`, `cli.js`, `public/`, `qloo.mcp.json` | Adding/modifying REST API endpoints, CLI subcommands, or frontend UI components. |
| [`docs/99-design-decisions/`](docs/99-design-decisions/00-overview.md) | `server.js`, `src/qloo-client.js`, `AGENTS.md` | Understanding architectural trade-offs, zero-dependency server choice, or ADRs. |

---

## 3. Numbered Working Rules

### Rule 0: Git is Strictly Read-Only (Non-Negotiable)
**NEVER** run `git commit`, `git push`, `git add`, `git stage`, `git stash`, `git checkout`, `git reset`, or create branches/tags. You may **ONLY** run read-only inspection commands (`git status`, `git diff`, `git log`, `git show`). The user handles all staging and commits manually unless explicitly commanded in a specific prompt. Never auto-commit because a task "seems finished." When in doubt, stop and ask.

### Rule 1: Mandatory Docs-Sync Loop (The Core Mechanism)
After **ANY** task that modifies code, configs, or scripts:
1. Follow the 6-step checklist in [`docs/00-how-to/sync-docs-runbook.md`](docs/00-how-to/sync-docs-runbook.md).
2. Update affected reference docs in `docs/` to reflect new or altered symbols, paths, and behaviors.
3. Verify reverse coverage for any newly created public entry points.
4. Execute `npm run docs:check` and ensure zero errors.
5. Conclude the final response with the explicit status line:  
   `Docs checked/updated: <list of files or "none required (reason)">`

### Rule 2: Zero Hallucination Policy
Never invent file paths, CLI flags, environment variables, or function signatures. Every symbol, path, or command written in documentation must be verified against actual source code files first.

### Rule 3: Clean Commit Messages (When Explicitly Asked)
If the user explicitly commands a commit in a prompt, write concise, plain-English commit messages without AI attribution trailers, `Co-Authored-By:` lines, or promotional tags.

### Rule 4: In-Place Maintenance & Anti-Drift
Always prefer editing existing files over creating redundant duplicates. Keep all documentation dense, technical, and scannable. If outdated paths or commands are detected in `README.md` or configs, fix them in place.
