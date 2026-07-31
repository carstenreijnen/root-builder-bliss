import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "create_inquiry",
  title: "Create charter inquiry",
  description:
    "Submit a charter inquiry, the same as the website booking form. Use only with details the guest provided.",
  inputSchema: {
    name: z.string().trim().describe("Guest full name."),
    email: z.string().trim().describe("Guest email address."),
    phone: z.string().trim().optional().describe("Guest phone number."),
    date: z.string().optional().describe("Requested charter date, YYYY-MM-DD."),
    duration: z.string().optional().describe("Charter duration, e.g. '4 Hours'."),
    guests: z.number().int().optional().describe("Number of guests."),
    departure_time: z
      .string()
      .optional()
      .describe("Preferred departure: Morning, Midday, Sunset or Evening."),
    yacht_preference: z.string().optional().describe("Preferred yacht name."),
    message: z.string().optional().describe("Additional notes from the guest."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    if (!input.name || input.name.length < 2)
      return { content: [{ type: "text", text: "A guest name is required." }], isError: true };
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.email))
      return { content: [{ type: "text", text: "A valid email is required." }], isError: true };

    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("inquiries")
      .insert({
        name: input.name.slice(0, 100),
        email: input.email.slice(0, 255),
        phone: input.phone?.slice(0, 40) ?? null,
        date: input.date || null,
        duration: input.duration || null,
        guests: input.guests ?? null,
        departure_time: input.departure_time || null,
        yacht_preference: input.yacht_preference || null,
        message: input.message?.slice(0, 1000) ?? null,
        source_page: "mcp",
        language: "en",
      })
      .select("id, created_at, name, email");
    if (error)
      return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data?.[0] ?? {}) }],
      structuredContent: { inquiry: data?.[0] ?? null },
    };
  },
});
