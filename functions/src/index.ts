import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import { defineSecret, defineString } from "firebase-functions/params";
import { google } from "googleapis";

setGlobalOptions({ region: "asia-south1" });

/** Spreadsheet ID from the URL (between /d/ and /edit) */
const sheetId = defineString("SHEET_ID", {
  default: "1fyYUE8NPSzC4WFBW7Y9gvie_JTAAyzpWHHVumqOH0w0",
});

/** Paste full JSON from your GCP service account key (Firebase Secret) */
const serviceAccountKey = defineSecret("GOOGLE_SERVICE_ACCOUNT_KEY");

const MAX_LEN = 200;

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

/**
 * Emulator only: load `gridandgoal-*.json` from the functions folder so you
 * don’t need a local secret file. Production uses GOOGLE_SERVICE_ACCOUNT_KEY.
 */
function loadServiceAccountFromLocalFile(): {
  client_email: string;
  private_key: string;
} | null {
  if (process.env.FUNCTIONS_EMULATOR !== "true") return null;
  const cwd = process.cwd();
  let names: string[];
  try {
    names = readdirSync(cwd);
  } catch {
    return null;
  }
  for (const name of names) {
    if (!/^gridandgoal.+\.json$/i.test(name)) continue;
    const p = join(cwd, name);
    if (!existsSync(p)) continue;
    try {
      const j = JSON.parse(readFileSync(p, "utf8")) as Record<string, unknown>;
      if (
        j.type === "service_account" &&
        typeof j.private_key === "string" &&
        typeof j.client_email === "string"
      ) {
        return {
          client_email: j.client_email,
          private_key: j.private_key,
        };
      }
    } catch {
      /* skip invalid file */
    }
  }
  return null;
}

/**
 * POST JSON body: { name, email, mobile }
 * Appends one row to Sheet1: [ ISO timestamp, name, email, mobile ]
 */
export const submitEnquiry = onRequest(
  {
    cors: true,
    invoker: "public",
    secrets: [serviceAccountKey],
    maxInstances: 20,
  },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const body = req.body as Record<string, unknown>;
    const name = body?.name;
    const email = body?.email;
    const mobile = body?.mobile;

    if (
      !isNonEmptyString(name) ||
      !isNonEmptyString(email) ||
      !isNonEmptyString(mobile)
    ) {
      res.status(400).json({ error: "Missing name, email, or mobile" });
      return;
    }

    const nameT = name.trim().slice(0, MAX_LEN);
    const emailT = email.trim().slice(0, MAX_LEN);
    const mobileT = mobile.trim().slice(0, MAX_LEN);

    if (emailT.length < 3 || !emailT.includes("@")) {
      res.status(400).json({ error: "Invalid email" });
      return;
    }

    const fromFile = loadServiceAccountFromLocalFile();
    let keyJson: { client_email?: string; private_key?: string };
    if (fromFile) {
      keyJson = fromFile;
    } else {
      try {
        keyJson = JSON.parse(serviceAccountKey.value()) as {
          client_email?: string;
          private_key?: string;
        };
      } catch {
        console.error(
          "Set GOOGLE_SERVICE_ACCOUNT_KEY secret or add gridandgoal-*.json for the emulator"
        );
        res.status(500).json({ error: "Server misconfiguration" });
        return;
      }
    }

    if (!keyJson.client_email || !keyJson.private_key) {
      res.status(500).json({ error: "Service account key incomplete" });
      return;
    }

    try {
      const auth = new google.auth.JWT({
        email: keyJson.client_email,
        key: keyJson.private_key,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
      const sheets = google.sheets({ version: "v4", auth });

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId.value(),
        range: "Sheet1!A:D",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [new Date().toISOString(), nameT, emailT, mobileT],
          ],
        },
      });

      res.status(200).json({ ok: true });
    } catch (e) {
      console.error("Sheets append failed:", e);
      res.status(500).json({ error: "Could not save enquiry" });
    }
  }
);