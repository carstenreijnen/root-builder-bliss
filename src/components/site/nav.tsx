import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircle, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
  { href: "/our-yachts", label: "Yachts" },
  { href: "/packages", label: "Packages" },
  { href: "/extras", label: "Extras" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-foreground/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-medium tracking-wide text-foreground">
            Royal <span className="text-gold">Yachts</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium uppercase tracking-[0.15em] text-foreground/75 transition hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 text-xs uppercase tracking-widest text-foreground/60 md:flex">
            <button className="px-1 text-gold">EN</button>
            <span className="opacity-30">/</span>
            <a href="/es" className="px-1 transition hover:text-gold">ES</a>
          </div>
          <ThemeToggle />
          <a
            href="https://wa.me/16452149666"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-sm border border-gold/60 bg-gold/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-gold-foreground md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            Book on WhatsApp
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-foreground/15 text-foreground/70 lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-foreground/10 bg-background/95 backdrop-blur-md lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-sm px-2 py-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground/80 transition hover:text-gold"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/16452149666"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm border border-gold/60 bg-gold/10 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-gold"
            >
              <MessageCircle className="h-4 w-4" /> Book on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
