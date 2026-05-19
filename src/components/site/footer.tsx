import { Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo.svg";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.71a8.16 8.16 0 0 0 4.77 1.52V6.79a4.85 4.85 0 0 1-1.84-.1Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-section-alt px-5 pb-12 pt-20 md:px-10 md:pt-24">
      <div className="mx-auto mb-14 flex max-w-[1400px] justify-center">
        <img src={logo} alt="Royal Yachts Miami" className="h-16 w-auto md:h-20" />
      </div>
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <p className="mb-8 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            Miami's premier private yacht charter experience. All-inclusive luxury on the water — every detail handled.
          </p>
          <div className="mb-5 flex items-baseline gap-2">
            <span className="font-display text-3xl font-semibold tracking-tight text-foreground">Royal</span>
            <span className="font-display text-3xl font-semibold tracking-tight text-gold">Yachts</span>
          </div>
          <p className="mb-8 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            Miami's premier private yacht charter experience. All-inclusive luxury on the water — every detail handled.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com/royalyachtmiami" target="_blank" rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground/70 transition-all duration-300 hover:border-gold hover:text-gold" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.facebook.com/RoyalYachtsMiami/" target="_blank" rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground/70 transition-all duration-300 hover:border-gold hover:text-gold" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://www.tiktok.com/@royalyachtsmiami" target="_blank" rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground/70 transition-all duration-300 hover:border-gold hover:text-gold" aria-label="TikTok">
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h5 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Navigation</h5>
          <ul className="space-y-3 text-[15px] text-foreground/70">
            <li><a href="/our-yachts" className="transition hover:text-gold">Our Fleet</a></li>
            <li><a href="/packages" className="transition hover:text-gold">Experiences</a></li>
            <li><a href="/about" className="transition hover:text-gold">About</a></li>
            <li><a href="/contact" className="transition hover:text-gold">Contact</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h5 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Help &amp; Support</h5>
          <ul className="space-y-3 text-[15px] text-foreground/70">
            <li><a href="/faq" className="transition hover:text-gold">FAQ</a></li>
            <li><a href="/cancellation" className="transition hover:text-gold">Cancellation Policy</a></li>
            <li><a href="/privacy" className="transition hover:text-gold">Privacy Policy</a></li>
            <li><a href="/terms" className="transition hover:text-gold">Terms &amp; Conditions</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h5 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Get In Touch</h5>
          <ul className="space-y-3 text-[15px] text-foreground/70">
            <li><a href="tel:+16452149666" className="transition hover:text-gold">+1 (645) 214-9666</a></li>
            <li><a href="https://wa.me/16452149666" target="_blank" rel="noopener noreferrer" className="transition hover:text-gold">WhatsApp</a></li>
            <li className="leading-relaxed text-foreground/60">333 SE 2nd Ave, Suite 2000<br />Miami, FL 33131</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1400px]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <p className="mt-6 text-center text-xs text-muted-foreground">
          © 2026 Royal Yachts Miami — All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
