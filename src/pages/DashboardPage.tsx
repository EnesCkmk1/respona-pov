import { useCallback, useState } from "react";
import { Moon, Sun } from "lucide-react";
import {
  menu as initialMenu,
  orders as initialOrders,
  restaurant,
  type OrderStatus
} from "../content/dashboard";
import {
  DashboardSidebar,
  type DashboardView,
  navItems
} from "../components/dashboard/DashboardSidebar";
import { OrdersView } from "../components/dashboard/OrdersView";
import { MenuView } from "../components/dashboard/MenuView";
import { SettingsView } from "../components/dashboard/SettingsView";

const viewTitles: Record<DashboardView, string> = {
  orders: "Ordrer",
  menu: "Menu",
  settings: "Indstillinger"
};

export default function DashboardPage() {
  const [view, setView] = useState<DashboardView>("orders");
  const [orders, setOrders] = useState(initialOrders);
  const [menu, setMenu] = useState(initialMenu);
  const [dark, setDark] = useState(
    () => document.documentElement.getAttribute("data-mode") === "dark"
  );

  const toggleTheme = useCallback(() => {
    const next = !dark;
    setDark(next);
    const mode = next ? "dark" : "light";
    document.documentElement.setAttribute("data-mode", mode);
    document.documentElement.style.colorScheme = mode;
    localStorage.setItem("theme", mode);
  }, [dark]);

  const advanceOrder = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  const toggleMenuItem = useCallback((id: string) => {
    setMenu((prev) =>
      prev.map((m) => (m.id === id ? { ...m, available: !m.available } : m))
    );
  }, []);

  return (
    <div className="flex min-h-screen bg-site-bg text-site-text antialiased">
      <DashboardSidebar active={view} onSelect={setView} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-site-border bg-site-bg/85 backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-5 py-3.5">
            <div>
              <h1 className="text-lg font-bold tracking-tight text-site-text">
                {viewTitles[view]}
              </h1>
              <p className="hidden text-xs text-site-muted sm:block">
                {restaurant.name} · AI-agent {restaurant.agentName} aktiv
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-2 rounded-full border border-site-border px-3 py-1.5 text-xs font-semibold text-site-teal sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-site-teal" />
                Agent aktiv
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Skift tema"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-site-border text-site-muted transition hover:text-site-text"
              >
                {dark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <nav className="flex gap-1 overflow-x-auto border-t border-site-border px-3 py-2 lg:hidden">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  view === id
                    ? "bg-site-accent text-white"
                    : "bg-site-surface text-site-muted"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </nav>
        </header>

        <main className="flex-1 p-5 sm:p-6 lg:p-8">
          {view === "orders" && (
            <OrdersView orders={orders} onAdvance={advanceOrder} />
          )}
          {view === "menu" && (
            <MenuView menu={menu} onToggle={toggleMenuItem} />
          )}
          {view === "settings" && <SettingsView />}
        </main>
      </div>
    </div>
  );
}
