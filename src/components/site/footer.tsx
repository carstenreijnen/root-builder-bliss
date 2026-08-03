import {
  Instagram,
  Facebook,
  Youtube,
  Send,
  ShieldCheck,
  CreditCard,
  BadgeCheck,
  Star,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Bitcoin,
} from "lucide-react";
import logo from "@/assets/logo.svg";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.71a8.16 8.16 0 0 0 4.77 1.52V6.79a4.85 4.85 0 0 1-1.84-.1Z" />
    </svg>
  );
}

const TRUST = [
  { icon: ShieldCheck, label: "USCG Licensed Captains" },
  { icon: CreditCard, label: "Secure Payments via Stripe" },
  { icon: BadgeCheck, label: "Verified Fleet" },
  { icon: Star, label: "4.9 Guest Rating" },
];

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
      { label: "DJ", href: "/add-ons/private-dj" },
      { label: "VIP Transport", href: "/add-ons/vip-transport" },
    ],
  },
  {
    title: "Help & Support",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Work With Us", href: "/work-with-us" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

const PAYMENTS = ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay"];

const SOCIALS = [
  { href: "https://instagram.com/royalyachtmiami", label: "Instagram", Icon: Instagram },
  { href: "https://www.facebook.com/RoyalYachtsMiami/", label: "Facebook", Icon: Facebook },
  { href: "https://www.youtube.com/@royalyachtsmiami", label: "YouTube", Icon: Youtube },
  { href: "https://www.tiktok.com/@royalyachtsmiami", label: "TikTok", Icon: TikTokIcon },
  { href: "https://t.me/royalyachtsmiami", label: "Telegram", Icon: Send },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-section-alt">
      {/* Pre-footer trust bar */}
      <div className="border-b border-border/60 bg-section-deep">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-6 px-5 py-8 md:grid-cols-4 md:px-10">
          {TRUST.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-3 text-center">
              <Icon className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} />
              <span className="font-teko text-[15px] font-bold uppercase tracking-[0.14em] text-foreground/85 md:text-base">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-5 pb-16 pt-20 md:grid-cols-12 md:gap-10 md:px-10 md:pt-24">
        <div className="md:col-span-4 md:pr-8">
          <img src={logo} alt="Royal Yachts Miami" className="h-24 w-auto md:h-28" loading="lazy" />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            The highest quality yacht charter company in Miami.
          </p>

          <ul className="mt-7 space-y-3 text-[15px] text-foreground/75">
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
            <li className="flex items-start gap-3 text-foreground/60">
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground/70 transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <h5 className="mb-6 font-teko text-lg font-bold uppercase tracking-[0.16em] text-gold">
              {col.title}
            </h5>
            <ul className="space-y-3.5 text-[15px] text-foreground/70">
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

      {/* Payments row */}
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-3 gap-y-3 px-5 py-6 md:px-10">
          {PAYMENTS.map((p) => (
            <span
              key={p}
              className="rounded-md border border-border bg-card px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-foreground/65"
            >
              {p}
            </span>
          ))}
          <span className="text-[11px] uppercase tracking-[0.14em] text-caption">Payments via Stripe</span>
          <span className="inline-flex items-center gap-2 rounded-md border border-gold/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-gold">
            <Bitcoin className="h-3.5 w-3.5" strokeWidth={1.25} /> Crypto accepted
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-7 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="text-xs leading-relaxed text-muted-foreground">
            © 2026 Royal Yachts Miami is a trade name of Experience Rental Group LLC · all rights reserved
          </p>
          <span className="flex items-center gap-2 font-teko text-[13px] uppercase tracking-[0.18em]">
            <a href="/" className="text-gold transition hover:opacity-80">EN</a>
            <span className="text-foreground/25">|</span>
            <a href="/es" className="text-foreground/55 transition hover:text-gold">ES</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
