/**
 * Google Apps Script web app (POST JSON as body, Content-Type: text/plain).
 * That header avoids a CORS preflight that `application/json` would trigger.
 *
 * Override with `VITE_GOOGLE_APPS_SCRIPT_URL` in `.env.local`.
 * Backend should route by `source`: "waitlist" → Sheet1, "enquiry" → Sheet2 (see docs).
 */
const GAS_WEB_APP_EXEC =
  "https://script.google.com/macros/s/AKfycbw3fNSkCnNFI50WJF8lxuQ27uQhPcFEuCzMITtzNOiP5dfs51fmNNdU2WBykia4P-Rm/exec";

/** Same-origin path in dev — Vite proxies to `script.google.com` (see `vite.config.ts`). */
const GAS_DEV_PROXY_PATH = "/google-apps-webhook";

export const GOOGLE_APPS_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL ??
  (import.meta.env.DEV ? GAS_DEV_PROXY_PATH : GAS_WEB_APP_EXEC);

export function postToGoogleAppsScript(body: Record<string, unknown>): Promise<Response> {
  return fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(body),
  });
}

/**
 * GAS often returns HTTP 200 with an HTML error page when `doPost` throws (e.g. ReferenceError).
 * Call after `postToGoogleAppsScript` — consumes the response body once.
 */
export async function gasRequestSucceeded(res: Response): Promise<boolean> {
  if (!res.ok) return false;
  const text = await res.text();
  const start = text.trimStart().slice(0, 80).toLowerCase();
  if (start.startsWith("<!doctype") || start.startsWith("<html")) return false;
  return true;
}
