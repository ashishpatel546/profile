'use client';

import { useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

/** Must stay in sync with the pre-paint script in layout.tsx. */
export const THEME_KEY = 'ak-theme';
const DEFAULT_THEME: Theme = 'light';

/*
 * The <html data-theme> attribute is the single source of truth — the pre-paint
 * script sets it before React exists, so reading it (rather than keeping a
 * parallel useState) is what keeps the button and the page from disagreeing.
 */
let listeners: (() => void)[] = [];

function subscribe(cb: () => void) {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function getServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

function setTheme(next: Theme) {
  document.documentElement.setAttribute('data-theme', next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // Private mode or blocked storage — the page still works, the choice
    // just doesn't survive a reload.
  }
  listeners.forEach((l) => l());
}

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
  focusable: 'false' as const,
  className: 'h-[18px] w-[18px]',
};

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      title={label}
      className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-line bg-surface text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
    >
      {isDark ? (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.6M12 18.9v2.6M4.2 4.2l1.9 1.9M17.9 17.9l1.9 1.9M2.5 12h2.6M18.9 12h2.6M4.2 19.8l1.9-1.9M17.9 6.1l1.9-1.9" />
        </svg>
      ) : (
        <svg {...iconProps}>
          <path d="M20 14.5A8.2 8.2 0 019.5 4a8.5 8.5 0 1010.5 10.5z" />
        </svg>
      )}
    </button>
  );
}
