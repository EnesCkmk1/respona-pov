import { brand, seo, siteUrl, testimonials } from "../content/site";

const faqEntries = [
  {
    question: `Hvad er ${brand.name} egentlig?`,
    answer:
      "En voice agent platform vi bygger som proof of concept — React frontend, Cloudflare Workers backend, D1 til data og Agents SDK til real-time samtaler."
  },
  {
    question: "Er det bare en chatbot med mikrofon?",
    answer:
      "Nej. Vi optimerer for telefon-flow: pauser, bekræftelser, eskalering og integrationer — ikke bare Q&A i en boks."
  },
  {
    question: "Kan vi få vores egen stemme og tone?",
    answer:
      "Ja. I definerer scripts, persona og grænser. Agenten skal lyde som jer — ikke som en generisk assistent."
  },
  {
    question: "Hvad med GDPR og data?",
    answer:
      "Data ligger i jeres Cloudflare-konto (D1 + DO). Vi designer med dataminimering — ingen unødvendig lagring af rå lyd uden aftale."
  },
  {
    question: "Hvornår er det klar til produktion?",
    answer:
      "PoV'en er live nu til demo og pilot. Produktion afhænger af jeres integrationskrav — typisk 2–4 uger efter scope er låst."
  }
];

export function SeoJsonLd() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: brand.name,
      url: siteUrl,
      description: seo.description,
      slogan: brand.tagline
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: brand.name,
      description: seo.description,
      inLanguage: brand.language,
      publisher: { "@id": `${siteUrl}/#organization` }
    },
    {
      "@type": "SoftwareApplication",
      name: brand.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: seo.description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "DKK",
        description: "Pilot og demo — kontakt for pris"
      }
    },
    {
      "@type": "FAQPage",
      mainEntity: faqEntries.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer }
      }))
    },
    ...testimonials.map(({ quote, name, role, company }) => ({
      "@type": "Review",
      reviewBody: quote,
      author: {
        "@type": "Person",
        name,
        jobTitle: role,
        worksFor: { "@type": "Organization", name: company }
      },
      itemReviewed: { "@type": "SoftwareApplication", name: brand.name }
    }))
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
