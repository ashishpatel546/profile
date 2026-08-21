import type { Metadata, Viewport } from 'next';
import { Newsreader, Archivo, IBM_Plex_Mono } from 'next/font/google';
import { person } from '@/content/profile';
import './globals.css';

/* Three families, three jobs: Newsreader carries the voice, Archivo carries
   the interface, Plex Mono carries anything that is data. */
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-archivo',
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
    images: [{ url: '/images/ashish-portrait.jpg', width: 1040, height: 1300, alt: person.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${person.name} — ${person.positioning}`,
    description,
    images: ['/images/ashish-portrait.jpg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f3ed' },
    { media: '(prefers-color-scheme: dark)', color: '#101317' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/**
 * Applies the saved theme before first paint so there is no flash of the wrong
 * palette. Defaults to dark; switch DEFAULT_THEME to 'light' for the paper
 * ground. Kept tiny and inlined on purpose.
 */
const DEFAULT_THEME = 'dark';
const themeScript = `(function(){try{var t=localStorage.getItem('ak-theme');document.documentElement.setAttribute('data-theme',t==='light'||t==='dark'?t:'${DEFAULT_THEME}')}catch(e){document.documentElement.setAttribute('data-theme','${DEFAULT_THEME}')}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${newsreader.variable} ${archivo.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="no-print sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
