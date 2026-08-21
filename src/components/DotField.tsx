/**
 * Halftone dot gradient.
 *
 * Three dot grids at different densities, each masked by its own radial
 * falloff, so the field reads as a printed halftone dissolving into the page
 * rather than a flat pattern with a fade on top. The coarsest layer is copper
 * and sits nearest the light source; the finer neutral layers carry it out.
 *
 * Purely atmospheric — always aria-hidden, never behind body copy.
 */

type Props = {
  /** Where the field is brightest, as a CSS position. */
  origin?: string;
  /** Multiplier on every layer. Drop it where the field passes behind copy. */
  intensity?: number;
  className?: string;
};

export default function DotField({ origin = '80% 6%', intensity = 1, className = '' }: Props) {
  const layers = [
    // coarse + copper, tight to the origin
    {
      color: 'var(--accent)',
      size: '26px 26px',
      dot: '2.1px',
      mask: `radial-gradient(ellipse 44% 50% at ${origin}, #000 0%, transparent 70%)`,
      opacity: 0.85,
    },
    // mid, neutral
    {
      color: 'var(--dot)',
      size: '17px 17px',
      dot: '1.5px',
      mask: `radial-gradient(ellipse 66% 72% at ${origin}, #000 0%, transparent 76%)`,
      opacity: 0.9,
    },
    // fine, carries the field out to nothing
    {
      color: 'var(--dot)',
      size: '10px 10px',
      dot: '1px',
      mask: `radial-gradient(ellipse 100% 100% at ${origin}, #000 0%, transparent 82%)`,
      opacity: 0.55,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* soft light source behind the dots, for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 46% 46% at ${origin}, var(--accent), transparent 70%)`,
          opacity: 'var(--glow-opacity)',
          filter: 'blur(60px)',
        }}
      />

      {layers.map((l, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${l.color} ${l.dot}, transparent ${l.dot})`,
            backgroundSize: l.size,
            opacity: l.opacity * intensity,
            WebkitMaskImage: l.mask,
            maskImage: l.mask,
          }}
        />
      ))}
    </div>
  );
}
