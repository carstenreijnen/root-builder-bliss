import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_testimonials",
  title: "List testimonials",
  description: "List published guest testimonials with ratings.",
  inputSchema: {
    limit: z.number().int().optional().describe("Max rows to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, name, rating, body_en, sort_order")
      .eq("active", true)
      .order("sort_order")
      .limit(Math.min(Math.max(limit ?? 20, 1), 100));
    if (error)
      return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { testimonials: data ?? [] },
    };
  },
});
