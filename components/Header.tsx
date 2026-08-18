'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND } from '@/lib/site';

const PISCINAS = [
  { href: '/piscinas', label: 'Comparar hormigón y fibra' },
  { href: '/piscinas/hormigon', label: 'Piscinas de hormigón' },
  { href: '/piscinas/fibra-de-vidrio', label: 'Piletas de fibra de vidrio' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accOpen, setAccOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Un solo listener de scroll para las tres cosas que hace el header:
   * compactarse, esconderse al bajar y dibujar la línea de avance.
   * Todo dentro de un rAF para no trabar el scroll.
   */
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const apply = () => {
      const y = window.scrollY;
      setScrolled(y > 12);

      // se esconde al bajar, vuelve apenas subís. Nunca con el menú abierto.
      if (!menuOpen) {
        const delta = y - last;
        if (y > 160 && delta > 6) setHidden(true);
        else if (delta < -6 || y <= 160) setHidden(false);
      }
      last = y;

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(y / max, 1) : 0;
      progressRef.current?.style.setProperty('--p', p.toFixed(4));

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
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
    setDropdownOpen(false);
    setAccOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isPisc = pathname.startsWith('/piscinas');
  const isObras = pathname.startsWith('/obras');
  const isAridos = pathname.startsWith('/aridos');
  const isClubes = pathname.startsWith('/clubes');

  return (
    <>
      <header
        className={`header${scrolled ? ' header--scrolled' : ''}${hidden && !menuOpen ? ' header--hidden' : ''}`}
      >
        <div className="header__inner">
          <Link href="/" className="brand" aria-label={`${BRAND.name}, inicio`}>
            <Image src="/logo-mark.png" alt="" width={40} height={40} priority style={{ height: 40, width: 'auto' }} />
            <span className="brand__name">
              {BRAND.name}
              <span className="brand__sub">{BRAND.sub}</span>
            </span>
          </Link>

          <nav className="nav desktop-only" aria-label="Principal">
            <div className="dropdown" ref={dropdownRef}>
              <button
                type="button"
                className="dropdown__btn"
                data-active={isPisc}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen((v) => !v)}
              >
                Piscinas
                <span className="dropdown__caret" aria-hidden="true">
                  ▾
                </span>
              </button>
              {dropdownOpen && (
                <div className="dropdown__menu">
                  {PISCINAS.map((i) => (
                    <Link key={i.href} href={i.href} className="dropdown__item">
                      {i.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/obras" className="nav__link" data-active={isObras}>
              Obras
            </Link>
            <Link href="/aridos-y-movimiento-de-suelos" className="nav__link" data-active={isAridos}>
              Áridos
            </Link>
            <Link href="/clubes-e-instituciones" className="nav__link" data-active={isClubes}>
              Clubes
            </Link>
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
        <span className="header__progress" ref={progressRef} aria-hidden="true" />
      </header>

      {menuOpen && (
        <div className="menu" role="dialog" aria-modal="true" aria-label="Menú">
          <div className="menu__top">
            <span className="brand__name">{BRAND.name}</span>
            <button type="button" className="menu__close" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)}>
              ✕
            </button>
          </div>
          <nav className="menu__nav" aria-label="Menú móvil">
            <button type="button" className="menu__link" aria-expanded={accOpen} onClick={() => setAccOpen((v) => !v)}>
              Piscinas
              <span style={{ fontSize: 16, color: 'var(--muted)' }} aria-hidden="true">
                {accOpen ? '–' : '+'}
              </span>
            </button>
            {accOpen && (
              <div className="menu__sub">
                {PISCINAS.map((i) => (
                  <Link key={i.href} href={i.href} onClick={() => setMenuOpen(false)}>
                    {i.label}
                  </Link>
                ))}
              </div>
            )}
            <Link href="/obras" className="menu__link" onClick={() => setMenuOpen(false)}>
              Obras
            </Link>
            <Link href="/aridos-y-movimiento-de-suelos" className="menu__link" onClick={() => setMenuOpen(false)}>
              Áridos
            </Link>
            <Link href="/clubes-e-instituciones" className="menu__link" onClick={() => setMenuOpen(false)}>
              Clubes
            </Link>
            <a href={BRAND.phoneHref} className="menu__tel">
              {BRAND.phoneLabel}
            </a>
          </nav>
          <div className="menu__foot">
            <Link href="/presupuesto" className="btn btn--primary btn--block" onClick={() => setMenuOpen(false)}>
              Pedir presupuesto
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
