"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { showcases } from "@/data/showcases";
import { Project1Background } from "./Project1Background";
import { Project1Atmosphere } from "./Project1Atmosphere";
import { Project1Character } from "./Project1Character";
import { Project1Pagination } from "./Project1Pagination";
import { Project1InfoCard } from "./Project1InfoCard";
import { SeeMoreButton } from "@/components/shared/SeeMoreButton";

const AUTOPLAY_INTERVAL = 5000;

const CAROUSEL_EASE = [0.65, 0, 0.35, 1] as const;

const ACTIVE_SCALE = 1.15;
const SIDE_SCALE = 0.68;

type Breakpoint = "mobile" | "tablet" | "desktop";

interface CardTarget {
  x: number;
  scale: number;
  opacity: number;
  rotateZ: number;
  filter: string;
  zIndex: number;
}

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return bp;
}

function relativeOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  else if (offset < -total / 2) offset += total;
  return offset;
}

function cardTarget(offset: number, bp: Breakpoint): CardTarget {
  if (offset === 0) {
    return {
      x: 0,
      scale: ACTIVE_SCALE,
      opacity: 1,
      rotateZ: 0,
      filter: "blur(0px) brightness(1)",
      zIndex: 30,
    };
  }

  const showSides = bp !== "mobile";
  const dist = bp === "desktop" ? 380 : 260;
  const hiddenDist = bp === "desktop" ? 640 : 460;

  if (offset === -1 || offset === 1) {
    const side = offset;
    return {
      x: side * dist,
      scale: SIDE_SCALE,
      opacity: showSides ? 0.55 : 0,
      rotateZ: side * -6,
      filter: "blur(5px) brightness(0.55)",
      zIndex: 20,
    };
  }

  const side = offset < 0 ? -1 : 1;
  return {
    x: side * hiddenDist,
    scale: 0.5,
    opacity: 0,
    rotateZ: side * -8,
    filter: "blur(8px) brightness(0.4)",
    zIndex: 10,
  };
}

function cardTransition(isActive: boolean) {
  if (isActive) {
    return {
      x: { duration: 0.6, ease: CAROUSEL_EASE },
      rotateZ: { duration: 0.6, ease: CAROUSEL_EASE },
      opacity: { duration: 0.45, ease: CAROUSEL_EASE },
      filter: { duration: 0.5, delay: 0.3, ease: CAROUSEL_EASE },
      scale: { duration: 0.65, delay: 0.5, ease: CAROUSEL_EASE },
    };
  }
  return {
    scale: { duration: 0.4, ease: CAROUSEL_EASE },
    filter: { duration: 0.45, ease: CAROUSEL_EASE },
    opacity: { duration: 0.5, ease: CAROUSEL_EASE },
    x: { duration: 0.7, delay: 0.25, ease: CAROUSEL_EASE },
    rotateZ: { duration: 0.7, delay: 0.25, ease: CAROUSEL_EASE },
  };
}

const PROJECT_BLURB =
  "Wardeka Edonisia is Indonesia's first nationally developed eSports shooter, inspired by Indonesian identity and powered by our in-house cloud infrastructure, Delta Garuda. It has been featured in Piala Presiden Esports 2024 and PORPROV XII North Sulawesi 2025";

export function Project1Carousel() {
  const total = showcases.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const bp = useBreakpoint();

  const [isCharacterHovered, setIsCharacterHovered] = useState(false);

  const [canHover, setCanHover] = useState(true);
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  const active = showcases[activeIndex];

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(pointerX, { stiffness: 120, damping: 20, mass: 0.4 });
  const tiltY = useSpring(pointerY, { stiffness: 120, damping: 20, mass: 0.4 });

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);
  const prev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % total);
    }, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(id);
  }, [activeIndex, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const handlePointerMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [pointerX, pointerY]
  );

  const resetPointer = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <section
      className="relative h-dvh w-full overflow-hidden rounded-[28px] border border-white/10 text-white"

      style={{
        clipPath:
          "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))",
      }}
      aria-roledescription="character carousel"
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
    >
      <Project1Background />
      <Project1Atmosphere />
      <header className="absolute inset-x-0 top-0 z-40 flex items-center gap-3 px-5 pt-6 sm:gap-6 sm:px-12 sm:pt-8 md:px-16">
        <span className="whitespace-nowrap text-sm font-extrabold tracking-tight sm:text-xl">
          Project 01.
        </span>
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
        <span className="relative h-px flex-1">
          <span className="absolute inset-0 -top-px h-[3px] bg-linear-to-r from-transparent via-sky-300/60 to-transparent blur-[3px]" />
          <span className="absolute inset-0 bg-linear-to-r from-white/50 via-white/60 to-white/10" />
        </span>
        <span className="whitespace-nowrap text-sm font-extrabold tracking-tight sm:text-xl">
          Wardeka Edonisia
        </span>
      </header>
      <div className="pointer-events-none absolute inset-0">
        {showcases.map((showcase, index) => {
          const offset = relativeOffset(index, activeIndex, total);
          const target = cardTarget(offset, bp);
          const isActive = offset === 0;
          return (
            <motion.div
              key={showcase.id}
              className="absolute inset-0 flex items-center justify-center will-change-transform"
              style={{ perspective: 1200, zIndex: target.zIndex }}

              animate={{
                x: target.x,
                scale: target.scale,
                opacity: target.opacity,
                rotateZ: target.rotateZ,
                filter: target.filter,
              }}
              transition={cardTransition(isActive)}
            >
              <Project1Character
                showcase={showcase}
                active={isActive}
                reduced={bp === "mobile"}
                priority={index <= 1}
                tiltX={tiltX}
                tiltY={tiltY}
              />
            </motion.div>
          );
        })}
      </div>
      <div className="absolute inset-0 z-32 grid place-items-center">
        <div
          className="pointer-events-auto h-[45vh] w-[45vh] sm:h-[56vh] sm:w-[56vh] lg:h-[64vh] lg:w-[64vh]"
          onMouseEnter={() => canHover && setIsCharacterHovered(true)}
          onMouseLeave={() => canHover && setIsCharacterHovered(false)}

          onClick={() => !canHover && setIsCharacterHovered((v) => !v)}
        />
      </div>
      <AnimatePresence>
        {isCharacterHovered && (
          <Project1InfoCard key={active.id} fullName={active.fullName} faction={active.faction} />
        )}
      </AnimatePresence>
      <div
        className="pointer-events-none absolute inset-0 z-35"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <div className="pointer-events-none relative z-40 flex h-full w-full items-end pb-10 pl-16 pr-5 sm:pb-28 sm:pl-24 sm:pr-12 md:max-w-md md:pb-20 md:pl-28 md:pr-16">
        <motion.div
          className="pointer-events-auto max-w-110"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: CAROUSEL_EASE }}
        >
          <p className="text-xs font-medium leading-[1.7] text-white sm:text-lg sm:leading-[1.8]">
            {PROJECT_BLURB}
          </p>
          <SeeMoreButton href="/projects/wardeka" className="mt-4 sm:mt-6" />
        </motion.div>
      </div>
      <button
        type="button"
        onClick={prev}
        aria-label="Previous character"
        className="absolute left-4 top-1/2 z-40 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white backdrop-blur-sm transition-transform duration-300 ease-out hover:scale-110 hover:bg-white/10 active:scale-95 sm:left-8"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next character"
        className="absolute right-4 top-1/2 z-40 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white backdrop-blur-sm transition-transform duration-300 ease-out hover:scale-110 hover:bg-white/10 active:scale-95 sm:right-8"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="absolute inset-x-0 bottom-8 z-40 hidden justify-center sm:bottom-10 sm:flex">
        <Project1Pagination showcases={showcases} activeIndex={activeIndex} onSelect={goTo} />
      </div>
    </section>
  );
}
