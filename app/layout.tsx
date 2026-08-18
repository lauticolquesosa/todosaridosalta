import type { Metadata, Viewport } from 'next';
import { Archivo, Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Reveal from '@/components/Reveal';
import { BRAND, SITE_URL } from '@/lib/site';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-archivo',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Construcción de piscinas en Salta · Todo Áridos Salta',
    template: '%s · Todo Áridos Salta',
  },
  description:
    'Construcción de piscinas de hormigón y fibra de vidrio en Salta, con equipos propios de movimiento de suelos. Hacemos el pozo y hacemos la pileta.',
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name }],
  keywords: [
    'piscinas Salta',
    'piletas Salta',
    'construcción de piscinas',
    'piscinas de hormigón',
    'piletas de fibra de vidrio',
    'movimiento de suelos Salta',
    'áridos Salta',
    'arena y ripio Salta',
    'San Lorenzo',
    'Vaqueros',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_URL,
    siteName: BRAND.name,
    title: 'Construcción de piscinas en Salta · Todo Áridos Salta',
    description:
      'Movimiento de suelos y construcción de piscinas en Salta. Un solo equipo desde la excavación hasta el día que la llenás.',
    images: [{ url: '/img/og.jpg', width: 1200, height: 630, alt: 'Pileta terminada en Salta' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Construcción de piscinas en Salta · Todo Áridos Salta',
    description: 'Movimiento de suelos y construcción de piscinas en Salta.',
    images: ['/img/og.jpg'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/icon.png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#f4f2ee',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: BRAND.name,
  alternateName: BRAND.legalName,
  description:
    'Construcción de piscinas de hormigón y fibra de vidrio, venta de áridos y movimiento de suelos en Salta, Argentina.',
  url: SITE_URL,
  telephone: '+543875722206',
  foundingDate: BRAND.founded,
  image: `${SITE_URL}/img/og.jpg`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Salta',
    addressRegion: 'Salta',
    addressCountry: 'AR',
  },
  areaServed: ['Salta capital', 'San Lorenzo', 'Vaqueros', 'Zona sur de Salta'].map((name) => ({
    '@type': 'City',
    name,
  })),
  sameAs: [BRAND.instagram, BRAND.facebook],
  makesOffer: [
    'Construcción de piscinas de hormigón',
    'Instalación de piletas de fibra de vidrio',
    'Venta de áridos',
    'Movimiento de suelos',
  ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${archivo.variable} ${inter.variable}`}>
      <head>
        {/* Sin JS no corre el IntersectionObserver: el contenido se muestra igual. */}
        <noscript>
          <style>{'.reveal{opacity:1!important;transform:none!important}'}</style>
        </noscript>
      </head>
      <body>
        <a className="skip" href="#main">
          Saltar al contenido
        </a>
        <Header />
        <main id="main" style={{ paddingTop: 'var(--header-h)' }}>
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <Reveal />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
