/**
 * Prefixes a path in `public/` with the deployment's base path.
 *
 * Next rewrites `next/link` hrefs and the optimised `next/image` loader URL for
 * you, but not plain `<a href>` targets — and not `next/image` src values when
 * `images.unoptimized` is on, which is exactly the GitHub Pages configuration.
 * Anything pointing at `public/` therefore goes through here.
 *
 * Resolves to '' on Vercel and in dev, '/profile' on GitHub Pages. The value is
 * inlined at build time, so it is identical on the server and the client and
 * cannot cause a hydration mismatch.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
