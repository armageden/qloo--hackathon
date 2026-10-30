import fs from "node:fs";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { qlooClient, QlooClient } from "./src/qloo-client.js";
import { tourAgent, TourAgent } from "./src/tour-agent.js";
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

  // Test 7: Fallback Robustness on Unknown Performer & Market
  const fallbackPkg = await tourAgent.generateTourPackage("brand-new-emerging-indie-artist", "austin");
  assert(Boolean(fallbackPkg.metadata.artist), "TourAgent handles uncataloged performers gracefully");
  assert(fallbackPkg.itinerary.length === 6, "Fallback itinerary maintains standard 6-stop takeover schedule");

  // Test 8: Agent Query Resilience Without Active Package
  const standAloneChat = await tourAgent.answerAgentQuery("how does Qloo calculate audience cross-domain affinity?", null);
  assert(standAloneChat.answer.length > 50, "Standalone chat produces comprehensive cultural intelligence");

  // Test 9: Mostar Tour Market Grounding
  assert(CITIES_DATABASE["mostar"] !== undefined, "Mostar is registered in CITIES_DATABASE");
  const mostarPkg = await tourAgent.generateTourPackage("charli-xcx", "mostar");
  assert(mostarPkg.metadata.city === "Mostar", "TourAgent routes to Mostar market");
  assert(mostarPkg.itinerary.some(i => i.venue.includes("Hindin Han") || i.venue.includes("Ali Baba")), "Mostar itinerary includes authentic local cultural venues");

  // Test 10: Provenance Integrity
  const configuredFallbackAgent = new TourAgent({
    search: async () => ({ status: "ok", source: "qloo_verified_cache", provenance: "cache", data: [{ id: "urn:entity:music:chappell_roan", name: "Chappell Roan", properties: {} }] }),
    getRecommendations: async () => ({ status: "ok", source: "qloo_verified_cache", recommendations: ARTISTS_DATABASE["chappell-roan"].affinities, provenance: { brands: "qloo_verified_cache" } }),
    isConfigured: () => true
  });
  const configuredFallbackPkg = await configuredFallbackAgent.generateTourPackage("chappell-roan", "chicago");
  assert(configuredFallbackPkg.metadata.qlooMode === "grounded_taste_graph", "Configured credentials do not imply live package data");
  assert(configuredFallbackPkg.metadata.provenance.liveDataUsed === false, "Package provenance reports no live data when all results are cached");

  const customArtistPkg = await tourAgent.generateTourPackage("A New Touring Artist", "mostar");
  assert(customArtistPkg.metadata.artist === "A New Touring Artist", "Backend generation preserves unknown artist identity");

  const originalFetch = globalThis.fetch;
  const liveClient = new QlooClient("test-api-key", "https://qloo.test");
  try {
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ results: { entities: [{ id: "live-1", name: "Nested Artist" }] } }) });
    const nestedSearch = await liveClient.search("Nested Artist");
    assert(nestedSearch.source === "qloo_live_api" && nestedSearch.data[0].id === "live-1", "Qloo search normalizes nested results.entities envelopes");

    globalThis.fetch = async () => ({ ok: true, json: async () => ({ results: { entities: [{ name: "Live Brand", subtype: "brand:apparel" }] } }) });
    const mixedRecs = await liveClient.getRecommendations("live-entity", "all", "chicago", "chappell-roan");
    assert(mixedRecs.source === "mixed_live_and_cache", "Live brand recommendations are marked mixed with cached affinity domains");
    assert(mixedRecs.provenance.brands === "qloo_live_api" && mixedRecs.provenance.dining === "qloo_verified_cache", "Recommendation provenance distinguishes live and cached domains");

    globalThis.fetch = async () => ({ ok: true, json: async () => ({ results: { entities: [] } }) });
    const emptyRecs = await liveClient.getRecommendations("empty-entity", "all", "chicago", "chappell-roan");
    assert(emptyRecs.source === "qloo_verified_cache", "Empty live Insights results do not count as live recommendation data");
  } finally {
    globalThis.fetch = originalFetch;
  }

  const appSource = fs.readFileSync("public/app.js", "utf8");
  const fallbackStart = appSource.indexOf("function synthesizeFallbackTourPackage(");
  const fallbackFactory = new Function(`${appSource.slice(fallbackStart)}; return synthesizeFallbackTourPackage;`)();
  const browserMostarFallback = fallbackFactory("new-indie-act", "mostar");
  assert(browserMostarFallback.metadata.artist === "new-indie-act", "Browser fallback preserves custom artist names");
  assert(browserMostarFallback.metadata.city === "Mostar" && browserMostarFallback.itinerary.some(stop => stop.venue === "Hindin Han"), "Browser fallback preserves Mostar and local venues");
  assert(browserMostarFallback.metadata.qlooMode === "local_fallback", "Browser fallback identifies itself as local rather than Qloo-grounded");
  assert(appSource.includes("if (!res.ok) throw new Error(data.error || `HTTP ${res.status}: ${res.statusText}`)"), "API-key save surfaces HTTP errors");
  assert(appSource.includes("const requestId = ++tourRequestId") && appSource.includes("requestId !== tourRequestId"), "Tour generation ignores stale responses");

  // Test 11: HTTP Route and Asset Integrity
  process.env.VERCEL = "1";
  const { handleRequest } = await import("./server.js");
  const routeServer = createServer(handleRequest);
  await new Promise(resolve => routeServer.listen(0, "127.0.0.1", resolve));
  const routeBase = `http://127.0.0.1:${routeServer.address().port}`;
  try {
    const rootPage = await fetch(`${routeBase}/`);
    const consolePage = await fetch(`${routeBase}/tourcraft`);
    const consoleSlashPage = await fetch(`${routeBase}/tourcraft/`);
    const mostarPage = await fetch(`${routeBase}/mostar`);
    const mostarSlashPage = await fetch(`${routeBase}/mostar/`);
    const rootHtml = await rootPage.text();
    assert(rootHtml.includes("TOURCRAFT") || rootHtml.includes("TourCraft"), "Root route serves the TourCraft console");
    assert((await mostarPage.text()).includes("Mostar city"), "Mostar route serves the Mostar cinematic page");
    assert((await mostarSlashPage.text()).includes("Mostar city"), "Mostar slash route serves the Mostar cinematic page");
    for (const page of [consolePage, consoleSlashPage]) {
      const html = await page.text();
      assert(html.includes('href="/style.css"') && html.includes('src="/app.js"'), "Both console route forms use root-relative assets");
    }
    const [cssResponse, jsResponse, citiesResponse] = await Promise.all([
      fetch(`${routeBase}/style.css`),
      fetch(`${routeBase}/app.js`),
      fetch(`${routeBase}/api/cities`)
    ]);
    assert(cssResponse.headers.get("content-type").startsWith("text/css"), "Console stylesheet is served as CSS");
    assert(jsResponse.headers.get("content-type").startsWith("application/javascript"), "Console script is served as JavaScript");
    const citiesPayload = await citiesResponse.json();
    assert(citiesPayload.cities.some(city => city.key === "mostar"), "Cities API exposes the Mostar market");
  } finally {
    await new Promise((resolve, reject) => routeServer.close(err => err ? reject(err) : resolve()));
    delete process.env.VERCEL;
  }

  // Test 12: Public File Integrity
  const requiredPublicFiles = [
    "public/index.html",
    "public/styles.css",
    "public/script.js",
    "public/tourcraft.html",
    "public/app.js",
    "public/style.css"
  ];
  for (const pf of requiredPublicFiles) {
    assert(fs.existsSync(pf), `Public asset exists on disk: ${pf}`);
  }

  // Test 13: Audience comparison preserves uncataloged artist identities
  const customCmp = await tourAgent.compareAudiences("A Brand New Touring Performer", "Another Emerging Headliner");
  assert(customCmp.artistA.name === "A Brand New Touring Performer", "Audience comparison preserves uncataloged artist A identity");
  assert(customCmp.artistB.name === "Another Emerging Headliner", "Audience comparison preserves uncataloged artist B identity");
  assert(typeof customCmp.overlapScore === "number", "Custom comparison returns numeric overlap score");

  // Test 14: Model Context Protocol (MCP) JSON-RPC 2.0 Compliance
  const mcpProc = spawn("node", ["cli.js", "mcp"], { stdio: ["pipe", "pipe", "ignore"] });
  let mcpOutput = "";
  mcpProc.stdout.on("data", chunk => { mcpOutput += chunk.toString(); });
  const initReq = JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: {} }) + "\n";
  const listReq = JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list", params: {} }) + "\n";
  mcpProc.stdin.write(initReq);
  mcpProc.stdin.write(listReq);
  mcpProc.stdin.end();
  await new Promise(resolve => mcpProc.on("close", resolve));
  const mcpLines = mcpOutput.trim().split("\n").filter(l => l.startsWith("{"));
  assert(mcpLines.length >= 2, "MCP process yields structured JSON-RPC responses");
  const initRes = JSON.parse(mcpLines[0]);
  const listRes = JSON.parse(mcpLines[1]);
  assert(initRes.result?.serverInfo?.name === "tourcraft", "MCP initialize returns server identity");
  assert(Array.isArray(listRes.result?.tools) && listRes.result.tools.length >= 4, "MCP tools/list exposes at least 4 operational tools");
  assert(listRes.result.tools.some(t => t.name === "tourcraft_chat"), "MCP exposes tourcraft_chat conversational tool");

  // Test 15: Promoter Economics & Deal Model
  const samplePkgForDeal = await tourAgent.generateTourPackage("chappell-roan", "chicago");
  const arenaDeal = tourAgent.calculatePromoterEconomics(samplePkgForDeal, "arena");
  assert(arenaDeal.totalAncillaryRevenue > 0, "Deal calculator produces positive total ancillary revenue");
  assert(arenaDeal.sponsorshipTiers.length === 3, "Deal calculator produces 3 sponsorship tiers");
  assert(arenaDeal.roiLiftPercentage >= 30, "Deal calculator produces quantifiable ROI lift percentage");
  assert(arenaDeal.concourseLift.netAncillaryLift > 0, "Deal calculator quantifies concourse spend lift");

  // Test 16: Multi-City Tour Leg Planning
  const tourLeg = await tourAgent.planTourLeg("chappell-roan", ["chicago", "new-york", "los-angeles"]);
  assert(tourLeg.stopsCount === 3, "Tour leg planner reflects 3 scheduled markets");
  assert(tourLeg.aggregateStats.totalAncillaryRevenue > 0, "Tour leg computes cumulative ancillary unlock");
  assert(Array.isArray(tourLeg.stops) && tourLeg.stops.length === 3, "Tour leg contains detailed stops specifications");

  // Test 17: Dual-Mode LLM Agent Reasoning
  assert(typeof tourAgent.hasLLMConfigured() === "boolean", "TourAgent exposes LLM configuration state");
  const agentAnswer = await tourAgent.answerAgentQuery("Why natural wine?", samplePkgForDeal);
  assert(typeof agentAnswer.answer === "string" && agentAnswer.answer.length > 20, "Agent query returns substantive reasoning");
  assert(Array.isArray(agentAnswer.dataPoints) && agentAnswer.dataPoints.length > 0, "Agent query returns quantified data points");

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runTestSuite().catch(err => {
  console.error("Test suite error:", err);
  process.exit(1);
});
