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
## Known issues / backlog
- P0: GET /api/contact is public (exposes leads)
- DONE: removed hardcoded prod backend fallback; form shows clear error if REACT_APP_BACKEND_URL missing
- DONE: mobile drawer now fully opaque (clip-path reveal, solid bg, z-50)
- P2: Silent DB-write failure fallback to in-memory; on_event deprecation
