import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Crumbs from '@/components/Crumbs';
import ObraCard from '@/components/ObraCard';
import { OBRAS, SITE_URL, TIPOS, type TipoContent } from '@/lib/site';

const BY_SLUG: Record<string, TipoContent> = {
  hormigon: TIPOS.hormigon,
  'fibra-de-vidrio': TIPOS.fibra,
};

export function generateStaticParams() {
  return Object.keys(BY_SLUG).map((tipo) => ({ tipo }));
}

type Props = { params: Promise<{ tipo: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tipo } = await params;
  const t = BY_SLUG[tipo];
  if (!t) return {};
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: `/piscinas/${t.slug}` },
    openGraph: { title: t.title, description: t.description, url: `${SITE_URL}/piscinas/${t.slug}` },
  };
}

export default async function TipoPage({ params }: Props) {
  const { tipo } = await params;
  const t = BY_SLUG[tipo];
  if (!t) notFound();

  const obras = OBRAS.filter((o) => o.tipo === t.key).slice(0, 3);

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <section className="section--first-sm">
        <div className="wrap wrap--wide">
          <div className="phead">
            <Crumbs items={[{ label: 'Piscinas', href: '/piscinas' }, { label: t.crumb }]} />
            <h1 className="h1">{t.h1}</h1>
            <p className="lead phead__lead">{t.intro}</p>
          </div>

          <div className="frame mt-12">
            <Image
              src={t.proceso}
              alt={
                t.key === 'hormigon'
                  ? 'Estructura de hormigón de una pileta en construcción'
                  : 'Casco de fibra de vidrio siendo colocado en el pozo'
              }
              fill
              sizes="(max-width: 1440px) 100vw, 1440px"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section--sm section--dark">
        <div className="wrap wrap--tight">
          <h2 className="h2 h2--sm reveal">Cómo lo hacemos, paso a paso</h2>
          <div className="steps">
            {t.pasos.map((p) => (
              <div className="step reveal" key={p.n}>
                <span className="step__n">{p.n}</span>
                <div>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap wrap--wide">
          <div className="head-row reveal">
            <h2 className="h2 h2--sm">{t.obrasTitle}</h2>
            <Link href="/obras" className="lnk">
              Ver todas las obras
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="cards">
            {obras.map((o) => (
              <ObraCard key={o.slug} obra={o} />
            ))}
          </div>
          <div className="row">
            <Link href={t.presupuestoHref} className="btn btn--primary">
              Pedir presupuesto
            </Link>
          </div>
        </div>
      </section>

      <section className="section--sm section--alt">
        <div className="wrap wrap--tight">
          <h2 className="h2 h2--sm reveal">Preguntas frecuentes</h2>
          <div className="faq">
            {t.faqs.map((f) => (
              <div className="faq__item reveal" key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
