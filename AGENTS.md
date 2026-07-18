# AGENTS.md — Personal Portfolio

## Stack
- **Frontend**: vanilla HTML/CSS/JS in `public/` (Tailwind CSS via CDN, no framework).
- **Backend**: FastAPI Python server in `api/index.py`.
- **Deploy**: Vercel (`vercel.json` routes `/chat` → `api/index.py`, `/(.*)` → `public/$1`).

## Key files
| Path | Purpose |
|---|---|
| `public/index.html` | Page content (sections: hero, about, experience, projects, research, skills, contact) |
| `public/script.js` | Chatbot UI, scroll animations, hacker-themed visual effects |
| `public/style.css` | Cyberpunk dark theme (~1880 lines after dead CSS cleanup) |
| `api/index.py` | FastAPI server with `/chat` POST endpoint (GPT-4.1-mini + tool calling) |
| `api/data/Profile.pdf` | PDF resume read at startup as chatbot context |
| `api/data/summary.txt` | Text summary of verified profile read at startup as chatbot context |
| `api/test_index.py` | Pytest-based tests for the /chat endpoint |
| `docs/portfolio-update-plan.md` | Source-of-truth plan for all content updates |
| `docs/portfolio-validation.md` | Validation checks, fixed issues, remaining limitations |
| `vercel.json` | Build & routing config |
| `requirements.txt` | Python deps for `api/index.py` |

## Running locally
```bash
# Backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
# Requires .env with OPENAI_API_KEY, PUSHOVER_TOKEN, PUSHOVER_USER
uvicorn api.index:app --reload
```

Frontend is served by Vercel routing in dev/prod — no local dev server for `public/` files.

## Commands
- `vercel deploy` — deploy to Vercel (no build step required).
- `python -m pytest api/test_index.py -v` — run chatbot API tests.

## Dependencies
Backend: `fastapi`, `uvicorn`, `python-dotenv`, `openai`, `pypdf`, `requests`, `pydantic`, `pytest`, `httpx`.
Frontend: Tailwind CSS 2.2.19, Font Awesome 6 (both via CDN), `marked` (Markdown parse in chat).

## Chatbot
- Agent ("ByteBuddy") uses GPT-4.1-mini with two tools: `record_user_details` (Pushover) and `record_unknown_question`.
- Renders Markdown responses with a typing effect in the chat UI.
- Chat endpoint: `POST /chat` with `{ message: string, history: [{ role, content }] }`.
- Greeting fetched from `GET /chat/greeting` on first open.

## Constraints
- `.gitignore` ignores `.env`, `.env.example`, `venv/`, `__pycache__/`, `.DS_Store`, `.vercel`.
- Python backend file paths are built relative to `api/index.py` (`os.path.dirname(os.path.abspath(__file__))`).
- CORS allows `https://portfolio-xdk9.vercel.app` only (not `*`).
