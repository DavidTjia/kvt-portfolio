export const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

const REVEAL_DURATION = 0.8;

export function revealUp(delay = 0, y = 28) {
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: REVEAL_DURATION, ease: REVEAL_EASE, delay },
  };
}
