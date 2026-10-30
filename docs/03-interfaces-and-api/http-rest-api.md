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
    "artistsCount": 9,
    "citiesCount": 8
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
- **Response `200 OK`:** Full tour package object (see [tour-agent.md](../02-core-engine/tour-agent.md)). Its `metadata.provenance` distinguishes entity resolution, recommendation domains, local artist/city data, and whether live Qloo data was actually used; `metadata.qlooMode` is `mixed` when live search or live brand recommendations are combined with local database data.

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

### 8. `POST /api/deal/calculate`
Calculates Live Nation promoter commercial economics and ancillary spend projections across venue capacity tiers (`club`, `theater`, `arena`, `stadium`).
- **Request Body:**
  ```json
  {
    "package": { ... },
    "capacityTier": "arena"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "tier": "arena",
    "tierName": "Major Concert Arena",
    "capacity": 20000,
    "ticketGross": 2800000,
    "totalSponsorshipValue": 465000,
    "totalAncillaryRevenue": 639000,
    "roiLiftPercentage": 42,
    "sponsorshipTiers": [...],
    "promoterPitch": "By grounding tour sponsor rights in Qloo's taste graph..."
  }
  ```

### 9. `POST /api/tour/route`
Plans multi-city tour legs, computing aggregate fan reach and multi-market brand synergies.
- **Request Body:**
  ```json
  {
    "artist": "chappell-roan",
    "cities": ["chicago", "new-york", "los-angeles"]
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "artist": "Chappell Roan",
    "stopsCount": 3,
    "aggregateStats": {
      "totalAttendanceCap": 60000,
      "totalSponsorshipValue": 1395000,
      "totalAncillaryRevenue": 1917000
    },
    "multiCitySponsorSynergy": [...],
    "stops": [...]
  }
  ```

### 10. `POST /api/config/llm`
Configures or overrides the live Gemini AI Co-Pilot API key and model at runtime.
- **Request Body:**
  ```json
  {
    "apiKey": "your-gemini-api-key",
    "model": "gemini-3.8-flash"
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "hasGeminiKey": true,
    "model": "gemini-3.8-flash"
  }
  ```

## Static Routes
- `/`, `/tourcraft`: Serves `public/tourcraft.html` (the primary TourCraft cultural tour console).
- `/mostar`: Serves `public/index.html` (the Mostar city showcase page).
- Root-relative assets (`/style.css`, `/app.js`, `/styles.css`, `/script.js`) are served directly from `public/`.

## Related Subjects
- How-to add an endpoint: [03-add-api-endpoint.md](../00-how-to/03-add-api-endpoint.md)
- Core agent engine: [tour-agent.md](../02-core-engine/tour-agent.md)
