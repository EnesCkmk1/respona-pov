import {
  ArrowRight,
  Bot,
  Check,
  Globe,
  Headphones,
  Mic,
  Phone,
  Sparkles,
  TrendingUp,
  Waves,
  Zap
} from "lucide-react";
import { ContactForm } from "./ContactForm";

const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const marqueeItems = [
  "React 19",
  "Cloudflare Workers",
  "D1 Database",
  "Agents SDK",
  "Workers AI",
  "WebSockets",
  "Real-time Voice",
  "Edge Computing"
];

function FloatingOrbs() {
  return (
    <>
      <div className="animate-blob pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <div
        className="animate-blob pointer-events-none absolute -right-16 top-40 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="animate-blob pointer-events-none absolute bottom-10 left-1/3 h-48 w-48 rounded-full bg-kumo-brand/20 blur-3xl"
        style={{ animationDelay: "-7s" }}
      />
    </>
  );
}

function VoiceDemoCard() {
  return (
    <div className="fade-up fade-up-delay-3 animate-float relative mx-auto w-full max-w-md">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-kumo-brand/25 via-violet-500/15 to-cyan-500/15 blur-2xl animate-pulse-ring" />
      <div className="gradient-border card-shine relative overflow-hidden p-6 shadow-2xl shadow-kumo-brand/15">
        <div className="noise-overlay absolute inset-0 opacity-40" />
        <div className="relative">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold text-kumo-default">Live agent</span>
            </div>
            <span className="rounded-full bg-gradient-to-r from-kumo-brand/20 to-violet-500/20 px-3 py-1 text-xs font-semibold text-kumo-brand ring-1 ring-kumo-brand/20">
              &lt; 300ms
            </span>
          </div>

          <div className="mb-6 flex h-32 items-end justify-center gap-1.5 rounded-2xl bg-kumo-elevated/80 px-5 py-6 ring-1 ring-kumo-line/50">
            {bars.map((i) => (
              <div
                key={i}
                className="voice-bar w-2 rounded-full bg-gradient-to-t from-violet-500/50 via-kumo-brand to-cyan-400"
                style={{ animationDelay: `${i * 0.07}s` }}
              />
            ))}
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl rounded-tl-sm bg-kumo-elevated/90 px-4 py-3.5 text-sm leading-relaxed text-kumo-inactive ring-1 ring-kumo-line/40">
              Hej! Jeg er jeres voice agent — hvad kan jeg hjælpe med i dag?
            </div>
            <div className="ml-6 rounded-2xl rounded-tr-sm bg-gradient-to-br from-kumo-brand/20 to-violet-500/10 px-4 py-3.5 text-sm leading-relaxed text-kumo-default ring-1 ring-kumo-brand/25">
              Jeg vil gerne høre om jeres løsning til kundeservice.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="hero-glow relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      <FloatingOrbs />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-80" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-12">
        <div>
          <div className="fade-up mb-7 inline-flex items-center gap-2 rounded-full border border-kumo-brand/30 bg-gradient-to-r from-kumo-brand/10 to-violet-500/10 px-4 py-2 text-xs font-semibold text-kumo-brand shadow-sm shadow-kumo-brand/10">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span className="animate-shimmer bg-gradient-to-r from-kumo-brand via-violet-500 to-cyan-500 bg-clip-text text-transparent">
              AI voice · Proof of concept
            </span>
          </div>

          <h1 className="fade-up fade-up-delay-1 mb-6 text-[2.75rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4rem]">
            <span className="text-gradient">Stemme-agenter</span>
            <br />
            <span className="text-kumo-default">der </span>
            <span className="text-gradient-accent italic">føles levende</span>
          </h1>

          <p className="fade-up fade-up-delay-2 mb-10 max-w-xl text-lg leading-relaxed text-kumo-inactive sm:text-xl">
            Giv kunderne en naturlig samtale — ikke en robot. Real-time AI på Cloudflare
            edge, klar til at skalere med jer.
          </p>

          <div className="fade-up fade-up-delay-3 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-kumo-brand to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-kumo-brand/30 transition hover:scale-[1.02] hover:shadow-kumo-brand/40 active:scale-[0.98]"
            >
              Book en demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#features"
              className="glass-panel inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-kumo-default transition hover:scale-[1.02] active:scale-[0.98]"
            >
              Udforsk platformen
            </a>
          </div>

          <dl className="fade-up fade-up-delay-4 mt-14 grid grid-cols-3 gap-6">
            {[
              { value: "24/7", label: "Tilgængelig", icon: Globe },
              { value: "<300ms", label: "Latency", icon: Zap },
              { value: "Edge", label: "Global", icon: Phone }
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="group">
                <Icon className="mb-2 h-4 w-4 text-kumo-brand/70 transition group-hover:text-kumo-brand" />
                <dt className="text-2xl font-extrabold tracking-tight text-kumo-default sm:text-3xl">
                  {value}
                </dt>
                <dd className="mt-0.5 text-xs font-medium text-kumo-inactive sm:text-sm">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <VoiceDemoCard />
      </div>
    </section>
  );
}

export function MarqueeSection() {
  return (
    <section className="overflow-hidden border-y border-kumo-line/60 bg-kumo-base/50 py-5">
      <div className="flex w-max animate-marquee gap-8">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-kumo-inactive"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-kumo-brand to-violet-500" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

const features = [
  {
    icon: Waves,
    title: "Naturlig stemme",
    description: "Real-time samtaler med lav latency — som et rigtigt opkald, ikke en chatbot.",
    accent: "from-cyan-500/20 to-kumo-brand/10",
    span: "lg:col-span-2 lg:row-span-1"
  },
  {
    icon: Headphones,
    title: "Kundeservice-ready",
    description: "Skalerbar infrastruktur der vokser med jeres volumen.",
    accent: "from-violet-500/20 to-kumo-brand/5",
    span: ""
  },
  {
    icon: TrendingUp,
    title: "Analytics",
    description: "Sessioner, samtaler og indsigt samlet ét sted.",
    accent: "from-emerald-500/15 to-kumo-brand/5",
    span: ""
  },
  {
    icon: Bot,
    title: "Intelligent agent",
    description: "Workers AI + Agents SDK med tools, scheduling og MCP-integration.",
    accent: "from-kumo-brand/20 to-violet-500/15",
    span: "lg:col-span-2"
  },
  {
    icon: Zap,
    title: "Edge-first",
    description: "Workers, D1 og Durable Objects — globalt fra dag ét.",
    accent: "from-amber-500/15 to-kumo-brand/5",
    span: ""
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-kumo-brand/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-kumo-brand">
            Platform
          </p>
          <h2 className="mb-5 text-4xl font-extrabold tracking-tight text-kumo-default sm:text-5xl">
            Alt I behøver —{" "}
            <span className="text-gradient-accent">ingen kompromiser</span>
          </h2>
          <p className="text-lg leading-relaxed text-kumo-inactive">
            React frontend, Cloudflare backend, D1 database og real-time voice pipeline i én
            samlet stack.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description, accent, span }) => (
            <article
              key={title}
              className={`card-shine group relative overflow-hidden rounded-3xl border border-kumo-line/60 bg-kumo-base/50 p-7 transition duration-500 hover:-translate-y-1.5 hover:border-kumo-brand/40 hover:shadow-2xl hover:shadow-kumo-brand/10 ${span}`}
            >
              <div
                className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${accent} blur-2xl transition group-hover:scale-125`}
              />
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-kumo-brand to-violet-600 text-white shadow-lg shadow-kumo-brand/25 transition group-hover:scale-110">
                  <Icon className="h-5 w-5" strokeWidth={2.25} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-kumo-default">{title}</h3>
                <p className="text-sm leading-relaxed text-kumo-inactive">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    step: "01",
    title: "Kunden ringer",
    description: "Voice input fanges og streames til agenten i real-time.",
    icon: Phone
  },
  {
    step: "02",
    title: "AI forstår",
    description: "Workers AI behandler samtalen med fuld kontekst og tools.",
    icon: Bot
  },
  {
    step: "03",
    title: "Naturligt svar",
    description: "TTS leverer et menneskeligt svar — hurtigt og præcist.",
    icon: Mic
  }
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-y border-kumo-line/50 bg-kumo-base/40 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-kumo-brand">
            Flow
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-kumo-default sm:text-5xl">
            Fra stemme til svar — på sekunder
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(({ step, title, description, icon: Icon }, index) => (
            <div
              key={step}
              className="glass-panel group relative rounded-3xl p-8 transition hover:border-kumo-brand/30 hover:shadow-xl hover:shadow-kumo-brand/5"
            >
              {index < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-kumo-brand/50 to-transparent md:block" />
              )}
              <div className="mb-6 flex items-center justify-between">
                <span className="text-3xl font-black text-kumo-brand/30">{step}</span>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-kumo-brand/10 text-kumo-brand transition group-hover:bg-kumo-brand group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="mb-2 text-lg font-bold text-kumo-default">{title}</h3>
              <p className="text-sm leading-relaxed text-kumo-inactive">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const perks = [
  "Gratis intro-samtale",
  "Skræddersyet demo",
  "Svar inden 24 timer",
  "Ingen binding"
];

export function ContactSection() {
  return (
    <section id="contact" className="relative py-28">
      <FloatingOrbs />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-kumo-brand">
              Kontakt
            </p>
            <h2 className="mb-5 text-4xl font-extrabold tracking-tight text-kumo-default sm:text-5xl">
              Lad os tage en{" "}
              <span className="text-gradient-accent">snak</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-kumo-inactive">
              Udfyld formularen — så vender vi tilbage med en demo skræddersyet til jeres
              use case. Ingen spam, ingen salgs-pres.
            </p>

            <ul className="mb-8 space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-sm text-kumo-default">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            <a
              href="mailto:larslarsen200303@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-kumo-brand hover:underline"
            >
              Eller skriv direkte til larslarsen200303@gmail.com
            </a>
          </div>

          <div className="gradient-border glass-panel rounded-3xl p-8 shadow-2xl shadow-kumo-brand/10">
            <h3 className="mb-1 text-lg font-bold text-kumo-default">Send en besked</h3>
            <p className="mb-6 text-sm text-kumo-inactive">
              Vi læser hver henvendelse personligt.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-kumo-line/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-kumo-brand to-violet-600 text-white">
            <Mic className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm text-kumo-inactive">
            © {new Date().getFullYear()} Voice Agent PoV
          </span>
        </div>
        <p className="text-xs font-medium text-kumo-inactive">
          React · Lucide · Cloudflare · Tailwind
        </p>
      </div>
    </footer>
  );
}
