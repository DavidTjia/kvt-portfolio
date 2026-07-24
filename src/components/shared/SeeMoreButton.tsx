import Link from "next/link";

interface SeeMoreButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export function SeeMoreButton({ href, label = "See More", className = "" }: SeeMoreButtonProps) {
  return (
    <Link
      href={href}
      className={[
        "group relative inline-flex w-fit items-center gap-2 overflow-hidden rounded-lg",
        "border border-white/30 bg-white/10 px-5 py-2.5 text-[13px] font-semibold text-white backdrop-blur-sm sm:text-sm",
        "shadow-[0_6px_16px_-6px_rgba(0,0,0,0.5)]",

        "transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20",
        "hover:shadow-[0_12px_26px_-10px_rgba(0,0,0,0.6)]",
        "active:translate-y-0",
        className,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative">{label}</span>
      <svg
        className="relative transition-transform duration-300 ease-out group-hover:translate-x-1"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
