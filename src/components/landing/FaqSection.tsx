import { useState } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";

const faqs = [
  {
    q: "Hvor hurtigt kan vi komme i gang?",
    a: "De fleste kunder er live inden for 1–2 uger. Vi tager hånd om opsætning, træner agenten på jeres use case og kobler den på jeres eksisterende flow."
  },
  {
    q: "Lyder det robotagtigt?",
    a: "Nej — vi optimerer for naturlig dansk stemme, pauser og tone. Målet er at kunden ikke kan høre det er AI, medmindre I vælger at være transparent om det."
  },
  {
    q: "Hvad sker der hvis AI'en ikke kan svare?",
    a: "Agenten kan eskalere til et menneske, tage en besked eller booke et callback — præcis som I konfigurerer det."
  },
  {
    q: "Integrerer det med vores system?",
    a: "Ja. Vi bygger på Cloudflare Workers med API-integrationer til CRM, booking, betaling og POS — afhængigt af jeres stack."
  },
  {
    q: "Hvad koster det?",
    a: "Prisen afhænger af volumen og integrationer. Book en demo, så regner vi ROI igennem sammen med jer."
  }
];

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="border-t border-site-border bg-site-bg py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <p className="site-label mb-4 text-center">FAQ</p>
        <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-site-text sm:text-4xl">
          Spørgsmål vi får hver dag
        </h2>

        <div className="divide-y divide-site-border border-y border-site-border">
          {faqs.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <div key={q}>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 py-6 text-left"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="flex gap-4">
                    <span className="mt-0.5 text-xs font-bold tabular-nums text-site-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-semibold text-site-text sm:text-lg">{q}</span>
                  </span>
                  <span className="mt-1 shrink-0 text-site-muted">
                    {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 pl-10 pr-4">
                    <p className="text-sm leading-relaxed text-site-muted sm:text-base">{a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a href="#contact" className="inline-flex items-center gap-1 text-sm font-semibold text-site-accent hover:underline">
            Flere spørgsmål? Skriv til os
            <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
          </a>
        </div>
      </div>
    </section>
  );
}
