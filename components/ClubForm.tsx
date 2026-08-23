'use client';

import { useState } from 'react';
import { wa } from '@/lib/site';

/**
 * El pedido de una institución no entra en un mensaje suelto, así que acá sí
 * va un formulario. No se guarda nada: arma el mensaje y abre WhatsApp.
 */
export default function ClubForm() {
  const [inst, setInst] = useState('');
  const [proy, setProy] = useState('');
  const [cont, setCont] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      'Hola, consulto por una obra para club o institución.',
      `Institución: ${inst.trim() || '-'}`,
      `Tipo de proyecto: ${proy.trim() || '-'}`,
      `Contacto: ${cont.trim() || '-'}`,
    ].join('\n');
    window.open(wa(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={onSubmit} className="form-block">
      <h2 className="h2 h2--sm">Contanos del proyecto</h2>
      <div className="stack mt-10">
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
      <div className="row">
        <button type="submit" className="btn btn--primary">
          Escribir al equipo de obras
        </button>
      </div>
    </form>
  );
}
