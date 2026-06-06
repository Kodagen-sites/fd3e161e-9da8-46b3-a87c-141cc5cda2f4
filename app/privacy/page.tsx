import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import PageHero from "@/components/PageHero";
import { img } from "@/lib/assets";

const company = siteConfig.company.name;
const email = siteConfig.company.email;
const jurisdiction = siteConfig.company.location;
const effectiveDate = new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${company} collects, uses, and protects your personal information.`,
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-cream/10 py-8">
      <h2 className="font-display text-2xl text-cream">{title}</h2>
      <div className="mt-4 space-y-4 text-cream/70 leading-relaxed">{children}</div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEOHead title={`Privacy Policy — ${company}`} description={`How ${company} handles your data.`} path="/privacy" />
      <PageHero eyebrow="Legal" title="Privacy Policy" image={img("section-process", "oak whisky casks")} />
      <section className="relative bg-bg section-pad px-6 md:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-cream/60">Effective {effectiveDate}</p>
          <Section title="Who we are">
            <p>
              {company} ({jurisdiction}) respects your privacy. This policy explains what personal
              information we collect, why we collect it, and the choices you have. By law, you must be
              of legal drinking age in your country to use this site.
            </p>
          </Section>
          <Section title="Information we collect">
            <p>
              We collect information you provide directly — such as your name, email address and any
              message you send through our enquiry form — and basic technical data (such as device and
              browser type) gathered automatically to keep the site secure and working well.
            </p>
          </Section>
          <Section title="How we use it">
            <p>
              We use your information to respond to enquiries, arrange tours and cask reservations, and
              improve our site. We do not sell your personal information. We contact you only about
              matters you have raised or, with your consent, occasional news from the distillery.
            </p>
          </Section>
          <Section title="Cookies">
            <p>
              We use a minimal set of cookies necessary for the site to function and to understand
              aggregate usage. You can control cookies through your browser settings.
            </p>
          </Section>
          <Section title="Your rights">
            <p>
              You may request access to, correction of, or deletion of your personal information at any
              time by writing to <a className="text-primary hover:opacity-80" href={`mailto:${email}`}>{email}</a>.
            </p>
          </Section>
          <Section title="Contact">
            <p>
              Questions about this policy? Email{" "}
              <a className="text-primary hover:opacity-80" href={`mailto:${email}`}>{email}</a>.
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}
