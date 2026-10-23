**Back:** [00-overview](./00-overview.md)

# ADR-001: Zero-Dependency Native Node.js Server

## Context
TourCraft is built for a hackathon environment where judges, contributors, and automated test runners must be able to clone and execute the application with zero installation friction, no native compile steps (`node-gyp`), and no risk of npm registry proxy blocks or dependency vulnerabilities.

## Decision
We implemented `server.js` using standard Node.js built-in modules (`node:http`, `node:fs`, `node:path`, `node:url`) rather than Express, Fastify, or Next.js. The server natively parses JSON bodies, sets CORS headers, routes API endpoints, and serves static files from `public/`.

## Consequences
- **Positive:** Instant startup time (< 50ms), 100% portability, zero `node_modules` required for server execution, fully compatible with both Node.js (v22+) and Bun (v1.3+).
- **Trade-off:** Route handling and body parsing are written explicitly using standard event streams rather than high-level framework middleware.
