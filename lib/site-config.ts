// Re-export shim — canonical config lives in content/site-config.ts.
// Some shipped templates import from "@/lib/site-config"; keep both paths valid.
export { siteConfig, type SiteConfig } from "@/content/site-config";
export { siteConfig as default } from "@/content/site-config";
