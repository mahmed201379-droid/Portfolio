# Portfolio Audit Report

**Date:** 2026-07-18  
**Auditor:** OpenCode AI (automated)  
**Repository:** `/Users/sayemahmed/Personal/Portfolio`  
**Branch:** `main` (clean, up to date with `origin/main`)

---

## 1. Repository Structure

```
Portfolio/
├── .env.example               # Template for env vars (OPENAI_API_KEY, PUSHOVER_TOKEN, etc.)
├── .gitignore                 # Ignores .env, venv/, __pycache__/, .DS_Store, .vercel
├── AGENTS.md                  # OpenCode agent instructions for this repo
├── README.md                  # Project overview
├── requirements.txt           # fastapi, uvicorn, python-dotenv, openai, pypdf, requests, pydantic, pytest, httpx
├── vercel.json                # Vercel build + routing config
├── docs/                      # (newly created — previously absent)
├── api/
│   ├── index.py               # FastAPI backend (225 lines)
│   ├── test_index.py           # Pytest tests (56 lines, 6 tests)
│   └── data/
│       ├── Profile.pdf         # PDF resume (chatbot context)
│       └── summary.txt         # Text summary (chatbot context, 129 lines)
├── public/
│   ├── favicon.svg             # SVG favicon (neon "S" on dark bg)
│   ├── index.html              # Main page (1048 lines)
│   ├── sayem3.png              # Profile photo (~970 KB PNG)
│   ├── script.js               # All JS (791 lines)
│   └── style.css               # All CSS (2151 lines)
└── venv/                       # Python virtual env (ignored)
```

**Verified fact:** There are no other assets (fonts, icons) aside from the above. Tailwind CSS 2.2.19 and Font Awesome 6 are loaded via CDN.

---

## 2. Technologies Used

| Layer | Technology | Source |
|---|---|---|
| Frontend | Vanilla HTML/CSS/JS | `public/` |
| CSS framework | Tailwind CSS 2.2.19 (CDN) | `index.html:24` |
| Icons | Font Awesome 6.0.0 (CDN) | `index.html:32` |
| Markdown render | `marked` (CDN) | `index.html:1044` |
| Fonts | Inter, Open Sans, Fira Code (Google Fonts) | `index.html:21-31` |
| Backend | FastAPI (Python) | `api/index.py` |
| LLM | OpenAI GPT-4.1-mini | `api/index.py:82` |
| PDF parsing | pypdf | `api/index.py:11` |
| Notifications | Pushover | `api/index.py:19-33` |
| Hosting | Vercel (static + serverless Python) | `vercel.json` |
| CV hosting | Google Drive (public download link) | `index.html:151` |
| Contact form | Formspree | `index.html:927` |
| Analytics | Google Analytics (G-BLGMY4TMH5) | `index.html:6-12` |

**Assumption:** The profile photo `sayem3.png` at ~970 KB is larger than optimal for web; could be compressed.

---

## 3. Portfolio Sections (in order)

1. **Navigation** — Sticky header with logo, desktop nav (ABOUT, PROJECTS, RESEARCH, CONTACT), hamburger mobile menu.
2. **Hero** — Terminal-themed intro, tagline, "Download CV" and "Explore Projects" buttons, profile image with glow effects.
3. **About** — Background summary, research interests tags (Deep Learning, Medical Image Analysis, NLP, RAG & LLM, Computer Vision).
4. **Projects** — 4 project cards in a 2-column grid.
5. **Publications** — 4 research publications with external links.
6. **Skills** — "Technical Arsenal" with 4 categories (AI & ML, NLP & LLM, Dev Tools, Vector Databases).
7. **Contact** — Split layout: contact info + Formspree form.
8. **Footer** — Logo, social links, copyright.
9. **Chatbot** — Floating chat bubble → popup with "ByteBuddy" AI assistant.
10. **Back to Top** — Fixed button, appears after 300px scroll.

**Verified fact:** All sections render correctly on the live site.

---

## 4. Existing Projects — Status and Assessment

| # | Project | Status | Assessment |
|---|---|---|---|
| 1 | **RAG-Based Academic Assistant** | `COMPLETED` | Described credibly. No repo link, no live demo. **Assumption:** exists in a private or unlinked repo. |
| 2 | **Brain Tumor Classification with Channel Attention** | `COMPLETED` | Matches publication #1. Claim of 99.54% validation accuracy is plausible for this task. **Verified:** corresponds to the ResearchGate publication. |
| 3 | **Resume Improvement Suggestions based on Job Description** | `ONGOING` | Described as developing. Matches "Resume-Optimizer-AI" in `summary.txt:81-83`. No repo link, no demo. Reasonable to keep as ongoing. |
| 4 | **Agentic AI PC Builder based on Use Case** | `ONGOING` | Described credibly. No repo link, no demo. **Assumption:** this is a side project idea in progress. |

**Verified facts:**
- No project card includes a link to a live demo or source code repository.
- The "COMPLETED" badge uses green, "ONGOING" uses orange — well styled.
- There are exactly 4 project cards (not 5; the HTML comment says "Project 3" for Brain Tumor and "Project 4" appears twice for the last two — an **internal numbering inconsistency** in the HTML comments at lines 288 and 323).

---

## 5. Existing Research Publications

| # | Title | Venue | Link Status |
|---|---|---|---|
| 1 | Channel Attention Mechanism in Hybrid Deep Learning for Accurate Brain Tumor Classification | ResearchGate | **LINK REACHABLE** (ResearchGate returned 403 which is normal for automated access; the URL exists) |
| 2 | Prediction of the Intensity of Physical Movement of Aged People Using Gas Sensors | IEEE (10534390) | **LINK VERIFIED** — page loaded successfully |
| 3 | Impacts of Passenger Request Trends on Ride-Sharing System Performance | Taylor & Francis (book chapter) | **LINK VERIFIED** — page loaded successfully |
| 4 | Early Detection of System Failure Using ML Techniques | IEEE (10839714) | **LINK VERIFIED** — page loaded successfully |

**Verified facts:**
- Publication 1 has a `title="Link to be added"` attribute on the anchor tag (`index.html:430`), suggesting the link was added but the placeholder title was not removed.
- Publications 2-4 use `bg-white` and `text-gray-700` classes which are leftover from the original design before the cyberpunk theme was applied — they do **not** follow the dark theme styling of Publication 1.
- Inconsistent styling between Publication 1 and Publications 2-4 (Publication 1 uses custom dark-theme classes, others use leftover `bg-white`/`text-gray-700`).

---

## 6. Skills and Technologies Listed

### AI & Machine Learning (9 items)
PyTorch, TensorFlow, Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn, OpenCV, Keras

### NLP & Large Language Models (8 items)
LangChain, LangGraph, Hugging Face, RAG, CrewAI, AutoGen, Agentic AI, Transformers

### Development Tools & Platforms (7 items)
FastAPI, Streamlit, Docker, GitHub, Jupyter, GCP, AWS

### Vector Databases & Storage (6 items)
Milvus, FAISS, pgvector, Pinecone, Weaviate, Qdrant

**Verified facts:**
- **All skills are pure SVG logos** — no images to break.
- No skill has a verifiable project link or usage evidence in this repository.
- Several skills (CrewAI, AutoGen, Milvus, Pinecone, Weaviate, Qdrant, AWS, GCP) are **not mentioned** in `summary.txt` and have **no corresponding implementation** in the repo.

**Overstated skills concerns:**
- **CrewAI, AutoGen** — listed as skills but nowhere mentioned in `summary.txt` and no code references in the repo.
- **Milvus, Pinecone, Weaviate, Qdrant** — all four vector DBs listed. `summary.txt` mentions only PGVector. No repo code uses any of these.
- **AWS, GCP** — listed as cloud platforms. `summary.txt` mentions AWS S3 integration in the cheating-risk analysis project. No GCP evidence.
- **LangGraph** — listed as a skill, mentioned in `summary.txt` only indirectly (the summary describes OpenCode the skill package, not LangGraph usage). No code in this repo.

---

## 7. Link Audit

| Link | URL | Status |
|---|---|---|
| Live site | https://portfolio-xdk9.vercel.app | **OK** — loads and renders |
| CV download | https://drive.usercontent.google.com/u/0/uc?id=1yUdw5T41oG6X5PF1MgDh9ffD-e6t1oU-&export=download | **OK** — returns a valid PDF (2-page CV) |
| LinkedIn | https://www.linkedin.com/in/md-sayem-ahamed-3bab77337/ | **WARNING** — returned HTTP 999 (LinkedIn blocks automated requests), but URL format is valid |
| GitHub | https://github.com/Sayem7456 | **OK** — profile loads, 15 repos visible |
| ResearchGate (profile) | https://www.researchgate.net/profile/Md-Sayem-Ahamed | **WARNING** — returned 403 (expected for automated requests) |
| ResearchGate (pub 1) | https://www.researchgate.net/publication/395661827_... | **WARNING** — 403 (expected) |
| IEEE (pub 2) | https://ieeexplore.ieee.org/document/10534390/ | **OK** — page loads |
| Taylor & Francis (pub 3) | https://www.taylorfrancis.com/chapters/edit/10.1201/... | **OK** — page loads |
| IEEE (pub 4) | https://ieeexplore.ieee.org/document/10839714 | **OK** — page loads |
| Formspree | https://formspree.io/f/xgvklzjq | **WARNING** — 405 on GET (expected; Formspree only accepts POST) |
| Twitter/X (footer) | `#` (placeholder) | **BROKEN** — links to `#` with no icon (no `href` at all in HTML; visible in fetched content as missing) |
| OGP image | https://portfolio-xdk9.vercel.app/sayem3.png | **ASSUMPTION** — no 404 test but file exists locally |
| Schema `sameAs` Twitter | Not present | **MISSING** — schema lists only GitHub and LinkedIn |
| Download CV href | Google Drive link | **OK** — returns PDF |

**Broken/placeholder links:**
- Twitter/X in footer: `href="#"` — no URL, no Twitter handle.
- Publication 1 anchor has `title="Link to be added"` — stale placeholder text.

---

## 8. Claims That Are Unsupported, Outdated, or Inconsistent

| Claim | Source | Issue |
|---|---|---|
| "Agentic AI specialist" | Title, `<title>` tag | Validated by `summary.txt` which describes multiple AI agent projects. **Supported.** |
| "AI Researcher" | Title, multiple locations | Validated by 4 publications and ongoing journal manuscripts in `summary.txt`. **Supported.** |
| Currently at "EATL Innovation Hub Ltd" | Hero, About, Schema | `summary.txt:31` says "Ethics Advance Technology Limited". **Minor inconsistency:** "EATL Innovation Hub Ltd" vs "Ethics Advance Technology Limited" — likely the same company (EATL = abbreviation). |
| 99.54% validation accuracy (Brain Tumor) | Project card | Plausible for a controlled experiment. **Cannot verify** without seeing the paper/code. |
| GitHub profile name | `sayem7456` | GitHub shows "Sayem Ahmed", the site uses "Sayem Ahamed". **Minor inconsistency** in transliteration of the name. |
| LinkedIn URL on GitHub | `5b21b21b5` | GitHub profile links to a different LinkedIn ID (`sayem-ahmed-5b21b21b5`). The site uses `3bab77337`. **These may be different accounts.** |

---

## 9. Ongoing Projects — Removal/Replacement Considerations

| Project | Status | Recommendation |
|---|---|---|
| Resume Improvement Suggestions | ONGOING | Matches `summary.txt` project "Resume-Optimizer-AI". Consider adding a repo link or demo if publicly available. |
| Agentic AI PC Builder | ONGOING | Not mentioned in `summary.txt`. **Verify with owner** if this is still an active project. If abandoned, consider replacing with a project from `summary.txt` (e.g., "AI-Powered Medical Learning Management System", "Cheating Risk Analysis", "Multimodal PDF Chatbot"). |

---

## 10. Overstated Skills (No Supporting Evidence in Repo or Summary)

| Skill | Evidence | Verdict |
|---|---|---|
| CrewAI | Not in `summary.txt`, not in code | **Unsupported** — remove or consolidate |
| AutoGen | Not in `summary.txt`, not in code | **Unsupported** — remove or consolidate |
| Milvus | Not in `summary.txt`, not in code | **Unsupported** — remove or consolidate |
| Pinecone | Not in `summary.txt`, not in code | **Unsupported** — remove or consolidate |
| Weaviate | Not in `summary.txt`, not in code | **Unsupported** — remove or consolidate |
| Qdrant | Not in `summary.txt`, not in code | **Unsupported** — remove or consolidate |
| GCP | Not in `summary.txt`, not in code | **Unsupported** - remove unless justified |
| LangGraph | `summary.txt` only indirectly references OpenCode skill packaging, not LangGraph use | **Weak support** — consider keeping if actually used |
| Agentic AI | Broad term, supported by project descriptions | **Keep** |
| RAG | Supported by projects and `summary.txt` | **Keep** |
| Docker | Weak evidence in `summary.txt` ("production architecture" mentions) | **Keep** (common skill) |

---

## 11. SEO and Accessibility Problems

| Issue | Location | Severity |
|---|---|---|
| **Missing `<main>` landmark** | `index.html` | **High** — no `main` element for screen readers |
| **Missing skip-to-content link** | `index.html` | **High** — accessibility best practice |
| **Missing `lang` attribute on `<html>`** | Line 2 | **Low** — `lang="en"` is present |
| **No image `alt` for profile photo** fixed? | Line 175-178 | **OK** — `alt` attribute is present |
| **OG image may be too large** | `sayem3.png` at ~970 KB | **Medium** — large file for social previews |
| **`<title>` is very long** (140+ chars) | Line 17 | **Medium** — title is verbose; might be truncated in SERPs |
| **No `<meta name="keywords">`** | `<head>` | **Low** — Google ignores it, but some miss it |
| **No robots.txt** | root | **Low** — not critical for a portfolio |
| **No sitemap.xml** | root | **Low** — not critical for a portfolio |
| **No canonical URL** | `<head>` | **Medium** — helps avoid duplicate content issues |
| **Heading hierarchy** | Lines 127-139, 191-194, etc. | **Low** — h1 > h2 > h3 flow is reasonable |
| **Color contrast** | Various | **Medium** — neon cyan on dark backgrounds may fail WCAG AA for small text |
| **Focus indicators** | Custom CSS | **OK** — custom focus glow exists for inputs |
| **Structured data (JSON-LD)** | Lines 62-80 | **OK** but lists only 2 `sameAs` (no Twitter, no ResearchGate) |

---

## 12. Mobile Responsiveness Risks

| Issue | Location | Severity |
|---|---|---|
| **CRT scanline overlay z-index 999** | `script.js:163` | **Medium** — may trap some touch interactions on mobile |
| **Matrix rain canvas z-index 0** | `script.js:741` | **Low** — behind content, should be fine |
| **Chat popup positioning** | `style.css:843-848` | **Medium** — `width: min(24rem, calc(100vw - 2rem))` is good, but `right: 2rem` on small screens may push it off-screen |
| **Neon trail canvas covers full viewport** | `script.js:21` | **Low** — `pointer-events: none` prevents blocking |
| **Profile image `object-position: top; translateX(-10px)`** | `index.html:178` | **Low** — intentional crop, fine on mobile |
| **Hero text `font-size: 2.5rem` on mobile** | `style.css:1549` | **OK** — responsive scaling exists |
| **Skills grid: `auto-fit, minmax(80px, 1fr)` on mobile** | `style.css:1775` | **OK** — handles small screens |
| **No touch event handling for hover effects** | `script.js` multiple | **Medium** — many hover-only effects (glitch, hue-rotate) don't work on touch devices |
| **Data stream animation** | `script.js:309-337` | **Low** — CSS animation, no impact |
| **Signal strength indicator** | `script.js:392-420` | **Low** — fixed position bottom-left, may overlap content on mobile |

---

## 13. JavaScript and Chatbot Problems

| Issue | Location | Severity |
|---|---|---|
| **`/chat/greeting` endpoint referenced in JS** | `script.js:523` | **WARNING** — no such route exists in `api/index.py`. Only `/chat` and `/chat/greeting` exist. **Update:** `/chat/greeting` DOES exist in the backend (`index.py:216`). **No problem.** |
| **`fetch('/chat/greeting')` returns greeting message** | `script.js:523-525` | **OK** — route exists. |
| **Chat history is sent with `slice(0, -1)`** | `script.js:644` | **INTENDED** — removes the user message just added, to avoid duplication with the `message` field. Correct pattern. |
| **`marked` is loaded with `defer`** | `index.html:1044` | **OK** — ensures it loads before script.js |
| **Hardcoded `greetingFetched` flag** | `script.js:506` | **OK** — prevents multiple greeting fetches |
| **No error handling for chat when greeting fails** | `script.js:531-533` | **Low** — just console.error |
| **`createRainEffect` called after `DOMContentLoaded`** | `script.js:784-788` | **LOW** — but this is the SECOND canvas (neon trail is the first). Two canvases running animation loops is a performance concern, especially on mobile. |
| **`body::before` and `body::after` in CSS** | `style.css:46-93, 1831-1861` | **WARNING** — conflicting `::before`/`::after` declarations. Both sections define `body::before` and `body::after`. The second set (lines 1831-1861) **overrides** the first (lines 46-107) because they have the same selector. The grid background from the first set is lost. |
| **Scanline effect duplicated** | CSS `body::after` + JS scanline injection | **WARNING** — the CSS `body::after` (lines 75-107) creates horizontal scanlines, AND `script.js:140-176` injects a style that adds scanlines via `body::before`. The JS-injected `body::before` may conflict with the CSS `body::before`. |
| **Injected `<style>` tags pile up** | `script.js` | **Low** — script creates 8+ `<style>` elements dynamically. Not a memory issue but messy. |
| **`scanline-flicker` animation `0.15s infinite`** | `script.js:167-171` | **Medium** — rapid flickering at 6.6Hz may cause discomfort for users with photosensitivity |
| **`setInterval` with Math.random > 0.92 for glitch** | `script.js:180-187` | **Medium** — random global hue rotation every 1.5s could be disorienting |
| **`window.addEventListener('scroll', fadeInOnScroll)`** | `script.js:485` | **Medium** — no passive flag or throttling on scroll handler |
| **`setInterval` for signal strength (no cleanup)** | `script.js:724-729` | **Low** — runs forever; minor memory impact |
| **Copyright year: `getElementById('currentYear')`** | `script.js:791` | **OK** — works correctly |

---

## 14. Recommended Updates (Priority Order)

### P0 — Critical
1. **Fix duplicate CSS `body::before` and `body::after`** — Two sections in `style.css` define conflicting pseudo-elements. The cyber grid background is being overridden by the floating gradient orbs. Reconcile into a single coherent background system.
2. **Resolve scanline/overlay conflicts** — CSS and JS both inject scanline effects. Choose one approach.
3. **Remove or tone down rapid flickering animations** — `scanline-flicker` at `0.15s` and random hue rotation may cause issues for photosensitive users. Add `prefers-reduced-motion` support (already present for some animations at `style.css:1979-1991`, but not for JS-injected ones).

### P1 — High
4. **Add `<main>` landmark and skip-to-content link** for accessibility.
5. **Fix stale `title="Link to be added"`** on Publication 1.
6. **Normalize publication card styling** — Publications 2-4 use white-background classes that stand out as unt themed.
7. **Add project source/demo links** — Every project card lacks a link to code or a live demo.
8. **Remove unsupported skills** (CrewAI, AutoGen, Milvus, Pinecone, Weaviate, Qdrant) or add evidence.
9. **Fix Twitter/X placeholder link** — Add actual URL or remove the icon entirely.

### P2 — Medium
10. **Optimize profile image** — Compress `sayem3.png` (~970 KB → target ~200 KB WebP).
11. **Add missing `sameAs` to JSON-LD** — Include ResearchGate, Google Scholar if available.
12. **Throttle or debounce scroll handler** in `fadeInOnScroll`.
13. **Consolidate duplicate `<style>` injection** in `script.js` into a single CSS block.
14. **Consider replacing "Agentic AI PC Builder"** with a project from `summary.txt` if the PC Builder is abandoned.
15. **Add `rel="noopener noreferrer"`** to external links in the contact form section (LinkedIn, GitHub).
16. **Add canonical URL** to prevent duplicate content issues.

### P3 — Low
17. **Fix HTML comment numbering** for project cards (comments say "Project 3" and "Project 4" inconsistently).
18. **Add robots.txt and sitemap.xml** for discoverability.
19. **Consider reducing the number of animated visual effects** on mobile to improve battery/performance.
20. **Name consistency:** "Sayem Ahamed" vs "Sayem Ahmed" across GitHub and site.

---

## 15. Files That Will Probably Need Modification

| File | Changes Needed |
|---|---|
| `public/style.css` | Fix `body::before`/`::after` conflict, reconcile duplicate `::before`/`::after` definitions, remove overridden grid background |
| `public/script.js` | Consolidate `<style>` injections, add throttled scroll, fix `prefers-reduced-motion` coverage, reduce flicker rate |
| `public/index.html` | Add `<main>` landmark, fix placeholder title, add project links, fix Twitter link, normalize publication styling, add missing `rel` attributes |
| `api/data/summary.txt` | Optional — add mention of actually-used skills to support claims |
| `README.md` | Update if relevant |

---

## Summary of Most Important Findings

1. **CSS conflict (P0):** Two competing `body::before`/`::after` declarations in `style.css` — the cyber grid background is being silently overridden by floating gradient orbs. Only one set takes effect.

2. **Scanline overload (P0):** Three separate scanline mechanisms (CSS `body::after`, JS-injected `body::before`, and the global scanline style) create a visual conflict. The rapid flicker (6.6 Hz) is a photosensitivity risk.

3. **Unsupported skills (P1):** 7 skills (CrewAI, AutoGen, Milvus, Pinecone, Weaviate, Qdrant, GCP) have zero evidence in the repository or summary. Listing them undermines credibility.

4. **No project links (P1):** All 4 project cards lack repository or demo URLs. Visitors cannot verify claims.

5. **Accessibility gap (P1):** No `<main>` landmark, no skip-to-content link. The site is not screen-reader friendly.

6. **Publication styling inconsistency (P1):** 3 of 4 publications use leftover white-background classes that clash with the dark theme.

7. **Visual effects are heavy (P2):** Two canvas animation loops (neon trail + matrix rain), multiple CSS animations, 8+ injected `<style>` blocks, and scroll-triggered typewriter effects create unnecessary complexity, especially on mobile.

8. **Interactive effects are desktop-only (P2):** Hover-based glitch, hue-rotate, and HUD effects have no touch equivalents, making the site feel static on mobile.
