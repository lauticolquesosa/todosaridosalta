'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Motor de entrada del sitio, sin tocar el markup de las páginas.
 *
 *  1. Anima los bloques `.reveal` cuando aparecen, escalonando los hermanos.
 *  2. Marca los marcos de foto para que la imagen entre soltando el zoom. Las
 *     tarjetas de obra quedan afuera: ahí el zoom es del hover.
 *
 * Regla de oro: el contenido nunca queda escondido por culpa del movimiento.
 * El estado oculto solo existe mientras `html.js-motion` está puesto, lo que ya
 * está en pantalla se revela al toque, un MutationObserver toma lo que aparece
 * después, y un plazo máximo destapa cualquier cosa que se haya quedado colgada.
 */

const IMG_WRAPPERS = '.frame';
const HIDDEN = '.reveal:not(.in), .reveal-img:not(.in)';
const STAGGER_MS = 70;
const MAX_STAGGER = 5;
const FAILSAFE_MS = 1600;

export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const show = (el: Element) => el.classList.add('in');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !('IntersectionObserver' in window)) {
      root.classList.remove('js-motion');
      document.querySelectorAll(HIDDEN).forEach(show);
      return;
    }

    root.classList.add('js-motion');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          show(e.target);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );

    /**
     * Registra lo que falte animar. Lo que ya está en pantalla, o quedó arriba
     * del scroll, se revela en el acto sin esperar al observer.
     */
    const register = () => {
      // el hero tiene su propia entrada al cargar, no lo tocamos
      document.querySelectorAll<HTMLElement>(IMG_WRAPPERS).forEach((el) => {
        if (!el.closest('.hero')) el.classList.add('reveal-img');
      });

      const nodes = Array.from(document.querySelectorAll<HTMLElement>(HIDDEN));
      if (!nodes.length) return;

      const seen = new Map<Element, number>();
      const vh = window.innerHeight;

      nodes.forEach((n) => {
        const parent = n.parentElement;
        if (parent) {
          const i = seen.get(parent) ?? 0;
          if (i > 0) n.style.setProperty('--reveal-delay', `${Math.min(i, MAX_STAGGER) * STAGGER_MS}ms`);
          seen.set(parent, i + 1);
        }
        if (n.getBoundingClientRect().top < vh * 0.96) show(n);
        else io.observe(n);
      });
    };

    // el observer de mutaciones dispara muchas veces seguidas: un rAF por frame
    let queued = 0;
    const schedule = () => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        register();
      });
    };

    register();

    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });

    // red de seguridad: nada se queda invisible, pase lo que pase
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll(HIDDEN).forEach(show);
    }, FAILSAFE_MS);

    return () => {
      if (queued) cancelAnimationFrame(queued);
      window.clearTimeout(failsafe);
      mo.disconnect();
      io.disconnect();
      document.querySelectorAll(HIDDEN).forEach(show);
    };
  }, [pathname]);

  return null;
}
