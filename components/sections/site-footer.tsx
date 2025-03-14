import { Github, Gitlab, Youtube, MessageCircle } from "lucide-react"
import Link from "next/link"

const SOCIAL_LINKS = [
  { icon: MessageCircle, href: "https://t.me/RecentCoders", label: "Telegram Community" },
  { icon: Github, href: "https://github.com/RecentCoders", label: "GitHub" },
  { icon: Gitlab, href: "https://gitlab.com/RecentCoders", label: "GitLab" },
  { icon: Youtube, href: "https://www.youtube.com/@RecentCodersSources", label: "YouTube" },
]

const FOOTER_LINKS = {
  Products: [
    { name: "Flash BTC Sender", href: "/products/btc" },
    { name: "Flash ETH Sender", href: "/products/eth" },
    { name: "Flash USDT Sender", href: "/products/usdt" },
    { name: "All Products", href: "/products" },
  ],
  Resources: [
    { name: "Step Guide", href: "/guide" },
    { name: "Trading Tips", href: "/tips" },
    { name: "FAQ", href: "/faq" },
    { name: "Support", href: "/support" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact", href: "/contact" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Flash Crypto</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Experience lightning-fast and secure cryptocurrency transfers with our advanced Flash Crypto technology.
            </p>
            <div className="mt-6 flex space-x-4">
              {SOCIAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="h-5 w-5" aria-label={link.label} />
                </Link>
              ))}
            </div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold">{category}</h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Flash Crypto Senders. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

