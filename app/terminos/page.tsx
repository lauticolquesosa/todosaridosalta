import type { Metadata } from 'next';
import Legal from '@/components/Legal';

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description: 'Condiciones de uso del sitio, alcance de los presupuestos y cómo se informan precios y plazos.',
  alternates: { canonical: '/terminos' },
};

export default function TerminosPage() {
  return <Legal doc="terminos" />;
}
