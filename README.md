# Design Council — Course Landing (React + Vite + pnpm)

Implements copy and structure from the Figma file **Course Website (1)** ([desktop](https://www.figma.com/design/tCFRUP9rd9wXFM6Yvl6OoR/Course-Website--1-?node-id=1182-14222), [mobile](https://www.figma.com/design/tCFRUP9rd9wXFM6Yvl6OoR/Course-Website--1-?node-id=1182-19798)). Content is driven by JSON under `src/data/` so you can edit text without touching components.

## Scripts

```bash
pnpm install
pnpm dev
pnpm build
```

## Data → sections

| File | Section |
|------|---------|
| `site.json` | Brand, SEO, header CTAs |
| `hero.json` | Hero, testimonial, video block copy |
| `stats.json` | 20+ / 178+ / 10+ row |
| `audience.json` | “Is this course right for you” + 3 personas |
| `program.json` | Program overview (dark band) |
| `courseStructure.json` | **Lorem Ipsum** eyebrow, modules 0–23 (Module 1 includes lesson list from Figma) |
| `instructor.json` | Instructor bio + stat cards |
| `bonuses.json` | Free bonuses — notebook + Designer Resource Kit cards ([Figma 1182:15225](https://www.figma.com/design/tCFRUP9rd9wXFM6Yvl6OoR/Course-Website--1-?node-id=1182-15225)) |
| `pricing.json` | ₹9,999 → ₹4,999, feature bullets, Enroll CTA |
| `faq.json` | FAQ (Q1 answer is verbatim from Figma; Q2–Q5 questions verbatim—answers completed where expanded text wasn’t in the MCP export) |
| `finalCta.json` | Footer enquiry form + legal line |

## Assets

Replace placeholder blocks (program carousel, instructor photo, video) with exported images from Figma (`pnpm` + `download_figma_images` via MCP, or manual export).

**Hero intro video:** set `videoSrc` in `hero.json` (e.g. `/assets/hero/hero.mp4`). File lives under `public/assets/`.

## SEO

Set `baseUrl` and optional `defaultOgImage` in `site.json`. JSON-LD: Organization, WebSite, Course, FAQPage.
