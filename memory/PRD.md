# SYMSTRUO – Workspace Setup
## Original request
Set up https://github.com/dhanushreddy805-stack/symstrou (branch feat/postgres-email-seo-docker) here to continue development.
## Architecture
React (CRA/craco) frontend + FastAPI backend + local PostgreSQL (SQLAlchemy async/asyncpg) + Hostinger SMTP for lead emails.
## Done (2026-06)
- backend/.env + frontend/.env created; deps installed (sqlalchemy, asyncpg, greenlet)
- Local PostgreSQL 15, data in /root/pgdata; start with /app/scripts/start_postgres.sh (re-installs if pod restarted)
- SMTP_USER/SMTP_PASSWORD saved as secrets; real admin + auto-reply emails verified
- Testing: backend 8/8 pass, frontend pages/contact form OK
- DONE: About removed from homepage; now its own page at /about (nav + footer links, sitemap updated); site-wide text-wrap balance/pretty; mobile nav scroll delay fix
- DONE (redesign): "Cartography / Astrolabe" theme — topographic canvas background, tilting interactive astrolabe hero (5 bearings), percentage loader with split reveal, instrument cursor with labels, magnetic CTAs, velocity-skew dual marquee, scroll-illuminated manifesto + rotating values rose, services blueprint index (SVG drawings per service), pinned horizontal insights rail (swipe on mobile) with generative constellations, ring-horizon CTA, Bengaluru beacon w/ live IST, giant outlined footer wordmark, scroll bearing compass + progress bar. Components in src/components/sections + src/components/fx
## Known issues / backlog
- P0: GET /api/contact is public (exposes leads)
- DONE: removed hardcoded prod backend fallback; form shows clear error if REACT_APP_BACKEND_URL missing
- DONE: mobile drawer now fully opaque (clip-path reveal, solid bg, z-50)
- P2: Silent DB-write failure fallback to in-memory; on_event deprecation
