import Image from 'next/image';
import Link from 'next/link';
import { BRAND, wa } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__cols">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Image src="/logo-mark.png" alt="" width={40} height={40} style={{ height: 40, width: 'auto' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: '#fff', lineHeight: 1.1 }}>
                {BRAND.name}
              </span>
            </div>
            <p>Construcción de piscinas y movimiento de suelos en Salta. Hacemos el pozo y la pileta.</p>
          </div>

          <div>
            <h3>Piscinas</h3>
            <ul>
              <li>
                <Link href="/piscinas">Hormigón o fibra</Link>
              </li>
              <li>
                <Link href="/piscinas/hormigon">Piscinas de hormigón</Link>
              </li>
              <li>
                <Link href="/piscinas/fibra-de-vidrio">Piletas de fibra</Link>
              </li>
              <li>
                <Link href="/obras">Obras</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Empresa</h3>
            <ul>
              <li>
                <Link href="/aridos-y-movimiento-de-suelos">Áridos y movimiento de suelos</Link>
              </li>
              <li>
                <Link href="/clubes-e-instituciones">Clubes e instituciones</Link>
              </li>
              <li>
                <Link href="/presupuesto">Pedir presupuesto</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Contacto</h3>
            <ul>
              <li>
                <a
                  className="is-accent"
                  href={wa('Hola, quiero consultar por una pileta.')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp {BRAND.phoneLabel}
                </a>
              </li>
              <li>
                <span>Salta capital, Salta</span>
              </li>
              <li>
                <span style={{ color: 'rgba(244,242,238,.5)', fontSize: 14 }}>Dirección y horario, a confirmar</span>
              </li>
            </ul>
            <div className="footer__social">
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <span>Instagram</span>
              </a>
              <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <path d="M14 8h-1.2c-.7 0-1.3.6-1.3 1.3V11H14M11.5 11v6M9.5 12.5h4.5" />
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
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
    </footer>
  );
}
