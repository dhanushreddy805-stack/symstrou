# SYMSTRUO Investor Pitch Deck — PRD

## Problem Statement
Investor-facing 15-slide pitch deck for SYMSTRUO, a services-first, systems-led business-building company raising ₹20 Lakhs for growth. Honest early-stage narrative (no inflated startup claims). Premium, credible, disciplined tone.

## Format
- Interactive web-based deck (React SPA) + Print/PDF export (browser print, A4 landscape).
- No backend required. Fully frontend.

## Brand / Inputs (from user)
- Founder: DHANUSH B — Founder & CEO
- Tagline: "Turning ideas into structured, scalable companies"
- Logo mark (star) + wordmark (SYMSTRUO) uploaded; wordmark inverted to white for dark theme.
- Revenue model: custom-made business packages + investment commissions.
- Theme: Dark, premium, minimal (Obsidian #090C10 + Muted Gold #D4AF37).

## Architecture
- `/app/frontend/src/App.js` → renders `Deck`.
- `/app/frontend/src/components/deck/Deck.jsx` → shell: keyboard/click nav, progress, overview grid (G), PDF print, Express Interest modal + sonner toast, `?slide=N` deep-link, hidden print deck (all 15 slides).
- `/app/frontend/src/components/deck/slides.jsx` → 15 slide components + `SLIDES` registry (Recharts, Framer Motion, lucide-react).
- `/app/frontend/src/components/deck/primitives.jsx` → SlideLayout, Eyebrow, GlassCard, Stat, Check, BrandMark.
- `/app/frontend/src/data/deck.js` → all content/constants.
- Fonts: Cormorant Garamond (display), Outfit (UI), JetBrains Mono (eyebrows).

## Implemented (2026-06)

### Iteration 1
- 15-slide interactive deck, keyboard nav, overview grid, print stylesheet.

### Iteration 2 (current)
- Cut deck to **12 slides**: Cover, Problem, Market, Solution & Ecosystem (merged), How It Works, Business Model, Traction, Competition & Advantage (merged), Go-To-Market, Financial Model, Investment Ask & Use of Capital (merged), Vision & Contact.
- **Real PDF export**: "Download PDF" button generates an actual `SYMSTRUO-Pitch-Deck.pdf` client-side via jsPDF + html2canvas (offscreen 1280x720 pages). Verified: valid 12-page ~4.1MB PDF.
- New **silver star logo** processed to transparent PNG at `/app/frontend/public/logo-star.png` (old logo removed).
- Company name **"SYMSTRUO" rendered as large letter-spaced text** (cover ~96px + big on Vision slide), PDF-safe.
- **Contact** on last slide: dhanush@symstruo.com + +91 70194 21089 (mailto/tel links).
- Tested: 23/23 frontend checks passed (iteration_2.json).

## Open Items / Backlog
- Exact pre-sales revenue figures (presented honestly as qualitative signals + NDA note).
- Express Interest form is toast-only — MOCKED, no persistence/email yet.

## Next Tasks (P1/P2)
- Persist Express Interest leads to backend/email.
- Founder photo/bio on Vision slide if provided.
- Optional: reduce PDF size (scale 1.5) if needed.
