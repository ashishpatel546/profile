import Reveal from './Reveal';

type Props = {
  /** Two-digit index. The sections genuinely read in order, so numbering carries meaning. */
  index: string;
  label: string;
  title: string;
  lede?: string;
};

/**
 * Section header: a hairline rule with the mono label sitting on it, then the
 * display title beneath. The rule is the structural motif that repeats down
 * the page and ties back to the trace.
 */
export default function SectionHeading({ index, label, title, lede }: Props) {
  return (
    <header className="mb-12 md:mb-16">
      <Reveal>
        <div className="flex items-center gap-4 border-t border-line pt-4">
          <span className="eyebrow tabular text-accent">{index}</span>
          <span className="eyebrow">{label}</span>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-8 md:grid-cols-12 md:gap-12">
        <Reveal delay={60} className="md:col-span-7">
          <h2 className="display text-[clamp(2.1rem,5.2vw,3.6rem)]">{title}</h2>
        </Reveal>
        {lede && (
          <Reveal delay={120} className="md:col-span-5 md:pt-2">
            <p className="max-w-prose text-[0.95rem] leading-relaxed text-muted">{lede}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
