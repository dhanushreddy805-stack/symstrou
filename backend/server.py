from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.future import select
from pydantic import BaseModel, Field, EmailStr
from pydantic import ConfigDict
from typing import List, Optional
import os
import uuid
import logging
import html
from datetime import datetime, timezone
from pathlib import Path
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# ──────────────────────────────────────────────────
# Environment & Config
# ──────────────────────────────────────────────────
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

DATABASE_URL = os.environ.get("DATABASE_URL")
engine = None
AsyncSessionLocal = None
Base = declarative_base()

if DATABASE_URL:
    try:
        # asyncpg requires the "postgresql+asyncpg://" prefix
        ASYNC_DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")
        engine = create_async_engine(ASYNC_DATABASE_URL, echo=False)
        AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    except Exception as db_init_err:
        logging.warning(f"Could not initialize DB engine: {db_init_err}")
        engine = None
        AsyncSessionLocal = None

SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.hostinger.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "465"))
SMTP_USER = os.environ.get("SMTP_USER")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", SMTP_USER or "dhanush@symstruo.com")

# In-memory store fallback so endpoint functions even without active DB
IN_MEMORY_CONTACTS: List["ContactMessage"] = []

# ──────────────────────────────────────────────────
# SQLAlchemy Model (When DB is available)
# ──────────────────────────────────────────────────
class ContactMessageORM(Base):
    __tablename__ = "contact_messages"
    id          = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name        = Column(String(120), nullable=False)
    email       = Column(String(254), nullable=False)
    company     = Column(String(160), nullable=True, default="")
    stage       = Column(String(80),  nullable=True, default="")
    message     = Column(Text, nullable=False)
    created_at  = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

# ──────────────────────────────────────────────────
# Pydantic Schemas
# ──────────────────────────────────────────────────
class ContactCreate(BaseModel):
    name:    str           = Field(..., min_length=1, max_length=120)
    email:   EmailStr
    company: Optional[str] = Field(default="", max_length=160)
    stage:   Optional[str] = Field(default="", max_length=80)
    message: str           = Field(..., min_length=1, max_length=4000)

class ContactMessage(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id:         str
    name:       str
    email:      str
    company:    str = ""
    stage:      str = ""
    message:    str
    created_at: datetime

# ──────────────────────────────────────────────────
# Email HTML Generators (Exact UI Brand Palette)
# ──────────────────────────────────────────────────
def build_admin_lead_email_html(lead: ContactCreate, lead_id: str, created_at_str: str) -> str:
    """Builds the 2-column key-value lead notification email for admin using exact UI tokens."""
    safe_name = html.escape(lead.name)
    safe_email = html.escape(str(lead.email))
    safe_company = html.escape(lead.company or "—")
    safe_stage = html.escape(lead.stage or "—")
    safe_message = html.escape(lead.message).replace("\n", "<br/>")

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin Lead Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0b; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f2eee4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0a0a0b; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Container Card: --ink-2 #101011 with hairline border #232325 -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #101011; border: 1px solid #232325; border-radius: 6px; overflow: hidden; padding: 36px 32px;">
          
          <!-- Header Branding -->
          <tr>
            <td align="left" style="padding-bottom: 24px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align: middle; padding-right: 12px;">
                    <img src="https://symstruo.com/symstruo-mark.png" alt="SYMSTRUO" width="32" height="32" style="display: block; border: 0;" />
                  </td>
                  <td style="vertical-align: middle;">
                    <img src="https://symstruo.com/symstruo-wordmark.png" alt="SYMSTRUO" height="13" style="display: block; border: 0;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title Area -->
          <tr>
            <td style="padding-bottom: 20px; border-top: 1px solid #232325; padding-top: 24px;">
              <h1 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 26px; font-weight: 400; color: #f2eee4; margin: 0 0 6px 0; letter-spacing: -0.01em;">
                Admin Lead Notification
              </h1>
              <p style="font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; color: #8b8880; margin: 0;">
                New Venture Inquiry
              </p>
            </td>
          </tr>

          <!-- 2-Column Key-Value Table -->
          <tr>
            <td style="padding-bottom: 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%; border: 1px solid #232325;">
                <!-- Table Header: --charcoal #17171a with --brass #b8945f labels -->
                <tr style="background-color: #17171a;">
                  <th align="left" style="padding: 12px 16px; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: #b8945f; border-bottom: 1px solid #232325; width: 34%; font-weight: 500;">
                    PARAMETER
                  </th>
                  <th align="left" style="padding: 12px 16px; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: #b8945f; border-bottom: 1px solid #232325; width: 66%; font-weight: 500;">
                    DETAILS
                  </th>
                </tr>

                <!-- Founder Name -->
                <tr>
                  <td style="padding: 14px 16px; font-size: 13px; color: #8b8880; border-bottom: 1px solid #232325; vertical-align: top;">
                    Founder Name
                  </td>
                  <td style="padding: 14px 16px; font-size: 14px; color: #f2eee4; font-weight: 500; border-bottom: 1px solid #232325; vertical-align: top;">
                    {safe_name}
                  </td>
                </tr>

                <!-- Contact Email -->
                <tr>
                  <td style="padding: 14px 16px; font-size: 13px; color: #8b8880; border-bottom: 1px solid #232325; vertical-align: top;">
                    Contact Email
                  </td>
                  <td style="padding: 14px 16px; font-size: 14px; border-bottom: 1px solid #232325; vertical-align: top;">
                    <a href="mailto:{safe_email}" style="color: #b8945f; text-decoration: none;">{safe_email}</a>
                  </td>
                </tr>

                <!-- Company -->
                <tr>
                  <td style="padding: 14px 16px; font-size: 13px; color: #8b8880; border-bottom: 1px solid #232325; vertical-align: top;">
                    Company
                  </td>
                  <td style="padding: 14px 16px; font-size: 14px; color: #f2eee4; border-bottom: 1px solid #232325; vertical-align: top;">
                    {safe_company}
                  </td>
                </tr>

                <!-- Stage -->
                <tr>
                  <td style="padding: 14px 16px; font-size: 13px; color: #8b8880; border-bottom: 1px solid #232325; vertical-align: top;">
                    Stage
                  </td>
                  <td style="padding: 14px 16px; font-size: 14px; color: #f2eee4; border-bottom: 1px solid #232325; vertical-align: top;">
                    {safe_stage}
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding: 14px 16px; font-size: 13px; color: #8b8880; vertical-align: top;">
                    Message
                  </td>
                  <td style="padding: 14px 16px; font-size: 14px; line-height: 22px; color: #f2eee4; vertical-align: top;">
                    {safe_message}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Metadata -->
          <tr>
            <td style="border-top: 1px solid #232325; padding-top: 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" style="font-size: 11px; color: #5c5a55; letter-spacing: 0.1em;">
                    ID: {lead_id[:8]} &bull; {created_at_str}
                  </td>
                  <td align="right" style="font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #b8945f;">
                    SYMSTRUO System
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""

def build_founder_confirmation_email_html(lead: ContactCreate) -> str:
    """Builds the 'Transmission Received.' auto-reply for the lead using exact UI tokens."""
    safe_name = html.escape(lead.name.split()[0] if lead.name else "Founder")

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Transmission Received — SYMSTRUO</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0b; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f2eee4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0a0a0b; padding: 48px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card: --ink-2 #101011 with hairline border #232325 -->
        <table width="540" cellpadding="0" cellspacing="0" border="0" style="max-width: 540px; width: 100%; background-color: #101011; border: 1px solid #232325; border-radius: 6px; overflow: hidden; padding: 48px 36px; text-align: center;">
          
          <!-- Top Brand Logo Assets (Actual PNGs - No SVG) -->
          <tr>
            <td align="center" style="padding-bottom: 24px;">
              <img src="https://symstruo.com/symstruo-mark.png" alt="SYMSTRUO Mark" width="44" height="44" style="display: block; margin: 0 auto 14px auto; border: 0;" />
              <img src="https://symstruo.com/symstruo-wordmark.png" alt="SYMSTRUO" height="15" style="display: block; margin: 0 auto; border: 0;" />
            </td>
          </tr>

          <!-- Hairline Divider -->
          <tr>
            <td style="border-top: 1px solid #232325; padding-top: 36px;"></td>
          </tr>

          <!-- Editorial Serif Heading -->
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <h1 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 32px; font-weight: 300; color: #f2eee4; margin: 0; letter-spacing: -0.01em; line-height: 1.1;">
                Transmission Received.
              </h1>
            </td>
          </tr>

          <!-- Body Copy in subtle grey --grey #8b8880 -->
          <tr>
            <td align="center" style="padding-bottom: 36px;">
              <p style="font-size: 14px; line-height: 24px; color: #8b8880; margin: 0 auto; max-width: 440px;">
                Hello {safe_name}, thank you for sharing your vision with <strong style="color: #f2eee4; font-weight: 400;">SYMSTRUO</strong>. We build in silence and evaluate every inquiry with precision. Our partners will review your note and connect with you within 24 hours.
              </p>
            </td>
          </tr>

          <!-- Hairline Divider -->
          <tr>
            <td style="border-top: 1px solid #232325; padding-top: 28px;"></td>
          </tr>

          <!-- Footer Signature -->
          <tr>
            <td align="center">
              <p style="font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: #8b8880; margin: 0 0 10px 0;">
                SYMSTRUO &bull; Venture Creation Company
              </p>
              <a href="https://symstruo.com" style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #b8945f; text-decoration: none;">
                symstruo.com
              </a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""

# ──────────────────────────────────────────────────
# Background Email Dispatcher
# ──────────────────────────────────────────────────
def send_lead_notification_emails(lead: ContactCreate, lead_id: str, created_at: datetime):
    if not SMTP_USER or not SMTP_PASSWORD:
        logging.warning("SMTP credentials not set (SMTP_USER or SMTP_PASSWORD). Skipping email delivery.")
        return

    created_at_str = created_at.strftime("%b %d, %Y • %H:%M UTC")

    # 1. Send Admin Notification
    try:
        admin_msg = MIMEMultipart("alternative")
        admin_msg["From"] = f"SYMSTRUO Inquiries <{SMTP_USER}>"
        admin_msg["To"] = ADMIN_EMAIL
        admin_msg["Subject"] = f"🚀 New Lead: {lead.name} — SYMSTRUO"

        admin_plain = f"""New Venture Inquiry:
Founder Name: {lead.name}
Contact Email: {lead.email}
Company: {lead.company or 'N/A'}
Stage: {lead.stage or 'N/A'}
Message: {lead.message}
"""
        admin_html = build_admin_lead_email_html(lead, lead_id, created_at_str)

        admin_msg.attach(MIMEText(admin_plain, "plain"))
        admin_msg.attach(MIMEText(admin_html, "html"))

        # Connect & dispatch
        if SMTP_PORT == 465:
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=15) as server:
                server.login(SMTP_USER, SMTP_PASSWORD)
                server.send_message(admin_msg)
        else:
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as server:
                server.starttls()
                server.login(SMTP_USER, SMTP_PASSWORD)
                server.send_message(admin_msg)

        logging.info(f"Admin lead email successfully delivered to {ADMIN_EMAIL}")
    except Exception as e:
        logging.error(f"Failed to dispatch admin lead email: {e}", exc_info=True)

    # 2. Send Founder Auto-Reply Confirmation
    try:
        founder_msg = MIMEMultipart("alternative")
        founder_msg["From"] = f"SYMSTRUO <{SMTP_USER}>"
        founder_msg["To"] = str(lead.email)
        founder_msg["Subject"] = "Transmission Received — SYMSTRUO"

        founder_plain = f"""Hello {lead.name},

Thank you for sharing your vision with SYMSTRUO. We build in silence and evaluate every inquiry with precision. Our partners will review your note and connect with you within 24 hours.

SYMSTRUO • Venture Creation Company
https://symstruo.com
"""
        founder_html = build_founder_confirmation_email_html(lead)

        founder_msg.attach(MIMEText(founder_plain, "plain"))
        founder_msg.attach(MIMEText(founder_html, "html"))

        # Connect & dispatch
        if SMTP_PORT == 465:
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=15) as server:
                server.login(SMTP_USER, SMTP_PASSWORD)
                server.send_message(founder_msg)
        else:
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as server:
                server.starttls()
                server.login(SMTP_USER, SMTP_PASSWORD)
                server.send_message(founder_msg)

        logging.info(f"Confirmation auto-reply successfully sent to {lead.email}")
    except Exception as e:
        logging.error(f"Failed to dispatch confirmation email to {lead.email}: {e}", exc_info=True)

# ──────────────────────────────────────────────────
# FastAPI App
# ──────────────────────────────────────────────────
app = FastAPI(title="SYMSTRUO API")
api_router = APIRouter(prefix="/api")

@app.on_event("startup")
async def startup():
    if engine:
        try:
            async with engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
            logging.info("Connected to database and verified tables.")
        except Exception as e:
            logging.warning(f"Database connection could not be established ({e}). Running in standalone direct email mode.")

@app.on_event("shutdown")
async def shutdown():
    if engine:
        try:
            await engine.dispose()
        except Exception:
            pass

# ──────────────────────────────────────────────────
# Routes
# ──────────────────────────────────────────────────
@app.api_route("/", methods=["GET", "HEAD"])
async def root():
    return {"message": "SYMSTRUO — Venture Creation Company."}

@api_router.api_route("/", methods=["GET", "HEAD"])
async def api_root():
    return {"message": "SYMSTRUO — Venture Creation Company API."}

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate, background_tasks: BackgroundTasks):
    doc_id = str(uuid.uuid4())
    now_utc = datetime.now(timezone.utc)

    doc = ContactMessage(
        id=doc_id,
        name=payload.name,
        email=str(payload.email),
        company=payload.company or "",
        stage=payload.stage or "",
        message=payload.message,
        created_at=now_utc
    )

    # In-memory record so it persists in the running instance
    IN_MEMORY_CONTACTS.insert(0, doc)

    # If database is available, persist to DB gracefully
    if AsyncSessionLocal:
        try:
            async with AsyncSessionLocal() as session:
                orm_doc = ContactMessageORM(
                    id=doc_id,
                    name=payload.name,
                    email=str(payload.email),
                    company=payload.company or "",
                    stage=payload.stage or "",
                    message=payload.message,
                    created_at=now_utc
                )
                session.add(orm_doc)
                await session.commit()
        except Exception as db_err:
            logging.warning(f"Database persistence skipped: {db_err}. Email delivery will proceed normally.")

    # Trigger styled HTML emails in background
    background_tasks.add_task(send_lead_notification_emails, payload, doc_id, now_utc)

    return doc

@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts():
    # If database is connected, query DB
    if AsyncSessionLocal:
        try:
            async with AsyncSessionLocal() as session:
                result = await session.execute(
                    select(ContactMessageORM).order_by(ContactMessageORM.created_at.desc())
                )
                db_results = result.scalars().all()
                if db_results:
                    return db_results
        except Exception as db_err:
            logging.warning(f"Failed to query DB for contacts: {db_err}. Returning in-memory records.")

    return IN_MEMORY_CONTACTS

app.include_router(api_router)

# ──────────────────────────────────────────────────
# CORS Setup
# ──────────────────────────────────────────────────
configured_origins = os.environ.get("CORS_ORIGINS", "")
origins = [origin.strip() for origin in configured_origins.split(",") if origin.strip()]

# Essential origins for SYMSTRUO production and local testing
essential_origins = [
    "https://www.symstruo.com",
    "https://symstruo.com",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]
for origin in essential_origins:
    if origin not in origins:
        origins.append(origin)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(name)s %(levelname)s %(message)s")
