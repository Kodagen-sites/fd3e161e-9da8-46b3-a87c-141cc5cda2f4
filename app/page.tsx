import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import { organizationSchema, websiteSchema } from "@/components/seo/structured-data";
import ScrubHero from "@/components/home/ScrubHero";
import {
  FadeUp,
  StaggerChildren,
  TextReveal,
  ImageRevealMask,
  MagneticButton,
  NumberCounter,
} from "@/components/motion";
import { img } from "@/lib/assets";

export default function HomePage() {
  return (
    <>
      <SEOHead
        path="/"
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
          websiteSchema({
            brand: {
              name: siteConfig.company.name,
              description: siteConfig.company.description,
              email: siteConfig.company.email,
              phone: siteConfig.company.phone,
              location: siteConfig.company.location,
              url: siteConfig.seo.siteUrl,
            },
          }),
        ]}
      />

      <ScrubHero />

      <HeritageSection />
      <TimeSection />
      <ProcessSection />
      <RangeSection />
      <StatsBand />
      <CtaSection />
    </>
  );
}

// ── Heritage / about teaser ───────────────────────────────────────────
function HeritageSection() {
  return (
    <section className="relative bg-bg section-pad px-6 md:px-10 border-t border-cream/10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div>
          <FadeUp>
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
              <span className="mr-3 inline-block h-px w-10 align-middle bg-primary/60" />
              {siteConfig.aboutHeading}
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-4xl leading-[1.05] text-cream md:text-6xl">
              Five generations, one unhurried glen.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream/70">
              {siteConfig.aboutStory}
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-primary transition-opacity hover:opacity-80"
            >
              Our story →
            </Link>
          </FadeUp>
        </div>
        <div>
          <ImageRevealMask
            src={img("section-about", "copper pot still scotch whisky")}
            alt="Copper pot still at Iron Oak Distillery"
            aspectClass="aspect-[4/5]"
            className="rounded-2xl border border-cream/10"
          />
        </div>
      </div>
    </section>
  );
}

// ── Oversized type manifesto ──────────────────────────────────────────
function TimeSection() {
  return (
    <section
      className="relative flex min-h-[80vh] items-center overflow-hidden px-6 md:px-12"
      style={{ background: siteConfig.brand.accent }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <FadeUp>
          <div
            className="mb-6 font-mono text-xs uppercase tracking-[0.4em] opacity-70"
            style={{ color: siteConfig.brand.bg }}
          >
            {siteConfig.whyUs.heading}
          </div>
        </FadeUp>
        <TextReveal
          as="h2"
          className="break-words font-display text-[26vw] leading-[0.82] tracking-tight md:text-[22vw] lg:text-[18vw]"
          stagger={0.08}
        >
          {siteConfig.sectionThemeWord}
        </TextReveal>
        <FadeUp delay={0.3}>
          <p className="mt-10 max-w-xl text-lg leading-relaxed md:text-xl" style={{ color: siteConfig.brand.bg }}>
            {siteConfig.manifesto}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

// ── Process ───────────────────────────────────────────────────────────
function ProcessSection() {
  return (
    <section className="relative bg-bg section-pad px-6 md:px-10 border-t border-cream/10">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
            From barley to bottle
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mb-14 max-w-2xl font-display text-4xl text-cream md:text-6xl">
            How a dram is made here.
          </h2>
        </FadeUp>
        <StaggerChildren staggerDelay={0.1} className="grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 md:grid-cols-2 lg:grid-cols-4">
          {siteConfig.process.map((p) => (
            <div key={p.step} className="bg-bg p-8">
              <div className="font-display text-5xl text-primary/80">
                {String(p.step).padStart(2, "0")}
              </div>
              <h3 className="mt-5 font-display text-2xl text-cream">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/65">{p.description}</p>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ── Range / services preview ──────────────────────────────────────────
function RangeSection() {
  return (
    <section className="relative bg-ink section-pad px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <FadeUp>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
                {siteConfig.servicesHeading}
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="font-display text-4xl text-cream md:text-6xl">The range &amp; the rituals</h2>
            </FadeUp>
          </div>
          <Link
            href="/services"
            className="font-mono text-xs uppercase tracking-[0.22em] text-primary transition-opacity hover:opacity-80"
          >
            All offerings →
          </Link>
        </div>

        <StaggerChildren staggerDelay={0.08} className="grid gap-5 md:grid-cols-2">
          {siteConfig.services.map((svc) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className="group block overflow-hidden rounded-2xl border border-cream/10 bg-bg transition-colors hover:border-primary/50"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={img(`service-${svc.slug === "single-malt" ? "bottling" : svc.slug === "private-cask" ? "cask" : svc.slug === "tours-tastings" ? "tours" : "tastings"}`, "whisky")}
                  alt={svc.name}
                  className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl text-cream">{svc.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65 line-clamp-2">{svc.description}</p>
                <div className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-primary opacity-80 transition-opacity group-hover:opacity-100">
                  Discover →
                </div>
              </div>
            </Link>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ── Stats band ────────────────────────────────────────────────────────
function StatsBand() {
  return (
    <section className="relative bg-bg section-pad px-6 md:px-10 border-t border-cream/10">
      <StaggerChildren
        staggerDelay={0.1}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4"
      >
        {siteConfig.stats.map((s) => {
          const numeric = parseFloat(s.value.replace(/[^0-9.]/g, ""));
          const isNum = !Number.isNaN(numeric) && /^[0-9]/.test(s.value);
          return (
            <div key={s.label} className="text-center">
              <div className="font-display text-5xl text-cream md:text-6xl">
                {isNum ? (
                  <NumberCounter
                    to={numeric}
                    suffix={s.value.replace(/[0-9.,]/g, "")}
                  />
                ) : (
                  s.value
                )}
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/55">
                {s.label}
              </div>
            </div>
          );
        })}
      </StaggerChildren>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-32 md:px-10 warm-veil border-t border-cream/10">
      <div className="mx-auto max-w-3xl text-center">
        <FadeUp>
          <h2 className="font-display text-5xl leading-[1.0] text-cream md:text-7xl">
            {siteConfig.ctaBlock.heading}
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mx-auto mt-8 max-w-xl text-lg text-cream/70">{siteConfig.ctaBlock.description}</p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <MagneticButton
              as="a"
              href="/contact"
              className="min-h-[48px] rounded-full bg-cream px-8 py-4 font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink transition hover:brightness-95"
            >
              {siteConfig.cta.primary}
            </MagneticButton>
            <Link
              href="/services"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-cream/25 px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-cream transition hover:bg-cream/5"
            >
              {siteConfig.cta.secondary}
            </Link>
          </div>
        </FadeUp>
        <FadeUp delay={0.45}>
          <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-cream/45">
            {siteConfig.trustBar.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
