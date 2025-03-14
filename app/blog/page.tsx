import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Blog | Flash Crypto Senders",
  description: "Latest news, updates, and insights about cryptocurrency transfers and blockchain technology.",
  alternates: {
    canonical: "https://flashcryptosenders.xyz/blog",
  },
}

export default function BlogPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    headline: "Flash Crypto Senders Blog",
    description: "Latest news, updates, and insights about cryptocurrency transfers and blockchain technology.",
    url: "https://flashcryptosenders.xyz/blog",
    author: {
      "@type": "Organization",
      name: "Flash Crypto Senders",
      url: "https://flashcryptosenders.xyz",
    },
    publisher: {
      "@type": "Organization",
      name: "Flash Crypto Senders",
      logo: {
        "@type": "ImageObject",
        url: "https://flashcryptosenders.xyz/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://flashcryptosenders.xyz/blog",
    },
  }

  const articles = [
    {
      id: 1,
      title: "The Future of Cryptocurrency Transfers",
      description:
        "Explore how blockchain technology is revolutionizing the way we transfer digital assets across the globe.",
      date: "May 20, 2023",
      readTime: "7 min read",
      category: "Technology",
      image: "/images/blog/crypto-future.webp",
    },
    {
      id: 2,
      title: "Security Best Practices for Crypto Transactions",
      description:
        "Learn essential security measures to protect your cryptocurrency during transfers and transactions.",
      date: "June 12, 2023",
      readTime: "5 min read",
      category: "Security",
      image: "/images/blog/crypto-security.webp",
    },
    {
      id: 3,
      title: "Understanding Flash Transactions in Cryptocurrency",
      description:
        "A deep dive into how flash transactions work and why they're changing the cryptocurrency landscape.",
      date: "July 5, 2023",
      readTime: "8 min read",
      category: "Education",
      image: "/images/blog/flash-transactions.webp",
    },
    {
      id: 4,
      title: "Regulatory Developments in Crypto Transfers",
      description: "Stay updated on the latest regulatory changes affecting cryptocurrency transfers worldwide.",
      date: "August 18, 2023",
      readTime: "6 min read",
      category: "Regulation",
      image: "/images/blog/crypto-regulation.webp",
    },
    {
      id: 5,
      title: "How Flash Crypto Senders is Transforming the Industry",
      description: "Discover the innovative features that make Flash Crypto Senders a game-changer in the market.",
      date: "September 3, 2023",
      readTime: "4 min read",
      category: "Company News",
      image: "/images/blog/company-innovation.webp",
    },
    {
      id: 6,
      title: "Comparing Transaction Speeds Across Major Cryptocurrencies",
      description:
        "An in-depth analysis of transaction speeds for Bitcoin, Ethereum, and other popular cryptocurrencies.",
      date: "October 10, 2023",
      readTime: "9 min read",
      category: "Analysis",
      image: "/images/blog/transaction-speeds.webp",
    },
  ]

  return (
    <>
      <StructuredData data={structuredData} />

      <div className="container py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Flash Crypto Senders Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Latest news, updates, and insights about cryptocurrency transfers and blockchain technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="flex flex-col h-full">
              <div className="relative">
                <Image
                  src={article.image || "/placeholder.svg?height=200&width=400"}
                  alt={article.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-3 right-3">{article.category}</Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="mb-4">{article.description}</CardDescription>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/blog/${article.id}`} className="text-blue-500 hover:text-blue-600 font-medium">
                  Read More →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

