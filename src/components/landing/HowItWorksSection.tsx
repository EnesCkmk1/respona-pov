import { ArrowRight } from "lucide-react";
import { howItWorks } from "../../content/site";

const stepAccent = {
  indigo: "step-indigo",
  coral: "step-coral",
  teal: "step-teal"
};

export function HowItWorksSection() {
  return (
    <section id="how" className="relative overflow-hidden py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-40"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-xl">
          <p className="site-label mb-3">Sådan virker det</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-site-text sm:text-4xl">
            Fra idé til live agent — uden måneders roadmap
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {howItWorks.map(({ step, title, description, accent }, i) => (
            <article
              key={step}
              className={`step-card ${stepAccent[accent]} group relative overflow-hidden rounded-2xl border p-8 transition-colors duration-300`}
            >
              <span className="step-number">{step}</span>
              <h3 className="mb-3 mt-6 text-xl font-bold text-site-text">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-site-muted">
                {description}
              </p>
              {i < howItWorks.length - 1 && (
                <ArrowRight
                  className="absolute right-6 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-site-muted/30 lg:block"
                  aria-hidden
                />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
