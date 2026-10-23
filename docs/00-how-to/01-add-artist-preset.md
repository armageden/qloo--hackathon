**Back:** [00-overview](./00-overview.md)

# How-To: Add a Touring Artist Preset

## 1. Goal
Use this recipe when adding a new pre-grounded touring artist or comedian into TourCraft's database and frontend preset bar.

## 2. Step-by-Step Procedure

1. **Add the Artist Record to `src/taste-database.js`:**
   Add a new key under `ARTISTS_DATABASE` matching the artist slug (e.g. `"charli-xcx"`).
2. **Add the Preset Button in `public/index.html`:**
   Add a `<button class="preset-btn" data-artist="charli-xcx">Charli XCX</button>` inside the `#artistPresets` container.
3. **Add Test Assertions in `test.js`:**
   Verify resolution and database lookup in the automated test suite.

## 3. Real Code Patterns

From `src/taste-database.js`:
```js
export const ARTISTS_DATABASE = {
  // ... existing artists ...
  "charli-xcx": {
    id: "urn:entity:music:charli_xcx",
    name: "Charli XCX",
    slug: "charli-xcx",
    genres: ["Hyperpop", "Electropop", "Club Pop", "Brat Pop"],
    vibe: "Club-kid hedonism, auto-tuned vulnerability, avant-pop production, green aesthetic",
    demographics: {
      primaryAge: "18-32",
      genderSkew: "55% Female / 45% Male / Non-Binary",
      topSubcultures: ["Hyperpop Ravers", "Boiler Room Scene", "Y2K Cyberpunk", "Fashion Avant-Garde"],
      culturalOpenness: 0.98
    },
    affinities: {
      dining: [
        { name: "Late-Night Izakayas & Highballs", affinityScore: 97, category: "Dining", rationale: "High affinity for fast, high-energy Japanese pub culture before club events." },
        { name: "Natural Pet-Nat Wine Bars", affinityScore: 94, category: "Beverage", rationale: "Strong crossover with indie creative and club communities." }
      ],
      nightlife: [
        { name: "360-Degree Boiler Room Warehouses", affinityScore: 99, category: "Rave", rationale: "Signature environment for Charli's iconic Partygirl DJ sets." }
      ],
      fashion: [
        { name: "Acid Green & Low-Waisted Cyber Y2K", affinityScore: 98, category: "Aesthetic", rationale: "Signature visual language defined by the Brat era." }
      ],
      brands: [
        { name: "Acne Studios", affinityScore: 95, category: "Luxury Fashion", activationIdea: "VIP Green Room Custom Tour Wardrobe Pod", pitch: "Subversive European luxury with high club appeal." }
      ],
      filmTv: [
        { title: "Bodies Bodies Bodies", affinityScore: 96 }
      ]
    }
  }
};
```

In `public/index.html`:
```html
<div class="artist-presets" id="artistPresets">
  <!-- Insert new button -->
  <button class="preset-btn" data-artist="charli-xcx">Charli XCX</button>
</div>
```

## 4. Verification

Run the test suite and verify CLI execution:
```sh
node test.js
node cli.js run "charli-xcx" "chicago"
```

## 5. Deep-Dive Links
- Reference documentation: [taste-database.md](../02-core-engine/taste-database.md)
- Agent orchestrator: [tour-agent.md](../02-core-engine/tour-agent.md)
