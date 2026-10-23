**Back:** [00-overview](./00-overview.md)

# How-To: Add a Tour Market City

## 1. Goal
Use this recipe when registering a new metropolitan market (e.g. `"tokyo"`, `"berlin"`, `"miami"`) complete with primary concert arenas and curated cultural neighborhoods.

## 2. Step-by-Step Procedure

1. **Add City Record in `src/taste-database.js`:**
   Add a new key under `CITIES_DATABASE` with venues and cultural neighborhoods containing dining, nightlife, and fashion picks.
2. **Add City Button in `public/index.html`:**
   Add a `<button class="city-btn" data-city="tokyo">` button inside `#citySelector`.
3. **Verify via CLI and Tests:**
   Run `test.js` and generate an itinerary for the new market.

## 3. Real Code Patterns

From `src/taste-database.js`:
```js
export const CITIES_DATABASE = {
  // ... existing cities ...
  "tokyo": {
    name: "Tokyo",
    state: "Kanto",
    country: "Japan",
    tagline: "The Global Capital of Precision Audio & Futuristic Nightlife",
    majorVenues: ["Tokyo Dome", "Budokan", "Ariake Arena"],
    culturalNeighborhoods: [
      {
        name: "Shibuya / Shimokitazawa",
        vibe: "Vinyl listening bars, vintage clothing thrift stores, micro-izakayas",
        topPicks: {
          dining: [
            { name: "Toriyoshi Shimokitazawa", type: "Artisanal Yakitori", address: "Shimokitazawa", whyQloo: "Authentic neighborhood gathering spot for indie musicians and artists." }
          ],
          nightlife: [
            { name: "Bar Music Shibuya", type: "Audiophile Vinyl Lounge", address: "Shibuya", whyQloo: "Klipsch speakers, low lighting, and meticulously curated jazz and soul archives." }
          ],
          fashion: [
            { name: "Flamingo Vintage", type: "Curated Retro Americana & Japanese Streetwear", address: "Shimokitazawa", whyQloo: "Over-indexes with creative gig-goers seeking archival fashion." }
          ]
        }
      }
    ]
  }
};
```

In `public/index.html`:
```html
<div class="city-selector-grid" id="citySelector">
  <!-- Insert new city button -->
  <button class="city-btn" data-city="tokyo">
    <span class="city-name">Tokyo, JP</span>
    <span class="city-venue">Tokyo Dome</span>
  </button>
</div>
```

## 4. Verification

```sh
node test.js
node cli.js run "kendrick-lamar" "tokyo"
```

## 5. Deep-Dive Links
- Reference documentation: [taste-database.md](../02-core-engine/taste-database.md)
- REST cities endpoint: [http-rest-api.md](../03-interfaces-and-api/http-rest-api.md)
