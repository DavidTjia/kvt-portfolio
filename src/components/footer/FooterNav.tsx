const LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Project", href: "/#project" },
  { label: "Recognitions", href: "/#recognition" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/bigdadestudio",
    path: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bigdade/",
    path: (
      <>
        <path d="M4 9h3v11H4zM5.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" fill="currentColor" />
        <path
          d="M10 9h3v1.5c.5-.9 1.6-1.7 3.2-1.7 3 0 3.8 1.9 3.8 4.6V20h-3v-5.6c0-1.3-.5-2.2-1.7-2.2-1 0-1.5.7-1.8 1.3-.1.3-.1.6-.1 1V20h-3z"
          fill="currentColor"
        />
      </>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@bigdadegamedevelopment1841",
    path: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="m10 9 5 3-5 3z" fill="currentColor" />
      </>
    ),
  },
];

export function FooterNav() {
  return (
    <div className="flex flex-col items-center gap-8 sm:items-end">
      <div className="flex flex-col items-center gap-5 sm:items-end">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-kvt-muted">
          Navigation
        </span>
        <ul className="flex flex-col items-center gap-3 sm:items-end">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="group relative inline-flex w-fit items-center text-sm font-semibold text-kvt-ink transition-transform duration-300 ease-out hover:translate-x-1"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-kvt-blue transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center gap-4 sm:items-end">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-kvt-muted">
          Connect
        </span>
        <div className="flex items-center gap-3">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="grid h-10 w-10 place-items-center rounded-full border border-kvt-blue/45 text-kvt-blue transition-[background-color,color,border-color,box-shadow] duration-300 hover:border-kvt-blue hover:bg-kvt-blue hover:text-white hover:shadow-[0_10px_24px_-10px_rgba(30,111,217,0.7)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {social.path}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
