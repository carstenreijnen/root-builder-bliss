import { useEffect } from "react";
import { X, MessageCircle, Phone, Mail, MessageSquare, ClipboardList, ArrowRight } from "lucide-react";

export const CONTACT = {
  whatsapp: "https://wa.me/16452399662",
  phone: "+16452149666",
  phoneLabel: "+1 (645) 214-9666",
  whatsappLabel: "+1 (645) 239-9662",
  email: "info@royalyachtsmiami.com",
};

const CHANNELS = [
  {
    key: "whatsapp",
    icon: MessageCircle,
    title: "WhatsApp",
    copy: "Fastest reply, usually within minutes",
    href: CONTACT.whatsapp,
    external: true,
    featured: true,
  },
  {
    key: "call",
    icon: Phone,
    title: "Call us",
    copy: CONTACT.phoneLabel,
    href: `tel:${CONTACT.phone}`,
    external: false,
    featured: false,
  },
  {
    key: "email",
    icon: Mail,
    title: "Email",
    copy: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    external: false,
    featured: false,
  },
  {
    key: "imessage",
    icon: MessageSquare,
    title: "iMessage",
    copy: "Text us from your iPhone",
    href: `sms:${CONTACT.phone}`,
    external: false,
    featured: false,
  },
  {
    key: "form",
    icon: ClipboardList,
    title: "Booking form",
    copy: "Send full charter details for a written quote",
    href: "/#reserve",
    external: false,
    featured: false,
  },
];

export function BookNowModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Choose how to reach Royal Yachts Miami"
      className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-xl rounded-[16px] border border-gold/25 bg-navy text-navy-foreground shadow-luxe">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="flex items-start justify-between gap-4 border-b border-navy-border p-6">
          <div>
            <div className="font-teko text-[12px] font-bold uppercase tracking-[0.24em] text-gold">
              Book now
            </div>
            <h2 className="mt-2 font-display text-2xl md:text-3xl">Reach us your way</h2>
            <p className="mt-2 text-sm text-navy-foreground/65">
              A charter advisor answers every channel, seven days a week.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-gold-foreground"
          >
            <X className="h-4 w-4" strokeWidth={1.25} />
          </button>
        </div>

        <div className="grid gap-3 p-6">
          {CHANNELS.map(({ key, icon: Icon, title, copy, href, external, featured }) => (
            <a
              key={key}
              href={href}
              onClick={onClose}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`group flex items-center gap-4 rounded-[12px] border px-5 py-4 transition-all duration-300 ${
                featured
                  ? "border-gold bg-gold text-gold-foreground hover:shadow-[0_8px_30px_rgba(186,163,108,0.35)]"
                  : "border-navy-border bg-navy-foreground/[0.04] hover:border-gold/50"
              }`}
            >
              <Icon
                className={`h-5 w-5 shrink-0 ${featured ? "" : "text-gold"}`}
                strokeWidth={1.25}
              />
              <span className="min-w-0 flex-1">
                <span className="block font-teko text-[17px] font-bold uppercase tracking-[0.12em]">
                  {title}
                </span>
                <span
                  className={`block truncate text-[13px] ${
                    featured ? "text-gold-foreground/75" : "text-navy-foreground/60"
                  }`}
                >
                  {copy}
                </span>
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 opacity-50 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.25}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
