**Back:** [00-overview](./00-overview.md)

# HTTP REST API Reference

Implemented in `server.js`.

The server provides a lightweight, zero-dependency REST API for frontend clients and automated agents.

## Base URL & Port
- Default: `http://localhost:3000`
- Environment override: `PORT`

## Endpoints

### 1. `GET /api/status`
Checks system health, credential detection, and active operating mode.
- **Response `200 OK`:**
  ```json
  {
    "app": "TourCraft",
    "hasApiKey": false,
    "qlooBaseUrl": "https://hackathon.api.qloo.com",
    "mode": "grounded_taste_graph",
    "status": "unconfigured",
    "artistsCount": 6,
    "citiesCount": 5
  }
  ```

### 2. `POST /api/config/key`
Sets or updates the Qloo API key at runtime.
- **Request Body:**
  ```json
  {
    "apiKey": "your-qloo-api-key"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "configured": true,
    "verification": {
      "ready": true,
      "status": "live",
      "code": 200
    }
  }
  ```

### 3. `GET /api/artists`
Retrieves a list of available touring headliner profiles.
- **Response `200 OK`:**
  ```json
  {
    "artists": [
      {
        "slug": "chappell-roan",
        "name": "Chappell Roan",
        "genres": ["Midwest Pop", "Synthpop", "Queer Glam", "Camp Pop"],
        "vibe": "Theatrical, 80s camp glitter..."
      }
    ]
  }
  ```

### 4. `GET /api/cities`
Retrieves available tour market destinations and major venues.
- **Response `200 OK`:**
  ```json
  {
    "cities": [
      {
        "key": "chicago",
        "name": "Chicago",
        "state": "IL",
        "country": "USA",
        "tagline": "The Architectural Capital of Live Music & Cultural Contrast",
        "venues": ["United Center", "Wintrust Arena", "The Salt Shed"]
      }
    ]
  }
  ```

### 5. `POST /api/tour/generate`
Executes the autonomous agentic pipeline to produce a 24-hour itinerary and brand sponsorship matrix.
- **Request Body:**
  ```json
  {
    "artist": "chappell-roan",
    "city": "chicago"
  }
  ```
- **Response `200 OK`:** Full tour package object (see [tour-agent.md](../02-core-engine/tour-agent.md)).

### 6. `POST /api/agent/chat`
Conversational endpoint grounded in Qloo cultural data.
- **Request Body:**
  ```json
  {
    "query": "Why did Qloo recommend natural wine?",
    "activePackage": { ... }
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "answer": "Qloo selected these locations based on multi-domain affinity correlation...",
    "dataPoints": ["Audience Openness Index: 94%"]
  }
  ```

### 7. `POST /api/tour/compare`
Computes audience taste overlap and festival stage co-billing feasibility between two artists.
- **Request Body:**
  ```json
  {
    "artistA": "chappell-roan",
    "artistB": "charli-xcx"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "artistA": { "name": "Chappell Roan" },
    "artistB": { "name": "Charli XCX" },
    "overlapScore": 69,
    "feasibilityVerdict": "High Co-Headline Feasibility",
    "strategicRecommendation": "Prime candidates for co-billing...",
    "sharedAffinities": { "dining": [...], "brands": [...] }
  }
  ```

## Related Subjects
- How-to add an endpoint: [03-add-api-endpoint.md](../00-how-to/03-add-api-endpoint.md)
- Core agent engine: [tour-agent.md](../02-core-engine/tour-agent.md)
