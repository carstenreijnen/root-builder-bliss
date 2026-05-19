import { createFileRoute } from "@tanstack/react-router";

// Spanish home route stub. Mirrors the English `/` route under `/es`.
// Real page is intentionally not built yet — only the routing foundation.
export const Route = createFileRoute("/es/")({
  component: EsIndex,
});

function EsIndex() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "#fcfbf8" }}
    >
      <img
        data-lovable-blank-page-placeholder="REMOVE_THIS"
        src="https://cdn.gpteng.co/blank-app-v1.svg"
        alt="Tu app vivirá aquí!"
      />
    </div>
  );
}
