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
 *     foto se descubra con máscara y suelte el zoom al entrar.
 *  3. Mueve la foto del hero un poco menos que el scroll (parallax sobrio).
 *
 * Se re-ejecuta en cada cambio de ruta porque el App Router conserva el DOM
 * del layout. Con `prefers-reduced-motion` deja todo visible y quieto.
 */

const IMG_WRAPPERS = '.frame, .card__media';

export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- 1 y 2: marcar lo que se anima ---------------------------------
    document.querySelectorAll<HTMLElement>(IMG_WRAPPERS).forEach((el) => {
      // el hero ya tiene su propia entrada al cargar, no lo tocamos
      if (el.closest('.hero')) return;
      el.classList.add('reveal-img');
    });

    let cleanupReveal: (() => void) | undefined;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal:not(.in), .reveal-img:not(.in)'),
    );

    if (nodes.length) {
      if (reduced || !('IntersectionObserver' in window)) {
        nodes.forEach((n) => n.classList.add('in'));
      } else {
        // hermanos del mismo padre entran uno atrás del otro
        const seen = new Map<Element, number>();
        nodes.forEach((n) => {
          const parent = n.parentElement;
          if (!parent) return;
          const i = seen.get(parent) ?? 0;
          if (i > 0) n.style.setProperty('--i', String(Math.min(i, 5)));
          seen.set(parent, i + 1);
        });

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
        cleanupReveal = () => {
          cancelAnimationFrame(raf);
          io.disconnect();
        };
      }
    }

    // --- 3: parallax del hero -------------------------------------------
    const heroImg = document.querySelector<HTMLElement>('.hero__media img');
    let cleanupParallax: (() => void) | undefined;

    if (heroImg && !reduced && window.matchMedia('(min-width: 901px)').matches) {
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
      cleanupReveal?.();
      cleanupParallax?.();
    };
  }, [pathname]);

  return null;
}
