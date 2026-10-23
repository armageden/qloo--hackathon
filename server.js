// TourCraft Full-Stack Server
// Portable Node.js / Bun HTTP and API Server for the Qloo Agentic Hackathon
// Zero external runtime dependencies required.

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { qlooClient } from "./src/qloo-client.js";
import { tourAgent } from "./src/tour-agent.js";
import { ARTISTS_DATABASE, CITIES_DATABASE } from "./src/taste-database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, "public");

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff"
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Api-Key"
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
      if (body.length > 1e6) { // 1MB limit
        req.destroy();
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
    req.on("error", reject);
  });
}

export async function handleRequest(req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = parsedUrl.pathname;

  // CORS Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Api-Key"
    });
    res.end();
    return;
  }

  // --- API Routes ---
  if (pathname.startsWith("/api/")) {
    try {
      if (pathname === "/api/status" && req.method === "GET") {
        const verify = await qlooClient.verifyCredentials();
        return sendJson(res, 200, {
          app: "TourCraft",
          hasApiKey: qlooClient.isConfigured(),
          qlooBaseUrl: qlooClient.baseUrl,
          mode: qlooClient.isConfigured() ? "live_api" : "grounded_taste_graph",
          status: verify.status || (qlooClient.isConfigured() ? "ready" : "unconfigured"),
          artistsCount: Object.keys(ARTISTS_DATABASE).length,
          citiesCount: Object.keys(CITIES_DATABASE).length
        });
      }

      if (pathname === "/api/config/key" && req.method === "POST") {
        const body = await parseBody(req);
        if (body.apiKey) {
          qlooClient.setApiKey(body.apiKey);
        }
        const verify = await qlooClient.verifyCredentials();
        return sendJson(res, 200, {
          success: true,
          configured: qlooClient.isConfigured(),
          verification: verify
        });
      }

      if (pathname === "/api/artists" && req.method === "GET") {
        const artists = Object.values(ARTISTS_DATABASE).map(a => ({
          slug: a.slug,
          name: a.name,
          genres: a.genres,
          vibe: a.vibe
        }));
        return sendJson(res, 200, { artists });
      }

      if (pathname === "/api/cities" && req.method === "GET") {
        const cities = Object.entries(CITIES_DATABASE).map(([key, c]) => ({
          key,
          name: c.name,
          state: c.state,
          country: c.country,
          tagline: c.tagline,
          venues: c.majorVenues
        }));
        return sendJson(res, 200, { cities });
      }

      if (pathname === "/api/tour/generate" && req.method === "POST") {
        const body = await parseBody(req);
        const artist = body.artist || "chappell-roan";
        const city = body.city || "chicago";
        const tourPackage = await tourAgent.generateTourPackage(artist, city);
        return sendJson(res, 200, tourPackage);
      }

      if (pathname === "/api/tour/compare" && req.method === "POST") {
        const body = await parseBody(req);
        const artistA = body.artistA || "chappell-roan";
        const artistB = body.artistB || "charli-xcx";
        const comparison = await tourAgent.compareAudiences(artistA, artistB);
        return sendJson(res, 200, comparison);
      }

      if (pathname === "/api/agent/chat" && req.method === "POST") {
        const body = await parseBody(req);
        const query = body.query || body.message || "";
        const activePackage = body.activePackage || null;
        const answer = await tourAgent.answerAgentQuery(query, activePackage);
        return sendJson(res, 200, answer);
      }

      return sendJson(res, 404, { error: "API route not found" });
    } catch (apiErr) {
      console.error("[API Error]", apiErr);
      return sendJson(res, 500, { error: apiErr.message });
    }
  }

  // --- Static File Serving ---
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, "");
  if (safePath === "/" || safePath === "") {
    safePath = "/index.html";
  } else if (safePath === "/tourcraft" || safePath === "/tourcraft/") {
    safePath = "/tourcraft.html";
  }

  const filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for client-side navigation
      const indexPath = path.join(PUBLIC_DIR, "index.html");
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
        } else {
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error loading file");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
      }
    });
  });
}

const server = http.createServer(handleRequest);

if (!process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(` 🚀 TourCraft: Cultural Tour & Live Experience Agent`);
    console.log(` 🔮 Powered by Qloo Taste Graph (250M+ Entities)`);
    console.log(` 🌐 Server running at: http://localhost:${PORT}`);
    console.log(`======================================================\n`);
  });
}

export default handleRequest;
