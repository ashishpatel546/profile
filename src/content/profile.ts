/**
 * Single source of truth for every word and number on the site.
 *
 * No entry currently needs review. If you add a role before its dates are
 * confirmed, mark it `needsReview: true` — it was written from context
 * rather than the résumé PDF. Confirm the dates, title and scope, then
 * delete the flag. Nothing else on the site invents facts: the headline
 * stats are computed from the arrays below, so they stay true as you edit
 * them.
 */

import { asset } from '@/lib/asset';

export type Engagement = {
  name: string;
  summary: string;
  highlights: string[];
  stack: string[];
  /** Public product this shipped as, when there is one to link to. */
  link?: { label: string; href: string };
};

export type Role = {
  id: string;
  company: string;
  legalName?: string;
  title: string;
  location: string;
  start: string; // ISO yyyy-mm — also controls timeline order
  end: string | null; // null = ongoing
  /**
   * Set this when real dates aren't confirmed yet: it replaces the computed
   * date range and duration entirely, so the site never shows a made-up period.
   * Delete it once `start` and `end` are known to be correct.
   */
  periodLabel?: string;
  /** One line on what this role was really about. */
  premise: string;
  engagements: Engagement[];
  needsReview?: boolean;
};

export const person = {
  name: 'Ashish Kumar',
  /** Positioning, not a job title. Individual role titles stay as-per-résumé below. */
  positioning: 'Solution Architect',
  discipline: 'Backend Systems & Applied AI',
  headline: 'Systems that hold when everything is talking at once.',
  standfirst:
    'I design the backend a business runs on — real-time EV charging networks at 100,000-charger scale, enterprise access platforms, and AI that is safe to leave running unattended. Sixteen years in technology have taught the same lesson every time: architecture is what you are left with once the demo is over.',
  location: 'Delhi, India',
  /** Street address deliberately omitted — it is on the résumé PDF, not the public site. */
  email: 'ashi.patel546@gmail.com',
  phone: '+91 97161 60389',
  /**
   * Two different, honest numbers — never conflate them.
   * `journeyStart` is graduation (2010): the whole time in technology.
   * `careerStart` is the first role listed in `roles` below (2019).
   * The site labels each one for what it is, because a "16 years" headline over
   * a timeline that begins in 2019 is the first thing an interviewer queries.
   */
  journeyStart: '2010-06',
  careerStart: '2019-06',
  /** Plain `<a href>` targets need the base path applied by hand — see `asset`. */
  resumePath: asset('/resume/Ashish-Kumar-Resume.pdf'),
  availability: 'Open to architecture and technical leadership conversations',
};

/**
 * WhatsApp is the fastest route to a reply, so the contact section leads with
 * it. The QR encodes exactly `url`; regenerate it if the number ever changes.
 */
export const whatsapp = {
  /** Digits only, country code first — the wa.me path format. */
  number: '919716160389',
  display: '+91 97161 60389',
  url: 'https://wa.me/919716160389',
  qrPath: '/images/whatsapp-qr.svg',
};

/**
 * What a company is actually buying. Written as outcomes rather than
 * activities — the point is that a reader can identify their own situation in
 * one of these and know I have done it before.
 */
export const offerings = [
  {
    title: 'Architecture review & rescue',
    outcome: 'You have something in production that works but will not survive the next 10×.',
    body: 'I audit the system end to end — data model, service boundaries, failure modes, cost — and hand back a prioritised plan you can execute, plus the reasoning behind each call so your team can defend it.',
    proof: 'Migrated a legacy PHP estate to Node.js with zero clinician downtime; decoupled an enterprise platform from a third-party service with zero functional regression.',
  },
  {
    title: 'Greenfield platform build',
    outcome: 'You need a backend built properly the first time, not refactored in year two.',
    body: 'Clean architecture, typed contracts, real service boundaries and CI from the first commit. I lead the build and stay accountable for the parts that are expensive to change later.',
    proof: 'Built the real-time backbone for ~100,000 connected chargers on WebSockets and Kafka; an enterprise access portal and a school ERP from an empty repository.',
  },
  {
    title: 'Agentic AI & MCP integration',
    outcome: 'You want AI in the product without it becoming a liability.',
    body: 'Agents, MCP tool surfaces and chatbots grounded in your own data — with prompt constraints, I/O validation, access control, rate limiting and audit logging designed in, so it passes review instead of failing it.',
    proof: 'An agent running NOC monitoring 24×7×365 on MCP tool surfaces; AI chatbots inside an AI-native school ERP; a multilingual MCP-grounded query agent inside a WPP enterprise platform.',
  },
  {
    title: 'Fractional architect',
    outcome: 'You have engineers but no one owning the shape of the system.',
    body: 'I work alongside your team — reviewing designs, mentoring, running client and stakeholder calls, and making the architectural decisions stick.',
    proof: 'Technical lead across four concurrent platforms and three continents.',
  },
];

export const links = [
  { label: 'LinkedIn', handle: 'ashishpatel546', href: 'https://www.linkedin.com/in/ashishpatel546' },
  { label: 'GitHub', handle: 'ashishpatel546', href: 'https://github.com/ashishpatel546' },
  { label: 'Medium', handle: '@ashi.patel546', href: 'https://medium.com/@ashi.patel546' },
  { label: 'HackerRank', handle: 'ashi_patel546', href: 'https://www.hackerrank.com/profile/ashi_patel546' },
  { label: 'Dev.to', handle: 'ashishpatel546', href: 'https://dev.to/ashishpatel546' },
];

/**
 * The three things worth reading if you only read one screen.
 * Each claim maps to a specific engagement below — no unverifiable metrics.
 */
export const thesis = [
  {
    label: 'Real-time at the edge of the physical world',
    body: 'EV chargers are unreliable, distributed, stateful hardware that must never silently drop off the network. I built the WebSocket infrastructure holding roughly 100,000 of them online at once — with Kafka behind it — plus the reconnect semantics and command pipelines that keep them under remote control.',
  },
  {
    label: 'Data that survives the trip',
    body: 'Moving operational data out of PostgreSQL, MongoDB and DynamoDB into Redshift without losing fidelity is an architecture problem, not a scripting problem. I design the ETL, the scheduling, the validation and the reporting surface on top.',
  },
  {
    label: 'Agents that can be left running',
    body: 'Generative features fail in production for governance reasons, not model reasons. I ship LLM and agentic systems — including an agent doing NOC monitoring 24×7×365 — with prompt constraints, I/O validation, access control, rate limiting and audit logging wired in from the first commit.',
  },
];

export const roles: Role[] = [
  {
    id: 'vml',
    company: 'VML Enterprise Solutions',
    legalName: 'WPP Group — formerly Wunderman Thompson Commerce Pvt. Ltd.',
    title: 'Node.js Developer',
    location: 'Noida, India',
    start: '2025-12',
    end: null,
    premise:
      'Building a greenfield access-management platform for a global marketing group, and untangling it from the third-party service it inherited.',
    engagements: [
      {
        name: 'Enterprise Multi-Application Access Management Platform',
        summary:
          'A single portal through which employees reach every internal application they are entitled to, with a multilingual agentic AI assistant — grounded via MCP servers — that answers questions about the platform in natural language. Replaces a legacy third-party dependency without changing a thing users can see.',
        highlights: [
          'Led design and development of the backend from an empty repository, using NestJS and TypeScript under a clean-architecture boundary.',
          'Architected a new system version that decouples core business logic from the legacy third-party service while preserving existing behaviour, so migration lands with zero functional regression.',
          'Implemented Azure Active Directory OAuth 2.0 authentication with secure token validation and enterprise-compliant authorization flows.',
          'Designed an RBAC framework mapping Azure AD roles onto internal users, permissions and multiple applications inside one unified portal.',
          'Modelled and optimised the PostgreSQL schema for users, roles, applications, permissions and audit data.',
          'Architected and built a multilingual agentic AI assistant that resolves user questions about the platform in natural language, grounded in live system data rather than static docs.',
          "Designed and built MCP (Model Context Protocol) servers exposing the platform's data and actions as a governed tool surface, giving the agent scoped, auditable access to the system instead of open-ended API calls.",
          'Wired enterprise AI governance into the agent from the first commit: prompt constraints, input/output validation, access control, rate limiting and audit logging.',
          'Leading the platform’s infrastructure migration from AWS to GCP.',
        ],
        stack: ['NestJS', 'TypeScript', 'Agentic AI', 'MCP', 'Azure AD OAuth 2.0', 'RBAC', 'PostgreSQL', 'OpenAI', 'GCP', 'AWS', 'REST'],
      },
    ],
  },
  {
    id: 'blink',
    company: 'Blink Charging',
    legalName: 'Blink Charging Software Pvt. Ltd.',
    title: 'Senior Software Engineer',
    location: 'Noida, India',
    start: '2024-08',
    end: '2025-11',
    premise:
      'Owning the architecture of a full EV charging platform — the chargers, the data behind them, and the AI in front of customers.',
    engagements: [
      {
        name: 'Real-Time Charger Network — ~100,000 Connected Chargers',
        summary:
          'The WebSocket backbone a national charging network runs on: roughly 100,000 chargers holding live connections at once, with Kafka carrying the event stream behind them, plus the CRM and analytics services around it.',
        highlights: [
          'Designed and built the WebSocket infrastructure connecting approximately 100,000 chargers in real time, on Socket.io and ws, for live telemetry and remote command execution.',
          'Used Kafka as the event backbone so charger events fan out to consumers without coupling the socket layer to downstream services.',
          'Engineered connection handling for hardware that drops, reconnects and misbehaves — session state, reconnect semantics and command delivery under unreliable links.',
          'Led architecture and development across the platform, splitting it into modular services for CRM, live charger control and analytics.',
          'Oversaw deployment on Docker and Docker Compose, then initiated the migration to Kubernetes for horizontal scale.',
        ],
        stack: ['Node.js', 'NestJS', 'TypeScript', 'Socket.io', 'WebSockets', 'Kafka', 'Docker', 'Kubernetes'],
      },
      {
        name: 'ETL Pipelines & Reporting',
        summary:
          'The data path from operational stores into a warehouse, plus the reporting surface the business actually uses.',
        highlights: [
          'Designed high-performance ETL across PostgreSQL, MongoDB and DynamoDB, landing into Amazon Redshift with automated reporting to S3.',
          'Built dynamic PDF and CSV reporting with advanced filtering for on-demand business queries.',
          'Automated monthly host and user statement generation on scheduled jobs, with S3 delivery.',
        ],
        stack: ['Amazon Redshift', 'PostgreSQL', 'MongoDB', 'DynamoDB', 'AWS S3', 'Node.js', 'Python'],
      },
      {
        name: 'Generative & Agentic AI Chatbot',
        summary:
          'Customer-facing support automation built on LLM orchestration rather than a scripted decision tree.',
        highlights: [
          'Led and shipped generative and agentic chatbot systems using LangChain, CrewAI and FastAPI.',
          'Automated first-line support flows, reducing the manual load on the customer experience team.',
        ],
        stack: ['LangChain', 'CrewAI', 'FastAPI', 'Python', 'OpenAI'],
      },
      {
        name: 'URL Shortening Service',
        summary: 'An internal link service with caching and click analytics.',
        highlights: [
          'Implemented a custom shortener with Redis caching, click tracking and a documented REST surface.',
        ],
        stack: ['Node.js', 'Redis', 'REST'],
      },
    ],
  },
  {
    id: 'giit',
    company: 'GIIT Solutions',
    title: 'Technical Lead · Senior Software Developer',
    location: 'Gurugram, India',
    start: '2021-11',
    end: '2024-07',
    premise:
      'Four platforms across three continents, and the point where the work turned from writing services to designing them.',
    engagements: [
      {
        name: 'EV Charging Station Platform',
        summary:
          'End-to-end backend for user and host portals, billing, reporting and data movement.',
        highlights: [
          'Engineered and managed the complete backend on a microservices architecture covering user/host portals, billing, reporting and ETL.',
          'Replaced Power BI with heavily customised Reveal BI dashboards for advanced visualisation.',
          'Automated monthly host and user statements, invoice upload to S3, and Redshift-backed analytics on scheduled jobs.',
          'Led the DevOps effort with Dockerised environments and Kubernetes readiness.',
        ],
        stack: ['Node.js', 'NestJS', 'PostgreSQL', 'Reveal BI', 'Amazon Redshift', 'AWS S3', 'Docker', 'Kubernetes'],
      },
      {
        name: 'Somnoware (now ResMed) — Healthcare Portal',
        summary:
          'Sleep and respiratory care platform for a United States client — since acquired by ResMed. A legacy PHP estate moved onto Node.js without interrupting clinicians.',
        highlights: [
          'Migrated legacy PHP services to Node.js on LoopBack 4, with secure API integrations for doctors and patients.',
          'Integrated diagnostic device APIs and built questionnaire-driven recommendation logic.',
          'Created dynamic PDF generators on EJS and Handlebars for clinical documents.',
        ],
        stack: ['Node.js', 'LoopBack 4', 'PostgreSQL', 'EJS', 'Handlebars', 'REST'],
      },
      {
        name: 'College Admission Portal',
        summary: 'Registration, authentication and appointment scheduling for a student intake pipeline.',
        highlights: [
          'Delivered the API suite for registration, authentication and appointment scheduling.',
          'Upgraded legacy Express.js services to NestJS on MSSQL.',
          'Partnered with frontend teams on the Next.js admin and parent portals.',
        ],
        stack: ['NestJS', 'Express.js', 'MSSQL', 'Next.js'],
      },
      {
        name: 'DevOps Plugin Platform',
        summary: 'Cloud-native plugins for an Israeli client, dropping into existing CI/CD pipelines.',
        highlights: [
          'Built SDK-based plugins for AWS, GCP and Azure that integrate directly with CI/CD pipelines.',
          'Designed the Node.js and Express backend, and coordinated the Vue.js frontend integration.',
        ],
        stack: ['Node.js', 'Express.js', 'AWS SDK', 'GCP', 'Azure', 'Vue.js'],
      },
    ],
  },
  {
    id: 'tag11',
    company: 'Tag11 Infotech',
    legalName: 'Tag11 Infotech Pvt. Ltd.',
    title: 'Software Developer',
    location: 'Jaipur, India',
    start: '2019-06',
    end: '2021-11',
    premise: 'Commerce, capital markets and core banking — learning what happens when money is on the line.',
    engagements: [
      {
        name: 'Online Beer Store',
        summary: 'E-commerce backend for a Canadian retailer.',
        highlights: [
          'Designed and implemented a scalable commerce backend on Express.js and NestJS.',
          'Implemented store locator, session-based JWT authentication and real-time inventory syncing.',
        ],
        stack: ['Express.js', 'NestJS', 'PostgreSQL', 'JWT'],
      },
      {
        name: 'Wealth Bazaar',
        summary: 'A mutual fund transaction platform wired into SEBI-verified APIs.',
        highlights: [
          'Built the transaction platform against SEBI-verified APIs.',
          'Designed the complete user journey from onboarding through transactions, reporting and history logs.',
        ],
        stack: ['Node.js', 'Express.js', 'MySQL', 'REST'],
      },
      {
        name: 'Banking Software',
        summary: 'Core banking features — accounts and transactions.',
        highlights: [
          'Delivered accounts and transactions on Express.js and PostgreSQL.',
          'Built a clean, responsive interface with Bootstrap and vanilla JavaScript.',
        ],
        stack: ['Express.js', 'PostgreSQL', 'Bootstrap', 'JavaScript'],
      },
    ],
  },
];

/**
 * Fractional/consulting builds, deliberately kept separate from `roles`.
 *
 * These run concurrently with a full-time role, so they never carry a start
 * date, an end date or "engagement" language, on this object or anywhere it's
 * rendered — anything date-shaped next to an active employer reads as an
 * undisclosed second job and is exactly the kind of thing that gets a résumé
 * screened out. Because these stay undated everywhere, `roles` is free to
 * show real employment dates without recreating that risk: there's nothing
 * left on the site to cross-reference them against. The work is real and
 * worth showing; it just belongs in "Selected systems" as case studies
 * tagged "Independent build", not in the "Experience" timeline as employment
 * history. See `resolveFeatured` below.
 */
export type IndependentProject = Engagement & { client: string };

export const independentProjects: IndependentProject[] = [
  {
    client: 'Tirex Chargers',
    name: 'Agentic AI NOC — Autonomous Charger Monitoring',
    summary:
      'An agent that runs network operations 24/7/365, reading charger behaviour continuously and opening predictive-maintenance tickets before a fault becomes an outage.',
    highlights: [
      'Designed the full agentic AI architecture for autonomous monitoring of charger behaviour across the network.',
      'Built agents that perform NOC monitoring 24×7×365, replacing a rota that previously needed human eyes on a dashboard overnight.',
      'Built MCP (Model Context Protocol) servers exposing charger telemetry and operational actions as a governed tool surface, so agents act on live data through defined tools rather than ad-hoc integrations.',
      'Modelled charger behaviour so the agent detects degradation patterns rather than waiting for a hard failure signal.',
      'Automated predictive-maintenance ticket generation, so field teams are dispatched on evidence instead of on customer complaints.',
      'Defined the service boundaries between charge point communication, behavioural analysis and ticketing so each can evolve independently.',
    ],
    stack: ['Agentic AI', 'MCP', 'LLM orchestration', 'OCPP', 'NestJS', 'TypeScript', 'WebSockets', 'PostgreSQL'],
  },
  {
    client: 'AppMeSoft',
    name: 'Colegios — AI-Native School ERP',
    summary:
      'The operational platform a school actually runs on — admissions, academics, staff, parents and finance — with AI and agent tooling designed into the workflow instead of parked in a side panel.',
    link: { label: 'colegios.in', href: 'https://www.colegios.in' },
    highlights: [
      'Architected a modern school ERP covering the full operational surface of an institution, built AI-first rather than retrofitted.',
      'Shipped AI chatbots for staff, parents and students, grounded in the institution’s own data with role-aware access.',
      'Designed the multi-tenant data model so each school is isolated while the platform stays a single deployable product.',
      'Applied the same AI governance posture as the enterprise work: scoped tools, validated input and output, access control and audit trails.',
    ],
    stack: ['NestJS', 'TypeScript', 'LLM orchestration', 'AI agents', 'PostgreSQL', 'Next.js', 'Multi-tenancy'],
  },
];

/** Grouped as a spec sheet, ordered by how central each group is to the work. */
export const capabilities = [
  {
    group: 'Architecture',
    items: [
      'Microservices',
      'Clean architecture',
      'Distributed systems',
      'Event-driven design',
      'Serverless',
      'System design',
      'Platform migration',
      'Vendor decoupling',
    ],
  },
  {
    group: 'Runtime & Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Node.js', 'NestJS', 'Express.js', 'FastAPI', 'Django', 'LoopBack 4'],
  },
  {
    group: 'Real-time & Messaging',
    items: ['WebSockets', 'Socket.io', 'Server-Sent Events', 'Apache Kafka', 'Redis', 'Throttling & backpressure'],
  },
  {
    group: 'Data',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'MSSQL', 'DynamoDB', 'DocumentDB', 'Amazon Redshift', 'ETL design', 'Query optimisation'],
  },
  {
    group: 'Applied AI',
    items: [
      'Agentic architecture',
      'MCP (Model Context Protocol)',
      'LangChain',
      'CrewAI',
      'OpenAI APIs',
      'LLM orchestration',
      'RAG & grounding',
      'AI chatbots',
      'Prompt engineering',
      'AI governance & audit',
      'Gradio',
    ],
  },
  {
    group: 'Identity & Security',
    items: ['OAuth 2.0', 'OpenID Connect', 'Azure Active Directory', 'RBAC', 'JWT', 'Rate limiting', 'Audit logging'],
  },
  {
    group: 'Cloud & Delivery',
    items: ['AWS (EC2, S3, Redshift, DynamoDB)', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Jira'],
  },
  {
    group: 'Interface',
    items: ['React', 'Next.js', 'Vue.js', 'Reveal BI', 'Power BI'],
  },
];

export const leadership = [
  'Leading client calls and sprint reviews',
  'Mentoring engineers and reviewing architecture',
  'Cross-functional collaboration with solution architects and stakeholders',
  'Technical planning and migration strategy',
];

export const education = [
  {
    qualification: 'B.E. — Computer Science',
    institution: 'Institution of Electronics and Telecommunication Engineers',
    location: 'New Delhi',
    period: '2006 — 2010',
  },
  {
    qualification: 'CBSE — Class XII & X',
    institution: 'Central Board of Secondary Education',
    location: 'Delhi',
    period: '',
  },
];

export const certifications = [
  { name: 'Generative AI Foundation Program', issuer: 'upGrad × Microsoft', id: 'LVM6yuUQAKSa8AWY' },
  { name: 'Advanced Node.js', issuer: 'Cutshort', id: '60850' },
  { name: 'Advanced JavaScript', issuer: 'Cutshort', id: '51737' },
  { name: 'Python', issuer: 'Cutshort', id: '49866' },
  { name: 'HTML / CSS', issuer: 'Cutshort', id: '50040' },
];

export const recognition = [
  { title: 'Lifetime Associate Member', body: 'Institution of Electronics and Telecommunication Engineers (IETE)' },
  { title: '3-Star Rating', body: 'HackerRank problem solving' },
  { title: 'Technical Writer', body: 'Contributor on Dev.to, Medium and LinkedIn Articles' },
];

export const languages = ['English', 'Hindi'];

/**
 * The five systems worth leading with, chosen to show range rather than
 * volume: applied AI, an AI-native product, hardware in real time, enterprise
 * identity, and data. Pulls from both `roles` (employment) and
 * `independentProjects` (fractional work) but resolves to one flat shape, so
 * "Selected systems" reads as case studies regardless of source — never as an
 * employer-plus-dates.
 */
export const featured: (
  | { source: 'role'; roleId: string; engagement: string; angle: string }
  | { source: 'independent'; project: string; angle: string }
)[] = [
  { source: 'independent', project: 'Agentic AI NOC — Autonomous Charger Monitoring', angle: 'Autonomous ops' },
  { source: 'independent', project: 'Colegios — AI-Native School ERP', angle: 'AI-native product' },
  {
    source: 'role',
    roleId: 'blink',
    engagement: 'Real-Time Charger Network — ~100,000 Connected Chargers',
    angle: 'Real time at scale',
  },
  { source: 'role', roleId: 'vml', engagement: 'Enterprise Multi-Application Access Management Platform', angle: 'Identity' },
  { source: 'role', roleId: 'blink', engagement: 'ETL Pipelines & Reporting', angle: 'Data' },
];

export type FeaturedItem = {
  company: string;
  /**
   * "Independent build" for fractional work, absent for role-sourced items.
   * Deliberately not a date, not even an approximate one — "Selected
   * systems" is a case-study list, not a timeline, and it must stay that way
   * for every entry, not just the independent ones, or the omission on the
   * independent cards would itself stand out as a placeholder-shaped gap.
   */
  tag?: string;
  engagement: Engagement;
  angle: string;
};

export function resolveFeatured(): FeaturedItem[] {
  return featured.flatMap((f): FeaturedItem[] => {
    if (f.source === 'independent') {
      const project = independentProjects.find((p) => p.name === f.project);
      if (!project) return [];
      return [{ company: project.client, tag: 'Independent build', engagement: project, angle: f.angle }];
    }
    const role = roles.find((r) => r.id === f.roleId);
    const item = role?.engagements.find((e) => e.name === f.engagement);
    if (!role || !item) return [];
    return [{ company: role.company, engagement: item, angle: f.angle }];
  });
}

/* ---------------------------------------------------------------- derived */

/** Whole years elapsed since an ISO year-month. Recomputed on every render. */
export function yearsSince(iso: string, now = new Date()): number {
  const [y, m] = iso.split('-').map(Number);
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
  return Math.floor((months / 12) * 10) / 10;
}

/** Time at the companies listed in `roles`. */
export function yearsOfExperience(now = new Date()): number {
  return yearsSince(person.careerStart, now);
}

/** Whole time in technology, from graduation. */
export function yearsInTechnology(now = new Date()): number {
  return yearsSince(person.journeyStart, now);
}

export const platformCount =
  roles.reduce((n, r) => n + r.engagements.length, 0) + independentProjects.length;
export const organisationCount = roles.length;

/** Client geographies evidenced by the engagements above. */
export const marketsServed = ['India', 'United States', 'Canada', 'Israel'];

/**
 * The single most persuasive number on the page, so it gets a stat slot of its
 * own. Sourced from the Blink real-time charger network engagement.
 */
export const peakScale = {
  value: '100K',
  label: 'Chargers in real time',
};

export const currentRole = roles.find((r) => r.end === null && !r.needsReview) ?? roles[0];
