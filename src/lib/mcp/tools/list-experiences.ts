import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_experiences",
  title: "List experiences and add-ons",
  description:
    "List charter experience packages and optional add-ons offered by Royal Yachts Miami.",
  inputSchema: {
    kind: z
      .enum(["packages", "addons", "both"])
      .optional()
      .describe("Which catalog to return. Defaults to both."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ kind }, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const supabase = supabaseForUser(ctx);
    const want = kind ?? "both";
    const cols = "id, title_en, slug_en, description_en, hero_image, sort_order";
    const result: Record<string, unknown> = {};

    if (want === "packages" || want === "both") {
      const { data, error } = await supabase
        .from("experience_packages")
        .select(cols)
        .eq("active", true)
        .order("sort_order");
      if (error)
        return { content: [{ type: "text", text: error.message }], isError: true };
      result.packages = data ?? [];
    }
    if (want === "addons" || want === "both") {
      const { data, error } = await supabase
        .from("addons")
        .select(cols)
        .eq("active", true)
        .order("sort_order");
      if (error)
        return { content: [{ type: "text", text: error.message }], isError: true };
      result.addons = data ?? [];
    }

    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
      structuredContent: result,
    };
  },
});
