import {
  ArrowRight,
  Bot,
  Headphones,
  Mic,
  Sparkles,
  TrendingUp,
  Waves,
  Zap
} from "lucide-react";

const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function VoiceDemoCard() {
  return (
    <div className="animate-float relative mx-auto w-full max-w-md">
      <div className="absolute -inset-4 rounded-3xl bg-kumo-brand/15 blur-2xl animate-pulse-ring" />
      <div className="card-shine relative overflow-hidden rounded-3xl border border-kumo-line bg-kumo-base/90 p-6 shadow-2xl shadow-kumo-brand/10 backdrop-blur-sm">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-kumo-default">Live agent</span>
          </div>
          <span className="rounded-full bg-kumo-brand/10 px-2.5 py-1 text-xs font-medium text-kumo-brand">
            &lt; 300ms
          </span>
        </div>

        <div className="mb-6 flex h-28 items-end justify-center gap-1 rounded-2xl bg-kumo-elevated px-4 py-5">
          {bars.map((i) => (
            <div
              key={i}
              className="voice-bar w-1.5 rounded-full bg-gradient-to-t from-kumo-brand/40 to-kumo-brand"
              style={{
                animationDelay: `${i * 0.08}s`,
                height: `${30 + (i % 5) * 12}%`
              }}
            />
          ))}
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl rounded-tl-md bg-kumo-elevated px-4 py-3 text-sm text-kumo-inactive">
            Hej! Jeg er jeres voice agent — hvad kan jeg hjælpe med i dag?
          </div>
          <div className="ml-8 rounded-2xl rounded-tr-md bg-kumo-brand/15 px-4 py-3 text-sm text-kumo-default ring-1 ring-kumo-brand/20">
            Jeg vil gerne høre om jeres løsning til kundeservice.
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="hero-glow relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-10">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-kumo-brand/25 bg-kumo-brand/10 px-3 py-1.5 text-xs font-medium text-kumo-brand">
            <Sparkles className="h-3.5 w-3.5" />
            Proof of concept · React template
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">Stemme-agenter</span>
            <br />
            der føles menneskelige
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-kumo-inactive">
            AI-drevet kundekontakt med naturlig stemme, real-time svar og skalerbar
            infrastruktur på Cloudflare. Det her er jeres sneak peek.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-kumo-brand px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-kumo-brand/25 transition hover:brightness-110"
            >
              Book en demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl border border-kumo-line bg-kumo-base/80 px-5 py-3 text-sm font-medium text-kumo-default backdrop-blur transition hover:bg-kumo-elevated"
            >
              Se funktioner
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-kumo-line pt-8">
            {[
              { value: "24/7", label: "Tilgængelig" },
              { value: "<300ms", label: "Latency" },
              { value: "Edge", label: "Cloudflare" }
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-xl font-bold text-kumo-default sm:text-2xl">{stat.value}</dt>
                <dd className="mt-1 text-xs text-kumo-inactive sm:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <VoiceDemoCard />
      </div>
    </section>
  );
}

const features = [
  {
    icon: Waves,
    title: "Naturlig stemme",
    description:
      "Real-time samtaler med lav latency — designet til at føles som et rigtigt opkald.",
    className: "lg:col-span-2"
  },
  {
    icon: Headphones,
    title: "Klar til kundeservice",
    description: "Skalerbar infrastruktur — klar til produktion når I er.",
    className: ""
  },
  {
    icon: TrendingUp,
    title: "Indsigt & kontrol",
    description: "Sessioner, samtaler og analytics samlet ét sted.",
    className: ""
  },
  {
    icon: Bot,
    title: "Intelligent agent",
    description: "Workers AI + Agents SDK med tools, scheduling og MCP.",
    className: "lg:col-span-2"
  },
  {
    icon: Zap,
    title: "Edge-first",
    description: "Workers, D1 og Durable Objects — globalt fra dag ét.",
    className: ""
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-kumo-line bg-kumo-base py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-kumo-brand">
            Funktioner
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-kumo-default sm:text-4xl">
            Bygget til fremtidens kundekontakt
          </h2>
          <p className="text-lg text-kumo-inactive">
            React, Cloudflare Workers, D1 og real-time Agents SDK — alt i én stack.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description, className }) => (
            <article
              key={title}
              className={`card-shine group rounded-2xl border border-kumo-line bg-kumo-elevated/50 p-6 transition duration-300 hover:-translate-y-1 hover:border-kumo-brand/30 hover:shadow-xl hover:shadow-kumo-brand/5 ${className}`}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-kumo-brand/10 text-kumo-brand transition group-hover:bg-kumo-brand group-hover:text-white">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-kumo-default">{title}</h3>
              <p className="text-sm leading-relaxed text-kumo-inactive">{description}</p>
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
    description: "Voice input fanges og sendes til agenten i real-time."
  },
  {
    step: "02",
    title: "AI forstår & svarer",
    description: "Workers AI behandler samtalen med kontekst og tools."
  },
  {
    step: "03",
    title: "Naturligt svar",
    description: "TTS leverer et menneskeligt svar — hurtigt og præcist."
  }
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-kumo-brand">
            Sådan virker det
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-kumo-default sm:text-4xl">
            Fra stemme til svar på millisekunder
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map(({ step, title, description }, index) => (
            <div key={step} className="relative text-center md:text-left">
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-[calc(50%+2rem)] hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-kumo-brand/40 to-transparent md:block" />
              )}
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-kumo-brand/20 bg-kumo-brand/10 text-xl font-bold text-kumo-brand md:mx-0">
                {step}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-kumo-default">{title}</h3>
              <p className="text-sm leading-relaxed text-kumo-inactive">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section id="contact" className="pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-kumo-brand/20 bg-gradient-to-br from-kumo-brand/15 via-kumo-base to-kumo-elevated px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-kumo-brand/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-kumo-brand/10 blur-3xl" />

          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-kumo-default sm:text-4xl">
              Klar til at høre mere?
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-kumo-inactive">
              Produktnavn og fuld voice-demo kommer snart. Kontakt os for early access til
              platformen.
            </p>
            <a
              href="mailto:larslarsen200303@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl bg-kumo-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-kumo-brand/30 transition hover:brightness-110"
            >
              Kontakt os
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-kumo-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-kumo-inactive">
          <Mic className="h-4 w-4 text-kumo-brand" />
          <span>© {new Date().getFullYear()} Voice Agent PoV</span>
        </div>
        <p className="text-xs text-kumo-inactive">React · Lucide · Cloudflare · Tailwind</p>
      </div>
    </footer>
  );
}