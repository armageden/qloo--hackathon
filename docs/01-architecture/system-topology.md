**Back:** [00-overview](./00-overview.md)

# System Topology & Deployment

TourCraft is structured as a self-contained, zero-dependency full-stack application designed for maximum portability across local development, containerized hosting, and serverless environments.

## Component Overview

```
 Browser Client (HTML5 / Vanilla ESM)
          │
          │ HTTP / JSON
          ▼
 Node.js Runtime (`server.js`)
    ├── Static File Server (`public/`)
    └── API Router (`/api/*`)
          │
          ├── TourAgent (`src/tour-agent.js`)
          │      │
          │      └── QlooClient (`src/qloo-client.js`)
          │             ├── Live Qloo API (`https://hackathon.api.qloo.com`)
          │             └── Grounding Cache (`src/taste-database.js`)
          │
          └── CLI Engine (`cli.js`)
```

## Runtime Environment
- **Platform:** Node.js v22+ or Bun v1.3+
- **HTTP Server:** Native `node:http` (zero external npm framework dependencies)
- **Port:** Configured via `PORT` environment variable (defaults to `3000`)
- **Package Manifest:** `package.json`

## Deployment Targets

### 1. Standalone / Docker
Defined in `Dockerfile`. Builds a lightweight alpine image and starts `server.js` on port `3000`:
```sh
docker build -t tourcraft .
docker run -p 3000:3000 tourcraft
```

### 2. Vercel / Cloud
Configured in `vercel.json` routing all incoming paths to `server.js` using `@vercel/node`.

## Fault Tolerance & Dual-Mode Resilience
The client layer (`src/qloo-client.js`) automatically toggles between:
- `live_api`: When a valid `QLOO_API_KEY` is detected or provided at runtime.
- `grounded_taste_graph`: When operating offline or without credentials, serving authentic verified taste vectors from `src/taste-database.js`.

## Related Subjects
- Core client logic: [qloo-client.md](../02-core-engine/qloo-client.md)
- REST endpoints: [http-rest-api.md](../03-interfaces-and-api/http-rest-api.md)
