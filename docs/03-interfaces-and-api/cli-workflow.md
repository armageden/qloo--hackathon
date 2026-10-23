**Back:** [00-overview](./00-overview.md)

# CLI Workflow & MCP Reference

Implemented in `cli.js` and configured in `qloo.mcp.json`.

Provides command-line interfaces for terminal workflows, automated scripts, and AI agents.

## Commands

### 1. `run`
Generates a complete tour package as formatted JSON.
```sh
node cli.js run [artist] [city]
```
Example:
```sh
node cli.js run "chappell-roan" "chicago"
```

### 2. `status`
Reports Qloo API configuration, connectivity status, and available datasets.
```sh
node cli.js status
```
Output:
```json
{
  "app": "TourCraft",
  "qlooBaseUrl": "https://hackathon.api.qloo.com",
  "hasApiKey": false,
  "status": "unconfigured",
  "mode": "grounded_taste_graph",
  "availableArtists": ["chappell-roan", "kendrick-lamar", "fred-again", ...],
  "availableCities": ["chicago", "new-york", "los-angeles", ...]
}
```

### 3. `recs`
Fetches cross-domain recommendations directly for an artist.
```sh
node cli.js recs "kendrick-lamar"
```

### 4. `chat`
Queries the grounded reasoning agent directly from the terminal.
```sh
node cli.js chat "Why is natural wine recommended for Chappell Roan fans?"
```

### 5. `compare`
Calculates audience overlap and co-billing feasibility between two performers.
```sh
node cli.js compare "chappell-roan" "charli-xcx"
```

### 6. `mcp`
Runs a standard JSON-RPC 2.0 Model Context Protocol stdio server exposing `tourcraft_generate`, `tourcraft_compare`, and `tourcraft_recs`.
```sh
node cli.js mcp
```

## Model Context Protocol (MCP) Configuration
TourCraft provides `qloo.mcp.json` to expose its tools to desktop AI clients:
```json
{
  "mcpServers": {
    "tourcraft": {
      "command": "node",
      "args": ["cli.js", "mcp"],
      "env": {
        "QLOO_BASE_URL": "https://hackathon.api.qloo.com"
      }
    }
  }
}
```

## Related Subjects
- REST alternative: [http-rest-api.md](./http-rest-api.md)
- Agent orchestrator: [tour-agent.md](../02-core-engine/tour-agent.md)
