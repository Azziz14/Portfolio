<div align="center">

# Ashish Gupta — Portfolio

**IT Undergraduate · CBIT · Building distributed systems, LLM-powered tools & real-time engines**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

[**→ Live Site**](#) &nbsp;·&nbsp; [Projects](#projects) &nbsp;·&nbsp; [Contact](#contact)

</div>

---

## Overview

Personal portfolio showcasing selected projects in distributed systems, AI/ML tooling, and quantitative finance. Built with a focus on smooth interaction design — scroll-driven animations, particle canvas effects, and a physics-based cursor — while keeping the bundle lean and the code structured.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| Scroll | Lenis (smooth scroll) |
| Icons | Lucide React |
| Deploy | Vercel |

## Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, metadata, smooth scroll)
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles & CSS variables
├── components/             # UI components
│   ├── ScrollyCanvas.tsx   # Scroll-driven hero animation
│   ├── Projects.tsx        # Projects section
│   ├── ParticleNet.tsx     # Interactive canvas particle network
│   ├── CursorGlow.tsx      # Custom cursor with glow effect
│   ├── ScrollProgress.tsx  # Reading progress indicator
│   ├── SocialDock.tsx      # Floating social links dock
│   ├── SmoothScroll.tsx    # Lenis scroll provider
│   ├── Overlay.tsx         # Gradient overlay layer
│   └── Preloader.tsx       # Entry preloader animation
├── public/
│   └── sequence/           # Frame sequence assets for scroll animation
├── .github/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
├── next.config.ts
├── tailwind.config (via postcss)
└── tsconfig.json
```

## Local Development

**Prerequisites:** Node.js ≥ 18, npm ≥ 9

```bash
# 1. Clone
git clone https://github.com/Azziz14/Portfolio.git
cd Portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — hot reload is enabled.

```bash
# Lint
npm run lint

# Production build (verify before deploying)
npm run build
```

## Projects

The projects section is rendered from a data array in [`components/Projects.tsx`](./components/Projects.tsx). To add or update a project, edit that file directly — no CMS or external data source required.

## Contact

- **GitHub** — [@Azziz14](https://github.com/Azziz14)
- **LinkedIn** — [ashish-gupta](https://linkedin.com/in/ashish-gupta-1b3039280)

---

<div align="center">
  <sub>Designed & built by Ashish Gupta · MIT License</sub>
</div>
