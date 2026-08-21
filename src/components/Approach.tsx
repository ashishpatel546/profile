import { thesis, leadership } from '@/content/profile';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { NodeIcon } from './icons';

export default function Approach() {
  return (
    <section id="approach" className="gutter scroll-mt-24 py-24 md:py-32">
      <SectionHeading
        index="01"
        label="Approach"
        title="Three problems I get called in for."
        lede="Most of my work sits where software meets something stubborn — physical hardware, a legacy contract, or a model that will happily make things up. These are the patterns that repeat."
      />

      <ol className="grid gap-px bg-line md:grid-cols-3">
        {thesis.map((t, i) => (
          <Reveal as="li" key={t.label} delay={i * 90} className="bg-canvas">
            <article className="group flex h-full flex-col gap-5 p-7 transition-colors duration-300 hover:bg-surface md:p-8">
              {/* No 01/02/03 here: these are three parallel problems, not a
                  sequence, so numbering them would be decoration. */}
              <NodeIcon className="h-5 w-5 text-accent" />

              <h3 className="font-display text-[1.55rem] font-normal leading-tight text-display">
                {t.label}
              </h3>

              <p className="text-[0.95rem] leading-relaxed text-muted">{t.body}</p>

              <span
                aria-hidden="true"
                className="mt-auto block h-px w-8 bg-accent transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full"
              />
            </article>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={120}>
        <div className="mt-px flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line px-1 py-6">
          <span className="eyebrow text-accent">Alongside the architecture</span>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {leadership.map((item) => (
              <li key={item} className="text-[0.9rem] text-dim">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
