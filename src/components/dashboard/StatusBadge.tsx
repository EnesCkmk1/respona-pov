import { orderStatusMeta, type OrderStatus } from "../../content/dashboard";

const toneClass: Record<string, string> = {
  indigo: "bg-site-accent/12 text-site-accent",
  coral: "bg-site-coral/12 text-site-coral",
  teal: "bg-site-teal/15 text-site-teal",
  muted: "bg-site-muted/12 text-site-muted"
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const meta = orderStatusMeta[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${toneClass[meta.tone]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {meta.label}
    </span>
  );
}
