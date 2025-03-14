"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Web3WalletConnect } from "@/components/web3-wallet-connect"
import { motion, AnimatePresence } from "framer-motion"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      <motion.header
        className={`sticky top-0 z-50 w-full backdrop-blur transition-all duration-300 ${
          isScrolled ? "bg-white/90 dark:bg-gecko-night/90 border-b shadow-sm" : "bg-transparent border-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 mr-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 bg-gecko-green rounded-lg flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                <Zap className="h-5 w-5 text-white" />
                <div className="absolute inset-0 bg-gradient-to-tr from-gecko-green to-secondary-sushi-green opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Zap className="h-5 w-5 text-white absolute z-10" />
              </div>
              <span className="font-bold text-lg hidden sm:inline-block group-hover:text-gecko-green dark:group-hover:text-gecko-green transition-colors">
                Flash Crypto Senders
              </span>
            </Link>
          </div>
          <MainNav />
          <div className="flex items-center gap-3">
            {/* Enhanced wallet connect button with better visibility */}
            <Web3WalletConnect
              buttonVariant="outline"
              buttonSize="sm"
              className="hidden md:flex border-gecko-green text-gecko-green hover:bg-gecko-green/10"
            />
            <ThemeToggle />
            <Button asChild className="bg-gecko-green hover:bg-secondary-apple-green hidden sm:flex">
              <Link href="/access">Access Now</Link>
            </Button>
            <MobileNav />
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  )
}

