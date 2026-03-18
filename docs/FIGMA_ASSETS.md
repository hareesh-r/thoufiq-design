# Figma assets

## Local `.fig` copy

**`docs/Course Website (1).fig`** — full offline export. It’s a ZIP; the main document is binary and **doesn’t expose fonts as readable text** in-repo. See **`docs/LOCAL_FIGMA_FILE.md`** for structure and how to use it (Figma Desktop, images folder, API for tokens).

## Wishlist page (`/wishlist`)

Implements the same **Course Website (1)** language as the Program block (Figma `1182:14339`): dark shell `#101828` (32px radius), **glass** list rows (gradient + blur + border), blue uppercase eyebrow (`--font-body` 600), white Bricolage titles, gradient CTAs. Empty state and remove dialog live inside that system. Node-specific frames (e.g. `1182:27510`…) can be checked in Figma when the API isn’t rate-limited.

## Pulled automatically (via Figma MCP)

These assets were downloaded with the Figma MCP `download_figma_images` tool and live in **`public/assets/`**.

| File | Figma node ID | Used in |
|------|----------------|--------|
| `hero-play.svg` | 1182:14244 | Hero video card — play button icon |
| `footer-icon-1.svg` | 1182:15702 | Final section footer — logo (139×63) |
| `footer-icon-2.svg` | 1182:15703 | Footer (e.g. social) — 124×62 |
| `footer-icon-3.svg` | 1182:15704 | Footer (e.g. social) — 99×48 |
| `footer-icon-4.svg` | 1182:15705 | Footer (e.g. social) — 57×27 |
| `footer-icon-5.svg` | 1182:15706 | Footer (e.g. social) — 80×37 |

Footer icons 2–5 are likely social/icon set; wire them as links (e.g. Twitter, LinkedIn, Instagram, YouTube) when you have URLs.

---

## Manual export from Figma

Export these yourself from the [Course Website (1) Figma file](https://www.figma.com/design/tCFRUP9rd9wXFM6Yvl6OoR/) and place them in `public/assets/` (or the path you use in the app). The MCP cannot export raster images or some component instances without an `imageRef`.

| Asset | Where in Figma | Where used in app | Format |
|-------|----------------|-------------------|--------|
| **Hero / course imagery** | Hero area — main visual or “Watch” card background (if it’s an image, not shape) | Hero section | PNG/JPG/WebP |
| **Instructor photo** | Instructor section — profile image | `InstructorSection` | PNG/JPG/WebP |
| **Program block card images** | Program section (node 1182:14339) — the 6 “Background+Border” card contents (1182:14349, 14359, 14371, 14383, 14393, 14402) if they contain images | Program section carousel cards | PNG/SVG as needed |
| **Bonus / feature images** | Bonuses section — any illustration or photo per bonus | `BonusesSection` | PNG/SVG |
| **Video thumbnail** | Hero “Watch” card — thumbnail for the video (if different from background) | Hero video card | PNG/JPG |
| **Testimonial avatar** | Hero testimonial — avatar image (if not just initial) | Hero testimonial | PNG/JPG |
| **FAQ / accordion icons** | FAQ section — expand/collapse icons if they are raster or complex components | `LandingFaq` | SVG/PNG |
| **Header logo** | Header — if you want the same logo as in footer (e.g. `footer-icon-1.svg`) you can reuse `/assets/footer-icon-1.svg`; otherwise export the header-specific logo | `LandingHeader` | SVG preferred |

### How to export from Figma

1. Open the frame/layer in Figma.
2. Select the node(s).
3. In the right panel, use **Export** (or bottom-left Export section).
4. Choose format (SVG for icons/vectors, PNG 2x for photos).
5. Save into `public/assets/` and reference in code as `/assets/filename.png` (or the path your app uses).

### Optional: re-pull SVGs after rate limit

If the Figma API returns 429, you can re-run the MCP later to pull more vector nodes. Useful node IDs from the file:

- **Hero play icon:** 1182:14244 (already pulled)
- **Footer vectors:** 1182:15702–15706 (already pulled)
- **Program block:** 1182:14339 (frame; drill into children for any SVG/image nodes if needed)

---

## Fonts

The app uses the same fonts as the Figma file:

- **Bricolage Grotesque** — headings, eyebrows, CTAs (`--font-display`)
- **Manrope** — eyebrows, UI copy, module labels, video quote (`--font-body`)
- **DM Sans** — pricing footnote (`--font-dm`)

Loaded in `index.html`; tokens in `src/styles/global.css`.
