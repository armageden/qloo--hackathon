**Back:** [00-overview](./00-overview.md)

# TourAgent Module

Located at `src/tour-agent.js`.

The `TourAgent` class orchestrates the end-to-end transformation of an artist entity and tour city into a 24-hour cultural takeover itinerary and executive sponsorship proposal.

## Class Definition

```js
import { tourAgent, TourAgent } from "./src/tour-agent.js";
```

### Constructor
```js
new TourAgent(client = qlooClient)
```
Accepts an instance of `QlooClient` (defaults to the singleton instance).

## Key Methods

### `generateTourPackage(artistInput, cityKey)`
- **Parameters:**
  - `artistInput` *(string)*: Name or slug of the touring act (e.g. `"chappell-roan"`, `"kendrick-lamar"`).
  - `cityKey` *(string)*: Target city key (e.g. `"chicago"`, `"new-york"`, `"los-angeles"`).
- **Returns:** Promise resolving to an object containing:
  - `metadata`: Execution timing, data source provenance, venue name, and city.
  - `artistProfile`: Genres, vibe description, and demographic profile.
  - `culturalAffinities`: Domain-specific affinity arrays (dining, nightlife, fashion, brands, film/TV).
  - `itinerary`: Array of 6 chronological stops from morning fuel to late-night eats.
  - `brandSponsorshipMatrix`: 4 high-affinity brand sponsor proposals with activation concepts and pitch notes.
  - `executiveSummary`: High-level strategic briefing text.

### `answerAgentQuery(query, activePackage)`
- **Parameters:**
  - `query` *(string)*: Natural language question from the user or promoter.
  - `activePackage` *(object|null)*: Current tour package context.
- **Returns:** Promise resolving to:
  ```json
  {
    "answer": "Explanation grounded in Qloo affinity data...",
    "dataPoints": ["Metric 1", "Metric 2"]
  }
  ```

### `compareAudiences(artistAInput, artistBInput)`
- **Parameters:**
  - `artistAInput` *(string)*: First touring performer name or slug.
  - `artistBInput` *(string)*: Second touring performer name or slug.
- **Returns:** Promise resolving to:
  ```json
  {
    "artistA": { "name": "Chappell Roan", "genres": [...] },
    "artistB": { "name": "Charli XCX", "genres": [...] },
    "overlapScore": 69,
    "feasibilityVerdict": "High Co-Headline Feasibility",
    "strategicRecommendation": "Prime candidates for co-billing...",
    "sharedAffinities": { "dining": [...], "brands": [...] },
    "divergence": { "artistAExclusive": "...", "artistBExclusive": "..." },
    "provenance": "Qloo Multi-Domain Audience Affinity Comparison"
  }
  ```

## Related Subjects
- Upstream client: [qloo-client.md](./qloo-client.md)
- Data schemas: [taste-database.md](./taste-database.md)
- API endpoint handler: [http-rest-api.md](../03-interfaces-and-api/http-rest-api.md)
