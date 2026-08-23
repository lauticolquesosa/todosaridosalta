import Image from 'next/image';
import Link from 'next/link';
import ContactCards from '@/components/ContactCards';
import { BRAND } from '@/lib/site';

/**
 * Pie corto: los accesos de contacto y la marca de un lado, la línea legal del
 * otro. La navegación no se repite acá porque ya está en la cabecera y en el
 * menú del celular.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap wrap--wide">
        <div className="footer__main">
          <div>
            <ContactCards items={['whatsapp', 'instagram', 'facebook']} />
            <Link href="/" className="footer__brand" aria-label={`${BRAND.name}, inicio`}>
              <Image src="/logo-mark.png" alt="" width={48} height={48} />
              <span className="footer__brand-name">
                {BRAND.name}
                <span className="footer__brand-sub">{BRAND.sub}</span>
              </span>
            </Link>
          </div>

          <div className="footer__side">
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
