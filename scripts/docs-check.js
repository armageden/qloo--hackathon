#!/usr/bin/env node
// Zero-dependency mechanical documentation validator for TourCraft
// Verifies path existence, overview integrity, backlink integrity, link integrity, and reverse coverage.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const DOCS_DIR = path.join(REPO_ROOT, "docs");

let errors = [];
let passedChecks = 0;

function reportError(checkName, msg) {
  errors.push(`[${checkName}] ${msg}`);
}

function reportPass(msg) {
  passedChecks++;
  console.log(`  ✓ ${msg}`);
}

// Helper: recursively collect all markdown files
function getMarkdownFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(fullPath));
    } else if (file.endsWith(".md")) {
      results.push(fullPath);
    }
  }
  return results;
}

// 1. Overview & Backlink Integrity
console.log("--> Checking Overview and Backlink Integrity...");
const docDirs = fs.readdirSync(DOCS_DIR).filter(item => {
  const p = path.join(DOCS_DIR, item);
  return fs.statSync(p).isDirectory() && (item.startsWith("00-") || item.startsWith("01-") || item.startsWith("02-") || item.startsWith("03-") || item.startsWith("99-") || /^\d{2}-/.test(item));
});

for (const dirName of docDirs) {
  const dirPath = path.join(DOCS_DIR, dirName);
  const overviewPath = path.join(dirPath, "00-overview.md");

  if (!fs.existsSync(overviewPath)) {
    reportError("Overview Integrity", `Missing 00-overview.md in ${dirName}`);
    continue;
  }

  const overviewContent = fs.readFileSync(overviewPath, "utf8");
  const filesInDir = fs.readdirSync(dirPath).filter(f => f.endsWith(".md") && f !== "00-overview.md");

  for (const subFile of filesInDir) {
    // Check if subFile is linked from overview
    if (!overviewContent.includes(subFile)) {
      reportError("Overview Integrity", `${dirName}/00-overview.md does not link to ${subFile}`);
    }

    // Check backlink integrity in subFile
    const subFilePath = path.join(dirPath, subFile);
    const subContent = fs.readFileSync(subFilePath, "utf8");
    const firstLines = subContent.split("\n").slice(0, 5).join("\n");
    if (!firstLines.includes("00-overview") || !firstLines.includes("Back:")) {
      reportError("Backlink Integrity", `${dirName}/${subFile} does not contain top backlink to ./00-overview.md`);
    }
  }
}
reportPass("Overview and Backlink structure validated");

// 2. Link Integrity across all Markdown files
console.log("--> Checking Relative Link Integrity...");
const allMdFiles = getMarkdownFiles(DOCS_DIR).concat([path.join(REPO_ROOT, "AGENTS.md")]);
const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

for (const mdFile of allMdFiles) {
  if (!fs.existsSync(mdFile)) continue;
  const content = fs.readFileSync(mdFile, "utf8");
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const rawUrl = match[2].trim();
    // Ignore external URLs, anchors, mailto
    if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://") || rawUrl.startsWith("#") || rawUrl.startsWith("mailto:")) {
      continue;
    }

    // Strip anchor fragments
    const cleanPath = rawUrl.split("#")[0];
    if (!cleanPath) continue;

    // Resolve relative to current md file
    const targetPath = path.resolve(path.dirname(mdFile), cleanPath);
    if (!fs.existsSync(targetPath)) {
      reportError("Link Integrity", `Broken link in ${path.relative(REPO_ROOT, mdFile)}: "${rawUrl}" -> ${path.relative(REPO_ROOT, targetPath)} not found`);
    }
  }
}
reportPass("All relative markdown links verified");

// 3. Path Existence for backtick paths
console.log("--> Checking Path Existence in docs & AGENTS.md...");
const knownRootFiles = new Set(["server.js", "cli.js", "test.js", "package.json", "Dockerfile", "vercel.json", "qloo.mcp.json", "LICENSE", "README.md", "AGENTS.md", ".gitignore"]);

for (const mdFile of allMdFiles) {
  if (!fs.existsSync(mdFile)) continue;
  const content = fs.readFileSync(mdFile, "utf8");
  const backtickRegex = /`([^`\n]+)`/g;
  let match;

  while ((match = backtickRegex.exec(content)) !== null) {
    const candidate = match[1].trim();

    // Filter out obvious non-paths
    if (
      candidate.startsWith("http://") ||
      candidate.startsWith("https://") ||
      candidate.includes("<") ||
      candidate.includes(">") ||
      candidate.includes("...") ||
      candidate.includes(" ") ||
      candidate.startsWith("-") ||
      candidate.startsWith("/") ||
      candidate.includes("*") ||
      candidate.includes("{") ||
      candidate.includes("}") ||
      candidate.includes("(") ||
      candidate.includes(")") ||
      candidate.includes(":") ||
      candidate.includes("@") ||
      candidate.endsWith(";") ||
      candidate.endsWith(".pile") ||
      candidate.endsWith("OK") ||
      ["string", "number", "boolean", "object", "null", "undefined", "true", "false", "ok", "error", "ready", "music", "live_api", "grounded_taste_graph"].includes(candidate)
    ) {
      continue;
    }

    // Detect if candidate is formatted like a repo path
    const isRepoPath = (
      candidate.startsWith("./") ||
      candidate.startsWith("../") ||
      candidate.startsWith("src/") ||
      candidate.startsWith("docs/") ||
      candidate.startsWith("public/") ||
      candidate.startsWith("scripts/") ||
      knownRootFiles.has(candidate)
    );

    if (isRepoPath) {
      // If starts with ./ or ../, resolve relative to mdFile, otherwise relative to REPO_ROOT
      let resolved = candidate.startsWith(".") 
        ? path.resolve(path.dirname(mdFile), candidate)
        : path.resolve(REPO_ROOT, candidate);

      // Allow directory or file
      if (!fs.existsSync(resolved)) {
        reportError("Path Existence", `Referenced path does not exist: \`${candidate}\` in ${path.relative(REPO_ROOT, mdFile)}`);
      }
    }
  }
}
reportPass("All backtick path references verified against disk");

// 4. Reverse Coverage Check
console.log("--> Checking Reverse Coverage for Core Entry Points...");
const requiredEntryPoints = [
  "server.js",
  "cli.js",
  "test.js",
  "src/qloo-client.js",
  "src/tour-agent.js",
  "src/taste-database.js",
  "public/index.html",
  "public/app.js",
  "public/style.css",
  "scripts/docs-check.js",
  "qloo.mcp.json",
  "package.json",
  "Dockerfile",
  "vercel.json"
];

// Combine all doc text
const combinedDocsText = allMdFiles
  .map(f => fs.readFileSync(f, "utf8"))
  .join("\n");

for (const entryPoint of requiredEntryPoints) {
  if (!combinedDocsText.includes(entryPoint)) {
    reportError("Reverse Coverage", `Primary entry point ${entryPoint} is not referenced in any documentation file.`);
  }
}
reportPass("All primary entry points are covered in documentation");

// Summary
console.log("\n==========================================");
if (errors.length > 0) {
  console.error(`❌ Documentation check FAILED with ${errors.length} error(s):`);
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  console.log("==========================================\n");
  process.exit(1);
} else {
  console.log(`✅ Documentation check PASSED (all ${passedChecks} check groups verified successfully).`);
  console.log("==========================================\n");
  process.exit(0);
}
