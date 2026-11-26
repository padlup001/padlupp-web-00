export const APP_SIGN_IN_URL = "https://app.padlupp.com/signin";
export const APP_SIGN_UP_URL = "https://app.padlupp.com/signup";

const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

/**
 * A link into the web app that carries the visitor's campaign tags (utm_*) along,
 * so the app can record which campaign brought each sign-up (Admin HQ > Metrics).
 * Without campaign tags the link is unchanged.
 */
export function appLink(url: string, search: string = typeof window === "undefined" ? "" : window.location.search): string {
  const params = new URLSearchParams(search);
  const target = new URL(url);
  for (const key of CAMPAIGN_KEYS) {
    const value = params.get(key);
    if (value) target.searchParams.set(key, value);
  }
  return target.toString();
}
