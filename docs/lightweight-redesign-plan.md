# Lightweight Redesign Plan

## Goal
Transform cyberpunk-heavy portfolio into modern, clean, professional AI engineer/researcher portfolio. Keep existing HTML/CSS/JS architecture.

## What to Remove

### CSS Animations & Keyframes to Remove
- `glow-flicker` — flickering text glow on headings
- `grid-shift` — digital rain grid background
- `scanlines` — CRT scanline overlay (both instances)
- `glitch-effect`, `glitch-text-active`, `digital-glitch` — glitch text effects
- `glitch-flicker`, `data-corruption` — project card glitch on hover
- `button-pulse` — button glow pulse
- `terminal-blink` — cursor blink
- `code-pulse`, `bracket-pulse` — bracket/icon pulsing
- `line-scan` — header animated scan line
- `scan-line` — terminal header scan line
- `matrix-fall` — hero matrix rain text
- `bubble-scan`, `chat-pulse` — chatbot orb effects
- `header-scan` — chat header scan line
- `hologram-shift`, `chromatic-glitch`, `glitch-layers` — advanced hacker effects
- `text-shimmer` — heading gradient shimmer
- `status-pulse` — system status dot
- `signal-bar` — signal strength bars
- `float-orb`, `float-orb-2` — background gradient orbs

### CSS Pseudo-Elements to Remove/Simplify
- `h1::before`, `h1::after` — terminal block characters
- `body::before` — grid pattern overlay
- `body::after` — scanline overlay (both instances)
- `header::after` — animated scan line
- `.project-card::before`, `.project-card::after` — decorative chars and gradient overlays
- `.nav-link::before` — arrow chars
- `.publication-item::before` — arrow/connector
- `.hero-content::before` — matrix rain chars
- `.terminal-header::after` — scan line
- `#chat-popup::before` — scan line
- `#chat-bubble::before` — rotating gradient
- `#chat-messages::before` — scanline pattern
- `.bot-message-content::before` — left border glow
- `.system-status::before` — green dot

### JavaScript Effects to Remove
- `NeonTrailCanvas` class — mouse trail effect
- `bootSequence` — console boot messages
- `addScanlineEffect` — CRT scanline overlay
- `addRandomGlitch` — hue rotation glitch
- `typewriterHeaders` — typewriter section heading reveal
- `addHUDBrackets` — corner bracket decorations
- `addTextGlitch` — project card title glitch on hover
- `addDataStream` — data stream animation
- `addFocusGlow` — extra focus glow (redundant with CSS)
- `addPixelNoise` — canvas noise overlay on cards
- `addSignalIndicator` — signal strength bars
- `createRainEffect` — matrix digital rain canvas
- Various `setInterval`/dynamic style injections for scanline opacity, system status cycling, heading hover effects, card hue rotation

### HTML Cyberpunk Decorations to Remove
- Terminal header (`ACTIVE | > NEURAL.INIT _`)
- Cyber brackets `[`, `]`, `{`, `}`, `<`, `>`, `$`, `_` around section headings
- Glitch text classes and data-glitch attributes
- `glow-on-hover` class on logo
- `neon-code`, `code-bracket`, `cyber-bracket` spans
- Fira Code font on body-level text elements (keep only for small tags/labels)
- Large glowing profile-image background circle and border glow
- `blink` animation on cursor chars
- `system-status` class

## What to Simplify

### Color System
- **Background**: `#0b0d1a` (near-black navy)
- **Surface**: `#151729` (lighter dark)
- **Primary text**: `#e4e6f0` (off-white)
- **Secondary text**: `#8b8fa3` (muted gray)
- **Accent**: `#22d3ee` (cyan) — single accent
- **Border**: `rgba(34, 211, 238, 0.15)`
- Remove: neon-purple, neon-pink, neon-green as primary accents

### Typography
- Inter: headings and body text
- Fira Code: only for tags, status labels, metadata
- Max heading sizes: hero 48px, section 32px, card 20px

### Navigation
- Compact sticky header, subtle bottom border
- Remove terminal-style nav-link decorations

### Hero Section
- Clean headline, role label, short paragraph, two CTAs
- Small profile image with simple border (no radial glow)

### About Section
- Remove oversized white/bright card
- Simple dark surface with clean spacing

### Project Cards
- Clean cards with subtle border
- Remove hover glitch effects, keep only translateY
- Two-column grid on desktop

### Research/Publications
- Clean cards, remove arrow decorations and neon borders
- Keep status badges but mute colors

### Skills Section
- Compact text-based skill groups without icons or category accent decorations

### Chatbot
- Clean floating button without pulse/glow
- Simple popup without scan lines

## Performance Improvements
- Remove 2 canvas-based animations (neon trail + matrix rain)
- Remove ~25+ CSS animation keyframes
- Remove ~50+ inline style attributes
- Remove Font Awesome icon duplication in skill pills
- Remove `backdrop-filter: blur(10px)` on project cards (expensive)
- Remove `filter: blur()` on background orbs
- Remove `mix-blend-mode: screen` on data stream
- Simplify CSS from ~1892 lines to ~700-800 lines

## Files Modified
- `public/index.html`
- `public/style.css`
- `public/script.js`
- `docs/lightweight-redesign-plan.md` (this file)
