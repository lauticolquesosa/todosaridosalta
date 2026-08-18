'use client';

import { usePathname } from 'next/navigation';
import { wa } from '@/lib/site';

export default function WhatsAppFloat() {
  const pathname = usePathname();
  if (pathname.startsWith('/presupuesto')) return null;

  const msg = pathname.startsWith('/aridos')
    ? 'Hola, quiero pedir áridos o alquilar una máquina.'
    : 'Hola, quiero consultar por una pileta.';

  return (
    <a
      className="wa-float"
      href={wa(msg)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20l1.4-4A8 8 0 1 1 8 18.6L4 20z" />
        <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-.5l-1.3-1-1 .6c-1.2-.5-2.1-1.4-2.6-2.6l.6-1-1-1.3s-.5.4-.5 1z" fill="currentColor" stroke="none" />
      </svg>
    </a>
  );
}
