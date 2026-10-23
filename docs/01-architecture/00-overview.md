# 01 - System Architecture

## Primary Source Paths
- `server.js`
- `src/tour-agent.js`
- `src/qloo-client.js`
- `Dockerfile`
- `vercel.json`

## Purpose
Read this when you need to understand the high-level system topology, the multi-stage agentic pipeline, data provenance and privacy guarantees, or deployment configurations for TourCraft.

## Table of Contents
- [agentic-pipeline.md](./agentic-pipeline.md) - Details of the 5-stage agent reasoning pipeline connecting user inputs to Qloo Taste Graph affinities.
- [system-topology.md](./system-topology.md) - Full-stack deployment architecture, process boundaries, offline cache resilience, and container configurations.
