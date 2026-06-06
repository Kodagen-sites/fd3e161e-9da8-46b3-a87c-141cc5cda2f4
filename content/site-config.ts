// ============================================================
// site-config.ts — single source of truth for all copy + brand
// Iron Oak Distillery — premium Highland single malt Scotch whisky.
// ============================================================

export const siteConfig = {
  company: {
    name: "Iron Oak Distillery",
    tagline: "Highland Single Malt · Est. 1887",
    description:
      "A family Highland distillery patiently coaxing single malt Scotch whisky from spring water, barley and slow-charred oak — the same way since 1887.",
    email: "enquiries@ironoakdistillery.com",
    phone: "+44 1340 555 187",
    location: "Glen Carrach · Speyside, Scottish Highlands",
  },

  brand: {
    // bordeaux accent — used as the oversized-type section background
    primary: "#7A1F2B",
    accent: "#7A1F2B",
    // cream — used as the text colour over the bordeaux section
    bg: "#F8F1E9",
  },

  typography: {
    display: "Unifraktur Maguntia",
    body: "Inter",
    mono: "Inter",
  },

  seo: {
    siteUrl: "https://ironoakdistillery.com",
    locale: "en_GB",
    htmlLang: "en-GB",
    defaultTitle: "Iron Oak Distillery — Highland Single Malt Scotch Whisky",
    defaultDescription:
      "Iron Oak Distillery has crafted Highland single malt Scotch whisky in Speyside since 1887 — spring water, floor-malted barley and slow maturation in charred oak.",
    defaultOgImage: "https://ironoakdistillery.com/og-default.png",
    twitterHandle: "@ironoakwhisky",
    noindexPaths: ["/account", "/admin", "/auth", "/api"],
    googleSiteVerification: "",
    structuredData: {
      businessType: "Distillery",
      address: {
        streetAddress: "Glen Carrach Road",
        addressLocality: "Craigellachie",
        addressRegion: "Moray",
        postalCode: "AB38 9ST",
        addressCountry: "GB",
      },
      hours: [
        { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "17:00" },
      ],
      priceRange: "£££",
      geo: { latitude: 57.4869, longitude: -3.1899 },
      rating: null,
      starRating: null,
      amenities: [] as string[],
      cuisine: [] as string[],
    },
  },

  socials: {
    instagram: "https://instagram.com/ironoakwhisky",
    twitter: "https://twitter.com/ironoakwhisky",
    facebook: "https://facebook.com/ironoakdistillery",
    linkedin: "https://linkedin.com/company/iron-oak-distillery",
    youtube: "",
    tiktok: "",
    whatsapp: "",
  },

  hero: {
    h1: [
      { text: "Patience,", accent: false },
      { text: "distilled", accent: true },
      { text: "since 1887.", accent: false },
    ],
  },

  tagline: "Highland Single Malt · Est. 1887",

  servicesHeading: "What we make, and what we offer",

  services: [
    {
      name: "Single Malt Releases",
      slug: "single-malt",
      description:
        "Our core range and annual limited expressions — Highland single malt drawn from sherry, bourbon and virgin oak, bottled without haste.",
      highlights: ["Core 12 & 18 year", "Annual limited cask editions", "Natural colour, non chill-filtered"],
    },
    {
      name: "Private Cask Programme",
      slug: "private-cask",
      description:
        "Reserve a maturing cask of new-make spirit and watch it become your own single malt over the years, sleeping in our dunnage warehouse.",
      highlights: ["First-fill & refill casks", "Annual sampling invitation", "Bottled to your strength when ready"],
    },
    {
      name: "Distillery Tours & Tastings",
      slug: "tours-tastings",
      description:
        "Walk the mash house, still room and warehouse, then nose and taste a guided flight straight from the cask with our team.",
      highlights: ["Heritage walking tour", "Cask-strength tasting flight", "Private group experiences"],
    },
    {
      name: "Bespoke Bottling",
      slug: "bespoke-bottling",
      description:
        "Single-cask bottlings finished, labelled and numbered for weddings, anniversaries, members' clubs and discerning brands.",
      highlights: ["Single-cask selection", "Bespoke label & engraving", "Commemorative editions"],
    },
  ],

  rooms: [] as Array<{
    slug: string; name: string; description: string; pricePerNight: number;
    currency: string; maxGuests: number; squareMeters?: number; image?: string;
    images?: string[]; amenities?: string[];
  }>,
  locations: [] as Array<any>,
  gallery: [] as Array<{ src: string; alt: string; caption?: string; width?: number; height?: number }>,

  whyUs: {
    heading: "Why Iron Oak",
    items: [
      { title: "Floor-malted barley", description: "We still turn our own malt by hand on the stone floor — a slow ritual most distilleries abandoned decades ago." },
      { title: "Spring-fed water", description: "Every drop begins as soft Highland water drawn from the Carrach spring rising through granite above the glen." },
      { title: "Slow-charred oak", description: "Our spirit matures only in casks we char ourselves, never hurried, in earth-floored dunnage warehouses." },
      { title: "Bottled by hand", description: "Natural colour, non chill-filtered, numbered and signed — the way single malt was meant to reach you." },
    ],
  },

  process: [
    { step: 1, title: "Malt & Mash", description: "Floor-malted barley is kilned over peat and milled, then mashed with soft spring water to draw out a sweet wort." },
    { step: 2, title: "Ferment & Distil", description: "Long copper-pot fermentation and a patient double distillation cut a clean, fruit-laden new-make spirit." },
    { step: 3, title: "Mature in Oak", description: "The spirit sleeps for years in slow-charred casks, breathing the cool Highland air until the wood and whisky agree." },
    { step: 4, title: "Bottle by Hand", description: "When a cask is ready we bottle it at natural strength, unhurried, numbered and signed by the distiller." },
  ],

  aboutHeading: "A century and a half in the glen",
  aboutStory:
    "Iron Oak was founded in 1887 when cooper Alasdair Rennick raised a single copper still beside the Carrach spring and refused to be hurried. Five generations later we still malt our own barley by hand, still char our own oak, and still measure progress in years rather than quarters. We are a small distillery by design — what we lose to patience we keep in character.",
  manifesto:
    "We do not chase the fastest path to the glass. Time is the only ingredient that cannot be bought, and it is the one we give most freely.",
  values: [
    { title: "Patience", description: "Nothing leaves the warehouse before it is ready — not for a season, a deadline or a sale." },
    { title: "Provenance", description: "Barley, water, peat and oak: everything that shapes our whisky comes from this glen and its keeping." },
    { title: "Craft", description: "Hands over automation. The marks of the maker are a feature of every bottle, not a flaw." },
    { title: "Restraint", description: "Natural colour, natural strength, nothing added and nothing taken — the cask has the final word." },
  ],

  work: [
    { title: "The 1887 Reserve", client: "Flagship", service: "Single Malt", result: "Our oldest continuously-filled cask line — 25 years in first-fill oloroso." },
    { title: "Oloroso Cask No. 7", client: "Limited Release", service: "Single Cask", result: "612 hand-numbered bottles at cask strength, sold out in nine days." },
    { title: "Coastal Peat Edition", client: "Annual Limited", service: "Single Malt", result: "A maritime-peated expression matured within sight of the sea." },
    { title: "The Cooper's Dram", client: "Distillery Exclusive", service: "Bespoke Bottling", result: "A virgin-oak finish bottled only for visitors to the still room." },
    { title: "Founders' Private Casks", client: "Cask Programme", service: "Private Cask", result: "A waiting list of patrons maturing their own single malt with us." },
    { title: "Glen Carrach Wedding No. 214", client: "Private Client", service: "Bespoke Bottling", result: "A single cask engraved and bottled to mark a Speyside wedding." },
  ],

  stats: [
    { value: "1887", label: "Founded" },
    { value: "5", label: "Generations" },
    { value: "8,400", label: "Casks resting" },
    { value: "100%", label: "Floor-malted" },
  ],

  features: [
    { title: "Floor-malted, peat-kilned barley", description: "The character starts on the malting floor, long before the still." },
    { title: "Two small copper pot stills", description: "Run slow and cut narrow for a fruit-forward, clean new-make." },
    { title: "Earth-floored dunnage warehouses", description: "Cool, damp and still — the ideal place for whisky to forget the world." },
  ],

  sectionThemeWord: "Time",

  narrative: [] as Array<{ speaker: string; text: string }>,

  mixedMedia: {
    skipSecondaryVideo: true,
    accentEyebrow: "The Warehouse",
    accentLine: "Eight thousand casks, breathing the Highland air in the dark.",
  },

  cta: {
    primary: "Plan a visit",
    secondary: "Explore the range",
  },

  ctaBlock: {
    heading: "Come and taste the patience.",
    description:
      "Book a tour, reserve a private cask, or simply find out where to pour a dram of Iron Oak near you. We would be glad to hear from you.",
  },

  trustBar: ["Est. 1887", "Speyside · Highlands", "Natural colour", "Non chill-filtered", "Independently owned"],

  scrollHero: {
    archetype: "G" as "A" | "B" | "C" | "D" | "E" | "F" | "G",
    styleId: "S-heritage-luxury",
    assetMode: "live-generate" as "live-generate" | "prompt-only",
    imageUrl: "",
    frameCount: 240,
    scrollDistance: 6,
  },

  headerVariant: "burger-only" as const,

  footerVariant: "FT2" as const,

  motion: {
    scrollProgress: true,
    cursorFollower: false,
    intensity: "medium" as "low" | "medium" | "high",
  },
} as const;

export type SiteConfig = typeof siteConfig;
