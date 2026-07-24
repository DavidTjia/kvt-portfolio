"use client";

import { useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HeroBackground } from "./HeroBackground";
import { HeroEnergyPaths } from "./HeroEnergyPaths";
import { HeroMascot } from "./HeroMascot";
import { HeroCtaButton } from "./HeroCtaButton";
import { HeroServicesBar } from "./HeroServicesBar";

const ENTER_EASE = [0.16, 1, 0.3, 1] as const;

function enter(delay: number, y = 24) {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: ENTER_EASE, delay },
  };
}

const MASCOT = {
  name: "Alphonse",
  project: "Wardeka Edonisia",
  image: "/home/hero-mascot.png",
};

const EDGE = "px-6 sm:px-10 lg:px-14";

export function HeroSection() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(pointerX, { stiffness: 120, damping: 20, mass: 0.4 });
  const tiltY = useSpring(pointerY, { stiffness: 120, damping: 20, mass: 0.4 });

  const driftX = useSpring(pointerX, { stiffness: 34, damping: 26, mass: 0.9 });
  const driftY = useSpring(pointerY, { stiffness: 34, damping: 26, mass: 0.9 });

  const bgX = useTransform(driftX, [-0.5, 0.5], [2, -2]);
  const bgY = useTransform(driftY, [-0.5, 0.5], [2, -2]);
  const mascotX = useTransform(driftX, [-0.5, 0.5], [10, -10]);
  const mascotY = useTransform(driftY, [-0.5, 0.5], [10, -10]);

  const handlePointerMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [pointerX, pointerY],
  );

  const resetPointer = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <section
      id="home"
      className="relative flex h-dvh w-full flex-col overflow-hidden text-kvt-ink"
      aria-label="Introduction"
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
    >
      <motion.div
        className="absolute -inset-1 overflow-hidden"
        style={{ x: bgX, y: bgY }}
      >
        <HeroBackground />
      </motion.div>
      <HeroEnergyPaths parallaxX={driftX} parallaxY={driftY} />
      <div className="pointer-events-none absolute inset-x-0 bottom-[calc(-13dvh+116px)] z-10 flex justify-center sm:bottom-[calc(-13dvh+80px)] lg:left-[10%]">
        <motion.div style={{ x: mascotX, y: mascotY }}>
          <motion.div
            className="relative h-[111dvh] w-[76dvh] max-w-[92vw]"
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: ENTER_EASE, delay: 0.5 }}
          >
            <HeroMascot
              src={MASCOT.image}
              alt={MASCOT.name}
              tiltX={tiltX}
              tiltY={tiltY}
            />
          </motion.div>
        </motion.div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-15 lg:hidden"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(244,249,255,0.94) 0%, rgba(244,249,255,0.6) 42%, rgba(244,249,255,0) 72%)",
        }}
      />
      <div aria-hidden className="shrink-0 py-5">
        <div className="h-9 sm:h-10" />
      </div>
      <div className="relative z-20 flex-1">
        <div
          className={`absolute top-[26%] w-full -mt-9.5 -translate-y-1/2 sm:top-[36%] sm:mt-0 ${EDGE}`}
        >
          <motion.h1
            className="text-4xl font-extrabold leading-[1.16] tracking-[-0.02em] sm:text-5xl"
            {...enter(0.3)}
          >
            Innovative Solutions
            <br />
            <span className="text-kvt-blue">Trusted</span> Results
          </motion.h1>
          <motion.div className="mt-7 hidden sm:block" {...enter(0.75, 18)}>
            <HeroCtaButton label="Learn more about us" href="#about" />
          </motion.div>
        </div>
        <motion.div
          className={`absolute inset-x-0 bottom-18 sm:hidden ${EDGE}`}
          {...enter(0.75, 18)}
        >
          <HeroCtaButton label="Learn more about us" href="#about" />
        </motion.div>
        <motion.p
          className="absolute right-[13%] top-[57%] hidden max-w-60 text-sm font-medium leading-[1.7] text-kvt-blue md:block lg:right-[4%]"
          {...enter(0.95, 16)}
        >
          Every great technology
          <br />
          begins with a single idea
        </motion.p>
        <motion.div
          className={`absolute inset-x-0 bottom-4 flex items-end justify-between text-[11px] leading-[1.6] text-kvt-muted ${EDGE} lg:mx-auto lg:max-w-[56%] lg:px-0`}
          {...enter(1.05, 12)}
        >
          <p className="text-center">
            Est. 2019
            <br />
            Manado, Indonesia
          </p>
          <p className="text-right sm:text-left lg:translate-x-28">
            {MASCOT.name}
            <br />
            {MASCOT.project}
          </p>
        </motion.div>
      </div>
      <motion.div
        className="relative z-30 shrink-0"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: ENTER_EASE, delay: 1.15 }}
      >
        <HeroServicesBar edge={EDGE} />
      </motion.div>
    </section>
  );
}
