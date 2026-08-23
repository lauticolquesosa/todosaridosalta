import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section--first">
      <div className="wrap wrap--tight">
        <h1 className="h1">Esta página no existe</h1>
        <p className="lead mt-5">
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
