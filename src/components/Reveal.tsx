'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  /** Stagger within a group, in ms. Kept small — 30–50ms reads as one gesture. */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
};

/**
 * Scroll reveal. Deliberately one effect — a short rise and fade — reused
 * everywhere, so the whole page shares a single motion signature.
 * Anything already in view on load reveals immediately.
 */
export default function Reveal({ children, delay = 0, className = '', as = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No reduced-motion branch needed: the global rule in globals.css zeroes
    // transition-duration, so those users get the same reveal instantly.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(18px)',
        transition: `opacity 700ms var(--ease-out-expo) ${delay}ms, transform 700ms var(--ease-out-expo) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
