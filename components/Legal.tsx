import Crumbs from '@/components/Crumbs';
import { LEGAL, LEGAL_UPDATED } from '@/lib/site';

export default function Legal({ doc }: { doc: 'privacidad' | 'terminos' }) {
  const l = LEGAL[doc];

  return (
    <section style={{ paddingTop: 'var(--sec-y-sm)', paddingBottom: 'clamp(56px,8vw,96px)' }}>
      <div className="wrap wrap--legal">
        <Crumbs items={[{ label: l.crumb }]} />
        <h1 className="h1" style={{ fontSize: 'clamp(30px,4vw,44px)', lineHeight: 1.08 }}>
          {l.h1}
        </h1>
        <div style={{ marginTop: 28 }}>
          {l.blocks.map((b) => (
            <div key={b.h} style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 19, color: 'var(--ink)' }}>
                {b.h}
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--muted)', maxWidth: '64ch', marginTop: 10 }}>
                {b.p}
              </p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 14, color: 'var(--faint)', marginTop: 12 }}>Última actualización: {LEGAL_UPDATED}.</p>
      </div>
    </section>
  );
}
