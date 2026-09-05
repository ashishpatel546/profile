/**
 * The trace motif, introduced flat.
 *
 * A telemetry baseline that is mostly quiet with a few bursts of activity —
 * the shape of a charger network reporting in. It reappears as the vertical
 * spine of the experience timeline, which is where it carries real data.
 * Static path (no randomness) so server and client render identically.
 */

const BASELINE =
  'M0 30 H92 l7 -5 l7 10 l7 -5 H210 l5 -12 l6 24 l5 -12 H352 l9 -3 l9 6 l9 -3 ' +
  'H470 l6 -20 l7 40 l7 -40 l6 20 H640 l8 -4 l8 8 l8 -4 H778 l5 -10 l6 20 l5 -10 ' +
  'H900 l10 -6 l10 12 l10 -6 H1040 l6 -16 l7 32 l6 -16 H1200';

export default function SignalLine({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="h-11 w-full md:h-14"
        role="presentation"
      >
        {/* resting wire */}
        <path
          d={BASELINE}
          fill="none"
          stroke="var(--line-strong)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        {/* the pulse travelling along it — brass, so the live thing on the
            page is always the warm thing */}
        <path
          d={BASELINE}
          fill="none"
          stroke="var(--warm)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          className="signal-pulse"
        />
      </svg>

      <style>{`
        .signal-pulse {
          stroke-dasharray: 130 2600;
          animation: signal-travel 7s linear infinite;
        }
        @keyframes signal-travel {
          from { stroke-dashoffset: 2730; }
          to   { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .signal-pulse { animation: none; stroke-dasharray: none; opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
