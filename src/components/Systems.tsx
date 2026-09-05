import { resolveFeatured } from '@/content/profile';
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
    <section id="work" className="band scroll-mt-24 border-y border-line py-24 md:py-32">
      <div className="gutter">
        <SectionHeading
          index="02"
          label="Selected systems"
          title={`${COUNT_WORDS[items.length] ?? items.length} builds that show the range.`}
          lede="Chosen for the kind of problem rather than the size of the logo: autonomous agents running operations, an AI-native product, stateful hardware in real time, enterprise identity, and analytics data in motion."
        />

        {/* Each build is its own card: these are five separate case studies,
            and a shared hairline table made them read as one ledger. */}
        <ol className="grid gap-4 md:gap-5">
          {items.map(({ company, tag, engagement, angle }, i) => (
            <Reveal as="li" key={`${company}-${engagement.name}`} delay={i * 60}>
              <article className="card card-lift group relative grid gap-6 overflow-hidden p-7 md:grid-cols-12 md:gap-10 md:p-9">
                {/* accent bar wipes down the card on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
                />

                {/* metadata rail */}
                <div className="md:col-span-3">
                  {/* The angle is the meaningful marker — these four are a
                      selection, not an ordered sequence. */}
                  <span className="inline-flex rounded-full bg-warm-soft px-3 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-warm-ink">
                    {angle}
                  </span>

                  <p className="mt-4 font-display text-[1.15rem] font-semibold tracking-tight text-ink">
                    {company}
                  </p>
                  {/* No dates here, ever — for anyone. This is a case-study
                      list, not a timeline; Experience is the timeline. The
                      independent builds carry no date on the site at all, so
                      this section can't become a proxy for one either. */}
                  {tag && (
                    <p className="mt-1 font-mono text-[0.75rem] text-faint">{tag}</p>
                  )}
                </div>

                {/* body */}
                <div className="md:col-span-6">
                  <h3 className="font-display text-[clamp(1.35rem,2.3vw,1.8rem)] font-semibold leading-tight tracking-tight text-display">
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
                          className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
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
                      <li key={tech} className="chip group-hover:border-line-strong">
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
