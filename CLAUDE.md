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
- **코드 블록(`.code-block`) 안의 각 줄은 반드시 `<span style="display:block;">` 으로 감싸서 라인 브레이크를 보장할 것.** 인라인 `<span>`만 쓰면 한 줄로 붙어 보인다.

## Lecture Slides (`courses/*/slides/*.html`)

강의 슬라이드를 생성/편집할 때의 방향. Yonsei 'Interface' 강의 반복 피드백에서 추출.

### Tone

- **단정형, 비대화체.** `~합니다 / ~입니다 / ~다` 만 사용. `~죠`, `~네요`, "있죠..", "~겠죠" 같은 어미 금지.
- **소개글 슬라이드 만들지 말 것.** "오늘 특강은 ~ 입니다" 식의 커버 후 소개글은 빼고, 타이틀 슬라이드 다음에 곧장 강사 소개나 본론으로.
- **잇는 문장(filler) 제거.** 다이어그램/리스트가 의미를 전달하면, 그 위에 "공연 현장에는 항상 오퍼레이터가 있습니다…가 시스템의 마지막 1m입니다" 류의 introducer 문장은 빼는 편이 낫다.
- **메타 설명 금지.** "Stage 01–04는 개념 + 짧은 데모, 05–07은 실습…" 같이 구조 자체를 다시 설명하지 않는다. 구조는 시각으로 보여주면 끝.
- **부가 라이브러리/주변 정보 한 줄도 보수적으로.** "+ Pop COMP, Parameter COMP, Widget Tox 라이브러리도 활용 가능" 같은 곁다리 라인은 보통 핵심을 흐린다.

### Language

- **한국어 우선, 영문 병기 자제.** `봄랩` (NOT `봄랩 (Bom Lab)`). 한국 기관·팀·작품명에 영문 괄호 표기 붙이지 않음.
- 영문은 ① 프로토콜/도구명 (OSC, NDI, TouchDesigner), ② 장식적 outlined-serif 헤드라인, ③ 모노 폰트 라벨 정도로 제한.

### Chrome & Layout

- **반복 라벨/크레딧 최소화.** 타이틀 슬라이드에 `Lecture Series`, `Yonsei University · 2026.05` 같은 부가 블록 반복하지 말 것. 코너 마크와 bottom strip은 OK지만 너무 친절하게 굴지 않는다.
- **마지막 슬라이드는 "Thank you" 한 줄로 충분.** 본인 크레딧/소속/메시지 줄 추가 금지.
- **타임라인 점은 라벨 위에.** 점이 라벨 텍스트를 덮으면 안 됨. dot은 top:0, 라벨은 padding-top으로 아래로 분리.

### Selected Works 패턴 (강사 소개 직후)

각 작업은 **2장 페어**:
1. **Work 슬라이드** — 작품명 + YouTube iframe 임베드 + 역할/태그 + 링크
2. **System diagram 슬라이드** — cyan 핵심 노드 (보통 TouchDesigner) + 화살표 + 주변 디바이스 박스 (프로토콜 라벨 포함)

별도 "Selected Works overview" 텍스트 리스트 슬라이드는 만들지 않음. 개별 work 슬라이드가 그 역할을 겸함.

### Numbering & File Ops

- 슬라이드는 corner-tr에 `NN / TOTAL` 형식. **삽입/삭제 시 Python 한 패스로 일괄 리넘버링** — 수십 번의 수동 Edit 하지 말 것. 매핑 함수 (`old → new`)와 정규식 두 개 (`(\d{2}) / TOTAL`, `SLIDE (\d{2})`)로 처리.
- 새 슬라이드 페이지 추가 시 `vite.config.js`의 `rollupOptions.input`에도 등록.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Local dev server (Vite)
npm run build        # Production build
npx tailwindcss ...  # Tailwind utilities
```
