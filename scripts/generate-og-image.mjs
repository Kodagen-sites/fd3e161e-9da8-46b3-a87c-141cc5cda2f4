// scripts/generate-og-image.mjs
//
// Generates a brand-consistent og-default.png at build time.
// Run from project root: `node scripts/generate-og-image.mjs`
// Wire into vite build alongside generate-sitemap.mjs.
//
// Outputs: public/og-default.png (1200x630, the OpenGraph standard)
//
// Uses satori (Vercel's React-to-SVG library) + @resvg/resvg-js (SVG to PNG).
// Both are tiny, no Chromium needed, runs in <1s.
//
// Required deps in tenant package.json:
//   "satori": "^0.10.13",
//   "@resvg/resvg-js": "^2.6.2",
//
// The image style: brand color background + brand name (large) + tagline (small)
// + brand logo if available. No imagery — just typographic. This is intentional
// for SEO-aware default OG; specific pages can override via SEOHead ogImage prop.

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

// Load siteConfig (same fallback dance as generate-sitemap.mjs)
async function loadSiteConfig() {
  try {
    const mod = await import(path.resolve("dist-config/site-config.js"));
    return mod.siteConfig;
  } catch {}
  
  const raw = readFileSync(path.resolve("src/content/site-config.ts"), "utf-8");
  const extract = (name) => {
    const m = raw.match(new RegExp(`${name}\\s*:\\s*"([^"]+)"`));
    return m ? m[1] : null;
  };
  
  return {
    company: {
      name: extract("name") || "Brand",
      tagline: extract("tagline") || "",
    },
    brand: {
      primary: extract("primary") || "#1a365d",
      bg: extract("bg") || "#ffffff",
    },
    typography: {
      display: extract("display") || "Inter",
    },
  };
}

const cfg = await loadSiteConfig();

const COMPANY_NAME = cfg.company?.name || "Brand";
const TAGLINE = cfg.company?.tagline || "";
const BRAND_PRIMARY = cfg.brand?.primary || "#1a365d";
const BRAND_BG = cfg.brand?.bg || "#ffffff";

// Detect light vs dark background — flip text color accordingly
function isDarkColor(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

const isDark = isDarkColor(BRAND_BG);
const textColor = isDark ? "#ffffff" : "#0a0a0a";
const accentColor = isDark ? "#ffffff" : BRAND_PRIMARY;

// Load font (Inter as universal default — works for Latin scripts)
async function loadFont() {
  // For tenant deployments, font file should be downloaded once during provisioning
  // and stored at scripts/fonts/Inter-Bold.ttf and Inter-Regular.ttf
  try {
    return {
      bold: readFileSync(path.resolve("scripts/fonts/Inter-Bold.ttf")),
      regular: readFileSync(path.resolve("scripts/fonts/Inter-Regular.ttf")),
    };
  } catch (e) {
    console.warn("⚠  Inter fonts not found at scripts/fonts/. Skipping OG image generation.");
    console.warn("   To enable: download Inter from https://fonts.google.com/specimen/Inter");
    console.warn("   Place Inter-Bold.ttf and Inter-Regular.ttf in scripts/fonts/");
    process.exit(0);  // non-fatal — site still ships, just without OG default
  }
}

const fonts = await loadFont();

// ─── Compose the OG image as React-like JSX (satori interprets) ─────
const svg = await satori(
  {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        background: BRAND_BG,
        padding: "80px",
        fontFamily: "Inter",
        position: "relative",
      },
      children: [
        // Brand color accent bar at top
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "8px",
              background: accentColor,
              display: "flex",
            },
          },
        },
        // Company name (large, bold)
        {
          type: "div",
          props: {
            style: {
              fontSize: "84px",
              fontWeight: 700,
              color: textColor,
              lineHeight: 1.1,
              marginBottom: "24px",
              maxWidth: "1040px",
              display: "flex",
            },
            children: COMPANY_NAME,
          },
        },
        // Tagline (smaller, regular weight)
        TAGLINE
          ? {
              type: "div",
              props: {
                style: {
                  fontSize: "36px",
                  fontWeight: 400,
                  color: isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.6)",
                  lineHeight: 1.4,
                  maxWidth: "1040px",
                  display: "flex",
                },
                children: TAGLINE,
              },
            }
          : null,
      ].filter(Boolean),
    },
  },
  {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Inter", data: fonts.bold, weight: 700, style: "normal" },
      { name: "Inter", data: fonts.regular, weight: 400, style: "normal" },
    ],
  }
);

// Convert SVG to PNG
const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();

// Write to public/
if (!existsSync("public")) {
  mkdirSync("public", { recursive: true });
}
writeFileSync("public/og-default.png", png);

console.log(`✓ Generated public/og-default.png (1200x630)`);
