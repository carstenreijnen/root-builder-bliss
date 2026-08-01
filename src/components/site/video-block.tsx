import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Conditional cinematic video block.
 * - With `videoSrc`: poster + gold play button, click-to-play inline.
 * - Without `videoSrc`: the section renders as a still cinematic breaker
 *   (no play affordance) so a yacht with no video still looks intentional.
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
  const hasVideo = Boolean(videoSrc);

  return (
    <section className="relative w-full overflow-hidden border-y border-border bg-section-deep">
      <div className="relative aspect-[16/9] max-h-[80vh] w-full">
        {playing && videoSrc ? (
          <video
            src={videoSrc}
            poster={poster}
            controls
            autoPlay
            playsInline
            className="h-full w-full bg-background object-cover"
          />
        ) : (
          <>
            <img
              src={poster}
              alt={posterAlt}
              loading="lazy"
              width={1920}
              height={1080}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/45" />

            {hasVideo && (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play video — ${headline}`}
                className="group absolute inset-0 flex items-center justify-center"
              >
                <span className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold/70 bg-background/25 backdrop-blur-[2px] transition-all duration-500 group-hover:scale-105 group-hover:bg-gold md:h-28 md:w-28">
                  <span className="absolute inset-0 rounded-full border border-gold/30" />
                  <Play className="ml-1 h-8 w-8 fill-gold text-gold transition-colors duration-500 group-hover:fill-gold-foreground group-hover:text-gold-foreground" />
                </span>
              </button>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-10 md:px-8 md:pb-14">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-gold">
                <span className="h-px w-10 bg-gold/70" />
                {eyebrow}
              </div>
              <h2 className="mt-4 max-w-3xl font-teko text-[clamp(2rem,5vw,4.2rem)] font-bold uppercase leading-[0.95] tracking-[0.06em]">
                {headline}
              </h2>
              {caption && (
                <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-caption">{caption}</p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
