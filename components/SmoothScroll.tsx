'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

/**
 * Scroll suavizado. Le pone inercia a la rueda del mouse y al trackpad, que es
 * donde el scroll nativo se siente duro.
 *
 * Tres decisiones, todas del estándar de movimiento del estudio:
 *
 *  - `lerp` bajo: cuanto más chico, más pesado y más largo el frenado.
 *  - `syncTouch: false`: en celular manda el scroll del sistema. Suavizar el
 *    táctil se siente mal y pelea con el gesto de la barra del navegador.
 *  - Con `prefers-reduced-motion` no se instancia nada y queda el scroll nativo.
 *
 * Lenis mueve el scroll real de la ventana, así que la cabecera fija, los
 * anclajes y el observer de las animaciones siguen funcionando igual.
 */

const LERP = 0.09;

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const lenis = new Lenis({
      lerp: LERP,
      wheelMultiplier: 1,
      syncTouch: false,
    });

    // si la preferencia cambia con el sitio abierto, el scroll vuelve al nativo
    const onPrefChange = () => {
      if (media.matches) lenis.destroy();
    };
    media.addEventListener('change', onPrefChange);

    return () => {
      media.removeEventListener('change', onPrefChange);
      lenis.destroy();
    };
  }, []);

  // al cambiar de página el scroll arranca arriba, sin frenada de por medio
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
