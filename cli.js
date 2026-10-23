#!/usr/bin/env node
// TourCraft CLI Tool
// Directly runs Qloo-powered agent workflows from the command line

import { qlooClient } from "./src/qloo-client.js";
import { tourAgent } from "./src/tour-agent.js";
import { ARTISTS_DATABASE, CITIES_DATABASE } from "./src/taste-database.js";

const args = process.argv.slice(2);
const command = args[0] || "help";

async function main() {
  switch (command) {
    case "run": {
      const artist = args[1] || "chappell-roan";
      const city = args[2] || "chicago";
      process.stderr.write(`[TourCraft] Generating Cultural Tour Package for "${artist}" in "${city}"...\n`);
      const pkg = await tourAgent.generateTourPackage(artist, city);
      process.stdout.write(JSON.stringify(pkg, null, 2) + "\n");
      break;
    }

    case "status": {
      const status = await qlooClient.verifyCredentials();
      const output = {
        app: "TourCraft",
        qlooBaseUrl: qlooClient.baseUrl,
        hasApiKey: qlooClient.isConfigured(),
        status: status.status || (qlooClient.isConfigured() ? "ready" : "unconfigured"),
        mode: qlooClient.isConfigured() ? "live_api" : "grounded_taste_graph",
        availableArtists: Object.keys(ARTISTS_DATABASE),
        availableCities: Object.keys(CITIES_DATABASE)
      };
      process.stdout.write(JSON.stringify(output, null, 2) + "\n");
      break;
    }

    case "recs": {
      const artist = args[1] || "kendrick-lamar";
      const res = await qlooClient.getRecommendations(`urn:entity:music:${artist}`);
      process.stdout.write(JSON.stringify(res, null, 2) + "\n");
      break;
    }

    case "chat": {
      const query = args.slice(1).join(" ") || "Why did Qloo select these venues?";
      const samplePkg = await tourAgent.generateTourPackage("chappell-roan", "chicago");
      const answer = await tourAgent.answerAgentQuery(query, samplePkg);
      process.stdout.write(JSON.stringify(answer, null, 2) + "\n");
      break;
    }

    case "compare": {
      const artistA = args[1] || "chappell-roan";
      const artistB = args[2] || "charli-xcx";
      process.stderr.write(`[TourCraft] Comparing audience taste overlap between "${artistA}" and "${artistB}"...\n`);
      const comparison = await tourAgent.compareAudiences(artistA, artistB);
      process.stdout.write(JSON.stringify(comparison, null, 2) + "\n");
      break;
    }

    case "mcp": {
      process.stderr.write("[TourCraft MCP] stdio JSON-RPC server listening...\n");
      let buffer = "";
      process.stdin.setEncoding("utf8");
      process.stdin.on("data", async (chunk) => {
        buffer += chunk;
        const lines = buffer.split("\n");
        buffer = lines.pop(); // preserve incomplete trailing line

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          try {
            const req = JSON.parse(trimmed);
            const res = await handleMcpRequest(req);
            if (res) {
              process.stdout.write(JSON.stringify(res) + "\n");
            }
          } catch (err) {
            process.stderr.write(`[TourCraft MCP] Parse error: ${err.message}\n`);
          }
        }
      });
      break;
    }

    case "help":
    default: {
      console.log(`
TourCraft: Cultural Tour & Live Experience Agent (CLI)
Powered by the Qloo Taste Graph

Commands:
  node cli.js run [artist] [city]         Generate full 24-hr cultural tour rider & sponsor matrix
  node cli.js compare [artistA] [artistB] Compare audience taste overlap between two performers
  node cli.js status                      Check Qloo API connection and environment status
  node cli.js recs [artist]               Fetch cross-domain taste graph affinities
  node cli.js chat [query...]             Ask the TourCraft AI agent questions about audience taste
  node cli.js mcp                         Start standard JSON-RPC Model Context Protocol server

Examples:
  node cli.js run "chappell-roan" "chicago"
  node cli.js compare "chappell-roan" "charli-xcx"
  node cli.js chat "Why is natural wine recommended for Chappell Roan fans?"
      `);
      break;
    }
  }
}

async function handleMcpRequest(req) {
  const { id, method, params } = req;

  if (method === "initialize") {
    return {
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        serverInfo: { name: "tourcraft", version: "1.0.0" },
        capabilities: { tools: {} }
      }
    };
  }

  if (method === "tools/list") {
    return {
      jsonrpc: "2.0",
      id,
      result: {
        tools: [
          {
            name: "tourcraft_generate",
            description: "Generate an autonomous 24-hour cultural tour takeover and executive sponsor matrix grounded in Qloo taste graph data.",
            inputSchema: {
              type: "object",
              properties: {
                artist: { type: "string", description: "Touring artist or headliner name" },
                city: { type: "string", description: "Target metropolitan tour market" }
              },
              required: ["artist"]
            }
          },
          {
            name: "tourcraft_compare",
            description: "Compare audience taste overlap and cross-domain compatibility between two artists for festival co-billing.",
            inputSchema: {
              type: "object",
              properties: {
                artistA: { type: "string", description: "First performer name" },
                artistB: { type: "string", description: "Second performer name" }
              },
              required: ["artistA", "artistB"]
            }
          },
          {
            name: "tourcraft_recs",
            description: "Fetch multi-domain cultural affinities across dining, nightlife, fashion, and brands for an artist.",
            inputSchema: {
              type: "object",
              properties: {
                artist: { type: "string", description: "Artist name or slug" }
              },
              required: ["artist"]
            }
          }
        ]
      }
    };
  }

  if (method === "tools/call") {
    const { name, arguments: toolArgs = {} } = params || {};

    if (name === "tourcraft_generate") {
      const pkg = await tourAgent.generateTourPackage(toolArgs.artist || "chappell-roan", toolArgs.city || "chicago");
      return {
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: JSON.stringify(pkg, null, 2) }]
        }
      };
    }

    if (name === "tourcraft_compare") {
      const cmp = await tourAgent.compareAudiences(toolArgs.artistA || "chappell-roan", toolArgs.artistB || "charli-xcx");
      return {
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: JSON.stringify(cmp, null, 2) }]
        }
      };
    }

    if (name === "tourcraft_recs") {
      const res = await qlooClient.getRecommendations(`urn:entity:music:${toolArgs.artist || "chappell-roan"}`);
      return {
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: JSON.stringify(res, null, 2) }]
        }
      };
    }
  }

  return {
    jsonrpc: "2.0",
    id,
    error: { code: -32601, message: `Method '${method}' not found` }
  };
}

main().catch(err => {
  console.error("[TourCraft CLI Error]:", err);
  process.exit(1);
});
