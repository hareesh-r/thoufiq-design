# Local file: `Course Website (1).fig`

## What’s inside the `.fig` archive

The file is a **ZIP**. After unzip you get:

| Path | Purpose |
|------|---------|
| **`canvas.fig`** | Main document — **proprietary binary** (`fig-kiwij` header). Not JSON. |
| **`meta.json`** | Export metadata (file name, thumbnail size, export time). |
| **`thumbnail.png`** | Small preview. |
| **`images/*`** | Raster assets referenced by the file (hashed filenames). |

## Can we read fonts / text styles from it here?

**Not directly.** Font family names and text styles are **not stored as plain text** in `canvas.fig` in this export, so scripts in the repo cannot reliably parse typography from the local `.fig` the way the **Figma REST API** or **Dev Mode** can.

Use the local `.fig` for:

- Opening the full file in **Figma Desktop** (double-click or File → Open).
- **Offline** edits and re-export.
- **Image assets**: copy files from the unzipped `images/` folder if you need originals (hashes don’t match frame names—you still map them in Figma).

## Recommended ways to sync design → code

1. **Figma Desktop** — Inspect any frame; copy CSS / check text panel for font + weight.
2. **Figma REST API / MCP** — `get_figma_data` when not rate-limited (see `TYPOGRAPHY_SPANS_FIGMA.md`).
3. **Plugin** — e.g. export design tokens or a JSON dump from the open file.
4. **Dev Mode** — Copy properties from the browser.

## Optional: unzip locally

```bash
cd docs && unzip -o "Course Website (1).fig" -d _fig_unpack
```

Add `docs/_fig_unpack/` to `.gitignore` if you don’t want extracted blobs in git.

---

*Generated from inspection of the provided `.fig` export (March 2026).*
