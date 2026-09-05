'use client';

import { useEffect, useRef, useState } from 'react';
import { currentRole, featured, roles } from '@/content/profile';
import { duration, formatMonth } from '@/lib/format';
import Reveal from './Reveal';
import Trace, { type TraceNode } from './Trace';
import { MinusIcon, PlusIcon } from './icons';

/** roleId::engagement name -> already told in full under "Selected systems". */
const FEATURED_ELSEWHERE = new Set(
  featured.filter((f) => f.source === 'role').map((f) => `${f.roleId}::${f.engagement}`),
);

export default function Experience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [nodes, setNodes] = useState<TraceNode[]>([]);
  const [height, setHeight] = useState(0);

  // Measure where each role sits so the trace can be drawn through them.
  const measure = () => {
    const root = rootRef.current;
    if (!root) return;
    const rootTop = root.getBoundingClientRect().top;
    const next: TraceNode[] = [];

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      next.push({
        y: r.top - rootTop + 46,
        // amplitude encodes systems delivered in that role (2px each, capped)
        amp: Math.min(26, 4 + roles[i].engagements.length * 5),
        label: roles[i].id,
      });
    });

    setNodes(next);
    setHeight(root.offsetHeight);
  };

  useEffect(() => {
    // ResizeObserver fires once on observe, which covers the initial measure —
    // so nothing is measured synchronously during the effect body.
    const ro = new ResizeObserver(() => measure());
    if (rootRef.current) ro.observe(rootRef.current);
    window.addEventListener('resize', measure);
    // Web fonts settle after first paint and shift every offset.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div ref={rootRef} data-trace-root className="relative">
      <Trace nodes={nodes} height={height} />

      {/* Below md the SVG trace is dropped for a plain rail, so the motif still
          reads on a phone without the measuring cost. */}
      <ol className="relative border-l border-line pl-6 md:border-l-0 md:pl-22">
        {roles.map((role, i) => (
          <li
            key={role.id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="relative border-t border-line first:border-t-0"
          >
            <span
              aria-hidden="true"
              className="absolute -left-7.5 top-11 h-2 w-2 rounded-full border-2 border-accent bg-canvas md:hidden"
            />
            <Reveal>
              <article className="grid gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-14">
                {/* period rail — real dates. Safe to show here because
                    independent work carries no date anywhere on the site
                    (see Systems.tsx): there's nothing to cross-reference
                    this timeline against, so an accurate employment record
                    here is a credibility plus, not a risk. */}
                <div className="md:col-span-3">
                  <p className="tabular font-mono text-[0.78rem] uppercase tracking-widest text-accent">
                    {role.periodLabel ?? `${formatMonth(role.start)} — ${formatMonth(role.end)}`}
                  </p>
                  <p className="tabular mt-1.5 font-mono text-[0.75rem] text-faint">
                    {role.periodLabel ? role.location : `${duration(role.start, role.end)} · ${role.location}`}
                  </p>
                  {role.id === currentRole.id && (
                    <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-signal-soft px-2.5 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-widest text-signal">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                      Current
                    </p>
                  )}
                </div>

                {/* the role */}
                <div className="md:col-span-9">
                  <h3 className="font-display text-[clamp(1.6rem,3vw,2.15rem)] font-semibold leading-tight tracking-tight text-display">
                    {role.company}
                  </h3>
                  <p className="mt-2 text-[0.975rem] text-ink">
                    {role.title}
                    {role.legalName && (
                      <span className="text-faint"> · {role.legalName}</span>
                    )}
                  </p>
                  <p className="prose-lead mt-5 max-w-[62ch] text-[1.05rem]">{role.premise}</p>

                  {/* Bordered cards rather than a gap-px grid: a role with one
                      engagement would otherwise paint an empty second cell.
                      Name + stack only — the story itself lives in one place:
                      here (via "Show highlights") or, for the handful also
                      chosen as case studies, in "Selected systems" above. */}
                  <ul
                    className={`mt-8 grid gap-3 ${
                      role.engagements.length > 1 ? 'sm:grid-cols-2' : ''
                    }`}
                  >
                    {role.engagements.map((e) => (
                      <li key={e.name} className="card card-lift p-5">
                        <h4 className="text-[0.975rem] font-semibold text-ink">{e.name}</h4>
                        <ul className="mt-3.5 flex flex-wrap gap-1.5">
                          {e.stack.slice(0, 5).map((t) => (
                            <li key={t} className="chip">
                              {t}
                            </li>
                          ))}
                          {e.stack.length > 5 && (
                            <li className="inline-flex items-center px-1.5 font-mono text-[0.72rem] text-faint">
                              +{e.stack.length - 5}
                            </li>
                          )}
                        </ul>
                        {FEATURED_ELSEWHERE.has(`${role.id}::${e.name}`) && (
                          <a
                            href="#work"
                            className="mt-3.5 inline-flex cursor-pointer items-center gap-1 font-mono text-[0.72rem] text-accent transition-colors hover:text-accent-strong"
                          >
                            Full write-up in Selected systems ↑
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>

                  <Details role={role} />
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Full bullet detail, collapsed by default — progressive disclosure. */
function Details({ role }: { role: (typeof roles)[number] }) {
  const [open, setOpen] = useState(false);
  const count = role.engagements.reduce((n, e) => n + e.highlights.length, 0);
  const panelId = `detail-${role.id}`;

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group inline-flex cursor-pointer items-center gap-2.5 rounded-md border border-line bg-surface px-4 py-2.5 font-mono text-[0.76rem] font-medium uppercase tracking-widest text-dim transition-colors duration-200 hover:border-accent hover:text-accent"
      >
        {open ? <MinusIcon className="h-3.5 w-3.5" /> : <PlusIcon className="h-3.5 w-3.5" />}
        {open ? 'Hide detail' : `Show ${count} highlights`}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="mt-6 space-y-7 border-l border-line pl-5"
      >
        {role.engagements.map((e) => (
          <div key={e.name}>
            <p className="eyebrow text-accent">{e.name}</p>
            <ul className="mt-3 space-y-2.5">
              {e.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[0.9rem] leading-relaxed text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
