import {
  ArrowLeft,
  LayoutGrid,
  type LucideIcon,
  Settings,
  UtensilsCrossed
} from "lucide-react";
import { restaurant } from "../../content/dashboard";

export type DashboardView = "orders" | "menu" | "settings";

export const navItems: {
  id: DashboardView;
  label: string;
  icon: LucideIcon;
}[] = [
  { id: "orders", label: "Ordrer", icon: LayoutGrid },
  { id: "menu", label: "Menu", icon: UtensilsCrossed },
  { id: "settings", label: "Indstillinger", icon: Settings }
];

export function DashboardSidebar({
  active,
  onSelect
}: {
  active: DashboardView;
  onSelect: (view: DashboardView) => void;
}) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-site-border bg-site-surface lg:flex">
      <div className="flex items-center gap-2.5 border-b border-site-border px-5 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-site-accent via-site-violet to-site-coral text-white">
          <span className="text-sm font-bold">R</span>
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-site-text">
            {restaurant.name}
          </p>
          <p className="text-xs text-site-muted">Respona Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              active === id
                ? "bg-site-accent/12 text-site-accent"
                : "text-site-muted hover:bg-site-bg hover:text-site-text"
            }`}
          >
            <Icon className="h-4.5 w-4.5" />
            {label}
          </button>
        ))}
      </nav>

      <div className="border-t border-site-border p-3">
        <a
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-site-muted transition hover:bg-site-bg hover:text-site-text"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
          Tilbage til sitet
        </a>
      </div>
    </aside>
  );
}
