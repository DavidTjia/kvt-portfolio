interface HeroServicesBarProps {
  edge: string;
}

const SERVICES = [
  "Game Development",
  "Interactive App Development",
  "Mobile Game Development",
  "Simulation & Training Systems",
];

export function HeroServicesBar({ edge }: HeroServicesBarProps) {
  return (
    <div className="relative z-30 shrink-0 bg-linear-to-r from-[#16304f] via-[#1b3a5c] to-[#16304f]">
      <div
        className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-3 ${edge}`}
      >
        {SERVICES.map((service, i) => (
          <span key={service} className="flex items-center gap-3">

            {i > 0 && (
              <span aria-hidden="true" className="text-white/40">
                ·
              </span>
            )}
            <span className="text-[11px] font-bold tracking-tight text-white sm:text-sm">
              {service}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
