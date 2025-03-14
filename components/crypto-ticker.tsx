"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"

interface CryptoData {
  symbol: string
  price: number
  change: number
}

export function CryptoTicker() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([
    { symbol: "BTC/USD", price: 65432.1, change: 2.34 },
    { symbol: "ETH/USD", price: 3456.78, change: 1.23 },
    { symbol: "USDT/USD", price: 1.0, change: 0.01 },
    { symbol: "BNB/USD", price: 567.89, change: -0.45 },
    { symbol: "SOL/USD", price: 123.45, change: 3.67 },
    { symbol: "XRP/USD", price: 0.5678, change: -1.23 },
    { symbol: "ADA/USD", price: 0.4567, change: 0.89 },
    { symbol: "DOGE/USD", price: 0.1234, change: 5.67 },
  ])

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData((prevData) =>
        prevData.map((crypto) => ({
          ...crypto,
          price: Number.parseFloat(
            (crypto.price * (1 + (Math.random() * 0.01 - 0.005))).toFixed(crypto.price < 1 ? 4 : 2),
          ),
          change: Number.parseFloat((crypto.change + (Math.random() * 0.2 - 0.1)).toFixed(2)),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gecko-night text-white py-2 overflow-hidden border-b border-star-dust-8">
      <div className="relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap"
        >
          {[...cryptoData, ...cryptoData].map((crypto, index) => (
            <div key={index} className="flex items-center mx-6">
              <span className="font-medium">{crypto.symbol}</span>
              <span className="ml-2">${crypto.price.toLocaleString()}</span>
              <span
                className={`ml-2 flex items-center ${crypto.change >= 0 ? "text-semantic-success" : "text-semantic-danger"}`}
              >
                {crypto.change >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {crypto.change >= 0 ? "+" : ""}
                {crypto.change}%
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

