import Image from 'next/image';
import Link from 'next/link';
import ObraCard from '@/components/ObraCard';
import { OBRAS } from '@/lib/site';

export default function HomePage() {
  const destacadas = OBRAS.slice(0, 3);

  return (
    <>
      {/* -------------------------------------------------------------- hero */}
      <section className="hero">
        <div className="wrap">
          <div className="hero__grid">
            <div>
              <h1 className="h1 h1--hero">Hacemos el pozo y hacemos la pileta.</h1>
              <p className="hero__p">
                Movimiento de suelos y construcción de piscinas en Salta. Un solo equipo desde la excavación hasta el
                día que la llenás.
              </p>
              <div className="hero__cta" style={{ marginTop: 36 }}>
                <Link href="/presupuesto" className="btn btn--primary btn--lg">
                  Pedir presupuesto
                </Link>
              </div>
              <dl className="hero__stats">
                <div>
                  <dt className="is-accent">2020</dt>
                  <dd>Construyendo en Salta desde entonces</dd>
                </div>
                <div>
                  <dt>San Lorenzo y Salta capital</dt>
                  <dd>Donde están nuestras obras</dd>
                </div>
                <div>
                  <dt>Equipos propios</dt>
                  <dd>De movimiento de suelo, nada tercerizado</dd>
                </div>
              </dl>
            </div>
            <div className="hero__media">
              <Image
                src="/img/hero.webp"
                alt="Pileta terminada con solárium en una casa de Salta, al atardecer"
                fill
                sizes="(max-width: 900px) 100vw, 42vw"
                priority
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ quiénes */}
      <section className="section">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: 760 }}>
            <h2 className="h2">La obra la hacemos nosotros, de principio a fin</h2>
            <p className="body" style={{ marginTop: 20 }}>
              Todo Áridos Salta construye piscinas en Salta desde 2020. Trabajamos con equipos propios de movimiento de
              suelo, así que la excavación y la pileta las hace la misma gente. Nuestras obras están en San Lorenzo, La
              Reserva y Salta capital.
            </p>
          </div>
          <div className="pillars">
            <div className="reveal">
              <h3 className="h3">Un solo responsable</h3>
              <p>La misma empresa abre el pozo y levanta la pileta. No hay un tercero que atrase la obra.</p>
            </div>
            <div className="reveal">
              <h3 className="h3">Equipos propios</h3>
              <p>Máquinas de movimiento de suelo nuestras, listas para entrar el día que arranca la obra.</p>
            </div>
            <div className="reveal">
              <h3 className="h3">Obra en Salta</h3>
              <p>Trabajamos en Salta capital, San Lorenzo, Vaqueros y la zona sur.</p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- obras */}
      <section className="section section--alt">
        <div className="wrap">
          <div className="head-row reveal">
            <h2 className="h2">Piletas que ya están llenas</h2>
            <Link href="/obras" className="lnk">
              Ver todas las obras →
            </Link>
          </div>
          <div className="cards">
            {destacadas.map((o, i) => (
              <ObraCard key={o.slug} obra={o} priority={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- hormigón o fibra */}
      <section className="section">
        <div className="wrap">
          <h2 className="h2 reveal" style={{ maxWidth: '20ch' }}>
            Hormigón o fibra, la pregunta que nos hacen todos los días
          </h2>
          <div className="duo">
            <div className="panel reveal">
              <h3>Hormigón</h3>
              <ul>
                <li>La forma y la medida exactas de tu terreno.</li>
                <li>Se construye en el lugar, sin molde que la limite.</li>
                <li>Para el que quiere la pileta a medida.</li>
              </ul>
              <Link href="/piscinas/hormigon" className="lnk">
                Piscinas de hormigón →
              </Link>
            </div>
            <div className="panel reveal">
              <h3>Fibra de vidrio</h3>
              <ul>
                <li>Llega hecha y se instala.</li>
                <li>Menos días de obra que una de hormigón.</li>
                <li>Para el que quiere resolverlo rápido.</li>
              </ul>
              <Link href="/piscinas/fibra-de-vidrio" className="lnk">
                Piletas de fibra de vidrio →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- áridos */}
      <section className="section section--alt">
        <div className="wrap">
          <div className="split reveal">
            <div>
              <h2 className="h2">Arena, ripio y la máquina, para obras y para particulares</h2>
              <p className="body" style={{ marginTop: 20, maxWidth: '56ch' }}>
                La otra mitad del negocio. Vendemos áridos por metro cúbico y movemos suelos con equipos propios.
                Entrega en el día y precio por cantidad.
              </p>
              <Link href="/aridos-y-movimiento-de-suelos" className="lnk mt-24">
                Ver áridos y movimiento de suelos →
              </Link>
            </div>
            <div className="frame">
              <Image
                src="/img/aridos.webp"
                alt="Pila de arena y ripio con una máquina cargando un camión"
                fill
                sizes="(max-width: 860px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- cta */}
      <section className="cta-final">
        <div className="wrap">
          <div className="cta-band reveal">
            <span className="cta-band__rule" aria-hidden="true" />
            <h2 className="h2">Contanos dónde va la pileta</h2>
            <Link href="/presupuesto" className="btn btn--primary btn--lg">
              Pedir presupuesto
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
