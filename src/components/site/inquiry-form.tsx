import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().trim().min(2, "Name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(5, "Phone required").max(40),
  date: z.string().optional(),
  duration: z.string().optional(),
  yacht_preference: z.string().optional(),
  guests: z.coerce.number().int().min(1).max(200).optional(),
  departure_time: z.string().optional(),
  message: z.string().max(1000).optional(),
});

type FormValues = z.infer<typeof schema>;

const DURATIONS = ["4 Hours", "5 Hours", "6 Hours", "7 Hours", "8 Hours"];
const DEPARTURES = ["Morning", "Midday", "Sunset", "Evening"];

export function InquiryForm() {
  const navigate = useNavigate();
  const [yachts, setYachts] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    supabase
      .from("yachts")
      .select("name")
      .eq("active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) setYachts(data.map((y) => y.name));
      });
  }, []);

  const onSubmit = async (values: FormValues) => {
    const { error } = await supabase.from("inquiries").insert({
      name: values.name,
      email: values.email,
      phone: values.phone,
      date: values.date || null,
      duration: values.duration || null,
      yacht_preference: values.yacht_preference || null,
      guests: values.guests ?? null,
      departure_time: values.departure_time || null,
      message: values.message || null,
      source_page: "homepage",
      language: "en",
    });
    if (error) {
      toast.error("Could not submit. Please try again.");
      return;
    }
    reset();
    navigate({ to: "/thank-you" });
  };

  const duration = watch("duration");
  const yachtPref = watch("yacht_preference");
  const departure = watch("departure_time");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
      <Field label="Full Name" error={errors.name?.message}>
        <Input {...register("name")} placeholder="Your name" className="luxe-input" />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <Input {...register("email")} type="email" placeholder="you@email.com" className="luxe-input" />
      </Field>
      <Field label="Phone" error={errors.phone?.message}>
        <Input {...register("phone")} placeholder="+1 ..." className="luxe-input" />
      </Field>
      <Field label="Date">
        <Input {...register("date")} type="date" className="luxe-input" />
      </Field>
      <Field label="Duration">
        <Select value={duration} onValueChange={(v) => setValue("duration", v)}>
          <SelectTrigger className="luxe-input"><SelectValue placeholder="Select duration" /></SelectTrigger>
          <SelectContent>{DURATIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
        </Select>
      </Field>
      <Field label="Yacht Preference">
        <Select value={yachtPref} onValueChange={(v) => setValue("yacht_preference", v)}>
          <SelectTrigger className="luxe-input"><SelectValue placeholder="No preference" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">No preference</SelectItem>
            {yachts.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Guests">
        <Input {...register("guests")} type="number" min={1} max={13} placeholder="Max 13" className="luxe-input" />
      </Field>
      <Field label="Departure">
        <Select value={departure} onValueChange={(v) => setValue("departure_time", v)}>
          <SelectTrigger className="luxe-input"><SelectValue placeholder="Select time" /></SelectTrigger>
          <SelectContent>{DEPARTURES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
        </Select>
      </Field>
      <div className="md:col-span-2">
        <Field label="Message (optional)">
          <Textarea {...register("message")} rows={4} placeholder="Tell us about your event..." className="luxe-input min-h-[110px]" />
        </Field>
      </div>
      <div className="md:col-span-2 mt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-gold-foreground transition-all duration-300 hover:opacity-90 hover:shadow-[0_8px_32px_rgba(186,163,108,0.35)] disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Request Your Charter"}
        </button>
      </div>
      <style>{`
        .luxe-input {
          background: color-mix(in oklab, var(--color-foreground) 4%, transparent);
          border: 1px solid color-mix(in oklab, var(--color-foreground) 12%, transparent);
          color: var(--color-foreground);
          border-radius: 12px;
          height: 48px;
          padding-left: 16px;
          padding-right: 16px;
          font-size: 15px;
          transition: all 0.3s ease;
        }
        .luxe-input::placeholder { color: color-mix(in oklab, var(--color-foreground) 35%, transparent); }
        .luxe-input:focus,
        .luxe-input:focus-visible {
          border-color: var(--color-gold);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-gold) 18%, transparent);
          outline: none;
        }
        textarea.luxe-input { height: auto; padding-top: 12px; padding-bottom: 12px; }
      `}</style>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
