import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import { serviceSchema, breadcrumbSchema } from "@/components/seo/structured-data";
import PageHero from "@/components/PageHero";
import { FadeUp, StaggerChildren } from "@/components/motion";
import { img } from "@/lib/assets";

const SLOT: Record<string, string> = {
  "single-malt": "service-bottling",
  "private-cask": "service-cask",
  "tours-tastings": "service-tours",
  "bespoke-bottling": "service-tastings",
};

export default function ServicesPage() {
  return (
    <>
      <SEOHead
        title={`Whisky & Experiences — ${siteConfig.company.name}`}
        description="Single malt releases, private cask ownership, distillery tours and bespoke single-cask bottling from Iron Oak Distillery in Speyside."
        path="/services"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: siteConfig.seo.siteUrl },
            { name: "Services", url: `${siteConfig.seo.siteUrl}/services` },
          ]),
          ...siteConfig.services.map((svc) =>
            serviceSchema({
              service: { name: svc.name, description: svc.description },
              provider: {
                name: siteConfig.company.name,
                description: siteConfig.company.description,
                email: siteConfig.company.email,
                phone: siteConfig.company.phone,
                location: siteConfig.company.location,
                url: siteConfig.seo.siteUrl,
              },
            })
          ),
        ]}
      />

      <PageHero
        eyebrow={siteConfig.servicesHeading}
        title="The range & the rituals"
        image={img("service-tours", "whisky distillery tour interior copper")}
        intro="From the bottle in your hand to the cask with your name on it — every way to share in what we make."
      />

      <section className="relative bg-bg section-pad px-6 md:px-10">
        <StaggerChildren staggerDelay={0.1} className="mx-auto grid max-w-7xl gap-7 md:grid-cols-2">
          {siteConfig.services.map((svc) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-cream/10 bg-ink transition-colors hover:border-primary/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={img(SLOT[svc.slug], svc.name)}
                  alt={svc.name}
                  className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <h2 className="font-display text-3xl text-cream">{svc.name}</h2>
                <p className="mt-4 text-cream/70">{svc.description}</p>
                {svc.highlights ? (
                  <ul className="mt-6 space-y-2">
                    {svc.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-sm text-cream/65">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-auto pt-7 font-mono text-xs uppercase tracking-[0.2em] text-primary opacity-80 transition-opacity group-hover:opacity-100">
                  Learn more →
                </div>
              </div>
            </Link>
          ))}
        </StaggerChildren>
      </section>

      <section className="relative bg-ink px-6 py-24 md:px-10 warm-veil border-t border-cream/10">
        <div className="mx-auto max-w-3xl text-center">
          <FadeUp>
            <h2 className="font-display text-4xl text-cream md:text-5xl">{siteConfig.ctaBlock.heading}</h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <Link
              href="/contact"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-cream px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ink transition hover:brightness-95"
            >
              {siteConfig.cta.primary}
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
