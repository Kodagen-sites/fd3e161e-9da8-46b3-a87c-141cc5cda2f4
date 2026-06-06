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
  title: "Terms of Service",
  description: `The terms governing your use of the ${company} website.`,
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-cream/10 py-8">
      <h2 className="font-display text-2xl text-cream">{title}</h2>
      <div className="mt-4 space-y-4 text-cream/70 leading-relaxed">{children}</div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <>
      <SEOHead title={`Terms of Service — ${company}`} description={`Terms for using the ${company} website.`} path="/terms" />
      <PageHero eyebrow="Legal" title="Terms of Service" image={img("section-about", "copper pot still")} />
      <section className="relative bg-bg section-pad px-6 md:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-cream/60">Effective {effectiveDate}</p>
          <Section title="Acceptance">
            <p>
              By accessing the {company} website you agree to these terms. You confirm that you are of
              legal drinking age in your country of residence. If you do not agree, please do not use
              the site.
            </p>
          </Section>
          <Section title="Responsible enjoyment">
            <p>
              We are proud of what we make and ask that it be enjoyed responsibly. Nothing on this site
              is an offer to sell alcohol where it would be unlawful to do so.
            </p>
          </Section>
          <Section title="Use of the site">
            <p>
              You may browse and share our content for personal, non-commercial use. All trademarks,
              imagery, branding and text remain the property of {company} and may not be reproduced
              without written permission.
            </p>
          </Section>
          <Section title="Enquiries & bookings">
            <p>
              Submitting an enquiry or booking request does not constitute a confirmed reservation
              until we reply to confirm details and availability. Prices and availability may change.
            </p>
          </Section>
          <Section title="Liability">
            <p>
              The site is provided “as is.” To the fullest extent permitted by the laws of{" "}
              {jurisdiction}, {company} is not liable for any indirect or consequential loss arising
              from its use.
            </p>
          </Section>
          <Section title="Contact">
            <p>
              Questions about these terms? Email{" "}
              <a className="text-primary hover:opacity-80" href={`mailto:${email}`}>{email}</a>.
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}
