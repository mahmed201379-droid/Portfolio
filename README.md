# Portfolio — Sayem Ahamed

AI Engineer and Applied AI Researcher building production AI systems for education, healthcare, and research. Specializing in deep learning, medical image analysis, LLMs, RAG, and trustworthy AI.

**Live site**: [portfolio-xdk9.vercel.app](https://portfolio-xdk9.vercel.app)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML/CSS/JS, Tailwind CSS 2.2.19 (CDN), Font Awesome 6 (CDN) |
| Backend | FastAPI (Python), OpenAI GPT-4.1-mini |
| Chatbot | ByteBuddy — retrieves context from PDF resume and `summary.txt` |
| Deploy | Vercel (static files + serverless Python) |

## Local Development

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create `.env` in the repo root:

```
OPENAI_API_KEY=sk-...
PUSHOVER_TOKEN=...
PUSHOVER_USER=...
```

Run the backend:

```bash
uvicorn api.index:app --reload
```

Frontend is served by Vercel routing during dev (`vercel dev`) or can be opened directly from `public/index.html` for static-only viewing (chat will not work without the backend).

## File Structure

```
├── public/                    # Static frontend
│   ├── index.html             # Main page (hero, about, experience, projects, publications, skills, contact)
│   ├── style.css              # Cyberpunk dark theme (~1880 lines)
│   ├── script.js              # Chatbot UI, scroll animations, hacker effects
│   ├── sayem3.png             # Profile photo
│   └── favicon.svg            # SVG favicon
├── api/
│   ├── index.py               # FastAPI server with /chat POST endpoint
│   └── data/
│       ├── Profile.pdf        # PDF resume loaded at startup for chatbot context
│       └── summary.txt        # Text summary of verified profile for chatbot context
├── docs/
│   ├── portfolio-update-plan.md   # Source-of-truth plan for all content updates
│   └── portfolio-validation.md    # Validation checks, fixed issues, remaining limitations
├── vercel.json                # Vercel build & routing config
├── requirements.txt           # Python dependencies
├── AGENTS.md                  # Agent instructions
└── README.md                  # This file
```

## Content-Update Guidance

1. **Profile data** — Edit `api/data/summary.txt` to update what the chatbot knows. Keep factual, concise language.
2. **Projects** — Each project is a `.project-card` div in `index.html`. Follow the existing pattern (title, status badge, description, Key Capabilities list, Technologies tags, optional repo link).
3. **Publications** — Use `.publication-item` divs with `.status-badge` for status (published, submitted, ongoing, book-chapter).
4. **Skills** — Edit the `.skill-pill` spans in the Skills section. Each is a Font Awesome icon + text.
5. **Nav links** — Add new sections by duplicating the nav `<a>` and the corresponding `<section id="...">`.
6. **Theme** — CSS custom properties in `:root` of `style.css` control all neon colors. No build step required.

## Deployment

```bash
vercel deploy          # Deploy to production
vercel --prod          # Deploy current directory to production
```

No build step required. Vercel routes `/(.*)` → `public/$1` for static files and `/chat` → `api/index.py` for the FastAPI backend.

## Notes

- Chatbot context is loaded from `api/data/Profile.pdf` and `api/data/summary.txt` at startup. Restart the server after updating these files.
- The FastAPI backend requires `OPENAI_API_KEY` to function. Without it, the chat endpoint returns 503.
- CORS is configured for `https://portfolio-xdk9.vercel.app` only. Update `api/index.py` to add additional origins if needed.
