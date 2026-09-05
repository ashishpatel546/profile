'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type TraceNode = {
  /** Vertical centre of the role, in px relative to the list container. */
  y: number;
  /** Deflection amplitude — driven by how many systems the role covered. */
  amp: number;
  label: string;
};

const BASE_X = 40;

/**
 * The trace.
 *
 * A single cyanotype line running the height of the career, deflecting at each
 * role by an amount proportional to the number of systems built there — so
 * the shape of the line is the shape of the record, not decoration. It draws
 * itself as the section scrolls, with a head riding the tip.
 * With reduced motion it is simply already drawn, and the head is hidden.
 *
 * It reads on the light ground as a plotted drawing rather than a lit wire,
 * which is why the glow filter it used to carry is gone.
 */
export default function Trace({ nodes, height }: { nodes: TraceNode[]; height: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
  const [reduced, setReduced] = useState(false);

  // Build one continuous path: straight between roles, bulging at each.
  const d = (() => {
    if (!height) return '';
    let out = `M ${BASE_X} 0`;
    for (const n of nodes) {
      const x = BASE_X + n.amp;
      out += ` C ${BASE_X} ${n.y - 62}, ${x} ${n.y - 34}, ${x} ${n.y}`;
      out += ` C ${x} ${n.y + 34}, ${BASE_X} ${n.y + 34}, ${BASE_X} ${n.y + 62}`;
    }
    out += ` L ${BASE_X} ${height}`;
    return out;
  })();

  useEffect(() => {
    if (pathRef.current && d) setLen(pathRef.current.getTotalLength());
  }, [d]);

  const onScroll = useCallback(() => {
    const path = pathRef.current;
    const el = path?.closest('[data-trace-root]') as HTMLElement | null;
    if (!el || !path) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const span = rect.height + vh * 0.2;
    const p = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / span));
    setProgress(p);

    // The head sits wherever the line has got to.
    const total = path.getTotalLength();
    if (total > 0) {
      const pt = path.getPointAtLength(total * p);
      setTip({ x: pt.x, y: pt.y });
    }
  }, []);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    // Every state update goes through rAF, so nothing is set synchronously
    // during the effect body.
    const handler = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setReduced(isReduced);
        if (isReduced) setProgress(1);
        else onScroll();
      });
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [onScroll]);

  if (!height) return null;

  const showHead = !reduced && tip && progress > 0.005 && progress < 0.995;

  return (
    <svg
      width="88"
      height={height}
      viewBox={`0 0 88 ${height}`}
      className="pointer-events-none absolute left-0 top-0 hidden md:block"
      aria-hidden="true"
      role="presentation"
    >
      {/* undrawn wire */}
      <path d={d} fill="none" stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 4" />

      {/* the live trace */}
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        className="trace-path"
        style={
          {
            '--trace-len': len,
            '--trace-progress': progress,
          } as React.CSSProperties
        }
      />

      {/* The head — the light running up and down the wire. Brass, against
          the cyanotype line: the drawing is cool, the live point on it is
          warm. */}
      {showHead && (
        <g transform={`translate(${tip.x} ${tip.y})`} className="trace-head">
          <circle r="10" fill="var(--warm)" opacity="0.18" />
          <circle r="4.5" fill="var(--warm)" opacity="0.4" />
          <circle r="2.6" fill="var(--warm)" />
        </g>
      )}

      {/* a node per role, lighting up as the trace reaches it */}
      {nodes.map((n) => {
        const reachedNode = height > 0 && progress >= n.y / height - 0.02;
        return (
          <g key={n.label} transform={`translate(${BASE_X + n.amp} ${n.y})`}>
            <circle
              r={reachedNode ? 5 : 3.5}
              fill="var(--canvas)"
              stroke={reachedNode ? 'var(--accent)' : 'var(--line-strong)'}
              strokeWidth="2"
              style={{ transition: 'all 320ms var(--ease-out-expo)' }}
            />
            {reachedNode && (
              <circle
                r="10"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1"
                opacity="0.25"
                style={{ transition: 'all 320ms var(--ease-out-expo)' }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
