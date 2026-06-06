import type { Config } from "tailwindcss";

// Iron Oak Distillery — "Bordeaux & Cream" locked palette.
// Worked as a dark cinematic theme: deep oxblood base, cream foreground,
// bordeaux accent. Swatches: cream #F8F1E9 / sand #E0CFC4 / bordeaux #7A1F2B
// / oxblood #3D0D14.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Functional theme tokens (templates use bg / primary / accent / ink)
        bg: "#3D0D14",          // page base — deep oxblood
        ink: "#26070C",         // darker base for PageHero / overlays
        surface: "#511A22",     // bordeaux-tinted card surface
        primary: "#B9485A",     // lifted bordeaux — legible accent on dark
        accent: "#7A1F2B",      // bordeaux (oversized-type section bg)
        // Named palette swatches
        cream: "#F8F1E9",
        sand: "#E0CFC4",
        bordeaux: "#7A1F2B",
        oxblood: "#3D0D14",
      },
      fontFamily: {
        display: ["var(--font-display)", "UnifrakturMaguntia", "serif"],
        serif: ["var(--font-display)", "UnifrakturMaguntia", "serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-body)", "Inter", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
