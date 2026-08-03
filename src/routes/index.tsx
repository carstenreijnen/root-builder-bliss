import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Anchor,
  ArrowRight,
  BadgeCheck,
  Calendar,
  Compass,
  Droplets,
  LifeBuoy,
  Quote,
  Ship,
  ShieldCheck,
  Star,
  Users,
  Waves,
} from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { BookNowModal } from "@/components/site/book-now-modal";
import { InquiryForm } from "@/components/site/inquiry-form";

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
import lifestyleJetski from "@/assets/lifestyle/jetski-turquoise.jpg";
import floatingMat from "@/assets/lifestyle/floating-mat.jpg";

const PHOTO_BASE =
  "https://xteonchtqeoppjxmlmgm.supabase.co/storage/v1/object/public/media/yachts/";
const heroImg = `${PHOTO_BASE}1785351502492-92__Sunseeker__RMM_JOB____Drone__4.jpg`;
const yachtA = `${PHOTO_BASE}1785349407570-DJI_0115__2_.jpg`;
const yachtB = `${PHOTO_BASE}1785334643255-DJI_0143.jpg`;
const yachtC = `${PHOTO_BASE}1785349404891-DJI_0110.jpg`;

const FLEET = [
  { name: "Sunseeker 96ft", slug: "/yachts/royal-sunseeker-smu", img: heroImg, guests: 13, from: "$3,900" },
  { name: "Sunseeker 80ft", slug: "/yachts/royal-sunseeker-smu", img: yachtA, guests: 12, from: "$2,800" },
  { name: "Azimut 78ft", slug: "/our-yachts", img: yachtB, guests: 12, from: "$2,400" },
  { name: "Ferretti 72ft", slug: "/our-yachts", img: yachtC, guests: 12, from: "$1,950" },
  { name: "Prestige 62ft", slug: "/our-yachts", img: yachtA, guests: 12, from: "$1,600" },
  { name: "Galeon 55ft", slug: "/our-yachts", img: yachtB, guests: 12, from: "$1,250" },
  { name: "Cranchi 50ft", slug: "/our-yachts", img: yachtC, guests: 12, from: "$950" },
  { name: "Sea Ray 45ft", slug: "/our-yachts", img: yachtA, guests: 10, from: "$750" },
];

const TRUST_POINTS = [
  {
    icon: Ship,
    title: "A fleet of more than forty yachts",
    copy: "From 45 foot day boats to 96 foot flagships, each one inspected and detailed before every charter.",
  },
  {
    icon: ShieldCheck,
    title: "Fully insured, fully licensed",
    copy: "USCG licensed captains, current commercial insurance and safety equipment checked before departure.",
  },
  {
    icon: Compass,
    title: "Miami locals who grew up on the water",
    copy: "A young team that knows the sandbars, the tides and the anchorages worth the extra ten minutes.",
  },
  {
    icon: Users,
    title: "Personalized from the first message",
    copy: "One advisor plans your day end to end, from the yacht to the playlist to the ride to the dock.",
  },
];

const EXPERIENCES = [
  { title: "Bachelorette", href: "/packages/bachelorette", img: expBachelorette },
  { title: "Birthday", href: "/packages/birthday", img: expBirthday },
  { title: "Corporate Event", href: "/packages/corporate", img: expCorporate },
  { title: "Sunset Cruise", href: "/packages/yacht-party", img: expSunset },
  { title: "Wedding", href: "/packages/wedding", img: expWedding },
  { title: "New Year's Eve", href: "/packages/new-years-eve", img: expNye },
];

const STEPS = [
  {
    icon: Compass,
    title: "Choose your yacht",
    copy: "Browse the fleet, pick your date and the hours that suit your group.",
  },
  {
    icon: Calendar,
    title: "Reach us your way",
    copy: "WhatsApp, phone, email or the booking form. An advisor confirms availability and holds the yacht.",
  },
  {
    icon: Waves,
    title: "Set sail",
    copy: "Meet your captain, step aboard and spend the day on the water. Everything is ready.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We booked the 80 foot Sunseeker for my sister's bachelorette and the whole day ran perfectly. The captain found us a quiet spot at the sandbar and the crew handled everything.",
    name: "Alexandra R.",
    detail: "Bachelorette charter, June",
  },
  {
    quote:
      "Our team flew in from Chicago and we needed something that felt serious for clients. Invoicing by email was simple and the yacht was spotless. We are already planning the next one.",
    name: "Daniel K.",
    detail: "Corporate charter, March",
  },
  {
    quote:
      "Answered on WhatsApp within a few minutes, sent real photos of the actual boat and never pushed anything on us. The sunset run past the skyline was the highlight of our trip.",
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
    excerpt: "From raw bars to private chefs, the food choices that turn a good charter into a great one.",
    img: blogCatering,
    href: "/blog",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Royal Yachts Miami",
  description:
    "Luxury private yacht charters in Miami. A fleet of more than forty yachts, licensed captains and all inclusive day charters across Miami and Biscayne Bay.",
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
          "Private luxury yacht charters across Miami and Biscayne Bay. More than forty yachts, USCG licensed captains and booking by WhatsApp, phone, email or form.",
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

const eyebrow = "font-teko text-[12px] font-bold uppercase tracking-[0.24em] text-gold md:text-[13px]";
const goldBtn =
  "inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-gold px-8 font-teko text-[15px] font-bold uppercase tracking-[0.14em] text-gold-foreground transition-all duration-300 hover:shadow-[0_8px_30px_rgba(186,163,108,0.4)]";

function Home() {
  const [bookOpen, setBookOpen] = useState(false);
  const openBooking = () => setBookOpen(true);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        {/* 1. HERO */}
        <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden">
          <img
            src={heroImg}
            alt="Aerial view of a Sunseeker yacht cruising the turquoise water off Miami"
            width={1920}
            height={1280}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-black/55" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="mx-auto w-full max-w-[1400px] px-5 pb-20 pt-36 md:px-10 md:pb-28">
            <span className={eyebrow}>Private charters since 2018</span>
            <h1 className="mt-4 max-w-4xl font-display text-[38px] leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[64px]">
              Luxury Yacht Rentals in Miami
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/85 md:text-[18px]">
              Private day charters across Miami and Biscayne Bay, captained, fully equipped and
              planned around your group.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="button" onClick={openBooking} className={goldBtn}>
                Book Now <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
              </button>
              <a
                href="/our-yachts"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-white/50 px-8 font-teko text-[15px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:border-gold hover:text-gold"
              >
                View the Fleet
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-6">
              {[
                { icon: Star, label: "4.9 Guest Rating on Google and TripAdvisor" },
                { icon: BadgeCheck, label: "USCG Licensed" },
                { icon: Anchor, label: "500+ Charters" },
                { icon: Calendar, label: "Since 2018" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-2.5">
                  <Icon className="h-[18px] w-[18px] text-gold" strokeWidth={1.25} />
                  <span className="font-teko text-[14px] font-bold uppercase tracking-[0.14em] text-white/90">
                    {label}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 2. MOST BOOKED YACHTS */}
        <section className="bg-navy py-20 text-navy-foreground md:py-28">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className={eyebrow}>The Fleet</span>
                <h2 className="mt-3 font-display text-3xl text-navy-foreground md:text-[44px]">
                  Most Booked Yachts in Miami
                </h2>
              </div>
              <p className="max-w-md text-[15px] leading-relaxed text-navy-foreground/65">
                Day charters from 45 to 96 feet, all captained, fueled and ready across Miami and
                Biscayne Bay.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FLEET.map((y) => (
                <a
                  key={y.name + y.from}
                  href={y.slug}
                  className="group overflow-hidden rounded-[16px] border border-navy-border bg-navy-foreground/[0.03] transition-all duration-300 hover:border-gold/50 hover:shadow-luxe"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={y.img}
                      alt={`${y.name} charter yacht in Miami`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-teko text-[22px] font-bold uppercase leading-none tracking-[0.08em] text-navy-foreground">
                      {y.name}
                    </h3>
                    <p className="mt-2 flex items-center gap-2 text-[13px] text-navy-foreground/60">
                      <Users className="h-4 w-4 text-gold" strokeWidth={1.25} /> Up to {y.guests} guests
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-navy-border pt-4">
                      <span className="font-teko text-[19px] font-bold uppercase tracking-[0.08em] text-gold">
                        From {y.from}
                        <span className="ml-1 text-[13px] text-navy-foreground/55">/ 4 hours</span>
                      </span>
                      <span className="flex items-center gap-1 font-teko text-[13px] font-bold uppercase tracking-[0.14em] text-navy-foreground/80 transition-colors group-hover:text-gold">
                        Enquire <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <a href="/our-yachts" className={goldBtn}>
                View All Yachts <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
              </a>
            </div>
          </div>
        </section>

        {/* 3. MEET ROYAL (light) */}
        <section className="bg-sand py-20 text-sand-foreground md:py-28">
          <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="overflow-hidden rounded-[16px] border border-sand-border">
                <img
                  src={aboutYacht}
                  alt="Royal Yachts Miami crew preparing a yacht for a private charter"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-2 hidden w-40 overflow-hidden rounded-[16px] border-4 border-sand shadow-card sm:block lg:-right-6 lg:w-52">
                <img
                  src={lifestyleJetski}
                  alt="Guest riding a jetski in turquoise water beside a charter yacht"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div>
              <span className={eyebrow}>Meet Royal</span>
              <h2 className="mt-3 font-display text-3xl md:text-[44px]">
                Founded in 2018 by people who never left the water
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-sand-muted">
                Royal Yachts Miami started with one boat and a simple belief that a charter should
                feel personal. Today the fleet passes forty yachts and the approach has not changed.
                You speak with the same team that runs the docks, and the day is built around your
                group rather than a package.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {TRUST_POINTS.map(({ icon: Icon, title, copy }) => (
                  <div key={title}>
                    <Icon className="h-6 w-6 text-gold" strokeWidth={1.25} />
                    <h3 className="mt-3 font-teko text-[19px] font-bold uppercase tracking-[0.08em]">
                      {title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-sand-muted">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. EXPERIENCES (dark) */}
        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="max-w-2xl">
              <span className={eyebrow}>Experiences</span>
              <h2 className="mt-3 font-display text-3xl md:text-[44px]">Charter for Any Occasion</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Every charter is private. Tell us the occasion and we shape the route, the timing
                and the extras around it.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {EXPERIENCES.map((e) => (
                <a
                  key={e.title}
                  href={e.href}
                  className="group relative isolate flex aspect-[4/3] items-end overflow-hidden rounded-[16px] border border-border transition-all duration-300 hover:border-gold/50"
                >
                  <img
                    src={e.img}
                    alt={`${e.title} yacht charter in Miami`}
                    loading="lazy"
                    className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                  <div className="flex w-full items-center justify-between gap-4 p-6">
                    <h3 className="font-teko text-[24px] font-bold uppercase leading-none tracking-[0.1em] text-white">
                      {e.title}
                    </h3>
                    <ArrowRight
                      className="h-5 w-5 text-gold transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={1.25}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 5. HOW IT WORKS (light) */}
        <section className="bg-sand py-20 text-sand-foreground md:py-28">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className={eyebrow}>How it works</span>
              <h2 className="mt-3 font-display text-3xl md:text-[44px]">Three steps to the water</h2>
            </div>

            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {STEPS.map(({ icon: Icon, title, copy }, i) => (
                <div key={title} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-sand">
                    <Icon className="h-7 w-7 text-gold" strokeWidth={1.25} />
                  </div>
                  <div className="mt-5 font-teko text-[13px] font-bold uppercase tracking-[0.24em] text-gold">
                    Step {i + 1}
                  </div>
                  <h3 className="mt-2 font-teko text-[22px] font-bold uppercase tracking-[0.08em]">
                    {title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs text-[14px] leading-relaxed text-sand-muted">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. TESTIMONIALS (dark) */}
        <section className="relative isolate overflow-hidden bg-navy py-20 text-navy-foreground md:py-28">
          <img
            src={yachtC}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 -z-10 bg-navy/85" />
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className={eyebrow}>Guest reviews</span>
              <h2 className="mt-3 font-display text-3xl text-navy-foreground md:text-[44px]">
                What Our Clients Say
              </h2>
              <div className="mt-5 flex items-center justify-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" strokeWidth={1.25} />
                ))}
                <span className="ml-2 font-teko text-[14px] font-bold uppercase tracking-[0.14em] text-navy-foreground/80">
                  4.9 across Google and TripAdvisor
                </span>
              </div>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <figure
                  key={t.name}
                  className="rounded-[16px] border border-navy-border bg-navy-foreground/[0.04] p-7 backdrop-blur-[2px]"
                >
                  <Quote className="h-7 w-7 text-gold" strokeWidth={1.25} />
                  <blockquote className="mt-5 text-[15px] leading-relaxed text-navy-foreground/85">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-navy-border pt-5">
                    <div className="font-teko text-[18px] font-bold uppercase tracking-[0.1em] text-navy-foreground">
                      {t.name}
                    </div>
                    <div className="mt-1 text-[13px] text-navy-foreground/55">{t.detail}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 7. ONBOARD SERVICES (light) */}
        <section className="bg-sand py-20 text-sand-foreground md:py-28">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <span className={eyebrow}>Onboard</span>
                <h2 className="mt-3 font-display text-3xl md:text-[44px]">
                  Included with every charter
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-sand-muted">
                  The essentials are never an upsell. Your captain and crew, cold water and ice,
                  fresh towels and floating mats come with every yacht in the fleet.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {INCLUDED.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 rounded-[12px] border border-sand-border bg-card/40 px-5 py-4"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.25} />
                      <span className="font-teko text-[17px] font-bold uppercase tracking-[0.1em]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden rounded-[16px] border border-sand-border">
                <img
                  src={floatingMat}
                  alt="Guests relaxing on a floating mat beside a yacht in Biscayne Bay"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-20">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <span className={eyebrow}>Enhance your charter</span>
                  <h2 className="mt-3 font-display text-3xl md:text-[40px]">Popular add-ons</h2>
                </div>
                <a
                  href="/add-ons"
                  className="flex items-center gap-2 font-teko text-[14px] font-bold uppercase tracking-[0.14em] text-sand-foreground transition-colors hover:text-gold"
                >
                  All add-ons <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
                </a>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {ADDONS.map((a) => (
                  <a
                    key={a.title}
                    href={a.href}
                    className="group relative isolate flex aspect-[16/10] items-end overflow-hidden rounded-[16px] border border-sand-border transition-all duration-300 hover:border-gold/60"
                  >
                    <img
                      src={a.img}
                      alt={`${a.title} add-on for a Miami yacht charter`}
                      loading="lazy"
                      className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                    <h3 className="p-6 font-teko text-[22px] font-bold uppercase leading-none tracking-[0.1em] text-white">
                      {a.title}
                    </h3>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. BLOG (dark) */}
        <section className="bg-background py-20 md:py-28">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className={eyebrow}>Journal</span>
                <h2 className="mt-3 font-display text-3xl md:text-[44px]">From the blog</h2>
              </div>
              <a
                href="/blog"
                className="flex items-center gap-2 font-teko text-[14px] font-bold uppercase tracking-[0.14em] text-foreground transition-colors hover:text-gold"
              >
                All articles <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
              </a>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {POSTS.map((p) => (
                <a
                  key={p.title}
                  href={p.href}
                  className="group overflow-hidden rounded-[16px] border border-border bg-card transition-all duration-300 hover:border-gold/50 hover:shadow-luxe"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-teko text-[21px] font-bold uppercase leading-tight tracking-[0.06em] transition-colors group-hover:text-gold">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                      {p.excerpt}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Booking form target */}
        <section id="reserve" className="bg-section-alt py-20 md:py-28">
          <div className="mx-auto max-w-[900px] px-5 md:px-10">
            <div className="text-center">
              <span className={eyebrow}>Booking form</span>
              <h2 className="mt-3 font-display text-3xl md:text-[40px]">Request your charter</h2>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                Send the details and an advisor replies with availability and a written quote.
              </p>
            </div>
            <div className="mt-10 rounded-[16px] border border-border bg-card p-6 md:p-10">
              <InquiryForm />
            </div>
          </div>
        </section>

        {/* 9. FINAL CTA */}
        <section className="relative isolate flex min-h-[60vh] items-center overflow-hidden">
          <img
            src={yachtB}
            alt="Yacht cruising past the Miami skyline at golden hour"
            loading="lazy"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-black/60" />
          <div className="mx-auto w-full max-w-[1400px] px-5 py-24 text-center md:px-10">
            <span className={eyebrow}>Your day on the water</span>
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
