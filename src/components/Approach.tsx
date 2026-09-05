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

      <ol className="grid gap-4 md:grid-cols-3 md:gap-5">
        {thesis.map((t, i) => (
          <Reveal as="li" key={t.label} delay={i * 90}>
            <article className="card card-lift group flex h-full flex-col gap-5 p-7 md:p-8">
              {/* No 01/02/03 here: these are three parallel problems, not a
                  sequence, so numbering them would be decoration. */}
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent-soft text-accent">
                <NodeIcon className="h-5 w-5" />
              </span>

              <h3 className="font-display text-[1.4rem] font-semibold leading-tight tracking-tight text-display">
                {t.label}
              </h3>

              <p className="text-[0.95rem] leading-relaxed text-muted">{t.body}</p>

              <span
                aria-hidden="true"
                className="mt-auto block h-0.5 w-8 rounded-full bg-warm transition-all duration-500 ease-out-expo group-hover:w-16"
              />
            </article>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={120}>
        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-lg border border-line bg-surface2 px-6 py-5 md:mt-5">
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
