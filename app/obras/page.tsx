import type { Metadata } from 'next';
import Crumbs from '@/components/Crumbs';
import ObrasFiltradas from '@/components/ObrasFiltradas';

export const metadata: Metadata = {
  title: 'Obras de piscinas en Salta y San Lorenzo',
  description:
    'Galería de piletas construidas por Todo Áridos Salta en San Lorenzo, Vaqueros, Salta capital y la zona sur. Filtrá por tipo de construcción y por zona.',
  alternates: { canonical: '/obras' },
};

export default function ObrasPage() {
  return (
    <section style={{ paddingTop: 'var(--sec-y-sm)', paddingBottom: 'var(--sec-y)' }}>
      <div className="wrap">
        <Crumbs items={[{ label: 'Obras' }]} />
        <h1 className="h1">Piletas que ya están llenas</h1>
        <p className="lead" style={{ marginTop: 20, maxWidth: '60ch' }}>
          Cada obra abre con el par del terreno excavado y la pileta terminada. Filtrá por tipo de construcción y por
          zona.
        </p>
        <ObrasFiltradas />
      </div>
    </section>
  );
}
