import { MetadataRoute } from 'next'
import { baseUrl, locales } from '@/lib/seo'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: {
        languages: {
          uz: `${baseUrl}/uz`,
          ru: `${baseUrl}/ru`,
          en: `${baseUrl}/en`,
        },
      },
    }))

}
