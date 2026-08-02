import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Anchor,
  CalendarDays,
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
// Real photography of the Royal Sunseeker 'SMU' (hotlinked from media storage).
const PHOTO_BASE =
  "https://xteonchtqeoppjxmlmgm.supabase.co/storage/v1/object/public/media/yachts/";
const heroImg = `${PHOTO_BASE}1785349407570-DJI_0115__2_.jpg`;
const deckImg = `${PHOTO_BASE}1785334643255-DJI_0143.jpg`;
const salonImg = `${PHOTO_BASE}1785334647774-DJI_0223.jpg`;
const swimImg = `${PHOTO_BASE}1785349404891-DJI_0110.jpg`;
const aerialImg = `${PHOTO_BASE}1785349403596-DJI_0198.jpg`;
const breakerGoldenImg = `${PHOTO_BASE}1785349406197-DJI_0161.jpg`;
const breakerSkylineImg = `${PHOTO_BASE}1785349414487-DJI_0139.jpg`;
const amenitiesImg = `${PHOTO_BASE}1785349413252-DJI_0119.jpg`;
const stepBoardingImg = `${PHOTO_BASE}1785349409091-DJI_0132__1_.jpg`;
const stepBriefingImg = `${PHOTO_BASE}1785349410325-DJI_0240.jpg`;
// Wake / under-way shots
const wakeCruiseImg = `${PHOTO_BASE}1785349411612-DJI_0187.jpg`;
const wakeReturnImg = deckImg;
// Anchored top-down with the floating mat
const anchoredMatImg = `${PHOTO_BASE}1785349400637-DJI_0170.jpg`;
const stepCruiseImg = wakeCruiseImg;
const stepSwimImg = anchoredMatImg;
const stepReturnImg = wakeReturnImg;
const detailInteriorImg = salonImg;
const videoPosterImg = aerialImg;
import smuFilm from "@/assets/smu-film.mp4.asset.json";
import addonCatering from "@/assets/addons/catering.jpg";
import addonWatersports from "@/assets/addons/watersports.jpg";
import addonDecoration from "@/assets/addons/decoration.jpg";
import addonDj from "@/assets/addons/dj.jpg";
import addonChef from "@/assets/addons/chef.jpg";
import addonHostess from "@/assets/addons/hostess.jpg";
import addonPhotographer from "@/assets/addons/photographer.jpg";
import addonTransport from "@/assets/addons/transport.jpg";
import addonBartender from "@/assets/addons/bartender.jpg";
import addonGuide from "@/assets/addons/guide.jpg";
import lifestyleJetski from "@/assets/lifestyle/jetski-turquoise.jpg";
import lifestyleFloatingMat from "@/assets/lifestyle/floating-mat.jpg";
import { GalleryLightbox, type LightboxPhoto } from "@/components/site/gallery-lightbox";
import { VideoBlock } from "@/components/site/video-block";

import { BookingRequestModal } from "@/components/site/booking-request-modal";

const WHATSAPP = "16452149666";

// Set to undefined for a yacht with no film — the video section then renders
// as an intentional still cinematic breaker (no play button).
const SMU_VIDEO_SRC: string | undefined = smuFilm.url;


const DURATIONS = [
  { hours: 4, price: 4700, label: "4 Hours", note: "Sunset classic" },
  { hours: 6, price: 5900, label: "6 Hours", note: "Most booked" },
  { hours: 8, price: 7200, label: "8 Hours", note: "Full day" },
] as const;

// The complete photo set for this yacht. Every photo here appears in the gallery
// (mosaic tiles + "View all" lightbox). Other sections reuse these same photos.
const ALL_PHOTOS: LightboxPhoto[] = [
  { src: heroImg, alt: "Royal Sunseeker SMU cruising off Miami Beach at golden hour" },
  { src: deckImg, alt: "Aerial view of the 80ft Sunseeker SMU under way off Miami" },
  { src: salonImg, alt: "Overhead drone view of SMU's deck layout and sun pads" },
  { src: swimImg, alt: "Drone shot of SMU cutting through turquoise Biscayne Bay water" },
  { src: aerialImg, alt: "Aerial view of SMU anchored off Miami" },
  { src: breakerGoldenImg, alt: "Golden hour aerial over Biscayne Bay" },
  { src: breakerSkylineImg, alt: "Downtown Miami skyline seen across the bay from SMU" },
  { src: amenitiesImg, alt: "Aerial view of SMU's bow and foredeck lounge" },
  { src: stepBoardingImg, alt: "SMU alongside at Miami Beach Marina" },
  { src: stepBriefingImg, alt: "Drone view of SMU with the crew preparing the deck" },
  { src: wakeCruiseImg, alt: "SMU at cruising speed with wake trailing behind" },
  { src: anchoredMatImg, alt: "Top-down view of SMU anchored with the floating mat deployed" },
];

// Mosaic tile spans — index-matched to ALL_PHOTOS.
const TILE_SPANS = [
  "md:col-span-4 md:row-span-2",
  "md:col-span-2 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-2 md:row-span-2",
  "md:col-span-4 md:row-span-2",
  "md:col-span-3 md:row-span-1",
  "md:col-span-3 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-2 md:row-span-1",
];
const GALLERY = ALL_PHOTOS.slice(0, TILE_SPANS.length).map((p, i) => ({
  ...p,
  span: TILE_SPANS[i],
}));



const AMENITIES = [
  { icon: Zap, title: "Jetski", copy: "Seadoo on the swim platform, fueled and ready." },
  { icon: Waves, title: "Floating Mat", copy: "Anchor-out lounge on the water." },
  { icon: Sparkles, title: "Sun Deck", copy: "Teak deck with double loungers." },
  { icon: Fan, title: "Full A/C", copy: "Climate-controlled salon and cabins." },
  { icon: Music4, title: "Premium Sound", copy: "Zoned audio, deck to salon, Bluetooth." },
  { icon: LifeBuoy, title: "Swim Platform", copy: "Hydraulic access straight to the water." },
  { icon: LifeBuoy, title: "Floats", copy: "Inflatable loungers for the sandbar." },
  { icon: Waves, title: "Floating Pool", copy: "Netted sea pool off the stern." },
];

const ADDONS = [
  { title: "Catering Services", copy: "Chef-curated seafood, sushi and grazing boards.", img: addonCatering },
  { title: "Watersport Activities", copy: "Jetskis, seabobs, floats and towables.", img: addonWatersports },
  { title: "Yacht Decoration", copy: "Florals, balloons and signage for the occasion.", img: addonDecoration },
  { title: "Private DJ", copy: "Live sets on deck, zoned sound, sunset to night.", img: addonDj },
  { title: "Private Chef", copy: "Plated multi-course dining aboard.", img: addonChef },
  { title: "Hostess & Wait Staff", copy: "Full service crew for your guests.", img: addonHostess },
  { title: "Photo & Video", copy: "Editorial coverage, edited gallery in 48h.", img: addonPhotographer },
  { title: "VIP Transport", copy: "Chauffeured arrivals from hotel or airport.", img: addonTransport },
  { title: "Private Bartender", copy: "Craft cocktails mixed to order onboard.", img: addonBartender },
  { title: "Private Tour Guide", copy: "Star Island stories and Miami landmarks.", img: addonGuide },
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
  const [formOpen, setFormOpen] = useState(false);

  

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
      <section className="relative min-h-[88svh] w-full overflow-hidden md:min-h-[92vh]">
        <img
          src={heroImg}
          alt="Royal Sunseeker SMU 80ft yacht cruising off Miami at golden hour"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Overlay only where the text sits — keeps the photo bright */}
        <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-background via-background/85 to-transparent md:h-[62%] md:via-background/70" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/70 to-transparent" />

        {/* oversized ghost wordmark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[22%] select-none text-center font-teko text-[18vw] leading-[0.75] tracking-[0.14em] text-foreground/[0.05]"
        >
          SUNSEEKER
        </div>


        <div className="relative mx-auto flex min-h-[88svh] max-w-[1400px] flex-col justify-end px-5 pb-14 pt-28 sm:pb-16 md:min-h-[92vh] md:px-8 md:pb-24 md:pt-32">
          {/* Localized soft scrim behind the text block only — the photo stays bright */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 h-[62%] w-full max-w-3xl rounded-t-[48px] bg-[radial-gradient(120%_100%_at_10%_100%,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.55)_45%,transparent_78%)] blur-[2px]"
          />
          <div className="relative flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-gold sm:text-[11px] sm:tracking-[0.3em]">
            <span className="h-px w-8 shrink-0 bg-gold/70 sm:w-10" />
            <span className="min-w-0 [text-shadow:0_1px_10px_rgba(0,0,0,0.8)]">
              Miami Beach Marina · Flagship Fleet
            </span>
          </div>


          <h1 className="relative mt-5 break-words font-teko text-[clamp(2.6rem,9.5vw,7.5rem)] font-bold uppercase leading-[0.85] tracking-[0.04em]">
            Royal Sunseeker
            <span className="block text-gold">&lsquo;SMU&rsquo; · 80FT</span>
          </h1>

          <p className="relative mt-6 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg">
            A British-built flagship sport yacht, crewed and provisioned for thirteen guests.
            Golden hour on Biscayne Bay, exactly as it should be done.
          </p>

          <div className="relative mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">

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
              <s.icon strokeWidth={1.25} className="h-7 w-7 shrink-0 text-gold" />
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
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-[2px]">
                      <span className="rounded-pill border border-foreground/80 bg-background/40 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors duration-500 group-hover:bg-foreground group-hover:text-background">
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
                  <t.icon strokeWidth={1.25} className="h-7 w-7 text-gold" />
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
                  "Water & ice",
                  "Towels",
                  "Water floats",
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
                  <CalendarDays strokeWidth={1.25} className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
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
                <button
                  type="button"
                  onClick={() => setFormOpen(true)}
                  className="mt-3 flex h-[50px] w-full items-center justify-center rounded-full border border-gold/50 text-[12px] font-semibold uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gold hover:text-gold-foreground"
                >
                  Request via booking form
                </button>
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
        eyebrow="Biscayne Bay · Miami"
      />

      {/* ---------- AMENITIES ---------- */}
      <section className="border-y border-border bg-section-alt py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            {/* Photo side */}
            <div className="relative">
              <img
                src={lifestyleJetski}
                alt="Guest riding a jetski across turquoise water beside Miami Beach"
                loading="lazy"
                width={1024}
                height={1280}
                className="aspect-[4/5] w-full rounded-[16px] border border-border object-cover shadow-luxe"
              />
              <img
                src={lifestyleFloatingMat}
                alt="Guests relaxing on a floating mat in turquoise water next to a luxury yacht"
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute -bottom-8 -right-4 hidden w-48 rounded-[16px] border border-gold/30 object-cover shadow-luxe lg:block"
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
                      <a.icon strokeWidth={1.25} className="h-5 w-5" />
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


          {/* Add-ons — curated service menu */}
          <div className="mt-20">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
              <div className="min-w-0">
                <SectionLabel>Enhance your charter</SectionLabel>
                <h3 className="mt-3 font-teko text-4xl font-bold uppercase tracking-[0.06em] md:text-5xl">
                  Popular <span className="text-gold">add-ons</span>
                </h3>
                              </div>
              <Sparkles strokeWidth={1.25} className="h-7 w-7 shrink-0 text-gold/50" />
            </div>

            <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5">
              {ADDONS.map((a) => (
                <a
                  key={a.title}
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                    `Hi Royal Yachts Miami — I'd like to add ${a.title} to my Royal Sunseeker 'SMU' charter.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block w-[74vw] shrink-0 snap-start overflow-hidden rounded-[16px] border border-border no-underline transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:no-underline hover:shadow-luxe sm:w-[46vw] md:w-auto"
                >
                  <img
                    src={a.img}
                    alt={a.title}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/80 via-45% to-background/15" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="font-teko text-2xl font-semibold uppercase leading-tight tracking-[0.08em] text-gold">
                      {a.title}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-foreground/70">{a.copy}</p>
                  </div>
                </a>
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
        alt="Miami downtown skyline in bright midday sun seen across turquoise Biscayne Bay"
        eyebrow="Miami Beach Marina"
      />


      {/* ---------- VIDEO (contained 16:9 card; the whole section disappears when a yacht has no film) ---------- */}
      <VideoBlock
        poster={videoPosterImg}
        posterAlt="Royal Sunseeker SMU crossing Biscayne Bay against the Miami skyline at dusk"
        videoSrc={SMU_VIDEO_SRC}
        eyebrow="The film"
        headline="SMU on the water"
        caption="SMU on the water — 0:45"
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
          <Anchor strokeWidth={1.25} className="h-7 w-7 shrink-0 text-gold/50" />
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


      <BookingRequestModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        yachtName="Royal Sunseeker 'SMU'"
        duration={duration.label}
        date={date}
      />

      {/* ---------- MOBILE STICKY BAR ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-5">
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
          <div className="flex shrink-0 flex-col items-stretch gap-1.5">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gold px-6 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-foreground"
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="rounded-full border border-gold/50 px-6 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-gold"
            >
              Booking form
            </button>
          </div>
        </div>
      </div>
      <div className="h-28 lg:hidden" />

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
}: {
  src: string;
  alt: string;
  eyebrow: string;
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
      </div>
    </section>
  );
}

