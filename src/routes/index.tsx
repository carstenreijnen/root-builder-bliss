import { createFileRoute } from "@tanstack/react-router";
import {
  Anchor,
  ArrowRight,
  BadgeCheck,
  MessageCircle,
  Ship,
  Star,
  Users,
  MapPin,
  Compass,
  Waves,
} from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";

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
import lifestyleJetski from "@/assets/lifestyle/jetski-turquoise.jpg";

const PHOTO_BASE =
  "https://xteonchtqeoppjxmlmgm.supabase.co/storage/v1/object/public/media/yachts/";
const heroImg = `${PHOTO_BASE}1785351502492-92__Sunseeker__RMM_JOB____Drone__4.jpg`;
const yachtA = `${PHOTO_BASE}1785349407570-DJI_0115__2_.jpg`;
const yachtB = `${PHOTO_BASE}1785334643255-DJI_0143.jpg`;
const yachtC = `${PHOTO_BASE}1785349404891-DJI_0110.jpg`;

const WHATSAPP = "https://wa.me/16452399662";

const FLEET = [
  {
    name: "Sunseeker 96ft",
    slug: "/yachts/royal-sunseeker-smu",
    img: heroImg,
    length: "96 ft",
    guests: 13,
    from: "$3,900",
  },
  { name: "Sunseeker 80ft", slug: "/yachts/royal-sunseeker-smu", img: yachtA, length: "80 ft", guests: 12, from: "$2,800" },
  { name: "Azimut 78ft", slug: "/our-yachts", img: yachtB, length: "78 ft", guests: 12, from: "$2,400" },
  { name: "Ferretti 72ft", slug: "/our-yachts", img: yachtC, length: "72 ft", guests: 12, from: "$1,950" },
  { name: "Prestige 62ft", slug: "/our-yachts", img: yachtA, length: "62 ft", guests: 12, from: "$1,600" },
  { name: "Galeon 55ft", slug: "/our-yachts", img: yachtB, length: "55 ft", guests: 12, from: "$1,250" },
];

const WHY = [
  {
    icon: Ship,
    title: "Handpicked fleet",
    copy: "Every yacht is inspected, detailed and photographed by our team before it carries a guest.",
  },
  {
    icon: BadgeCheck,
    title: "Professional crew",
    copy: "USCG licensed captains and hospitality trained mates who run the day so you never have to.",
  },
  {
    icon: MessageCircle,
    title: "Seamless WhatsApp booking",
    copy: "One message, a real person, a confirmed yacht. No forms to chase and no call centers.",
  },
  {
    icon: MapPin,
    title: "Miami locals",
    copy: "We know the sandbars, the tides and the quiet anchorages that make a charter memorable.",
  },
];

const EXPERIENCES = [
  { title: "Bachelorette", href: "/packages/bachelorette", img: expBachelorette },
  { title: "Birthday", href: "/packages/birthday", img: expBirthday },
  { title: "Corporate", href: "/packages/corporate", img: expCorporate },
  { title: "Sunset Cruise", href: "/packages/yacht-party", img: expSunset },
  { title: "Wedding", href: "/packages/wedding", img: expWedding },
  { title: "New Year's Eve", href: "/packages/new-years-eve", img: expNye },
];

const STEPS = [
  {
    icon: Compass,
    title: "Choose your yacht",
    copy: "Browse the fleet and pick the boat, the date and the hours that suit your group.",
  },
  {
    icon: MessageCircle,
    title: "Message us on WhatsApp",
    copy: "We confirm availability, walk you through pricing and hold the yacht for you.",
  },
  {
    icon: Waves,
    title: "Set sail",
    copy: "Arrive at the marina, meet your captain and step aboard. Everything is ready.",
  },
];

const ADDONS = [
  { title: "Catering", href: "/add-ons/catering", img: addonCatering },
  { title: "Private Chef", href: "/add-ons/private-chef", img: addonChef },
  { title: "Private DJ", href: "/add-ons/private-dj", img: addonDj },
  { title: "Yacht Decoration", href: "/add-ons/yacht-decoration", img: addonDecoration },
  { title: "Photo & Video", href: "/add-ons/photographer", img: addonPhotographer },
  { title: "VIP Transport", href: "/add-ons/vip-transport", img: addonTransport },
];

const POSTS = [
  {
    title: "A first timer's guide to the Miami sandbar",
    excerpt:
      "Where to anchor, when to arrive and how to make an afternoon on Nixon sandbar feel effortless.",
    img: blogSandbar,
    href: "/blog",
  },
  {
    title: "How to choose the right yacht size",
    excerpt:
      "Group size, sea conditions and the difference an extra ten feet makes on Biscayne Bay.",
    img: blogFlybridge,
    href: "/blog",
  },
  {
    title: "What great charter catering looks like",
    excerpt:
      "From raw bars to private chefs, the food choices that turn a good charter into a great one.",
    img: blogCatering,
    href: "/blog",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Royal Yachts Miami",
  description:
    "Luxury private yacht charters in Miami. Handpicked fleet, licensed captains and all inclusive day charters on Biscayne Bay.",
  url: "https://royalyachtsmiami.com/",
  telephone: "+1-645-214-9666",
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
          "Private luxury yacht charters in Miami. Handpicked fleet, USCG licensed captains and simple WhatsApp booking on Biscayne Bay.",
      },
      { property: "og:title", content: "Luxury Yacht Rentals in Miami | Royal Yachts Miami" },
      {
        property: "og:description",
        content:
          "Private luxury yacht charters in Miami. Handpicked fleet, licensed captains and simple WhatsApp booking.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSON_LD) }],
  }),
  component: Home,
});

const eyebrow =
  "font-teko text-[12px] font-bold uppercase tracking-[0.24em] text-gold md:text-[13px]";

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        {/* 1. HERO */}
        <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden">
          <img
            src={heroImg}
            alt="Aerial view of a 96ft Sunseeker yacht cruising off Miami Beach"
            width={1920}
            height={1280}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-black/55" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="mx-auto w-full max-w-[1400px] px-5 pb-20 pt-36 md:px-10 md:pb-28">
            <span className={eyebrow}>Miami Beach Marina · Private Charters</span>
            <h1 className="mt-4 max-w-4xl font-display text-[38px] leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[64px]">
              Luxury Yacht Rentals in Miami
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/85 md:text-[18px]">
              Private day charters on Biscayne Bay with a licensed captain, a handpicked yacht and
              nothing left for you to arrange.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/our-yachts"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-gold px-8 font-teko text-[15px] font-bold uppercase tracking-[0.14em] text-gold-foreground transition-all duration-300 hover:shadow-[0_8px_30px_rgba(186,163,108,0.4)]"
              >
                View the Fleet <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-white/50 px-8 font-teko text-[15px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.25} /> Book via WhatsApp
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-6">
              {[
                { icon: Star, label: "4.9 Guest Rating" },
                { icon: BadgeCheck, label: "USCG Licensed" },
                { icon: Anchor, label: "500+ Charters" },
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

        {/* 2. FLEET */}
        <section className="bg-navy py-20 text-navy-foreground md:py-28">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className={eyebrow}>The Fleet</span>
                <h2 className="mt-3 font-display text-3xl text-navy-foreground md:text-[44px]">
                  Sixty five yachts, one standard
                </h2>
              </div>
              <p className="max-w-md text-[15px] leading-relaxed text-navy-foreground/65">
                Day charters from 55 to 96 feet, all captained, fueled and ready at Miami Beach
                Marina.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FLEET.map((y, i) => (
                <a
                  key={y.name + i}
                  href={y.slug}
                  className="group overflow-hidden rounded-[16px] border border-navy-border bg-navy-foreground/[0.04] transition-all duration-300 hover:border-gold/50"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={y.img}
                      alt={`${y.name} luxury charter yacht in Miami`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-navy-foreground">{y.name}</h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-navy-foreground/65">
                      <span className="inline-flex items-center gap-2">
                        <Ship className="h-4 w-4 text-gold" strokeWidth={1.25} /> {y.length}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Users className="h-4 w-4 text-gold" strokeWidth={1.25} /> {y.guests} guests
                      </span>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-navy-border pt-5">
                      <span className="text-[15px] text-navy-foreground/80">
                        From <span className="font-display text-lg text-gold">{y.from}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-teko text-[13px] font-bold uppercase tracking-[0.14em] text-gold">
                        Enquire <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-14 flex justify-center">
              <a
                href="/our-yachts"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-gold px-10 font-teko text-[15px] font-bold uppercase tracking-[0.14em] text-gold-foreground transition-all duration-300 hover:shadow-[0_8px_30px_rgba(186,163,108,0.4)]"
              >
                View All Yachts <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
              </a>
            </div>
          </div>
        </section>

        {/* 3. WHY ROYAL (light) */}
        <section className="bg-sand py-20 text-sand-foreground md:py-28">
          <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-10 lg:grid-cols-2 lg:gap-20">
            <div className="relative">
              <img
                src={lifestyleJetski}
                alt="Guests riding a jetski in turquoise water beside a charter yacht in Miami"
                loading="lazy"
                className="aspect-[4/5] w-full rounded-[16px] object-cover shadow-luxe"
              />
              <div className="absolute -bottom-8 left-6 rounded-[16px] border border-sand-border bg-sand px-7 py-6 shadow-luxe sm:left-auto sm:right-[-24px]">
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-gold text-gold" strokeWidth={1.25} />
                  ))}
                </div>
                <p className="mt-2 font-display text-3xl text-sand-foreground">4.9 / 5</p>
                <p className="text-[13px] text-sand-muted">Across 500+ Miami charters</p>
              </div>
            </div>

            <div className="pt-10 lg:pt-0">
              <span className={eyebrow}>Why Royal</span>
              <h2 className="mt-3 font-display text-3xl text-sand-foreground md:text-[44px]">
                The people Miami trusts with the day
              </h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-sand-muted">
                We run a small, curated fleet and answer every message ourselves. That is the whole
                model.
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {WHY.map(({ icon: Icon, title, copy }) => (
                  <div key={title}>
                    <Icon className="h-6 w-6 text-gold" strokeWidth={1.25} />
                    <h3 className="mt-4 font-display text-lg text-sand-foreground">{title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-sand-muted">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. EXPERIENCES */}
        <section className="bg-navy py-20 text-navy-foreground md:py-28">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="max-w-2xl">
              <span className={eyebrow}>Experiences</span>
              <h2 className="mt-3 font-display text-3xl text-navy-foreground md:text-[44px]">
                Charter for any occasion
              </h2>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {EXPERIENCES.map((e) => (
                <a
                  key={e.title}
                  href={e.href}
                  className="group relative isolate flex aspect-[4/5] items-end overflow-hidden rounded-[16px] border border-navy-border transition-all duration-300 hover:border-gold/60"
                >
                  <img
                    src={e.img}
                    alt={`${e.title} yacht charter in Miami`}
                    loading="lazy"
                    className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                  <div className="p-7">
                    <h3 className="font-teko text-2xl font-bold uppercase tracking-[0.12em] text-gold">
                      {e.title}
                    </h3>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-white/80">
                      Explore package <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 5. HOW IT WORKS (light) */}
        <section className="bg-sand py-20 text-sand-foreground md:py-28">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="max-w-2xl">
              <span className={eyebrow}>How it works</span>
              <h2 className="mt-3 font-display text-3xl text-sand-foreground md:text-[44px]">
                Three steps to the water
              </h2>
            </div>

            <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {STEPS.map(({ icon: Icon, title, copy }, i) => (
                <div
                  key={title}
                  className="rounded-[16px] border border-sand-border bg-white/60 p-8"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold">
                      <Icon className="h-5 w-5" strokeWidth={1.25} />
                    </span>
                    <span className="font-teko text-[13px] font-bold uppercase tracking-[0.2em] text-sand-muted">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl text-sand-foreground">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-sand-muted">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. ADD-ONS */}
        <section className="bg-navy py-20 text-navy-foreground md:py-28">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className={eyebrow}>Enhance your charter</span>
                <h2 className="mt-3 font-display text-3xl text-navy-foreground md:text-[44px]">
                  Popular add-ons
                </h2>
              </div>
              <a
                href="/add-ons"
                className="inline-flex items-center gap-2 font-teko text-[14px] font-bold uppercase tracking-[0.16em] text-gold"
              >
                All add-ons <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {ADDONS.map((a) => (
                <a
                  key={a.title}
                  href={a.href}
                  className="group relative isolate flex aspect-[3/4] items-end overflow-hidden rounded-[16px] border border-navy-border transition-all duration-300 hover:border-gold/60"
                >
                  <img
                    src={a.img}
                    alt={`${a.title} add-on for Miami yacht charters`}
                    loading="lazy"
                    className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <h3 className="p-4 font-teko text-[17px] font-bold uppercase leading-tight tracking-[0.1em] text-gold">
                    {a.title}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 7. BLOG (light) */}
        <section className="bg-sand py-20 text-sand-foreground md:py-28">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className={eyebrow}>Journal</span>
                <h2 className="mt-3 font-display text-3xl text-sand-foreground md:text-[44px]">
                  From the blog
                </h2>
              </div>
              <a
                href="/blog"
                className="inline-flex items-center gap-2 font-teko text-[14px] font-bold uppercase tracking-[0.16em] text-gold"
              >
                All posts <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {POSTS.map((p) => (
                <a key={p.title} href={p.href} className="group">
                  <div className="overflow-hidden rounded-[16px]">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-xl leading-snug text-sand-foreground transition-colors duration-300 group-hover:text-gold">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-sand-muted">{p.excerpt}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FINAL CTA */}
        <section className="relative isolate overflow-hidden">
          <img
            src={yachtC}
            alt="Luxury yacht cutting through turquoise Biscayne Bay water"
            loading="lazy"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-black/60" />
          <div className="mx-auto max-w-[1400px] px-5 py-24 text-center md:px-10 md:py-32">
            <span className={eyebrow}>Biscayne Bay · Miami</span>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl text-white md:text-[48px]">
              Ready to get on the water?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-white/80">
              Send us the date and the number of guests. We will come back with the right yacht.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-gold px-10 font-teko text-[15px] font-bold uppercase tracking-[0.14em] text-gold-foreground transition-all duration-300 hover:shadow-[0_8px_30px_rgba(186,163,108,0.45)]"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.25} /> Book via WhatsApp
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
