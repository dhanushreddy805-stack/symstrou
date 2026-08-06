# AEDIFICA — Product Requirements (V2)

## Original Problem Statement
Redesign the reference site (buildinsilence.in) into V2 for a NEW company **AEDIFICA PRIVATE LIMITED** — a Venture Creation Company. Tagline: "Build in Silence." Preserve luxury, minimalism, editorial typography, generous spacing and premium smooth animations. Colours: luxury black, ivory, charcoal, subtle grey + very little accent. Serif headlines + modern sans body. No blue, no gradients, no stock illustrations, no SaaS look. Compass logo as hero centrepiece. Sections: Hero, About (with founder Dhanush woven in), Services (5 pillars), Process (Direction→…→Investment), Why AEDIFICA, CTA, Contact, Footer.

## Architecture
- Frontend: React 19 (CRA/craco), Tailwind, framer-motion (reveals/micro-interactions), Lenis (momentum scroll), sonner (toasts). Single-page anchored sections.
- Backend: FastAPI + Motor/MongoDB. Routes under `/api`.
- Brand mark rebuilt as crisp SVG four-point star; hero compass = star + rotating brass ring/ticks + N/E/S/W.
- Fonts: Cormorant Garamond (serif headlines) + Outfit (sans body).
- Palette: ink #0a0a0b, ivory #f2eee4, charcoal, grey, restrained brass #b8945f. No gradients on core surfaces.

## Implemented (2026-08-06)
- On-load luxury loader; masked line-by-line hero reveal; parallax/scroll-drawn process line.
- Sections: Hero (compass centrepiece + Direction/Validation/Blueprint/Growth/Legacy labels, Start Building / Book Strategy Call), editorial marquee, About (philosophy + Dhanush, Founder & CEO woven in), Services (5 pillars incl. Business Blueprint flagship with deliverables + outcomes), Process journey (6 steps), Why AEDIFICA (Direction/Clarity/Execution/Legacy), CTA, Contact, Footer.
- Working contact form → `POST /api/contact` (stores in Mongo `contact_messages`); `GET /api/contact` lists. Verified via curl + UI.
- Fully responsive, semantic sections, data-testids throughout.

## Backend API
- `GET /api/` health.
- `POST /api/contact` {name,email,company?,stage?,message} → stored message.
- `GET /api/contact` → list (newest first).

## Backlog
- P1: Admin view for contact submissions; email notification (Resend) on new lead.
- P2: /work or case-study pages; Calendly embed for Book Strategy Call.
