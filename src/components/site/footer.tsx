import { useState } from "react";
import {
  Instagram,
  Facebook,
  Youtube,
  Send,
  ShieldCheck,
  BadgeCheck,
  Star,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Bitcoin,
  ArrowRight,
} from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import logo from "@/assets/logo.svg";
import oceanBg from "@/assets/footer-ocean.jpg";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.71a8.16 8.16 0 0 0 4.77 1.52V6.79a4.85 4.85 0 0 1-1.84-.1Z" />
    </svg>
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

function LangSwitch() {
  const { pathname } = useLocation();
  const isEs = pathname.startsWith("/es");
  return (
    <span className="flex items-center gap-2">
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

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Our Yachts", href: "/our-yachts" },
      { label: "About Us", href: "/about" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Packages",
    links: [
      { label: "Bachelorette", href: "/packages/bachelorette" },
      { label: "Birthday", href: "/packages/birthday" },
      { label: "Yacht Party", href: "/packages/yacht-party" },
      { label: "Corporate", href: "/packages/corporate" },
      { label: "Wedding", href: "/packages/wedding" },
      { label: "New Year's Eve", href: "/packages/new-years-eve" },
    ],
  },
  {
    title: "Add-ons",
    links: [
      { label: "Catering", href: "/add-ons/catering" },
      { label: "Watersports", href: "/add-ons/watersports" },
      { label: "Yacht Decoration", href: "/add-ons/yacht-decoration" },
      { label: "Private Chef", href: "/add-ons/private-chef" },
      { label: "Private DJ", href: "/add-ons/private-dj" },
      { label: "VIP Transport", href: "/add-ons/vip-transport" },
    ],
  },
  {
    title: "Help & Support",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Work With Us", href: "/work-with-us" },
      { label: "Blogs", href: "/blog" },
    ],
  },
];

const SOCIALS = [
  { href: "https://instagram.com/royalyachtmiami", label: "Instagram", Icon: Instagram },
  { href: "https://www.facebook.com/RoyalYachtsMiami/", label: "Facebook", Icon: Facebook },
  { href: "https://www.youtube.com/@royalyachtsmiami", label: "YouTube", Icon: Youtube },
  { href: "https://www.tiktok.com/@royalyachtsmiami", label: "TikTok", Icon: TikTokIcon },
  { href: "https://t.me/royalyachtsmiami", label: "Telegram", Icon: Send },
];

const PAYMENTS = ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay"];

function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="relative overflow-hidden border-b border-navy-foreground/10">
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gold/5 to-transparent" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-20">
          <div>
            <span className="mb-3 inline-block font-teko text-[13px] font-bold uppercase tracking-[0.18em] text-gold">
              Insider Access
            </span>
            <h2 className="font-teko text-4xl font-bold uppercase tracking-[0.1em] text-navy-foreground md:text-5xl lg:text-6xl">
              Stay on the Water
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-navy-foreground/70">
              Get first access to new yachts, seasonal offers and Miami charter guides.
            </p>
          </div>

          <div className="lg:pb-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-[52px] flex-1 rounded-full border border-navy-border bg-navy-foreground/5 px-6 text-[15px] text-navy-foreground placeholder:text-navy-foreground/40 outline-none ring-gold focus:border-gold/50 focus:ring-1"
              />
              <button
                type="submit"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-gold px-8 font-teko text-[15px] font-bold uppercase tracking-[0.14em] text-gold-foreground transition-all duration-300 hover:shadow-[0_8px_30px_rgba(186,163,108,0.35)]"
              >
                {status === "success" ? "Subscribed" : "Subscribe"}
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </form>
            <p className="mt-3 text-xs tracking-wide text-navy-foreground/45">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden text-navy-foreground">
      {/* Photographic base */}
      <img
        src={oceanBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1920}
        height={1280}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      {/* Navy gradient overlay: readable text, photo texture still showing */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--navy) 88%, transparent) 0%, color-mix(in oklab, var(--navy) 82%, transparent) 45%, color-mix(in oklab, var(--navy) 92%, transparent) 100%)",
        }}
      />

      <NewsletterBand />

      {/* Main footer */}
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-4 lg:pr-10">
            <img
              src={logo}
              alt="Royal Yachts Miami"
              className="h-24 w-auto md:h-32"
              loading="lazy"
            />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-navy-foreground/70">
              The highest quality yacht charter company in Miami.
            </p>

            <ul className="mt-8 space-y-3.5 text-[15px] text-navy-foreground/75">
              <li>
                <a
                  href="https://wa.me/16452399662"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 transition hover:text-gold"
                >
                  <MessageCircle className="h-4 w-4 text-gold" strokeWidth={1.25} /> WhatsApp +1 (645) 239-9662
                </a>
              </li>
              <li>
                <a href="tel:+16452149666" className="inline-flex items-center gap-3 transition hover:text-gold">
                  <Phone className="h-4 w-4 text-gold" strokeWidth={1.25} /> +1 (645) 214-9666
                </a>
              </li>
              <li>
                <a href="mailto:info@royalyachtsmiami.com" className="inline-flex items-center gap-3 transition hover:text-gold">
                  <Mail className="h-4 w-4 text-gold" strokeWidth={1.25} /> info@royalyachtsmiami.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-navy-foreground/60">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} />
                <span>333 SE 2nd Ave, Suite 2000, Miami, FL 33131</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy-border text-navy-foreground/70 transition-all duration-300 hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h5 className="mb-6 font-teko text-lg font-bold uppercase tracking-[0.16em] text-gold">
                {col.title}
              </h5>
              <ul className="space-y-3.5 text-[15px] text-navy-foreground/70">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="transition hover:text-gold">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Trust + payment strip */}
      <div className="border-y border-navy-foreground/10 bg-navy/40 backdrop-blur-[2px]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 px-5 py-10 md:grid-cols-2 md:px-10 md:py-12">
          <div className="flex flex-wrap items-center gap-4 md:gap-5 lg:gap-7">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-[18px] w-[18px] text-gold" strokeWidth={1.25} />
              <span className="font-teko text-[14px] font-bold uppercase tracking-[0.12em] text-navy-foreground/85">
                USCG Licensed Captains
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-[18px] w-[18px] text-gold" strokeWidth={1.25} />
              <span className="font-teko text-[14px] font-bold uppercase tracking-[0.12em] text-navy-foreground/85">
                Verified Fleet
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-[18px] w-[18px] text-gold" strokeWidth={1.25} />
              <span className="font-teko text-[14px] font-bold uppercase tracking-[0.12em] text-navy-foreground/85">
                4.9 Guest Rating
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            {PAYMENTS.map((p) => (
              <span
                key={p}
                className="rounded-md border border-navy-foreground/15 bg-navy-foreground/[0.06] px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-navy-foreground/70"
              >
                {p}
              </span>
            ))}
            <span className="text-[11px] uppercase tracking-[0.14em] text-navy-foreground/50">
              Payments via Stripe
            </span>
            <span className="inline-flex items-center gap-2 rounded-md border border-gold/30 bg-gold/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-gold">
              <Bitcoin className="h-3.5 w-3.5" strokeWidth={1.25} /> Crypto accepted
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-foreground/10 bg-navy/50">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="text-xs leading-relaxed text-navy-foreground/50">
            © 2026 Royal Yachts Miami is a trade name of Experience Rental Group LLC. All rights reserved.
          </p>
          <LangSwitch />
        </div>
      </div>
    </footer>
  );
}
