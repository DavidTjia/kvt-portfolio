"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FIXED_ACCENT = "#3E7BFA";

const PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const r1 = ((i * 9301 + 49297) % 233280) / 233280;
  const r2 = ((i * 4523 + 12345) % 65537) / 65537;
  const r3 = ((i * 7919 + 104729) % 99991) / 99991;
  return {
    left: r1 * 100,
    top: 15 + r2 * 75,
    size: 2 + r3 * 3,
    delay: r3 * 9,
    duration: 9 + r1 * 9,
  };
});

export function Project1Atmosphere() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-5 overflow-hidden">
      {isDesktop ? (
        <>
          <div className="absolute inset-0 grid place-items-center">
            <motion.div
              className="h-[62vh] w-[62vh] rounded-full blur-3xl"
              style={{ backgroundColor: FIXED_ACCENT }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.15, 0.08] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <motion.div
              className="h-[76vh] w-[76vh] rounded-full border border-dashed border-white/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <motion.div
              className="h-[58vh] w-[58vh] rounded-full border border-white/10"
              style={{ borderTopColor: FIXED_ACCENT }}
              animate={{ rotate: -360 }}
              transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white/50"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                animation: `project1-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </>
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="h-[52vh] w-[52vh] rounded-full opacity-[0.12] blur-3xl"
            style={{ backgroundColor: FIXED_ACCENT }}
          />
        </div>
      )}

      <div className="absolute inset-0 grid place-items-center">
        <div
          className="h-[6vh] w-[44vh] translate-y-[24vh] rounded-[50%] opacity-20 blur-2xl"
          style={{ backgroundColor: FIXED_ACCENT }}
        />
      </div>
    </div>
  );
}
