import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import logo from "@/assets/logo.svg";

const PACKAGES = [
  { label: "Bachelorette Party", href: "/packages/bachelorette" },
  { label: "Birthday Party", href: "/packages/birthday" },
  { label: "Yacht Party", href: "/packages/yacht-party" },
  { label: "Corporate Event", href: "/packages/corporate" },
  { label: "Romantic Dinner", href: "/packages/romantic-dinner" },
  { label: "Wedding", href: "/packages/wedding" },
  { label: "New Year's Eve", href: "/packages/new-years-eve" },
  { label: "All Packages", href: "/packages" },
];

const ADDONS = [
  { label: "Catering", href: "/add-ons/catering" },
  { label: "Watersports", href: "/add-ons/watersports" },
  { label: "Yacht Decoration", href: "/add-ons/yacht-decoration" },
  { label: "Private Chef", href: "/add-ons/private-chef" },
  { label: "Private DJ", href: "/add-ons/private-dj" },
  { label: "VIP Transport", href: "/add-ons/vip-transport" },
  { label: "All Add-ons", href: "/add-ons" },
];

const WHATSAPP = "https://wa.me/16452399662";

const linkClass =
  "font-teko text-[15px] font-bold uppercase tracking-[0.16em] text-foreground/80 transition-colors duration-300 hover:text-gold";

function Dropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className={`inline-flex items-center gap-1.5 ${linkClass}`} aria-expanded={open}>
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} strokeWidth={1.5} />
      </button>
      <div
        className={`absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4 transition-all duration-200 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-[16px] border border-gold/20 bg-card/95 p-2 shadow-luxe backdrop-blur-xl">
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className="block rounded-[10px] px-4 py-2.5 text-[14px] text-foreground/75 transition-colors duration-200 hover:bg-gold/10 hover:text-gold"
            >
              {it.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function USFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" fill="#B22234" rx="2" />
      <path d="M0 1.08h20M0 3.23h20M0 5.38h20M0 7.54h20M0 9.69h20M0 11.85h20" stroke="#fff" strokeWidth="1.08" />
      <rect width="8" height="7.54" fill="#3C3B6E" rx="1" />
      <g fill="#fff">
        <circle cx="1.6" cy="0.75" r="0.35" /><circle cx="4" cy="0.75" r="0.35" /><circle cx="6.4" cy="0.75" r="0.35" />
        <circle cx="2.8" cy="1.75" r="0.35" /><circle cx="5.2" cy="1.75" r="0.35" /><circle cx="7.6" cy="1.75" r="0.35" />
        <circle cx="1.6" cy="2.75" r="0.35" /><circle cx="4" cy="2.75" r="0.35" /><circle cx="6.4" cy="2.75" r="0.35" />
        <circle cx="2.8" cy="3.75" r="0.35" /><circle cx="5.2" cy="3.75" r="0.35" /><circle cx="7.6" cy="3.75" r="0.35" />
        <circle cx="1.6" cy="4.75" r="0.35" /><circle cx="4" cy="4.75" r="0.35" /><circle cx="6.4" cy="4.75" r="0.35" />
        <circle cx="2.8" cy="5.75" r="0.35" /><circle cx="5.2" cy="5.75" r="0.35" /><circle cx="7.6" cy="5.75" r="0.35" />
      </g>
    </svg>
  );
}

function SpainFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 14" aria-hidden="true">
      <rect width="20" height="14" fill="#AA151B" rx="2" />
      <rect y="3.5" width="20" height="7" fill="#F1BF00" />
      <rect y="10.5" width="20" height="3.5" fill="#AA151B" />
    </svg>
  );
}

function LangSwitch({ className = "" }: { className?: string }) {
  const { pathname } = useLocation();
  const isEs = pathname.startsWith("/es");
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <a
        href="/"
        aria-label="English"
        className={`inline-flex h-5 w-7 items-center justify-center rounded-[4px] border transition ${
          isEs
            ? "border-transparent opacity-55 hover:opacity-100"
            : "border-gold/60 opacity-100 shadow-[0_0_0_1px_rgba(186,163,108,0.35)]"
        }`}
      >
        <USFlag className="h-3.5 w-5 rounded-[3px]" />
      </a>
      <a
        href="/es"
        aria-label="Español"
        className={`inline-flex h-5 w-7 items-center justify-center rounded-[4px] border transition ${
          isEs
            ? "border-gold/60 opacity-100 shadow-[0_0_0_1px_rgba(186,163,108,0.35)]"
            : "border-transparent opacity-55 hover:opacity-100"
        }`}
      >
        <SpainFlag className="h-3.5 w-5 rounded-[3px]" />
      </a>
    </span>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? "border-b border-gold/15 bg-background/85 backdrop-blur-xl"
            : "bg-gradient-to-b from-background/70 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-3 md:px-8 md:py-4">
          <Link to="/" className="flex shrink-0 items-center" aria-label="Royal Yachts Miami">
            <img
              src={logo}
              alt="Royal Yachts Miami"
              className={`w-auto transition-all duration-300 ${scrolled ? "h-16 md:h-20" : "h-20 md:h-24"}`}
            />
          </Link>

          <nav className="hidden items-center gap-8 xl:flex">
            <a href="/our-yachts" className={linkClass}>Our Yachts</a>
            <Dropdown label="Packages" items={PACKAGES} />
            <Dropdown label="Add-ons" items={ADDONS} />
            <a href="/about" className={linkClass}>About</a>
            <a href="/contact" className={linkClass}>Contact</a>
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <LangSwitch className="hidden md:flex" />
            <span className="hidden h-5 w-px bg-foreground/15 md:block" />
            <ThemeToggle />
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-[50px] items-center justify-center rounded-full bg-gold px-7 font-teko text-[15px] font-bold uppercase tracking-[0.16em] text-gold-foreground transition-all duration-300 hover:shadow-[0_8px_30px_rgba(186,163,108,0.4)] md:inline-flex"
            >
              Book Now
            </a>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 text-foreground/80 transition hover:border-gold/60 hover:text-gold xl:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-background transition-all duration-300 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <img src={logo} alt="Royal Yachts Miami" className="h-20 w-auto" />
          <button
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 text-foreground/80 transition hover:border-gold/60 hover:text-gold"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" strokeWidth={1.25} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 pb-40 pt-6">
          {[
            { label: "Our Yachts", href: "/our-yachts" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block border-b border-border/60 py-4 font-teko text-2xl font-bold uppercase tracking-[0.12em] text-foreground/90 transition hover:text-gold"
            >
              {l.label}
            </a>
          ))}

          {[
            { title: "Packages", items: PACKAGES },
            { title: "Add-ons", items: ADDONS },
          ].map((group) => (
            <div key={group.title} className="border-b border-border/60 py-5">
              <p className="font-teko text-2xl font-bold uppercase tracking-[0.12em] text-gold">{group.title}</p>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
                {group.items.map((it) => (
                  <a key={it.href} href={it.href} className="text-[14px] text-foreground/70 transition hover:text-gold">
                    {it.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-6">
            <LangSwitch />
          </div>
        </nav>

        <div className="sticky bottom-0 border-t border-border bg-background/95 px-6 py-5 backdrop-blur-xl">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[50px] items-center justify-center rounded-full bg-gold font-teko text-base font-bold uppercase tracking-[0.16em] text-gold-foreground"
          >
            Book Now
          </a>
        </div>
      </div>
    </>
  );
}
