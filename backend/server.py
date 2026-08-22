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

DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://symstruo:symstruo_pass@localhost:5432/symstruo_db")
# asyncpg requires the "postgresql+asyncpg://" prefix
ASYNC_DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")

SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "465")) # Gmail uses 465 for SSL or 587 for TLS
SMTP_USER = os.environ.get("SMTP_USER")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", SMTP_USER)

# ──────────────────────────────────────────────────
# SQLAlchemy Async Setup
# ──────────────────────────────────────────────────
Base = declarative_base()
engine = create_async_engine(ASYNC_DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

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
# Email Notification Function (Sync for Background)
# ──────────────────────────────────────────────────
def send_lead_email(lead: ContactCreate):
    if not SMTP_USER or not SMTP_PASSWORD:
        logging.warning(f"SMTP credentials not configured (User: {bool(SMTP_USER)}, Pass: {bool(SMTP_PASSWORD)}). Skipping email notification.")
        return

    try:
        msg = MIMEMultipart()
        msg["From"] = SMTP_USER
        msg["To"] = ADMIN_EMAIL
        msg["Subject"] = f"🚀 New SYMSTRUO Lead: {lead.name}"

        body = f"""New lead submitted via the SYMSTRUO contact form:

Name: {lead.name}
Email: {lead.email}
Company: {lead.company or 'N/A'}
Stage: {lead.stage or 'N/A'}

Message:
{lead.message}
"""
        msg.attach(MIMEText(body, "plain"))

        logging.info(f"Connecting to SMTP server {SMTP_HOST}:{SMTP_PORT}...")
        if SMTP_PORT == 465:
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=15) as server:
                server.login(SMTP_USER, SMTP_PASSWORD)
                server.send_message(msg)
        else:
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as server:
                server.starttls()
                server.login(SMTP_USER, SMTP_PASSWORD)
                server.send_message(msg)

        logging.info(f"Lead email notification successfully sent to {ADMIN_EMAIL}")
    except Exception as e:
        logging.error(f"Failed to send lead email to {ADMIN_EMAIL}: {str(e)}", exc_info=True)

# ──────────────────────────────────────────────────
# FastAPI App
# ──────────────────────────────────────────────────
app = FastAPI(title="SYMSTRUO API")
api_router = APIRouter(prefix="/api")

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.on_event("shutdown")
async def shutdown():
    await engine.dispose()

# ──────────────────────────────────────────────────
# Routes
# ──────────────────────────────────────────────────
@app.api_route("/", methods=["GET", "HEAD"])
async def root():
    return {"message": "SYMSTRUO — Build in Silence."}

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate, background_tasks: BackgroundTasks):
    async with AsyncSessionLocal() as session:
        doc = ContactMessageORM(
            id        = str(uuid.uuid4()),
            name      = payload.name,
            email     = str(payload.email),
            company   = payload.company or "",
            stage     = payload.stage or "",
            message   = payload.message,
            created_at= datetime.now(timezone.utc),
        )
        session.add(doc)
        await session.commit()
        await session.refresh(doc)
        
        # Trigger email notification in the background
        background_tasks.add_task(send_lead_email, payload)
        
        return doc

@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts():
    # We still keep the list endpoint for testing or checking DB directly
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(ContactMessageORM).order_by(ContactMessageORM.created_at.desc())
        )
        return result.scalars().all()

app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(name)s %(levelname)s %(message)s")
