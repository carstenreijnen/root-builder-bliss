import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

// Protected /admin section. Any nested route under /admin requires a signed-in
// user with the `admin` role in `public.user_roles`. UI is intentionally not
// built yet — this is the auth guard only.
export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;

    if (!session) {
      throw redirect({
        to: "/admin/login",
        search: { redirect: location.href },
      });
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id);

    const isAdmin = roles?.some((r) => r.role === "admin") ?? false;
    if (!isAdmin) {
      throw redirect({ to: "/admin/login", search: { redirect: location.href } });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  return <Outlet />;
}
