# SYMSTRUO backend regression: root, contact create/list (PostgreSQL), validation
# NOTE: each successful POST sends REAL emails (Hostinger SMTP). Keep to 1 valid POST.
import os
import subprocess
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL').rstrip('/')


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health
def test_api_root(api):
    r = api.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert "SYMSTRUO" in r.json()["message"]


# Contact create -> list -> postgres persistence (single real email send)
def test_contact_create_list_and_db(api):
    payload = {"name": "TEST_QA One", "email": "qa+1@example.com", "company": "TEST_Co",
               "stage": "Idea", "message": "TEST_ backend regression message"}
    r = api.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 200, r.text
    d = r.json()
    assert isinstance(d["id"], str) and len(d["id"]) == 36
    for k in ("name", "email", "company", "stage", "message"):
        assert d[k] == payload[k]
    assert "_id" not in d and d["created_at"]

    r2 = api.get(f"{BASE_URL}/api/contact")
    assert r2.status_code == 200
    items = r2.json()
    assert isinstance(items, list)
    match = [m for m in items if m["id"] == d["id"]]
    assert match and match[0]["email"] == "qa+1@example.com"
    # newest first
    assert items[0]["id"] == d["id"]

    out = subprocess.run(
        ["su", "postgres", "-c",
         f"psql -d symstruo_db -tAc \"select email from contact_messages where id='{d['id']}'\""],
        capture_output=True, text=True)
    assert out.stdout.strip() == "qa+1@example.com", out.stderr


# Validation (no emails sent)
@pytest.mark.parametrize("body", [
    {"name": "x", "email": "notanemail", "message": "hi"},
    {"name": "", "email": "qa+v@example.com", "message": "hi"},
    {"name": "x", "email": "qa+v@example.com", "message": ""},
    {"email": "qa+v@example.com", "message": "hi"},
    {"name": "x" * 121, "email": "qa+v@example.com", "message": "hi"},
    {"name": "x", "email": "qa+v@example.com", "message": "m" * 4001},
])
def test_contact_validation_422(api, body):
    r = api.post(f"{BASE_URL}/api/contact", json=body)
    assert r.status_code == 422, r.text
    assert "detail" in r.json()
