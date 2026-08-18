import type { MetadataRoute } from 'next';
import { OBRAS, SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const paths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1, freq: 'monthly' },
    { path: '/piscinas', priority: 0.9, freq: 'monthly' },
    { path: '/piscinas/hormigon', priority: 0.9, freq: 'monthly' },
    { path: '/piscinas/fibra-de-vidrio', priority: 0.9, freq: 'monthly' },
    { path: '/obras', priority: 0.8, freq: 'weekly' },
    { path: '/aridos-y-movimiento-de-suelos', priority: 0.8, freq: 'monthly' },
    { path: '/clubes-e-instituciones', priority: 0.6, freq: 'yearly' },
    { path: '/presupuesto', priority: 0.7, freq: 'yearly' },
    { path: '/privacidad', priority: 0.2, freq: 'yearly' },
    { path: '/terminos', priority: 0.2, freq: 'yearly' },
  ];

  return [
    ...paths.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...OBRAS.map((o) => ({
      url: `${SITE_URL}/obras/${o.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
