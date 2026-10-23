// TourCraft Frontend Application
// Connects to the TourCraft API and manages the Qloo-powered UI state

let currentTourPackage = null;
let currentArtist = "chappell-roan";
let currentCity = "chicago";
let activeAffinityTab = "dining";
let activeViewMode = "takeover";

// DOM Elements
const artistPresets = document.querySelectorAll(".preset-btn");
const cityButtons = document.querySelectorAll(".city-btn");
const customArtistInput = document.getElementById("customArtistInput");
const btnSynthesizeTour = document.getElementById("btnSynthesizeTour");
const loadingState = document.getElementById("loadingState");
const tourResults = document.getElementById("tourResults");

const qlooStatusPill = document.getElementById("qlooStatusPill");
const qlooStatusText = document.getElementById("qlooStatusText");
const btnSonicPreview = document.getElementById("btnSonicPreview");

// View Modes
const tabModeTakeover = document.getElementById("tabModeTakeover");
const tabModeCompare = document.getElementById("tabModeCompare");
const tabModeInspector = document.getElementById("tabModeInspector");

const takeoverConfigCard = document.getElementById("takeoverConfigCard");
const comparisonSection = document.getElementById("comparisonSection");
const inspectorSection = document.getElementById("inspectorSection");

// Comparison Elements
const compareSelectA = document.getElementById("compareSelectA");
const compareSelectB = document.getElementById("compareSelectB");
const btnRunComparison = document.getElementById("btnRunComparison");
const comparisonResultsCard = document.getElementById("comparisonResultsCard");
const cmpScoreNum = document.getElementById("cmpScoreNum");
const cmpVerdictTag = document.getElementById("cmpVerdictTag");
const cmpHeadline = document.getElementById("cmpHeadline");
const cmpStrategyText = document.getElementById("cmpStrategyText");
const cmpSharedVectors = document.getElementById("cmpSharedVectors");
const cmpDivergence = document.getElementById("cmpDivergence");

// Telemetry & Inspector
const inspectorArtistCount = document.getElementById("inspectorArtistCount");
const inspectorCityCount = document.getElementById("inspectorCityCount");
const rawJsonInspector = document.getElementById("rawJsonInspector");
const btnCopyRawPayload = document.getElementById("btnCopyRawPayload");

// Modals
const keyModal = document.getElementById("keyModal");
const btnOpenKeyModal = document.getElementById("btnOpenKeyModal");
const btnCloseKeyModal = document.getElementById("btnCloseKeyModal");
const btnCancelKey = document.getElementById("btnCancelKey");
const btnSaveKey = document.getElementById("btnSaveKey");
const inputApiKey = document.getElementById("inputApiKey");
const keyValidationResult = document.getElementById("keyValidationResult");

const exportModal = document.getElementById("exportModal");
const btnExportRider = document.getElementById("btnExportRider");
const btnCloseExportModal = document.getElementById("btnCloseExportModal");
const exportTextarea = document.getElementById("exportTextarea");
const btnCopyExport = document.getElementById("btnCopyExport");
const btnDownloadExport = document.getElementById("btnDownloadExport");

// Chat
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatArtistPrompt = document.getElementById("chatArtistPrompt");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  fetchStatus();
  setupEventListeners();
  // Auto-generate default tour on load
  generateTour("chappell-roan", "chicago");
});

function setupEventListeners() {
  // Mode Tabs
  tabModeTakeover.addEventListener("click", () => switchViewMode("takeover"));
  tabModeCompare.addEventListener("click", () => switchViewMode("compare"));
  tabModeInspector.addEventListener("click", () => switchViewMode("inspector"));

  // Sonic Preview Button
  btnSonicPreview.addEventListener("click", () => playSonicIdentity(currentArtist));

  // Preset buttons
  artistPresets.forEach(btn => {
    btn.addEventListener("click", () => {
      artistPresets.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentArtist = btn.dataset.artist;
      customArtistInput.value = btn.textContent.trim();
    });
  });

  // Custom artist input
  customArtistInput.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    if (val) {
      currentArtist = val;
      artistPresets.forEach(b => b.classList.remove("active"));
    }
  });

  // City buttons
  cityButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      cityButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCity = btn.dataset.city;
    });
  });

  // Generate button
  btnSynthesizeTour.addEventListener("click", () => {
    generateTour(currentArtist, currentCity);
  });

  // Comparison Runner
  btnRunComparison.addEventListener("click", runComparison);

  // Copy Raw JSON Payload
  btnCopyRawPayload.addEventListener("click", () => {
    navigator.clipboard.writeText(rawJsonInspector.textContent);
    btnCopyRawPayload.textContent = "Copied!";
    setTimeout(() => { btnCopyRawPayload.textContent = "Copy JSON"; }, 2000);
  });

  // Affinity tabs
  document.querySelectorAll(".tab-btn").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeAffinityTab = tab.dataset.tab;
      renderAffinities();
    });
  });

  // Modal open / close
  btnOpenKeyModal.addEventListener("click", () => keyModal.classList.remove("hidden"));
  btnCloseKeyModal.addEventListener("click", () => keyModal.classList.add("hidden"));
  btnCancelKey.addEventListener("click", () => keyModal.classList.add("hidden"));

  btnSaveKey.addEventListener("click", async () => {
    const key = inputApiKey.value.trim();
    keyValidationResult.textContent = "Validating with Qloo API...";
    keyValidationResult.className = "key-status-msg";

    try {
      const res = await fetch("/api/config/key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: key })
      });
      const data = await res.json();
      if (data.configured) {
        keyValidationResult.textContent = "Key saved! Live Qloo connection established.";
        keyValidationResult.className = "key-status-msg success";
        fetchStatus();
        setTimeout(() => keyModal.classList.add("hidden"), 1200);
      } else {
        keyValidationResult.textContent = "Key saved. Running in grounded taste cache mode.";
        keyValidationResult.className = "key-status-msg";
        fetchStatus();
        setTimeout(() => keyModal.classList.add("hidden"), 1200);
      }
    } catch (e) {
      keyValidationResult.textContent = "Failed to update key: " + e.message;
      keyValidationResult.className = "key-status-msg error";
    }
  });

  // Export Modal
  btnExportRider.addEventListener("click", () => {
    if (!currentTourPackage) return;
    exportTextarea.value = formatMarkdownRider(currentTourPackage);
    exportModal.classList.remove("hidden");
  });

  btnCloseExportModal.addEventListener("click", () => exportModal.classList.add("hidden"));

  btnCopyExport.addEventListener("click", () => {
    exportTextarea.select();
    navigator.clipboard.writeText(exportTextarea.value);
    btnCopyExport.textContent = "Copied!";
    setTimeout(() => {
      btnCopyExport.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy to Clipboard`;
    }, 2000);
  });

  btnDownloadExport.addEventListener("click", () => {
    if (!currentTourPackage) return;
    const blob = new Blob([exportTextarea.value], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentTourPackage.metadata.artist.replace(/\s+/g, "_")}_${currentTourPackage.metadata.city}_Cultural_Rider.md`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Chat Form
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    chatInput.value = "";
    appendUserMessage(query);

    // Show immediate thinking bubble
    const thinkingId = "thinking-" + Date.now();
    const thinkingDiv = document.createElement("div");
    thinkingDiv.id = thinkingId;
    thinkingDiv.className = "chat-bubble agent";
    thinkingDiv.innerHTML = `<span style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-acid); display: inline-flex; align-items: center; gap: 6px;"><span class="brand-pulse" style="width:6px;height:6px;"></span> CONSULTING QLOO TASTE GRAPH...</span>`;
    chatMessages.appendChild(thinkingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, activePackage: currentTourPackage })
      });
      const data = await res.json();
      const el = document.getElementById(thinkingId);
      if (el) el.remove();
      if (data && data.answer) {
        appendAgentMessage(data.answer, data.dataPoints);
      } else {
        appendAgentMessage("I analyzed the taste graph for this query, but no explicit match was returned. Try asking about fan fashion, dining, or afterparty spots.", []);
      }
    } catch (err) {
      const el = document.getElementById(thinkingId);
      if (el) el.remove();
      appendAgentMessage("Apologies, I encountered a connection issue while querying the taste graph.", []);
    }
  });
}

function switchViewMode(mode) {
  activeViewMode = mode;
  tabModeTakeover.classList.toggle("active", mode === "takeover");
  tabModeCompare.classList.toggle("active", mode === "compare");
  tabModeInspector.classList.toggle("active", mode === "inspector");

  takeoverConfigCard.classList.toggle("hidden", mode !== "takeover");
  tourResults.classList.toggle("hidden", mode !== "takeover" || !currentTourPackage);
  comparisonSection.classList.toggle("hidden", mode !== "compare");
  inspectorSection.classList.toggle("hidden", mode !== "inspector");

  if (mode === "compare" && comparisonResultsCard.classList.contains("hidden")) {
    runComparison();
  }
}

// Web Audio Ambient Chord Synthesizer
function playSonicIdentity(artistSlug) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Map artist slug to characteristic chord frequencies
    const chordFrequencies = {
      "chappell-roan": [261.63, 329.63, 392.00, 523.25], // C major glitter
      "charli-xcx": [311.13, 369.99, 466.16, 622.25], // Eb minor hyperpop
      "kendrick-lamar": [220.00, 261.63, 329.63, 440.00], // A minor conscious jazz
      "tyler-the-creator": [293.66, 369.99, 440.00, 587.33], // D major neo-soul
      "bad-bunny": [196.00, 246.94, 293.66, 392.00], // G major Caribbean warmth
      "fred-again": [246.94, 311.13, 369.99, 493.88], // B major ambient house
      "cedric-the-entertainer": [196.00, 246.94, 293.66, 349.23], // G7 blues supper club
      "john-summit": [277.18, 349.23, 415.30, 554.37], // Db major tech house
      "billie-eilish": [207.65, 246.94, 311.13, 415.30] // G# minor whispered dark pop
    };

    const notes = chordFrequencies[artistSlug] || chordFrequencies["chappell-roan"];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08 / notes.length, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.6);
    });

    btnSonicPreview.classList.add("is-playing");
    const textSpan = btnSonicPreview.querySelector(".btn-text");
    if (textSpan) textSpan.textContent = "Synthesizing...";
    setTimeout(() => {
      btnSonicPreview.classList.remove("is-playing");
      if (textSpan) textSpan.textContent = "Sonic Identity";
    }, 2600);
  } catch (err) {
    console.warn("AudioContext not supported or blocked", err);
  }
}

// Audience Comparison Runner
async function runComparison() {
  const artistA = compareSelectA.value;
  const artistB = compareSelectB.value;

  try {
    const res = await fetch("/api/tour/compare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artistA, artistB })
    });
    const cmp = await res.json();
    renderComparison(cmp);
  } catch (err) {
    console.warn("Comparison failed", err);
  }
}

function renderComparison(cmp) {
  comparisonResultsCard.classList.remove("hidden");
  cmpScoreNum.textContent = `${cmp.overlapScore}%`;
  cmpVerdictTag.textContent = cmp.feasibilityVerdict;
  cmpHeadline.textContent = `${cmp.artistA.name} & ${cmp.artistB.name}`;
  cmpStrategyText.textContent = cmp.strategicRecommendation;

  // Shared Vectors
  const sharedList = cmp.sharedAffinities.dining.concat(cmp.sharedAffinities.brands);
  if (sharedList.length > 0) {
    cmpSharedVectors.innerHTML = sharedList.map(item => `
      <div class="shared-vector-item">
        <span style="font-weight: 600;">${item.name || item.brand}</span>
        <span class="affinity-score-badge">${item.affinityScore}% MATCH</span>
      </div>
    `).join("");
  } else {
    cmpSharedVectors.innerHTML = `<p class="affinity-rationale">No direct overlapping brands recorded; distinct subcultural segments.</p>`;
  }

  // Divergence
  cmpDivergence.innerHTML = `
    <div class="divergence-card">
      <div class="divergence-artist">${cmp.artistA.name} Core Aesthetic</div>
      <div class="divergence-val">${cmp.divergence.artistAExclusive}</div>
    </div>
    <div class="divergence-card">
      <div class="divergence-artist">${cmp.artistB.name} Core Aesthetic</div>
      <div class="divergence-val">${cmp.divergence.artistBExclusive}</div>
    </div>
  `;

  // Update Telemetry Inspector with last comparison
  rawJsonInspector.textContent = JSON.stringify(cmp, null, 2);
}

// Fetch system status
async function fetchStatus() {
  try {
    const res = await fetch("/api/status");
    const data = await res.json();
    if (data.mode === "live_api" && data.hasApiKey) {
      qlooStatusPill.className = "qloo-status-pill";
      qlooStatusText.textContent = "Live Qloo API: Connected";
    } else {
      qlooStatusPill.className = "qloo-status-pill unconfigured";
      qlooStatusText.textContent = "Qloo Grounded Cache: Active";
    }

    if (inspectorArtistCount) inspectorArtistCount.textContent = data.artistsCount || 9;
    if (inspectorCityCount) inspectorCityCount.textContent = data.citiesCount || 7;
  } catch (e) {
    console.warn("Status check failed", e);
  }
}

// Generate Tour Package
async function generateTour(artist, city) {
  loadingState.classList.remove("hidden");
  tourResults.classList.add("hidden");

  try {
    const res = await fetch("/api/tour/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artist, city })
    });
    const pkg = await res.json();
    currentTourPackage = pkg;
    renderTourPackage(pkg);
    rawJsonInspector.textContent = JSON.stringify(pkg, null, 2);
  } catch (err) {
    alert("Error generating tour package: " + err.message);
  } finally {
    loadingState.classList.add("hidden");
    if (activeViewMode === "takeover") {
      tourResults.classList.remove("hidden");
    }
  }
}

// Render Tour Results
function renderTourPackage(pkg) {
  const { metadata, artistProfile, culturalAffinities, itinerary, brandSponsorshipMatrix, executiveSummary } = pkg;

  // Header
  document.getElementById("badgeCityMarket").textContent = `${metadata.city.toUpperCase()}, ${metadata.state || ''} • ${metadata.venue.toUpperCase()}`;
  document.getElementById("displayArtistName").textContent = metadata.artist;
  document.getElementById("displayArtistVibe").textContent = artistProfile.vibe || "Multi-category live tour experience";
  document.getElementById("displayProvenance").textContent = metadata.dataSource;

  // Demographics
  document.getElementById("statAge").textContent = artistProfile.demographics.primaryAge || "21-35";
  document.getElementById("statGender").textContent = artistProfile.demographics.genderSkew || "Diverse Demographic";
  document.getElementById("statOpenness").textContent = `${Math.round((artistProfile.demographics.culturalOpenness || 0.9) * 100)}%`;
  document.getElementById("executivePitchText").textContent = executiveSummary;

  // Subculture tags
  const subcultureTags = document.getElementById("subcultureTags");
  subcultureTags.innerHTML = (artistProfile.demographics.topSubcultures || ["Live Music", "Arts", "Culture"])
    .map(t => `<span class="tag">${t}</span>`)
    .join("");

  // Affinities
  renderAffinities();

  // Itinerary
  renderItinerary(itinerary, metadata.city);

  // Sponsorships
  renderSponsorships(brandSponsorshipMatrix);

  // Update Chat
  chatArtistPrompt.textContent = metadata.artist;
}

function renderAffinities() {
  if (!currentTourPackage) return;
  const affinities = currentTourPackage.culturalAffinities;
  const container = document.getElementById("affinityListContainer");
  const items = affinities[activeAffinityTab] || [];

  if (items.length === 0) {
    container.innerHTML = `<p class="affinity-rationale">No affinities recorded for this domain.</p>`;
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="affinity-item">
      <div class="affinity-item-top">
        <span class="affinity-name">${item.name}</span>
        <span class="affinity-score-badge">${item.affinityScore}% MATCH</span>
      </div>
      <div class="affinity-meter-bg">
        <div class="affinity-meter-fill" style="width: ${item.affinityScore}%"></div>
      </div>
      <p class="affinity-rationale">${item.rationale || item.pitch || 'High cross-domain audience alignment.'}</p>
    </div>
  `).join("");
}

function renderItinerary(itinerary, cityName) {
  document.getElementById("itineraryCityLabel").textContent = `Curated 24-Hour Plan for ${cityName}`;
  const container = document.getElementById("timelineContainer");

  container.innerHTML = itinerary.map(step => `
    <div class="timeline-card">
      <div class="timeline-header">
        <span class="timeline-time">${step.time}</span>
        <span class="timeline-stage">${step.stage}</span>
      </div>
      <h4 class="timeline-title">${step.title}</h4>
      <div class="timeline-venue">📍 ${step.venue} (${step.type})</div>
      <div class="timeline-address">${step.address}</div>
      <div class="timeline-callout">
        <strong>Why Qloo Grounded This:</strong> ${step.rationale}
      </div>
    </div>
  `).join("");
}

function renderSponsorships(sponsors) {
  const container = document.getElementById("sponsorshipGrid");
  container.innerHTML = sponsors.map(s => `
    <div class="sponsor-card">
      <div class="sponsor-top">
        <span class="sponsor-name">${s.brand}</span>
        <span class="sponsor-score">${s.affinityScore}% AFFINITY</span>
      </div>
      <div class="sponsor-concept">💡 ${s.activationConcept}</div>
      <p class="sponsor-pitch">${s.promoterPitch}</p>
      <div class="sponsor-lift">📈 ${s.projectedRoi}</div>
    </div>
  `).join("");
}

// Chat functions
window.askQuickQuestion = function(text) {
  chatInput.value = text;
  chatForm.dispatchEvent(new Event("submit"));
};

function appendUserMessage(text) {
  const div = document.createElement("div");
  div.className = "chat-bubble user";
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendAgentMessage(text, dataPoints = []) {
  const div = document.createElement("div");
  div.className = "chat-bubble agent";
  let html = `<p>${text}</p>`;

  if (dataPoints && dataPoints.length > 0) {
    html += `<div class="chat-datapoint-list">`;
    dataPoints.forEach(dp => {
      html += `<div class="chat-datapoint-item">📊 ${dp}</div>`;
    });
    html += `</div>`;
  }

  div.innerHTML = html;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Export formatting
function formatMarkdownRider(pkg) {
  const { metadata, artistProfile, itinerary, brandSponsorshipMatrix, executiveSummary } = pkg;
  return `# LIVE NATION CULTURAL TOUR RIDER & SPONSORSHIP PROPOSAL
Generated by TourCraft: Grounded in Qloo Taste Graph (250M+ Entities)
Date: ${new Date(metadata.timestamp).toLocaleDateString()}
Artist: ${metadata.artist}
Tour Market: ${metadata.city}, ${metadata.state || ''} (${metadata.country})
Headliner Venue: ${metadata.venue}
Data Provenance: ${metadata.dataSource}

---

## 1. EXECUTIVE SUMMARY
${executiveSummary}

---

## 2. AUDIENCE CULTURAL PROFILE & DEMOGRAPHICS
- Core Age Bracket: ${artistProfile.demographics.primaryAge}
- Gender Skew: ${artistProfile.demographics.genderSkew}
- Cultural Openness Index: ${Math.round((artistProfile.demographics.culturalOpenness || 0.9) * 100)}%
- Top Subcultural Affinities: ${(artistProfile.demographics.topSubcultures || []).join(", ")}

---

## 3. 24-HOUR CITY TAKEOVER ITINERARY
${itinerary.map(step => `
### ${step.time}: ${step.title} [${step.stage}]
- **Venue:** ${step.venue} (${step.type})
- **Location:** ${step.address}
- **Qloo Affinity Index:** ${step.qlooAffinity}%
- **Cultural Grounding:** ${step.rationale}
`).join("\n")}

---

## 4. EXECUTIVE BRAND SPONSORSHIP MATRIX
${brandSponsorshipMatrix.map((b, i) => `
### Sponsor #${i + 1}: ${b.brand} (${b.category})
- **Qloo Affinity Score:** ${b.affinityScore}%
- **Experiential Activation Concept:** ${b.activationConcept}
- **Promoter Value Pitch:** ${b.promoterPitch}
- **Projected Impact:** ${b.projectedRoi}
`).join("\n")}

---
*TourCraft: Agents, but with taste. Built for the Qloo Agentic Hackathon.*
`;
}
