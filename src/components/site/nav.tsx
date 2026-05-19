import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
  { href: "/our-yachts", label: "The Fleet" },
  { href: "/packages", label: "Experiences" },
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/60 backdrop-blur-xl border-b border-gold/10"
          : "bg-gradient-to-b from-background/60 to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-6 md:px-10 md:py-7">
        <Link to="/" className="flex items-center gap-3">
          <span className="font-display text-3xl font-bold uppercase tracking-[0.18em] text-foreground">
            Royal
          </span>
          <span className="font-display text-3xl font-bold uppercase tracking-[0.18em] text-gold">
            Yachts
          </span>
        </Link>

        <nav className="hidden items-center gap-14 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium uppercase tracking-[0.25em] text-foreground/80 transition-colors duration-300 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-3 border-r border-foreground/20 pr-6 text-xs uppercase tracking-[0.3em] text-gold md:flex">
            <button className="text-gold">EN</button>
            <span className="opacity-40">/</span>
            <a href="/es" className="text-foreground/50 transition hover:text-gold">ES</a>
          </div>
          <ThemeToggle />
          <a
            href="https://wa.me/16452149666"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-3 border border-gold px-7 py-3 text-xs font-medium uppercase tracking-[0.2em] text-gold transition-all duration-500 hover:bg-gold hover:text-gold-foreground md:inline-flex"
          >
            Book via WhatsApp
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center border border-foreground/20 text-foreground/80 lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gold/10 bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1 px-6 py-6">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-2 py-4 text-sm font-medium uppercase tracking-[0.25em] text-foreground/80 transition hover:text-gold"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/16452149666"
              className="mt-4 inline-flex items-center justify-center border border-gold px-4 py-4 text-xs font-medium uppercase tracking-[0.2em] text-gold"
            >
              Book via WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
