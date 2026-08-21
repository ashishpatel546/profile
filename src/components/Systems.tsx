import { resolveFeatured } from '@/content/profile';
import { formatMonth } from '@/lib/format';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { ArrowUpRightIcon } from './icons';

/** Keeps the heading honest when the featured list changes length. */
const COUNT_WORDS: Record<number, string> = {
  2: 'Two',
  3: 'Three',
  4: 'Four',
  5: 'Five',
  6: 'Six',
};

export default function Systems() {
  const items = resolveFeatured();

  return (
    <section id="work" className="scroll-mt-24 border-t border-line bg-surface2 py-24 md:py-32">
      <div className="gutter">
        <SectionHeading
          index="02"
          label="Selected systems"
          title={`${COUNT_WORDS[items.length] ?? items.length} builds that show the range.`}
          lede="Chosen for the kind of problem rather than the size of the logo: autonomous agents running operations, an AI-native product, stateful hardware in real time, enterprise identity, and analytics data in motion."
        />

        {/* Rows bleed past the gutter so the hover fill has room to breathe;
            the matching padding puts the text back on the heading's alignment. */}
        <ol className="-mx-5 border-t border-line md:-mx-6">
          {items.map(({ role, engagement, angle }, i) => (
            <Reveal as="li" key={`${role.id}-${engagement.name}`} delay={i * 60}>
              <article className="group relative grid gap-6 border-b border-line px-5 py-10 transition-colors duration-300 hover:bg-canvas/70 md:grid-cols-12 md:gap-10 md:px-6 md:py-12">
                {/* accent bar wipes down the row on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100"
                />

                {/* metadata rail */}
                <div className="md:col-span-3">
                  {/* The angle is the meaningful marker — these four are a
                      selection, not an ordered sequence. */}
                  <span className="eyebrow text-accent">{angle}</span>

                  <p className="mt-4 font-display text-[1.2rem] font-normal text-ink">
                    {role.company}
                  </p>
                  <p className="tabular mt-1 font-mono text-[0.75rem] text-faint">
                    {role.periodLabel ?? `${formatMonth(role.start)} — ${formatMonth(role.end)}`}
                  </p>
                </div>

                {/* body */}
                <div className="md:col-span-6">
                  <h3 className="font-display text-[clamp(1.45rem,2.5vw,1.95rem)] font-normal leading-tight text-display">
                    {engagement.name}
                  </h3>
                  {engagement.link && (
                    <a
                      href={engagement.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex min-h-10 cursor-pointer items-center gap-1.5 font-mono text-[0.8rem] text-accent transition-colors hover:text-accent-strong"
                    >
                      {engagement.link.label}
                      <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </a>
                  )}

                  <p className="mt-4 max-w-prose text-[0.975rem] leading-relaxed text-dim">
                    {engagement.summary}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {engagement.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[0.925rem] leading-relaxed text-muted">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55em] h-px w-3 shrink-0 bg-accent"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* stack */}
                <div className="md:col-span-3">
                  <p className="eyebrow">Stack</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {engagement.stack.map((tech) => (
                      <li
                        key={tech}
                        className="border border-line bg-canvas px-2.5 py-1 font-mono text-[0.72rem] text-dim transition-colors duration-200 group-hover:border-line-strong"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
