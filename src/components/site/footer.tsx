import { Instagram, Facebook, Phone, MessageCircle } from "lucide-react";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.92a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.84-.31z" />
  </svg>
);

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl text-foreground">
            Royal <span className="text-gold">Yachts</span> Miami
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/60">
            Miami's premier private yacht charter experience. Cinematic, all-inclusive,
            unforgettable.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://instagram.com/royalyachtmiami"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground/60 transition hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/RoyalYachtsMiami/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground/60 transition hover:border-gold hover:text-gold"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.tiktok.com/@royalyachtsmiami"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground/60 transition hover:border-gold hover:text-gold"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Explore
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-foreground/70">
            <li><a href="/our-yachts" className="hover:text-gold">Yachts</a></li>
            <li><a href="/packages" className="hover:text-gold">Packages</a></li>
            <li><a href="/extras" className="hover:text-gold">Extras</a></li>
            <li><a href="/about" className="hover:text-gold">About</a></li>
            <li><a href="/contact" className="hover:text-gold">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-foreground/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold" />
              <a href="tel:+16452149666" className="hover:text-gold">+1 (645) 214-9666</a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-gold" />
              <a
                href="https://wa.me/message/RFM6OYLRLKO6M1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                WhatsApp
              </a>
            </li>
            <li className="pt-2 text-xs leading-relaxed text-foreground/50">
              333 SE 2nd Ave, Suite 2000<br />Miami, FL 33131
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-foreground/50 md:flex-row">
          <p>© 2026 Royal Yachts Miami. All rights reserved.</p>
          <p>Crafted with precision in Miami.</p>
        </div>
      </div>
    </footer>
  );
}
