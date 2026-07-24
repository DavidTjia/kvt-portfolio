interface HeroCtaButtonProps {
  label: string;
  href: string;
}

export function HeroCtaButton({ label, href }: HeroCtaButtonProps) {
  return (
    <a
      href={href}
      className={[
        "group relative inline-flex w-fit items-center justify-center overflow-hidden rounded-lg",

        "bg-[#2f5680] px-5 py-2.5 text-[13px] font-medium text-white sm:px-6 sm:py-3 sm:text-sm",

        "shadow-[0_6px_16px_-4px_rgba(11,27,51,0.35),0_2px_5px_-2px_rgba(11,27,51,0.25)]",

        "transition-[transform,background-color,box-shadow] duration-300 ease-out",

        "hover:-translate-y-0.5 hover:bg-[#1b3a5c]",
        "hover:shadow-[0_12px_24px_-6px_rgba(11,27,51,0.45),0_4px_8px_-3px_rgba(11,27,51,0.3)]",

        "active:translate-y-0 active:shadow-[0_4px_10px_-4px_rgba(11,27,51,0.35)]",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative">{label}</span>
    </a>
  );
}
