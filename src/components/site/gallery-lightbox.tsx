import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxPhoto = { src: string; alt: string };

export function GalleryLightbox({
  photos,
  startIndex = 0,
  open,
  onClose,
}: {
  photos: LightboxPhoto[];
  startIndex?: number;
  open: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % photos.length),
    [photos.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + photos.length) % photos.length),
    [photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, next, prev, onClose]);

  if (!open) return null;
  const current = photos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Yacht photo gallery"
      className="fixed inset-0 z-[100] flex flex-col bg-background/98 backdrop-blur-sm"
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4 md:px-8">
        <div className="text-[11px] uppercase tracking-[0.25em] text-caption">
          <span className="text-gold">{String(index + 1).padStart(2, "0")}</span> / {photos.length}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors hover:bg-gold hover:text-gold-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Stage */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 py-5 md:px-16">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-2 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-border bg-card/80 text-foreground transition-colors hover:border-gold hover:text-gold md:flex"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <figure className="flex h-full max-h-full w-full flex-col items-center justify-center">
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[70vh] w-auto max-w-full rounded-[16px] object-contain"
          />
          <figcaption className="mt-4 px-4 text-center text-[11px] uppercase tracking-[0.22em] text-caption">
            {current.alt}
          </figcaption>
        </figure>
        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="absolute right-2 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-border bg-card/80 text-foreground transition-colors hover:border-gold hover:text-gold md:flex"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="border-t border-border px-4 py-4 md:px-8">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {photos.map((p, i) => (
            <button
              key={`${p.src}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View photo ${i + 1}`}
              aria-current={i === index}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-[10px] border transition-opacity ${
                i === index ? "border-gold opacity-100" : "border-border opacity-50 hover:opacity-90"
              }`}
            >
              <img src={p.src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
