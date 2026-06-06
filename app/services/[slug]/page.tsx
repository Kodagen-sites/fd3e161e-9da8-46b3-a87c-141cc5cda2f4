import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import { serviceSchema, breadcrumbSchema } from "@/components/seo/structured-data";
import PageHero from "@/components/PageHero";
import { FadeUp } from "@/components/motion";
import { img } from "@/lib/assets";

const SLOT: Record<string, string> = {
  "single-malt": "service-bottling",
  "private-cask": "service-cask",
  "tours-tastings": "service-tours",
  "bespoke-bottling": "service-tastings",
};

export function generateStaticParams() {
  return siteConfig.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = siteConfig.services.find((s) => s.slug === slug);
  if (!svc) return {};
  return { title: svc.name, description: svc.description };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = siteConfig.services.find((s) => s.slug === slug);
  if (!svc) notFound();

  const others = siteConfig.services.filter((s) => s.slug !== slug);

  return (
    <>
      <SEOHead
        title={`${svc.name} — ${siteConfig.company.name}`}
        description={svc.description}
        path={`/services/${svc.slug}`}
        jsonLd={[
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
          }),
          breadcrumbSchema([
            { name: "Home", url: siteConfig.seo.siteUrl },
            { name: "Services", url: `${siteConfig.seo.siteUrl}/services` },
            { name: svc.name, url: `${siteConfig.seo.siteUrl}/services/${svc.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Iron Oak · Offering"
        title={svc.name}
        image={img(SLOT[svc.slug], svc.name)}
        intro={svc.description}
      />

      <section className="relative bg-bg section-pad px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <FadeUp>
              <h2 className="font-display text-3xl text-cream md:text-4xl">What to expect</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-cream/70">{svc.description}</p>
              <p className="mt-5 text-lg leading-relaxed text-cream/70">
                Every detail is handled by the same small team that malts the barley and fills the
                casks. Reach out and we will tailor it to you — there is no template here, only
                people who care about the dram.
              </p>
            </FadeUp>
          </div>

          {svc.highlights ? (
            <FadeUp delay={0.15}>
              <div className="rounded-2xl border border-cream/10 bg-ink p-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                  Included
                </div>
                <ul className="mt-6 space-y-4">
                  {svc.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-cream/80">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-cream px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-ink transition hover:brightness-95"
                >
                  Enquire
                </Link>
              </div>
            </FadeUp>
          ) : null}
        </div>
      </section>

      <section className="relative bg-ink px-6 py-20 md:px-10 border-t border-cream/10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
            More from Iron Oak
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group rounded-2xl border border-cream/10 bg-bg p-7 transition-colors hover:border-primary/50"
              >
                <h3 className="font-display text-xl text-cream">{o.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60 line-clamp-2">{o.description}</p>
                <div className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-primary">View →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
