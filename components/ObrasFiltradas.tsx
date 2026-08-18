'use client';

import { useMemo, useState } from 'react';
import ObraCard from '@/components/ObraCard';
import { OBRAS, ZONAS } from '@/lib/site';

const TIPO_FILTERS = [
  { key: 'all', label: 'Todas' },
  { key: 'hormigon', label: 'Hormigón' },
  { key: 'fibra', label: 'Fibra de vidrio' },
] as const;

const ZONA_FILTERS = [{ key: 'all', label: 'Todas las zonas' }, ...ZONAS.map((z) => ({ key: z, label: z }))];

export default function ObrasFiltradas() {
  const [tipo, setTipo] = useState<string>('all');
  const [zona, setZona] = useState<string>('all');

  const filtradas = useMemo(
    () => OBRAS.filter((o) => (tipo === 'all' || o.tipo === tipo) && (zona === 'all' || o.zona === zona)),
    [tipo, zona],
  );

  const count =
    filtradas.length === 0
      ? 'No hay obras con ese filtro'
      : filtradas.length === 1
        ? '1 obra'
        : `${filtradas.length} obras`;

  return (
    <>
      <div className="filters">
        <div className="filters__row" role="group" aria-label="Filtrar por tipo de construcción">
          {TIPO_FILTERS.map((f) => (
            <button key={f.key} type="button" className="chip" aria-pressed={tipo === f.key} onClick={() => setTipo(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="filters__row" role="group" aria-label="Filtrar por zona">
          {ZONA_FILTERS.map((f) => (
            <button key={f.key} type="button" className="chip" aria-pressed={zona === f.key} onClick={() => setZona(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
        <p className="filters__count" aria-live="polite">
          {count}
        </p>
      </div>

      <div className="cards" style={{ marginTop: 24 }}>
        {filtradas.map((o, i) => (
          <ObraCard key={o.slug} obra={o} priority={i < 2} animate={false} />
        ))}
      </div>
    </>
  );
}
