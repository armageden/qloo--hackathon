import { qlooClient } from "./src/qloo-client.js";
import { tourAgent } from "./src/tour-agent.js";
import { ARTISTS_DATABASE, CITIES_DATABASE } from "./src/taste-database.js";

async function runTestSuite() {
  console.log("=== Running TourCraft Verification Suite ===");
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  // Test 1: Database integrity
  assert(Object.keys(ARTISTS_DATABASE).length >= 5, "Artists database has sufficient multi-genre coverage");
  assert(Object.keys(CITIES_DATABASE).length >= 5, "Cities database has multiple tour markets");

  // Test 2: Qloo Client Search
  const searchRes = await qlooClient.search("Kendrick Lamar", "music");
  assert(searchRes.status === "ok", "QlooClient search returns status ok");
  assert(searchRes.data.length > 0, "QlooClient search returns entity matches");
  assert(searchRes.data[0].name === "Kendrick Lamar", "QlooClient resolves exact artist name");

  // Test 3: Recommendations & Taste Graph
  const recs = await qlooClient.getRecommendations("urn:entity:music:kendrick_lamar", "all", "los-angeles");
  assert(recs.status === "ok", "QlooClient recommendations return status ok");
  assert(recs.recommendations.dining.length > 0, "Cross-domain dining affinities exist");
  assert(recs.recommendations.brands.length > 0, "Cross-domain brand sponsor affinities exist");

  // Test 4: TourAgent Package Generation
  const pkg = await tourAgent.generateTourPackage("fred-again", "new-york");
  assert(pkg.metadata.artist === "Fred again..", "TourAgent resolves Fred again..");
  assert(pkg.metadata.city === "New York", "TourAgent routes to New York");
  assert(pkg.itinerary.length === 6, "24-Hour Itinerary contains 6 curated stops");
  assert(pkg.brandSponsorshipMatrix.length > 0, "Brand sponsorship matrix populated");

  // Test 5: Agent Chat Reasoning
  const chatRes = await tourAgent.answerAgentQuery("why did Qloo recommend this?", pkg);
  assert(chatRes.answer.includes("Qloo"), "Agent chat references Qloo intelligence");
  assert(chatRes.dataPoints.length > 0, "Agent chat includes quantified data points");

  // Test 6: Audience Taste Comparison
  const cmp = await tourAgent.compareAudiences("chappell-roan", "charli-xcx");
  assert(cmp.overlapScore >= 50, "Audience comparison produces quantified overlap score");
  assert(cmp.feasibilityVerdict.length > 0, "Audience comparison provides feasibility verdict");
  assert(cmp.divergence.artistAExclusive.length > 0, "Audience divergence highlights distinctive aesthetics");

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runTestSuite().catch(err => {
  console.error("Test suite error:", err);
  process.exit(1);
});
