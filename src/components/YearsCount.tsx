'use client';

import { useSyncExternalStore } from 'react';
import { yearsSince } from '@/content/profile';

/** Never changes after mount — the figure only moves once a month. */
const subscribe = () => () => {};

/**
 * Years derived from a start date rather than typed in, so the number stays
 * right without anyone remembering to update it.
 *
 * The server value comes from build time and the client value from now, which
 * is exactly the case `useSyncExternalStore` exists for: it renders the server
 * snapshot during hydration and swaps to the live one without a mismatch.
 */
export default function YearsCount({
  from,
  initial,
  decimals = 1,
}: {
  /** ISO year-month to count from. */
  from: string;
  /** Server-rendered value, so there is no layout shift on hydration. */
  initial: number;
  decimals?: number;
}) {
  const years = useSyncExternalStore(
    subscribe,
    () => yearsSince(from),
    () => initial,
  );

  return <>{years.toFixed(decimals)}</>;
}
