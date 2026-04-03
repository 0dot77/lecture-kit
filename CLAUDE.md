# CLAUDE.md — lecture-kit

## What This Is

**lecture-kit** is an interactive web-based lecture material platform for media art and creative coding education. It serves as a central hub for managing and delivering lecture content across multiple courses and workshops.

## Architecture

- **Framework**: Static site with Vanilla JS + TailwindCSS
- **Hosting**: Vercel (static deployment)
- **Design Language**: Dark theme, modular/technical aesthetic inspired by signal processing panels (see `docs/design-reference.jpg`)

## Project Structure

```
lecture-kit/
├── index.html              ← Public landing / course listing
├── dashboard.html          ← Password-protected admin dashboard
├── courses/
│   └── [course-name]/
│       ├── index.html      ← Course overview
│       └── week-XX.html    ← Weekly lecture pages
├── shared/
│   ├── style.css           ← Global styles (Tailwind + custom)
│   ├── print.css           ← PDF export styles
│   └── components.js       ← Shared JS (code copy, toggles, nav)
├── docs/
│   └── design-reference.jpg
├── tailwind.config.js
├── package.json
└── vercel.json
```

## URL Routing

- `/` — Public course listing
- `/dashboard` — Admin view (simple password gate)
- `/courses/[name]/` — Individual course pages (shareable)
- `/courses/[name]/week-XX` — Weekly content pages

## Design Principles

- Dark theme with muted accent colors (inspired by hardware panel aesthetics)
- Modular grid layout
- Code blocks with syntax highlighting + copy button
- PDF-friendly print styles
- Mobile responsive
- Minimal dependencies

## Sharing & Navigation Rules

- **Course pages are the entry point for students.** Each course's `index.html` is shared directly — students should never see or navigate to the lecture-kit main page (`/`).
- **No links to lecture-kit root** from any page inside `courses/`. No breadcrumb, footer, or title referencing "lecture-kit".
- Weekly pages (`week-XX.html`) link back to their own course index only.

## Content Language

Primary content is in **Korean (한국어)**. UI labels may be bilingual.

## Workflow

- **파일 수정 후 반드시 `npm run dev`로 개발 서버를 띄워서 확인할 것.** 이미 실행 중이면 다시 띄울 필요 없음.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Local dev server (Vite)
npm run build        # Production build
npx tailwindcss ...  # Tailwind utilities
```
