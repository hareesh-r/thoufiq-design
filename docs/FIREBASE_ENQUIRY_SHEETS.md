# Enquiry form → Google Sheet (Firebase Cloud Functions)

The function **`submitEnquiry`** receives `POST` JSON `{ name, email, mobile }` and appends a row to **Sheet1** columns **A–D**:

| A | B | C | D |
|---|---|---|---|
| ISO timestamp | Full name | Email | Mobile |

## 1. Google Sheet

1. Row 1 should be headers, e.g. `Timestamp | Name | Email | Mobile`.
2. Share the spreadsheet with the **service account email** from your JSON key (looks like `something@....iam.gserviceaccount.com`) with **Editor** access.

## 2. Service account JSON (local file)

Keep your key as e.g. `functions/gridandgoal-e7880-….json`. That path is **gitignored** and **excluded from deploy** so it is never committed or uploaded.

**Production:** you must still register the same JSON as a Firebase secret (Cloud Functions cannot read that file in prod):

```bash
cd /path/to/thoufiq-design
firebase functions:secrets:set GOOGLE_SERVICE_ACCOUNT_KEY < functions/gridandgoal-e7880-b49f9abd445c.json
```

(Use your actual filename.) If the CLI doesn’t accept stdin, run `firebase functions:secrets:set GOOGLE_SERVICE_ACCOUNT_KEY` and paste the full JSON when prompted.

**Emulator:** with `gridandgoal-*.json` in the `functions/` folder, the function loads it automatically — no secret needed locally.

> If this key was ever committed or pushed to GitHub, **rotate it** in Google Cloud Console (IAM → service account → Keys) and update the file + secret.

## 3. Optional: different spreadsheet

Edit the `default` value of `SHEET_ID` in `functions/src/index.ts`, then redeploy.

## 4. Deploy the function

```bash
cd functions && npm install && npm run build && cd ..
firebase deploy --only functions --project gridandgoal-e7880
```

After deploy, note the URL, e.g.:

`https://asia-south1-gridandgoal-e7880.cloudfunctions.net/submitEnquiry`

## 5. Allow public HTTP (if 403)

In [Google Cloud Console](https://console.cloud.google.com) → Cloud Run (Gen 2 functions) → `submitenquiry` → **Permissions** → add principal `allUsers` with role **Cloud Run Invoker**.

Or:

```bash
gcloud functions add-iam-policy-binding submitEnquiry \
  --region=asia-south1 \
  --member=allUsers \
  --role=roles/cloudfunctions.invoker \
  --project=gridandgoal-e7880
```

(Exact resource name may be `submitenquiry` lowercase — check Console.)

## 6. Frontend env

Create `.env.production` (and `.env.local` for testing):

```env
VITE_ENQUIRY_SUBMIT_URL=https://asia-south1-gridandgoal-e7880.cloudfunctions.net/submitEnquiry
```

Rebuild the site: `pnpm build`.

If `VITE_ENQUIRY_SUBMIT_URL` is **unset**, the form still shows success locally but **does not** call Sheets — only for dev without Firebase.

## 7. Enable Google Sheets API

In [Google Cloud Console](https://console.cloud.google.com) → **APIs & Services** → **Enable APIs** → **Google Sheets API**.

## Region

The function is deployed to **`asia-south1`**. Change `setGlobalOptions({ region: "..." })` in `functions/src/index.ts` if you prefer another region.
