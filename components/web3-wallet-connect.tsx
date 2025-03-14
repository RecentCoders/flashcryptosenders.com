"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { WalletIcon, ChevronRight, AlertCircle, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

// Define supported wallet types with improved icons and descriptions
const WALLETS = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "/images/wallets/metamask-icon.svg",
    description: "Connect to your MetaMask wallet",
    isPopular: true,
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "/images/wallets/walletconnect-icon.svg",
    description: "Scan with WalletConnect to connect",
    isPopular: true,
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "/images/wallets/coinbase-icon.svg",
    description: "Connect to your Coinbase Wallet",
  },
  {
    id: "trust",
    name: "Trust Wallet",
    icon: "/images/wallets/trust-wallet-icon.svg",
    description: "Connect to your Trust Wallet",
  },
  {
    id: "ledger",
    name: "Ledger",
    icon: "/images/wallets/ledger-icon.svg",
    description: "Connect to your Ledger hardware wallet",
  },
]

interface Web3WalletConnectProps {
  onConnect?: (wallet: string, address: string) => void
  buttonText?: string
  buttonVariant?: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function Web3WalletConnect({
  onConnect,
  buttonText = "Connect Wallet",
  buttonVariant = "default",
  buttonSize = "default",
  className,
}: Web3WalletConnectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "connecting" | "connected" | "failed">("idle")
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isWeb3Available, setIsWeb3Available] = useState(false)
  const [connectedWalletType, setConnectedWalletType] = useState<string | null>(null)

  // Check if Web3 is available on component mount
  useEffect(() => {
    const checkWeb3 = () => {
      const isMetaMaskAvailable = typeof window !== "undefined" && window.ethereum !== undefined
      setIsWeb3Available(isMetaMaskAvailable)

      // Check if already connected
      if (isMetaMaskAvailable && window.ethereum.selectedAddress) {
        setWalletAddress(window.ethereum.selectedAddress)
        setConnectionStatus("connected")
        setConnectedWalletType("metamask")
      }
    }

    checkWeb3()
  }, [])

  // Handle wallet connection
  const connectWallet = async (walletId: string) => {
    setConnectingWallet(walletId)
    setConnectionStatus("connecting")

    try {
      if (walletId === "metamask") {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

          if (accounts.length > 0) {
            const address = accounts[0]
            setWalletAddress(address)
            setConnectionStatus("connected")
            setConnectedWalletType(walletId)
            onConnect?.(walletId, address)

            toast({
              title: "Wallet Connected",
              description: `Successfully connected to ${shortenAddress(address)}`,
              variant: "success",
            })

            setTimeout(() => {
              setIsOpen(false)
            }, 1500)
          }
        } else {
          throw new Error("MetaMask not installed")
        }
      } else if (walletId === "walletconnect") {
        // Simulate WalletConnect
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const mockAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
        setWalletAddress(mockAddress)
        setConnectionStatus("connected")
        setConnectedWalletType(walletId)
        onConnect?.(walletId, mockAddress)

        toast({
          title: "Wallet Connected",
          description: `Successfully connected to ${shortenAddress(mockAddress)}`,
          variant: "success",
        })

        setTimeout(() => {
          setIsOpen(false)
        }, 1500)
      } else {
        // For other wallets (simulated)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        throw new Error("Wallet connection not implemented yet")
      }
    } catch (error) {
      console.error("Wallet connection error:", error)
      setConnectionStatus("failed")

      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect wallet",
        variant: "destructive",
      })
    } finally {
      setTimeout(() => {
        setConnectingWallet(null)
      }, 1000)
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletAddress(null)
    setConnectionStatus("idle")
    setConnectedWalletType(null)

    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  // Helper function to shorten address
  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Get wallet icon based on connected wallet type
  const getWalletIcon = () => {
    if (!connectedWalletType) return null
    const wallet = WALLETS.find((w) => w.id === connectedWalletType)
    return wallet?.icon || null
  }

  return (
    <>
      {connectionStatus === "connected" && walletAddress ? (
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center gap-2 border-gecko-green hover:bg-gecko-green/10 ${className}`}
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center">
            {getWalletIcon() && (
              <Image
                src={getWalletIcon() || ""}
                alt={connectedWalletType || "wallet"}
                width={16}
                height={16}
                className="mr-1.5"
              />
            )}
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1.5"></div>
            {shortenAddress(walletAddress)}
          </div>
        </Button>
      ) : (
        <Button
          variant={buttonVariant}
          size={buttonSize}
          className={`${className} group transition-all duration-300 hover:scale-105`}
          onClick={() => setIsOpen(true)}
        >
          <WalletIcon className="mr-2 h-4 w-4 group-hover:animate-pulse" /> {buttonText}
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {connectionStatus === "connected"
                ? "Wallet Connected"
                : connectionStatus === "connecting"
                  ? "Connecting Wallet"
                  : "Connect Wallet"}
            </DialogTitle>
            <DialogDescription>
              {connectionStatus === "connected"
                ? "Your wallet is connected to Flash Crypto Senders"
                : "Connect your wallet to make direct cryptocurrency payments"}
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {connectionStatus === "connected" && walletAddress ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Connected to Wallet</h3>
                <div className="flex items-center justify-center mb-2">
                  {getWalletIcon() && (
                    <Image
                      src={getWalletIcon() || ""}
                      alt={connectedWalletType || "wallet"}
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                  )}
                  <span className="font-medium">
                    {WALLETS.find((w) => w.id === connectedWalletType)?.name || "Wallet"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Your wallet address: <span className="font-mono">{shortenAddress(walletAddress)}</span>
                </p>
                <Button variant="destructive" onClick={disconnectWallet}>
                  Disconnect Wallet
                </Button>
              </motion.div>
            ) : connectionStatus === "connecting" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Connecting to {WALLETS.find((w) => w.id === connectingWallet)?.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">Please confirm the connection in your wallet</p>
                <Button variant="outline" onClick={() => setConnectionStatus("idle")}>
                  Cancel
                </Button>
              </motion.div>
            ) : connectionStatus === "failed" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Connection Failed</h3>
                <p className="text-sm text-gray-500 mb-4">
                  There was an error connecting to your wallet. Please try again.
                </p>
                <Button onClick={() => setConnectionStatus("idle")}>Try Again</Button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {!isWeb3Available && (
                  <Card className="mb-4 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
                    <div className="flex gap-3 p-4">
                      <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-orange-600 dark:text-orange-400">No Web3 Wallet Detected</h4>
                        <p className="text-sm text-orange-700 dark:text-orange-300">
                          Install MetaMask or another Web3 wallet to enable this feature
                        </p>
                      </div>
                    </div>
                  </Card>
                )}

                <div className="grid gap-4 py-4">
                  {WALLETS.map((wallet) => (
                    <Button
                      key={wallet.id}
                      variant="outline"
                      className="flex items-center justify-between h-auto p-4 hover:border-gecko-green hover:bg-gecko-green/5 transition-all duration-300"
                      onClick={() => connectWallet(wallet.id)}
                      disabled={connectionStatus === "connecting" || !isWeb3Available}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 mr-3">
                          <Image
                            src={wallet.icon || "/placeholder.svg"}
                            alt={wallet.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center">
                            <span className="font-medium">{wallet.name}</span>
                            {wallet.isPopular && (
                              <span className="ml-2 text-xs bg-gecko-green/20 text-gecko-green dark:bg-gecko-green/30 dark:text-gecko-green px-2 py-0.5 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{wallet.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  )
}

