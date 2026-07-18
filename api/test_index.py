import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
import os

# Mock external dependencies before importing the app module
mock_reader = MagicMock()
mock_reader.pages = []

with patch("builtins.open", MagicMock()), \
     patch("pypdf.PdfReader", return_value=mock_reader), \
     patch("openai.OpenAI"), \
     patch.dict(os.environ, {"OPENAI_API_KEY": "sk-test"}, clear=False):
    from index import app, MAX_HISTORY_TURNS

client = TestClient(app)


def test_root_returns_ok():
    resp = client.get("/")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}


def test_chat_greeting_returns_message():
    resp = client.get("/chat/greeting")
    assert resp.status_code == 200
    data = resp.json()
    assert "greeting" in data
    assert "ByteBuddy" in data["greeting"]


def test_chat_empty_body_returns_422():
    resp = client.post("/chat", json={})
    assert resp.status_code == 422


def test_chat_missing_history_works():
    with patch("index.Me.chat", return_value="Hello!"):
        resp = client.post("/chat", json={"message": "hi"})
        assert resp.status_code == 200
        assert resp.json() == {"response": "Hello!"}


def test_chat_with_history():
    with patch("index.Me.chat", return_value="Sure!"):
        resp = client.post("/chat", json={
            "message": "tell me more",
            "history": [{"role": "user", "content": "hi"}, {"role": "assistant", "content": "hello"}]
        })
        assert resp.status_code == 200
        assert resp.json() == {"response": "Sure!"}


def test_history_pruning_constant():
    assert MAX_HISTORY_TURNS == 20
