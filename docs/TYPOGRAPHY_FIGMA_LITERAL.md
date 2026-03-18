# Typography — literal Figma match

Fonts loaded in `index.html`:

| Family | Weights | Role |
|--------|---------|------|
| **Bricolage Grotesque** | 300–700 | Display, headlines, most body on light UI |
| **Manrope** | 400, 500, 600, 700 | Eyebrows (600 UPPER), program blurb, video eyebrow + quote, module labels |
| **Caveat** | 400 | Bonuses: “Worth”, “Get for Free!!!” |
| **DM Sans** | 400 | Pricing footnote (“One-time payment…”) |

CSS variables (`global.css`): `--font-display`, `--font-body`, `--font-caveat`, `--font-dm`.

## Section map

| Area | Element | Font | Weight | Size (desktop max) | Line height |
|------|---------|------|--------|-------------------|-------------|
| Global | `body` | Bricolage | — | 16px | 1.5 |
| Global | `.btn-cta` | Bricolage | 700 | 16px | 1 |
| Header | Logo | Bricolage | 700 | ~21.6px | — |
| Header | Nav links | Manrope | 600 | 15px | 1.4 |
| Hero | Badge | Bricolage | 500 | 14px | 1.43 |
| Hero | Title (+ accent span) | Bricolage | 700 | 64px | 1.03 |
| Hero | Subtitle | Bricolage | 400 | 20px | 1.625 |
| Hero | Enroll CTA | Bricolage | 700 | 16px | 1 |
| Hero | Testimonial | Bricolage | 400 | 16px | 1.5 |
| Hero | Video eyebrow | Manrope | 600 | 16px | 1.366 |
| Hero | Video title | Bricolage | 700 | 48px | 1.2 |
| Hero | Video desc | Bricolage | 600 | 16px | 1.2 |
| Hero | Video quote | Manrope | 400 | 24px | 1.366 |
| Hero | Quote marks | Bricolage | 600 | 64px | 1.2 |
| Stats | Value | Bricolage | 300 | 64px | 1.2 |
| Stats | Label | Bricolage | 400 | 24px | 1.2 |
| Audience | Eyebrow | Manrope | 600 | 16px | 1.366 |
| Audience | Title + italic span | Bricolage | 700 | 48px | 1.2 |
| Audience | Subtitle | Bricolage | 600 | 16px | 1.2 |
| Audience | Card title | Bricolage | 700 | 17px | 1.5 |
| Audience | Card body | Bricolage | 400 | 14px | 1.625 |
| Audience | CTA | Bricolage | 700 | 16px | 1 |
| Program | Eyebrow | Manrope | 600 | 16px | 1.366 |
| Program | Title | Bricolage | 700 | 48px | 1.2 |
| Program | Desc | Manrope | 400 | 16px | 1.366 |
| Program | Feature title | Bricolage | 700 | 17px | 1.5 |
| Program | Feature desc | Bricolage | 400 | 14px | 1.625 |
| Program | Caption | Bricolage | 400 | 16px | 1.5 |
| Program | CTA | Bricolage | 700 | 16px | 1 |
| Course | Eyebrow | Manrope | 600 | 16px | 1.366 |
| Course | Title | Bricolage | 700 | 48px | 1.2 |
| Course | Desc | Bricolage | 600 | 18px | 1.5 |
| Course | Module code | Manrope | 600 | 15px | 1.4 |
| Course | Module title | Manrope | 700 | 18px | 1.2 |
| Course | Lessons | Bricolage | 400 | 14px | 1.625 |
| Instructor | Chip name | Bricolage | 700 | 18px | 1.2 |
| Instructor | Chip role | Bricolage | 400 | 14px | 1.625 |
| Instructor | Eyebrow | Manrope | 600 | 16px | 1.366 |
| Instructor | Subheading | Bricolage | 700 | 48px | 1.2 |
| Instructor | Bio | Bricolage | 500 | 18px | 1.5 |
| Instructor | Tags | Bricolage | 700 | 14px | 1.71 |
| Instructor | Stat title | Bricolage | 700 | 17px | 1.5 |
| Instructor | Stat body | Bricolage | 400 | 14px | 1.625 |
| Bonuses | Eyebrow | Manrope | 600 | 16px | 1.366 |
| Bonuses | Subtitle | Bricolage | 700 | 48px | 1.2 |
| Bonuses | Card h3 | Bricolage | 700 | 20px | 1.2 |
| Bonuses | Card p | Bricolage | 600 | 16px | 1.5 |
| Bonuses | Worth / CTA | Caveat | 400 | 24px | 1 |
| Bonuses | Price | Bricolage | 700 | 24px | 1 |
| Pricing | Headline | Bricolage | 700 | 48px | 1.2 |
| Pricing | Banner | Bricolage | 500 | 14px | — |
| Pricing | Was / Now | Bricolage | 700 | variable | — |
| Pricing | Footnote | DM Sans | 400 | 14px | 1.57 |
| Pricing | List | Bricolage | 500 | 16px | 1.375 |
| FAQ | Title | Bricolage | 700 | 48px | 1.2 |
| FAQ | Intro | Bricolage | 600 | 18px | 1.5 |
| FAQ | Question | Bricolage | 700 | 18px | 1.3 |
| FAQ | Answer | Bricolage | 500 | 16px | 1.4 |
| Final | Headline | Bricolage | 700 | 48px | 1.2 |
| Final | Sub | Bricolage | 400 | 16px | 1.2 |
| Final | Card title | Bricolage | 700 | 20px | 1.2 |
| Final | Card body | Bricolage | 300 | 14px | 1.43 |
| Final | Labels | Bricolage | 500 | 14px | 1.43 |
| Final | Input | Bricolage | 400 | 14px | — |
| Final | Footnote / bar | Bricolage | 400 | 14–16px | — |

Responsive: section titles use `clamp()` down from these desktop maxima.
