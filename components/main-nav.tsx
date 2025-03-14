"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/trading-tips", label: "Trading Tips" },
  { href: "/transfer", label: "Transfer" },
]

export function MainNav() {
  const pathname = usePathname()
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)

  return (
    <nav className="hidden md:flex items-center gap-6 text-sm">
      {navItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative px-2 py-1 transition-colors",
              isActive
                ? "text-gecko-green dark:text-gecko-green font-medium"
                : "text-foreground/70 hover:text-foreground/90",
            )}
            onMouseEnter={() => setHoveredPath(item.href)}
            onMouseLeave={() => setHoveredPath(null)}
          >
            <span className="relative z-10">{item.label}</span>

            {(hoveredPath === item.href || isActive) && (
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 w-full bg-gecko-green dark:bg-gecko-green"
                layoutId="navbar-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

