import type { Metadata } from 'next';
import Legal from '@/components/Legal';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Qué datos tomamos, para qué los usamos y cómo se maneja tu consulta por WhatsApp.',
  alternates: { canonical: '/privacidad' },
};

export default function PrivacidadPage() {
  return <Legal doc="privacidad" />;
}
