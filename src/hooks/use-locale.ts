import { useRouterState } from "@tanstack/react-router";
import { getLocaleFromPath, type Locale } from "@/lib/i18n";

/** Returns the active locale derived from the current pathname. SSR-safe. */
export function useLocale(): Locale {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return getLocaleFromPath(pathname);
}
