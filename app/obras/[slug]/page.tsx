import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Crumbs from '@/components/Crumbs';
import { OBRAS, SITE_URL, getObra, nextObra, obraImg, obraLead, tipoLabel } from '@/lib/site';

export function generateStaticParams() {
  return OBRAS.map((o) => ({ slug: o.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const o = getObra(slug);
  if (!o) return {};
  const title = `${o.barrio} · ${tipoLabel(o.tipo)} en ${o.zona}`;
  const description = obraLead(o);
  return {
    title,
    description,
    alternates: { canonical: `/obras/${o.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/obras/${o.slug}`,
      images: [{ url: obraImg(o.slug, 'terminada'), width: 1344, height: 896, alt: o.barrio }],
    },
  };
}

const GALERIA = [
  { kind: 'entorno', caption: 'Vista con el entorno' },
  { kind: 'detalle', caption: 'Detalle del borde' },
] as const;

export default async function ObraPage({ params }: Props) {
  const { slug } = await params;
  const o = getObra(slug);
  if (!o) notFound();

  const nx = nextObra(o.slug);
  const presupuesto = `/presupuesto?tipo=${o.tipo === 'hormigon' ? 'hormigon' : 'fibra-de-vidrio'}`;

  return (
    <>
      <section className="section--first-sm">
        <div className="wrap wrap--wide">
          <div className="phead">
            <Crumbs items={[{ label: 'Obras', href: '/obras' }, { label: o.barrio }]} />
            <h1 className="h1">{o.barrio}</h1>
          </div>

          <div className="pair mt-12">
            <figure>
              <div className="frame">
                <Image
                  src={obraImg(o.slug, 'antes')}
                  alt={`Terreno excavado para la pileta en ${o.zona}`}
                  fill
                  sizes="(max-width: 720px) 100vw, 50vw"
                  priority
                />
              </div>
              <figcaption>El terreno, antes</figcaption>
            </figure>
            <figure>
              <div className="frame">
                <Image
                  src={obraImg(o.slug, 'terminada')}
                  alt={`Pileta de ${tipoLabel(o.tipo).toLowerCase()} terminada en ${o.zona}`}
                  fill
                  sizes="(max-width: 720px) 100vw, 50vw"
                  priority
                />
              </div>
              <figcaption>La pileta, terminada</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section--sm">
        <div className="wrap wrap--tight">
          <dl className="specs">
            <div>
              <dt>Barrio</dt>
              <dd>{o.zona}</dd>
            </div>
            <div>
              <dt>Tipo</dt>
              <dd>{tipoLabel(o.tipo)}</dd>
            </div>
            <div>
              <dt>Medidas</dt>
              <dd>{o.medidas}</dd>
            </div>
            <div>
              <dt>Plazo</dt>
              <dd>{o.plazo}</dd>
            </div>
          </dl>

          <p className="body mt-10">{obraLead(o)}</p>

          <h2 className="h2 h2--sm reveal mt-16">Más fotos de la obra</h2>
          <div className="gallery">
            {GALERIA.map((g) => (
              <figure key={g.kind} className="reveal">
                <div className="frame">
                  <Image
                    src={obraImg(o.slug, g.kind)}
                    alt={`${g.caption} de la pileta en ${o.zona}`}
                    fill
                    sizes="(max-width: 720px) 100vw, 400px"
                  />
                </div>
                <figcaption>{g.caption}</figcaption>
              </figure>
            ))}
          </div>

          <div className="obra-foot">
            <Link href={presupuesto} className="btn btn--primary">
              Pedir presupuesto
            </Link>
            <Link href={`/obras/${nx.slug}`} className="lnk">
              Obra siguiente: {nx.barrio}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
