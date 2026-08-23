import Crumbs from '@/components/Crumbs';
import { LEGAL, LEGAL_UPDATED } from '@/lib/site';

export default function Legal({ doc }: { doc: 'privacidad' | 'terminos' }) {
  const l = LEGAL[doc];

  return (
    <section className="section--first-sm">
      <div className="wrap wrap--read">
        <div className="phead">
          <Crumbs items={[{ label: l.crumb }]} />
          <h1 className="h1">{l.h1}</h1>
        </div>
        <div className="mt-12">
          {l.blocks.map((b) => (
            <div className="legal-block" key={b.h}>
              <h2>{b.h}</h2>
              <p>{b.p}</p>
            </div>
          ))}
        </div>
        <p className="legal-updated">Última actualización: {LEGAL_UPDATED}.</p>
      </div>
    </section>
  );
}
