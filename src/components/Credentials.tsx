import { certifications, education, languages, recognition } from '@/content/profile';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Credentials() {
  return (
    <section
      id="credentials"
      className="scroll-mt-24 border-t border-line bg-surface2 py-24 md:py-32"
    >
      <div className="gutter">
        <SectionHeading
          index="06"
          label="Credentials"
          title="On paper."
          lede="Formal qualifications, certifications and the places I write."
        />

        <div className="grid gap-px bg-line lg:grid-cols-3">
          {/* education */}
          <Reveal className="bg-canvas">
            <div className="h-full p-7 md:p-8">
              <h3 className="eyebrow text-accent">Education</h3>
              <ul className="mt-6 space-y-6">
                {education.map((e) => (
                  <li key={e.qualification}>
                    <p className="font-display text-[1.2rem] font-normal leading-snug text-ink">
                      {e.qualification}
                    </p>
                    <p className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">
                      {e.institution}
                      {e.location && <>, {e.location}</>}
                    </p>
                    {e.period && (
                      <p className="tabular mt-1 font-mono text-[0.75rem] text-faint">{e.period}</p>
                    )}
                  </li>
                ))}
              </ul>

              <h3 className="eyebrow mt-10 text-accent">Languages</h3>
              <p className="mt-3 text-[0.925rem] text-dim">{languages.join(' · ')}</p>
            </div>
          </Reveal>

          {/* certifications */}
          <Reveal delay={70} className="bg-canvas">
            <div className="h-full p-7 md:p-8">
              <h3 className="eyebrow text-accent">Certifications</h3>
              <ul className="mt-6 space-y-5">
                {certifications.map((c) => (
                  <li key={c.name} className="border-b border-line pb-5 last:border-0 last:pb-0">
                    <p className="text-[0.975rem] font-medium leading-snug text-ink">{c.name}</p>
                    <p className="mt-1 text-[0.875rem] text-muted">{c.issuer}</p>
                    <p className="tabular mt-1 font-mono text-[0.72rem] text-faint">ID {c.id}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* recognition */}
          <Reveal delay={140} className="bg-canvas">
            <div className="h-full p-7 md:p-8">
              <h3 className="eyebrow text-accent">Recognition</h3>
              <ul className="mt-6 space-y-6">
                {recognition.map((r) => (
                  <li key={r.title}>
                    <p className="font-display text-[1.2rem] font-normal leading-snug text-display">
                      {r.title}
                    </p>
                    <p className="mt-1.5 text-[0.9rem] leading-relaxed text-muted">{r.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
