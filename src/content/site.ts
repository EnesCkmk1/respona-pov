export const brand = {
  name: "Respona",
  tagline: "Voice agents der lyder som jer — ikke som en manual.",
  description:
    "Respona er vores platform til AI-drevet stemmekontakt. Bygget på Cloudflare edge for teams der vil svare hurtigt uden at miste det menneskelige.",
  locale: "da_DK",
  language: "da"
};

/** Opdater når I har custom domain — bruges til canonical, OG og sitemap. */
export const siteUrl =
  import.meta.env.VITE_SITE_URL ?? "https://voiceagent-pov.workers.dev";

export const seo = {
  title: "Respona — Voice agents der lyder som jer",
  description:
    "Respona er en AI voice agent platform på Cloudflare edge. Naturlig dansk stemme, under 300 ms svartid og workflows I selv ejer — til kundeservice, salg og intern support.",
  keywords: [
    "voice agent",
    "AI telefon",
    "kundeservice automation",
    "Cloudflare Workers",
    "dansk voice AI",
    "Respona",
    "B2B support",
    "stemmeassistent"
  ],
  ogImage: "/og-image.svg",
  twitterHandle: "@respona"
};

export const testimonials = [
  {
    quote:
      "Vi havde 40+ ubesvarede opkald om ugen. Nu er det nul — og kunderne opdager det knap nok.",
    name: "Mette K.",
    role: "COO",
    company: "NordicFlow",
    initials: "MK",
    accent: "coral" as const
  },
  {
    quote:
      "Det lyder ikke som en robot. Det lyder som den kollega der faktisk har læst jeres FAQ.",
    name: "Jonas R.",
    role: "Head of Support",
    company: "ScaleDesk",
    initials: "JR",
    accent: "teal" as const
  },
  {
    quote:
      "Vi gik live på en eftermiddag. Resten af ugen brugte vi på at fejre i stedet for at hyre.",
    name: "Sarah L.",
    role: "Driftschef",
    company: "Helix Logistics",
    initials: "SL",
    accent: "violet" as const
  }
];

export const useCases = [
  {
    title: "Kundeservice",
    description: "Svar på FAQ, status og bookinger — uden kø.",
    color: "indigo" as const
  },
  {
    title: "Salgs-kvalificering",
    description: "Fang leads, stil de rigtige spørgsmål og book møder.",
    color: "coral" as const
  },
  {
    title: "Intern support",
    description: "Medarbejdere får svar på proces og IT — 24/7.",
    color: "teal" as const
  }
];

export const howItWorks = [
  {
    step: "01",
    title: "Definer jeres persona",
    description:
      "Tone, grænser og scripts — så agenten lyder som et teammedlem, ikke en manual.",
    accent: "indigo" as const
  },
  {
    step: "02",
    title: "Kobl jeres flows",
    description:
      "Booking, CRM, statusopslag og eskalering — som moduler I kan skrue på og af.",
    accent: "coral" as const
  },
  {
    step: "03",
    title: "Gå live på edge",
    description:
      "Deploy på Cloudflare Workers. Global latency, nul server der sover, fuld kontrol.",
    accent: "teal" as const
  }
];
