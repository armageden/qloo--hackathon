**Back:** [00-overview](./00-overview.md)

# QlooClient Module

Located at `src/qloo-client.js`.

The `QlooClient` class manages HTTP communication with the Qloo Hackathon Taste Graph API (`https://hackathon.api.qloo.com`) and manages fallback execution when credentials are not configured.

## Configuration & Environment Variables

The module automatically loads variables from a `.env` file at startup if present, and falls back to process environment variables.

| Variable | Description | Default |
|---|---|---|
| `QLOO_API_KEY` | Hackathon-issued API key passed via `X-Api-Key` header | `null` |
| `QLOO_BASE_URL` | Qloo API base host URL | `https://hackathon.api.qloo.com` |

## Class Definition

```js
import { qlooClient, QlooClient } from "./src/qloo-client.js";
```

### Methods

#### `setApiKey(key)`
Updates the API key dynamically at runtime. Trims whitespace and clears credentials if null.

#### `isConfigured()`
Returns boolean indicating whether a valid API key string is present.

#### `verifyCredentials()`
Performs a bounded live network probe to `https://hackathon.api.qloo.com/search?query=test&take=1` with a 4-second timeout. Returns `{ ready: boolean, status: string }`.

#### `search(query, type)`
Resolves a raw name string into structured Qloo entity URNs.
- `query` *(string)*: Search text (e.g. `"Kendrick Lamar"`).
- `type` *(string)*: Entity vertical (defaults to `"music"`).
- Returns normalized envelope: `{ status, source, data, provenance }`.

#### `getRecommendations(sampleEntityId, targetCategory, cityKey)`
Retrieves cross-domain affinity scores for a given sample entity URN.
- Returns `{ status, source, recommendations, provenance }`.

#### `rankOptions(options, optionType, signals)`
Sorts candidate choices according to their computed affinity scores.

## Related Subjects
- Taste database: [taste-database.md](./taste-database.md)
- Agent orchestrator: [tour-agent.md](./tour-agent.md)
