"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Web3WalletConnect } from "@/components/web3-wallet-connect"
import { toast } from "@/hooks/use-toast"
import { Zap, CheckCircle, ArrowRightLeft, Clock, Loader2 } from "lucide-react"

interface CryptoTransferCardProps {
  cryptoType: "BTC" | "ETH" | "USDT"
  className?: string
}

export function CryptoTransferCard({ cryptoType, className }: CryptoTransferCardProps) {
  const [amount, setAmount] = useState("")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [transferSpeed, setTransferSpeed] = useState("flash")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [transferComplete, setTransferComplete] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [walletType, setWalletType] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getCryptoIcon = () => {
    switch (cryptoType) {
      case "BTC":
        return "/images/crypto/bitcoin.svg"
      case "ETH":
        return "/images/crypto/ethereum.svg"
      case "USDT":
        return "/images/crypto/usdt.svg"
      default:
        return "/images/crypto/bitcoin.svg"
    }
  }

  const getNetwork = () => {
    switch (cryptoType) {
      case "BTC":
        return "Bitcoin Network"
      case "ETH":
        return "Ethereum Network"
      case "USDT":
        return [
          { value: "trc20", label: "TRC20 (Tron)" },
          { value: "erc20", label: "ERC20 (Ethereum)" },
          { value: "bep20", label: "BEP20 (BSC)" },
        ]
      default:
        return "Bitcoin Network"
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numeric input with up to 8 decimal places
    if (value === "" || /^\d*\.?\d{0,8}$/.test(value)) {
      setAmount(value)
    }
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientAddress(e.target.value)
  }

  const handleWalletConnect = (wallet: string, address: string) => {
    setIsAuthenticated(true)
    toast({
      title: "Wallet Connected",
      description: `${wallet} wallet connected successfully`,
    })
  }

  const handleTransfer = () => {
    // Validate inputs
    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to transfer",
        variant: "destructive",
      })
      return
    }

    if (!recipientAddress) {
      toast({
        title: "Missing Address",
        description: "Please enter a recipient address",
        variant: "destructive",
      })
      return
    }

    // Simulate transfer
    setIsLoading(true)
    setIsSubmitting(true)

    // Show success after 2 seconds (simulating blockchain confirmation)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitting(false)
      setTransferComplete(true)

      toast({
        title: "Transfer Complete",
        description: `Successfully sent ${amount} ${cryptoType} to ${recipientAddress.substring(0, 8)}...`,
      })

      // Reset form after 3 seconds
      setTimeout(() => {
        setAmount("")
        setRecipientAddress("")
        setTransferComplete(false)
      }, 3000)
    }, 2000)
  }

  return (
    <Card className={`overflow-hidden border border-gray-200 dark:border-gray-800 ${className}`}>
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full p-1.5 flex-shrink-0">
            <Image
              src={getCryptoIcon() || "/placeholder.svg"}
              alt={`${cryptoType} Icon`}
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <div>
            <CardTitle>Flash {cryptoType} Sender</CardTitle>
            <CardDescription className="text-blue-100">Send {cryptoType} instantly with minimal fees</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {transferComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-8"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Transfer Complete!</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Your {cryptoType} has been sent successfully</p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-left w-full mb-6">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">Amount:</div>
                <div className="text-sm font-medium text-right">
                  {amount} {cryptoType}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Recipient:</div>
                <div className="text-sm font-medium text-right overflow-hidden text-ellipsis">
                  {recipientAddress.substring(0, 8)}...{recipientAddress.substring(recipientAddress.length - 6)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Transfer Type:</div>
                <div className="text-sm font-medium text-right">Flash Transfer</div>
              </div>
            </div>
            <Button onClick={() => setTransferComplete(false)} variant="outline">
              New Transfer
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {!walletConnected && (
              <div className="mb-4 p-4 bg-gecko-green/10 rounded-lg border border-gecko-green/20">
                <p className="text-sm mb-2">Connect your wallet to complete this transaction</p>
                <Web3WalletConnect
                  className="w-full"
                  buttonText="Connect Wallet to Transfer"
                  onConnect={(wallet, address) => {
                    setWalletConnected(true)
                    setWalletAddress(address)
                    setWalletType(wallet)
                  }}
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount to Send</Label>
                <div className="flex">
                  <Input
                    id="amount"
                    placeholder="0.00"
                    value={amount}
                    onChange={handleAmountChange}
                    disabled={!isAuthenticated || isLoading}
                    className="rounded-r-none"
                  />
                  <div className="flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-800 border border-l-0 border-input rounded-r-md">
                    <div className="flex items-center gap-2">
                      <Image
                        src={getCryptoIcon() || "/placeholder.svg"}
                        alt={cryptoType}
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                      <span className="font-medium">{cryptoType}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Address</Label>
                <Input
                  id="recipient"
                  placeholder={`Enter ${cryptoType} address`}
                  value={recipientAddress}
                  onChange={handleAddressChange}
                  disabled={!isAuthenticated || isLoading}
                />
              </div>

              {cryptoType === "USDT" && (
                <div className="space-y-2">
                  <Label htmlFor="network">Network</Label>
                  <Select defaultValue="trc20" disabled={!isAuthenticated || isLoading}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Network" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(getNetwork()) &&
                        getNetwork().map((network: any) => (
                          <SelectItem key={network.value} value={network.value}>
                            {network.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="speed">Transfer Speed</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant={transferSpeed === "flash" ? "default" : "outline"}
                    className={`flex flex-col h-20 items-center justify-center space-y-1 ${
                      transferSpeed === "flash" ? "bg-blue-600" : ""
                    }`}
                    onClick={() => setTransferSpeed("flash")}
                    disabled={!isAuthenticated || isLoading}
                  >
                    <Zap className="h-5 w-5" />
                    <span>Flash</span>
                    <span className="text-xs opacity-70">~5 seconds</span>
                  </Button>
                  <Button
                    type="button"
                    variant={transferSpeed === "standard" ? "default" : "outline"}
                    className={`flex flex-col h-20 items-center justify-center space-y-1 ${
                      transferSpeed === "standard" ? "bg-blue-600" : ""
                    }`}
                    onClick={() => setTransferSpeed("standard")}
                    disabled={!isAuthenticated || isLoading}
                  >
                    <ArrowRightLeft className="h-5 w-5" />
                    <span>Standard</span>
                    <span className="text-xs opacity-70">~30 seconds</span>
                  </Button>
                  <Button
                    type="button"
                    variant={transferSpeed === "economy" ? "default" : "outline"}
                    className={`flex flex-col h-20 items-center justify-center space-y-1 ${
                      transferSpeed === "economy" ? "bg-blue-600" : ""
                    }`}
                    onClick={() => setTransferSpeed("economy")}
                    disabled={!isAuthenticated || isLoading}
                  >
                    <Clock className="h-5 w-5" />
                    <span>Economy</span>
                    <span className="text-xs opacity-70">~2 minutes</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-6 border-t border-gray-200 dark:border-gray-800">
        {!transferComplete && (
          <Button
            className="w-full bg-gecko-green hover:bg-secondary-apple-green"
            disabled={isSubmitting || !walletConnected}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              "Transfer Now"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

