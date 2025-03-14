import Link from "next/link"
import { Twitter, Zap, Shield, ExternalLink } from "lucide-react"
import { GeckoMascot } from "@/components/gecko-mascot"
import { FaTelegram, FaDiscord, FaYoutube } from "react-icons/fa"

export function SiteFooter() {
  return (
    <footer className="bg-moon-dust-2 dark:bg-star-dust-9 border-t border-moon-dust-3 dark:border-star-dust-7">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gecko-green rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">Flash Crypto Senders</span>
            </Link>
            <p className="text-moon-dust-7 dark:text-star-dust-3 mb-4 max-w-md">
              Experience lightning-fast and secure cryptocurrency transactions with our industry-leading technology.
              Send crypto in seconds, not hours.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <Link
                href="https://t.me/RecentCoders"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaTelegram className="h-5 w-5" />
                <span>Join our Telegram</span>
              </Link>
              <Link
                href="https://docs.flashcryptosenders.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-gecko-green text-white rounded-lg hover:bg-secondary-apple-green transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Documentation</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-gecko-green mt-0.5" />
                <div>
                  <h4 className="font-medium">Secure Transactions</h4>
                  <p className="text-sm text-moon-dust-6 dark:text-star-dust-4">Military-grade encryption</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="h-5 w-5 text-gecko-green mt-0.5" />
                <div>
                  <h4 className="font-medium">Instant Transfers</h4>
                  <p className="text-sm text-moon-dust-6 dark:text-star-dust-4">Send in seconds, not hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products/flash-btc-sender"
                  className="text-moon-dust-7 dark:text-star-dust-3 hover:text-gecko-green dark:hover:text-gecko-green transition-colors"
                >
                  Flash BTC Sender
                </Link>
              </li>
              <li>
                <Link
                  href="/products/flash-eth-sender"
                  className="text-moon-dust-7 dark:text-star-dust-3 hover:text-gecko-green dark:hover:text-gecko-green transition-colors"
                >
                  Flash ETH Sender
                </Link>
              </li>
              <li>
                <Link
                  href="/products/flash-usdt-sender"
                  className="text-moon-dust-7 dark:text-star-dust-3 hover:text-gecko-green dark:hover:text-gecko-green transition-colors"
                >
                  Flash USDT Sender
                </Link>
              </li>
              <li>
                <Link
                  href="/license-plans"
                  className="text-moon-dust-7 dark:text-star-dust-3 hover:text-gecko-green dark:hover:text-gecko-green transition-colors"
                >
                  License Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-moon-dust-7 dark:text-star-dust-3 hover:text-gecko-green dark:hover:text-gecko-green transition-colors font-medium"
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/step-guide"
                  className="text-moon-dust-7 dark:text-star-dust-3 hover:text-gecko-green dark:hover:text-gecko-green transition-colors"
                >
                  Step Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/trading-tips"
                  className="text-moon-dust-7 dark:text-star-dust-3 hover:text-gecko-green dark:hover:text-gecko-green transition-colors"
                >
                  Trading Tips
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-moon-dust-7 dark:text-star-dust-3 hover:text-gecko-green dark:hover:text-gecko-green transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="https://docs.flashcryptosenders.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-moon-dust-7 dark:text-star-dust-3 hover:text-gecko-green dark:hover:text-gecko-green transition-colors"
                >
                  Documentation <ExternalLink className="inline h-3 w-3" />
                </a>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-moon-dust-7 dark:text-star-dust-3 hover:text-gecko-green dark:hover:text-gecko-green transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <Link
                  href="/about"
                  className="text-moon-dust-7 dark:text-star-dust-3 hover:text-gecko-green dark:hover:text-gecko-green transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-moon-dust-7 dark:text-star-dust-3 hover:text-gecko-green dark:hover:text-gecko-green transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-moon-dust-7 dark:text-star-dust-3 hover:text-gecko-green dark:hover:text-gecko-green transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-moon-dust-7 dark:text-star-dust-3 hover:text-gecko-green dark:hover:text-gecko-green transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <h3 className="font-bold text-lg mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://t.me/RecentCoders"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                aria-label="Telegram"
              >
                <FaTelegram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/FlashCrypto"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/flashcrypto"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#5865F2] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                aria-label="Discord"
              >
                <FaDiscord className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/channel/flashcrypto"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#FF0000] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                aria-label="YouTube"
              >
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-12 pt-8 border-t border-moon-dust-3 dark:border-star-dust-7">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-star-dust-8 p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-gecko-green mb-2 flex items-center">
                <Zap className="h-4 w-4 mr-1" /> Flash BTC Sender
              </h4>
              <p className="text-sm text-moon-dust-7 dark:text-star-dust-3 mb-2">
                Send Bitcoin instantly with our secure, lightning-fast platform.
              </p>
              <Link href="/products/flash-btc-sender" className="text-sm text-gecko-green font-medium hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="bg-white dark:bg-star-dust-8 p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-gecko-green mb-2 flex items-center">
                <Zap className="h-4 w-4 mr-1" /> Flash USDT Sender
              </h4>
              <p className="text-sm text-moon-dust-7 dark:text-star-dust-3 mb-2">
                Transfer USDT across multiple chains with minimal fees.
              </p>
              <Link href="/products/flash-usdt-sender" className="text-sm text-gecko-green font-medium hover:underline">
                Learn more →
              </Link>
            </div>

            <div className="bg-white dark:bg-star-dust-8 p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-gecko-green mb-2 flex items-center">
                <Zap className="h-4 w-4 mr-1" /> Flash ETH Sender (Beta)
              </h4>
              <p className="text-sm text-moon-dust-7 dark:text-star-dust-3 mb-2">
                Try our new Ethereum transfer service with advanced features.
              </p>
              <Link href="/products/flash-eth-sender" className="text-sm text-gecko-green font-medium hover:underline">
                Learn more →
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-moon-dust-6 dark:text-star-dust-4">
              © {new Date().getFullYear()} Flash Crypto Senders. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/terms"
                className="text-sm text-moon-dust-6 dark:text-star-dust-4 hover:text-gecko-green transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-moon-dust-6 dark:text-star-dust-4 hover:text-gecko-green transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/support"
                className="text-sm text-moon-dust-6 dark:text-star-dust-4 hover:text-gecko-green transition-colors"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-10 hidden md:block">
        <a href="https://t.me/RecentCoders" target="_blank" rel="noopener noreferrer">
          <GeckoMascot variant="feedback" size="md" message="Need help? Chat with us!" />
        </a>
      </div>
    </footer>
  )
}

