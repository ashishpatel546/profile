import { links, person } from '@/content/profile';
import DotField from './DotField';
import Reveal from './Reveal';
import SignalLine from './SignalLine';
import WhatsAppContact from './WhatsAppContact';
import { ArrowUpRightIcon, DocumentIcon, MailIcon, PhoneIcon, PinIcon } from './icons';

export default function Contact() {
  return (
    /* The closing band — bookends the hero and gives the footer trace its ground. */
    <footer id="contact" className="band relative overflow-hidden scroll-mt-24 pb-16 pt-24 md:pt-32">
      {/* Low intensity and pushed into the corner: the contact form sits over
          this area, and dots behind form copy hurt readability. */}
      <DotField origin="4% 96%" intensity={0.45} />
      <div className="gutter relative">
        <Reveal>
          <div className="flex items-center gap-4 border-t border-line pt-4">
            <span className="eyebrow tabular text-accent">07</span>
            <span className="eyebrow">Contact</span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Reveal delay={60}>
              <h2 className="display text-[clamp(2.4rem,6vw,4.25rem)]">
                Got a system that has to
                <span className="italic text-accent"> stay up</span>?
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
                  className="group inline-flex cursor-pointer items-center gap-2.5 border border-line-strong px-5 py-3 text-[0.95rem] font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  <MailIcon className="h-4 w-4 text-accent" />
                  {person.email}
                </a>
                <a
                  href={person.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex cursor-pointer items-center gap-2.5 border border-line-strong px-5 py-3 text-[0.95rem] font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
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
              <p className="eyebrow border-t border-line pt-4">Elsewhere</p>
              <ul className="mt-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center justify-between gap-4 border-b border-line py-4 transition-colors duration-200 hover:border-accent"
                    >
                      <span className="font-display text-[1.25rem] font-normal text-ink transition-colors duration-200 group-hover:text-accent">
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
              <h3 className="font-display text-[1.75rem] font-normal leading-tight text-display">
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
            Built with Next.js · Set in Newsreader, Archivo &amp; IBM Plex Mono
          </p>
        </div>
      </div>
    </footer>
  );
}
