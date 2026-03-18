# Branding & Rebranding Guide

This document lists every file and field that contains brand-specific content. When handing over the codebase or rebranding, update the items below.

---

## 1. Primary Brand Data (JSON files)

All user-facing text is driven by JSON files in `src/data/`. Changing these files automatically updates the components that consume them — no need to touch React code for most rebranding tasks.

### `src/data/site.json`

| Field | Current Value | Purpose |
|-------|---------------|---------|
| `siteName` | `"Design Council"` | Used in SEO meta tags (`og:site_name`), JSON-LD schemas (Organization, WebSite, Course provider) |
| `seoTitle` | `"UI/UX Course — Not Another UI/UX Course \| Design Council"` | `<title>` tag and `og:title` / `twitter:title` |
| `seoDescription` | `"Not Another UI/UX Course — Something Much More Practical..."` | `<meta name="description">` and social sharing descriptions |
| `logoWordmark` | `"Design Council"` | Header logo text and `aria-label` (rendered in `LandingHeader.tsx`) |
| `baseUrl` | `"https://example.com"` | Canonical URLs, Open Graph URLs, JSON-LD |

### `src/data/finalCta.json`

| Field (path) | Current Value | Purpose |
|--------------|---------------|---------|
| `footer.copyrightEntity` | `"Design Council Private Limited"` | Legal name after © {current year} in the footer |
| `footer.email` | `"enquiry@course.com"` | Contact email shown in footer |

### `src/data/instructor.json`

| Field | Current Value | Purpose |
|-------|---------------|---------|
| `name` | `"Mohammad Thoufiq M"` | Instructor name shown in the instructor section |
| `roleLine` | `"Product Designer  •  Content Creator"` | Subtitle under the instructor name |
| `bio` | `"When I started learning design..."` | Instructor bio paragraph |
| `tags` | `["Product Designer", "UX Mentor", "Content Creator"]` | Tag badges on the instructor card |
| `stats` | Array of 4 stat cards | Achievement stats (videos, projects, freelance, placement rate) |

### `src/data/hero.json`

| Field | Current Value | Purpose |
|-------|---------------|---------|
| `title` | `"Not Another UI/UX Course..."` | Main hero headline |
| `subtitle` | `"This is not a theory-heavy design course..."` | Hero description paragraph |
| `testimonials` | Array of `{ initial, text }` | Rotating social proof (4s interval, width animates to content) |
| `videoTitleLead` / `videoTitleAccent` | Split headline (Bricolage + Instrument Serif) | Dark-band video section |
| `videoQuotePrefix` / `videoQuoteEmphasis` / `videoQuoteSuffix` | Quote under video; emphasis = bold |
| `videoThumbnail` | Poster image before play | |
| `videoSrc` | e.g. `/assets/hero/hero.mp4` | Intro video (Plyr); file under `public/assets/` |

### `src/data/pricing.json`

| Field | Current Value | Purpose |
|-------|---------------|---------|
| `priceCurrent` | `"₹4,999"` | Displayed price |
| `priceOriginal` | `"₹9,999"` | Strikethrough original price |
| `features` | Array of 8 bullet points | Feature list on the pricing card |

---

## 2. Static HTML Fallback

### `index.html`

| Line | What to change | Current Value |
|------|----------------|---------------|
| `<title>` tag | Page title (shown before React hydrates) | `"UI/UX Course \| Design Council"` |
| `<meta name="description">` | SEO description fallback | `"Not Another UI/UX Course — practical UI/UX & product design training..."` |
| `<meta name="theme-color">` | Browser theme color | `"#101828"` |
| `<link rel="icon">` | Favicon path | `/favicon.svg` |

---

## 3. Components with Brand Logic (rarely need changes)

These components read from the JSON data files above. You only need to edit them if you want to change **how** branding is displayed, not **what** is displayed.

| Component | File | What it renders |
|-----------|------|-----------------|
| `LandingHeader` | `src/features/landing/LandingHeader.tsx` | Logo wordmark from `site.logoWordmark` + "." suffix |
| `PageSEO` | `src/components/seo/PageSEO.tsx` | All `<meta>` tags, Open Graph, Twitter Cards, JSON-LD (Organization, WebSite, Course, FAQPage) |
| `FinalEnquirySection` | `src/features/landing/FinalEnquirySection.tsx` | Footer with copyright, email, and footer icon |

---

## 4. Static Assets to Replace

| Asset | Path | Notes |
|-------|------|-------|
| Favicon | `public/favicon.svg` | Replace with your brand's favicon |
| Footer icon | `public/assets/footer-icon-1.svg` | Brand logo/icon shown in the footer section |
| Instructor photo | Referenced in instructor section | Replace with the new instructor's photo |
| Hero video thumbnail | Referenced in hero section | Replace if video content changes |

---

## 5. Quick Rebranding Checklist

To rebrand the entire site, follow these steps in order:

1. **`src/data/site.json`** — Update `siteName`, `seoTitle`, `seoDescription`, `logoWordmark`, and `baseUrl`
2. **`src/data/finalCta.json`** — Update `footer.copyrightEntity` and `footer.email`
3. **`src/data/instructor.json`** — Update `name`, `roleLine`, `bio`, `tags`, and `stats` for the new instructor
4. **`src/data/hero.json`** — Update `title`, `subtitle`, `testimonials`, and video copy
5. **`src/data/pricing.json`** — Update prices, features, and CTA labels
6. **`index.html`** — Update the `<title>` tag and `<meta name="description">`
7. **`public/favicon.svg`** — Replace with new brand favicon
8. **`public/assets/footer-icon-1.svg`** — Replace with new brand icon
9. **Rebuild** — Run `pnpm build` to regenerate the `dist/` folder

---

## 6. What Does NOT Need Changing

These files/components derive all brand text from the JSON data files above:

- `src/app/App.tsx` — Passes `site.seoTitle` and `site.seoDescription` to `PageSEO`; no hardcoded brand strings
- `src/features/landing/LandingHeader.tsx` — Reads `site.logoWordmark`; no hardcoded brand strings
- `src/components/seo/PageSEO.tsx` — Reads `site.siteName` for all meta/JSON-LD; no hardcoded brand strings
- `package.json` — Uses generic `"name": "course-website"`; not user-facing
- `vite.config.ts` — No brand references
- All other section components (`StatsRow`, `AudienceSection`, `ProgramSection`, etc.) — Read from their respective JSON files

---

## 7. Architecture Note

The codebase follows a **data-driven** pattern: all user-facing copy lives in `src/data/*.json`, and React components simply render that data. This means:

- **90% of rebranding** is done by editing JSON files only
- **Components rarely need changes** unless you want to alter layout or visual presentation
- **SEO and structured data** update automatically when you change `site.json`
