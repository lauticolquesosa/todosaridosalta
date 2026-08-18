import Link from 'next/link';

export default function NotFound() {
  return (
    <section style={{ paddingTop: 'clamp(64px,12vw,120px)', paddingBottom: 'clamp(64px,12vw,120px)' }}>
      <div className="wrap wrap--tight">
        <p className="eyebrow">Error 404</p>
        <h1 className="h1" style={{ marginTop: 16, maxWidth: '18ch' }}>
          Esta página no existe
        </h1>
        <p className="lead" style={{ marginTop: 20 }}>
          Puede que el link esté viejo o que la escribimos distinto. Probá desde las obras o pedinos el presupuesto
          directo.
        </p>
        <div className="row">
          <Link href="/" className="btn btn--primary">
            Volver al inicio
          </Link>
          <Link href="/obras" className="btn btn--ghost">
            Ver las obras
          </Link>
        </div>
      </div>
    </section>
  );
}
