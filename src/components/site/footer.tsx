export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/5 bg-background px-6 pb-16 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
        <div className="md:col-span-4">
          <div className="mb-8 flex items-center gap-3">
            <span className="font-display text-4xl font-bold uppercase tracking-[0.18em] text-foreground">
              Royal
            </span>
            <span className="font-display text-4xl font-bold uppercase tracking-[0.18em] text-gold">
              Yachts
            </span>
          </div>
          <p className="mb-10 max-w-sm text-lg uppercase leading-relaxed tracking-wide text-foreground/40">
            Miami's premier private yacht charter experience. Cinematic, all-inclusive, and unforgettable.
          </p>
          <div className="flex gap-8">
            <a
              href="https://instagram.com/royalyachtmiami"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/40 transition-colors hover:text-gold"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@royalyachtsmiami"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/40 transition-colors hover:text-gold"
            >
              TikTok
            </a>
            <a
              href="https://www.facebook.com/RoyalYachtsMiami/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/40 transition-colors hover:text-gold"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h5 className="mb-10 text-sm font-bold uppercase tracking-[0.4em] text-gold">
            Explore
          </h5>
          <ul className="space-y-5 text-lg uppercase tracking-[0.2em] text-foreground/60">
            <li><a href="/our-yachts" className="transition hover:text-gold">Our Fleet</a></li>
            <li><a href="/packages" className="transition hover:text-gold">Packages</a></li>
            <li><a href="/packages" className="transition hover:text-gold">Experiences</a></li>
            <li><a href="/contact" className="transition hover:text-gold">Concierge</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h5 className="mb-10 text-sm font-bold uppercase tracking-[0.4em] text-gold">
            Contact Us
          </h5>
          <ul className="space-y-5 text-lg uppercase tracking-[0.2em] text-foreground/60">
            <li>
              <a href="tel:+16452149666" className="transition hover:text-gold">
                +1 (645) 214-9666
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/16452149666"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-gold"
              >
                Book via WhatsApp
              </a>
            </li>
            <li className="leading-relaxed">
              333 SE 2nd Ave, Suite 2000<br />Miami, FL 33131
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h5 className="mb-10 text-sm font-bold uppercase tracking-[0.4em] text-gold">
            Newsletter
          </h5>
          <p className="mb-6 text-sm uppercase tracking-[0.15em] text-foreground/40">
            Exclusive offers directly to your inbox.
          </p>
          <form className="relative">
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full border-b border-foreground/20 bg-transparent py-4 uppercase tracking-[0.3em] text-foreground outline-none transition-all focus:border-gold"
            />
            <button
              type="submit"
              className="absolute right-0 top-4 text-sm font-bold tracking-[0.2em] text-gold transition-transform hover:translate-x-1"
              aria-label="Subscribe"
            >
              →
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-32 flex max-w-[1500px] flex-col items-center justify-between gap-8 border-t border-foreground/5 pt-12 text-[10px] uppercase tracking-[0.3em] text-foreground/30 md:flex-row">
        <p>© 2026 Royal Yachts Miami. All Rights Reserved.</p>
        <div className="flex gap-12">
          <a href="/privacy" className="transition hover:text-foreground">Privacy Policy</a>
          <a href="/terms" className="transition hover:text-foreground">Terms &amp; Conditions</a>
          <a href="/cancellation" className="transition hover:text-foreground">Cancellation Policy</a>
        </div>
      </div>
    </footer>
  );
}
