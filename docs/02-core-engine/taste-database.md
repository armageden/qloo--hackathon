**Back:** [00-overview](./00-overview.md)

# Taste Database Module

Located at `src/taste-database.js`.

Provides verified cultural taste graph data across top touring headliners, genres, and metropolitan markets. It serves as both the verified grounding cache and baseline test fixtures for TourCraft.

## Exported Constants

```js
import { ARTISTS_DATABASE, CITIES_DATABASE } from "./src/taste-database.js";
```

### `ARTISTS_DATABASE`
Dictionary of pre-grounded artist profiles keyed by slug:
- `chappell-roan`: Midwest Pop, Synthpop, Queer Glam
- `charli-xcx`: Hyperpop, Electropop, Club Pop, Brat Pop
- `kendrick-lamar`: Conscious Hip-Hop, West Coast Rap, Jazz Rap
- `tyler-the-creator`: Alternative Hip-Hop, Neo-Soul, GOLF Auteur
- `bad-bunny`: Reggaeton, Latin Trap, Global Icon
- `fred-again`: UK Garage, Emotional House, Ambient Electronic
- `john-summit`: Tech House, Commercial Dance
- `cedric-the-entertainer`: Stand-up Comedy, Kings of Comedy
- `billie-eilish`: Alternative Pop, Dark Pop, Eco-Pop

#### Artist Record Schema
```ts
interface ArtistRecord {
  id: string; // e.g., "urn:entity:music:chappell_roan"
  name: string;
  slug: string;
  genres: string[];
  vibe: string;
  demographics: {
    primaryAge: string;
    genderSkew: string;
    topSubcultures: string[];
    culturalOpenness: number; // 0.0 to 1.0
  };
  affinities: {
    dining: Array<{ name: string; affinityScore: number; category: string; rationale: string }>;
    nightlife: Array<{ name: string; affinityScore: number; category: string; rationale: string }>;
    fashion: Array<{ name: string; affinityScore: number; category: string; rationale: string }>;
    brands: Array<{ name: string; affinityScore: number; category: string; activationIdea: string; pitch: string }>;
    filmTv: Array<{ title: string; affinityScore: number }>;
  };
}
```

### `CITIES_DATABASE`
Dictionary of metropolitan tour markets keyed by slug:
- `chicago`: United Center, Wintrust Arena, The Salt Shed
- `new-york`: Madison Square Garden, Barclays Center, Brooklyn Mirage
- `los-angeles`: Kia Forum, Crypto.com Arena, Hollywood Bowl
- `london`: The O2 Arena, Wembley Arena, Alexandra Palace
- `austin`: Moody Center, ACL Live at the Moody Theater
- `tokyo`: Tokyo Dome, Nippon Budokan, Ariake Arena
- `berlin`: Uber Arena, Tempodrom, Velodrom

#### City Record Schema
```ts
interface CityRecord {
  name: string;
  state: string;
  country: string;
  tagline: string;
  majorVenues: string[];
  culturalNeighborhoods: Array<{
    name: string;
    vibe: string;
    topPicks: {
      dining: Array<{ name: string; type: string; address: string; whyQloo: string }>;
      nightlife: Array<{ name: string; type: string; address: string; whyQloo: string }>;
      fashion: Array<{ name: string; type: string; address: string; whyQloo: string }>;
    };
  }>;
}
```

## Related Subjects
- How-to add an artist: [01-add-artist-preset.md](../00-how-to/01-add-artist-preset.md)
- How-to add a city: [02-add-tour-market-city.md](../00-how-to/02-add-tour-market-city.md)
- Client integration: [qloo-client.md](./qloo-client.md)
