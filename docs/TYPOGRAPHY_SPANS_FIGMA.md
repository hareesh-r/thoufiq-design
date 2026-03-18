# Span / text vs Figma typography

## Local `.fig` file

`docs/Course Website (1).fig` — see **`LOCAL_FIGMA_FILE.md`** (binary canvas; use Figma Desktop or API for edits).

## Figma MCP

When not rate-limited, use `get_figma_data` on file `tCFRUP9rd9wXFM6Yvl6OoR`.

## Current implementation (literal fonts)

| Family | Use |
|--------|-----|
| **Bricolage Grotesque** | Display, headings, stats, cards, FAQ, final section, hero main copy |
| **Manrope** | All `var(--font-body)` — eyebrows, program description, video eyebrow + quote, course module row labels |
| **Caveat** | Bonuses “Worth” / “Get for Free!!!” |
| **DM Sans** | Pricing footnote only (`--font-dm`) |

Hero / Audience headline **spans** (`titleAccent`, `titleItalic`) match parent: **Bricolage 700** (Figma single text style per layer).

Full token table: **`TYPOGRAPHY_FIGMA_LITERAL.md`**.
