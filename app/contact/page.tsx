import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import { SEOHead } from "@/components/seo/SEOHead";
import { organizationSchema, breadcrumbSchema } from "@/components/seo/structured-data";
import PageHero from "@/components/PageHero";
import { SocialLinks } from "@/components/social-icons";
import ContactForm from "@/components/contact/ContactForm";
import { img } from "@/lib/assets";

export default function ContactPage() {
  const { email, phone, location } = siteConfig.company;
  return (
    <>
      <SEOHead
        title={`Visit & Enquire — ${siteConfig.company.name}`}
        description="Plan a visit, reserve a cask or ask where to find Iron Oak. Contact our Speyside distillery."
        path="/contact"
        jsonLd={[
          organizationSchema(
            {
              name: siteConfig.company.name,
              description: siteConfig.company.description,
              email,
              phone,
              location,
              url: siteConfig.seo.siteUrl,
              socials: siteConfig.socials,
            },
            siteConfig.seo.structuredData.address
          ),
          breadcrumbSchema([
            { name: "Home", url: siteConfig.seo.siteUrl },
            { name: "Contact", url: `${siteConfig.seo.siteUrl}/contact` },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Come and visit"
        title="Find us in the glen"
        image={img("section-heritage", "highland scotland distillery")}
        intro="Open Monday to Saturday for tours and tastings. We would love to pour you a dram."
      />

      <section className="relative bg-bg section-pad px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-display text-3xl text-cream md:text-4xl">Send us a note</h2>
            <p className="mt-4 max-w-xl text-cream/70">
              Whether it is a tour, a private cask or a bespoke bottling, the same small team will
              reply personally.
            </p>
            <div className="mt-9">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-8">
            <div className="rounded-2xl border border-cream/10 bg-ink p-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">Direct</div>
              <ul className="mt-6 space-y-5 text-cream/80">
                <li className="flex items-start gap-3">
                  <Mail size={16} className="mt-1 flex-shrink-0 text-primary" />
                  <a href={`mailto:${email}`} className="hover:text-cream">{email}</a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={16} className="mt-1 flex-shrink-0 text-primary" />
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-cream">{phone}</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-1 flex-shrink-0 text-primary" />
                  <span>{location}</span>
                </li>
              </ul>
              <div className="mt-8 border-t border-cream/10 pt-6">
                <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-cream/55">
                  Follow
                </div>
                <SocialLinks socials={siteConfig.socials} className="gap-4 text-cream/80" iconClassName="h-5 w-5" />
              </div>
            </div>

            <div className="rounded-2xl border border-cream/10 bg-ink p-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">Opening hours</div>
              <p className="mt-4 text-cream/80">Monday – Saturday · 10:00 – 17:00</p>
              <p className="mt-1 text-cream/55">Closed Sundays &amp; bank holidays. Last tour 16:00.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
