**Back:** [00-overview](./00-overview.md)

# How-To: Add a Tour Market City

## 1. Goal
Use this recipe when registering a new metropolitan market (e.g. `"tokyo"`, `"berlin"`, `"miami"`) complete with primary concert arenas and curated cultural neighborhoods.

## 2. Step-by-Step Procedure

1. **Add City Record in `src/taste-database.js`:**
   Add a new key under `CITIES_DATABASE` with venues and cultural neighborhoods containing dining, nightlife, and fashion picks.
2. **Update the TourCraft selector in `public/tourcraft.html` only when needed:**
   `public/app.js` hydrates `#citySelector` from `GET /api/cities` and adds missing market buttons. Keep static buttons in sync for the no-backend HTML fallback; do not add console city buttons to the cinematic `public/index.html`.
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

For a static fallback entry, add a button to `#citySelector` in `public/tourcraft.html`:
```html
<button class="city-btn" data-city="tokyo" type="button">
  <span class="city-name">Tokyo, JP</span>
  <span class="city-venue">Tokyo Dome</span>
</button>
```
The normal console path obtains city buttons from `GET /api/cities` and does not require a duplicated static button.

## 4. Verification

```sh
node test.js
node cli.js run "kendrick-lamar" "tokyo"
```

## 5. Deep-Dive Links
- Reference documentation: [taste-database.md](../02-core-engine/taste-database.md)
- REST cities endpoint: [http-rest-api.md](../03-interfaces-and-api/http-rest-api.md)
