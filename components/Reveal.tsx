'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Anima la entrada de los bloques marcados con `.reveal`.
 * Se re-ejecuta en cada cambio de ruta porque el App Router conserva el DOM del layout.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.in)'));
    if (!nodes.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    const raf = requestAnimationFrame(() => nodes.forEach((n) => io.observe(n)));
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
