import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_yachts",
  title: "List yachts",
  description:
    "List yachts in the Royal Yachts Miami fleet with size, capacity and pricing.",
  inputSchema: {
    featured_only: z
      .boolean()
      .optional()
      .describe("Only return yachts flagged as featured."),
    limit: z.number().int().optional().describe("Max rows to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ featured_only, limit }, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("yachts")
      .select(
        "id, name, slug_en, size_ft, capacity, category, featured, price_4h, price_original_4h, price_per_day, hero_image, description_en",
      )
      .eq("active", true)
      .order("sort_order")
      .limit(Math.min(Math.max(limit ?? 20, 1), 100));
    if (featured_only) query = query.eq("featured", true);
    const { data, error } = await query;
    if (error)
      return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { yachts: data ?? [] },
    };
  },
});
