import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  Cloud,
  Layers,
  MessageCircle,
  Play,
  RotateCcw,
  Shield,
  Zap
} from "lucide-react";
import { brand, useCases } from "../../content/site";
import { ContactForm } from "./ContactForm";
import { HeroVisual } from "./HeroVisual";

const demoLines = [
  {
    speaker: "agent",
    text: "Hej, du har ringet Respona — hvordan kan jeg hjælpe?"
  },
  {
    speaker: "caller",
    text: "Vi overvejer en voice agent til vores supportlinje. Hvad adskiller jer?"
  },
  {
    speaker: "agent",
    text: "Vi kører på Cloudflare edge, så svartiden er under 300 ms. Og vi lyder som jer — ikke som en standard-bot."
  },
  {
    speaker: "caller",
    text: "Kan I integrere med vores CRM og booke demoer automatisk?"
  },
  {
    speaker: "agent",
    text: "Ja. Jeg kan sende en kalenderinvitation nu — hvilken email skal jeg bruge?"
  }
];

const capabilities = [
  {
    icon: MessageCircle,
    title: "Samtaler der husker kontekst",
    description:
      "Agenten følger tråden — selv når kunden skifter emne midt i opkaldet.",
    color: "indigo" as const
  },
  {
    icon: Zap,
    title: "Edge-latency",
    description:
      "Workers + Durable Objects giver real-time uden server der sover.",
    color: "coral" as const
  },
  {
    icon: Shield,
    title: "I ejer dataflowet",
    description:
      "D1 til struktureret data, DO til live state — ingen vendor lock-in på chat.",
    color: "teal" as const
  },
  {
    icon: Layers,
    title: "Tools & workflows",
    description:
      "Booking, CRM-opslag og eskalering — som plugins, ikke hardcode.",
    color: "violet" as const
  }
];

const capIconClass = {
  indigo: "cap-icon-indigo",
  coral: "cap-icon-coral",
  teal: "cap-icon-teal",
  violet: "cap-icon-violet"
};

const chipClass = {
  indigo: "chip-indigo",
  coral: "chip-coral",
  teal: "chip-teal"
};

function ConversationPreview() {
  const [lineIndex, setLineIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setLineIndex((i) => (i + 1) % demoLines.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [playing]);

  return (
    <div className="glass-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-site-border bg-site-soft/50 px-5 py-4">
        <div>
          <p className="text-xs font-semibold text-site-accent">
            Respona sandbox
          </p>
          <p className="text-sm text-site-muted">Simuleret support-opkald</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setPlaying((p) => !p);
            if (!playing) setLineIndex(0);
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-site-surface px-3 py-1.5 text-xs font-semibold text-site-accent ring-1 ring-site-border"
        >
          {playing ? (
            <RotateCcw className="h-3 w-3" />
          ) : (
            <Play className="h-3 w-3" />
          )}
          {playing ? "Genstart" : "Afspil"}
        </button>
      </div>

      <div className="min-h-[240px] space-y-3 p-5">
        {demoLines.slice(0, lineIndex + 1).map((line, i) => (
          <div
            key={i}
            className={`demo-line max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              line.speaker === "agent"
                ? "bg-site-soft text-site-text"
                : "ml-auto bg-site-accent text-white"
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>

      <div className="flex h-12 items-end justify-center gap-1 border-t border-site-border px-5 pb-4 pt-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="voice-bar w-1 rounded-full bg-gradient-to-t from-site-accent to-site-violet"
            style={{
              animationDelay: `${i * 0.06}s`,
              opacity: 0.5 + (i % 3) * 0.15
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="hero-mesh grain relative border-b border-site-border pt-10 pb-16 sm:pt-16 sm:pb-20">
      <div className="hero-blob hero-blob-indigo float-slow" aria-hidden />
      <div className="hero-blob hero-blob-coral float-slower" aria-hidden />
      <div className="hero-blob hero-blob-teal float-slow" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="fade-up mb-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-site-text sm:text-5xl lg:text-[3.25rem]">
              Hver samtale fortjener et svar.{" "}
              <span className="hero-highlight">Også kl. 03 om natten.</span>
            </h1>
            <p className="fade-up fade-up-d1 mb-8 max-w-lg text-lg leading-relaxed text-site-muted">
              {brand.description}
            </p>
            <div className="fade-up fade-up-d2 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn-primary">
                Start en samtale med os
              </a>
              <a href="#demo" className="btn-ghost">
                Se sandbox-demo
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="fade-up fade-up-d1 lg:pl-4">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

export function DemoSection() {
  return (
    <section id="demo" className="section-tint-indigo py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <p className="site-label mb-3">Sandbox</p>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-site-text sm:text-4xl">
            Hør forskellen på 30 sekunder
          </h2>
          <p className="mb-6 text-site-muted leading-relaxed">
            Det her er ikke en restaurant-bot eller et script fra 2019. Det er
            en generel voice agent bygget til B2B-support — med jeres tone,
            jeres flows.
          </p>
          <ul className="space-y-3 text-sm text-site-text">
            <li className="flex gap-2">
              <Bot className="mt-0.5 h-4 w-4 shrink-0 text-site-accent" />
              Forstår intent — ikke bare keywords
            </li>
            <li className="flex gap-2">
              <Cloud className="mt-0.5 h-4 w-4 shrink-0 text-site-accent" />
              Kører globalt på Cloudflare Workers
            </li>
          </ul>
        </div>
        <ConversationPreview />
      </div>
    </section>
  );
}

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      className="border-y border-site-border bg-site-surface py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="site-label mb-3">Platform</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-site-text sm:text-4xl">
              Bygget til teams — ikke til slide decks
            </h2>
          </div>
          <p className="max-w-md text-site-muted">
            React frontend, Workers backend, D1 database og Agents SDK i én
            samlet stack.
          </p>
        </div>

        <div className="bento-grid">
          {capabilities.map(({ icon: Icon, title, description, color }, i) => (
            <article
              key={title}
              className={`bento-cell bento-${color} ${i === 0 || i === 3 ? "bento-wide" : ""} group`}
            >
              <div
                className={`mb-5 flex h-11 w-11 items-center justify-center rounded-2xl ${capIconClass[color]} transition group-hover:scale-110`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-site-text">{title}</h3>
              <p className="text-sm leading-relaxed text-site-muted">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {useCases.map(({ title, description, color }) => (
            <div
              key={title}
              className={`rounded-xl border px-5 py-5 text-center ${chipClass[color]}`}
            >
              <p className="font-semibold">{title}</p>
              <p className="mt-1 text-xs opacity-80">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="contact-gradient py-20 text-white sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">
              Kontakt {brand.name}
            </p>
            <h2 className="mb-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Curious? Lad os tage en snak.
            </h2>
            <p className="mb-6 max-w-md leading-relaxed text-white/60">
              Ingen salgs-PowerPoints. Vi viser sandbox&apos;en, hører jeres use
              case og siger ærligt om det giver mening.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
            <h3 className="mb-1 text-lg font-bold">Skriv til os</h3>
            <p className="mb-6 text-sm text-white/50">
              Vi svarer inden for 24 timer.
            </p>
            <ContactForm variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-site-border bg-site-bg py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm font-bold text-site-text">{brand.name}</p>
        <p className="text-xs text-site-muted">
          © {new Date().getFullYear()} {brand.name}
        </p>
        <div className="flex gap-5 text-xs font-medium text-site-muted">
          <a href="#stories" className="hover:text-site-accent">
            Citater
          </a>
          <a href="#how" className="hover:text-site-accent">
            Sådan virker det
          </a>
          <a href="#capabilities" className="hover:text-site-accent">
            Platform
          </a>
          <a href="#contact" className="hover:text-site-accent">
            Kontakt
          </a>
        </div>
      </div>
    </footer>
  );
}
