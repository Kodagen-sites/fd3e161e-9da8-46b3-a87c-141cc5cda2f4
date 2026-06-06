// components/seo/SEOHead.tsx
//
// Per-page SEO meta for the Next.js 16 App Router. Render <SEOHead /> as the
// first child of any page component. Next.js hoists <title>/<meta>/<link>/
// JSON-LD <script> rendered anywhere in the tree into <head> — no
// react-helmet needed (and Helmet does not work in the App Router).
//
//   import { SEOHead } from "@/components/seo/SEOHead";
//   import { serviceSchema } from "@/components/seo/structured-data";
//   <SEOHead title="…" description="…" path="/services/foo" jsonLd={serviceSchema(...)} />

import { siteConfig } from "@/content/site-config";

type Props = {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
  ogType?: "website" | "article" | "product" | "profile";
};

export function SEOHead({
  title,
  description,
  path = "/",
  ogImage,
  noindex = false,
  jsonLd,
  ogType = "website",
}: Props) {
  const cfg = (siteConfig as any).seo ?? {};
  const company = siteConfig.company;

  const finalTitle = title || cfg.defaultTitle || `${company.name} — ${company.tagline}`;
  const finalDescription = description || cfg.defaultDescription || company.description;
  const baseUrl = (cfg.siteUrl || "").replace(/\/$/, "");
  const canonicalUrl = baseUrl + path;
  const finalOgImage = ogImage || cfg.defaultOgImage || `${baseUrl}/og-default.png`;
  const twitterHandle = cfg.twitterHandle;
  const locale = cfg.locale || "en_US";

  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />

      {baseUrl ? <link rel="canonical" href={canonicalUrl} /> : null}

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={company.name} />
      <meta property="og:locale" content={locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      {twitterHandle ? <meta name="twitter:site" content={twitterHandle} /> : null}

      {jsonLdArray.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default SEOHead;
