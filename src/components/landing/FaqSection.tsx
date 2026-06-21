import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { brand } from "../../content/site";

const faqs = [
  {
    q: `Hvad er ${brand.name} egentlig?`,
    a: "En voice agent platform vi bygger som proof of concept — React frontend, Cloudflare Workers backend, D1 til data og Agents SDK til real-time samtaler."
  },
  {
    q: "Er det bare en chatbot med mikrofon?",
    a: "Nej. Vi optimerer for telefon-flow: pauser, bekræftelser, eskalering og integrationer — ikke bare Q&A i en boks."
  },
  {
    q: "Kan vi få vores egen stemme og tone?",
    a: "Ja. I definerer scripts, persona og grænser. Agenten skal lyde som jer — ikke som en generisk assistent."
  },
  {
    q: "Hvad med GDPR og data?",
    a: "Data ligger i jeres Cloudflare-konto (D1 + DO). Vi designer med dataminimering — ingen unødvendig lagring af rå lyd uden aftale."
  },
  {
    q: "Hvornår er det klar til produktion?",
    a: "PoV'en er live nu til demo og pilot. Produktion afhænger af jeres integrationskrav — typisk 2–4 uger efter scope er låst."
  }
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <article className={`faq-item ${isOpen ? "faq-item-open" : ""}`}>
      <button
        type="button"
        className="faq-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq-question">{question}</span>
        <ChevronDown className="faq-chevron h-5 w-5 shrink-0" strokeWidth={2} />
      </button>

      <div className="faq-panel">
        <div className="faq-panel-inner">
          <p className="faq-answer">{answer}</p>
        </div>
      </div>
    </article>
  );
}

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-10 text-center">
          <p className="site-label mb-3">FAQ</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-site-text sm:text-4xl">
            Det I typisk spørger om før pilot
          </h2>
        </div>

        <div className="faq-list">
          {faqs.map(({ q, a }, i) => (
            <FaqItem
              key={q}
              question={q}
              answer={a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
