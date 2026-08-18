import type { Metadata } from 'next';
import Image from 'next/image';
import Crumbs from '@/components/Crumbs';
import ClubForm from '@/components/ClubForm';

export const metadata: Metadata = {
  title: 'Piscinas para clubes e instituciones en Salta y el NOA',
  description:
    'Construcción de piletas de medida grande para clubes, entidades deportivas y municipios en Salta, con equipos propios y un solo responsable de obra.',
  alternates: { canonical: '/clubes-e-instituciones' },
};

export default function ClubesPage() {
  return (
    <div className="section--dark on-dark">
      <section style={{ paddingTop: 'clamp(48px,7vw,80px)', paddingBottom: 'clamp(56px,8vw,96px)' }}>
        <div className="wrap" style={{ maxWidth: 900 }}>
          <Crumbs items={[{ label: 'Clubes e instituciones' }]} />
          <h1 className="h1" style={{ maxWidth: '20ch' }}>
            Piletas de medida grande para clubes e instituciones
          </h1>
          <p className="lead" style={{ marginTop: 24 }}>
            Construimos piletas de medidas mayores para clubes y entidades deportivas. Manejamos la obra entera con
            gente propia, desde el movimiento de suelo hasta la terminación, con un solo responsable de principio a
            fin.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: 'rgba(244,242,238,.7)', maxWidth: '62ch', marginTop: 20 }}>
            Todavía no hicimos una obra de este tipo. Lo decimos de frente. Lo que ponemos sobre la mesa es la capacidad
            técnica y los equipos propios que ya usamos en cada pileta que construimos. Si tu comisión o tu municipio
            está evaluando una obra así, hablemos.
          </p>

          <div
            className="frame"
            style={{ marginTop: 40, borderColor: 'rgba(244,242,238,.18)', background: 'var(--dark-2)' }}
          >
            <Image
              src="/img/clubes.webp"
              alt="Pileta semiolímpica de un club deportivo"
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              priority
            />
          </div>

          <ClubForm />
        </div>
      </section>
    </div>
  );
}
