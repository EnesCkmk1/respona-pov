import type { ReactNode } from "react";
import { Bot, Clock, Phone, Sparkles } from "lucide-react";
import { restaurant } from "../../content/dashboard";

const hours = [
  { day: "Mandag – Torsdag", time: "16:00 – 22:00" },
  { day: "Fredag – Lørdag", time: "16:00 – 23:00" },
  { day: "Søndag", time: "16:00 – 21:00" }
];

function Card({
  icon: Icon,
  title,
  children
}: {
  icon: typeof Bot;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-site-border bg-site-surface p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-site-accent/12 text-site-accent">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="font-bold text-site-text">{title}</h3>
      </div>
      {children}
    </section>
  );
}

export function SettingsView() {
  return (
    <div className="grid max-w-4xl gap-6 lg:grid-cols-2">
      <Card icon={Sparkles} title="Restaurantprofil">
        <div className="space-y-3 text-sm">
          <div>
            <p className="mb-1 text-xs text-site-muted">Navn</p>
            <p className="font-medium text-site-text">{restaurant.name}</p>
          </div>
          <div>
            <p className="mb-1 text-xs text-site-muted">Plan</p>
            <p className="font-medium text-site-text">{restaurant.plan}</p>
          </div>
        </div>
      </Card>

      <Card icon={Phone} title="Telefonnummer">
        <div className="space-y-3 text-sm">
          <div>
            <p className="mb-1 text-xs text-site-muted">AI-linje</p>
            <p className="font-medium text-site-text">{restaurant.phone}</p>
          </div>
          <p className="text-xs text-site-muted">
            Opkald til dette nummer besvares af jeres AI-agent.
          </p>
        </div>
      </Card>

      <Card icon={Bot} title="AI-agent">
        <div className="space-y-3 text-sm">
          <div>
            <p className="mb-1 text-xs text-site-muted">Navn på agent</p>
            <p className="font-medium text-site-text">{restaurant.agentName}</p>
          </div>
          <div>
            <p className="mb-1 text-xs text-site-muted">Tone</p>
            <p className="font-medium text-site-text">
              Venlig, effektiv, dansk
            </p>
          </div>
        </div>
      </Card>

      <Card icon={Clock} title="Åbningstider">
        <ul className="space-y-2 text-sm">
          {hours.map((h) => (
            <li key={h.day} className="flex justify-between">
              <span className="text-site-muted">{h.day}</span>
              <span className="font-medium text-site-text">{h.time}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
