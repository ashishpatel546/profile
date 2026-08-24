# Ashish Kumar — Portfolio

Personal site for Ashish Kumar, solution architect (backend systems & applied AI).
Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4. Static —
no server, no database, no form backend.

Sections in reading order: hero → organisations → approach → selected systems
→ track record → work with me → capabilities → credentials → contact.

---

## Before you publish — please check these

1. **Tirex Chargers and AppMeSoft/Colegios are not in `roles`.** They are
   concurrent, unconfirmed-employer-relationship consulting work, so they
   live in `independentProjects` instead — no start date, no end date, no
   "engagement" language at all. A date range sitting next to an active
   full-time role (VML) reads as an undisclosed second job, which is exactly
   the kind of thing that gets a résumé screened out; a client name with no
   dates in a "Selected systems" case-study list does not. Their content
   (agentic AI NOC + MCP for Tirex, the AI-native school ERP for AppMeSoft)
   still shows on the site — in "Selected systems" — just not on the
   "Experience" employment timeline. If either becomes safe to date (the
   engagement ends, or your employer is fine with it being public), move the
   entry back into `roles` with real `start`/`end` and it'll render exactly
   like any other role. Don't do this from guessed dates — confirm first.
2. **ResMed (Somnoware)** — attached to the GIIT "Healthcare Portal (US client)"
   engagement in `roles`. Correct it if that mapping is wrong.

Also worth a look:

- **The Experience timeline shows duration, never absolute dates.** The four
  roles in `roles` run back-to-back with zero gaps (Tag11 → GIIT → Blink →
  VML), so a month-by-month date rail would let anyone chain start/end dates
  into a gapless employment ledger — which then makes the independent,
  undated work in `independentProjects` look like it must have run
  concurrently with a full-time job, since there'd be no open slot for it.
  `Experience.tsx` renders `duration(role.start, role.end)` (e.g. "1 yr 4
  mos") instead of a date range; `start`/`end` stay on each role only to
  drive sort order and the duration math. Don't reintroduce
  `formatMonth(role.start)`-style ranges here without re-checking this.
- **Two year figures, deliberately separate.** The hero says *16 yrs in
  technology* (from `journeyStart`, graduation 2010). The timeline is labelled
  *roles from 2019 onward* (from `careerStart`). They are never conflated —
  a "16 years" headline over a timeline that starts in 2019 is the first thing
  an interviewer queries, so each is labelled for exactly what it is.
- **Job titles are exactly as on the résumé** (e.g. "Node.js Developer" at
  VML). The *positioning* — `person.positioning` — is "Solution Architect".
  Change either independently.
- **The street address is omitted** from the site but is still in the public
  PDF at `/resume/Ashish-Kumar-Resume.pdf`. Redact it there if you'd rather.
- **The ~100,000-charger figure** (Blink, WebSockets + Kafka) is the headline
  stat. It's stored in `peakScale` — keep it in step with the engagement text.

## Editing content

Everything the site says lives in one file:

```
src/content/profile.ts
```

Headline stats are **derived**, not typed in: years come from dates; the
"Platforms shipped" count is `roles` engagements plus `independentProjects`;
"Organisations" counts `roles` only (actual employers). The featured systems
are the `featured` list, resolved by `resolveFeatured()` from either `roles`
or `independentProjects`; "Work with me" cards are `offerings`.

## Contact: WhatsApp

WhatsApp is the primary channel. The form composes a message and hands it to
`wa.me` — nothing is submitted to a server, which is the point on a static
site. The QR in the contact block encodes the same link.

**If the number changes**, update `whatsapp` in `profile.ts` *and* regenerate
`public/images/whatsapp-qr.svg` — the QR is a static file, not rendered live.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
npm run lint
```

Deploys to Vercel with no config. `next.config.ts` also supports GitHub Pages
via `GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/profile` (static export).

## Design

- **Theme** — dark by default, light on the toggle (remembered per browser).
  Tokens are semantic (`--canvas`, `--ink`, `--accent`…) and swap per theme in
  `src/app/globals.css`. The track-record and contact sections are `band`s:
  always dark, because the copper trace needs a dark ground. The hero is
  deliberately *not* a band, so the toggle gives visible feedback on the first
  screen.
- **Palette** — copper on ink. A mint `--signal` is reserved strictly for
  live/status meaning.
- **Type** — Newsreader (voice), Archivo (interface), IBM Plex Mono (data).
- **The trace** — the signature. A copper signal line runs the career
  timeline, deflecting at each role in proportion to systems delivered there,
  drawing itself on scroll with a glowing head riding the tip. The same pulse
  runs the horizontal wire in the hero and footer.
- **Dot field** — a three-layer halftone that dissolves from a light source.
  Intensity is lowered wherever it passes behind copy.

Accessibility: all text ≥ 4.5:1 in both themes (audited); `prefers-reduced-
motion` renders the trace already drawn; visible focus rings; SVG icons only;
≥ 44px touch targets; no horizontal scroll at 375 / 390 / 768 / 1024 / 1440.

## Assets

```
public/images/ashish-portrait.jpg     duotone hero crop (4:5)
public/images/ashish-desk.jpg         duotone environmental shot
public/images/ashish-desk-color.jpg   natural colour, caption band removed
public/images/ashish-kumar.jpeg       original, untouched
public/images/whatsapp-qr.svg         encodes https://wa.me/919716160389
public/resume/Ashish-Kumar-Resume.pdf
src/app/icon.svg, apple-icon.png      favicon: the signal pulse on an ink tile
```

## Legacy

The previous single-file HTML résumé is preserved at `legacy/index.html`.
