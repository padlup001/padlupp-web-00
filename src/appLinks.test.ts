import { describe, expect, it } from "vitest";
import { APP_SIGN_UP_URL, appLink } from "./appLinks";

describe("appLink", () => {
  it("leaves links unchanged without campaign tags", () => {
    expect(appLink(APP_SIGN_UP_URL, "")).toBe(APP_SIGN_UP_URL);
    expect(appLink(APP_SIGN_UP_URL, "?ref=friend")).toBe(APP_SIGN_UP_URL);
  });

  it("copies only the campaign tags", () => {
    const url = new URL(appLink(APP_SIGN_UP_URL, "?utm_source=telegram&utm_medium=social&utm_content=post%201&x=1"));
    expect(url.origin + url.pathname).toBe(APP_SIGN_UP_URL);
    expect(Object.fromEntries(url.searchParams)).toEqual({ utm_source: "telegram", utm_medium: "social", utm_content: "post 1" });
  });
});
