import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import { organizationSchema, breadcrumbSchema } from "@/components/seo/structured-data";
import PageHero from "@/components/PageHero";
import { FadeUp, StaggerChildren, ImageRevealMask } from "@/components/motion";
import { img } from "@/lib/assets";

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title={`About — ${siteConfig.company.name}`}
        description={siteConfig.aboutStory.slice(0, 155)}
        path="/about"
        jsonLd={[
          organizationSchema(
            {
              name: siteConfig.company.name,
              description: siteConfig.company.description,
              email: siteConfig.company.email,
              phone: siteConfig.company.phone,
              location: siteConfig.company.location,
              url: siteConfig.seo.siteUrl,
              socials: siteConfig.socials,
            },
            siteConfig.seo.structuredData.address
          ),
          breadcrumbSchema([
            { name: "Home", url: siteConfig.seo.siteUrl },
            { name: "About", url: `${siteConfig.seo.siteUrl}/about` },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Our story"
        title={siteConfig.aboutHeading}
        image={img("section-heritage", "highland scotland distillery stone building")}
        intro="Founded 1887 beside the Carrach spring — and in no hurry since."
      />

      {/* Story */}
      <section className="relative bg-bg section-pad px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2">
          <FadeUp>
            <div>
              <h2 className="font-display text-4xl leading-[1.05] text-cream md:text-5xl">
                A distillery measured in years, not quarters.
              </h2>
              <p className="mt-7 text-lg leading-relaxed text-cream/70">{siteConfig.aboutStory}</p>
              <p className="mt-5 text-lg leading-relaxed text-cream/70">
                {siteConfig.company.description}
              </p>
            </div>
          </FadeUp>
          <ImageRevealMask
            src={img("section-founder", "master distiller portrait whisky")}
            alt="The Iron Oak master distiller"
            aspectClass="aspect-[4/5]"
            className="rounded-2xl border border-cream/10"
          />
        </div>
      </section>

      {/* Manifesto */}
      <section className="relative px-6 py-24 md:px-12" style={{ background: siteConfig.brand.accent }}>
        <div className="mx-auto max-w-4xl text-center">
          <FadeUp>
            <p
              className="font-display text-3xl leading-[1.15] md:text-5xl"
              style={{ color: siteConfig.brand.bg }}
            >
              “{siteConfig.manifesto}”
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Values */}
      <section className="relative bg-bg section-pad px-6 md:px-10 border-t border-cream/10">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="mb-12 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
              What we hold to
            </div>
          </FadeUp>
          <StaggerChildren staggerDelay={0.1} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {siteConfig.values.map((v) => (
              <div key={v.title} className="border-t border-cream/15 pt-6">
                <h3 className="font-display text-2xl text-cream">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">{v.description}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
