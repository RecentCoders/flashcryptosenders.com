import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Flash Crypto Senders",
    short_name: "Flash Crypto",
    description: "Lightning-fast and secure cryptocurrency transactions",
    start_url: "/",
    display: "standalone",
    background_color: "#121212",
    theme_color: "#3366ff",
    orientation: "portrait",
    scope: "/",
    id: "com.flashcryptosenders",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple"
      },
    ],
    screenshots: [
      {
        src: "/screenshots/mobile-1.jpg",
        sizes: "750x1334",
        type: "image/jpeg",
        platform: "narrow",
        label: "Crypto Sending Dashboard"
      },
      {
        src: "/screenshots/desktop-1.jpg",
        sizes: "1920x1080",
        type: "image/jpeg",
        platform: "wide",
        label: "Service Features"
      }
    ],
    categories: ["finance", "crypto", "blockchain"],
    dir: "ltr",
    lang: "en-US",
    prefer_related_applications: false
  }
}
