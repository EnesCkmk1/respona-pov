import { useState } from "react";
import { ArrowRight, Bot, Phone, TrendingUp, Wallet } from "lucide-react";
import {
  type Order,
  type OrderStatus,
  orderTotal
} from "../../content/dashboard";
import { formatDkk } from "../../lib/format";
import { StatusBadge } from "./StatusBadge";

const nextStatus: Record<OrderStatus, OrderStatus | null> = {
  new: "preparing",
  preparing: "ready",
  ready: "completed",
  completed: null
};

const nextLabel: Record<OrderStatus, string> = {
  new: "Start tilberedning",
  preparing: "Markér som klar",
  ready: "Markér afhentet",
  completed: "Afsluttet"
};

const filters: { id: OrderStatus | "all"; label: string }[] = [
  { id: "all", label: "Alle" },
  { id: "new", label: "Nye" },
  { id: "preparing", label: "I gang" },
  { id: "ready", label: "Klar" },
  { id: "completed", label: "Afhentet" }
];

function StatCard({
  icon: Icon,
  label,
  value,
  accent
}: {
  icon: typeof Bot;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-site-border bg-site-surface p-5">
      <div
        className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${accent}`}
      >
        <Icon className="h-4.5 w-4.5" />
      </div>
      <p className="text-2xl font-bold tracking-tight text-site-text">
        {value}
      </p>
      <p className="mt-1 text-xs text-site-muted">{label}</p>
    </div>
  );
}

export function OrdersView({
  orders,
  onAdvance
}: {
  orders: Order[];
  onAdvance: (id: string, status: OrderStatus) => void;
}) {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [selectedId, setSelectedId] = useState<string>(orders[0]?.id ?? "");

  const revenue = orders.reduce((sum, o) => sum + orderTotal(o.items), 0);
  const avg = orders.length ? Math.round(revenue / orders.length) : 0;
  const aiShare = orders.length
    ? Math.round(
        (orders.filter((o) => o.channel === "Telefon (AI)").length /
          orders.length) *
          100
      )
    : 0;

  const visible =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const selected = orders.find((o) => o.id === selectedId) ?? visible[0];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Phone}
          label="Ordrer i dag"
          value={String(orders.length)}
          accent="bg-site-accent/12 text-site-accent"
        />
        <StatCard
          icon={Wallet}
          label="Omsætning i dag"
          value={formatDkk(revenue)}
          accent="bg-site-teal/15 text-site-teal"
        />
        <StatCard
          icon={TrendingUp}
          label="Gns. ordreværdi"
          value={formatDkk(avg)}
          accent="bg-site-coral/12 text-site-coral"
        />
        <StatCard
          icon={Bot}
          label="Taget af AI-agent"
          value={`${aiShare}%`}
          accent="bg-site-violet/12 text-site-violet"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="rounded-2xl border border-site-border bg-site-surface">
          <div className="flex flex-wrap items-center gap-2 border-b border-site-border p-4">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  filter === f.id
                    ? "bg-site-accent text-white"
                    : "bg-site-bg text-site-muted hover:text-site-text"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <ul className="divide-y divide-site-border">
            {visible.map((o) => (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(o.id)}
                  className={`flex w-full items-center gap-4 px-4 py-3.5 text-left transition hover:bg-site-bg ${
                    selected?.id === o.id ? "bg-site-bg" : ""
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-site-text">
                        {o.ref}
                      </span>
                      <span className="truncate text-sm text-site-muted">
                        {o.customer}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-site-muted">
                      {o.items.length} varer · {o.placedAt} · {o.channel}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-site-text">
                    {formatDkk(orderTotal(o.items))}
                  </span>
                  <StatusBadge status={o.status} />
                </button>
              </li>
            ))}
            {visible.length === 0 && (
              <li className="px-4 py-10 text-center text-sm text-site-muted">
                Ingen ordrer i denne kategori.
              </li>
            )}
          </ul>
        </div>

        {selected && (
          <aside className="h-fit rounded-2xl border border-site-border bg-site-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-site-text">
                  {selected.ref}
                </p>
                <p className="text-sm text-site-muted">{selected.customer}</p>
              </div>
              <StatusBadge status={selected.status} />
            </div>

            <div className="mb-4 space-y-1.5 rounded-xl bg-site-bg p-3 text-sm">
              <div className="flex items-center gap-2 text-site-muted">
                <Phone className="h-3.5 w-3.5" />
                {selected.phone}
              </div>
              <div className="flex items-center gap-2 text-site-muted">
                <Bot className="h-3.5 w-3.5" />
                {selected.channel} · {selected.placedAt}
              </div>
            </div>

            <ul className="mb-4 space-y-2">
              {selected.items.map((item, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-site-text">
                    <span className="font-semibold">{item.qty}×</span>{" "}
                    {item.name}
                    {item.note && (
                      <span className="block text-xs text-site-coral">
                        {item.note}
                      </span>
                    )}
                  </span>
                  <span className="text-site-muted">
                    {formatDkk(item.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-site-border pt-3">
              <span className="text-sm font-medium text-site-muted">Total</span>
              <span className="text-lg font-bold text-site-text">
                {formatDkk(orderTotal(selected.items))}
              </span>
            </div>

            {nextStatus[selected.status] && (
              <button
                type="button"
                onClick={() =>
                  onAdvance(selected.id, nextStatus[selected.status]!)
                }
                className="btn-primary mt-4 w-full"
              >
                {nextLabel[selected.status]}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
