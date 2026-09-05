import { links, person } from '@/content/profile';
import BlueprintGrid from './BlueprintGrid';
import Reveal from './Reveal';
import SignalLine from './SignalLine';
import WhatsAppContact from './WhatsAppContact';
import { ArrowUpRightIcon, DocumentIcon, MailIcon, PhoneIcon, PinIcon } from './icons';

export default function Contact() {
  return (
    /* The closing band — bookends the hero and gives the footer trace its ground. */
    <footer
      id="contact"
      className="band relative scroll-mt-24 overflow-hidden border-t border-line pb-16 pt-24 md:pt-32"
    >
      {/* Low intensity and pushed into the corner: the contact form sits over
          this area, and a grid behind form copy hurts readability. */}
      <BlueprintGrid origin="6% 92%" intensity={0.4} />
      <div className="gutter relative">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="tabular inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-accent-soft px-1.5 font-mono text-[0.72rem] font-medium text-accent">
              07
            </span>
            <span className="eyebrow">Contact</span>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Reveal delay={60}>
              <h2 className="display text-[clamp(2.2rem,5.2vw,3.75rem)]">
                Got a system that has to <span className="text-accent">stay up</span>?
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="prose-lead mt-7 max-w-[48ch]">
                {person.availability}. WhatsApp gets the fastest reply — email works too, and I
                answer everything.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${person.email}`}
                  className="btn btn-ghost group"
                >
                  <MailIcon className="h-4 w-4 text-accent" />
                  {person.email}
                </a>
                <a
                  href={person.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost group"
                >
                  <DocumentIcon className="h-4 w-4 text-accent" />
                  Download résumé
                </a>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-3 text-[0.925rem] text-muted">
                  <PhoneIcon className="h-4 w-4 shrink-0 text-accent" />
                  <a
                    href={`tel:${person.phone.replace(/\s/g, '')}`}
                    className="tabular inline-flex min-h-11 cursor-pointer items-center transition-colors hover:text-ink"
                  >
                    {person.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-[0.925rem] text-muted">
                  <PinIcon className="h-4 w-4 shrink-0 text-accent" />
                  {person.location}
                </li>
              </ul>
            </Reveal>
          </div>

          {/* elsewhere */}
          <div className="md:col-span-5">
            <Reveal delay={140}>
              <div className="flex items-center gap-3">
                <p className="eyebrow">Elsewhere</p>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
              </div>
              <ul className="mt-3 overflow-hidden rounded-lg border border-line bg-surface shadow-e1">
                {links.map((l) => (
                  <li key={l.label} className="border-b border-line last:border-b-0">
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="row-hover group flex cursor-pointer items-center justify-between gap-4 px-5 py-4"
                    >
                      <span className="font-display text-[1.1rem] font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-accent">
                        {l.label}
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="hidden font-mono text-[0.75rem] text-faint sm:inline">
                          {l.handle}
                        </span>
                        <ArrowUpRightIcon className="h-4 w-4 text-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* WhatsApp is the primary channel, so it gets its own block rather
            than being one link among many. */}
        <Reveal delay={200}>
          <div className="mt-16 border-t border-line pt-10">
            <div className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-display text-[1.6rem] font-semibold leading-tight tracking-tight text-display">
                Message me on WhatsApp
              </h3>
              <span className="eyebrow">Fastest route to a reply</span>
            </div>
            <WhatsAppContact />
          </div>
        </Reveal>

        <SignalLine className="mt-20 opacity-70" />

        <div className="mt-6 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.75rem] text-faint">
            © {new Date().getFullYear()} {person.name}
          </p>
          <p className="font-mono text-[0.75rem] text-faint">
            Built with Next.js · Set in Instrument Sans &amp; IBM Plex
          </p>
        </div>
      </div>
    </footer>
  );
}
