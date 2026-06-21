import { ArrowRight } from "lucide-react";
import { brand } from "../../content/site";

export function CtaBand() {
  return (
    <section className="cta-band py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
          Klar til at prøve?
        </p>
        <h2 className="mx-auto mb-6 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {brand.tagline}
        </h2>
        <a href="#contact" className="btn-primary btn-on-dark inline-flex">
          Book en demo
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
