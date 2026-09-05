'use client';

import { useEffect, useState } from 'react';
import { person } from '@/content/profile';
import ThemeToggle from './ThemeToggle';

/**
 * Four destinations, not seven. A single-page site only needs the stops a
 * reader would actually jump to; Approach, Capabilities and Credentials are
 * read in passing and don't earn a slot. Every section keeps its id, so deep
 * links to them still work.
 */
export const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'engagements', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>('');
  const [lifted, setLifted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
        setLifted(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.1, 0.5] },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  /* The bar always renders in the page's own theme — never forced dark — so
     the theme toggle gives visible feedback right where the user clicked it. */
  const chrome = lifted
    ? 'border-b border-line bg-canvas/80 shadow-e1 backdrop-blur-xl backdrop-saturate-150'
    : 'border-b border-transparent bg-transparent';

  return (
    <header className={`no-print fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${chrome}`}>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
        style={{ transform: `scaleX(${progress})`, transition: 'transform 90ms linear' }}
      />

      <nav className="gutter flex h-18 items-center justify-between gap-4" aria-label="Primary">
        {/* No `truncate`: the name is the brand and must never become "A…".
            The positioning eyebrow is the thing that yields on narrow screens. */}
        <a
          href="#top"
          className="group -my-2 flex shrink-0 cursor-pointer items-baseline gap-3 py-2"
          aria-label={`${person.name} — back to top`}
        >
          <span className="whitespace-nowrap font-display text-xl font-semibold leading-none tracking-tight text-ink transition-colors group-hover:text-accent">
            {person.name}
          </span>
          <span className="eyebrow hidden text-[0.7rem] xl:inline">{person.positioning}</span>
        </a>

        <div className="flex shrink-0 items-center gap-2">
          {/* Desktop list from 1024px — four items fit comfortably there. */}
          <ul className="hidden items-center gap-1 lg:flex">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={`relative block cursor-pointer whitespace-nowrap rounded-md px-3.5 py-2 text-[0.95rem] font-medium transition-colors duration-200 ${
                    active === s.id
                      ? 'bg-accent-soft text-accent'
                      : 'text-muted hover:bg-surface2 hover:text-ink'
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={person.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden cursor-pointer whitespace-nowrap rounded-md border border-line-strong bg-surface px-4 py-2 text-[0.95rem] font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent md:inline-block"
          >
            Résumé
          </a>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-line bg-surface text-ink transition-colors hover:border-accent hover:text-accent lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              aria-hidden="true"
              className="h-4.5 w-4.5"
            >
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu: the full section list lives here, where it has room. */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="border-t border-line bg-canvas shadow-e2 lg:hidden"
      >
        <ul className="gutter py-2">
          {[
            { id: 'approach', label: 'Approach' },
            ...SECTIONS,
            { id: 'capabilities', label: 'Capabilities' },
            { id: 'credentials', label: 'Credentials' },
          ].map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setMenuOpen(false)}
                className={`block cursor-pointer border-b border-line py-3.5 text-base font-medium transition-colors ${
                  active === s.id ? 'text-accent' : 'text-ink'
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={person.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="block cursor-pointer py-3.5 text-base font-medium text-accent"
            >
              Résumé (PDF)
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
