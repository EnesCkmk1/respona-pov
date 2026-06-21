import { useCallback, useState } from "react";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { brand } from "../../content/site";

const links = [
  { href: "#stories", label: "Citater" },
  { href: "#how", label: "Sådan virker det" },
  { href: "#capabilities", label: "Platform" },
  { href: "#demo", label: "Demo" },
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
    <header className="sticky top-0 z-50 border-b border-site-border/80 bg-site-bg/85 backdrop-blur-lg">
      <div
        className="h-0.5 w-full bg-gradient-to-r from-site-accent via-site-violet to-site-coral"
        aria-hidden
      />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-site-accent via-site-violet to-site-coral text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-lg font-bold tracking-tight text-site-text">
            {brand.name}
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-site-muted transition hover:text-site-accent"
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
            className="flex h-9 w-9 items-center justify-center rounded-full border border-site-border text-site-muted transition hover:text-site-text"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="#contact"
            className="btn-primary hidden !py-2.5 !text-sm sm:inline-flex"
          >
            Tal med os
          </a>

          <button
            type="button"
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-site-border md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-site-border bg-site-bg px-6 py-5 md:hidden">
          <div className="flex flex-col gap-3">
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
            <a
              href="#contact"
              className="btn-primary mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Tal med os
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
