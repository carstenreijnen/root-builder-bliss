import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  ChefHat,
  ChevronDown,
  Croissant,
  Download,
  Fish,
  GlassWater,
  Grape,
  IceCream2,
  Leaf,
  Salad,
  Sandwich,
  Ship,
  Sparkles,
  Star,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { BookNowModal } from "@/components/site/book-now-modal";

import heroImg from "@/assets/catering/hero-deck-dining.jpg";
import chefImg from "@/assets/catering/chef-plating.jpg";
import plattersImg from "@/assets/catering/platters.jpg";
import smallBitesImg from "@/assets/catering/small-bites.jpg";
import seafoodImg from "@/assets/catering/seafood.jpg";
import sushiImg from "@/assets/catering/sushi.jpg";
import entreesImg from "@/assets/catering/entrees.jpg";
import dessertsImg from "@/assets/catering/desserts.jpg";
import drinksImg from "@/assets/catering/drinks.jpg";
import ctaImg from "@/assets/catering/cta-band.jpg";
import cateringMenuPdf from "@/assets/menus/catering-menu.pdf.asset.json";
import drinksMenuPdf from "@/assets/menus/drinks-menu.pdf.asset.json";

const MENU = [
  {
    title: "Platters",
    from: "from $60",
    items: "Charcuterie boards, imported cheese, seasonal fruit, mezze",
    img: plattersImg,
    icon: Grape,
    span: "lg:col-span-3",
  },
  {
    title: "Small Bites",
    from: "from $48",
    items: "Prosciutto and melon, salmon canapés, caprese skewers",
    img: smallBitesImg,
    icon: Sandwich,
    span: "lg:col-span-3",
  },
  {
    title: "Seafood",
    from: "from $84",
    items: "Jumbo shrimp cocktail, salmon and tuna tartare, oysters, caviar",
    img: seafoodImg,
    icon: Fish,
    span: "lg:col-span-4",
  },
  {
    title: "Sushi",
    from: "from $27",
    items: "California, spicy tuna, salmon avocado, sashimi selection",
    img: sushiImg,
    icon: UtensilsCrossed,
    span: "lg:col-span-2",
  },
  {
    title: "Entrées",
    from: "from $46",
    items: "Truffle mac and cheese, beef tenderloin, pan roasted salmon",
    img: entreesImg,
    icon: ChefHat,
    span: "lg:col-span-3",
  },
  {
    title: "Desserts",
    from: "from $38",
    items: "Tiramisu, French macarons, panna cotta, dipped strawberries",
    img: dessertsImg,
    icon: IceCream2,
    span: "lg:col-span-3",
  },
];

const MENU_TEXT = [
  { title: "Salads", from: "from $58", items: "Truffle burrata, Greek, Caesar", icon: Salad },
  {
    title: "Breakfast",
    from: "from $48",
    items: "Continental spread, avocado toast, smoked salmon bagels",
    icon: Croissant,
  },
  {
    title: "Kids Menu",
    from: "from $22",
    items: "Chicken tenders, mini pizzas, fruit and yogurt cups",
    icon: Sparkles,
  },
];

const STEPS = [
  {
    step: "01",
    title: "Pick your yacht and date",
    copy: "Tell us the vessel, the sailing time and how many guests are aboard.",
  },
  {
    step: "02",
    title: "Choose from the menu",
    copy: "Order the way you would in a restaurant. Platters, sushi, entrées, dessert, drinks.",
  },
  {
    step: "03",
    title: "Prepped fresh and waiting",
    copy: "Everything is cooked the same morning and set up onboard before you step on deck.",
  },
];

const PAIRS = [
  { title: "Private Chef", copy: "Plated multi-course dining, cooked aboard." },
  { title: "Private DJ", copy: "Live sets on deck, zoned sound, sunset to night." },
  { title: "Yacht Decoration", copy: "Florals, balloons and signage for the occasion." },
  { title: "Bachelorette Parties", copy: "The full weekend, planned around the water." },
  { title: "Corporate Events", copy: "Client dinners and team days on Biscayne Bay." },
];

const FAQ = [
  {
    q: "Can I bring my own food?",
    a: "Yes. Guests are welcome to bring their own food and drinks aboard. Most groups still order through us because everything arrives cold-chain fresh, plated and set up before boarding, with no coolers to carry down the dock.",
  },
  {
    q: "Do you handle dietary requirements?",
    a: "Vegan, vegetarian, gluten free, nut allergies, halal and kosher are all available on request. Tell us at the time of booking and the chef builds the menu around it.",
  },
  {
    q: "How far ahead should I order?",
    a: "Forty eight hours is comfortable for most menus. Caviar, large sushi orders, custom cakes and groups above twenty guests are best confirmed five to seven days out.",
  },
  {
    q: "Is alcohol included?",
    a: "Alcohol is ordered separately from the drinks menu. Ice, cups, garnishes and bar tools come with every charter, and you are welcome to bring your own bottles.",
  },
  {
    q: "What does catering cost?",
    a: "Most groups spend between $40 and $90 per guest depending on the menu. Representative from prices sit next to every category, and the full menu PDF has the detail.",
  },
];

export const Route = createFileRoute("/add-ons/catering")({
  head: () => ({
    meta: [
      { title: "Yacht Catering in Miami — Royal Yachts Miami" },
      {
        name: "description",
        content:
          "Chef-prepared yacht catering in Miami. Platters, sushi, seafood, entrées and desserts prepared fresh and set up onboard before you board. Platters from $60.",
      },
      { property: "og:title", content: "Yacht Catering in Miami — Royal Yachts Miami" },
      {
        property: "og:description",
        content:
          "Order onboard dining like a restaurant. Fresh, chef-prepared menus waiting on deck for your Miami charter.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CateringPage,
});

function CateringPage() {
  const [bookOpen, setBookOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* ---------- HERO ---------- */}
      <section className="relative min-h-[86svh] w-full overflow-hidden md:min-h-[90vh]">
        <img
          src={heroImg}
          alt="Seafood platters, charcuterie and champagne set on the teak deck of a yacht at golden hour in Miami"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[24%] select-none text-center font-teko text-[18vw] leading-[0.75] tracking-[0.14em] text-white/[0.05]"
        >
          CATERING
        </div>

        <div className="relative mx-auto flex min-h-[86svh] max-w-[1400px] flex-col justify-end px-5 pb-14 pt-28 md:min-h-[90vh] md:px-8 md:pb-24 md:pt-32">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold sm:text-[12px]">
            <span className="h-px w-8 shrink-0 bg-gold/70 sm:w-10" />
            <span className="[text-shadow:0_1px_10px_rgba(0,0,0,0.8)]">Onboard dining</span>
          </div>

          <h1 className="mt-5 break-words font-teko text-[clamp(2.6rem,9vw,7rem)] font-bold uppercase leading-[0.85] tracking-[0.04em] text-white">
            Yacht Catering
            <span className="block text-gold">in Miami</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Chef-prepared menus, ready when you board.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setBookOpen(true)}
              className="inline-flex h-[50px] items-center justify-center rounded-full bg-gold px-9 text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-foreground transition-all duration-300 hover:opacity-90 hover:shadow-[0_10px_40px_rgba(186,163,108,0.4)]"
            >
              Book now
            </button>
            <a
              href={cateringMenuPdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[50px] items-center justify-center gap-2 rounded-full border border-white/60 px-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white hover:text-black"
            >
              <Download strokeWidth={1.25} className="h-4 w-4" />
              View full menu
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-[11px] uppercase tracking-[0.2em] text-white/75">
            <span className="inline-flex items-center gap-2">
              <Star strokeWidth={1.25} className="h-4 w-4 text-gold" /> 4.9 stars
            </span>
            <span>80+ yachts</span>
            <span>Since 2018</span>
            <span>5-star chefs</span>
          </div>
        </div>
      </section>

      {/* ---------- THE PITCH (light) ---------- */}
      <section className="border-y border-sand-border bg-sand text-sand-foreground">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <img
              src={chefImg}
              alt="Private chef plating a fresh dish in a yacht galley"
              loading="lazy"
              width={1408}
              height={1056}
              className="w-full rounded-[16px] border border-sand-border object-cover shadow-luxe"
            />
            <div className="absolute -bottom-6 -right-2 hidden rounded-[16px] border border-gold/40 bg-sand/95 px-6 py-5 backdrop-blur-md md:block">
              <div className="font-teko text-4xl font-bold leading-none tracking-[0.04em] text-gold">
                Same day
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-sand-muted">
                Prepared fresh
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold/60" />
              The service
            </div>
            <h2 className="mt-3 font-teko text-5xl font-bold uppercase leading-[0.95] tracking-[0.06em] md:text-6xl">
              Chef-prepared,{" "}
              <span className="text-gold">ready when you board</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-sand-muted">
              Every menu is prepared fresh the same day by a five-star Royal chef, then delivered
              to the yacht and set out before your group arrives at the dock. Nothing frozen,
              nothing reheated on the way.
            </p>
            <p className="mt-4 text-base leading-relaxed text-sand-muted">
              You order the way you would in a restaurant. Pick the platters, the sushi, the
              entrées and the dessert you want, and we handle sourcing, plating, ice, service ware
              and cleanup.
            </p>

            <div className="mt-9 grid grid-cols-3 gap-4 border-t border-sand-border pt-8">
              {[
                { k: "Prep", v: "Same day" },
                { k: "Setup", v: "Before boarding" },
                { k: "Cleanup", v: "Handled" },
              ].map((x) => (
                <div key={x.k}>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-sand-muted">
                    {x.k}
                  </div>
                  <div className="mt-1 font-teko text-2xl font-semibold uppercase tracking-[0.06em]">
                    {x.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- EXPLORE THE MENU (dark) ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold/60" />
              The menu
            </div>
            <h2 className="mt-3 font-teko text-5xl font-bold uppercase tracking-[0.06em] md:text-6xl">
              Explore the <span className="text-gold">menu</span>
            </h2>
          </div>
          <UtensilsCrossed strokeWidth={1.25} className="h-7 w-7 shrink-0 text-gold/50" />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {MENU.map((m) => (
            <article
              key={m.title}
              className={`group relative flex min-h-[300px] items-end overflow-hidden rounded-[16px] border border-border bg-card transition-all duration-500 hover:border-gold/40 hover:shadow-luxe lg:min-h-[360px] ${m.span}`}
            >
              <img
                src={m.img}
                alt={m.title}
                loading="lazy"
                width={1200}
                height={900}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />
              <div className="relative w-full p-6">

                <m.icon strokeWidth={1.25} className="h-6 w-6 text-gold" />
                <div className="mt-3 flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-teko text-3xl font-semibold uppercase tracking-[0.08em] text-white">
                    {m.title}
                  </h3>
                  <span className="font-teko text-xl font-bold tracking-[0.04em] text-gold">
                    {m.from}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-white/75">{m.items}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {MENU_TEXT.map((m) => (
            <div
              key={m.title}
              className="rounded-[16px] border border-border bg-section-alt p-6 transition-colors duration-500 hover:border-gold/40"
            >
              <m.icon strokeWidth={1.25} className="h-6 w-6 text-gold" />
              <div className="mt-3 flex flex-wrap items-baseline gap-x-3">
                <h3 className="font-teko text-2xl font-semibold uppercase tracking-[0.08em]">
                  {m.title}
                </h3>
                <span className="font-teko text-lg font-bold tracking-[0.04em] text-gold">
                  {m.from}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.items}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href={cateringMenuPdf.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[50px] items-center justify-center gap-2 rounded-full border border-gold/50 px-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gold hover:text-gold-foreground"
          >
            <Download strokeWidth={1.25} className="h-4 w-4" />
            View the full catering menu
          </a>
        </div>
      </section>

      {/* ---------- DRINKS & BAR (light) ---------- */}
      <section className="border-y border-sand-border bg-sand text-sand-foreground">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold/60" />
              Bar service
            </div>
            <h2 className="mt-3 font-teko text-5xl font-bold uppercase leading-[0.95] tracking-[0.06em] md:text-6xl">
              Drinks, <span className="text-gold">poured on deck</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-sand-muted">
              Champagne from Moët to Dom Pérignon, premium spirits, wine by the bottle, beer,
              hard seltzers and craft cocktail mixers. Ice, glassware and garnishes come with
              every charter.
            </p>

            <ul className="mt-8 grid gap-x-8 gap-y-3 border-t border-sand-border pt-8 sm:grid-cols-2">
              {[
                "Champagne and sparkling",
                "Premium spirits",
                "Wine by the bottle",
                "Beer and hard seltzers",
                "Craft cocktail mixers",
                "Ice, glassware, garnishes",
              ].map((x) => (
                <li key={x} className="flex items-center gap-3 text-sm text-sand-muted">
                  <GlassWater strokeWidth={1.25} className="h-4 w-4 shrink-0 text-gold" />
                  {x}
                </li>
              ))}
            </ul>

            <a
              href={drinksMenuPdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex h-[50px] items-center justify-center gap-2 rounded-full border border-gold/60 px-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gold hover:text-gold-foreground"
            >
              <Download strokeWidth={1.25} className="h-4 w-4" />
              View the drinks menu
            </a>
          </div>

          <img
            src={drinksImg}
            alt="Champagne on ice with coupe glasses and premium spirits on a yacht bar"
            loading="lazy"
            width={1600}
            height={1104}
            className="w-full rounded-[16px] border border-sand-border object-cover shadow-luxe"
          />
        </div>
      </section>

      {/* ---------- HOW ORDERING WORKS (dark) ---------- */}
      <section className="border-b border-border bg-section-deep">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-8 bg-gold/60" />
            The process
          </div>
          <h2 className="mt-3 font-teko text-5xl font-bold uppercase tracking-[0.06em] md:text-6xl">
            How ordering <span className="text-gold">works</span>
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[16px] border border-border bg-border md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.step} className="bg-background p-8 md:p-10">
                <div className="font-teko text-5xl font-bold leading-none tracking-[0.02em] text-gold/80">
                  {s.step}
                </div>
                <h3 className="mt-5 font-teko text-2xl font-semibold uppercase tracking-[0.1em]">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- GROUP SIZE (light) ---------- */}
      <section className="border-b border-sand-border bg-sand text-sand-foreground">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold/60" />
              Group size
            </div>
            <h2 className="mt-3 font-teko text-5xl font-bold uppercase leading-[0.95] tracking-[0.06em] md:text-6xl">
              Catering for <span className="text-gold">any group</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-sand-muted">
              The menu scales with the vessel. Tell us the headcount and we size the order so
              nobody is reaching for the last platter.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Users, n: "13", t: "Guests on one yacht", c: "The standard charter party across the fleet." },
              { icon: Ship, n: "26", t: "Across two yachts", c: "Pair two vessels and run one shared menu." },
              { icon: Sparkles, n: "60", t: "On a commercial vessel", c: "Full event catering with wait staff on request." },
            ].map((g) => (
              <div
                key={g.t}
                className="rounded-[16px] border border-sand-border bg-white/60 p-8 transition-colors duration-500 hover:border-gold/50"
              >
                <g.icon strokeWidth={1.25} className="h-7 w-7 text-gold" />
                <div className="mt-5 font-teko text-6xl font-bold leading-none tracking-[0.02em] text-gold">
                  {g.n}
                </div>
                <div className="mt-2 font-teko text-xl font-semibold uppercase tracking-[0.1em]">
                  {g.t}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-sand-muted">{g.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- DIETARY (dark) ---------- */}
      <section className="border-b border-border bg-section-alt">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8 md:py-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold/60" />
              Custom requests
            </div>
            <h2 className="mt-3 font-teko text-4xl font-bold uppercase tracking-[0.06em] md:text-5xl">
              Dietary and <span className="text-gold">custom menus</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Vegan, vegetarian, gluten free, kids portions, allergy safe preparation, halal and
              kosher on request. Tell the chef what you need and the menu is built around it.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {["Vegan", "Vegetarian", "Gluten free", "Kids", "Allergies", "Halal", "Kosher"].map(
              (t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold"
                >
                  <Leaf strokeWidth={1.25} className="h-3.5 w-3.5" />
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ---------- PAIRS PERFECTLY WITH (light) ---------- */}
      <section className="border-b border-sand-border bg-sand text-sand-foreground">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-24">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-8 bg-gold/60" />
            Add to your charter
          </div>
          <h2 className="mt-3 font-teko text-5xl font-bold uppercase tracking-[0.06em] md:text-6xl">
            Pairs <span className="text-gold">perfectly with</span>
          </h2>

          <div className="mt-10 divide-y divide-sand-border border-y border-sand-border">
            {PAIRS.map((p) => (
              <Link
                key={p.title}
                to="/"
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 py-6 transition-colors duration-300"
              >
                <div className="min-w-0">
                  <div className="font-teko text-3xl font-semibold uppercase tracking-[0.08em] transition-colors duration-300 group-hover:text-gold">
                    {p.title}
                  </div>
                  <p className="mt-1 text-sm text-sand-muted">{p.copy}</p>
                </div>
                <span className="shrink-0 rounded-full border border-gold/40 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-gold-foreground">
                  Explore
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ (dark) ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-20">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold/60" />
              Good to know
            </div>
            <h2 className="mt-3 font-teko text-5xl font-bold uppercase leading-[0.95] tracking-[0.06em] md:text-6xl">
              Catering <span className="text-gold">questions</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Anything else, message a charter advisor and you will have an answer the same day.
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {FAQ.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-6 py-6 text-left"
                  >
                    <span className="font-teko text-2xl font-semibold uppercase tracking-[0.08em] md:text-3xl">
                      {f.q}
                    </span>
                    <ChevronDown
                      strokeWidth={1.25}
                      className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {open ? (
                    <p className="max-w-2xl pb-7 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- FINAL CTA BAND ---------- */}
      <section className="relative min-h-[70vh] w-full overflow-hidden">
        <img
          src={ctaImg}
          alt="Dinner table set with champagne on a yacht deck at dusk with the Miami skyline behind"
          loading="lazy"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-center justify-center px-5 py-24 text-center md:px-8">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-10 bg-gold/70" />
            Onboard dining
            <span className="h-px w-10 bg-gold/70" />
          </div>
          <h2 className="mt-5 font-teko text-[clamp(2.4rem,6vw,5rem)] font-bold uppercase leading-[0.9] tracking-[0.05em] text-white">
            Ready to plan <span className="text-gold">your menu?</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80">
            Tell us the date, the yacht and the group size. The chef takes it from there.
          </p>
          <button
            type="button"
            onClick={() => setBookOpen(true)}
            className="mt-9 inline-flex h-[50px] items-center justify-center rounded-full bg-gold px-10 text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-foreground transition-all duration-300 hover:opacity-90 hover:shadow-[0_10px_40px_rgba(186,163,108,0.4)]"
          >
            Book now
          </button>
        </div>
      </section>

      <SiteFooter />

      <BookNowModal open={bookOpen} onClose={() => setBookOpen(false)} />

      {/* ---------- MOBILE STICKY BAR ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
          <div className="min-w-0">
            <div className="font-teko text-2xl font-bold uppercase leading-none tracking-[0.06em]">
              Yacht catering
            </div>
            <div className="truncate text-[10px] uppercase tracking-[0.2em] text-caption">
              Platters from $60 · sushi from $27
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-stretch gap-1.5">
            <button
              type="button"
              onClick={() => setBookOpen(true)}
              className="rounded-full bg-gold px-6 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-foreground"
            >
              Book now
            </button>
            <a
              href={cateringMenuPdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gold/50 px-6 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-gold"
            >
              Full menu
            </a>
          </div>
        </div>
      </div>
      <div className="h-28 lg:hidden" />
    </div>
  );
}
