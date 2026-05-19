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
      <section className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Luxury yacht at sunset off Miami"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/40" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Miami · Est. 2010
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-white drop-shadow-lg md:text-7xl lg:text-8xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Luxury Yacht <span className="italic text-gold">Charters</span> Miami
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Private yacht rentals from 38ft to 120ft — taxes &amp; gratuity always included.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/our-yachts"
              className="group inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.22em] text-gold-foreground transition hover:bg-gold/90"
            >
              View Our Fleet
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="https://wa.me/16452149666"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-white/40 bg-white/5 px-8 py-4 text-xs font-medium uppercase tracking-[0.22em] text-white backdrop-blur transition hover:border-gold hover:bg-gold/15 hover:text-gold"
            >
              <MessageCircle className="h-4 w-4" /> Book via WhatsApp
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* FLEET */}
      <Section eyebrow="The Fleet" title="Featured Yachts" >
        {yachts.length === 0 ? (
          <EmptyState text="Yachts will appear here once added to the fleet." />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {yachts.map((y) => (
              <YachtCard key={y.id} y={y} />
            ))}
          </div>
        )}
        <div className="mt-12 flex justify-center">
          <a
            href="/our-yachts"
            className="inline-flex items-center gap-2 rounded-sm border border-gold/60 px-8 py-4 text-xs font-medium uppercase tracking-[0.22em] text-gold transition hover:bg-gold hover:text-gold-foreground"
          >
            View Full Fleet <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Section>

      {/* EXPERIENCES */}
      <Section eyebrow="Curated" title="Signature Experiences" className="bg-card/40">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              className="group relative aspect-[3/4] overflow-hidden rounded-sm border border-foreground/10 bg-card"
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-card to-background" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl text-white">{p.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold opacity-0 transition group-hover:opacity-100">
                  Explore →
                </p>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* WHY */}
      <Section eyebrow="Why" title="The Royal Standard">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div key={w.label} className="text-center">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold">
                <w.icon className="h-6 w-6" />
              </div>
              <p className="mt-5 font-display text-xl text-foreground">{w.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section eyebrow="Reviews" title="What Guests Say" className="bg-card/40">
        {testimonials.length === 0 ? (
          <EmptyState text="Testimonials will appear here once added." />
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.id}
                className="rounded-sm border border-foreground/10 bg-background p-8"
              >
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold" />
                  ))}
                </div>
                <blockquote className="mt-5 text-sm leading-relaxed text-foreground/80">
                  "{t.body_en}"
                </blockquote>
                <figcaption className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-gold">
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
    <section className={`py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl text-foreground md:text-5xl">
            {title}
          </h2>
          <div className="mx-auto mt-6 h-px w-12 bg-gold" />
        </div>
        {children}
      </div>
    </section>
  );
}

function YachtCard({ y }: { y: Yacht }) {
  return (
    <a
      href={`/our-yachts/${y.slug_en}`}
      className="group block overflow-hidden rounded-sm border border-foreground/10 bg-card transition hover:border-gold/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {y.hero_image ? (
          <img
            src={y.hero_image}
            alt={y.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gold/20 to-background" />
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl text-foreground">{y.name}</h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.18em] text-foreground/60">
          {y.size_ft && <span>{y.size_ft} ft</span>}
          {y.capacity && <span>{y.capacity} guests</span>}
        </div>
        <div className="mt-5 flex items-center justify-between">
          {y.price_4h && (
            <p className="text-sm text-foreground/70">
              from <span className="font-semibold text-gold">${Number(y.price_4h).toLocaleString()}</span>
              <span className="text-foreground/50"> / 4h</span>
            </p>
          )}
          <a
            href={`https://wa.me/16452149666?text=${encodeURIComponent(`Hi, I'd like to book ${y.name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 rounded-sm border border-gold/50 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-gold-foreground"
          >
            <MessageCircle className="h-3 w-3" /> Book
          </a>
        </div>
      </div>
    </a>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <span className="font-display text-xl text-foreground">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gold transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="pb-6 pr-10 text-sm leading-relaxed text-foreground/70">{a}</p>
      )}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-sm border border-dashed border-foreground/15 bg-card/30 py-16 text-center text-sm text-foreground/50">
      {text}
    </div>
  );
}
