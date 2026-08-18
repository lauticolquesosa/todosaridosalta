import type { NextConfig } from 'next';

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
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
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
