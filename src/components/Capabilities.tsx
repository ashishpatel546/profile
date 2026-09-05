import { capabilities } from '@/content/profile';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Capabilities() {
  return (
    <section id="capabilities" className="gutter scroll-mt-24 py-24 md:py-32">
      <SectionHeading
        index="05"
        label="Capabilities"
        title="The toolkit, in order of how much it matters."
        lede="Architecture decisions come first because they are the expensive ones to get wrong. Everything under them is implementation detail I am fluent in."
      />

      {/* Spec sheet, not a tag cloud: the group name is the key, the row is
          the value. Rows stay a single divided list — they are one ordered
          ranking, and cutting them into cards would break that reading. */}
      <dl className="card divide-y divide-line overflow-hidden">
        {capabilities.map((group, i) => (
          <Reveal key={group.group} delay={i * 40}>
            <div className="row-hover group relative grid gap-3 px-6 py-6 md:grid-cols-12 md:gap-8 md:px-8 md:py-7">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
              />
              <dt className="flex items-center gap-3 md:col-span-3">
                <span className="tabular inline-flex h-6 min-w-6 items-center justify-center rounded bg-accent-soft px-1 font-mono text-[0.68rem] font-medium text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[1.15rem] font-semibold tracking-tight text-ink">
                  {group.group}
                </span>
              </dt>
              <dd className="md:col-span-9">
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="chip group-hover:border-line-strong">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
