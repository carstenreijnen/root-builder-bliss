import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const DURATIONS = [
  "4 Hours (Half day)",
  "5 Hours",
  "6 Hours",
  "7 Hours",
  "8 Hours (Full day)",
];

export const FLEET_NAMES = [
  "Sunseeker 96ft",
  "Sunseeker 80ft 'SMU'",
  "Azimut 78ft",
  "Ferretti 72ft",
  "Prestige 62ft",
  "Galeon 55ft",
  "Cranchi 50ft",
  "Sea Ray 45ft",
  "Not sure yet",
];

const fieldCls =
  "h-[52px] w-full rounded-[12px] border border-border bg-background/60 px-4 text-[15px] text-foreground outline-none transition focus:border-gold focus:ring-[3px] focus:ring-gold/20";
const labelCls = "text-[10px] uppercase tracking-[0.28em] text-caption";

export function QuoteForm() {
  const [date, setDate] = useState<Date | undefined>();
  const [duration, setDuration] = useState<string>();
  const [yacht, setYacht] = useState<string>();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
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
      date: date ? format(date, "yyyy-MM-dd") : null,
      duration: duration ?? null,
      yacht_preference: yacht ?? null,
      source_page: "homepage",
      language: "en",
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not send your request. Please try again.");
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[16px] border border-gold/30 bg-card px-6 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold">
          <Check className="h-7 w-7" strokeWidth={1.25} />
        </div>
        <h3 className="mt-6 font-teko text-4xl font-bold uppercase tracking-[0.06em]">
          Request <span className="text-gold">received</span>
        </h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          A charter advisor will come back to you shortly with availability and a written quote.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setForm({ name: "", email: "", phone: "" });
            setDate(undefined);
            setDuration(undefined);
            setYacht(undefined);
          }}
          className="mt-8 font-teko text-[13px] font-bold uppercase tracking-[0.2em] text-gold"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <div className={labelCls}>Date</div>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(fieldCls, "flex items-center gap-3 text-left")}
            >
              <CalendarIcon className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} />
              <span className={date ? "" : "text-muted-foreground"}>
                {date ? format(date, "PPP") : "Select a date"}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <div className={labelCls}>Duration</div>
        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger className={fieldCls}>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            {DURATIONS.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 md:col-span-2">
        <div className={labelCls}>Yacht</div>
        <Select value={yacht} onValueChange={setYacht}>
          <SelectTrigger className={fieldCls}>
            <SelectValue placeholder="Select a yacht" />
          </SelectTrigger>
          <SelectContent>
            {FLEET_NAMES.map((n) => (
              <SelectItem key={n} value={n}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className={labelCls}>Full name</div>
        <input value={form.name} onChange={set("name")} className={fieldCls} placeholder="Your name" />
      </div>
      <div className="space-y-2">
        <div className={labelCls}>Email</div>
        <input
          value={form.email}
          onChange={set("email")}
          type="email"
          className={fieldCls}
          placeholder="you@email.com"
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <div className={labelCls}>Phone</div>
        <input value={form.phone} onChange={set("phone")} className={fieldCls} placeholder="+1 ..." />
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-gold px-10 font-teko text-[16px] font-bold uppercase tracking-[0.16em] text-gold-foreground transition-all duration-300 hover:shadow-[0_8px_30px_rgba(186,163,108,0.4)] disabled:opacity-60"
        >
          {submitting ? "Sending" : "Request a Quote"}
          {!submitting && <ArrowRight className="h-4 w-4" strokeWidth={1.25} />}
        </button>
      </div>
    </form>
  );
}
