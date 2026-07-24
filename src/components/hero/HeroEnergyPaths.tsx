"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import gsap from "gsap";

const VB_W = 1600;
const VB_H = 900;

const FORBIDDEN = [
  { x0: -200, y0: -200, x1: 1800, y1: 150 },

  { x0: 44, y0: 245, x1: 735, y1: 402 },
  { x0: 44, y0: 424, x1: 352, y1: 502 },
  { x0: 1165, y0: 445, x1: 1800, y1: 615 },
  { x0: 408, y0: 733, x1: 585, y1: 802 },
  { x0: 1188, y0: 733, x1: 1345, y1: 802 },
];

const REGIONS = [
  { x0: 640, y0: 170, x1: 1150, y1: 845, count: 8 },
  { x0: 1080, y0: 430, x1: 1575, y1: 870, count: 6 },
  { x0: 560, y0: 340, x1: 1010, y1: 800, count: 4 },
  { x0: 45, y0: 645, x1: 445, y1: 870, count: 3 },

  { x0: 8, y0: 158, x1: 705, y1: 610, count: 4 },

  { x0: 20, y0: 162, x1: 700, y1: 240, count: 3 },
];

const D = Math.SQRT1_2;
const DIRS = [
  { x: 1, y: 0 },
  { x: D, y: D },
  { x: 0, y: 1 },
  { x: -D, y: D },
  { x: -1, y: 0 },
  { x: -D, y: -D },
  { x: 0, y: -1 },
  { x: D, y: -D },
];
const TURNS = [-2, -1, 1, 2, -1, 1];

const LINE_COLOR = "#ffffff";

const PULSE_LAYERS = [
  { dash: 118, width: 11, color: LINE_COLOR, opacity: 0.4 },
  { dash: 70, width: 5, color: LINE_COLOR, opacity: 0.7 },
  { dash: 26, width: 2.2, color: LINE_COLOR, opacity: 1 },
];

const MOBILE_PATH_COUNT = 16;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface EnergyNode {
  x: number;
  y: number;
  dist: number;
}

interface EnergyPath {
  d: string;
  length: number;
  nodes: EnergyNode[];
  speed: number;
  delay: number;
  pause: number;
  baseOpacity: number;
}

function shuffle<T>(arr: T[], rnd: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function r1(v: number) {
  return Math.round(v * 10) / 10;
}

type Rect = { x0: number; y0: number; x1: number; y1: number };

function blocked(x: number, y: number) {
  if (x < -60 || x > VB_W + 60 || y < -60 || y > VB_H + 60) return true;
  return FORBIDDEN.some((r) => x > r.x0 && x < r.x1 && y > r.y0 && y < r.y1);
}

function segHitsRect(ax: number, ay: number, bx: number, by: number, r: Rect) {
  const dx = bx - ax;
  const dy = by - ay;
  const edges: [number, number][] = [
    [-dx, ax - r.x0],
    [dx, r.x1 - ax],
    [-dy, ay - r.y0],
    [dy, r.y1 - ay],
  ];

  let t0 = 0;
  let t1 = 1;

  for (const [p, q] of edges) {
    if (p === 0) {
      if (q < 0) return false;
      continue;
    }
    const t = q / p;
    if (p < 0) {
      if (t > t1) return false;
      if (t > t0) t0 = t;
    } else {
      if (t < t0) return false;
      if (t < t1) t1 = t;
    }
  }

  return t0 <= t1;
}

function segBlocked(ax: number, ay: number, bx: number, by: number) {
  if (blocked(bx, by)) return true;
  return FORBIDDEN.some((r) => segHitsRect(ax, ay, bx, by, r));
}

function walk(
  rnd: () => number,
  start: { x: number; y: number },
  startDir: number,
  steps: number
): EnergyPath | null {
  const pts = [start];
  let dir = startDir;
  let cur = start;
  let length = 0;
  const nodes: EnergyNode[] = [];

  for (let i = 0; i < steps; i++) {
    const seg = rnd() < 0.22 ? 190 + rnd() * 135 : 42 + rnd() * 108;

    const turns = shuffle(TURNS, rnd);
    let next: { x: number; y: number } | null = null;
    let nextDir = dir;

    for (const t of turns) {
      const d = (dir + t + 8) % 8;
      const p = { x: r1(cur.x + DIRS[d].x * seg), y: r1(cur.y + DIRS[d].y * seg) };
      if (!segBlocked(cur.x, cur.y, p.x, p.y)) {
        next = p;
        nextDir = d;
        break;
      }
    }

    if (!next) break;

    length += seg;
    cur = next;
    dir = nextDir;
    pts.push(cur);

    if (rnd() < 0.3) nodes.push({ x: cur.x, y: cur.y, dist: length });
    if (rnd() < 0.07) break;
  }

  if (pts.length < 3 || length < 180) return null;

  return {
    d: pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" "),
    length: r1(length),
    nodes,
    speed: 175 + rnd() * 205,
    delay: rnd() * 4.5,
    pause: 0.6 + rnd() * 3.2,
    baseOpacity: 0.16 + rnd() * 0.14,
  };
}

function buildPaths(seed: number): EnergyPath[] {
  const rnd = mulberry32(seed);
  const out: EnergyPath[] = [];

  for (const region of REGIONS) {
    let made = 0;
    let guard = 0;

    while (made < region.count && guard++ < 600) {
      const start = {
        x: r1(region.x0 + rnd() * (region.x1 - region.x0)),
        y: r1(region.y0 + rnd() * (region.y1 - region.y0)),
      };
      if (blocked(start.x, start.y)) continue;

      const path = walk(rnd, start, Math.floor(rnd() * 8), 4 + Math.floor(rnd() * 6));
      if (!path) continue;

      out.push(path);
      made++;

      if (path.nodes.length > 0 && rnd() < 0.38) {
        const from = path.nodes[Math.floor(rnd() * path.nodes.length)];
        const branch = walk(rnd, from, Math.floor(rnd() * 8), 2 + Math.floor(rnd() * 3));
        if (branch) out.push(branch);
      }
    }
  }

  return shuffle(out, rnd);
}

interface HeroEnergyPathsProps {
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}

export function HeroEnergyPaths({ parallaxX, parallaxY }: HeroEnergyPathsProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const paths = useMemo(() => buildPaths(0x5eed12), []);

  const x = useTransform(parallaxX, [-0.5, 0.5], [5, -5]);
  const y = useTransform(parallaxY, [-0.5, 0.5], [5, -5]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const limit = window.matchMedia("(min-width: 640px)").matches
      ? paths.length
      : MOBILE_PATH_COUNT;

    const ctx = gsap.context(() => {
      paths.slice(0, limit).forEach((path, i) => {
        const group = svg.querySelector<SVGGElement>(`[data-ep="${i}"]`);
        if (!group) return;

        const base = group.querySelector<SVGPathElement>(".ep-base");
        const pulses = group.querySelectorAll<SVGPathElement>(".ep-pulse");
        const nodes = group.querySelectorAll<SVGCircleElement>(".ep-node");

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: path.pause,
          delay: path.delay,
        });

        pulses.forEach((el, li) => {
          const dash = PULSE_LAYERS[li].dash;
          tl.fromTo(
            el,
            { strokeDashoffset: dash },
            {
              strokeDashoffset: -path.length,
              duration: (path.length + dash) / path.speed,
              ease: "none",
            },
            0
          );
        });

        if (base) {
          const dur = path.length / path.speed;
          tl.to(base, { opacity: path.baseOpacity * 2.3, duration: dur * 0.3, ease: "sine.out" }, 0);
          tl.to(base, { opacity: path.baseOpacity, duration: dur * 1.15, ease: "sine.inOut" }, dur * 0.34);
        }

        nodes.forEach((node, ni) => {
          const at = path.nodes[ni].dist / path.speed;
          tl.to(node, { opacity: 1, duration: 0.14, ease: "sine.out" }, at);
          tl.to(node, { opacity: 0, duration: 1.1, ease: "power2.out" }, at + 0.16);
        });
      });
    }, svg);

    return () => ctx.revert();
  }, [paths]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ x, y }}
    >
      <svg
        ref={svgRef}
        className="h-full w-full"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        shapeRendering="geometricPrecision"
      >
        {paths.map((path, i) => (
          <g
            key={i}
            data-ep={i}

            className={i >= MOBILE_PATH_COUNT ? "hidden sm:block" : undefined}
          >
            <path
              className="ep-base"
              d={path.d}
              stroke={LINE_COLOR}
              strokeWidth={1.3}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={path.baseOpacity}
            />

            {PULSE_LAYERS.map((layer, li) => (
              <path
                key={li}
                className="ep-pulse"
                d={path.d}
                stroke={layer.color}
                strokeWidth={layer.width}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={layer.opacity}
                style={{
                  strokeDasharray: `${layer.dash} ${path.length}`,
                  strokeDashoffset: layer.dash,
                }}
              />
            ))}

            {path.nodes.map((node, ni) => (
              <circle
                key={ni}
                className="ep-node"
                cx={node.x}
                cy={node.y}
                r={2.4}
                fill={LINE_COLOR}
                opacity={0}
              />
            ))}
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
