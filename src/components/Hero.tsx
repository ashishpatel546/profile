import Image from 'next/image';
import {
  person,
  organisationCount,
  peakScale,
  platformCount,
  yearsInTechnology,
} from '@/content/profile';
import { asset } from '@/lib/asset';
import DotField from './DotField';
import { ArrowDownIcon, ArrowUpRightIcon } from './icons';
import Reveal from './Reveal';
import SignalLine from './SignalLine';
import YearsCount from './YearsCount';

export default function Hero() {
  const inTech = yearsInTechnology();

  /* Two year figures, each labelled for exactly what it is. The long one is
     time in technology since graduating; the timeline below covers the roles
     from 2019 on. Labelling them separately is what keeps both defensible. */
  const stats = [
    {
      value: <YearsCount from={person.journeyStart} initial={inTech} decimals={0} />,
      unit: 'yrs',
      label: 'In technology',
    },
    { value: peakScale.value, unit: '', label: peakScale.label },
    { value: platformCount, unit: '', label: 'Platforms shipped' },
    { value: organisationCount, unit: '', label: 'Organisations' },
  ];

  return (
    /* Deliberately NOT a `band`: the hero follows the chosen theme, so toggling
       it gives visible feedback on the very first screen. Copper on paper reads
       fine for the horizontal wire; the vertical trace further down keeps its
       dark band, where a reader has already seen the theme change. */
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20" id="top">
      <DotField origin="82% 4%" />
      <div className="grain" aria-hidden="true" />

      <div className="gutter relative">
        <div className="grid items-end gap-12 md:grid-cols-12 md:gap-10">
          {/* ---- statement ---- */}
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow text-accent">
                {person.positioning} <span className="text-faint">/</span> {person.discipline}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display mt-6 text-[clamp(2.6rem,7.4vw,5.25rem)]">
                {person.headline}
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="prose-lead mt-8 max-w-[54ch]">{person.standfirst}</p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="group inline-flex cursor-pointer items-center gap-2.5 bg-accent px-6 py-3.5 text-[0.95rem] font-medium text-on-accent transition-colors duration-200 hover:bg-accent-strong"
                >
                  See the systems
                  <ArrowDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                </a>
                <a
                  href={person.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex cursor-pointer items-center gap-2.5 border border-line-strong px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  Résumé (PDF)
                  <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* ---- portrait ---- */}
          <div className="md:col-span-5">
            <Reveal delay={140}>
              <figure>
                {/* Brackets hang off this box, not the figure, so they stay
                    registered to the image rather than the caption. */}
                <div className="relative">
                  <div className="relative aspect-4/5 w-full overflow-hidden bg-surface">
                    <Image
                      src={asset('/images/ashish-portrait.jpg')}
                      alt={`${person.name}, ${person.positioning}`}
                      fill
                      priority
                      sizes="(max-width: 768px) 92vw, 38vw"
                      className="object-cover object-top"
                    />
                    {/* Fade the photo's bright office background into the band. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to bottom, transparent 32%, color-mix(in oklab, var(--canvas) 78%, transparent) 82%, var(--canvas) 100%)',
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 mix-blend-soft-light"
                      style={{
                        background:
                          'linear-gradient(140deg, color-mix(in oklab, var(--accent) 45%, transparent), transparent 55%)',
                      }}
                    />
                  </div>

                  {/* Registration marks — an architect's frame that doesn't box the photo in. */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-3 -top-3 h-12 w-12 border-l border-t border-accent/70"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-3 -right-3 h-12 w-12 border-b border-r border-accent/70"
                  />
                </div>

                <figcaption className="eyebrow mt-7 flex items-center justify-between">
                  <span>{person.name}</span>
                  <span className="text-accent">{person.location}</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        {/* ---- the wire ---- */}
        <Reveal delay={260}>
          <SignalLine className="mt-16 md:mt-20" />
        </Reveal>

        {/* ---- derived numbers ---- */}
        <Reveal delay={320}>
          <dl className="grid grid-cols-2 gap-px border-t border-line bg-line md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-canvas px-1 py-6 md:px-2">
                <dt className="eyebrow">{s.label}</dt>
                <dd className="tabular mt-2 font-display text-[2.5rem] font-light leading-none text-ink">
                  {s.value}
                  {s.unit && <span className="ml-1 text-lg text-accent">{s.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
