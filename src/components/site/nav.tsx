import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import logo from "@/assets/logo.svg";

const LINKS = [
  { href: "/our-yachts", label: "Fleet" },
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-gold/10"
          : "bg-gradient-to-b from-background/70 to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8 md:py-5">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-[26px]">
            Royal
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight text-gold md:text-[26px]">
            Yachts
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium uppercase tracking-[0.15em] text-foreground/75 transition-colors duration-300 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <ThemeToggle />
          <a
            href="https://wa.me/16452149666"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center justify-center rounded-full bg-gold px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-gold-foreground transition-all duration-300 hover:opacity-90 hover:shadow-[0_4px_24px_rgba(186,163,108,0.35)] md:inline-flex"
          >
            Book Now
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground/80 transition hover:border-gold/50 hover:text-gold lg:hidden"
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
                className="px-2 py-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground/80 transition hover:text-gold"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/16452149666"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-gold-foreground"
            >
              Book via WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
