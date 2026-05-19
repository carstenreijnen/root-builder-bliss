import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  MessageCircle,
  Ship,
  Receipt,
  Bitcoin,
  Users,
  Star,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { InquiryForm } from "@/components/site/inquiry-form";
import heroImg from "@/assets/hero-yacht.jpg";

const FAQS = [
  {
    q: "How much does it cost to rent a yacht in Miami?",
    a: "Starting from $1,625 for 4 hours up to $10,000+ for mega yachts. All prices include taxes, gratuity, captain, crew, ice, water and floating mats.",
  },
  {
    q: "What is included in every charter?",
    a: "Professional captain and crew, fuel, ice, water, soft drinks, floating mats and life jackets. No hidden fees.",
  },
  {
    q: "How many people can a yacht hold?",
    a: "From 2 to 100+ guests depending on the yacht. Most yachts accommodate 10–13 guests.",
  },
  {
    q: "Do you accept cryptocurrency?",
    a: "Yes — Cash, Crypto, PayPal, Venmo, Zelle, CashApp, wire transfer, Visa, MasterCard and Amex all accepted.",
  },
  {
    q: "How far in advance should I book?",
    a: "3–4 weeks during peak season November–March. Same-day bookings sometimes available via WhatsApp.",
  },
];

const EXPERIENCES_FALLBACK = [
  { slug: "bachelorette-party", title: "Bachelorette Party", blurb: "Confetti, champagne, golden hour." },
  { slug: "birthday-party", title: "Birthday Party", blurb: "A celebration on open water." },
  { slug: "yacht-dinner", title: "Yacht Dinner", blurb: "Private chef under a Miami sky." },
  { slug: "corporate", title: "Corporate", blurb: "Boardrooms, reimagined offshore." },
];

const WHY = [
  { icon: Ship, label: "65+ Yachts Available" },
  { icon: Receipt, label: "Taxes & Gratuity Included" },
  { icon: Bitcoin, label: "Crypto Payments Accepted" },
  { icon: Users, label: "Professional Crew Included" },
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

type Pkg = {
  slug_en: string;
  title_en: string | null;
  description_en: string | null;
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
      {
        title:
          "Yacht Rental Miami | Luxury Private Yacht Charters | Royal Yachts Miami",
      },
      {
        name: "description",
        content:
          "Royal Yachts Miami offers luxury private yacht charters in Miami. 65+ yachts from 38ft to 120ft. All-inclusive pricing — taxes & gratuity included. Book via WhatsApp.",
      },
      { property: "og:title", content: "Royal Yachts Miami — Luxury Private Yacht Charters" },
      {
        property: "og:description",
        content:
          "65+ yachts from 38ft to 120ft. All-inclusive pricing. Book via WhatsApp.",
      },
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
  const [packages, setPackages] = useState<Pkg[]>([]);
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
      .from("experience_packages")
      .select("slug_en, title_en, description_en, hero_image")
      .eq("active", true)
      .order("sort_order")
      .limit(4)
      .then(({ data }) => data && setPackages(data));

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
      <section className="relative flex h-screen min-h-[680px] w-full items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Luxury yacht at sunset off Miami"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-background" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <span className="block text-base font-bold uppercase tracking-[0.5em] text-gold md:text-xl">
            Miami &bull; Est. 2010
          </span>
          <h1 className="mt-8 font-display text-[16vw] font-bold uppercase leading-[0.8] tracking-[0.04em] text-white drop-shadow-2xl md:text-[10rem]">
            Luxury Yacht
            <br />
            <span className="font-normal italic text-gold">Charters</span> Miami
          </h1>
          <p className="mx-auto mt-10 max-w-3xl text-xl font-light uppercase leading-relaxed tracking-[0.18em] text-white/80 md:text-2xl">
            Private yacht rentals from 38ft to 120ft — taxes &amp; gratuity always included.
          </p>
          <div className="mt-16 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-8">
            <a
              href="/our-yachts"
              className="w-full bg-gold px-14 py-5 text-center text-xl font-bold uppercase tracking-[0.25em] text-gold-foreground shadow-2xl transition-all duration-500 hover:bg-white md:w-auto md:px-16 md:py-6 md:text-2xl"
            >
              View Our Fleet
            </a>
            <a
              href="/contact"
              className="w-full border border-white/30 px-14 py-5 text-center text-xl font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition-all duration-500 hover:bg-white hover:text-background md:w-auto md:px-16 md:py-6 md:text-2xl"
            >
              Get A Quote
            </a>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 text-white/40">
          <span className="text-xs uppercase tracking-[0.4em]">Scroll</span>
          <div className="h-16 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* FLEET */}
      <section className="mx-auto max-w-[1500px] px-6 py-32 md:px-10 md:py-40">
        <div className="mb-20 flex flex-col justify-between gap-8 border-b border-foreground/5 pb-12 md:mb-28 md:flex-row md:items-end">
          <div>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.5em] text-gold md:text-sm">
              The Selection
            </span>
            <h2 className="font-display text-5xl font-bold uppercase tracking-[0.12em] md:text-7xl lg:text-8xl">
              Featured Fleet
            </h2>
          </div>
          <p className="max-w-md text-base uppercase tracking-widest text-foreground/50 md:text-xl">
            Our hand-picked vessels represent the pinnacle of Miami maritime luxury.
          </p>
        </div>

        {yachts.length === 0 ? (
          <EmptyState text="Yachts will appear here once added to the fleet." />
        ) : (
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:grid-cols-3">
            {yachts.map((y, i) => (
              <YachtCard key={y.id} y={y} featured={i === 0} />
            ))}
          </div>
        )}

        <div className="mt-20 flex justify-center">
          <a
            href="/our-yachts"
            className="inline-flex items-center gap-3 border border-gold px-10 py-5 text-sm font-bold uppercase tracking-[0.25em] text-gold transition-all duration-500 hover:bg-gold hover:text-gold-foreground"
          >
            View Full Fleet <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* EXPERIENCES */}
      <Section eyebrow="Curated" title="Signature Experiences" className="bg-card/40">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {(packages.length > 0
            ? packages.map((p) => ({
                slug: p.slug_en,
                title: p.title_en ?? p.slug_en,
                blurb: p.description_en ?? "",
                image: p.hero_image,
              }))
            : EXPERIENCES_FALLBACK.map((e) => ({ ...e, image: null }))
          ).map((p) => (
            <a
              key={p.slug}
              href={`/packages/${p.slug}`}
              className="group relative aspect-[3/4] overflow-hidden border border-foreground/5 bg-card transition-all duration-700 hover:border-gold/40"
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-card to-background" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="font-display text-2xl font-bold uppercase tracking-[0.15em] text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gold opacity-0 transition group-hover:opacity-100">
                  Explore →
                </p>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* WHY */}
      <Section eyebrow="Why" title="The Royal Standard">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div key={w.label} className="text-center">
              <div className="mx-auto inline-flex h-20 w-20 items-center justify-center border border-gold/40 text-gold">
                <w.icon className="h-7 w-7" />
              </div>
              <p className="mt-8 font-display text-xl font-bold uppercase tracking-[0.15em] text-foreground">
                {w.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section eyebrow="Reviews" title="What Guests Say" className="bg-card/40">
        {testimonials.length === 0 ? (
          <EmptyState text="Testimonials will appear here once added." />
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.id}
                className="border border-foreground/5 bg-card p-10 transition-all duration-500 hover:border-gold/40"
              >
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold" />
                  ))}
                </div>
                <blockquote className="mt-6 text-lg leading-relaxed text-foreground/80">
                  "{t.body_en}"
                </blockquote>
                <figcaption className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-gold">
                  — {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </Section>

      {/* INQUIRY */}
      <Section eyebrow="Reserve" title="Begin Your Charter">
        <div className="mx-auto max-w-3xl">
          <InquiryForm />
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="FAQ" title="Frequently Asked" className="bg-card/40">
        <div className="mx-auto max-w-3xl divide-y divide-foreground/10 border-y border-foreground/10">
          {FAQS.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}

function Section({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-32 md:py-40 ${className}`}>
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <div className="mb-20 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-gold md:text-sm">
            {eyebrow}
          </span>
          <h2 className="mt-6 font-display text-5xl font-bold uppercase tracking-[0.12em] text-foreground md:text-7xl">
            {title}
          </h2>
          <div className="mx-auto mt-8 h-px w-16 bg-gold" />
        </div>
        {children}
      </div>
    </section>
  );
}

function YachtCard({ y, featured = false }: { y: Yacht; featured?: boolean }) {
  const displayName = `${y.name}${y.size_ft ? ` | ${y.size_ft}FT` : ""}`.toUpperCase();
  const whatsappUrl = `https://wa.me/16452149666?text=${encodeURIComponent(
    `Hi, I'd like to book ${y.name}`,
  )}`;
  return (
    <div className="group flex flex-col border border-foreground/5 bg-card transition-all duration-700 hover:border-gold/40">
      <a
        href={`/our-yachts/${y.slug_en}`}
        className="relative block aspect-[3/4] overflow-hidden"
      >
        {y.hero_image ? (
          <img
            src={y.hero_image}
            alt={y.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gold/20 to-background" />
        )}
        {featured && (
          <div className="absolute right-0 top-0 bg-gold px-6 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-foreground">
            Best Seller
          </div>
        )}
      </a>
      <div className="flex flex-1 flex-col p-8 md:p-10">
        <h3 className="mb-3 font-display text-3xl font-bold uppercase tracking-[0.15em] text-foreground md:text-4xl">
          {displayName}
        </h3>
        <div className="mb-10 flex items-center gap-4">
          {y.capacity && (
            <>
              <span className="text-base uppercase tracking-[0.2em] text-gold">
                {y.capacity} Guests
              </span>
              <span className="h-1 w-1 rounded-full bg-foreground/20" />
            </>
          )}
          <span className="text-base uppercase tracking-[0.2em] text-foreground/40">
            Crew Included
          </span>
        </div>
        <div className="mt-auto flex items-end justify-between border-t border-foreground/5 pt-8">
          <div className="flex flex-col">
            <span className="mb-1 text-base uppercase tracking-[0.2em] text-foreground/30 line-through">
              ${y.price_4h ? (Number(y.price_4h) * 1.25).toLocaleString(undefined, { maximumFractionDigits: 0 }) : "—"}
            </span>
            <span className="font-display text-3xl font-bold uppercase tracking-[0.1em] text-foreground md:text-4xl">
              ${y.price_4h ? Number(y.price_4h).toLocaleString() : "—"}{" "}
              <span className="text-xs font-normal tracking-widest text-foreground/50">
                / 4H
              </span>
            </span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Book ${y.name} via WhatsApp`}
            className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold text-gold-foreground transition-transform duration-300 hover:scale-110"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.301-.15-1.767-.872-2.04-.971-.272-.1-.47-.15-.67.15-.198.3-.765 1.05-.937 1.25-.172.199-.344.225-.645.075-.3-.15-1.265-.467-2.41-1.485-.892-.796-1.494-1.78-1.67-2.079-.173-.3-.018-.462.132-.61.135-.133.301-.351.452-.526.149-.174.198-.298.299-.497.101-.199.05-.374-.025-.525-.075-.15-.671-1.62-.919-2.22-.242-.584-.487-.504-.67-.514-.173-.008-.371-.01-.57-.01s-.522.074-.795.373c-.273.299-1.042 1.019-1.042 2.486s1.069 2.887 1.218 3.086c.149.199 2.103 3.21 5.094 4.5 1.705.736 2.37.893 3.22.77 1.02-.148 2.04-.872 2.33-1.62.292-.748.292-1.391.205-1.524-.087-.133-.321-.212-.622-.363z" />
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
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-8 text-left"
      >
        <span className="font-display text-xl font-bold uppercase tracking-[0.12em] text-foreground md:text-2xl">
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gold transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="pb-8 pr-10 text-base leading-relaxed text-foreground/70">{a}</p>
      )}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="border border-dashed border-foreground/15 bg-card/30 py-20 text-center text-sm uppercase tracking-[0.2em] text-foreground/50">
      {text}
    </div>
  );
}
