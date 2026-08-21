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

      {/* Spec sheet, not a tag cloud: the group name is the key, the row is the value. */}
      <dl className="-mx-5 border-t border-line md:-mx-6">
        {capabilities.map((group, i) => (
          <Reveal key={group.group} delay={i * 40}>
            <div className="group relative grid gap-3 border-b border-line px-5 py-6 transition-colors duration-300 hover:bg-surface md:grid-cols-12 md:gap-8 md:px-6 md:py-7">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100"
              />
              <dt className="md:col-span-3">
                <span className="tabular font-mono text-[0.75rem] text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="ml-3 font-display text-[1.25rem] font-normal text-ink">
                  {group.group}
                </span>
              </dt>
              <dd className="md:col-span-9">
                <ul className="flex flex-wrap gap-x-1.5 gap-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border border-line px-2.5 py-1 font-mono text-[0.75rem] text-dim transition-colors duration-300 group-hover:border-line-strong"
                    >
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
