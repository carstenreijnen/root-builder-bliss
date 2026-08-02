import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Contained 16:9 video player card, sized for the content column.
 * - With `videoSrc`: thumbnail + centered gold play button; click swaps to the player.
 * - Without `videoSrc`: the component renders nothing at all — a yacht with no
 *   film simply has no video section on the page.
 */
export function VideoBlock({
  poster,
  posterAlt,
  videoSrc,
  eyebrow = "Film",
  headline,
  caption,
}: {
  poster: string;
  posterAlt: string;
  videoSrc?: string;
  eyebrow?: string;
  headline: string;
  caption?: string;
}) {
  const [playing, setPlaying] = useState(false);

  // No film for this yacht → no section.
  if (!videoSrc) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-24">
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
        <span className="h-px w-8 bg-gold/60" />
        {eyebrow}
      </div>
      <h2 className="mt-3 font-teko text-4xl font-bold uppercase tracking-[0.06em] md:text-5xl">
        {headline}
      </h2>

      <div className="mt-6 overflow-hidden rounded-[16px] border border-border bg-card shadow-card">
        <div className="relative aspect-[16/9] w-full">
          {playing ? (
            <video
              src={videoSrc}
              poster={poster}
              controls
              autoPlay
              playsInline
              className="h-full w-full bg-background object-cover"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video — ${headline}`}
              className="group absolute inset-0 h-full w-full"
            >
              <img
                src={poster}
                alt={posterAlt}
                loading="lazy"
                width={1600}
                height={900}
                className="h-full w-full object-cover"
              />
              <span className="absolute inset-0 bg-background/25 transition-colors duration-500 group-hover:bg-background/35" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/70 bg-background/40 backdrop-blur-[2px] transition-all duration-500 group-hover:scale-105 group-hover:bg-gold">
                  <Play
                    strokeWidth={1.25}
                    className="ml-1 h-8 w-8 fill-gold text-gold transition-colors duration-500 group-hover:fill-gold-foreground group-hover:text-gold-foreground"
                  />
                </span>
              </span>
            </button>
          )}
        </div>
      </div>

      {caption && (
        <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-caption">{caption}</p>
      )}
    </section>
  );
}
