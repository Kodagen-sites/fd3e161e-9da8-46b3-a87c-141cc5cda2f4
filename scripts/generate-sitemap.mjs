// scripts/generate-sitemap.mjs
//
// Generates sitemap.xml AND robots.txt at build time.
// Run from project root: `node scripts/generate-sitemap.mjs`
// Wire into vite build: in package.json, change "build" to:
//   "build": "node scripts/generate-sitemap.mjs && tsc -b && vite build"
//
// Reads route information from src/content/site-config.ts and emits:
//   public/sitemap.xml   — Google-readable sitemap with priority + lastmod
//   public/robots.txt    — allow-all + sitemap reference
//
// All routes get included EXCEPT routes flagged as noindex in siteConfig.seo.noindexPaths.
// Service detail pages, work detail pages, product pages — all expanded from siteConfig.

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";

// ─── Load siteConfig (using dynamic import to handle TypeScript) ─────
// In production this expects a built JS version. For dev, use ts-node or
// prebuild the config.

async function loadSiteConfig() {
  // Try compiled version first
  try {
    const mod = await import(path.resolve("dist-config/site-config.js"));
    return mod.siteConfig;
  } catch {}
  
  // Fallback — read site-config.ts as text and extract minimal data
  // (only used if no compiled version available)
  const { readFileSync } = await import("node:fs");
  const raw = readFileSync(path.resolve("src/content/site-config.ts"), "utf-8");
  
  // Extract siteUrl, services, products, work via regex
  // Crude but works for our config structure
  const extract = (name) => {
    const m = raw.match(new RegExp(`${name}\\s*:\\s*"([^"]+)"`));
    return m ? m[1] : null;
  };
  
  return {
    company: { name: extract("name") || "Site", url: extract("url") || "https://example.com" },
    seo: { siteUrl: extract("siteUrl") || extract("url") || "https://example.com" },
    services: [],   // keep simple for fallback
    work: [],
    products: [],
  };
}

const cfg = await loadSiteConfig();

const SITE_URL = (cfg.seo?.siteUrl || cfg.company?.url || "https://example.com").replace(/\/$/, "");
const NOINDEX_PATHS = new Set(cfg.seo?.noindexPaths || ["/account", "/admin"]);
const NOW = new Date().toISOString().split("T")[0];

// ─── Build the route list ────────────────────────────────────────────
// Static routes (always present)
const routes = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/about", priority: 0.8, changefreq: "monthly" },
  { path: "/contact", priority: 0.7, changefreq: "monthly" },
];

// Services (CRM/booking) — both index page + each detail page
if (cfg.services && cfg.services.length > 0) {
  routes.push({ path: "/services", priority: 0.9, changefreq: "monthly" });
  cfg.services.forEach(svc => {
    if (svc.slug) {
      routes.push({
        path: `/services/${svc.slug}`,
        priority: 0.7,
        changefreq: "monthly",
      });
    }
  });
}

// Work / portfolio (CRM)
if (cfg.work && cfg.work.length > 0) {
  routes.push({ path: "/work", priority: 0.8, changefreq: "monthly" });
  cfg.work.forEach(item => {
    if (item.slug) {
      routes.push({
        path: `/work/${item.slug}`,
        priority: 0.6,
        changefreq: "monthly",
      });
    }
  });
}

// Products (catalog)
if (cfg.products && cfg.products.length > 0) {
  routes.push({ path: "/shop", priority: 0.9, changefreq: "weekly" });
  cfg.products.forEach(p => {
    if (p.slug) {
      routes.push({
        path: `/products/${p.slug}`,
        priority: 0.7,
        changefreq: "weekly",
      });
    }
  });
}

// Events (tickets)
if (cfg.events && cfg.events.length > 0) {
  routes.push({ path: "/events", priority: 0.9, changefreq: "daily" });
  cfg.events.forEach(e => {
    if (e.slug) {
      routes.push({
        path: `/events/${e.slug}`,
        priority: 0.7,
        changefreq: "daily",
      });
    }
  });
}

// Custom pages from nav_architecture (FAQ, pricing, careers, etc.)
if (cfg.pages && Array.isArray(cfg.pages)) {
  cfg.pages.forEach(page => {
    if (page.path && !NOINDEX_PATHS.has(page.path)) {
      routes.push({
        path: page.path,
        priority: page.priority || 0.5,
        changefreq: page.changefreq || "monthly",
      });
    }
  });
}

// Filter out noindex paths
const indexableRoutes = routes.filter(r => {
  return !Array.from(NOINDEX_PATHS).some(prefix =>
    r.path === prefix || r.path.startsWith(prefix + "/")
  );
});

// ─── Generate sitemap.xml ────────────────────────────────────────────
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexableRoutes.map(r => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${NOW}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`).join("\n")}
</urlset>
`;

// ─── Generate robots.txt ─────────────────────────────────────────────
const noindexDisallows = Array.from(NOINDEX_PATHS).map(p => `Disallow: ${p}/`).join("\n");

const robotsTxt = `# robots.txt — generated at build time
User-agent: *
Allow: /
${noindexDisallows}

# Crawl-delay (be nice to crawlers)
Crawl-delay: 1

Sitemap: ${SITE_URL}/sitemap.xml
`;

// ─── Write files ─────────────────────────────────────────────────────
if (!existsSync("public")) {
  mkdirSync("public", { recursive: true });
}

writeFileSync("public/sitemap.xml", sitemapXml);
writeFileSync("public/robots.txt", robotsTxt);

console.log(`✓ Generated public/sitemap.xml (${indexableRoutes.length} routes)`);
console.log(`✓ Generated public/robots.txt`);
