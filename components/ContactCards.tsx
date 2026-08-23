import { BRAND, wa } from '@/lib/site';

/**
 * Accesos de contacto en tarjetas cuadradas chicas, una al lado de la otra.
 * Mismo tamaño y misma alineación en el pie y en el menú del celular, que son
 * los dos lugares donde aparecen.
 */

type Kind = 'whatsapp' | 'instagram' | 'facebook';

const ICONS: Record<Kind, React.ReactNode> = {
  whatsapp: <path d="M4 20l1.4-4A8 8 0 1 1 8 18.6L4 20z" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <>
      <path d="M15.3 5.5h-1.6A2.7 2.7 0 0 0 11 8.2V18.5" />
      <path d="M8.9 11.6h5.6" />
    </>
  ),
};

const LABEL: Record<Kind, string> = {
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  facebook: 'Facebook',
};

const HREF: Record<Kind, string> = {
  whatsapp: wa('Hola, quiero consultar por una pileta.'),
  instagram: BRAND.instagram,
  facebook: BRAND.facebook,
};

export default function ContactCards({ items }: { items: Kind[] }) {
  return (
    <div className="minicards">
      {items.map((kind) => (
        <a
          key={kind}
          className="minicard"
          href={HREF[kind]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="minicard__icon" aria-hidden="true">
            <svg
              width="22"
              height="22"
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
        </a>
      ))}
    </div>
  );
}
