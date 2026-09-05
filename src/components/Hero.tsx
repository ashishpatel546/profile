import Image from 'next/image';
import {
  person,
  organisationCount,
  peakScale,
  platformCount,
  yearsInTechnology,
} from '@/content/profile';
import { asset } from '@/lib/asset';
import BlueprintGrid from './BlueprintGrid';
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
    <section className="relative overflow-hidden pb-16 pt-28 md:pb-20 md:pt-32" id="top">
      <BlueprintGrid origin="80% 8%" counterOrigin="2% 96%" />

      <div className="gutter relative">
        <div className="grid items-end gap-12 md:grid-cols-12 md:gap-10">
          {/* ---- statement ---- */}
          <div className="md:col-span-7">
            <Reveal>
              <p className="inline-flex items-start gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 shadow-e1">
                <span
                  aria-hidden="true"
                  className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
                />
                <span className="eyebrow text-dim">
                  {person.positioning} <span className="text-faint">/</span> {person.discipline}
                </span>
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display mt-7 text-[clamp(2.5rem,6.8vw,4.75rem)]">
                {person.headline}
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="prose-lead mt-7 max-w-[56ch]">{person.standfirst}</p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href="#work" className="btn btn-primary group">
                  See the systems
                  <ArrowDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                </a>
                <a
                  href={person.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost group"
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
              <figure className="card overflow-hidden shadow-e2">
                {/* The colour frame, not the sepia one. The brass in the
                    shirt is where this page's warm accent comes from, so the
                    photograph has to be in the palette, not beside it. */}
                <div className="relative aspect-4/5 w-full overflow-hidden bg-surface2">
                  <Image
                    src={asset('/images/ashish-desk-color.jpg')}
                    alt={`${person.name}, ${person.positioning}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 92vw, 38vw"
                    className="scale-[1.16] object-cover object-[57%_26%]"
                  />
                  {/* Settles the photo's bright office background into the
                      card so the caption bar below reads as one object. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/3"
                    style={{
                      background:
                        'linear-gradient(to bottom, transparent, color-mix(in oklab, var(--surface) 80%, transparent))',
                    }}
                  />
                </div>

                <figcaption className="flex items-center justify-between gap-4 border-t border-line px-5 py-4">
                  <span className="font-display text-[1.05rem] font-semibold text-ink">
                    {person.name}
                  </span>
                  <span className="eyebrow text-[0.7rem]">{person.location}</span>
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
          <dl className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="card card-lift px-5 py-6">
                <dt className="eyebrow text-[0.7rem]">{s.label}</dt>
                <dd className="tabular mt-2.5 font-display text-[2.25rem] font-semibold leading-none tracking-tight text-ink">
                  {s.value}
                  {s.unit && <span className="ml-1 text-lg text-warm-ink">{s.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
