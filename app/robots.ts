import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/api/", 
          "/admin/", 
          "/private/",
          "/*.json$",
          "/offline",
          "/*/tracking-pixel",
          "/*?source=*",
          "/*?ref=*"
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/", 
          "/admin/", 
          "/private/",
          "/*.json$",
          "/offline"
        ],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/", 
          "/admin/", 
          "/private/",
          "/*.json$",
          "/offline"
        ],
      }
    ],
    sitemap: "https://flashcryptosenders.com/sitemap.xml",
    host: "https://flashcryptosenders.com",
  }
}
