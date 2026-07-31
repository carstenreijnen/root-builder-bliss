import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listYachts from "./tools/list-yachts";
import listExperiences from "./tools/list-experiences";
import listTestimonials from "./tools/list-testimonials";
import listBlogPosts from "./tools/list-blog-posts";
import listInquiries from "./tools/list-inquiries";
import createInquiry from "./tools/create-inquiry";

// The OAuth issuer must be the direct Supabase host; the project ref is the only
// value that survives publish unchanged.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "royal-yachts-miami",
  title: "Royal Yachts Miami",
  version: "0.1.0",
  instructions:
    "Tools for Royal Yachts Miami, a luxury Miami yacht charter company. Use `list_yachts`, `list_experiences`, `list_testimonials` and `list_blog_posts` to answer questions about the fleet, pricing and content. Use `create_inquiry` to submit a charter request, and `list_inquiries` to review submitted requests (admins only).",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listYachts,
    listExperiences,
    listTestimonials,
    listBlogPosts,
    listInquiries,
    createInquiry,
  ],
});
