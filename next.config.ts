import type { NextConfig } from 'next';

/**
 * Two deploy targets, one codebase.
 *
 * - Vercel and `next dev`: no env vars set, so this is an ordinary Next build
 *   served from the domain root with image optimisation intact.
 * - GitHub Pages: the deploy workflow sets GITHUB_PAGES=true and
 *   NEXT_PUBLIC_BASE_PATH=/profile, which switches on the static export and the
 *   `/profile` sub-path that project Pages sites are served from.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const isStaticExport = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  basePath,
  ...(isStaticExport
    ? {
        output: 'export',
        // Pages serves files off a CDN — there is no image optimiser in front.
        images: { unoptimized: true },
        // Emit `route/index.html` so URLs resolve without a server rewriting them.
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
