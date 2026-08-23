import type { Metadata } from 'next';
import { Suspense } from 'react';
import PresupuestoForm from '@/components/PresupuestoForm';

export const metadata: Metadata = {
  title: 'Pedir presupuesto de pileta en Salta',
  description:
    'Cuatro pasos cortos y tu consulta llega por WhatsApp con el tipo de pileta, la zona y la medida ya cargados.',
  alternates: { canonical: '/presupuesto' },
};

export default function PresupuestoPage() {
  return (
    <section className="section--first-sm">
      <div className="wrap wrap--read">
        <h1 className="h1">Pedí tu presupuesto</h1>
        <p className="lead mt-5">
          Cuatro pasos cortos. Al final se abre WhatsApp con tu consulta ya escrita, y del otro lado te responden con un
          número.
        </p>
        <Suspense fallback={<div className="form-skeleton" />}>
          <PresupuestoForm />
        </Suspense>
      </div>
    </section>
  );
}
