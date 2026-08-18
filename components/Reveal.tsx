'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Motor de movimiento del sitio. Hace tres cosas, todas sin tocar el markup
 * de las páginas:
 *
 *  1. Anima la entrada de los bloques `.reveal` cuando aparecen en pantalla,
 *     escalonando los que son hermanos para que no entren todos de golpe.
 *  2. Marca los contenedores de imagen (`.frame`, `.card__media`) para que la
 *     foto entre soltando el zoom.
 *  3. Mueve la foto del hero un poco menos que el scroll (parallax sobrio).
 *
 * Regla de oro: el contenido nunca queda escondido por culpa del movimiento.
 * El estado oculto solo existe mientras `html.js-motion` está puesto, se
 * revela al toque todo lo que ya está en pantalla, un MutationObserver toma
 * lo que aparece después (los filtros de obras, por ejemplo) y un plazo
 * máximo destapa cualquier cosa que se haya quedado colgada.
 */

const IMG_WRAPPERS = '.frame, .card__media';
const HIDDEN = '.reveal:not(.in), .reveal-img:not(.in)';
const FAILSAFE_MS = 1600;

export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const show = (el: Element) => el.classList.add('in');

    if (reduced || !('IntersectionObserver' in window)) {
      root.classList.remove('js-motion');
      document.querySelectorAll(HIDDEN).forEach(show);
      return;
    }

    root.classList.add('js-motion');

    /** Marca los contenedores de imagen que todavía no pasaron por acá. */
    const tagImages = () => {
      document.querySelectorAll<HTMLElement>(IMG_WRAPPERS).forEach((el) => {
        // el hero tiene su propia entrada al cargar, no lo tocamos
        if (el.classList.contains('reveal-img') || el.closest('.hero')) return;
        el.classList.add('reveal-img');
      });
    };

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
     * Registra lo que falte animar. Lo que ya está en pantalla (o quedó
     * arriba del scroll) se revela en el acto, sin esperar al observer.
     */
    const register = () => {
      tagImages();
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(HIDDEN));
      if (!nodes.length) return;

      // hermanos del mismo padre entran uno atrás del otro
      const seen = new Map<Element, number>();
      const vh = window.innerHeight;

      nodes.forEach((n) => {
        const parent = n.parentElement;
        if (parent) {
          const i = seen.get(parent) ?? 0;
          if (i > 0) n.style.setProperty('--i', String(Math.min(i, 5)));
          seen.set(parent, i + 1);
        }

        const r = n.getBoundingClientRect();
        if (r.top < vh * 0.96) show(n);
        else io.observe(n);
      });
    };

    // el observer de mutaciones puede disparar muchas veces seguidas:
    // agrupamos todo en un solo rAF por frame
    let queued = 0;
    const schedule = () => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        register();
      });
    };

    register();
    schedule();

    // lo que se renderice después (filtros, listas) también entra animado
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });

    // red de seguridad: nada se queda invisible, pase lo que pase
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll(HIDDEN).forEach(show);
    }, FAILSAFE_MS);

    // --- parallax del hero ----------------------------------------------
    const heroImg = document.querySelector<HTMLElement>('.hero__media img');
    let cleanupParallax: (() => void) | undefined;

    if (heroImg && window.matchMedia('(min-width: 901px)').matches) {
      let ticking = false;
      const apply = () => {
        // como mucho 40px de recorrido: se nota, no marea
        const y = Math.min(window.scrollY * 0.12, 40);
        heroImg.style.setProperty('--py', `${y.toFixed(1)}px`);
        ticking = false;
      };
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(apply);
      };
      apply();
      window.addEventListener('scroll', onScroll, { passive: true });
      cleanupParallax = () => {
        window.removeEventListener('scroll', onScroll);
        heroImg.style.removeProperty('--py');
      };
    }

    return () => {
      if (queued) cancelAnimationFrame(queued);
      window.clearTimeout(failsafe);
      mo.disconnect();
      io.disconnect();
      cleanupParallax?.();
      // si el motor se va, lo que quedaba oculto se muestra
      document.querySelectorAll(HIDDEN).forEach(show);
    };
  }, [pathname]);

  return null;
}
