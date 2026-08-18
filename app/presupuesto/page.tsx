import type { Metadata } from 'next';
import { Suspense } from 'react';
import PresupuestoForm from '@/components/PresupuestoForm';

export const metadata: Metadata = {
  title: 'Pedir presupuesto de pileta en Salta',
  description:
    'Cuatro pasos cortos y tu consulta llega por WhatsApp con el tipo de pileta, la zona y la medida ya cargados.',
  alternates: { canonical: '/presupuesto' },
  robots: { index: true, follow: true },
};

export default function PresupuestoPage() {
  return (
    <section style={{ paddingTop: 'clamp(40px,6vw,64px)', paddingBottom: 'clamp(56px,8vw,96px)' }}>
      <div className="wrap wrap--form">
        <h1 className="h1" style={{ fontSize: 'clamp(28px,4vw,40px)', lineHeight: 1.08 }}>
          Pedí tu presupuesto
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--muted)', marginTop: 14, maxWidth: '52ch' }}>
          Cuatro pasos cortos. Al final se abre WhatsApp con tu consulta ya escrita, y del otro lado te responden con un
          número.
        </p>
        <Suspense fallback={<div style={{ minHeight: 420 }} />}>
          <PresupuestoForm />
        </Suspense>
      </div>
    </section>
  );
}
