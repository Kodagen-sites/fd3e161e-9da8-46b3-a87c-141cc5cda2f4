import type { Metadata } from "next";
import { Inter, UnifrakturMaguntia } from "next/font/google";
import { siteConfig } from "@/content/site-config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FilmGrain, Vignette, ScrollProgress } from "@/components/motion";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const unifraktur = UnifrakturMaguntia({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: `%s — ${siteConfig.company.name}`,
  },
  description: siteConfig.seo.defaultDescription,
  openGraph: {
    type: "website",
    siteName: siteConfig.company.name,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    locale: siteConfig.seo.locale,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.seo.twitterHandle,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.seo.htmlLang} className={`${inter.variable} ${unifraktur.variable}`}>
      <body className="bg-bg text-cream antialiased">
        <div className="relative min-h-screen bg-bg">
          <ScrollProgress />
          <Header />
          <main className="relative z-10">{children}</main>
          <Footer />
          <Vignette />
          <FilmGrain />
        </div>
      </body>
    </html>
  );
}
