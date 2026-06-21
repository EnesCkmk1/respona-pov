import { useCallback, useState } from "react";
import { Menu, Mic, Moon, Sun, X } from "lucide-react";

const links = [
  { href: "#demo", label: "Demo" },
  { href: "#features", label: "Funktioner" },
  { href: "#faq", label: "FAQ" },
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
    <header className="sticky top-0 z-50 border-b border-site-border bg-site-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-site-accent text-white">
            <Mic className="h-4 w-4" strokeWidth={2.25} />
          </span>
          <span className="text-sm font-extrabold tracking-[0.18em] text-site-text">
            VOICE AGENT
          </span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-site-muted transition hover:text-site-text"
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
            className="flex h-9 w-9 items-center justify-center rounded-md border border-site-border text-site-muted transition hover:text-site-text"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a href="#contact" className="btn-secondary hidden sm:inline-flex">
            Book demo
          </a>

          <button
            type="button"
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-site-border md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-site-border bg-site-bg px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-site-muted"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary mt-1" onClick={() => setMenuOpen(false)}>
              Book demo
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
