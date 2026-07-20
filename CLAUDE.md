# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The `@AGENTS.md` import above is load-bearing: this is Next.js 15 with breaking
> changes from older versions. Read the relevant guide in
> `node_modules/next/dist/docs/` before writing framework code.

## Commands

```bash
npm run dev     # Start dev server (http://localhost:3000)
npm run build   # Production build
npm run start   # Serve the production build
npm run lint    # ESLint (next/core-web-vitals + next/typescript)
```

There is no test runner configured. Type errors surface through `npm run build`
(tsconfig is `strict`, `noEmit`).

Path alias: `@/*` maps to `src/*`.

## Architecture

This is a single-purpose project: **one fullscreen cinematic "storytelling hero"**
that transitions between showcases like scene changes rather than a slider.
`STORYTELLING_HERO_EXECUTION_PLAN.md` is the original spec and remains the source
of truth for intended behavior (timeline, motion principles, constraints — no
slider libraries). `src/app/page.tsx` renders nothing but `<Hero />`.

### The dual-animation-library contract (most important thing to understand)

Two animation libraries drive the hero and must never touch the same CSS property
on the same element, or they will fight:

- **GSAP** owns the master transition timeline in
  [AnimationController.tsx](src/components/hero/AnimationController.tsx). It animates
  each character slot's `x` / `opacity` / `scale`, the background color, and calls
  into the title scramble. It reads/writes DOM nodes directly via refs.
- **Framer Motion** owns *only* the idle floating `translateY` on the inner
  `motion.div` of [HeroCharacter.tsx](src/components/hero/HeroCharacter.tsx). The
  outer node's transform is GSAP's; the inner node's is Framer's — that separation
  is deliberate (see the comment in that file).

### Two-slot character system

`AnimationController` keeps a fixed two-element array (`slotData`) and two DOM refs
(`charRef0`, `charRef1`) — a "front" (visible) slot and a "back" (staged off-screen
right) slot. On transition it writes the target showcase into the back slot, runs
the GSAP timeline to cross-fade/slide them, then swaps which slot is "front" in
`onComplete`. Refs (`frontSlotRef`, `transitioningRef`, `activeIndexRef`) mirror
state so the autoplay interval and `goTo` can read current values without stale
closures. `goTo(index)` is the single entry point for both autoplay (every 4s) and
`Pagination` clicks; it guards against re-entrancy while transitioning.

### Text scramble

Custom, no paid GSAP plugin. [useScramble.ts](src/hooks/useScramble.ts) drives a
`setInterval` that progressively resolves each character at a staggered time.
[ScrambleText.tsx](src/components/hero/ScrambleText.tsx) exposes an imperative
`scrambleTo` handle via `forwardRef` + `useImperativeHandle`; the GSAP timeline
calls it (`titleRef.current?.scrambleTo(...)`) rather than driving it through props.

### Adding / editing showcases

Content lives in [showcases.ts](src/data/showcases.ts) (typed by
[showcase.ts](src/types/showcase.ts)). Each entry needs a matching character asset
in `public/characters/` (currently SVGs). The hero adapts to any array length —
pagination, autoplay wraparound, and the two-slot logic all derive from
`showcases.length`.

## Conventions

- All hero components are client components (`"use client"`) and use `forwardRef`
  so the controller can drive them imperatively.
- Layout/positioning is Tailwind v4 (via `@tailwindcss/postcss`); animated values
  (colors, transforms) are inline styles/refs so JS can mutate them.
