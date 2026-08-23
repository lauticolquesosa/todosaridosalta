import type { Metadata } from 'next';
import Image from 'next/image';
import Crumbs from '@/components/Crumbs';
import { MATERIALES, SERVICIOS, wa } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Áridos y movimiento de suelos en Salta',
  description:
    'Venta de arena, ripio, enlame, base y relleno por metro cúbico en Salta. Movimiento de suelos, zanjeos, retiro de escombros y alquiler de maquinaria.',
  alternates: { canonical: '/aridos-y-movimiento-de-suelos' },
};

export default function AridosPage() {
  return (
    <section className="section--first">
      <div className="wrap wrap--narrow">
        <div className="phead">
          <Crumbs items={[{ label: 'Áridos y movimiento de suelos' }]} />
          <h1 className="h1">Arena, ripio y la máquina, para obras y para particulares</h1>
          <p className="lead phead__lead">
            Vendemos áridos por metro cúbico y hacemos movimiento de suelos con equipos propios. Entrega en el día,
            precio por cantidad, y atendemos tanto a obras como a particulares.
          </p>
        </div>

        <div className="frame mt-12">
          <Image
            src="/img/aridos.webp"
            alt="Pilas de arena y ripio con una máquina cargando un camión"
            fill
            sizes="(max-width: 1040px) 100vw, 1040px"
            priority
          />
        </div>

        <div className="lists">
          <div className="reveal">
            <h2>Materiales</h2>
            <ul>
              {MATERIALES.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <h2>Servicios</h2>
            <ul>
              {SERVICIOS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="tags">
          <span className="tag">Entrega en el día</span>
          <span className="tag">Precio por cantidad</span>
          <span className="tag">Obras y particulares</span>
        </div>

        <div className="row">
          <a
            className="btn btn--primary"
            href={wa('Hola, quiero pedir áridos o alquilar una máquina.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pedir materiales por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
