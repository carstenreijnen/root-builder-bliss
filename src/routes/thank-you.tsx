import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You — Royal Yachts Miami" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="flex min-h-[80vh] items-center justify-center px-6 pt-32">
        <div className="max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Inquiry received
          </p>
          <h1 className="mt-6 font-display text-5xl text-foreground md:text-6xl">
            Thank you
          </h1>
          <p className="mt-6 text-base leading-relaxed text-foreground/70">
            Our concierge team will reach out within the hour to confirm your charter
            details. For immediate assistance, message us on WhatsApp.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/16452149666"
              className="rounded-sm bg-gold px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-gold-foreground hover:bg-gold/90"
            >
              WhatsApp Us
            </a>
            <Link
              to="/"
              className="rounded-sm border border-foreground/20 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground/80 hover:border-gold hover:text-gold"
            >
              Back home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
