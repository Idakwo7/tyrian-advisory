type IconProps = {
  name: string;
  className?: string;
};

const paths: Record<string, JSX.Element> = {
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="9" cy="7" rx="6" ry="3" />
      <path d="M3 7v5c0 1.66 2.69 3 6 3s6-1.34 6-3V7" />
      <path d="M15 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" transform="translate(-6 0)" />
      <ellipse cx="15" cy="12" rx="6" ry="3" />
    </>
  ),
  handshake: (
    <>
      <path d="M11 17l2 2a1 1 0 0 0 1.4 0l3.6-3.6a2 2 0 0 0 0-2.8L14 8" />
      <path d="M6 8l-3 3a2 2 0 0 0 0 2.8l1 1a2 2 0 0 0 2.8 0L11 12" />
      <path d="M9.5 10.5l2-2a1 1 0 0 1 1.4 0l1.6 1.6" />
      <path d="M18 15l3-3" />
      <path d="M3 11L6 8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
      <path d="M10 21v-3h4v3" />
    </>
  ),
  refresh: (
    <>
      <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-8.5-6" />
      <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 8.5 6" />
      <polyline points="21 3 21 9 15 9" />
      <polyline points="3 21 3 15 9 15" />
    </>
  ),
  podium: (
    <>
      <path d="M12 3v4" />
      <rect x="8" y="7" width="8" height="4" rx="1" />
      <path d="M12 11v4" />
      <path d="M7 21c0-3 2-5 5-5s5 2 5 5" />
      <path d="M5 21h14" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3c3 1 5 4 5 8l-2 3H9l-2-3c0-4 2-7 5-8z" />
      <circle cx="12" cy="9" r="1.5" />
      <path d="M9 14l-2 3 3-1M15 14l2 3-3-1" />
      <path d="M10 20c0 1 2 2 2 2s2-1 2-2" />
    </>
  ),
};

export default function Icon({ name, className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.compass}
    </svg>
  );
}
