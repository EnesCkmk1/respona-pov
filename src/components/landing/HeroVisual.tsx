import { Phone, Radio } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="hero-visual relative mx-auto aspect-square max-w-sm sm:max-w-md lg:max-w-none">
      <div className="hero-ring hero-ring-1" aria-hidden />
      <div className="hero-ring hero-ring-2" aria-hidden />
      <div className="hero-ring hero-ring-3" aria-hidden />

      <div className="hero-orb-wrap">
        <div className="hero-orb">
          <div className="hero-orb-inner">
            <div className="flex h-12 items-end justify-center gap-1 pb-1">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="hero-orb-bar w-1 rounded-full bg-white/90"
                  style={{ animationDelay: `${i * 0.07}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hero-float-card hero-float-card-top">
        <span className="hero-float-icon hero-float-icon-live">
          <span className="live-dot live-dot-sm" aria-hidden />
        </span>
        <span className="hero-float-copy">
          <span className="hero-float-label">Status</span>
          <span className="hero-float-value">Live agent</span>
        </span>
      </div>

      <div className="hero-float-card hero-float-card-right">
        <span className="hero-float-icon hero-float-icon-teal">
          <Radio className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
        <span className="hero-float-copy">
          <span className="hero-float-label">Svartid</span>
          <span className="hero-float-value hero-float-value-teal">284 ms</span>
        </span>
      </div>

      <div className="hero-float-card hero-float-card-bottom">
        <span className="hero-float-icon hero-float-icon-violet">
          <Phone className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
        <span className="hero-float-copy">
          <span className="hero-float-label">Kanal</span>
          <span className="hero-float-value">Indgående opkald</span>
        </span>
      </div>
    </div>
  );
}
