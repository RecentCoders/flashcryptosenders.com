import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL
  const baseUrl = 'https://flashcryptosenders.com'
  
  // Today's date for lastModified
  const today = new Date()
  
  // Yesterday's date for slightly older content
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  // Last week's date for less frequently updated content
  const lastWeek = new Date(today)
  lastWeek.setDate(lastWeek.getDate() - 7)
  
  // Last month's date for rarely updated content
  const lastMonth = new Date(today)
  lastMonth.setMonth(lastMonth.getMonth() - 1)

  // Primary pages (higher priority)
  const primaryPages = [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/transfer`,
      lastModified: today,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: yesterday,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  // Secondary pages (medium priority)
  const secondaryPages = [
    {
      url: `${baseUrl}/about`,
      lastModified: lastWeek,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastWeek,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: lastWeek,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: yesterday,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/license-plans`,
      lastModified: lastWeek,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/step-guide`,
      lastModified: lastWeek,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trading-tips`,
      lastModified: lastWeek,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  // Tertiary pages (lower priority)
  const tertiaryPages = [
    {
      url: `${baseUrl}/support`,
      lastModified: lastWeek,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: lastMonth,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: lastMonth,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/access`,
      lastModified: lastMonth,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/offline`,
      lastModified: lastMonth,
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
  ]

  // Dynamic product pages (would normally come from a database)
  const productPages = [
    {
      url: `${baseUrl}/products/crypto-sending`,
      lastModified: yesterday,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/products/wallet-integration`,
      lastModified: yesterday,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/products/exchange-service`,
      lastModified: yesterday,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  // Return all pages combined
  return [
    ...primaryPages,
    ...secondaryPages,
    ...tertiaryPages,
    ...productPages,
  ]
}
