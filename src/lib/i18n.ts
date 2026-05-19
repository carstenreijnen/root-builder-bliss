// Bilingual config for Royal Yachts Miami
// English is the default and lives at the root URL.
// Spanish lives under the /es/* prefix.

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const ES_PREFIX = "/es";

/** Derive the active locale from a pathname (works on server + client). */
export function getLocaleFromPath(pathname: string): Locale {
  if (pathname === ES_PREFIX || pathname.startsWith(`${ES_PREFIX}/`)) return "es";
  return "en";
}

/** Strip the /es prefix from a pathname, returning the equivalent English path. */
export function stripLocale(pathname: string): string {
  if (pathname === ES_PREFIX) return "/";
  if (pathname.startsWith(`${ES_PREFIX}/`)) return pathname.slice(ES_PREFIX.length);
  return pathname;
}

/** Build a localized path for the given locale. */
export function localizePath(pathname: string, locale: Locale): string {
  const base = stripLocale(pathname);
  if (locale === "es") return base === "/" ? ES_PREFIX : `${ES_PREFIX}${base}`;
  return base;
}

/** Opposite locale of the given one. Useful for language-switcher links. */
export function alternateLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}
