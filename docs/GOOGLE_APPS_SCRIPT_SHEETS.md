# Google Apps Script: Sheet1 (waitlist) + Sheet2 (enquiry)

## Endpoint & CORS (this repo)

- **Production URL** (default in `src/config/googleAppsScript.ts`):  
  `https://script.google.com/macros/s/AKfycbw3fNSkCnNFI50WJF8lxuQ27uQhPcFEuCzMITtzNOiP5dfs51fmNNdU2WBykia4P-Rm/exec`
- **Requests** use `POST`, body `JSON.stringify(...)`, header **`Content-Type: text/plain`** — same pattern Google recommends so the browser does **not** send a CORS preflight (unlike `application/json`).
- **`pnpm dev`**: the app posts to **`/google-apps-webhook`** (same origin); Vite proxies to `script.google.com` (see `vite.config.ts`) so localhost avoids cross-origin issues.
- Opening the `/exec` URL in a tab shows **doGet not found** — that’s normal; the deployment expects **`doPost`**, not `doGet`.

The site sends JSON with **`source`**: `"waitlist"` or `"enquiry"`. One `doPost` must pick the tab from that field; otherwise every submission can end up on the same sheet.

| `source`   | Tab        | Columns (typical) |
|-----------|------------|-------------------|
| `waitlist` | **Sheet1** | Timestamp, Name, Email, Phone, Experience, Joined WhatsApp |
| `enquiry`  | **Sheet2** | Timestamp, Name, Email, Phone |

**Important:** After any edit, use **Deploy → Manage deployments → Edit → New version → Deploy**. Old deployments keep old code.

### Troubleshooting: POST returns 200 but no rows / curl “does nothing”

Google Apps Script often returns **HTTP 200** with an **HTML error page** when your script throws (e.g. `ReferenceError`). That is **not** a CORS or Vite proxy problem — fix the script.

**Test the deployment directly** (same body the app sends):

```bash
curl -sS -i -X POST 'https://script.google.com/macros/s/AKfycbw3fNSkCnNFI50WJF8lxuQ27uQhPcFEuCzMITtzNOiP5dfs51fmNNdU2WBykia4P-Rm/exec' \
  -H 'Content-Type: text/plain' \
  --data-raw '{"name":"Test","email":"test@example.com","phone":"1","source":"enquiry"}'
```

- If the response body starts with `<!DOCTYPE html>` and shows **ReferenceError** / **Error**, open **Apps Script → Executions** (or fix the file named in the message).  
- Example: `ReferenceError: Cannot access 'data' before initialization (line 2, file "Sheet2")` means a **script file** in the project is named `Sheet2` (not the spreadsheet tab) and line 2 is invalid — e.g. using `data` before `const data = JSON.parse(...)`, or duplicate `const data`. **Rename** that `.gs` file to something like `Legacy` or merge its code into `Code.gs` and keep **one** `doPost` that parses JSON once:

```javascript
function doPost(e) {
  var raw = e.postData && e.postData.contents;
  if (!raw) return ContentService.createTextOutput('NO_BODY');
  var payload = JSON.parse(raw);
  // use payload.name, payload.email, …
  return ContentService.createTextOutput('OK');
}
```

This repo treats HTML responses as **failure** for the enquiry form (`gasRequestSucceeded` in `src/config/googleAppsScript.ts`) so users see the error state instead of a false success.

---

## Full `doPost` (upsert by email + timestamp)

Paste into **Code.gs** (adjust tab names `Sheet1` / `Sheet2` if yours differ).

```javascript
function doPost(e) {
  const raw = e.postData && e.postData.contents;
  if (!raw) {
    return ContentService.createTextOutput('NO_BODY');
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    return ContentService.createTextOutput('BAD_JSON');
  }

  // Route: footer enquiry → Sheet2, waitlist → Sheet1 (default if missing)
  const source = data.source === 'enquiry' ? 'enquiry' : 'waitlist';

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetName = source === 'enquiry' ? 'Sheet2' : 'Sheet1';
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    return ContentService.createTextOutput('MISSING_SHEET:' + sheetName);
  }

  const email = String(data.email || '')
    .trim()
    .toLowerCase();
  if (!email) {
    return ContentService.createTextOutput('NO_EMAIL');
  }

  const values = sheet.getDataRange().getValues();
  const emailColIndex = 2; // 0=A Timestamp, 1=B Name, 2=C Email

  let rowIndex = -1;
  for (let i = 1; i < values.length; i++) {
    const cell = String(values[i][emailColIndex] || '')
      .trim()
      .toLowerCase();
    if (cell === email) {
      rowIndex = i + 1;
      break;
    }
  }

  const ts = new Date();

  if (source === 'enquiry') {
    const row = [
      ts,
      data.name || '',
      data.email || '',
      data.phone || '',
    ];
    if (rowIndex !== -1) {
      sheet.getRange(rowIndex, 1, 1, 4).setValues([row]);
    } else {
      sheet.appendRow(row);
    }
  } else {
    const row = [
      ts,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.experience || '',
      data.joinedWhatsApp ? 'YES' : 'NO',
    ];
    if (rowIndex !== -1) {
      sheet.getRange(rowIndex, 1, 1, 6).setValues([row]);
    } else {
      sheet.appendRow(row);
    }
  }

  return ContentService.createTextOutput('OK');
}
```

### What to change vs your old script

1. **`source`** — Read `data.source` and set `sheetName` to **`Sheet2` only when `source === 'enquiry'`**; otherwise **`Sheet1`** for waitlist. Your snippet always used `Sheet2`, so waitlist rows would only go to Sheet2 if that was the only code path—routing fixes “everything in one sheet” when both forms share one web app.
2. **Timestamp** — `const ts = new Date()` is written in column A on **both** insert and update so the sheet always has a **submitted-at** time (updated on repeat submits from the same email).
3. **Enquiry rows** — Only **4 columns** on Sheet2; waitlist keeps **6 columns** on Sheet1.
4. **Email match** — Compare emails case-insensitively so dedup works reliably.

### Sheet headers (row 1)

**Sheet1 — waitlist**

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Experience | Joined WhatsApp |

**Sheet2 — enquiry**

| A | B | C | D |
|---|---|---|---|
| Timestamp | Name | Email | Phone |

### If rows still appear on the wrong tab

1. Confirm the **container spreadsheet** for this script is `1fyYUE8NPSzC4WFBW7Y9gvie_JTAAyzpWHHVumqOH0w0` (or your real file): **Extensions → Apps Script** from that file.
2. Confirm tab names are exactly **`Sheet1`** and **`Sheet2`** (rename in Sheets if needed).
3. **Redeploy** the web app after saving.
4. In the browser devtools **Network** tab, confirm POST body includes `"source":"enquiry"` for the footer form.

---

## Example POST bodies (from this repo)

**Waitlist**

```json
{
  "name": "Jane",
  "email": "jane@example.com",
  "phone": "+91…",
  "experience": "Complete Beginner",
  "joinedWhatsApp": false,
  "source": "waitlist"
}
```

**Enquiry**

```json
{
  "name": "Jane",
  "email": "jane@example.com",
  "phone": "+91…",
  "source": "enquiry"
}
```
