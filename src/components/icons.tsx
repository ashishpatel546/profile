/**
 * One icon family, drawn in-house: 24×24 box, 1.5 stroke, round caps and
 * joins. No emoji anywhere on the page — they are font-dependent and can't be
 * driven by design tokens.
 */

type IconProps = { className?: string };

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
  focusable: 'false' as const,
};

export function ArrowDownIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 4.5v15M5.5 13l6.5 6.5L18.5 13" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 17L17 7M8.5 7H17v8.5" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 12h15M13 5.5l6.5 6.5L13 18.5" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.75" y="5" width="18.5" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6.2 3.5h3l1.5 4-2 1.4a12.5 12.5 0 006.4 6.4l1.4-2 4 1.5v3a2 2 0 01-2.2 2A17.6 17.6 0 014.2 5.7a2 2 0 012-2.2z" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function DocumentIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 5.5v13M5.5 12h13" />
    </svg>
  );
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5.5 12h13" />
    </svg>
  );
}

/** Filled glyph — WhatsApp's mark is a solid shape, so a stroke version reads wrong. */
export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M12.04 2A9.9 9.9 0 002.1 11.9a9.8 9.8 0 001.34 4.95L2 22l5.3-1.38a9.9 9.9 0 004.74 1.2h.01a9.9 9.9 0 009.94-9.9A9.9 9.9 0 0012.04 2zm0 18.03a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.2 8.2 0 1115.16-4.36 8.22 8.22 0 01-8.18 8.23zm4.5-6.16c-.24-.12-1.46-.72-1.68-.8-.23-.09-.39-.13-.56.12s-.64.8-.79.97c-.14.16-.29.18-.53.06a6.7 6.7 0 01-1.98-1.22 7.4 7.4 0 01-1.37-1.7c-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.14.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.43.06-.65.31-.23.24-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.6.18 1.14.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

export function NodeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v5.3M12 16.2v5.3M2.5 12h5.3M16.2 12h5.3" />
    </svg>
  );
}
