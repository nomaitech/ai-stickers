from dotenv import load_dotenv

import os
import json
import hmac
import hashlib
import textwrap
from typing import Any, Dict

import httpx
from fastapi import FastAPI, Request, Header, HTTPException

load_dotenv()
app = FastAPI()

TELEGRAM_BOT_TOKEN = os.environ["TELEGRAM_BOT_TOKEN"]
TELEGRAM_CHAT_ID = os.environ["TELEGRAM_CHAT_ID"]
WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET")

BOT_API_BASE = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}"

def verify_secret(incoming_secret: str | None) -> None:
    if WEBHOOK_SECRET:
        if not incoming_secret or not hmac.compare_digest(incoming_secret, WEBHOOK_SECRET):
            raise HTTPException(status_code=401, detail="Invalid secret")

def pick(payload: Dict[str, Any], *keys, default="") -> str:
    for k in keys:
        content = payload
        for identifier in k.split("."):
            if not isinstance(content, dict) or identifier not in content:
                content = None
                break
            content = content[identifier]
        if isinstance(content, (str, int, float)) and content is not None:
            return str(content)
    return default

def format_message(body: Dict[str, Any]) -> str:
    """
    Handles common Sentry webhook shapes for Issue Alerts and Metric/Performance alerts.
    This focuses on robust field-picking without relying on a single schema.
    """

    project   = pick(body, "project", "data.project", "project_name")
    envt      = pick(body, "environment", "data.event.environment")
    level     = pick(body, "level", "data.event.level", "event.level")
    title     = pick(body, "title", "data.event.title", "data.issue.title", "message")
    culprit   = pick(body, "culprit", "data.event.culprit")
    issue_url = pick(body, "url", "data.url", "web_url", "permalink")

    if not title:
        title = pick(body, "data.issue.short_id", "data.triggered_rule", default="Sentry Alert")

    release   = pick(body, "data.event.release")
    fingerprint = pick(body, "data.event.fingerprint")
    txn       = pick(body, "data.event.transaction")
    rule      = pick(body, "data.triggered_rule")

    lines = []
    lines.append(f"[Sentry] {title}")
    if project: lines.append(f"Project: {project}")
    if envt:    lines.append(f"Environment: {envt}")
    if level:   lines.append(f"Level: {level}")
    if culprit: lines.append(f"Culprit: {culprit}")
    if txn:     lines.append(f"Transaction: {txn}")
    if rule:    lines.append(f"Rule: {rule}")
    if release: lines.append(f"Release: {release}")
    if fingerprint: lines.append(f"Fingerprint: {fingerprint}")
    if issue_url: lines.append(f"URL: {issue_url}")

    event_msg = pick(body, "data.event.message", "event.message")
    if event_msg:
        lines.append("")
        snippet = textwrap.shorten(event_msg, width=600, placeholder=" …")
        lines.append(snippet)

    return "\n".join(lines)

async def send_telegram(text: str) -> None:
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.post(
            f"{BOT_API_BASE}/sendMessage",
            json={
                "chat_id": TELEGRAM_CHAT_ID,
                "text": text,
                "disable_web_page_preview": True,
                "parse_mode": "HTML"
            },
        )
        resp.raise_for_status()

@app.post("/sentry")
async def sentry_webhook(
    request: Request,
    x_webhook_secret: str | None = Header(default=None, convert_underscores=False),
):
    qp_secret = request.query_params.get("secret")
    incoming_secret = x_webhook_secret or qp_secret
    verify_secret(incoming_secret)

    try:
        body = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON")

    text = format_message(body)
    await send_telegram(text)
    return {"ok": True}

@app.get("/health")
async def health():
    return {"ok": True}