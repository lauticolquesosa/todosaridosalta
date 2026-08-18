'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BRAND, wa } from '@/lib/site';

type Budget = {
  que: string;
  tipo: string;
  zona: string;
  medida: string;
  terreno: string;
  detalle: string;
  nombre: string;
  tel: string;
};

const EMPTY: Budget = {
  que: '',
  tipo: '',
  zona: '',
  medida: '',
  terreno: '',
  detalle: '',
  nombre: '',
  tel: '',
};

const QUE = ['Pileta nueva', 'Refacción de una existente', 'Solo movimiento de suelos'];
const TIPOS = [
  { v: 'Hormigón', help: 'A medida, cualquier forma. Se construye en el lugar.' },
  { v: 'Fibra de vidrio', help: 'Llega hecha y se instala. Menos días de obra.' },
];
const MEDIDAS = ['Hasta 4 x 8 m', 'Alrededor de 4 x 10 m', 'Más grande', 'Todavía no sé'];
const TERRENOS = ['Sí', 'No', 'No sé'];

const SOLO_SUELOS = 'Solo movimiento de suelos';

const telValido = (t: string) => t.replace(/[^0-9]/g, '').length >= 6;

/** Arma el mensaje de WhatsApp con todo lo que cargó la persona en el formulario. */
function buildMsg(b: Budget): string {
  const L: string[] = [`Hola ${BRAND.name}, quiero pedir un presupuesto.`, ''];
  L.push(`• Qué necesito: ${b.que || '-'}`);
  if (b.que !== SOLO_SUELOS) L.push(`• Tipo de pileta: ${b.tipo || 'a definir'}`);
  L.push(`• Zona: ${b.zona.trim() || 'a confirmar'}`);
  if (b.que !== SOLO_SUELOS) L.push(`• Medida aproximada: ${b.medida || 'a confirmar'}`);
  L.push(`• Terreno preparado: ${b.terreno || 'a confirmar'}`);
  if (b.detalle.trim()) L.push(`• Detalle: ${b.detalle.trim()}`);
  L.push('');
  L.push(`Mi nombre: ${b.nombre.trim() || '-'}`);
  L.push(`Mi teléfono: ${b.tel.trim() || '-'}`);
  L.push('');
  L.push('¿Me pasan el presupuesto de esto, por favor?');
  return L.join('\n');
}

export default function PresupuestoForm() {
  const params = useSearchParams();
  const preTipo = params.get('tipo');

  const [budget, setBudget] = useState<Budget>(() => {
    if (preTipo === 'hormigon') return { ...EMPTY, que: 'Pileta nueva', tipo: 'Hormigón' };
    if (preTipo === 'fibra-de-vidrio') return { ...EMPTY, que: 'Pileta nueva', tipo: 'Fibra de vidrio' };
    return EMPTY;
  });
  const [step, setStep] = useState(1);
  const [confirm, setConfirm] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [stepError, setStepError] = useState('');
  const [touchedNombre, setTouchedNombre] = useState(false);
  const [touchedTel, setTouchedTel] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, confirm]);

  const set = (patch: Partial<Budget>) => {
    setStepError('');
    setBudget((b) => ({ ...b, ...patch }));
  };

  const errNombre = touchedNombre && !budget.nombre.trim();
  const errTel = touchedTel && !telValido(budget.tel);

  const next = () => {
    if (step === 1) {
      if (!budget.que) return setStepError('Elegí una opción para seguir.');
      setStepError('');
      setStep(budget.que === SOLO_SUELOS ? 3 : 2);
      return;
    }
    if (step === 2) {
      if (!budget.tipo) return setStepError('Elegí el tipo de pileta para seguir.');
      setStepError('');
      setStep(3);
      return;
    }
    if (step === 3) {
      setStepError('');
      setStep(4);
      return;
    }
    if (step === 4) {
      if (!budget.nombre.trim() || !telValido(budget.tel)) {
        setTouchedNombre(true);
        setTouchedTel(true);
        setStepError('Nos falta tu nombre y un teléfono para poder responderte.');
        return;
      }
      setStepError('');
      setConfirm(true);
    }
  };

  const back = () => {
    setStepError('');
    if (confirm) {
      setConfirm(false);
      setStep(4);
      return;
    }
    if (step === 4) return setStep(3);
    if (step === 3) return setStep(budget.que === SOLO_SUELOS ? 1 : 2);
    if (step === 2) return setStep(1);
  };

  const msg = buildMsg(budget);

  if (confirm) {
    return (
      <div style={{ marginTop: 36 }}>
        <h2
          tabIndex={-1}
          ref={headingRef}
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26 }}
        >
          Listo, revisá tu pedido
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--muted)', marginTop: 12, maxWidth: '52ch' }}>
          Al tocar <strong>Consultar</strong> se abre WhatsApp al {BRAND.phoneLabel} con este mensaje ya escrito. Solo
          te queda darle enviar.
        </p>
        <div className="msg-box">
          <p style={{ whiteSpace: 'pre-line' }}>{msg}</p>
        </div>
        <div className="row" style={{ marginTop: 28 }}>
          <a
            className="btn btn--primary"
            href={wa(msg)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setEnviado(true)}
          >
            Consultar por WhatsApp
          </a>
          <button type="button" className="btn--quiet" onClick={back}>
            ← Corregir algo
          </button>
        </div>
        {enviado && (
          <p aria-live="polite" style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--muted)', marginTop: 20 }}>
            Se abrió WhatsApp en otra pestaña. Si no se abrió, llamanos al{' '}
            <a href={BRAND.phoneHref}>{BRAND.phoneLabel}</a>.
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="prog" role="presentation">
        {[1, 2, 3, 4].map((n) => (
          <span key={n} className={n <= step ? 'is-done' : ''} />
        ))}
      </div>
      <p className="prog__label" aria-live="polite">
        Paso {step} de 4
      </p>

      <div ref={headingRef} tabIndex={-1} style={{ outline: 'none' }}>
        {step === 1 && (
          <>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22 }}>¿Qué querés hacer?</h2>
            <div className="opts">
              {QUE.map((v) => (
                <button
                  key={v}
                  type="button"
                  className="opt"
                  aria-pressed={budget.que === v}
                  onClick={() => set({ que: v, ...(v === SOLO_SUELOS ? { tipo: '', medida: '' } : {}) })}
                >
                  {v}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22 }}>¿Qué tipo de pileta?</h2>
            <div className="opts">
              {TIPOS.map((t) => (
                <button
                  key={t.v}
                  type="button"
                  className="opt"
                  aria-pressed={budget.tipo === t.v}
                  onClick={() => set({ tipo: t.v })}
                >
                  <span className="opt__title">{t.v}</span>
                  <span className="opt__help">{t.help}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22 }}>
              ¿Dónde y de qué tamaño?
            </h2>
            <div style={{ marginTop: 20 }}>
              <label className="field" style={{ marginBottom: 20 }}>
                <span className="field__label">Zona o barrio</span>
                <input
                  type="text"
                  value={budget.zona}
                  onChange={(e) => set({ zona: e.target.value })}
                  placeholder="San Lorenzo, Vaqueros, Salta capital..."
                  autoComplete="address-level2"
                />
              </label>
            </div>
            {budget.que !== SOLO_SUELOS && (
              <>
                <span className="form-label">Medida aproximada</span>
                <div className="opts opts--row" style={{ marginBottom: 24, marginTop: 0 }}>
                  {MEDIDAS.map((v) => (
                    <button
                      key={v}
                      type="button"
                      className="opt opt--sm"
                      aria-pressed={budget.medida === v}
                      onClick={() => set({ medida: v })}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </>
            )}
            <span className="form-label">¿El terreno ya está preparado?</span>
            <div className="opts opts--row" style={{ marginTop: 0, marginBottom: 24 }}>
              {TERRENOS.map((v) => (
                <button
                  key={v}
                  type="button"
                  className="opt opt--sm"
                  aria-pressed={budget.terreno === v}
                  onClick={() => set({ terreno: v })}
                >
                  {v}
                </button>
              ))}
            </div>
            <label className="field">
              <span className="field__label">Algo más que quieras contarnos (opcional)</span>
              <textarea
                rows={3}
                value={budget.detalle}
                onChange={(e) => set({ detalle: e.target.value })}
                placeholder="Acceso para la máquina, plazos, solárium, lo que sea."
              />
            </label>
          </>
        )}

        {step === 4 && (
          <>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22 }}>¿Cómo te contactamos?</h2>
            <div className="stack">
              <label className="field">
                <span className="field__label">Tu nombre</span>
                <input
                  type="text"
                  value={budget.nombre}
                  onChange={(e) => set({ nombre: e.target.value })}
                  onBlur={() => setTouchedNombre(true)}
                  aria-invalid={errNombre}
                  autoComplete="name"
                  required
                />
                {errNombre && (
                  <span className="field__error">Poné tu nombre para que sepamos con quién hablamos.</span>
                )}
              </label>
              <label className="field">
                <span className="field__label">Tu teléfono</span>
                <input
                  type="tel"
                  inputMode="tel"
                  value={budget.tel}
                  onChange={(e) => set({ tel: e.target.value })}
                  onBlur={() => setTouchedTel(true)}
                  aria-invalid={errTel}
                  placeholder="387 ..."
                  autoComplete="tel"
                  required
                />
                {errTel && (
                  <span className="field__error">Escribí un teléfono con característica, así te podemos llamar.</span>
                )}
              </label>
            </div>
          </>
        )}
      </div>

      {stepError && (
        <p className="field__error" role="alert" style={{ marginTop: 20 }}>
          {stepError}
        </p>
      )}

      <div className="wizard-foot">
        {step > 1 && (
          <button type="button" className="btn--quiet" onClick={back}>
            ← Volver
          </button>
        )}
        <button type="button" className="btn btn--primary" onClick={next}>
          {step === 4 ? 'Ver mi pedido' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
}
