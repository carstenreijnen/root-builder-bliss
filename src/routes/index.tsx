import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Anchor,
  ArrowRight,
  BadgeCheck,
  Droplets,
  LifeBuoy,
  Star,
  Users,
  Waves,
} from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { BookNowModal } from "@/components/site/book-now-modal";
import { QuoteForm } from "@/components/site/quote-form";

import expBachelorette from "@/assets/exp-bachelorette.jpg";
import expBirthday from "@/assets/exp-birthday.jpg";
import expCorporate from "@/assets/exp-corporate.jpg";
import expSunset from "@/assets/exp-sunset.jpg";
import expWedding from "@/assets/exp-wedding.jpg";
import expNye from "@/assets/exp-nye.jpg";
import blogSandbar from "@/assets/blog-sandbar.jpg";
import blogFlybridge from "@/assets/blog-flybridge.jpg";
import blogCatering from "@/assets/blog-catering.jpg";
import addonCatering from "@/assets/addons/catering.jpg";
import addonChef from "@/assets/addons/chef.jpg";
import addonDj from "@/assets/addons/dj.jpg";
import addonDecoration from "@/assets/addons/decoration.jpg";
import addonPhotographer from "@/assets/addons/photographer.jpg";
import addonTransport from "@/assets/addons/transport.jpg";
import aboutYacht from "@/assets/about-yacht.jpg";
import floatingMat from "@/assets/lifestyle/floating-mat.jpg";
import lifestyleJetski from "@/assets/lifestyle/jetski-turquoise.jpg";
import bookingSide from "@/assets/booking-side.jpg";

const PHOTO_BASE =
  "https://xteonchtqeoppjxmlmgm.supabase.co/storage/v1/object/public/media/yachts/";
const heroImg = `${PHOTO_BASE}1785351502492-92__Sunseeker__RMM_JOB____Drone__4.jpg`;
const yachtA = `${PHOTO_BASE}1785349407570-DJI_0115__2_.jpg`;
const yachtB = `${PHOTO_BASE}1785334643255-DJI_0143.jpg`;
const yachtC = `${PHOTO_BASE}1785349404891-DJI_0110.jpg`;

const FEATURED = {
  name: "Sunseeker 96ft",
  slug: "/yachts/royal-sunseeker-smu",
  img: heroImg,
  guests: 13,
  from: "$3,900",
  copy: "The flagship of the fleet. A climate controlled salon, a full beam sun deck and a hydraulic swim platform that turns the sandbar into a private beach club.",
  facts: [
    { k: "Length", v: "96 ft" },
    { k: "Guests", v: "13" },
    { k: "Cruise", v: "Biscayne Bay" },
  ],
};

const FLEET_ROW = [
  { name: "Sunseeker 80ft", slug: "/yachts/royal-sunseeker-smu", img: yachtA, guests: 12, from: "$2,800" },
  { name: "Azimut 78ft", slug: "/our-yachts", img: yachtB, guests: 12, from: "$2,400" },
  { name: "Ferretti 72ft", slug: "/our-yachts", img: yachtC, guests: 12, from: "$1,950" },
];

const FLEET_LIST = [
  { name: "Prestige 62ft", guests: 12, from: "$1,600" },
  { name: "Galeon 55ft", guests: 12, from: "$1,250" },
  { name: "Cranchi 50ft", guests: 12, from: "$950" },
  { name: "Sea Ray 45ft", guests: 10, from: "$750" },
];

const EXPERIENCES = [
  { title: "Bachelorette", href: "/packages/bachelorette", img: expBachelorette, span: "lg:col-span-7 aspect-[16/10]" },
  { title: "Sunset Cruise", href: "/packages/yacht-party", img: expSunset, span: "lg:col-span-5 aspect-[16/10]" },
  { title: "Birthday", href: "/packages/birthday", img: expBirthday, span: "lg:col-span-4 aspect-[4/5] lg:aspect-[3/4]" },
  { title: "Corporate Event", href: "/packages/corporate", img: expCorporate, span: "lg:col-span-4 aspect-[4/5] lg:aspect-[3/4]" },
  { title: "Wedding", href: "/packages/wedding", img: expWedding, span: "lg:col-span-4 aspect-[4/5] lg:aspect-[3/4]" },
  { title: "New Year's Eve", href: "/packages/new-years-eve", img: expNye, span: "lg:col-span-12 aspect-[16/9] lg:aspect-[21/8]" },
];

const TESTIMONIALS = [
  {
    quote:
      "The captain found us a quiet corner of the sandbar and the crew handled every detail. Nobody in our group had to think about anything all day.",
    name: "Alexandra R.",
    detail: "Bachelorette charter, June",
  },
  {
    quote:
      "We flew clients in from Chicago. Invoicing by email was simple, the yacht was spotless and the timing held to the minute.",
    name: "Daniel K.",
    detail: "Corporate charter, March",
  },
  {
    quote:
      "Real photos of the actual boat, an answer in minutes and no pressure. The run past the skyline at sunset was the best hour of our trip.",
    name: "Marisol V.",
    detail: "Sunset cruise, October",
  },
];

const INCLUDED = [
  { icon: Anchor, label: "Captain and crew" },
  { icon: Droplets, label: "Water and ice" },
  { icon: LifeBuoy, label: "Towels" },
  { icon: Waves, label: "Floating mats" },
];

const ADDONS = [
  { title: "Catering", href: "/add-ons/catering", img: addonCatering },
  { title: "Private Chef", href: "/add-ons/private-chef", img: addonChef },
  { title: "Private DJ", href: "/add-ons/private-dj", img: addonDj },
  { title: "Yacht Decoration", href: "/add-ons/yacht-decoration", img: addonDecoration },
  { title: "Photo and Video", href: "/add-ons/photographer", img: addonPhotographer },
  { title: "VIP Transport", href: "/add-ons/vip-transport", img: addonTransport },
];

const POSTS = [
  {
    title: "A first timer's guide to the Miami sandbar",
    excerpt: "Where to anchor, when to arrive and how to make an afternoon on Nixon sandbar feel effortless.",
    img: blogSandbar,
    href: "/blog",
  },
  {
    title: "How to choose the right yacht size",
    excerpt: "Group size, sea conditions and the difference an extra ten feet makes on Biscayne Bay.",
    img: blogFlybridge,
    href: "/blog",
  },
  {
    title: "What great charter catering looks like",
    excerpt: "From raw bars to private chefs, the food that turns a good charter into a great one.",
    img: blogCatering,
    href: "/blog",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Royal Yachts Miami",
  description:
    "Private luxury yacht charters across Miami and Biscayne Bay. A fleet of more than forty yachts with USCG licensed captains.",
  url: "https://royalyachtsmiami.com/",
  telephone: "+1-645-214-9666",
  foundingDate: "2018",
  address: {
    "@type": "PostalAddress",
    streetAddress: "333 SE 2nd Ave, Suite 2000",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "33131",
    addressCountry: "US",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500" },
  image: heroImg,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luxury Yacht Rentals in Miami | Royal Yachts Miami" },
      {
        name: "description",
        content:
          "Private luxury yacht charters across Miami and Biscayne Bay. More than forty yachts, USCG licensed captains and a charter advisor on every channel.",
      },
      { property: "og:title", content: "Luxury Yacht Rentals in Miami | Royal Yachts Miami" },
      {
        property: "og:description",
        content:
          "Private luxury yacht charters across Miami and Biscayne Bay. More than forty yachts and USCG licensed captains.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSON_LD) }],
  }),
  component: Home,
});

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
      <span className="h-px w-8 bg-gold/60" />
      {children}
    </div>
  );
}

const goldBtn =
  "inline-flex h-[54px] items-center justify-center gap-2 rounded-full bg-gold px-9 font-teko text-[16px] font-bold uppercase tracking-[0.16em] text-gold-foreground transition-all duration-300 hover:shadow-[0_8px_30px_rgba(186,163,108,0.4)]";

function Home() {
  const [bookOpen, setBookOpen] = useState(false);
  const openBooking = () => setBookOpen(true);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        {/* ---------- 1. HERO ---------- */}
        <section className="relative isolate flex min-h-[94vh] items-end overflow-hidden">
          <img
            src={heroImg}
            alt="Aerial view of a Sunseeker yacht cruising off Miami"
            width={1920}
            height={1280}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-black/55" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          <div className="mx-auto w-full max-w-[1400px] px-5 pb-16 pt-40 md:px-8 md:pb-24">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-10 bg-gold/70" />
              Private charters since 2018
            </div>
            <h1 className="mt-6 max-w-5xl font-teko text-[clamp(2.8rem,9vw,7rem)] font-bold uppercase leading-[0.85] tracking-[0.04em] text-white">
              <span className="block">Luxury Yacht</span>
              <span className="block text-gold">Rentals in Miami</span>
            </h1>
            <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-white/85 md:text-[18px]">
              Private day charters across Miami and Biscayne Bay, captained and planned around your
              group.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="button" onClick={openBooking} className={goldBtn}>
                Book Now <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
              </button>
              <a
                href="/our-yachts"
                className="inline-flex h-[54px] items-center justify-center rounded-full border border-white/45 px-9 font-teko text-[16px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-gold hover:text-gold"
              >
                View the Fleet
              </a>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-white/15 pt-6 text-[10px] uppercase tracking-[0.28em] text-white/80">
              <span className="flex items-center gap-2.5">
                <Star className="h-4 w-4 fill-gold text-gold" strokeWidth={1.25} /> 4.9 guest rating
              </span>
              <span className="flex items-center gap-2.5">
                <BadgeCheck className="h-4 w-4 text-gold" strokeWidth={1.25} /> USCG licensed captains
              </span>
              <span className="flex items-center gap-2.5">
                <Anchor className="h-4 w-4 text-gold" strokeWidth={1.25} /> Chartering since 2018
              </span>
            </div>
          </div>
        </section>

        {/* ---------- 2. THE FLEET ---------- */}
        <section className="relative overflow-hidden bg-background py-24 md:py-32">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 top-10 select-none font-teko text-[16vw] leading-[0.75] tracking-[0.14em] text-foreground/[0.04]"
          >
            FLEET
          </span>

          <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
            <div className="max-w-2xl">
              <SectionLabel>Most booked</SectionLabel>
              <h2 className="mt-4 font-teko text-5xl font-bold uppercase leading-[0.9] tracking-[0.06em] md:text-6xl">
                The yachts Miami <span className="text-gold">books first</span>
              </h2>
            </div>

            {/* featured */}
            <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
              <a href={FEATURED.slug} className="group relative block overflow-hidden rounded-[16px] border border-border shadow-luxe">
                <img
                  src={FEATURED.img}
                  alt={`${FEATURED.name} charter yacht in Miami`}
                  loading="lazy"
                  className="aspect-[16/11] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-5 left-6 text-[10px] uppercase tracking-[0.3em] text-white/85">
                  Flagship of the fleet
                </div>
              </a>

              <div className="relative">
                <SectionLabel>Featured</SectionLabel>
                <h3 className="mt-4 font-teko text-5xl font-bold uppercase leading-[0.9] tracking-[0.05em]">
                  Sunseeker <span className="text-gold">96ft</span>
                </h3>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                  {FEATURED.copy}
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4 border-y border-border py-6">
                  {FEATURED.facts.map((f) => (
                    <div key={f.k}>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-caption">{f.k}</div>
                      <div className="mt-1 font-teko text-2xl font-semibold uppercase tracking-[0.06em]">
                        {f.v}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap items-end justify-between gap-5">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-caption">From</div>
                    <div className="font-teko text-5xl font-bold leading-none tracking-[0.02em] text-gold">
                      {FEATURED.from}
                      <span className="ml-2 font-sans text-[12px] font-normal uppercase tracking-[0.2em] text-caption">
                        / 4 hrs
                      </span>
                    </div>
                  </div>
                  <a
                    href={FEATURED.slug}
                    className="inline-flex h-[50px] items-center gap-2 rounded-full border border-gold/50 px-7 font-teko text-[14px] font-bold uppercase tracking-[0.18em] text-gold transition-all duration-300 hover:bg-gold hover:text-gold-foreground"
                  >
                    View yacht <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
                  </a>
                </div>
              </div>
            </div>

            {/* refined row */}
            <div className="mt-20 grid gap-8 md:grid-cols-3">
              {FLEET_ROW.map((y) => (
                <a key={y.name} href={y.slug} className="group block">
                  <div className="overflow-hidden rounded-[16px] border border-border">
                    <img
                      src={y.img}
                      alt={`${y.name} charter yacht in Miami`}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="mt-5 flex items-end justify-between gap-4 border-b border-border pb-5">
                    <div>
                      <h3 className="font-teko text-3xl font-semibold uppercase leading-none tracking-[0.06em] transition-colors group-hover:text-gold">
                        {y.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-caption">
                        <Users className="h-3.5 w-3.5 text-gold" strokeWidth={1.25} /> Up to {y.guests} guests
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-[0.25em] text-caption">From</div>
                      <div className="font-teko text-2xl font-bold leading-none tracking-[0.02em] text-gold">
                        {y.from}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* compact list */}
            <div className="mt-14 divide-y divide-border border-y border-border">
              {FLEET_LIST.map((y) => (
                <a
                  key={y.name}
                  href="/our-yachts"
                  className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 py-5 md:grid-cols-[minmax(0,1fr)_auto_auto]"
                >
                  <span className="font-teko text-2xl font-semibold uppercase tracking-[0.08em] transition-colors group-hover:text-gold">
                    {y.name}
                  </span>
                  <span className="hidden text-[10px] uppercase tracking-[0.25em] text-caption md:block">
                    Up to {y.guests} guests
                  </span>
                  <span className="font-teko text-xl font-bold uppercase tracking-[0.06em] text-gold">
                    From {y.from}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-14">
              <a href="/our-yachts" className={goldBtn}>
                View All Yachts <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
              </a>
            </div>
          </div>
        </section>

        {/* ---------- 3. BRAND STORY (light) ---------- */}
        <section className="bg-sand py-24 text-sand-foreground md:py-32">
          <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div className="relative">
              <img
                src={aboutYacht}
                alt="Royal Yachts Miami crew preparing a yacht before a private charter"
                loading="lazy"
                className="aspect-[4/5] w-full rounded-[16px] border border-sand-border object-cover shadow-luxe"
              />
              <div className="absolute -bottom-7 -right-3 hidden rounded-[16px] border border-gold/40 bg-sand/95 px-7 py-6 backdrop-blur-md md:block">
                <div className="font-teko text-5xl font-bold leading-none tracking-[0.03em] text-gold">
                  2018
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-sand-muted">
                  First yacht, Miami
                </div>
              </div>
              <img
                src={lifestyleJetski}
                alt="Guest riding a jetski in turquoise water beside a charter yacht"
                loading="lazy"
                className="absolute -left-4 -top-8 hidden w-40 rounded-[16px] border-4 border-sand object-cover shadow-card lg:block"
              />
            </div>

            <div>
              <SectionLabel>Meet Royal</SectionLabel>
              <h2 className="mt-4 font-teko text-5xl font-bold uppercase leading-[0.9] tracking-[0.06em] md:text-6xl">
                One boat, then <span className="text-gold">forty</span>
              </h2>
              <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-sand-muted">
                Royal Yachts Miami started in 2018 with a single boat and a belief that a charter
                should feel personal. The fleet has passed forty yachts and the approach has not
                changed. You speak with the same team that runs the docks.
              </p>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-sand-muted">
                We are young Miami locals who grew up on this water. Every yacht is fully insured
                and every day is built around your group rather than a package.
              </p>

              <div className="mt-12 grid gap-8 border-t border-sand-border pt-10 sm:grid-cols-3">
                {[
                  { k: "40+", v: "Yachts in the fleet" },
                  { k: "500+", v: "Charters completed" },
                  { k: "4.9", v: "Guest rating" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="font-teko text-5xl font-bold leading-none tracking-[0.02em] text-gold">
                      {s.k}
                    </div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-sand-muted">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 4. EXPERIENCES (lookbook) ---------- */}
        <section className="bg-navy py-24 text-navy-foreground md:py-32">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <div className="grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
              <div className="max-w-2xl">
                <SectionLabel>The lookbook</SectionLabel>
                <h2 className="mt-4 font-teko text-5xl font-bold uppercase leading-[0.9] tracking-[0.06em] text-navy-foreground md:text-6xl">
                  Charter for <span className="text-gold">any occasion</span>
                </h2>
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-navy-foreground/60">
                Every charter is private. Tell us the occasion and we shape the route, the timing
                and the extras around it.
              </p>
            </div>

            <div className="mt-14 grid gap-5 lg:grid-cols-12">
              {EXPERIENCES.map((e) => (
                <a
                  key={e.title}
                  href={e.href}
                  className={`group relative isolate flex items-end overflow-hidden rounded-[16px] border border-navy-border transition-all duration-500 hover:border-gold/50 ${e.span}`}
                >
                  <img
                    src={e.img}
                    alt={`${e.title} yacht charter in Miami`}
                    loading="lazy"
                    className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="w-full p-7">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <span className="h-px w-8 bg-gold/70" /> View package
                    </div>
                    <h3 className="mt-2 font-teko text-3xl font-bold uppercase leading-none tracking-[0.1em] text-white md:text-4xl">
                      {e.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 5. BOOKING FORM ---------- */}
        <section id="reserve" className="border-y border-border bg-section-deep">
          <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[320px] overflow-hidden">
              <img
                src={bookingSide}
                alt="Yacht anchored in calm turquoise water near Miami"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/20" />
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
                  <span className="h-px w-10 bg-gold/70" /> Availability
                </div>
                <h2 className="mt-4 font-teko text-5xl font-bold uppercase leading-[0.9] tracking-[0.06em] text-white md:text-6xl">
                  Request <span className="text-gold">a quote</span>
                </h2>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/80">
                  Send your date and we come back with the yachts available and a written price.
                </p>
              </div>
            </div>

            <div className="px-5 py-20 md:px-16 md:py-28">
              <div className="mx-auto max-w-xl">
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 6. TESTIMONIALS ---------- */}
        <section className="relative isolate overflow-hidden bg-background py-24 md:py-32">
          <img
            src={yachtC}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.14]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/80 to-background" />

          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <div className="max-w-2xl">
              <SectionLabel>Guest reviews</SectionLabel>
              <h2 className="mt-4 font-teko text-5xl font-bold uppercase leading-[0.9] tracking-[0.06em] md:text-6xl">
                What our <span className="text-gold">clients say</span>
              </h2>
            </div>

            <div className="mt-16 grid gap-14 md:grid-cols-3 md:gap-10">
              {TESTIMONIALS.map((t) => (
                <figure key={t.name} className="border-t border-gold/30 pt-8">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={1.25} />
                    ))}
                  </div>
                  <blockquote className="mt-6 font-display text-[19px] leading-[1.6] text-foreground/90">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-7">
                    <div className="font-teko text-2xl font-semibold uppercase tracking-[0.08em]">
                      {t.name}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-caption">
                      {t.detail}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 7. ONBOARD + ADD-ONS (light) ---------- */}
        <section className="bg-sand py-24 text-sand-foreground md:py-32">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
              <div>
                <SectionLabel>Onboard</SectionLabel>
                <h2 className="mt-4 font-teko text-5xl font-bold uppercase leading-[0.9] tracking-[0.06em] md:text-6xl">
                  Included with <span className="text-gold">every charter</span>
                </h2>
                <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-sand-muted">
                  The essentials are never an upsell. Your captain and crew, cold water and ice,
                  fresh towels and floating mats come with every yacht in the fleet.
                </p>
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  {INCLUDED.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-4 border-t border-sand-border pt-5">
                      <Icon className="h-6 w-6 shrink-0 text-gold" strokeWidth={1.25} />
                      <span className="font-teko text-2xl font-semibold uppercase tracking-[0.08em]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <img
                src={floatingMat}
                alt="Guests relaxing on a floating mat beside a yacht in Biscayne Bay"
                loading="lazy"
                className="aspect-[4/3] w-full rounded-[16px] border border-sand-border object-cover shadow-luxe"
              />
            </div>

            <div className="mt-24">
              <div className="grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
                <div>
                  <SectionLabel>Enhance your charter</SectionLabel>
                  <h2 className="mt-4 font-teko text-4xl font-bold uppercase tracking-[0.06em] md:text-5xl">
                    Popular <span className="text-gold">add-ons</span>
                  </h2>
                </div>
                <a
                  href="/add-ons"
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-sand-foreground transition-colors hover:text-gold"
                >
                  All add-ons <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
                </a>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {ADDONS.map((a) => (
                  <a
                    key={a.title}
                    href={a.href}
                    className="group relative isolate flex aspect-[16/9] items-end overflow-hidden rounded-[16px] border border-sand-border transition-all duration-500 hover:border-gold/60"
                  >
                    <img
                      src={a.img}
                      alt={`${a.title} for a Miami yacht charter`}
                      loading="lazy"
                      className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    <h3 className="p-6 font-teko text-2xl font-semibold uppercase leading-none tracking-[0.1em] text-white">
                      {a.title}
                    </h3>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 8. BLOG (light) ---------- */}
        <section className="bg-section-alt py-24 md:py-32">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <div className="grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
              <div>
                <SectionLabel>Journal</SectionLabel>
                <h2 className="mt-4 font-teko text-4xl font-bold uppercase tracking-[0.06em] md:text-5xl">
                  From the <span className="text-gold">blog</span>
                </h2>
              </div>
              <a
                href="/blog"
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] transition-colors hover:text-gold"
              >
                All articles <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
              </a>
            </div>

            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {POSTS.map((p) => (
                <a key={p.title} href={p.href} className="group block">
                  <div className="overflow-hidden rounded-[16px] border border-border">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <h3 className="mt-6 font-teko text-2xl font-semibold uppercase leading-tight tracking-[0.06em] transition-colors group-hover:text-gold">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    {p.excerpt}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 9. FINAL CTA (approved) ---------- */}
        <section className="relative isolate flex min-h-[60vh] items-center overflow-hidden">
          <img
            src={yachtB}
            alt="Yacht cruising past the Miami skyline at golden hour"
            loading="lazy"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-black/60" />
          <div className="mx-auto w-full max-w-[1400px] px-5 py-24 text-center md:px-10">
            <span className="font-teko text-[12px] font-bold uppercase tracking-[0.24em] text-gold md:text-[13px]">
              Your day on the water
            </span>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl text-white md:text-[48px]">
              Ready to get on the water?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/85">
              Tell us the date and the group size. We handle the rest.
            </p>
            <div className="mt-9 flex justify-center">
              <button type="button" onClick={openBooking} className={goldBtn}>
                Book Now <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
              </button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <BookNowModal open={bookOpen} onClose={() => setBookOpen(false)} />
    </div>
  );
}
