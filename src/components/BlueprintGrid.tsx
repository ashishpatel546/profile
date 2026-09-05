/**
 * Drafting-paper grid.
 *
 * Two rule weights — a fine 26px field and a major line every fifth one —
 * masked by a radial falloff so the sheet dissolves before it reaches the
 * copy. It replaces the halftone-and-film-grain atmosphere the page used to
 * carry: same job, but it says "engineering drawing" instead of "print
 * artefact", which is what the subject actually is.
 *
 * Purely atmospheric — always aria-hidden, never behind body copy at full
 * strength.
 */

type Props = {
  /** Where the sheet is brightest, as a CSS position. */
  origin?: string;
  /** Where the brass counter-light falls. Defaults to the opposite corner. */
  counterOrigin?: string;
  /** Multiplier on every layer. Drop it where the field passes behind copy. */
  intensity?: number;
  className?: string;
};

export default function BlueprintGrid({
  origin = '78% 8%',
  counterOrigin = '8% 88%',
  intensity = 1,
  className = '',
}: Props) {
  const fade = (extent: string) =>
    `radial-gradient(ellipse ${extent} at ${origin}, #000 0%, rgba(0,0,0,0.55) 45%, transparent 78%)`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* fine field */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--grid-fine) 1px, transparent 1px),' +
            'linear-gradient(to bottom, var(--grid-fine) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          opacity: 0.9 * intensity,
          WebkitMaskImage: fade('90% 85%'),
          maskImage: fade('90% 85%'),
        }}
      />

      {/* major rules, every fifth line */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--grid-major) 1px, transparent 1px),' +
            'linear-gradient(to bottom, var(--grid-major) 1px, transparent 1px)',
          backgroundSize: '130px 130px',
          opacity: 0.85 * intensity,
          WebkitMaskImage: fade('70% 68%'),
          maskImage: fade('70% 68%'),
        }}
      />

      {/* Two lights on the sheet, and they are the page's two colours: a cool
          one at the origin and a brass one thrown from the opposite corner.
          Wide and very low, so it reads as paper catching a window rather
          than as a glow effect — but it is what keeps the ground from going
          flat and white. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            `radial-gradient(ellipse 62% 58% at ${origin}, var(--accent-soft), transparent 72%),` +
            `radial-gradient(ellipse 34% 34% at ${counterOrigin}, var(--warm-soft), transparent 68%)`,
          opacity: `calc(var(--glow-opacity) * ${intensity})`,
        }}
      />
    </div>
  );
}
