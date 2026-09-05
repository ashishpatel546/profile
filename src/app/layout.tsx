import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Instrument_Sans, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { person } from '@/content/profile';
import './globals.css';

/* One voice, three registers. Instrument Sans is a mechanical grotesque —
   it reads like an instrument panel label, which is the right note for a page
   about systems that report their own state. Plex Sans carries the body and
   was drawn for a technology company; it pairs by design with Plex Mono, which
   carries anything that is data. No serif: an editorial serif would make this
   a magazine, and it is a technical document. */
const instrument = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument',
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const description =
  'Solution architect specialising in backend systems and applied AI — real-time EV charging networks, enterprise access platforms, and LLM integrations built to survive production.';

/**
 * Absolute URLs for OG/Twitter cards. Set NEXT_PUBLIC_SITE_URL per deploy; the
 * Vercel system env covers production there automatically, and the GitHub Pages
 * URL (base path included — relative metadata resolves from the end of it) is
 * the fallback.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://ashishpatel546.github.io/profile');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${person.name} — ${person.positioning}`,
    template: `%s — ${person.name}`,
  },
  description,
  keywords: [
    'Solution Architect',
    'Backend Architect',
    'Node.js',
    'NestJS',
    'TypeScript',
    'Microservices',
    'Applied AI',
    'LangChain',
    'EV Charging',
    'Ashish Kumar',
  ],
  authors: [{ name: person.name }],
  creator: person.name,
  openGraph: {
    type: 'profile',
    title: `${person.name} — ${person.positioning}`,
    description,
    siteName: `${person.name}`,
    images: [{ url: '/images/ashish-desk-color.jpg', width: 896, height: 1047, alt: person.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${person.name} — ${person.positioning}`,
    description,
    images: ['/images/ashish-desk-color.jpg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f9fb' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1621' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/**
 * Applies the theme before first paint so there is no flash of the wrong
 * palette. Order of authority: the visitor's saved choice, then their OS
 * preference, then light. Light leads because the page is a technical
 * document and reads as one on paper; dark is a real, tuned alternative
 * rather than the house style. Kept tiny and inlined on purpose.
 *
 * It goes through next/script at `beforeInteractive` rather than a bare
 * <script> tag: React never executes a script element it renders, so a raw tag
 * warns in development and is only working here by accident of the root layout
 * being server-rendered. `beforeInteractive` puts it in the initial HTML,
 * ahead of any Next module, which is exactly when a theme has to be decided.
 */
const DEFAULT_THEME = 'light';
const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('ak-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'${DEFAULT_THEME}'}d.setAttribute('data-theme',t)}catch(e){d.setAttribute('data-theme','${DEFAULT_THEME}')}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${instrument.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <head>
        <Script
          id="ak-theme"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="no-print sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
