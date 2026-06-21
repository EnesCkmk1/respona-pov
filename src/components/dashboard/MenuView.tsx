import { Plus } from "lucide-react";
import type { MenuItem } from "../../content/dashboard";
import { formatDkk } from "../../lib/format";

const categories: MenuItem["category"][] = [
  "Pizza",
  "Tilbehør",
  "Dessert",
  "Drikkevarer"
];

export function MenuView({
  menu,
  onToggle
}: {
  menu: MenuItem[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-site-muted">
          {menu.filter((m) => m.available).length} af {menu.length} retter er
          aktive
        </p>
        <button type="button" className="btn-ghost !py-2 !text-sm">
          <Plus className="h-4 w-4" />
          Tilføj ret
        </button>
      </div>

      {categories.map((cat) => {
        const items = menu.filter((m) => m.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat}>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-site-muted">
              {cat}
            </h3>
            <div className="overflow-hidden rounded-2xl border border-site-border bg-site-surface">
              <ul className="divide-y divide-site-border">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4 px-4 py-3.5"
                  >
                    <div>
                      <p
                        className={`font-medium ${item.available ? "text-site-text" : "text-site-muted line-through"}`}
                      >
                        {item.name}
                      </p>
                      <p className="text-sm text-site-muted">
                        {formatDkk(item.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={item.available}
                      aria-label={`${item.available ? "Deaktivér" : "Aktivér"} ${item.name}`}
                      onClick={() => onToggle(item.id)}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                        item.available ? "bg-site-teal" : "bg-site-border"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                          item.available ? "left-[1.375rem]" : "left-0.5"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
