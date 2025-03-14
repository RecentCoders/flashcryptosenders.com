'use client'

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Web3WalletConnect } from "@/components/web3-wallet-connect"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/trading-tips", label: "Trading Tips" },
  { href: "/transfer", label: "Transfer" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const closeSheet = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="px-0 md:hidden" aria-label="Toggle Menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0 p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-moon-dust-3 dark:border-star-dust-7">
            <Link href="/" className="flex items-center" onClick={closeSheet}>
              <span className="font-bold text-lg">Flash Crypto Senders</span>
            </Link>
            <Button variant="ghost" className="px-0" onClick={closeSheet}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Add a prominent wallet connect button at the top of mobile menu */}
          <div className="p-4 border-b border-moon-dust-3 dark:border-star-dust-7">
            <Web3WalletConnect
              className="w-full bg-gecko-green hover:bg-secondary-apple-green text-white"
              buttonText="Connect Wallet"
            />
          </div>

          <div className="flex-1 overflow-auto py-4">
            <div className="flex flex-col gap-1 px-2">
              <AnimatePresence>
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center py-3 px-3 rounded-lg text-base transition-colors",
                        pathname === item.href
                          ? "bg-gecko-green/10 dark:bg-gecko-green/20 text-gecko-green dark:text-gecko-green font-medium"
                          : "hover:bg-moon-dust-2 dark:hover:bg-star-dust-8",
                      )}
                      onClick={closeSheet}
                    >
                      {item.label}
                      <ChevronRight className="ml-auto h-5 w-5 text-moon-dust-5 dark:text-star-dust-5" />
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="p-4 border-t border-moon-dust-3 dark:border-star-dust-7 mt-auto">
            <Button asChild className="w-full bg-gecko-green hover:bg-secondary-apple-green">
              <Link href="/access" onClick={closeSheet}>
                Access Now
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

