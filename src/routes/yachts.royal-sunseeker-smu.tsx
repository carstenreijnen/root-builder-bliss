import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Anchor,
  CalendarDays,
  Camera,
  ChefHat,
  Clock,
  Compass,
  Fan,
  LifeBuoy,
  MapPin,
  Music4,
  ShieldCheck,
  Ship,
  Sparkles,
  Star,
  Users,
  Waves,
  Zap,
} from "lucide-react";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import heroImg from "@/assets/smu-hero.jpg";
import deckImg from "@/assets/smu-deck.jpg";
import salonImg from "@/assets/smu-salon.jpg";
import swimImg from "@/assets/smu-swim.jpg";
import aerialImg from "@/assets/smu-aerial.jpg";
import breakerGoldenImg from "@/assets/smu-breaker-goldenhour.jpg";
import breakerSkylineImg from "@/assets/smu-breaker-skyline.jpg";
import amenitiesImg from "@/assets/smu-amenities.jpg";
import stepBoardingImg from "@/assets/smu-step-boarding.jpg";
import stepBriefingImg from "@/assets/smu-step-briefing.jpg";
import stepCruiseImg from "@/assets/smu-step-cruise.jpg";
import stepSwimImg from "@/assets/smu-step-swim.jpg";
import stepReturnImg from "@/assets/smu-step-return.jpg";
import detailInteriorImg from "@/assets/smu-detail-interior.jpg";
import detailJetskiImg from "@/assets/smu-detail-jetski.jpg";
import videoPosterImg from "@/assets/smu-video-poster.jpg";
import smuFilm from "@/assets/smu-film.mp4.asset.json";
import { GalleryLightbox, type LightboxPhoto } from "@/components/site/gallery-lightbox";
import { VideoBlock } from "@/components/site/video-block";

const WHATSAPP = "16452149666";

// Set to undefined for a yacht with no film — the video section then renders
// as an intentional still cinematic breaker (no play button).
const SMU_VIDEO_SRC: string | undefined = smuFilm.url;


const DURATIONS = [
  { hours: 4, price: 4700, label: "4 Hours", note: "Sunset classic" },
  { hours: 6, price: 5900, label: "6 Hours", note: "Most booked" },
  { hours: 8, price: 7200, label: "8 Hours", note: "Full day" },
] as const;

// Inline mosaic is capped — the page never renders more than these tiles,
// regardless of how many photos the yacht has.
const GALLERY = [
  { src: heroImg, alt: "Royal Sunseeker SMU cruising off Miami Beach at golden hour", span: "md:col-span-4 md:row-span-2" },
  { src: deckImg, alt: "Sun deck loungers with champagne service at sunset", span: "md:col-span-2 md:row-span-1" },
  { src: salonImg, alt: "Interior salon with cream leather seating and ambient lighting", span: "md:col-span-2 md:row-span-1" },
  { src: detailJetskiImg, alt: "Jetski riding alongside the yacht at golden hour", span: "md:col-span-2 md:row-span-2" },
  { src: aerialImg, alt: "Aerial view of the yacht anchored off Miami at dusk", span: "md:col-span-4 md:row-span-2" },
  { src: detailInteriorImg, alt: "Champagne service in the yacht salon", span: "md:col-span-3 md:row-span-1" },
  { src: swimImg, alt: "Swim platform with jetski and floating mat", span: "md:col-span-3 md:row-span-1" },
  { src: breakerGoldenImg, alt: "Golden hour aerial over Biscayne Bay", span: "md:col-span-4 md:row-span-1" },
  { src: stepSwimImg, alt: "Guests swimming at the Miami sandbar beside the yacht", span: "md:col-span-2 md:row-span-1" },
];

// Full set — only rendered inside the fullscreen lightbox.
const ALL_PHOTOS: LightboxPhoto[] = [
  ...GALLERY.map(({ src, alt }) => ({ src, alt })),
  { src: breakerSkylineImg, alt: "Downtown Miami skyline at blue hour from the bow" },
  { src: amenitiesImg, alt: "Golden-hour deck lounge and water toys" },
  { src: stepBoardingImg, alt: "Boarding at Miami Beach Marina" },
  { src: stepBriefingImg, alt: "Crew safety briefing on deck" },
  { src: stepCruiseImg, alt: "Cruising past Star Island" },
  { src: stepReturnImg, alt: "Golden-hour return into the marina" },
  { src: videoPosterImg, alt: "SMU crossing Biscayne Bay against the Miami skyline" },
];


const AMENITIES = [
  { icon: Zap, title: "Jetski", copy: "Seadoo on the swim platform, fueled and ready." },
  { icon: Waves, title: "Floating Mat", copy: "Anchor-out lounge on the water." },
  { icon: Sparkles, title: "Sun Deck", copy: "Teak deck with double loungers." },
  { icon: Fan, title: "Full A/C", copy: "Climate-controlled salon and cabins." },
  { icon: Music4, title: "Premium Sound", copy: "Zoned audio, deck to salon, Bluetooth." },
  { icon: LifeBuoy, title: "Swim Platform", copy: "Hydraulic access straight to the water." },
];

const ADDONS = [
  { icon: ChefHat, title: "Private Catering", copy: "Chef-prepared seafood, sushi or grazing boards.", price: "from $650" },
  { icon: Camera, title: "Photographer", copy: "Two-hour onboard shoot, edited gallery in 48h.", price: "from $450" },
  { icon: Zap, title: "Extra Jetski", copy: "A second Seadoo so nobody waits their turn.", price: "from $400" },
];

const TIMELINE = [
  { step: "01", title: "Boarding", copy: "Meet your captain at Miami Beach Marina. Champagne poured, bags stowed, no queue.", img: stepBoardingImg },
  { step: "02", title: "Safety Briefing", copy: "Five minutes with the crew — layout, life vests, water toys, your route.", img: stepBriefingImg },
  { step: "03", title: "The Cruise", copy: "Star Island, Fisher Island and the Downtown skyline at cruising speed.", img: stepCruiseImg },
  { step: "04", title: "Swim & Anchor", copy: "Drop anchor on the sandbar. Jetski out, float, swim, stay as long as you like.", img: stepSwimImg },
  { step: "05", title: "Return", copy: "Golden-hour cruise back into the marina with the skyline behind you.", img: stepReturnImg },
];

const SIMILAR = [
  { name: "Royal Azimut 'Bella'", size: 72, guests: 12, price: 4200, img: deckImg },
  { name: "Royal Ferretti 'Onyx'", size: 85, guests: 13, price: 5400, img: salonImg },
  { name: "Royal Pershing 'Vega'", size: 76, guests: 12, price: 4900, img: aerialImg },
];

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export const Route = createFileRoute("/yachts/royal-sunseeker-smu")({
  head: () => ({
    meta: [
      { title: "Royal Sunseeker 'SMU' 80ft — Private Yacht Charter Miami" },
      {
        name: "description",
        content:
          "Charter the 80ft Sunseeker 'SMU' in Miami. Up to 13 guests, captain & crew included, jetski and water toys. From $4,700 for 4 hours. Book via WhatsApp.",
      },
      { property: "og:title", content: "Royal Sunseeker 'SMU' 80ft — Private Yacht Charter Miami" },
      {
        property: "og:description",
        content:
          "80ft Sunseeker flagship sport yacht, 13 guests, Miami Beach Marina. All-inclusive charters from $4,700.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: YachtDetailPage,
});

function YachtDetailPage() {
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>(DURATIONS[1]);
  const [date, setDate] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  

  const waLink = useMemo(() => {
    const text = `Hi Royal Yachts Miami — I'd like to book the Royal Sunseeker 'SMU' (80ft) for ${duration.label}${
      date ? ` on ${date}` : ""
    }. Total ${usd(duration.price)}.`;
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  }, [duration, date]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* ---------- HERO ---------- */}
      <section className="relative min-h-[92vh] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="Royal Sunseeker SMU 80ft yacht cruising off Miami at golden hour"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/25" />
        <div className="absolute inset-0 bg-[radial-gradient(130%_75%_at_50%_105%,transparent_25%,var(--color-background)_100%)]" />

        {/* oversized ghost wordmark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[22%] select-none text-center font-teko text-[18vw] leading-[0.75] tracking-[0.14em] text-foreground/[0.05]"
        >
          SUNSEEKER
        </div>


        <div className="relative mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-10 bg-gold/70" />
            Miami Beach Marina · Flagship Fleet
          </div>

          <h1 className="mt-5 font-teko text-[clamp(3.2rem,11vw,9rem)] font-bold uppercase leading-[0.85] tracking-[0.04em]">
            Royal Sunseeker
            <span className="block text-gold">&lsquo;SMU&rsquo; · 80FT</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A British-built flagship sport yacht, crewed and provisioned for thirteen guests.
            Golden hour on Biscayne Bay, exactly as it should be done.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-caption">From</div>
              <div className="font-teko text-5xl font-bold leading-none tracking-[0.03em] text-gold">
                $4,700
                <span className="ml-2 font-sans text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  / 4 hrs
                </span>
              </div>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[50px] items-center justify-center rounded-full bg-gold px-9 text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-foreground transition-all duration-300 hover:opacity-90 hover:shadow-[0_10px_40px_rgba(198,165,92,0.4)]"
            >
              Book via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ---------- SPEC STRIP ---------- */}
      <section className="border-y border-border bg-section-alt">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
          {[
            { icon: Ship, label: "Length", value: "80 ft" },
            { icon: Users, label: "Guests", value: "Up to 13" },
            { icon: MapPin, label: "Marina", value: "Miami Beach" },
            { icon: Compass, label: "Crew", value: "Captain + Mate" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4 px-5 py-7 md:px-8 md:py-9">
              <s.icon className="h-5 w-5 shrink-0 text-gold" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[0.25em] text-caption">{s.label}</div>
                <div className="truncate font-teko text-3xl font-semibold leading-none tracking-[0.03em]">
                  {s.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- MAIN GRID: GALLERY + STICKY BOOKING ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
          <div className="min-w-0">
            {/* Gallery — mosaic */}
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <SectionLabel>Portfolio</SectionLabel>
                <h2 className="mt-3 font-teko text-4xl font-bold uppercase tracking-[0.06em] md:text-5xl">
                  The <span className="text-gold">gallery</span>
                </h2>
              </div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-caption">
                {ALL_PHOTOS.length} photographs
              </div>
            </div>
            <div className="grid auto-rows-[150px] grid-cols-2 gap-3 md:auto-rows-[170px] md:grid-cols-6">
              {GALLERY.map((g, i) => (
                <figure
                  key={g.alt}
                  className={`group relative overflow-hidden rounded-[16px] border border-border bg-card ${g.span} ${
                    i === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setLightboxIndex(i);
                      setLightboxOpen(true);
                    }}
                    aria-label={`Open gallery — ${g.alt}`}
                    className="absolute inset-0 z-10 h-full w-full cursor-zoom-in"
                  />
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
                  {i === GALLERY.length - 1 ? (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/55">
                      <span className="rounded-pill border border-gold px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-gold-foreground">
                        View all {ALL_PHOTOS.length} photos
                      </span>
                    </div>
                  ) : (
                    <figcaption className="pointer-events-none absolute inset-x-4 bottom-3 translate-y-2 text-[10px] uppercase tracking-[0.22em] text-foreground/85 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {g.alt}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>



            {/* Trust row */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Star, title: "4.9 ★ Rating", copy: "412 verified charters" },
                { icon: ShieldCheck, title: "Licensed & Insured", copy: "USCG-certified captain" },
                { icon: Clock, title: "Fast Response", copy: "WhatsApp replies in minutes" },
              ].map((t) => (
                <div
                  key={t.title}
                  className="rounded-[16px] border border-border bg-card px-5 py-5"
                >
                  <t.icon className="h-5 w-5 text-gold" />
                  <div className="mt-3 font-teko text-2xl font-semibold uppercase tracking-[0.08em]">
                    {t.title}
                  </div>
                  <div className="text-sm text-muted-foreground">{t.copy}</div>
                </div>
              ))}
            </div>

            {/* Included */}
            <div className="mt-14">
              <SectionLabel>All-Inclusive</SectionLabel>
              <h2 className="mt-3 font-teko text-4xl font-bold uppercase tracking-[0.06em] md:text-5xl">
                Included in every charter
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Professional captain & crew",
                  "Soft drinks",
                  "Water & ice",
                  "Towels",
                ].map((i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-[12px] border border-border bg-section-alt px-4 py-3.5 text-sm"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky booking panel */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-[16px] border border-gold/25 bg-card shadow-luxe">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="p-6 md:p-7">
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold">
                  Reserve this yacht
                </div>

                <div className="mt-4 flex items-end gap-2">
                  <div className="font-teko text-6xl font-bold leading-none tracking-[0.02em]">
                    {usd(duration.price)}
                  </div>
                  <div className="pb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    / {duration.hours} hrs
                  </div>
                </div>
                <div className="mt-1 text-xs text-caption">
                  All-inclusive · Captain & crew · No hidden fees
                </div>

                <div className="mt-6 text-[10px] uppercase tracking-[0.25em] text-caption">
                  Duration
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {DURATIONS.map((d) => (
                    <button
                      key={d.hours}
                      onClick={() => setDuration(d)}
                      className={`rounded-full border py-2.5 font-teko text-xl font-semibold tracking-[0.06em] transition-all duration-300 ${
                        d.hours === duration.hours
                          ? "border-gold bg-gold text-gold-foreground"
                          : "border-border text-foreground/70 hover:border-gold/50 hover:text-gold"
                      }`}
                    >
                      {d.hours} HR
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-center text-[11px] uppercase tracking-[0.2em] text-gold/80">
                  {duration.note}
                </div>

                <div className="mt-5 text-[10px] uppercase tracking-[0.25em] text-caption">
                  Charter date
                </div>
                <div className="relative mt-2">
                  <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-12 w-full rounded-[12px] border border-border bg-section-alt pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-gold focus:ring-[3px] focus:ring-gold/20"
                  />
                </div>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex h-[50px] w-full items-center justify-center rounded-full bg-gold text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-foreground transition-all duration-300 hover:opacity-90 hover:shadow-[0_10px_40px_rgba(198,165,92,0.4)]"
                >
                  Book via WhatsApp
                </a>
                <div className="mt-3 text-center text-[11px] text-caption">
                  No online checkout — a charter advisor confirms availability directly.
                </div>

                <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
                  {DURATIONS.map((d) => (
                    <div key={d.hours} className="flex justify-between text-muted-foreground">
                      <span>{d.label}</span>
                      <span
                        className={
                          d.hours === duration.hours ? "font-semibold text-gold" : "text-foreground/80"
                        }
                      >
                        {usd(d.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>


      {/* ---------- PHOTO BREAKER 1 ---------- */}
      <PhotoBreaker
        src={breakerGoldenImg}
        alt="Aerial view of Biscayne Bay at golden hour with a luxury yacht cutting across the water"
        eyebrow="Biscayne Bay"
        line="Golden hour, exactly on time."
      />

      {/* ---------- AMENITIES ---------- */}
      <section className="border-y border-border bg-section-alt py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            {/* Photo side */}
            <div className="relative">
              <img
                src={amenitiesImg}
                alt="Sun deck loungers, champagne and the jetski at the swim platform"
                loading="lazy"
                width={1024}
                height={1280}
                className="aspect-[4/5] w-full rounded-[16px] border border-border object-cover shadow-luxe"
              />
              <img
                src={detailJetskiImg}
                alt="Jetski riding alongside the yacht"
                loading="lazy"
                width={1024}
                height={1280}
                className="absolute -bottom-8 -right-4 hidden w-40 rounded-[16px] border border-gold/30 object-cover shadow-luxe lg:block"
              />
            </div>

            {/* Copy + amenities */}
            <div>
              <SectionLabel>Onboard</SectionLabel>
              <h2 className="mt-3 max-w-2xl font-teko text-5xl font-bold uppercase leading-[0.95] tracking-[0.06em] md:text-6xl">
                Amenities &amp; <span className="text-gold">water toys</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                Everything aboard is set before you arrive — toys fueled, deck dressed, salon
                chilled.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {AMENITIES.map((a) => (
                  <div
                    key={a.title}
                    className="group relative overflow-hidden rounded-[16px] border border-border bg-card p-5 transition-all duration-500 hover:border-gold/40 hover:shadow-card"
                  >
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/[0.07] blur-2xl transition-opacity duration-500 group-hover:bg-gold/[0.16]" />
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold">
                      <a.icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="mt-4 font-teko text-2xl font-semibold uppercase tracking-[0.08em]">
                      {a.title}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Add-ons */}
          <div className="mt-16">
            <SectionLabel>Enhance your charter</SectionLabel>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {ADDONS.map((a) => (
                <div
                  key={a.title}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 rounded-[16px] border border-border bg-background p-6 transition-colors duration-300 hover:border-gold/40"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="font-teko text-2xl font-semibold uppercase tracking-[0.08em]">
                        {a.title}
                      </div>
                      <div className="text-xs uppercase tracking-[0.15em] text-gold">{a.price}</div>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{a.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TIMELINE ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <SectionLabel>The day</SectionLabel>
        <h2 className="mt-3 font-teko text-5xl font-bold uppercase tracking-[0.06em] md:text-6xl">
          What to expect
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TIMELINE.map((t) => (
            <article
              key={t.step}
              className="group overflow-hidden rounded-[16px] border border-border bg-card transition-all duration-500 hover:border-gold/40 hover:shadow-luxe"
            >
              <div className="relative overflow-hidden">
                <img
                  src={t.img}
                  alt={t.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:aspect-[3/4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <div className="absolute left-5 top-4 font-teko text-5xl font-bold leading-none tracking-[0.02em] text-gold/80">
                  {t.step}
                </div>
              </div>
              <div className="p-5">
                <div className="font-teko text-2xl font-semibold uppercase tracking-[0.1em]">
                  {t.title}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- PHOTO BREAKER 2 ---------- */}
      <PhotoBreaker
        src={breakerSkylineImg}
        alt="Miami downtown skyline at blue hour seen from the bow of a yacht"
        eyebrow="Downtown Miami"
        line="The skyline, from the only seat that matters."
      />


      {/* ---------- CINEMATIC VIDEO (conditional: renders as a still breaker when no videoSrc) ---------- */}
      <VideoBlock
        poster={videoPosterImg}
        posterAlt="Royal Sunseeker SMU crossing Biscayne Bay against the Miami skyline at dusk"
        videoSrc={SMU_VIDEO_SRC}
        eyebrow="The film"
        headline="SMU on the water"
        caption={SMU_VIDEO_SRC ? "SMU on the water — 0:45" : "Biscayne Bay, golden hour"}
      />

      {/* ---------- ABOUT / HERITAGE ---------- */}
      <section className="relative border-y border-border bg-section-deep py-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <img
              src={aerialImg}
              alt="Royal Sunseeker SMU anchored off Miami at dusk"
              loading="lazy"
              width={1200}
              height={912}
              className="w-full rounded-[16px] border border-border object-cover shadow-luxe"
            />
            <div className="absolute -bottom-6 -right-2 hidden rounded-[16px] border border-gold/30 bg-background/90 px-6 py-5 backdrop-blur-md md:block">
              <div className="font-teko text-4xl font-bold leading-none tracking-[0.04em] text-gold">
                1969
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-caption">
                Sunseeker · Poole, UK
              </div>
            </div>
          </div>

          <div>
            <SectionLabel>Heritage</SectionLabel>
            <h2 className="mt-3 font-teko text-5xl font-bold uppercase leading-[0.95] tracking-[0.06em] md:text-6xl">
              Built by <span className="text-gold">Sunseeker</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              &lsquo;SMU&rsquo; comes from Sunseeker&rsquo;s flagship sport yacht line — the British
              yard whose hulls defined the modern performance cruiser. Eighty feet of hand-finished
              joinery, deep-vee bluewater handling and a profile that reads as unmistakably
              Sunseeker from a mile down the channel.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              On the water she is quiet, dry and fast: a climate-controlled salon for thirteen, a
              full-beam sun deck for the golden hour, and a hydraulic swim platform that turns the
              sandbar into a private beach club.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
              {[
                { k: "Line", v: "Flagship Sport" },
                { k: "Yard", v: "Poole, UK" },
                { k: "Cruise", v: "Biscayne Bay" },
              ].map((x) => (
                <div key={x.k}>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-caption">{x.k}</div>
                  <div className="mt-1 font-teko text-2xl font-semibold uppercase tracking-[0.06em]">
                    {x.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- SIMILAR YACHTS ---------- */}
      <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <SectionLabel>Also in the fleet</SectionLabel>
            <h2 className="mt-3 font-teko text-5xl font-bold uppercase tracking-[0.06em] md:text-6xl">
              Similar yachts
            </h2>
          </div>
          <Anchor className="h-6 w-6 shrink-0 text-gold/50" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SIMILAR.map((y) => (
            <article
              key={y.name}
              className="group overflow-hidden rounded-[16px] border border-border bg-card transition-all duration-500 hover:border-gold/40 hover:shadow-luxe"
            >
              <div className="relative overflow-hidden">
                <img
                  src={y.img}
                  alt={y.name}
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="font-teko text-3xl font-semibold uppercase tracking-[0.08em]">
                  {y.name}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-caption">
                  {y.size} ft · up to {y.guests} guests
                </div>
                <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <div className="min-w-0">
                    <span className="font-teko text-3xl font-bold tracking-[0.02em] text-gold">
                      {usd(y.price)}
                    </span>
                    <span className="ml-2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                      / 4 hrs
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                      `Hi Royal Yachts Miami — I'm interested in the ${y.name}.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-full border border-gold/40 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors duration-300 hover:bg-gold hover:text-gold-foreground"
                  >
                    Enquire
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />

      <GalleryLightbox
        photos={ALL_PHOTOS}
        startIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />


      {/* ---------- MOBILE STICKY BAR ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-background/95 backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3">
          <div className="min-w-0">
            <div className="font-teko text-3xl font-bold leading-none tracking-[0.02em]">
              {usd(duration.price)}
              <span className="ml-2 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                / {duration.hours} hrs
              </span>
            </div>
            <div className="truncate text-[10px] uppercase tracking-[0.2em] text-caption">
              80 ft · 13 guests · all-inclusive
            </div>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-gold px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-foreground"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="h-20 lg:hidden" />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
      <span className="h-px w-8 bg-gold/60" />
      {children}
    </div>
  );
}

function PhotoBreaker({
  src,
  alt,
  eyebrow,
  line,
}: {
  src: string;
  alt: string;
  eyebrow: string;
  line: string;
}) {
  return (
    <section className="relative h-[60vh] min-h-[380px] w-full overflow-hidden md:h-[75vh]">
      <div className="absolute inset-0 md:bg-fixed md:bg-cover md:bg-center" style={{ backgroundImage: `url(${src})` }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          width={1920}
          height={1088}
          className="h-full w-full object-cover md:hidden"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-background/60" />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-12 md:px-8 md:pb-16">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
          <span className="h-px w-10 bg-gold/70" />
          {eyebrow}
        </div>
        <p className="mt-4 max-w-3xl font-teko text-[clamp(2.2rem,6vw,5rem)] font-bold uppercase leading-[0.9] tracking-[0.05em]">
          {line}
        </p>
      </div>
    </section>
  );
}

