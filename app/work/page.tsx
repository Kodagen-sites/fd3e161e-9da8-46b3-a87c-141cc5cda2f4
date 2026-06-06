import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import { breadcrumbSchema } from "@/components/seo/structured-data";
import PageHero from "@/components/PageHero";
import { StaggerChildren, FadeUp } from "@/components/motion";
import { img } from "@/lib/assets";

export default function WorkPage() {
  return (
    <>
      <SEOHead
        title={`The Cask Archive — ${siteConfig.company.name}`}
        description="Signature releases, single-cask bottlings and private commissions from the Iron Oak warehouses."
        path="/work"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: siteConfig.seo.siteUrl },
          { name: "Work", url: `${siteConfig.seo.siteUrl}/work` },
        ])}
      />

      <PageHero
        eyebrow="Selected releases"
        title="The Cask Archive"
        image={img("section-process", "oak whisky casks maturation cellar")}
        intro="A record of the expressions, commissions and single casks that have left our warehouse doors."
      />

      <section className="relative bg-bg section-pad px-6 md:px-10">
        <StaggerChildren staggerDelay={0.08} className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.work.map((w, i) => (
            <article
              key={w.title}
              className="group overflow-hidden rounded-2xl border border-cream/10 bg-ink transition-colors hover:border-primary/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={img(`work-${(i % 6) + 1}`, "whisky")}
                  alt={w.title}
                  className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/80">
                  {w.service}
                </div>
              </div>
              <div className="p-7">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{w.client}</div>
                <h2 className="mt-3 font-display text-2xl text-cream">{w.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">{w.result}</p>
              </div>
            </article>
          ))}
        </StaggerChildren>
      </section>

      <section className="relative px-6 py-24 md:px-12" style={{ background: siteConfig.brand.accent }}>
        <div className="mx-auto max-w-3xl text-center">
          <FadeUp>
            <p className="font-display text-3xl leading-tight md:text-4xl" style={{ color: siteConfig.brand.bg }}>
              Every bottling begins as a single cask, chosen by hand and bottled only when the
              warehouse says so.
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
