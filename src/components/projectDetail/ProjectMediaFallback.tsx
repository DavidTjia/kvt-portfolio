import type { CSSProperties } from "react";

interface ProjectMediaFallbackProps {
  label?: string;
  tone?: "dark" | "light";
  className?: string;

  bordered?: boolean;

  style?: CSSProperties;
}

export function ProjectMediaFallback({
  label = "Coming soon",
  tone = "dark",
  className = "",
  style,
  bordered = true,
}: ProjectMediaFallbackProps) {
  const palette =
    tone === "dark"
      ? "border-white/15 bg-white/5 text-white/40"
      : "border-kvt-line bg-white/40 text-kvt-muted/70";

  return (
    <div
      className={[
        "grid place-items-center text-center",
        bordered ? "border border-dashed" : "",
        "text-[10px] font-medium uppercase tracking-[0.14em] sm:text-xs",
        palette,
        className,
      ].join(" ")}
      style={style}
      aria-hidden="true"
    >
      <span className="px-3">{label}</span>
    </div>
  );
}
