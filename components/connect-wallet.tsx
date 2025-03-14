"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"

const WALLETS = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "/icons/metamask.svg",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "/icons/walletconnect.svg",
  },
]

export function ConnectWallet() {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async (walletId: string) => {
    setIsConnecting(true)
    try {
      // Implement Web3 wallet connection logic here
      console.log(`Connecting to ${walletId}`)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-green-600 hover:bg-green-700">
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {WALLETS.map((wallet) => (
            <Button
              key={wallet.id}
              variant="outline"
              className="flex items-center gap-3 h-14"
              disabled={isConnecting}
              onClick={() => handleConnect(wallet.id)}
            >
              <Image
                src={wallet.icon || "/placeholder.svg"}
                alt={wallet.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span>Connect with {wallet.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

