'use client';

import { useState } from 'react';
import { whatsapp } from '@/content/profile';
import { asset } from '@/lib/asset';
import { ArrowUpRightIcon, WhatsAppIcon } from './icons';

/**
 * There is no backend — this is a static site — so the form composes a
 * WhatsApp message and hands it to WhatsApp to send. That is a feature, not a
 * workaround: the enquiry lands in a thread we can both keep talking in,
 * nothing sits unread in an inbox, and no form data touches a third party.
 *
 * The QR encodes the same wa.me link for anyone reading on a laptop with their
 * phone in hand.
 */
export default function WhatsAppContact() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [brief, setBrief] = useState('');

  const message = [
    `Hi Ashish — I'm ${name.trim() || '[your name]'}`,
    company.trim() ? ` from ${company.trim()}` : '',
    '.\n\n',
    brief.trim() || "I'd like to talk about a project.",
  ].join('');

  const href = `${whatsapp.url}?text=${encodeURIComponent(message)}`;

  const field =
    'w-full border border-line bg-canvas px-4 py-3 text-[0.95rem] text-ink placeholder:text-faint transition-colors duration-200 focus:border-accent focus:outline-none';

  return (
    <div className="grid gap-10 md:grid-cols-12 md:gap-8">
      {/* ---- the form ---- */}
      <form
        className="md:col-span-7"
        onSubmit={(e) => {
          e.preventDefault();
          window.open(href, '_blank', 'noopener,noreferrer');
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="wa-name" className="eyebrow mb-2 block">
              Your name
            </label>
            <input
              id="wa-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Priya Sharma"
              className={field}
            />
          </div>

          <div>
            <label htmlFor="wa-company" className="eyebrow mb-2 block">
              Company <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <input
              id="wa-company"
              name="company"
              type="text"
              autoComplete="organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Northwind Energy"
              className={field}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="wa-brief" className="eyebrow mb-2 block">
            What are you building?
          </label>
          <textarea
            id="wa-brief"
            name="brief"
            rows={4}
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="We run 400 chargers and our backend falls over at peak. We need someone to review the architecture and tell us what to fix first."
            className={`${field} resize-y`}
          />
          <p className="mt-2 text-[0.8rem] text-faint">
            This opens WhatsApp with your message ready to send — nothing is submitted to a server.
          </p>
        </div>

        <button
          type="submit"
          className="group mt-6 inline-flex cursor-pointer items-center gap-2.5 bg-accent px-6 py-3.5 text-[0.95rem] font-medium text-on-accent transition-colors duration-200 hover:bg-accent-strong"
        >
          <WhatsAppIcon className="h-[18px] w-[18px]" />
          Start the conversation
          <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </form>

      {/* ---- the QR ---- */}
      <div className="md:col-span-5">
        <div className="flex h-full flex-col items-start gap-5 border border-line p-6 sm:flex-row sm:items-center md:flex-col md:items-start">
          <div className="shrink-0 bg-[#ece6df] p-3">
            {/* Static SVG, generated at author time — no QR library ships to the browser. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(whatsapp.qrPath)}
              alt={`QR code linking to a WhatsApp chat with Ashish Kumar on ${whatsapp.display}`}
              width={132}
              height={132}
              className="h-[132px] w-[132px]"
            />
          </div>

          <div>
            <p className="eyebrow text-accent">Scan to chat</p>
            <p className="mt-3 text-[0.925rem] leading-relaxed text-muted">
              Point your camera at the code to open WhatsApp on your phone.
            </p>
            <a
              href={whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tabular mt-2 inline-flex min-h-11 cursor-pointer items-center gap-2 font-mono text-[0.85rem] text-ink transition-colors hover:text-accent"
            >
              <WhatsAppIcon className="h-4 w-4 text-accent" />
              {whatsapp.display}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
