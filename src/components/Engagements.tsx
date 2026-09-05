import { offerings, whatsapp } from '@/content/profile';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { ArrowUpRightIcon, WhatsAppIcon } from './icons';

export default function Engagements() {
  return (
    <section id="engagements" className="gutter scroll-mt-24 py-24 md:py-32">
      <SectionHeading
        index="04"
        label="Work with me"
        title="Find your situation below."
        lede="Four ways companies bring me in. Each one lists what it is actually for and where I have done it before — so you can judge the fit before you spend a call on it."
      />

      <ol className="grid gap-4 md:grid-cols-2 md:gap-5">
        {offerings.map((o, i) => (
          <Reveal as="li" key={o.title} delay={i * 70}>
            <article className="card card-lift group flex h-full flex-col gap-4 p-7 md:p-8">
              <h3 className="font-display text-[1.45rem] font-semibold leading-tight tracking-tight text-display">
                {o.title}
              </h3>

              {/* The line a reader should recognise themselves in. */}
              <p className="rounded-md border-l-[3px] border-accent bg-accent-soft px-4 py-3 text-[1rem] font-medium leading-snug text-ink">
                {o.outcome}
              </p>

              <p className="text-[0.95rem] leading-relaxed text-muted">{o.body}</p>

              <p className="mt-auto border-t border-line pt-4 text-[0.875rem] leading-relaxed text-faint">
                <span className="eyebrow mr-2 text-warm-ink">Done before</span>
                {o.proof}
              </p>
            </article>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={120}>
        <div className="card mt-5 flex flex-col items-start gap-5 bg-surface2 p-7 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div>
            <p className="font-display text-[1.4rem] font-semibold leading-tight tracking-tight text-display">
              Not sure which one you need?
            </p>
            <p className="mt-2 max-w-[52ch] text-[0.95rem] leading-relaxed text-muted">
              Describe the problem in a sentence and I will tell you honestly whether I am the
              right person for it.
            </p>
          </div>

          <a
            href={whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary group shrink-0"
          >
            <WhatsAppIcon className="h-4.5 w-4.5" />
            Ask on WhatsApp
            <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
