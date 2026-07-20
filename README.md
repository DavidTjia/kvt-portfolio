# KVT Portfolio

Single-page portfolio website for **Kawanua Virtual Teknologi (KVT)** — a game and
interactive-technology studio based in Manado, Indonesia.

Built as one continuous scrolling page: a cinematic hero, a studio story gallery,
three project showcases (including a 3D-style character carousel), an awards grid,
and a glass-morphism footer.

---

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| UI | React 19 |
| Styling | Tailwind CSS v4 (`@theme inline` tokens) |
| Animation | Framer Motion 12 |

---

## Getting Started

```bash
npm install      # install dependencies
npm run dev      # start dev server -> http://localhost:3000
npm run build    # production build (also type-checks)
npm run start    # serve the production build
npm run lint     # ESLint (next/core-web-vitals + next/typescript)
```

There is no test runner configured. Type errors surface through `npm run build`
(`tsconfig` is `strict` with `noEmit`).

Path alias: `@/*` maps to `src/*`.

---

## Page Structure

Sections render top to bottom from `src/app/page.tsx`:

| # | Section | Anchor | Description |
| --- | --- | --- | --- |
| — | Navbar | — | Fixed to the top across every section. Transparent at the very top, turns into a glass bar once scrolled. Collapses into a hamburger menu below `md`. |
| 1 | Hero | `#home` | Headline, CTA, and the Alphonse mascot. Staggered first-load entrance: navbar → headline → mascot → CTA → captions → services bar. |
| 2 | About | `#about` | "Every experience has a story." plus a 7-photo gallery. |
| 3 | Projects | `#project` | Project 01 (Wardeka Edonisia character carousel), Project 02 (Nusa Space), Project 03 (Manguni Squad). |
| 4 | Recognition | `#recognition` | Five award cards plus a decorative dark logo card, closing with a "Start a Project" CTA. |
| 5 | Footer | — | Glass card with logo, address, WhatsApp/email pills, navigation, and socials. |

---

## Architecture Notes

The non-obvious decisions worth knowing before editing.

### One background for the whole page

The blue-white gradient lives on `html`/`body` in `globals.css` with
`background-attachment: fixed`, so it is sized to the viewport rather than to the
page height. Every section below the hero is **transparent** and inherits it. That
is why there are no colour seams between sections — do not add a `bg-*` back onto
a section.

Spacing between sections is controlled in one place: the `gap-5.5` (22px) flex
wrapper in `page.tsx`. The sections themselves carry no vertical padding.

### Shared scroll-reveal motion

`src/lib/motion.ts` holds `REVEAL_EASE` and the `revealUp()` preset used by every
section reveal, so all sections enter with the same rhythm. Reveals use
`once: false`, so they replay each time a section re-enters the viewport.

### One animation system per CSS property

Where two systems could fight over the same property on the same node, they are
split across separate nodes. In the hero mascot and the Project 01 character, the
outer node owns the entrance/positioning transform, an inner node owns the tilt,
and a third owns the float. Keep that separation when editing.

### Touch support instead of hover

Info cards in Project 01 and in the Project 02/03 galleries appear on hover. Touch
devices have no hover, so `matchMedia('(hover: hover)')` switches them to
**tap to toggle**. Hover handlers are no-ops on touch and the click handler is a
no-op on mouse, so the two never conflict.

### Mobile-specific behaviour

- **About gallery** — a swipeable horizontal filmstrip with snap and dots on phones
  (`AboutGalleryMobile`); the mosaic grid (`AboutGallery`) only renders from `md` up.
- **Project 01 performance** — continuously running effects (pulsing glow, rotating
  rings, 24 drifting particles, character float) are not mounted at all on phones
  and are replaced by a single static glow. Drop shadows are lighter too.
- **Hero readability** — a left-to-right white scrim sits between the mascot and the
  text below `lg`, where the centred mascot would otherwise sit behind the headline.

---

## Project Layout

```
src/
├── app/
│   ├── globals.css        # Tailwind import, brand tokens, page background, keyframes
│   ├── layout.tsx         # Root layout, Poppins font, metadata
│   └── page.tsx           # Section composition + inter-section spacing
├── components/
│   ├── hero/              # Navbar (global fixed), background, mascot, CTA, services bar
│   ├── about/             # Heading, mosaic gallery, mobile filmstrip, badge, closing card
│   ├── project1/          # Character carousel: background, atmosphere, character, info card
│   ├── projects/          # Projects wrapper + Project 02/03 cards and gallery carousel
│   ├── recognition/       # Heading, award cards, decorative card, closing CTA
│   └── footer/            # Glass card, brand column, navigation column
├── data/                  # Editable content (see below)
├── lib/motion.ts          # Shared reveal easing/preset
└── types/                 # Content type definitions
```

---

## Editing Content

All copy and data live in `src/data/` — no component code needs to change.

| File | Controls |
| --- | --- |
| `data/showcases.ts` | Project 01 characters: name, title, description, image, full name, faction. The carousel adapts to any array length. |
| `data/projects.ts` | Project 02/03: title, description, gallery images, info-card fields. `images` is an array — add more paths and the carousel arrows and dots appear automatically. |
| `data/recognitions.ts` | The award list in the Recognition grid. |
| `data/aboutGallery.ts` | The seven About photos. |

Contact details and social links live in `components/footer/FooterBrand.tsx` and
`components/footer/FooterNav.tsx`.

Images are served from `public/characters/`. Each Project 01 character needs a
matching PNG there; About photos are `about1..7.svg`.

> Note on the About photos: they are SVG wrappers around embedded raster images, so
> they render with `unoptimized` to bypass the Next.js image optimizer, which rejects
> SVG unless explicitly configured.

---

## Deployment

Any platform that supports Next.js works. The page is fully static
(`○ (Static) prerendered as static content`), so the `npm run build` output can be
hosted as-is. Vercel needs no extra configuration.

---

## License

Private project — all rights reserved by Kawanua Virtual Teknologi.
