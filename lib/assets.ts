import manifest from "@/content/asset-manifest.json";
import { resolveImage } from "@/lib/image-fallback";

type Manifest = { images?: Record<string, string>; videos?: Record<string, string> };
const m = manifest as Manifest;

/** Raw resolved URL the platform wrote for a slot, or "" if not generated yet. */
export function assetUrl(slot: string): string {
  return (m.images && m.images[slot]) || "";
}

export function videoUrl(slot: string): string {
  return (m.videos && m.videos[slot]) || "";
}

/**
 * Image for a slot with a graceful brand-gradient fallback so a slot that the
 * asset pipeline hasn't filled yet still renders something intentional.
 */
export function img(slot: string, keyword?: string): string {
  return resolveImage({
    src: assetUrl(slot),
    keyword,
    industry: "default",
    brandColor: "#7a1f2b",
  });
}
