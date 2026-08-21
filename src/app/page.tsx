import Approach from '@/components/Approach';
import Capabilities from '@/components/Capabilities';
import Contact from '@/components/Contact';
import Credentials from '@/components/Credentials';
import Engagements from '@/components/Engagements';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import Nav from '@/components/Nav';
import Organisations from '@/components/Organisations';
import SectionHeading from '@/components/SectionHeading';
import Systems from '@/components/Systems';
import { links, person, roles } from '@/content/profile';

/** Structured data so search and LLM crawlers read the record correctly. */
function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.positioning,
    description: person.standfirst,
    email: `mailto:${person.email}`,
    telephone: person.phone,
    address: { '@type': 'PostalAddress', addressLocality: 'Delhi', addressCountry: 'IN' },
    image: '/images/ashish-portrait.jpg',
    sameAs: links.map((l) => l.href),
    knowsAbout: [
      'Software architecture',
      'Microservices',
      'Node.js',
      'NestJS',
      'TypeScript',
      'Distributed systems',
      'ETL',
      'Generative AI',
      'LangChain',
    ],
    worksFor: {
      '@type': 'Organization',
      name: roles.find((r) => r.end === null)?.company ?? roles[0].company,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />
      <main id="main">
        <Hero />
        <Organisations />
        <Approach />
        <Systems />

        {/* Dark band: the trace needs a dark ground to read against. */}
        <section id="experience" className="band scroll-mt-24 py-24 md:py-32">
          <div className="gutter">
            <SectionHeading
              index="03"
              label="Track record"
              title="The record, told as a signal."
              lede="Roles from 2019 onward. The copper line deflects at each one in proportion to the number of systems delivered there, and the light rides the tip as you scroll. Expand any role to see exactly what the work was."
            />
            <Experience />
          </div>
        </section>

        <Engagements />
        <Capabilities />
        <Credentials />
      </main>
      <Contact />
    </>
  );
}
