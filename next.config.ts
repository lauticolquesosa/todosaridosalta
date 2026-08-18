import type { NextConfig } from 'next';


/**
 * Politica de contenido.
 *
 * El sitio es estatico y no tiene servidor, base de datos ni contenido cargado por
 * terceros: todo el JS, el CSS, las fuentes y las fotos salen del propio dominio.
 * Por eso todas las fuentes externas quedan cerradas.
 *
 * Sobre 'unsafe-inline': Next prerenderiza y necesita scripts en linea para hidratar,
 * y el bloque de datos estructurados tambien va en linea. Sacarlo exige nonces por
 * middleware, lo que vuelve dinamica cada ruta y tira abajo el prerenderizado estatico,
 * que es lo que hace que este sitio cargue como carga. Se acepta a conciencia: sin
 * entrada de usuario que se guarde ni se muestre, la superficie de inyeccion es nula,
 * y lo que de verdad protege acá sigue activo: frame-ancestors, object-src, base-uri
 * y form-action.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: CSP },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/piscinas/fibra', destination: '/piscinas/fibra-de-vidrio', permanent: true },
      { source: '/aridos', destination: '/aridos-y-movimiento-de-suelos', permanent: true },
      { source: '/clubes', destination: '/clubes-e-instituciones', permanent: true },
      { source: '/presupuesto/hormigon', destination: '/presupuesto?tipo=hormigon', permanent: true },
      { source: '/presupuesto/fibra-de-vidrio', destination: '/presupuesto?tipo=fibra-de-vidrio', permanent: true },
    ];
  },
};

export default nextConfig;
