import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  Clock,
  Headphones,
  Mic,
  Phone,
  Play,
  RotateCcw,
  Waves
} from "lucide-react";
import { ContactForm } from "./ContactForm";

const trustPills = [
  "24/7 tilgængelig",
  "Flydende dansk (æ ø å)",
  "Ingen mistede opkald"
];

const stats = [
  {
    value: "+30%",
    label: "Flere henvendelser",
    description: "Fang dem der giver op når telefonen ikke bliver taget."
  },
  {
    value: "0 sek",
    label: "Ventetid",
    description: "Øjeblikkeligt svar — uanset hvor mange der ringer samtidig."
  },
  {
    value: "12t",
    label: "Sparet pr. uge",
    description: "Frigør teamet til det der kræver et menneske."
  },
  {
    value: "100%",
    label: "På dansk",
    description: "Bygget til dansk — forstår accenter og naturlig tale."
  }
];

const features = [
  {
    icon: Waves,
    title: "Flydende stemme",
    description:
      "Naturlig dialog uden robot-tone. Gæsterne mærker det som et rigtigt opkald."
  },
  {
    icon: Headphones,
    title: "Tager imod henvendelser",
    description: "Optager detaljer, bekræfter og sender data direkte til jeres system."
  },
  {
    icon: Clock,
    title: "24/7 i drift",
    description: "Aldrig en pause. Weekender, helligdage og myldretid — alt dækket."
  },
  {
    icon: Bot,
    title: "Du har kontrollen",
    description: "I bestemmer tone, scripts og hvilke spørgsmål agenten må besvare."
  }
];

const demoLines = [
  { speaker: "agent", text: "Hej, du har ringet til Voice Agent demo — hvad kan jeg hjælpe med?" },
  { speaker: "caller", text: "Hej, jeg vil gerne høre om jeres løsning til kundeservice." },
  { speaker: "agent", text: "Selvfølgelig. Vi tager imod opkald 24/7 med naturlig dansk stemme. Skal jeg booke en demo til jer?" },
  { speaker: "caller", text: "Ja tak — vi er en voksende webshop med mange support-opkald." },
  { speaker: "agent", text: "Perfekt. Jeg sender en bekræftelse på email og booker 15 minutter med teamet. God dag!" }
];

const conversations = [
  { phone: "+45 31 22 ··", summary: "Demo booket · onsdag 14:00" },
  { phone: "+45 28 90 ··", summary: "Support-spørgsmål løst" },
  { phone: "+45 40 17 ··", summary: "Callback planlagt · 16:30" },
  { phone: "+45 22 64 ··", summary: "FAQ besvaret · ordre status" }
];

function TrustPills() {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-site-border pt-8 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-site-muted sm:text-xs">
      {trustPills.map((pill) => (
        <li key={pill} className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-site-accent" />
          {pill}
        </li>
      ))}
    </ul>
  );
}

function LiveDemoPlayer() {
  const [lineIndex, setLineIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setLineIndex((i) => (i + 1) % demoLines.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [playing]);

  return (
    <div className="site-card overflow-hidden shadow-sm">
      <div className="flex items-center justify-between border-b border-site-border px-5 py-4">
        <div>
          <p className="text-xs font-medium text-site-muted">Voice Agent · indgående</p>
          <p className="text-sm font-semibold text-site-text">Live demo</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-emerald-600">Aktiv</span>
        </div>
      </div>

      <div className="space-y-3 bg-site-bg/50 p-5 min-h-[220px]">
        {demoLines.slice(0, lineIndex + 1).map((line, i) => (
          <div
            key={i}
            className={`max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
              line.speaker === "agent"
                ? "bg-site-surface text-site-muted ring-1 ring-site-border"
                : "ml-auto bg-site-accent/10 text-site-text ring-1 ring-site-accent/20"
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-site-border px-5 py-3">
        <div className="flex h-10 items-end gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="voice-bar w-1 rounded-full bg-site-accent/70"
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setPlaying((p) => !p);
            if (!playing) setLineIndex(0);
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-site-accent"
        >
          {playing ? <RotateCcw className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {playing ? "Afspil igen" : "Afspil"}
        </button>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="border-b border-site-border bg-site-bg pt-12 pb-16 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="site-label fade-up mb-5">AI drevet</p>
          <h1 className="fade-up fade-up-d1 mb-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-site-text sm:text-5xl lg:text-[3.5rem]">
            Din virksomhed besvarer opkaldet.{" "}
            <span className="text-site-accent">Selv når I ikke gør.</span>
          </h1>
          <p className="fade-up fade-up-d2 mb-8 max-w-2xl text-lg leading-relaxed text-site-muted">
            AI-drevet stemmeteknologi til dansk kundekontakt. Ingen mistede opkald, ingen
            ventetid på linjen — kun flere henvendelser og roligere medarbejdere.
          </p>
          <div className="fade-up fade-up-d3 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">
              Book gratis demo
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-site-text underline-offset-4 hover:underline"
            >
              Hør demoen først
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <TrustPills />
        </div>
      </div>
    </section>
  );
}

export function DemoSection() {
  return (
    <section id="demo" className="border-b border-site-border bg-site-bg py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 max-w-2xl">
          <p className="site-label mb-3">Live demo</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-site-text sm:text-4xl">
            Se hvordan det lyder i praksis
          </h2>
          <p className="mt-4 text-site-muted">
            En kort demo af AI&apos;en i aktion — fra opkald til løst henvendelse.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <LiveDemoPlayer />
          <div className="flex flex-col justify-center">
            <ul className="space-y-4">
              {[
                "Forstår dansk i realtid",
                "Håndterer flere opkald samtidig",
                "Integrerer med jeres workflow"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-site-text">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-site-accent/10 text-site-accent">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn-primary mt-10 w-fit">
              Få din egen demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsSection() {
  return (
    <section className="border-b border-site-border bg-site-surface py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="site-label mb-3">Resultater</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-site-text sm:text-4xl">
            Tal I kan høre — og se på bundlinjen
          </h2>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, label, description }) => (
            <article key={label} className="border-t-2 border-site-accent pt-6">
              <p className="text-4xl font-extrabold tracking-tight text-site-text">{value}</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-wide text-site-text">
                {label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-site-muted">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="border-b border-site-border bg-site-bg py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="site-label mb-3">Platform</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-site-text sm:text-4xl">
            Integreret direkte i jeres daglige drift
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="site-card group p-8 transition hover:border-site-accent/40 hover:shadow-md"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-site-accent text-white transition group-hover:scale-105">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-site-text">{title}</h3>
              <p className="text-sm leading-relaxed text-site-muted">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DashboardSection() {
  return (
    <section className="border-b border-site-border bg-site-surface py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="site-label mb-3">Dashboard</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-site-text sm:text-4xl">
              Hele driften. Samlet ét sted.
            </h2>
            <p className="mt-3 text-site-muted">Bygget til teams — ikke til IT-folk.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-site-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live · Demo workspace
          </div>
        </div>

        <div className="site-card overflow-hidden shadow-sm">
          <div className="grid gap-px bg-site-border lg:grid-cols-[1fr_1.2fr]">
            <div className="bg-site-surface p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-site-muted">
                Overblik i dag
              </p>
              <div className="mt-6 grid grid-cols-2 gap-6">
                {[
                  { label: "Opkald", value: "147", delta: "+22%" },
                  { label: "Løst rate", value: "94%", delta: "+8%" },
                  { label: "Gns. tid", value: "2:14", delta: "-18%" },
                  { label: "Eskaleret", value: "9", delta: "−3" }
                ].map(({ label, value, delta }) => (
                  <div key={label}>
                    <p className="text-xs text-site-muted">{label}</p>
                    <p className="mt-1 text-2xl font-extrabold text-site-text">{value}</p>
                    <p className="mt-1 text-xs font-semibold text-site-accent">{delta}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-site-bg/40 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-site-muted">
                Seneste samtaler
              </p>
              <ul className="mt-4 divide-y divide-site-border">
                {conversations.map(({ phone, summary }) => (
                  <li key={phone} className="flex items-center justify-between py-3.5 first:pt-0">
                    <div>
                      <p className="text-sm font-semibold text-site-text">{phone}</p>
                      <p className="text-xs text-site-muted">{summary}</p>
                    </div>
                    <Phone className="h-4 w-4 text-site-accent/60" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="bg-site-dark py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400/90">
              Kom i gang
            </p>
            <h2 className="mb-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Klar til at høre mere?
            </h2>
            <p className="mb-8 max-w-md text-base leading-relaxed text-white/65">
              15 minutter. Vi viser jer systemet og regner ROI&apos;en igennem sammen med jer.
              Ingen binding.
            </p>
            <ul className="space-y-3 text-sm text-white/80">
              {["Gratis intro-samtale", "Skræddersyet demo", "Svar inden 24 timer"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
            <h3 className="mb-1 text-lg font-bold">Send en besked</h3>
            <p className="mb-6 text-sm text-white/55">Vi læser hver henvendelse personligt.</p>
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
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-site-accent text-white">
            <Mic className="h-3.5 w-3.5" />
          </span>
          <span className="text-xs font-bold tracking-[0.16em] text-site-text">VOICE AGENT</span>
        </div>
        <p className="text-center text-xs text-site-muted">
          © {new Date().getFullYear()} Voice Agent PoV · React · Cloudflare · D1
        </p>
        <div className="flex gap-6 text-xs font-medium text-site-muted">
          <a href="#features" className="hover:text-site-text">
            Funktioner
          </a>
          <a href="#faq" className="hover:text-site-text">
            FAQ
          </a>
          <a href="#contact" className="hover:text-site-text">
            Kontakt
          </a>
        </div>
      </div>
    </footer>
  );
}