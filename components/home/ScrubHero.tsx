"use client";

import { useState } from "react";
import ScrollCanvas from "@/components/ScrollCanvas";
import { HeroScrollText } from "@/components/motion";
import frames from "@/content/frames-manifest.json";

/**
 * Archetype G — scrub-cinematic hero (Mode 2).
 * ScrollCanvas scrubs the extracted hero frames; its live `progress` drives a
 * multi-chapter HeroScrollText so the headline changes through the scroll.
 */
export default function ScrubHero() {
  const [progress, setProgress] = useState(0);

  return (
    <ScrollCanvas
      frameCount={frames.frameCount}
      pattern={frames.frameUrlTemplate}
      padLength={4}
      scrollDistance={6}
      loadingLabel="Unstoppering"
      loadingVariant="L4"
      onProgress={setProgress}
    >
      <HeroScrollText
        progress={progress}
        position="bottom-left"
        textColor="#F8F1E9"
        accentColor="#E0CFC4"
        accentTextColor="#3D0D14"
        chapters={[
          {
            at: 0,
            eyebrow: "Speyside · Est. 1887",
            headlineLines: ["Patience,", "distilled"],
            subline:
              "Highland single malt, raised in slow-charred oak and unhurried Highland air.",
          },
          {
            at: 0.4,
            eyebrow: "From spring to still",
            headlineLines: ["Drawn from", "granite water"],
            subline:
              "Soft spring water, floor-malted barley, two small copper pot stills run slow.",
          },
          {
            at: 0.75,
            eyebrow: "The reward of waiting",
            headlineLines: ["A dram worth", "the years"],
            subline: "Natural colour. Cask strength. Bottled by hand when — and only when — it is ready.",
            cta: { label: "Explore the range", href: "/services" },
          },
        ]}
      />
    </ScrollCanvas>
  );
}
