const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** "2024-08" -> "Aug 2024". A null end date reads as "Present". */
export function formatMonth(iso: string | null): string {
  if (!iso) return 'Present';
  const [y, m] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** "2024-08" -> "2024". Used for the compact timeline rail. */
export function year(iso: string | null): string {
  return iso ? iso.split('-')[0] : 'Now';
}

/** Human duration between two ISO year-months, e.g. "1 yr 4 mos". */
export function duration(start: string, end: string | null, now = new Date()): string {
  const [sy, sm] = start.split('-').map(Number);
  const [ey, em] = end
    ? end.split('-').map(Number)
    : [now.getFullYear(), now.getMonth() + 1];

  const total = Math.max(0, (ey - sy) * 12 + (em - sm)) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;

  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ') || '1 mo';
}

/** Zero-padded index for the section rail: 1 -> "01". */
export function ordinal(n: number): string {
  return String(n).padStart(2, '0');
}
