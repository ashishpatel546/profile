import Reveal from './Reveal';

/**
 * Set as type, not logos: using a company's marks without their brand
 * guidelines is a misuse, and guessed logo files look worse than good
 * typography. ResMed (Somnoware) and Colegios/AppMeSoft appear as client
 * engagements, not employers.
 */
const ORGANISATIONS = [
  { name: 'VML Enterprise Solutions', note: 'WPP Group' },
  { name: 'Blink Charging', note: 'EV infrastructure' },
  { name: 'Tirex Chargers', note: 'EV infrastructure' },
  { name: 'AppMeSoft', note: 'Colegios school ERP' },
  { name: 'ResMed', note: 'Somnoware · healthcare' },
  { name: 'GIIT Solutions', note: 'Consulting' },
  { name: 'Tag11 Infotech', note: 'Commerce & fintech' },
];

export default function Organisations() {
  return (
    <section className="gutter pt-20 md:pt-24" aria-labelledby="orgs-heading">
      <Reveal>
        <div className="flex items-center gap-3">
          <h2 id="orgs-heading" className="eyebrow">
            Organisations and clients I have built for
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
        </div>
      </Reveal>

      <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {ORGANISATIONS.map((org, i) => (
          <Reveal as="li" key={org.name} delay={i * 45}>
            <div className="card card-lift group flex h-full flex-col justify-between gap-3 px-4 py-5">
              <span className="font-display text-[1.05rem] font-semibold leading-tight tracking-tight text-dim transition-colors duration-300 group-hover:text-accent">
                {org.name}
              </span>
              <span className="eyebrow text-[0.66rem]">{org.note}</span>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
