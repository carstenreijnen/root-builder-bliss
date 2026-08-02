import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function BookingRequestModal({
  open,
  onClose,
  yachtName,
  duration,
  date,
}: {
  open: boolean;
  onClose: () => void;
  yachtName: string;
  duration: string;
  date: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    message: "",
  });

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

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2 || !form.email.includes("@") || form.phone.trim().length < 5) {
      toast.error("Please add your name, a valid email and a phone number.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("inquiries").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      date: date || null,
      duration,
      yacht_preference: yachtName,
      guests: form.guests ? Number(form.guests) : null,
      message: form.message.trim() || null,
      source_page: "yacht-royal-sunseeker-smu",
      language: "en",
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not send your request. Please try again.");
      return;
    }
    toast.success("Request sent — a charter advisor will reply shortly.");
    setForm({ name: "", email: "", phone: "", guests: "", message: "" });
    onClose();
  };

  const inputCls =
    "h-12 w-full rounded-[12px] border border-border bg-section-alt px-4 text-sm text-foreground outline-none transition focus:border-gold focus:ring-[3px] focus:ring-gold/20";
  const labelCls = "text-[10px] uppercase tracking-[0.25em] text-caption";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Charter request form"
      className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto bg-background/85 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-lg rounded-[16px] border border-gold/25 bg-card shadow-luxe">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-border p-6">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Request a charter</div>
            <h2 className="mt-2 font-teko text-3xl font-bold uppercase leading-none tracking-[0.06em]">
              {yachtName}
            </h2>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-caption">
              {duration}
              {date ? ` · ${date}` : " · date to confirm"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-gold-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="space-y-2">
            <div className={labelCls}>Full name</div>
            <input value={form.name} onChange={set("name")} className={inputCls} placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <div className={labelCls}>Email</div>
            <input value={form.email} onChange={set("email")} type="email" className={inputCls} placeholder="you@email.com" />
          </div>
          <div className="space-y-2">
            <div className={labelCls}>Phone</div>
            <input value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+1 ..." />
          </div>
          <div className="space-y-2">
            <div className={labelCls}>Guests</div>
            <input value={form.guests} onChange={set("guests")} type="number" min={1} max={13} className={inputCls} placeholder="Max 13" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <div className={labelCls}>Message</div>
            <textarea
              value={form.message}
              onChange={set("message")}
              rows={4}
              className={`${inputCls} h-auto min-h-[110px] py-3`}
              placeholder="Occasion, preferred departure time, add-ons..."
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="sm:col-span-2 mt-1 flex h-[50px] w-full items-center justify-center rounded-full bg-gold text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-foreground transition-all duration-300 hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send request"}
          </button>
        </form>
      </div>
    </div>
  );
}
