const ANGLE = "rotate-24";

const LINES = [
  { key: "thick", left: "62%", width: "w-2.5", from: "from-[#1b3a5c]/90", via: "via-[#1b3a5c]/55" },
  { key: "thin", left: "calc(62% + 18px)", width: "w-0.75", from: "from-[#8ea6c2]/70", via: "via-[#8ea6c2]/40" },
];

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-linear-to-br from-white via-[#F3F8FF] to-[#EAF6FF]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(45% 50% at 86% 4%, rgba(96,152,214,0.30), transparent 72%)",
            "radial-gradient(40% 45% at 6% 90%, rgba(96,152,214,0.24), transparent 72%)",
            "radial-gradient(32% 36% at 3% 8%, rgba(140,182,226,0.20), transparent 72%)",
            "radial-gradient(36% 40% at 97% 94%, rgba(120,168,220,0.18), transparent 72%)",
          ].join(", "),
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(44% 56% at 55% 52%, rgba(255,255,255,0.95), rgba(255,255,255,0.5) 45%, transparent 74%)",
        }}
      />
      <div className="absolute inset-0">
        {LINES.map((line) => (
          <div
            key={line.key}
            className={`absolute top-[-10%] h-[150%] origin-top ${line.width} ${ANGLE} bg-linear-to-b ${line.from} ${line.via} to-transparent`}
            style={{ left: line.left }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-[6%] left-[55%] h-[62%] w-[52dvh] -translate-x-1/2 rounded-full bg-[#5b93d6]/20 blur-[120px]" />
        <div className="absolute bottom-[2%] left-[55%] h-[34%] w-[70dvh] -translate-x-1/2 rounded-full bg-[#4a86d4]/14 blur-[90px]" />
      </div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(78% 78% at 52% 46%, transparent 56%, rgba(11,27,51,0.09) 100%)",
        }}
      />
    </div>
  );
}
