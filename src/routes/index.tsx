import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Minus, Star, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { InquiryForm } from "@/components/site/inquiry-form";
import heroImg from "@/assets/hero-yacht.jpg";
import bookingSide from "@/assets/booking-side.jpg";
import aboutImg from "@/assets/about-yacht.jpg";
import expBachelorette from "@/assets/exp-bachelorette.jpg";
import expBirthday from "@/assets/exp-birthday.jpg";
import expRomantic from "@/assets/exp-romantic.jpg";
import expCorporate from "@/assets/exp-corporate.jpg";

const FAQS = [
  {
    q: "What time should I arrive?",
    a: "We recommend arriving at least 15 minutes before your scheduled departure. If you have arranged decorations, catering, or any special setup, arriving 30 minutes early ensures everything is ready and your charter departs on time.",
  },
  {
    q: "How do I choose the right yacht?",
    a: "Our dedicated Charter Specialists personally guide every client through the selection process — taking into account your group size, occasion, preferred atmosphere, and budget. Contact us via WhatsApp and we will match you with the perfect vessel.",
  },
  {
    q: "Can I bring my own food and drinks?",
    a: "Absolutely. Outside food and beverages are always welcome on board. We can also arrange professional catering, a private chef, a bartender, and full provisioning — simply let us know during the booking process.",
  },
  {
    q: "Will I receive a reminder before my charter?",
    a: "Yes. The day before your charter, you will receive detailed boarding instructions, the exact meeting point, arrival guidance, and any important reminders to ensure a seamless experience from the moment you arrive.",
  },
  {
    q: "How far in advance should I book?",
    a: "Booking in advance is strongly recommended. Miami peak season runs from November through March, and popular yachts book out 3 to 4 weeks ahead. For holidays, New Year's Eve, and special events, we recommend booking 6 to 8 weeks in advance.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Cash, Cryptocurrency, PayPal, Venmo, Zelle, CashApp, Wire Transfer, Visa, MasterCard, and American Express. We are one of the few charter companies in Miami to fully accept crypto payments.",
  },
  {
    q: "How many guests can come on board?",
    a: "All private yacht charters in Miami are legally limited to a maximum of 13 guests, excluding crew members. This is a U.S. Coast Guard regulation that applies to all charter vessels operating in Miami waters. Our Charter Specialists can help you find the right yacht configuration for your group.",
  },
];

const TRUST_BAR = [
  "65+ Private Yachts",
  "Rated 4.9★ on Google",
  "Taxes & Gratuity Included",
  "Max 13 Guests · USCG",
  "Crypto Payments Accepted",
];

const EXPERIENCES = [
  { title: "Bachelorette Party", image: expBachelorette, href: "/packages/bachelorette-party" },
  { title: "Birthday Celebration", image: expBirthday, href: "/packages/birthday-party" },
  { title: "Romantic Dinner", image: expRomantic, href: "/packages/yacht-dinner" },
  { title: "Corporate Events", image: expCorporate, href: "/packages/corporate" },
];

type Yacht = {
  id: string;
  slug_en: string;
  name: string;
  size_ft: number | null;
  capacity: number | null;
  price_4h: number | null;
  hero_image: string | null;
};

type Testimonial = {
  id: string;
  name: string;
  body_en: string | null;
  rating: number | null;
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yacht Rental Miami | Luxury Private Yacht Charters | Royal Yachts Miami" },
      { name: "description", content: "Royal Yachts Miami offers luxury private yacht charters in Miami. 65+ yachts from 38ft to 120ft. All-inclusive pricing — taxes & gratuity included. Book via WhatsApp." },
      { property: "og:title", content: "Royal Yachts Miami — Luxury Private Yacht Charters" },
      { property: "og:description", content: "65+ yachts from 38ft to 120ft. All-inclusive pricing. Book via WhatsApp." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://royalyachtsmiami.com" },
      { property: "og:image", content: "https://royalyachtsmiami.com/og-cover.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://royalyachtsmiami.com" },
      { rel: "alternate", hrefLang: "en", href: "https://royalyachtsmiami.com" },
      { rel: "alternate", hrefLang: "es", href: "https://royalyachtsmiami.com/es" },
      { rel: "alternate", hrefLang: "x-default", href: "https://royalyachtsmiami.com" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Royal Yachts Miami",
          url: "https://royalyachtsmiami.com",
          telephone: "+16452149666",
          priceRange: "$$$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "333 SE 2nd Ave Suite 2000",
            addressLocality: "Miami",
            addressRegion: "FL",
            postalCode: "33131",
            addressCountry: "US",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [yachts, setYachts] = useState<Yacht[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    supabase
      .from("yachts")
      .select("id, slug_en, name, size_ft, capacity, price_4h, hero_image")
      .eq("active", true)
      .eq("featured", true)
      .order("sort_order")
      .limit(6)
      .then(({ data }) => data && setYachts(data));

    supabase
      .from("testimonials")
      .select("id, name, body_en, rating")
      .eq("active", true)
      .order("sort_order")
      .limit(3)
      .then(({ data }) => data && setTestimonials(data));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* HERO */}
      <section className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Luxury yacht at sunset off Miami"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-10">
          <div className="max-w-3xl">
            {/* SEO H1 — visually hidden, read by Google */}
            <h1 className="sr-only">Luxury Yacht Rental Miami — Private Charter Experiences</h1>

            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              Miami Luxury Yacht Charters
            </span>
            {/* Visible display headline (brand voice) */}
            <p className="mt-5 font-display text-[36px] font-semibold leading-[1.05] text-white md:text-[52px] lg:text-[56px]">
              Your Moment. <br className="hidden sm:block" />
              <span className="italic text-gold">Our Signature</span> Experience.
            </p>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/75 md:text-base">
              Private yacht charters from 38ft to 120ft — taxes, gratuity &amp; crew always included.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="/our-yachts"
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-gold-foreground transition-all duration-300 hover:opacity-90 hover:shadow-[0_8px_32px_rgba(186,163,108,0.4)]"
              >
                Explore Our Fleet
              </a>
              <a
                href="https://wa.me/16452149666"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/5 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-background"
              >
                Book via WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-5 z-10 flex flex-wrap items-center gap-3 md:bottom-8 md:left-10 md:gap-4">
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 backdrop-blur-md">
            <svg className="h-3.5 w-3.5 text-[#00aa6c]" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/85">TripAdvisor</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            <span className="text-[11px] font-semibold tracking-wide text-white/90">4.9 on Google</span>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-foreground/8 bg-section-alt">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-6 gap-y-3 px-5 py-5 text-center md:gap-x-10 md:px-10 md:py-6">
          {TRUST_BAR.map((t, i) => (
            <div key={t} className="flex items-center gap-3 md:gap-5">
              {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-gold md:block" />}
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {t}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FLEET */}
      <section className="bg-section-alt py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mb-3 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">The Fleet</span>
          </div>
          <h2 className="mx-auto max-w-3xl text-center font-display text-[28px] font-semibold leading-tight text-foreground md:text-[42px]">
            Most Booked Yachts in Miami
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[14px] leading-relaxed text-muted-foreground md:text-[15px]">
            All private charters are limited to 13 guests maximum per U.S. Coast Guard regulations, crew not included.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
            {yachts.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-card" />
                ))
              : yachts.map((y) => <YachtCard key={y.id} y={y} />)}
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="/our-yachts"
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-gold transition-all duration-300 hover:bg-gold hover:text-gold-foreground"
            >
              View Full Fleet <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mb-3 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Occasions</span>
          </div>
          <h2 className="text-center font-display text-[28px] font-semibold leading-tight text-foreground md:text-[42px]">
            Curated Charter Experiences
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-7">
            {EXPERIENCES.map((e) => (
              <a
                key={e.title}
                href={e.href}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)] transition-all duration-300 hover:border-gold/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
              >
                <img
                  src={e.image}
                  alt={e.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3 className="font-display text-2xl font-semibold text-white md:text-[28px]">
                    {e.title}
                  </h3>
                  <p className="mt-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Discover <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-section-deep py-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-[24px] shadow-[var(--shadow-luxe)]">
            <img
              src={aboutImg}
              alt="Royal Yachts Miami fleet"
              width={1280}
              height={1600}
              loading="lazy"
              className="h-[420px] w-full object-cover md:h-[560px]"
            />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">About</span>
            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-foreground md:text-[42px]">
              Where the Sea Meets Luxury
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-[1.75] text-muted-foreground">
              Royal Yachts Miami has been crafting unforgettable private charter experiences since 2018. With a fleet of 65+ vessels and a passionate local team, we deliver the Miami luxury lifestyle — on the water.
            </p>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
              {[
                { stat: "65+", label: "Yachts" },
                { stat: "2018", label: "Since" },
                { stat: "5★", label: "Rated" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
                  <div className="font-display text-2xl font-semibold text-gold md:text-3xl">{s.stat}</div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <a
              href="/our-yachts"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-gold-foreground transition-all duration-300 hover:opacity-90 hover:shadow-[0_8px_32px_rgba(186,163,108,0.35)]"
            >
              Meet Our Fleet
            </a>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-section-alt py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mb-3 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Reputation</span>
          </div>
          <h2 className="mx-auto max-w-3xl text-center font-display text-[28px] font-semibold leading-tight text-foreground md:text-[42px]">
            Trusted by Thousands of Guests in Miami
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { stat: "5,000+", label: "Guests Hosted" },
              { stat: "4.9★", label: "Average Rating" },
              { stat: "Top Tier", label: "Miami Charter Company" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]"
              >
                <div className="font-display text-[44px] font-semibold leading-none text-gold md:text-[52px]">
                  {s.stat}
                </div>
                <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {testimonials.length > 0 && (
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <figure
                  key={t.id}
                  className="relative rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-gold/40"
                >
                  <span className="absolute right-6 top-2 font-display text-[80px] leading-none text-gold/30">
                    "
                  </span>
                  <div className="flex gap-1 text-gold">
                    {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-[15px] leading-relaxed text-foreground/80">
                    {t.body_en}
                  </blockquote>
                  <figcaption className="mt-6 text-[12px] font-semibold uppercase tracking-[0.15em] text-gold">
                    — {t.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BOOKING + IMAGE SPLIT */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Inquire</span>
            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-foreground md:text-[38px]">
              Reserve Your Charter
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Tell us about your day on the water — our concierge replies within minutes.
            </p>
            <div className="mt-8">
              <InquiryForm />
            </div>
          </div>
          <div className="order-1 hidden lg:order-2 lg:block">
            <div className="sticky top-28 overflow-hidden rounded-[24px] shadow-[var(--shadow-luxe)]">
              <img
                src={bookingSide}
                alt="Miami yacht lifestyle"
                width={1024}
                height={1536}
                loading="lazy"
                className="h-[720px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-section-deep py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mb-3 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">FAQ</span>
          </div>
          <h2 className="text-center font-display text-[28px] font-semibold leading-tight text-foreground md:text-[42px]">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {FAQS.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function YachtCard({ y }: { y: Yacht }) {
  const displayName = `Royal ${y.name}${y.size_ft ? ` | ${y.size_ft}FT` : ""}`.toUpperCase();
  const whatsappUrl = `https://wa.me/16452149666?text=${encodeURIComponent(
    `Hi, I'd like to book ${y.name}`,
  )}`;
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/8 bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:border-gold/40 hover:shadow-[0_12px_40px_rgba(186,163,108,0.15)]">
      <a
        href={`/our-yachts/${y.slug_en}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        {y.hero_image ? (
          <img
            src={y.hero_image}
            alt={y.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gold/20 to-background" />
        )}
      </a>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[19px] font-semibold leading-tight text-foreground md:text-[20px]">
          {displayName}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
          {y.capacity && <span>{y.capacity} guests</span>}
          {y.capacity && y.size_ft && <span className="h-1 w-1 rounded-full bg-gold" />}
          {y.size_ft && <span>{y.size_ft}ft</span>}
        </div>
        <div className="mt-5 flex items-end justify-between border-t border-foreground/8 pt-5">
          <div className="flex flex-col">
            {y.price_4h && (
              <span className="text-[12px] text-muted-foreground line-through">
                ${(Number(y.price_4h) * 1.25).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            )}
            <span className="font-display text-2xl font-semibold text-foreground">
              ${y.price_4h ? Number(y.price_4h).toLocaleString() : "—"}
              <span className="ml-1 text-[11px] font-normal uppercase tracking-wider text-muted-foreground">
                / 4h
              </span>
            </span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Book ${y.name} via WhatsApp`}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-gold-foreground transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_20px_rgba(186,163,108,0.45)]"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-foreground/8 bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:border-gold/30">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-foreground/[0.02]"
        aria-expanded={open}
      >
        <span className="font-display text-[17px] font-semibold leading-snug text-foreground md:text-[18px]">
          {q}
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-300">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <div
        className={`grid overflow-hidden px-6 transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-[15px] leading-[1.75] text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}
