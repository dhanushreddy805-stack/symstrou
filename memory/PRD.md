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

## Implemented (2026-06 / iteration 1)
- 15 slides: Cover, Problem, Market, Solution, Ecosystem (interactive tabs), How It Works (interactive steps), Business Model, Traction, Competition (matrix), Advantage, Go-To-Market, Financials (scenario toggle + line chart), Investment Ask, Use of Capital (donut + milestones), Vision (Express Interest modal).
- Keyboard nav (←/→/Space/PageUp/Down/Home/End/G), progress bar, slide counter, overview grid jump.
- PDF/Print export via print stylesheet.
- Use-of-capital donut fixed-size PieChart; financial line chart.

## Open Items / Backlog
- Exact pre-sales revenue figures (currently presented honestly as qualitative signals + NDA note).
- Brand exact hex/fonts if founder wants to override defaults.
- Optional: real backend to capture Express Interest submissions (currently toast-only, no persistence). MOCKED — form does not persist.

## Next Tasks (P1/P2)
- Persist Express Interest leads to a backend/email.
- Add founder photo / short bio on Vision slide if provided.
- Add downloadable one-pager summary.
