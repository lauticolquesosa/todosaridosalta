'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ContactCards from '@/components/ContactCards';
import { BRAND, NAV, PISCINAS_NAV } from '@/lib/site';

/**
 * Cabecera fija. En la portada arranca transparente sobre el hero oscuro y se
 * vuelve sólida al scrollear. En el resto de las páginas es sólida siempre,
 * porque abajo hay fondo claro. Se esconde al bajar y vuelve al subir.
 */
export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accOpen, setAccOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // Un solo listener de scroll, dentro de un rAF, para no trabar el hilo.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const apply = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (!menuOpen) {
        const delta = y - last;
        if (y > 200 && delta > 6) setHidden(true);
        else if (delta < -6 || y <= 200) setHidden(false);
      }
      last = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
      setDropOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick, true);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
    setAccOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const solid = scrolled || !isHome;
  const active = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <header
        className={`header${solid ? ' header--solid' : ''}${hidden && !menuOpen ? ' header--hidden' : ''}`}
      >
        <div className="header__inner">
          <Link href="/" className="brand" aria-label={`${BRAND.name}, inicio`}>
            <Image src="/logo-mark.png" alt="" width={38} height={38} priority />
            <span className="brand__name">
              {BRAND.name}
              <span className="brand__sub">{BRAND.sub}</span>
            </span>
          </Link>

          <nav className="nav desktop-only" aria-label="Principal">
            <div className="dropdown" ref={dropRef}>
              <button
                type="button"
                className="dropdown__btn"
                data-active={pathname.startsWith('/piscinas')}
                aria-haspopup="true"
                aria-expanded={dropOpen}
                onClick={() => setDropOpen((v) => !v)}
              >
                Piscinas
                <span className="dropdown__caret" aria-hidden="true">
                  ▾
                </span>
              </button>
              {dropOpen && (
                <div className="dropdown__menu">
                  {PISCINAS_NAV.map((i) => (
                    <Link key={i.href} href={i.href} className="dropdown__item">
                      {i.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {NAV.map((i) => (
              <Link key={i.href} href={i.href} className="nav__link" data-active={active(i.href)}>
                {i.label}
              </Link>
            ))}

            <a href={BRAND.phoneHref} className="nav__tel">
              {BRAND.phoneLabel}
            </a>
            <Link href="/presupuesto" className="nav__cta">
              Pedir presupuesto
            </Link>
          </nav>

          <button
            type="button"
            className="burger mobile-only"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="menu" role="dialog" aria-modal="true" aria-label="Menú" data-lenis-prevent>
          <div className="menu__top">
            <span className="brand__name">
              {BRAND.name}
              <span className="brand__sub">{BRAND.sub}</span>
            </span>
            <button type="button" className="menu__close" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)}>
              ✕
            </button>
          </div>

          <nav className="menu__nav" aria-label="Menú móvil">
            <button type="button" className="menu__link" aria-expanded={accOpen} onClick={() => setAccOpen((v) => !v)}>
              Piscinas
              <span className="menu__toggle" aria-hidden="true">
                {accOpen ? '–' : '+'}
              </span>
            </button>
            {accOpen && (
              <div className="menu__sub">
                {PISCINAS_NAV.map((i) => (
                  <Link key={i.href} href={i.href}>
                    {i.label}
                  </Link>
                ))}
              </div>
            )}
            {NAV.map((i) => (
              <Link key={i.href} href={i.href} className="menu__link">
                {i.label}
              </Link>
            ))}
          </nav>

          <ContactCards items={['tel', 'whatsapp', 'instagram']} className="menu__cards" />

          <div className="menu__foot">
            <Link href="/presupuesto" className="btn btn--primary btn--block">
              Pedir presupuesto
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
