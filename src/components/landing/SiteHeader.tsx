import { useCallback, useState } from "react";
import { Menu, Mic, Moon, Sun, X } from "lucide-react";

const links = [
  { href: "#features", label: "Funktioner" },
  { href: "#how-it-works", label: "Sådan virker det" },
  { href: "#contact", label: "Kontakt" }
];

export function SiteHeader() {
  const [dark, setDark] = useState(
    () => document.documentElement.getAttribute("data-mode") === "dark"
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = useCallback(() => {
    const next = !dark;
    setDark(next);
    const mode = next ? "dark" : "light";
    document.documentElement.setAttribute("data-mode", mode);
    document.documentElement.style.colorScheme = mode;
    localStorage.setItem("theme", mode);
  }, [dark]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-kumo-line/40 bg-kumo-base/60 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-kumo-brand to-violet-600 text-white shadow-lg shadow-kumo-brand/30 transition-transform group-hover:scale-105">
            <Mic className="h-4 w-4" strokeWidth={2.25} />
          </span>
          <span className="text-base font-bold tracking-tight text-kumo-default">
            Voice Agent
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-kumo-inactive transition-colors hover:text-kumo-brand"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Skift tema"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-kumo-line/60 bg-kumo-elevated/80 text-kumo-default transition hover:border-kumo-brand/30"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="#contact"
            className="hidden rounded-xl bg-gradient-to-r from-kumo-brand to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-kumo-brand/25 transition hover:brightness-110 sm:inline-flex"
          >
            Book demo
          </a>

          <button
            type="button"
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-kumo-line bg-kumo-elevated md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-kumo-line bg-kumo-base px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-kumo-inactive"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-1 inline-flex justify-center rounded-lg bg-kumo-brand px-4 py-2.5 text-sm font-medium text-white"
              onClick={() => setMenuOpen(false)}
            >
              Book demo
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
