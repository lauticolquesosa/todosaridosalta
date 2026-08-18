import type { Metadata } from 'next';
import Link from 'next/link';
import Crumbs from '@/components/Crumbs';
import { COMPARATIVA } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Piscinas de hormigón y de fibra de vidrio en Salta',
  description:
    'Comparación entre piscinas de hormigón y piletas de fibra de vidrio en Salta: forma, plazo de obra, terminaciones y mantenimiento.',
  alternates: { canonical: '/piscinas' },
};

export default function PiscinasPage() {
  return (
    <section className="section" style={{ paddingTop: 'var(--sec-y-sm)' }}>
      <div className="wrap wrap--narrow">
        <Crumbs items={[{ label: 'Piscinas' }]} />
        <h1 className="h1" style={{ maxWidth: '18ch' }}>
          Hormigón o fibra, la pregunta que nos hacen todos los días
        </h1>
        <p className="lead" style={{ marginTop: 24 }}>
          Las dos opciones sirven, y la elección depende del terreno, del uso y del plazo. El hormigón se construye a
          medida en el lugar. La fibra llega hecha y se instala en menos tiempo. Acá están las dos, una al lado de la
          otra.
        </p>

        <div className="table-wrap reveal">
          <table>
            <caption className="visually-hidden" style={{ position: 'absolute', left: -9999 }}>
              Comparación entre piscinas de hormigón y piletas de fibra de vidrio
            </caption>
            <thead>
              <tr>
                <th scope="col">Característica</th>
                <th scope="col">Hormigón</th>
                <th scope="col">Fibra de vidrio</th>
              </tr>
            </thead>
            <tbody>
              {COMPARATIVA.map((f) => (
                <tr key={f.fila}>
                  <th scope="row">{f.fila}</th>
                  <td>{f.hormigon}</td>
                  <td>{f.fibra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row">
          <Link href="/piscinas/hormigon" className="btn btn--primary">
            Ver piscinas de hormigón
          </Link>
          <Link href="/piscinas/fibra-de-vidrio" className="btn btn--ghost">
            Ver piletas de fibra
          </Link>
        </div>
      </div>
    </section>
  );
}
