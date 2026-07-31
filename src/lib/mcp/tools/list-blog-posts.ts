import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description:
    "List published blog posts. Set include_body to true to return full article text.",
  inputSchema: {
    include_body: z
      .boolean()
      .optional()
      .describe("Include the full article body in the response."),
    limit: z.number().int().optional().describe("Max rows to return (default 10)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ include_body, limit }, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const supabase = supabaseForUser(ctx);
    const cols = include_body
      ? "id, slug, title_en, author, published_at, featured_image, body_en"
      : "id, slug, title_en, author, published_at, featured_image";
    const { data, error } = await supabase
      .from("blogs")
      .select(cols)
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(Math.min(Math.max(limit ?? 10, 1), 50));
    if (error)
      return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { posts: data ?? [] },
    };
  },
});
