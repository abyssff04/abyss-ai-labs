import type { MetadataRoute } from 'next';

/**
 * app/sitemap.ts
 *
 * Generates /sitemap.xml automatically via Next.js App Router.
 * Update SITE_URL to your production domain before deploying.
 *
 * Verify at: https://yourdomain.com/sitemap.xml
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://abyssailabs.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];
}
