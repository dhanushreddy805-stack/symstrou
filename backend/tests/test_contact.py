import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://direction-lab-1.preview.emergentagent.com').rstrip('/')


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def test_root(api):
    r = api.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert "AEDIFICA" in r.json().get("message", "")


def test_contact_create_and_persist(api):
    payload = {
        "name": "TEST_User",
        "email": "test_user@example.com",
        "company": "TEST_Co",
        "stage": "Idea",
        "message": "TEST message for contact endpoint.",
    }
    r = api.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["id"]
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["message"] == payload["message"]
    assert "created_at" in data

    # verify persisted via list
    r2 = api.get(f"{BASE_URL}/api/contact")
    assert r2.status_code == 200
    ids = [m["id"] for m in r2.json()]
    assert data["id"] in ids


def test_contact_validation_missing_fields(api):
    r = api.post(f"{BASE_URL}/api/contact", json={"name": "", "email": "bad", "message": ""})
    assert r.status_code == 422


def test_contact_invalid_email(api):
    r = api.post(f"{BASE_URL}/api/contact", json={"name": "x", "email": "notanemail", "message": "hi"})
    assert r.status_code == 422
