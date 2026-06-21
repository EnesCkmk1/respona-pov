import { Quote } from "lucide-react";
import { testimonials } from "../../content/site";

const accentBar: Record<(typeof testimonials)[number]["accent"], string> = {
  coral: "accent-bar-coral",
  teal: "accent-bar-teal",
  violet: "accent-bar-violet"
};

const avatarGradient: Record<(typeof testimonials)[number]["accent"], string> =
  {
    coral: "from-site-coral to-site-rose",
    teal: "from-site-teal to-site-accent",
    violet: "from-site-violet to-site-accent"
  };

export function TestimonialsSection() {
  return (
    <section
      id="stories"
      className="section-tint-warm border-y border-site-border py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-xl">
          <p className="site-label mb-3">Fra pilotkunder</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-site-text sm:text-4xl">
            Det siger teams der allerede har prøvet det
          </h2>
          <p className="mt-4 text-site-muted">
            Citater fra vores tidlige pilotforløb — ægte feedback, ikke
            stock-foto fluff.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map(
            ({ quote, name, role, company, initials, accent }) => (
              <figure
                key={name}
                className="testimonial-card flex overflow-hidden"
              >
                <div
                  className={`w-1 shrink-0 ${accentBar[accent]}`}
                  aria-hidden
                />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <Quote
                    className="mb-4 h-7 w-7 text-site-accent/30"
                    strokeWidth={1.5}
                  />
                  <blockquote className="flex-1 text-base leading-relaxed text-site-text">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-site-border pt-5">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarGradient[accent]} text-xs font-bold text-white`}
                    >
                      {initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-site-text">
                        {name}
                      </p>
                      <p className="text-xs text-site-muted">
                        {role} · {company}
                      </p>
                    </div>
                  </figcaption>
                </div>
              </figure>
            )
          )}
        </div>
      </div>
    </section>
  );
}
