# Portfolio Update Plan (Revised)

**Date:** 2026-07-18  
**Source of truth:** Verified professional profile supplied by the owner.  

---

## 1. Browser Title and SEO Metadata

### 1.1 — `<title>` tag too long (140+ chars)

| Field | Value |
|---|---|
| **Current problem** | `<title>Md Sayem Ahamed \| AI Engineer & AI Researcher \| LLM & Agentic AI Specialist</title>` — verbose, risks truncation in SERPs |
| **Proposed replacement** | `<title>Sayem Ahamed — AI Engineer \| Deep Learning, LLM & Medical AI</title>` (~63 chars) |
| **Target file** | `public/index.html`, line 17 |
| **Target element** | `<title>` tag inside `<head>` |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | View in browser tab, test with preview tools |

### 1.2 — Primary meta description

| Field | Value |
|---|---|
| **Current problem** | Existing description is adequate but slightly long |
| **Proposed replacement** | `Portfolio of Sayem Ahamed, an AI Engineer and researcher specializing in deep learning, medical image analysis, LLMs, RAG, and production AI systems.` |
| **Target file** | `public/index.html`, lines 41-43 |
| **Target element** | `<meta name="description">` |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | View page source, check length ≤ 160 chars |

### 1.3 — Missing canonical URL

| Field | Value |
|---|---|
| **Current problem** | No `<link rel="canonical">` |
| **Proposed replacement** | Add `<link rel="canonical" href="https://portfolio-xdk9.vercel.app/">` after line 18 |
| **Target file** | `public/index.html`, after line 18 |
| **Target element** | New `<link>` tag in `<head>` |
| **Change type** | Functional |
| **Risk** | Low |
| **Validation** | View page source, verify `href` matches live URL |

### 1.4 — Open Graph / Twitter meta tags

| Field | Value |
|---|---|
| **Current problem** | OG title is generic. No Twitter `site` handle. |
| **Proposed replacement** | OG title: `Sayem Ahamed — AI Engineer \| Deep Learning, LLM & Medical AI`. Remove `twitter:site` if no handle exists. Shorten OG description to match primary meta. |
| **Target file** | `public/index.html`, lines 46-59 |
| **Target element** | `<meta property="og:*">` and `<meta name="twitter:*">` |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Test with Open Graph debugger |

---

## 2. Hero Section

### 2.1 — Refine subtitle and tagline

| Field | Value |
|---|---|
| **Current problem** | Subtitle `[ AI Engineer \| AI Researcher \| Agentic AI Dev ]` uses "Agentic AI Dev" which is non-standard. Terminal prefix `> NEURAL.INIT _` adds no information. Tagline mentions `LLMs, RAG, and Agentic AI. Currently @EATL_Innovation_Hub` which is mostly correct but uses the short brand name inconsistently with the full legal name. |
| **Proposed replacement** | Keep `[ AI Engineer \| AI Researcher \| Agentic AI Dev ]` as-is (it matches the profile). Update tagline to: `→ Specializing in deep learning, LLMs, RAG, and medical AI. Currently @EATL Innovation Hub Ltd.` — more specific and accurate. Use the full legal name consistently: `Ethics Advance Technology Limited (EATL Innovation Hub Ltd)` in the about section, and `EATL Innovation Hub Ltd` in shorter contexts like the hero tagline. |
| **Target file** | `public/index.html`, lines 133-149 |
| **Target element** | `<h2>` subtitle and `<p>` tagline |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Visual check in browser |

### 2.2 — Profile image size

| Field | Value |
|---|---|
| **Current problem** | `sayem3.png` is ~970 KB — impacts LCP |
| **Proposed replacement** | Convert to WebP at ~200-300 KB. Keep `sayem3.png` as fallback in `<picture>` element. |
| **Target file** | `public/index.html`, lines 175-178 |
| **Target element** | `<img src="sayem3.png">` |
| **Change type** | Layout-related (new asset `sayem3.webp`) |
| **Risk** | Low |
| **Validation** | Check browser loads WebP, fallback to PNG works. Run Lighthouse. |

---

## 3. About Section

### 3.1 — Current text accuracy

| Field | Value |
|---|---|
| **Current problem** | Text says "Computer Science graduate" — correct but omits `February 2025` graduation date from United International University. Second paragraph correctly describes current role but does not mention the primary professional project (AI-LMS) or the dual professional direction (applied engineering + academic research). |
| **Proposed replacement** | Rewrite the two paragraphs to match the verified profile: |
| | **Paragraph 1:** *I am a Computer Science and Engineering graduate (BSc, February 2025) from United International University, Bangladesh. My academic work focused on deep learning and medical image analysis, including attention mechanisms, hybrid architectures, and diagnostic systems. I have published research on brain tumor classification, system fault detection, elderly movement prediction, and ride-sharing optimization.* |
| | **Paragraph 2:** *I currently work as an AI Engineer at Ethics Advance Technology Limited (EATL Innovation Hub Ltd), Dhaka, where I design and deploy production AI systems for education and healthcare. My primary focus is an AI-powered Medical Learning Management System that integrates LLM-based content generation, automated assessment, voice-interactive viva, personalized learning paths, and hybrid retrieval. My professional direction combines applied AI engineering with academic AI research to build systems that are both scientifically grounded and practically deployable.* |
| **Target file** | `public/index.html`, lines 197-214 |
| **Target element** | Both `<p>` elements in the About card |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Verify against the verified profile source of truth |

### 3.2 — Research interests tags

| Field | Value |
|---|---|
| **Current problem** | Tags: Deep Learning & ML, Medical Image Analysis, NLP, RAG & LLM, Computer Vision. Missing: Explainable AI, Trustworthy AI, Time-series analysis. NLP and LLM are redundant with RAG & LLM. |
| **Proposed replacement** | Replace with: (1) Deep Learning & Machine Learning, (2) Medical Image Analysis, (3) Computer Vision, (4) LLMs & RAG, (5) Explainable & Trustworthy AI, (6) Time-Series Analysis. This matches the verified research focus list. |
| **Target file** | `public/index.html`, lines 218-227 |
| **Target element** | The `.flex.flex-wrap.gap-3.justify-center` child divs |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Visual check |

---

## 4. Professional Experience Section

### 4.1 — Add dedicated Experience section

| Field | Value |
|---|---|
| **Current problem** | No separate Experience section. The About section is the only career summary. |
| **Proposed replacement** | Insert a new `<section id="experience">` between About and Projects (after line 235). Use the same cyberpunk section-header pattern (Fira Code, brackets, neon). Content: |
| | **Section header:** `$ EXPERIENCE _` (matching the `$ ABOUT ME _` style) |
| | **Card 1 — Current:** *AI Engineer @ Ethics Advance Technology Limited (EATL Innovation Hub Ltd), Dhaka. Designing, developing, and integrating AI-powered systems for real-world educational and institutional applications. Responsibilities include LLM and RAG development, computer vision, AI system architecture, FastAPI backend integration, database design, asynchronous job processing, GPU workload management, and production deployment.* |
| | **Card 2 — Research:** *BSc in Computer Science and Engineering, United International University (February 2025). Capstone on advanced deep learning techniques for classifying and assessing the severity of lung diseases using chest X-ray images. Published research in brain tumor classification, ride-sharing optimization, elderly movement prediction, and early system fault detection.* |
| **Target file** | `public/index.html`, insert between lines 235 and 237 |
| **Target element** | New `<section id="experience">` |
| **Change type** | Layout-related (new section) |
| **Risk** | Low |
| **Validation** | Visual check, verify scroll-anchor works |

---

## 5. Featured Projects Section

**Principle:** Only include projects from the verified profile. Mark projects as COMPLETED only when the repository or implementation clearly supports that status.

### 5.1 — Remove "RAG-Based Academic Assistant" (not in verified profile)

| Field | Value |
|---|---|
| **Current problem** | The RAG Academic Assistant project card (lines 257-285) is not listed in the verified profile. The profile mentions "Resume-Optimizer-AI" separately, and the original summary.txt described an "Academic Q&A System" and "Multimodal PDF Chatbot" which are not in the verified project list. |
| **Proposed replacement** | **Remove** the entire `.project-card` div (lines 257-285). The space will be filled by new cards. |
| **Target file** | `public/index.html`, lines 257-285 |
| **Target element** | First `.project-card` in the grid |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Grid remains intact with remaining cards |

### 5.2 — Keep "Brain Tumor Classification with Channel Attention"

| Field | Value |
|---|---|
| **Current problem** | The card (lines 288-320) maps to the verified publication "Channel Attention Mechanism in Hybrid Deep Learning Model for Accurate Brain Tumor Classification". This is a supported project. The 99.54% validation accuracy claim comes from the published paper and is verifiable through the ResearchGate link. |
| **Proposed replacement** | **Keep** the card as-is with two changes: (1) Remove the specific accuracy claim `99.54%` from the description — change to `achieved high validation accuracy` to be conservative. (2) Add a link row with the ResearchGate publication URL. |
| **Target file** | `public/index.html`, lines 294-297 (description), add link row after line 318 |
| **Target element** | The `<p>` description text and a new link div |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Description is honest and maps to a verified publication |

### 5.3 — Rename "Resume Improvement Suggestions" to "Resume-Optimizer-AI" and mark COMPLETED

| Field | Value |
|---|---|
| **Current problem** | Currently titled "Resume Improvement Suggestions based on Job Description" with ONGOING status. The verified profile describes "Resume-Optimizer-AI" as a developed application. |
| **Proposed replacement** | Change title to **Resume-Optimizer-AI**. Change status to COMPLETED. Replace description with: *An AI application that accepts a resume and a target job description, analyzes alignment, and generates recommendations to improve relevance, wording, and ATS compatibility.* |
| **Target file** | `public/index.html`, lines 323-360 |
| **Target element** | Third `.project-card` |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Matches the verified profile description |

### 5.4 — Replace "Agentic AI PC Builder" with "AI-Powered Medical Learning Management System (AI-LMS)"

| Field | Value |
|---|---|
| **Current problem** | PC Builder (lines 362-397) is not in the verified profile. |
| **Proposed replacement** | Replace with **AI-Powered Medical Learning Management System (AI-LMS)**. Status: ACTIVE (not COMPLETED — it is the current major professional project). Description: *A comprehensive institutional platform for medical education integrating AI question generation (MCQ, descriptive, adaptive, SAQ, SEQ, clinical scenarios), voice-interactive AI viva, AI presentation generation, automated answer evaluation with rubrics, personalized learning paths, online examination management, and hybrid BM25-dense retrieval. Production stack: FastAPI, Next.js, SQLAlchemy, PostgreSQL, PGVector, Redis, WebSockets, GPU-backed background workers, and token-usage monitoring.* |
| **Target file** | `public/index.html`, lines 362-397 |
| **Target element** | Fourth `.project-card` |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Matches the verified AI-LMS description |

### 5.5 — Add "OpenCode Engineering Skills" project card

| Field | Value |
|---|---|
| **Current problem** | This open-source package is described in the verified profile with a GitHub repository URL but is not showcased. |
| **Proposed replacement** | Add a new `.project-card`. Title: **OpenCode Engineering Skills**. Status: COMPLETED (public repo exists). Description: *A reusable engineering-skill package for AI coding agents providing structured guidance for Python quality, FastAPI backend, Next.js frontend, UI/UX design, SQLAlchemy, PostgreSQL, testing, debugging, security review, code review, production readiness, and AI system architecture. Includes skill validation, installation utilities, cross-platform setup, prompt optimization, and token-saving workflows.* Link row: `<a href="https://github.com/Sayem7456/opencode-engineering-skills"><i class="fab fa-github mr-1"></i>Repository</a>` |
| **Target file** | `public/index.html`, inside the `.grid` div after the last card |
| **Target element** | New `.project-card` div |
| **Change type** | Layout-related |
| **Risk** | Low |
| **Validation** | Verify repo URL resolves |

### 5.6 — Add "Cheating Risk Analysis" project card

| Field | Value |
|---|---|
| **Current problem** | This project is described in the verified profile but not showcased. |
| **Proposed replacement** | Add a new `.project-card`. Title: **Cheating Risk Analysis**. Status: COMPLETED. Description: *A Python-based service for detecting and assessing potential cheating behavior using real-time video analysis with MediaPipe and YOLOv8. Includes computer-vision-based activity analysis, AI-powered risk assessment and scoring, and production-oriented service architecture with FastAPI, async SQLAlchemy, PostgreSQL, Redis, Celery, Prometheus, and AWS S3.* |
| **Target file** | `public/index.html`, after the OpenCode card |
| **Target element** | New `.project-card` div |
| **Change type** | Layout-related |
| **Risk** | Low |
| **Validation** | Matches the verified profile |

### 5.7 — Add "AI Research Academy" project card

| Field | Value |
|---|---|
| **Current problem** | This Next.js educational platform is in the verified profile but not showcased. |
| **Proposed replacement** | Add a new `.project-card`. Title: **AI Research Academy**. Status: COMPLETED. Description: *A Next.js educational platform providing structured learning tracks in computer vision and deep learning, interactive educational materials, and research-oriented documentation for students and aspiring AI researchers.* |
| **Target file** | `public/index.html`, after the Cheating Risk card |
| **Target element** | New `.project-card` div |
| **Change type** | Layout-related |
| **Risk** | Low |
| **Validation** | Matches the verified profile |

### 5.8 — Add "Face Detector — Real-Time Three-Person Desktop Alert" project card

| Field | Value |
|---|---|
| **Current problem** | This local face-recognition system is in the verified profile but not showcased. |
| **Proposed replacement** | Add a new `.project-card`. Title: **Face Detector — Real-Time Three-Person Desktop Alert**. Status: COMPLETED. Description: *A local webcam-based face recognition system that enrolls three specific individuals, detects and recognizes faces in real time, and sends desktop popup alerts. Designed for lightweight, local, and privacy-conscious execution on a fixed webcam.* |
| **Target file** | `public/index.html`, after the AI Research Academy card |
| **Target element** | New `.project-card` div |
| **Change type** | Layout-related |
| **Risk** | Low |
| **Validation** | Matches the verified profile |

### 5.9 — Add repo/demo links to all project cards

| Field | Value |
|---|---|
| **Current problem** | No project card has a link to code or a publication. |
| **Proposed replacement** | Add a link row at the bottom of each card. For projects with public repos: direct link. For publication-based projects: link to the paper. For employer projects (AI-LMS): omit link unless owner confirms it is public. |
| **Target file** | `public/index.html`, each `.project-card` |
| **Target element** | New link row inside each card |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Click each link, verify it resolves |

---

## 6. Research and Publications Section

**Principle:** Keep only publications that are supported by an active publication link or verified portfolio information. Do not invent quartiles, citations, impact factors, authorship positions, or awards.

### 6.1 — Keep all 4 verified publications

| Field | Value |
|---|---|
| **Current problem** | All 4 publications in the current HTML match the verified list. No change needed to the publication count. |
| **Verification** | (1) Channel Attention — Brain Tumor Classification (ResearchGate). (2) Movement Prediction Using Gas Sensors (IEEE 10534390). (3) Ride-Sharing Performance (Taylor & Francis). (4) System Failure Detection (IEEE 10839714). All verified as real publications. |
| **Proposed replacement** | Retain all 4. No removals. |
| **Target file** | `public/index.html`, lines 420-483 |
| **Change type** | Content-only (no change) |
| **Risk** | None |
| **Validation** | N/A |

### 6.2 — Fix stale placeholder title on Publication 1

| Field | Value |
|---|---|
| **Current problem** | `<a ... title="Link to be added">` on publication 1 (line 430) |
| **Proposed replacement** | Remove the `title` attribute entirely |
| **Target file** | `public/index.html`, line 430 |
| **Target element** | The `title` attribute on the publication 1 anchor |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Hover over link — no stale tooltip |

### 6.3 — Normalize publication card styling

| Field | Value |
|---|---|
| **Current problem** | Publications 2-4 use `bg-white p-6 rounded-lg shadow-sm` and `text-gray-700` — leftover from pre-cyberpunk design. Clashes with dark theme. |
| **Proposed replacement** | Remove `bg-white p-6 rounded-lg shadow-sm` from outer divs. Replace `text-gray-700` with `style="color: var(--text-secondary);"`. All 4 cards should use uniform dark-theme styling matching Publication 1. |
| **Target file** | `public/index.html`, lines 437, 454, 471 |
| **Target element** | `<div class="publication-item ...">` for publications 2-4 |
| **Change type** | Layout-related |
| **Risk** | Low |
| **Validation** | Visual check — all 4 cards look identical |

### 6.4 — Add Working Papers sub-section

| Field | Value |
|---|---|
| **Current problem** | The two Q1 journal research works (ongoing and submitted) are not showcased. |
| **Proposed replacement** | Add a "Working Papers" sub-section after the last publication (after line 483). Use a smaller sub-header like `WORKING PAPERS` with matching cyberpunk styling. Include two entries: |
| | **Entry 1 (Ongoing):** *Curriculum-Guided Spatial Attention Resolves Multi-Annotator Label Ambiguity in Thoracic Disease Screening* — Proposes BS-Net, a multi-label chest radiograph classification architecture using DenseNet-121 and a custom Bottleneck Spatial Attention Module with clinically supervised attention priors. Status badge: ONGOING MANUSCRIPT PREPARATION (use a distinct color, e.g., magenta or purple). |
| | **Entry 2 (Submitted):** *Gradient-Decoupled Dual-Stream Isolation: A Lightweight MobileNetV3 Framework for Robust Melanoma Detection on Edge Devices* — Dual-stream MobileNetV3 (~2M parameters) with Gradient-Decoupled Modality Isolation for independent stream training and inference-time fusion. Status badge: SUBMITTED Q1 JOURNAL (use a distinct color, e.g., orange or yellow). |
| | Both entries must explicitly avoid language suggesting publication or acceptance. |
| **Target file** | `public/index.html`, after line 483 |
| **Target element** | New HTML block with sub-header and two publication-item-styled divs |
| **Change type** | Layout-related |
| **Risk** | Low |
| **Validation** | Check status labels; verify no claim of acceptance or publication |

---

## 7. Technical Skills Section

### 7.1 — Remove unsupported skill items

| Field | Value |
|---|---|
| **Current problem** | CrewAI, AutoGen, Milvus, Pinecone, Weaviate, Qdrant, GCP have zero supporting evidence in the verified profile. |
| **Proposed replacement** | **Remove** the following `.skill-item` divs: CrewAI (lines 661-672), AutoGen (lines 674-687), GCP (lines 774-786), Milvus (lines 810-817), Pinecone (lines 843-851), Weaviate (lines 853-861), Qdrant (lines 864-873). |
| **Target file** | `public/index.html`, multiple locations |
| **Target element** | Individual `.skill-item` divs |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Count remaining items; verify grid still renders |

### 7.2 — Add missing skills from verified profile

| Field | Value |
|---|---|
| **Current problem** | The verified profile mentions: PostgreSQL, PGVector, Redis, Celery, SQLAlchemy, WebSockets, MediaPipe, YOLOv8, Prometheus, Boto3/AWS S3, Next.js, and production deployment. Several of these are not listed as skills. |
| **Proposed replacement** | Add to "Development Tools & Platforms": **PostgreSQL**, **Redis**, **Celery**, **SQLAlchemy**, **Next.js**, **WebSockets**. Add to "NLP & LLM" section: no additions needed. Add to "AI & ML": **MediaPipe**, **YOLO** (plus existing OpenCV). Keep **AWS** (has evidence in Cheating Risk project via Boto3). |
| | Create SVG icons or use text-based logos for new items. |
| **Target file** | `public/index.html`, relevant `.skill-grid` containers |
| **Target element** | New `.skill-item` divs |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Visual check |

### 7.3 — Restructure skill categories

| Field | Value |
|---|---|
| **Current problem** | "Vector Databases & Storage" category contained 6 items; after removing 4, only FAISS and pgvector remain. |
| **Proposed replacement** | Merge remaining items (FAISS, pgvector) into a broader category or add PGVector alongside pgvector. Rename category to "Databases, Search & Retrieval". Keep PostgreSQL in Dev Tools, PGVector here. |
| **Target file** | `public/index.html`, lines 803-875 |
| **Target element** | Section heading and `.skill-grid` |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Visual check |

---

## 8. Contact Section

### 8.1 — Add `rel="noopener noreferrer"` to external links

| Field | Value |
|---|---|
| **Current problem** | LinkedIn link in contact section and some footer links lack `rel="noopener noreferrer"`. |
| **Proposed replacement** | Add `rel="noopener noreferrer"` to all `target="_blank"` links: line 905 (LinkedIn in contact), line 993 (email — not needed, not `_blank`). Audited links: LinkedIn (line 977) and GitHub (line 983) in footer already have it. Add to ResearchGate (line 988) and any other `_blank` link missing it. |
| **Target file** | `public/index.html`, lines 905, 977, 983, 988 |
| **Target element** | `<a>` tags with `target="_blank"` |
| **Change type** | Functional |
| **Risk** | Low |
| **Validation** | Inspect each link in the DOM |

---

## 9. Footer

### 9.1 — Twitter/X placeholder

| Field | Value |
|---|---|
| **Current problem** | The rendered site showed a Twitter icon linking to `#`. However, the source HTML lines 976-998 show exactly 4 footer icons (LinkedIn, GitHub, ResearchGate, Email) — no Twitter link in the source. The Twitter icon may appear from a different rendering. |
| **Proposed replacement** | **No change needed** if Twitter is not present in the source HTML. If a Twitter link appears in the live rendered DOM, remove it by checking for a `href="#"` anchor in the footer and deleting the entire `<a>` element. |
| **Target file** | `public/index.html`, footer social links |
| **Change type** | Content-only (conditional) |
| **Risk** | Low |
| **Validation** | Compare source HTML with live rendered DOM |

### 9.2 — Add ResearchGate to JSON-LD `sameAs`

| Field | Value |
|---|---|
| **Current problem** | `sameAs` lists only GitHub and LinkedIn. ResearchGate is linked in the footer but not in structured data. |
| **Proposed replacement** | Add `"https://www.researchgate.net/profile/Md-Sayem-Ahamed"` to the `sameAs` array. |
| **Target file** | `public/index.html`, lines 70-73 |
| **Target element** | `sameAs` array in JSON-LD |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Validate JSON-LD with Schema.org tester |

---

## 10. Structured Data (JSON-LD)

### 10.1 — Expand `knowsAbout` to match verified focus

| Field | Value |
|---|---|
| **Current problem** | `knowsAbout` has 5 items. Missing: Medical Image Analysis, Deep Learning, Explainable AI, Trustworthy AI. |
| **Proposed replacement** | `"knowsAbout": ["Deep Learning", "Machine Learning", "Medical Image Analysis", "Computer Vision", "Large Language Models", "Retrieval-Augmented Generation", "Explainable AI", "Trustworthy AI", "Medical AI", "Production AI Systems"]` |
| **Target file** | `public/index.html`, line 78 |
| **Target element** | The `knowsAbout` array |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Validate JSON-LD syntax |

### 10.2 — Use full legal organization name in schema

| Field | Value |
|---|---|
| **Current problem** | Schema says `"EATL Innovation Hub Ltd"`, hero says `EATL_Innovation_Hub`. |
| **Proposed replacement** | Use the full legal name consistently: `"Ethics Advance Technology Limited (EATL Innovation Hub Ltd)"` in schema; use `EATL Innovation Hub Ltd` in shorter hero/about contexts. |
| **Target file** | `public/index.html`, line 76 (schema), line 147 (hero), line 208 (about) |
| **Target element** | Organization name in three locations |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Verify name consistency |

---

## 11. Navigation

### 11.1 — Add "Experience" link

| Field | Value |
|---|---|
| **Current problem** | Nav has ABOUT, PROJECTS, RESEARCH, CONTACT. No EXPERIENCE link. |
| **Proposed replacement** | Add `<a href="#experience" class="nav-link">EXPERIENCE</a>` after ABOUT in both desktop nav (line 93) and mobile nav (line 107). Also add "SKILLS" link since the skills section exists but is not in the nav. Full nav order: ABOUT, EXPERIENCE, PROJECTS, RESEARCH, SKILLS, CONTACT. |
| **Target file** | `public/index.html`, lines 93-96 and 107-110 |
| **Target element** | The nav link lists |
| **Change type** | Layout-related |
| **Risk** | Low |
| **Validation** | Click each link, verify smooth scroll |

---

## 12. Accessibility

### 12.1 — Add `<main>` landmark

| Field | Value |
|---|---|
| **Current problem** | No `<main>` element. |
| **Proposed replacement** | Wrap all `<section>` elements (Hero through Contact, lines 116-964) inside `<main id="main-content">`. Leave header, chatbot, footer outside. |
| **Target file** | `public/index.html`, `<body>` |
| **Target element** | New `<main>` tag |
| **Change type** | Layout-related |
| **Risk** | Low |
| **Validation** | Use axe DevTools or WAVE |

### 12.2 — Add skip-to-content link

| Field | Value |
|---|---|
| **Current problem** | No way to skip navigation via keyboard. |
| **Proposed replacement** | Add `<a href="#main-content" class="skip-link">Skip to content</a>` as first child of `<body>`. Style with screen-reader-only positioning. |
| **Target file** | `public/index.html`, after `<body>` (line 84) |
| **Target element** | New `<a>` element |
| **Change type** | Functional |
| **Risk** | Low |
| **Validation** | Tab through page on load — link appears on first tab |

### 12.3 — Add ARIA roles

| Field | Value |
|---|---|
| **Current problem** | `<nav>` has no `aria-label`. Chat popup has no `role`. |
| **Proposed replacement** | Add `aria-label="Main navigation"` to `<nav>`. Add `role="dialog"` and `aria-modal="true"` to chat popup when visible. |
| **Target file** | `public/index.html`, line 87 (nav), lines 1020-1039 (chat) |
| **Target element** | `<nav>` and `<div id="chat-popup">` |
| **Change type** | Functional |
| **Risk** | Low |
| **Validation** | Check with screen reader |

---

## 13. Responsive Behavior and Performance

### 13.1 — Throttle scroll handler

| Field | Value |
|---|---|
| **Current problem** | `window.addEventListener('scroll', fadeInOnScroll)` at line 485 has no passive flag. |
| **Proposed replacement** | Change to `window.addEventListener('scroll', fadeInOnScroll, { passive: true })`. |
| **Target file** | `public/script.js`, line 485 |
| **Target element** | The `addEventListener` call |
| **Change type** | Functional |
| **Risk** | Low |
| **Validation** | Lighthouse no longer flags scroll handler |

### 13.2 — Reduce canvas animation overhead on mobile

| Field | Value |
|---|---|
| **Current problem** | Two canvas animation loops (neon trail + matrix rain) run continuously. |
| **Proposed replacement** | Wrap `createRainEffect()` initialization in a `window.innerWidth >= 768` guard so matrix rain only runs on desktop. Keep neon trail on all devices (it is interactive and low-overhead with only 12 particles). |
| **Target file** | `public/script.js`, lines 784-788 |
| **Target element** | The `createRainEffect()` call |
| **Change type** | Functional |
| **Risk** | Medium (removes an effect on mobile) |
| **Validation** | Test on mobile — no matrix rain, neon trail still works |

### 13.3 — Reduce flickering animation risk

| Field | Value |
|---|---|
| **Current problem** | `scanline-flicker` at `0.15s` (~6.6 Hz). Random hue rotation every 1.5s. Both may affect photosensitive users. |
| **Proposed replacement** | Slower scanline animation: change to `1.5s`. Reduce hue rotation frequency: only trigger on `> 0.98` instead of `> 0.92`. Ensure `prefers-reduced-motion` media query covers JS-injected styles by appending the query to the injected CSS. |
| **Target file** | `public/script.js`, lines 167, 180 |
| **Target element** | The injected CSS string and `setInterval` callback |
| **Change type** | Functional |
| **Risk** | Low |
| **Validation** | Animations still visible but less aggressive |

### 13.4 — Consolidate injected `<style>` tags

| Field | Value |
|---|---|
| **Current problem** | 8+ `<style>` elements injected dynamically by `script.js`. |
| **Proposed replacement** | Collect all injected CSS into a single `<style id="hacker-effects">` element appended once to `<head>`. |
| **Target file** | `public/script.js`, all locations that call `document.head.appendChild(style)` |
| **Target element** | Lines 120, 140, 228, 309, 340, 377, 410, 697 |
| **Change type** | Functional |
| **Risk** | Medium (refactoring) |
| **Validation** | Check all visual effects still work |

---

## 14. Chatbot Knowledge (Backend)

### 14.1 — Trim `summary.txt` to match verified profile

| Field | Value |
|---|---|
| **Current problem** | `api/data/summary.txt` contains unverified claims, future goals, and personal aspirations that are not in the verified profile and should not be served by the chatbot. |
| **Proposed replacement** | Replace the entire `summary.txt` with only the verified information from the source of truth. Structure: (1) Education, (2) Current Role, (3) Main Technical Focus, (4) AI-LMS description, (5) OpenCode Engineering Skills with repo URL, (6) Research summary (BS-Net and Melanoma) with correct status labels, (7) Recent Projects list with status, (8) Existing Publications list. |
| | Do NOT include: future goals, personal vision, entrepreneurial ambitions, PTE plans, master's/PhD plans, any claim not in the verified profile. |
| **Target file** | `api/data/summary.txt` |
| **Target element** | Entire file content |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Start a chat session, ask about experience and future plans — bot should reflect only verified information |

### 14.2 — Review `Profile.pdf`

| Field | Value |
|---|---|
| **Current problem** | Binary PDF file not audited. May contain outdated or unverified claims. |
| **Proposed replacement** | Recommend the owner review and regenerate `Profile.pdf` to match the verified profile before deploying changes. |
| **Target file** | `api/data/Profile.pdf` |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | Chatbot answers should match portfolio content |

---

## 15. README Documentation

### 15.1 — Update README after changes are applied

| Field | Value |
|---|---|
| **Current problem** | Structure diagram and description do not reflect new sections (Experience, Working Papers) or the `docs/` directory. |
| **Proposed replacement** | After all changes are applied, update `README.md` to reflect the new structure and project count. |
| **Target file** | `README.md` |
| **Change type** | Content-only |
| **Risk** | Low |
| **Validation** | README accurately describes the repo |

---

## 16. CSS Technical Debt

### 16.1 — Reconcile duplicate `body::before` and `body::after`

| Field | Value |
|---|---|
| **Current problem** | `style.css` has two competing sets of `body::before` and `body::after`. First set (lines 46-107): grid background + CSS scanlines. Second set (lines 1831-1861): floating gradient orbs. The second set overrides the first for `body::before` and `body::after` due to same specificity. Grid background is lost. |
| **Proposed replacement** | Combine into a single coherent design. Keep the dark gradient background (line 39) as the base. Keep the floating gradient orbs (lines 1831-1861) as `body::before` and `body::after` — they are the more visually impactful effect. Remove the grid background CSS (lines 46-63) and the CSS scanlines (lines 75-107). The JS-injected scanlines will remain as the sole scanline mechanism. |
| | Alternatively, if the grid is preferred: keep the grid as `body::before`, move orbs to separate `::after` elements on section containers. |
| | **Recommendation:** Keep the orbs (they create the cyberpunk atmosphere effectively) and remove the grid. Grid lines at 60px spacing are barely visible on dark backgrounds. |
| **Target file** | `public/style.css`, lines 46-107 |
| **Target element** | Both `body::before` and `body::after` in the first set |
| **Change type** | Layout-related |
| **Risk** | Medium (changes background rendering) |
| **Validation** | Before/after screenshots — no visual regression |

---

## Summary of All Changes

| # | Section | Change | File | Type | Risk |
|---|---|---|---|---|---|
| 1.1 | Title | Shorten `<title>` | `index.html:17` | Content | Low |
| 1.2 | Meta | Trim description | `index.html:41-43` | Content | Low |
| 1.3 | Canonical | Add `<link rel="canonical">` | `index.html` head | Functional | Low |
| 1.4 | OG/Twitter | Shorten OG title | `index.html:46-59` | Content | Low |
| 2.1 | Hero | Refine tagline text | `index.html:133-149` | Content | Low |
| 2.2 | Hero | Add WebP profile image | `index.html:175-178` | Layout | Low |
| 3.1 | About | Rewrite both paragraphs | `index.html:197-214` | Content | Low |
| 3.2 | About | Update research interest tags | `index.html:218-227` | Content | Low |
| 4.1 | Experience | New section between About & Projects | `index.html` new | Layout | Low |
| 5.1 | Projects | Remove RAG Academic Assistant card | `index.html:257-285` | Content | Low |
| 5.2 | Projects | Edit Brain Tumor card (remove metric, add pub link) | `index.html:294-297` | Content | Low |
| 5.3 | Projects | Rename Resume → Resume-Optimizer-AI, mark COMPLETED | `index.html:323-360` | Content | Low |
| 5.4 | Projects | Replace PC Builder with AI-LMS | `index.html:362-397` | Content | Low |
| 5.5 | Projects | Add OpenCode Engineering Skills card | `index.html` new | Layout | Low |
| 5.6 | Projects | Add Cheating Risk Analysis card | `index.html` new | Layout | Low |
| 5.7 | Projects | Add AI Research Academy card | `index.html` new | Layout | Low |
| 5.8 | Projects | Add Face Detector card | `index.html` new | Layout | Low |
| 5.9 | Projects | Add repo/pub links to all cards | Each card | Content | Low |
| 6.2 | Pubs | Remove stale `title` attr | `index.html:430` | Content | Low |
| 6.3 | Pubs | Normalize publication styling | `index.html:437,454,471` | Layout | Low |
| 6.4 | Pubs | Add Working Papers sub-section | `index.html` after `:483` | Layout | Low |
| 7.1 | Skills | Remove 7 unsupported skills | `index.html` multiple | Content | Low |
| 7.2 | Skills | Add PostgreSQL, Redis, Celery, SQLAlchemy, Next.js, WebSockets, MediaPipe, YOLO | `index.html` grids | Content | Low |
| 7.3 | Skills | Restructure DB category | `index.html:803-875` | Content | Low |
| 8.1 | Contact | Add `rel="noopener"` | `index.html:905,977,988` | Functional | Low |
| 9.2 | Footer | Add ResearchGate to `sameAs` | `index.html:70-73` | Content | Low |
| 10.1 | Schema | Expand `knowsAbout` | `index.html:78` | Content | Low |
| 10.2 | Schema | Use full org name in schema | `index.html:76,147,208` | Content | Low |
| 11.1 | Nav | Add EXPERIENCE and SKILLS links | `index.html:93-96,107-110` | Layout | Low |
| 12.1 | A11y | Add `<main>` landmark | `index.html` body | Layout | Low |
| 12.2 | A11y | Add skip-to-content link | `index.html` after `<body>` | Functional | Low |
| 12.3 | A11y | Add ARIA roles | `index.html:87,1020` | Functional | Low |
| 13.1 | Perf | Throttle scroll handler | `script.js:485` | Functional | Low |
| 13.2 | Perf | Disable matrix rain on mobile | `script.js:784-788` | Functional | Med |
| 13.3 | Perf | Reduce flicker rate | `script.js:167,180` | Functional | Low |
| 13.4 | Perf | Consolidate injected `<style>` | `script.js` multiple | Functional | Med |
| 14.1 | Chatbot | Replace `summary.txt` content | `summary.txt` entire | Content | Low |
| 14.2 | Chatbot | Review `Profile.pdf` | `Profile.pdf` | Content | Low |
| 15.1 | README | Update structure | `README.md` | Content | Low |
| 16.1 | CSS | Fix `body::before`/`::after` conflict | `style.css:46-107` | Layout | Med |

---

## Files That Will Be Modified

| File | Changes |
|---|---|
| `public/index.html` | ~25 changes across meta, sections, nav, cards, publications, skills, schema, a11y |
| `public/style.css` | Remove grid background + CSS scanlines (`body::before`/`::after`), keep floating orbs |
| `public/script.js` | Throttle scroll, consolidate style tags, slow flicker, disable matrix rain on mobile |
| `api/data/summary.txt` | Replace entirely with verified profile content only |
| `api/data/Profile.pdf` | Review and potentially update |
| `README.md` | Update structure and project listing |
| `public/sayem3.webp` | New asset (compressed profile image) |

---

## Key Principles Applied

- **Removed:** RAG Academic Assistant card (not in verified profile). Agentic AI PC Builder card (not in verified profile). 7 unsupported skill items. Future goals from chatbot context. Placeholder `title` attribute. Conflicting CSS grid background.
- **Added:** Experience section. AI-LMS, OpenCode Engineering Skills, Cheating Risk Analysis, AI Research Academy, Face Detector project cards. Working Papers sub-section. PostgreSQL, Redis, Celery, SQLAlchemy, Next.js, WebSockets, MediaPipe, YOLO skills. `<main>` landmark, skip-to-content link, canonical URL, ARIA roles. ResearchGate to `sameAs`.
- **Renamed:** Resume Improvement Suggestions → Resume-Optimizer-AI (COMPLETED).
- **Preserved:** Brain Tumor Classification (maps to verified publication). All 4 verified publications. Cyberpunk visual theme. Chatbot architecture. Hero section layout. Contact form.
- **No invented:** quartiles, citations, impact factors, authorship positions, awards, acceptance claims, performance metrics beyond verified sources.
