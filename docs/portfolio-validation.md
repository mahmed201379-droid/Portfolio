# Portfolio Validation Notes

## CV / Resume Link

- **URL:** `https://drive.usercontent.google.com/u/0/uc?id=1yUdw5T41oG6X5PF1MgDh9ffD-e6t1oU-&export=download`
- **Checked:** 2026-07-18
- **Status:** Working (HTTP 200 after redirect)
- **Backup file:** `api/data/Profile.pdf` exists locally
- **Action:** None required — link is functional

---

## SEO Review — 2026-07-18

### Checks performed
- Page title, meta description, canonical URL, OG/Twitter tags, schema.org Person structured data, heading hierarchy, image alt text, link labels, research/project keywords.

### Issues fixed
| Issue | Change |
|-------|--------|
| Missing canonical URL | Added `<link rel="canonical" href="https://portfolio-xdk9.vercel.app/">` |
| Missing `og:locale` | Added `<meta property="og:locale" content="en_US">` |
| Missing `og:site_name` | Added `<meta property="og:site_name" content="…">` |
| Missing keywords meta | Added `<meta name="keywords">` with 10 relevant terms |
| No "Agentic AI" overemphasis | All metadata uses accurate terms (Deep Learning, LLM, Medical AI, RAG) |

### Remaining limitations
- No `twitter:site` handle (no Twitter/X account available)
- OG/Twitter image (`sayem3.png`) is ~970 KB — resize to 1200×630 recommended for social cards

---

## Accessibility Review — 2026-07-18

### Checks performed
- Keyboard navigation, focus visibility, form labels, button accessible names, mobile menu a11y, chatbot controls, semantic landmarks, heading order, external-link behavior, reduced-motion support, color-dependent status indicators.

### Issues fixed
| Issue | Change |
|-------|--------|
| No `<main>` landmark | Added `<main>` wrapping hero through contact sections |
| No `<nav>` landmark label | Added `aria-label="Main navigation"` to existing `<nav>` |
| Missing `aria-expanded`/`aria-controls` on menu toggle | Added to `#menuToggle` |
| Missing `aria-expanded`/`aria-controls` on chat bubble | Added to `#chat-bubble` |
| Icon-only buttons lack accessible names | Added `aria-label="Toggle navigation menu"`, `aria-label="Close chat"`, `aria-label="Open chat"` |
| Chat close button had `focus:outline-none` with no fallback | Removed inline `focus:outline-none`; global `:focus-visible` rule added |
| Chat popup missing dialog role | Added `role="dialog"` and `aria-labelledby="chat-dialog-title"` |
| Chat messages missing live region | Added `aria-live="polite"` to `#chat-messages` |
| Chat bubble not keyboard-operable | Added `role="button" tabindex="0"` and `keydown` handler for Enter/Space |
| Mobile menu didn't close on link click (already fixed in earlier session) | Re-verified |
| No reduced-motion support | Added `@media (prefers-reduced-motion: reduce)` block hiding canvas animations and stopping all CSS animations |
| Duplicate reduced-motion blocks (2 existed) | Consolidated into single comprehensive block at end of CSS |

### Remaining limitations
- Color contrast not measured with automated tool (manual check: `#e8e9f3` on `#0a0e27` passes WCAG AAA for normal text)
- Contact formspree form has no inline validation error announcements (`aria-describedby` could be added server-side)
- Matrix rain canvas (`#matrix-rain`) and neon trail canvas (`#neon-trail-canvas`) are decorative and hidden from screen readers — acceptable

---

## Performance Review — 2026-07-18

### Checks performed
- Font loading, Tailwind CDN usage, Font Awesome loading, image sizing, lazy loading, JS defer behavior, animation overhead, duplicate inline styling, unused CSS, layout shifts.

### Issues fixed
| Issue | Change |
|-------|--------|
| Redundant Google Fonts CSS preload | Removed `<link rel="preload">` — the adjacent `<link rel="stylesheet">` triggers the fetch |
| Missing `crossorigin` on Font Awesome CDN | Added `crossorigin="anonymous"` |
| Profile image missing width/height | Added `width="320" height="320"` for aspect-ratio calculation and CLS reduction |
| Dead CSS classes (9) | Removed: `.pulse-text`, `.data-corruption`, `.neon-box`, `.cyber-grid`, `.digital-distort`, `.terminal-command`, `.cyber-line`, `.nav-menu`, `.section-title-holoic` |
| Dead CSS keyframes (5) | Removed: `glitch`, `neon-flicker`, `data-stream`, `badge-glow`, `vhs-distort` |
| Unused CSS custom properties (5) | Removed: `--glow-color`, `--hover-color`, `--bg-darker`, `--surface-light`, `--text-muted` |

### Remaining limitations
- Tailwind v2.2.19 via CDN (full ~250 KB minified) — swapping to a purged build would be beneficial but requires build tooling
- Three Google Fonts families (Inter, Open Sans, Fira Code) — bundling could reduce requests
- Two canvas-based animations (neon trail + matrix rain) run concurrently — acceptable for the cyberpunk theme
- Profile image `sayem3.png` is ~970 KB — converting to WebP would reduce LCP
- Several inline `style` attributes duplicate existing CSS (form inputs, mobile menu background) — low impact, not addressed to avoid risk of changing styled appearance

---

## Final Validation — 2026-07-18

### Passed checks
| Check | Result |
|-------|--------|
| Verified claims vs profile | All visible claims match verified profile. No outdated text found. |
| "Agentic AI" references | Zero in `public/` source files. README.md fixed. |
| Outdated projects mentioned | None. PC Builder, RAG Assistant, Brain Tumor, Resume Improvement removed. |
| Outdated intake/achievement claims | None. "Jan 2026 intake" and "FAANG" references removed from `summary.txt`. |
| Placeholder links / empty hrefs | None. All `href` values point to real destinations or section anchors. |
| Duplicate IDs | None. All 22 IDs are unique. |
| Malformed HTML | No unclosed tags beyond permissible void elements. |
| Closing tags | All 126 `<div>`, 7 `<section>`, 1 `<main>`, 1 `<nav>`, 1 `<header>`, 1 `<footer>`, 2 `<form>` pairs match. |
| JavaScript console errors | No runtime errors expected. Only intentional `console.log` (boot sequence) and `console.error` (fetch failure) calls. |
| Desktop layout | Uses Tailwind responsive grid (`md:grid-cols-2`) — renders correctly at ≥768px. |
| Tablet layout | Falls back to single-column at <768px. Hero flex stacks vertically. |
| Mobile layout | Single-column, hamburger nav, stacked project cards. Verified via responsive breakpoints. |
| Navigation scrolling | All section `id` values match `href="#..."` anchors. Smooth scroll by default. |
| Mobile menu | Opens/closes on toggle. Links close menu. `aria-expanded` synced. |
| Chatbot | Opens/closes on bubble click and keyboard (Enter/Space). `aria-expanded` synced. Input focused on open. |
| Contact form | Points to Formspree (`formspree.io/f/xgvklzjq`). All fields have `<label>` elements. |
| Publication links | 4 publications — all links to ResearchGate, IEEE, and Taylor & Francis verified. |
| Project links | OpenCode Engineering Skills has GitHub repo link. Other projects are internal descriptions (no external links needed). |
| CV download | Google Drive link returns HTTP 200. Local backup at `api/data/Profile.pdf`. |
| Image loading | `sayem3.png` has `loading="lazy" decoding="async" width="320" height="320"`. Container has explicit dimensions. |
| Favicon | `/favicon.svg` exists (501 bytes). Rendered in all modern browsers. |
| Structured data | `application/ld+json` parses correctly. All required Person fields present: `@context`, `@type`, `name`, `jobTitle`, `url`, `image`, `sameAs` (2), `worksFor`, `knowsAbout` (10). |
| Accessibility basics | `<main>` landmark present. `<nav>` with `aria-label`. Focus-visible outline on all interactive elements. `aria-live` on chat messages. `prefers-reduced-motion` supported. |
| Vercel deployment | `vercel.json` routes `/(.*)` → `public/$1` for static files and `/chat` → `api/index.py` for backend. No build step required. Deploy command: `vercel deploy`. |

### Fixed problems (this session)
| Issue | Fix |
|-------|-----|
| README.md still said "Agentic AI systems" | Rewrote README with accurate positioning, full file structure, content guidance, and deployment notes |
| Missing `og:locale` and `og:site_name` | Added to `<head>` |
| No keywords meta tag | Added with 10 relevant terms |
| No canonical URL | Added `<link rel="canonical">` |
| Redundant Google Fonts preload | Removed (adjacent stylesheet already fetches it) |
| Missing `crossorigin` on FA CDN | Added |
| Missing width/height on profile image | Added for CLS reduction |
| Dead CSS (9 classes, 5 keyframes, 5 custom properties) | Removed |
| Duplicate `prefers-reduced-motion` blocks | Consolidated |
| Missing `:focus-visible` override for `focus:outline-none` | Added global focus-visible rule |

### Remaining issues
| Issue | Severity | Notes |
|-------|----------|-------|
| `sayem3.png` is ~970 KB | Medium | Convert to WebP for LCP improvement |
| Full Tailwind CDN (~250 KB) | Low | Purged build would reduce size but requires build tooling |
| 3 Google Fonts families | Low | Acceptable for design. Cached after first load. |
| No `twitter:site` handle | Low | No Twitter/X account to link |
| Inline `style` duplication in form inputs | Low | Not changed to avoid visual regression risk |

### Manual actions required
1. **Convert `sayem3.png` to WebP** and add `<picture>` fallback for older browsers. Target ~200-300 KB.
2. **Update `summary.txt`** whenever publications, projects, or role changes occur — this is the chatbot's knowledge base.
3. **Monitor Formspree inbox** for contact form submissions.
4. **Verify CV Google Drive link** periodically — Google may change sharing URLs.

### Links requiring user confirmation
| Link | Type | Notes |
|------|------|-------|
| `https://drive.usercontent.google.com/...` | CV download | Working (200). Owner to confirm file stays accessible. |
| `https://formspree.io/f/xgvklzjq` | Contact form | Formspree endpoint. Owner to confirm inbox. |
| `https://github.com/Sayem7456/opencode-engineering-skills` | Project repo | Public repo. Owner to confirm URL. |
| All 4 publication links | Research | Owner to verify DOIs/URLs remain valid. |
