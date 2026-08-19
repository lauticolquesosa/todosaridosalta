import Image from 'next/image';
import Link from 'next/link';
import ContactCards from '@/components/ContactCards';
import { BRAND } from '@/lib/site';

/**
 * Pie mínimo: a la izquierda la marca, a la derecha los accesos a las redes
 * y la línea legal. La navegación no se repite acá porque ya está en el
 * encabezado y en el menú del celular.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__main">
          <Link href="/" className="footer__brand" aria-label={`${BRAND.name}, inicio`}>
            <Image src="/logo-mark.png" alt="" width={52} height={52} style={{ height: 52, width: 'auto' }} />
            <span className="footer__brand-name">
              {BRAND.name}
              <span className="footer__brand-sub">{BRAND.sub}</span>
            </span>
          </Link>

          <div className="footer__side">
            <ContactCards
              items={['instagram', 'facebook', 'whatsapp']}
              className="minicards--sm footer__cards"
            />
            <p className="footer__legal">
              © {year} {BRAND.name}. Salta, Argentina.
            </p>
            <div className="footer__links">
              <Link href="/privacidad">Política de privacidad</Link>
              <Link href="/terminos">Términos y condiciones</Link>
              <a href={BRAND.agency.url} target="_blank" rel="noopener noreferrer">
                Sitio por {BRAND.agency.name}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
