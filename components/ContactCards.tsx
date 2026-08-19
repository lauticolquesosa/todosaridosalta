import { BRAND, wa } from '@/lib/site';

/**
 * Tres accesos de contacto en fila, como tarjetitas. Se usan en el menú del
 * celular (llamar, WhatsApp, Instagram) y en el pie en mobile (Instagram,
 * Facebook, WhatsApp). Sin estado, así que sirve en server y en cliente.
 */

type Kind = 'tel' | 'whatsapp' | 'instagram' | 'facebook';

const ICONS: Record<Kind, React.ReactNode> = {
  tel: (
    <path d="M5 4h3l1.6 4-2 1.4a12 12 0 0 0 5.5 5.5l1.4-2 4 1.6v3a1.6 1.6 0 0 1-1.8 1.6A15.5 15.5 0 0 1 3.4 5.8 1.6 1.6 0 0 1 5 4z" />
  ),
  whatsapp: <path d="M4 20l1.4-4A8 8 0 1 1 8 18.6L4 20z" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M14.5 7.5H13c-.9 0-1.6.7-1.6 1.6V11H14m-2.6 0v7m-2-3.9h4.6" />,
};

const LABEL: Record<Kind, string> = {
  tel: 'Llamar',
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  facebook: 'Facebook',
};

function hrefOf(kind: Kind): string {
  if (kind === 'tel') return BRAND.phoneHref;
  if (kind === 'whatsapp') return wa('Hola, quiero consultar por una pileta.');
  if (kind === 'instagram') return BRAND.instagram;
  return BRAND.facebook;
}

export default function ContactCards({
  items,
  className = '',
}: {
  items: Kind[];
  className?: string;
}) {
  return (
    <div className={`minicards ${className}`.trim()}>
      {items.map((kind) => {
        const external = kind !== 'tel';
        return (
          <a
            key={kind}
            className="minicard"
            href={hrefOf(kind)}
            aria-label={kind === 'tel' ? `Llamar al ${BRAND.phoneLabel}` : LABEL[kind]}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <span className="minicard__icon" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {ICONS[kind]}
              </svg>
            </span>
            <span className="minicard__label">{LABEL[kind]}</span>
            {kind === 'tel' && <span className="minicard__sub">{BRAND.phoneLabel}</span>}
          </a>
        );
      })}
    </div>
  );
}
