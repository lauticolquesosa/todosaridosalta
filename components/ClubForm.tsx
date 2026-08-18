'use client';

import { useState } from 'react';
import { wa } from '@/lib/site';

export default function ClubForm() {
  const [inst, setInst] = useState('');
  const [proy, setProy] = useState('');
  const [cont, setCont] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      'Hola, consulto por una obra para club o institución.',
      `Institución: ${inst || '-'}`,
      `Tipo de proyecto: ${proy || '-'}`,
      `Contacto: ${cont || '-'}`,
    ].join('\n');
    window.open(wa(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ marginTop: 44, borderTop: '1px solid rgba(244,242,238,.18)', paddingTop: 36, maxWidth: 560 }}
    >
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: '#fff' }}>
        Contanos del proyecto
      </h2>
      <div className="stack">
        <label className="field">
          <span className="field__label">Institución o club</span>
          <input type="text" value={inst} onChange={(e) => setInst(e.target.value)} autoComplete="organization" />
        </label>
        <label className="field">
          <span className="field__label">Tipo de proyecto</span>
          <input
            type="text"
            value={proy}
            onChange={(e) => setProy(e.target.value)}
            placeholder="pileta semiolímpica, terapéutica, otra"
          />
        </label>
        <label className="field">
          <span className="field__label">Con quién hablamos y cómo</span>
          <input
            type="text"
            value={cont}
            onChange={(e) => setCont(e.target.value)}
            placeholder="nombre y teléfono"
            autoComplete="name"
          />
        </label>
      </div>
      <button type="submit" className="btn btn--primary" style={{ marginTop: 28 }}>
        Escribir al equipo de obras
      </button>
    </form>
  );
}
