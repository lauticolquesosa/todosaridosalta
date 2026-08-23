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
    <section className="section--first section--dark on-dark">
      <div className="wrap wrap--tight">
        <div className="phead">
          <Crumbs items={[{ label: 'Clubes e instituciones' }]} />
          <h1 className="h1">Piletas de medida grande para clubes e instituciones</h1>
          <p className="lead phead__lead">
            Construimos piletas de medidas mayores para clubes y entidades deportivas. Manejamos la obra entera con
            gente propia, desde el movimiento de suelo hasta la terminación, con un solo responsable de principio a fin.
          </p>
          <p className="body">
            Todavía no hicimos una obra de este tipo. Lo decimos de frente. Lo que ponemos sobre la mesa es la capacidad
            técnica y los equipos propios que ya usamos en cada pileta que construimos. Si tu comisión o tu municipio
            está evaluando una obra así, hablemos.
          </p>
        </div>

        <div className="frame mt-12">
          <Image
            src="/img/clubes.webp"
            alt="Pileta semiolímpica de un club deportivo"
            fill
            sizes="(max-width: 820px) 100vw, 820px"
            priority
          />
        </div>

        <ClubForm />
      </div>
    </section>
  );
}
