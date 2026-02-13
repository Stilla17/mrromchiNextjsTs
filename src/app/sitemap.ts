import { MetadataRoute } from 'next'

export const dynamic = 'force-static'  // ← Bu qatorni qo'shing

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mrromchi.uz'

  const routes = [
    '',
    '/about',
    '/products',
    '/services',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const productCategories = [
    '/products/pvx',
    '/products/alyumin',
    '/products/surma',
    '/products/fasad',
    '/products/systems',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...productCategories]
}