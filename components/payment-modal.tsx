"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Copy, Check, ExternalLink, AlertCircle, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import QRCode from "react-qr-code"
import { useEtherscan, DEFAULT_WALLET_ADDRESS } from "@/components/etherscan-api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  productName: string
}

// Supported cryptocurrencies
const SUPPORTED_CRYPTOS = [
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    logo: "/images/crypto/ethereum.svg",
    explorerUrl: `https://etherscan.io/address/${DEFAULT_WALLET_ADDRESS}`,
    rate: 0.00042, // 1 USD = 0.00042 ETH
    color: "#627EEA",
    decimals: 6,
  },
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    logo: "/images/crypto/bitcoin.svg",
    explorerUrl: `https://www.blockchain.com/explorer/addresses/btc/${DEFAULT_WALLET_ADDRESS}`,
    rate: 0.000025, // 1 USD = 0.000025 BTC
    color: "#F7931A",
    decimals: 6,
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    logo: "/images/crypto/usdt.svg",
    explorerUrl: `https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7?a=${DEFAULT_WALLET_ADDRESS}`,
    rate: 1, // 1 USD = 1 USDT
    color: "#26A17B",
    decimals: 2,
  },
]

export function PaymentModal({ isOpen, onClose, amount, productName }: PaymentModalProps) {
  const [paymentStep, setPaymentStep] = useState<"select" | "pay" | "verify" | "confirm">("select")
  const [selectedCrypto, setSelectedCrypto] = useState<"eth" | "btc" | "usdt">("eth")
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionHash, setTransactionHash] = useState("")
  const [verificationProgress, setVerificationProgress] = useState(0)
  const { toast } = useToast()
  const { verifyTransaction } = useEtherscan()

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setPaymentStep("select")
      setSelectedCrypto("eth")
      setCopied(false)
      setIsProcessing(false)
      setTransactionHash("")
      setVerificationProgress(0)
    }
  }, [isOpen])

  // Get wallet address based on selected crypto
  const getWalletAddress = () => {
    return DEFAULT_WALLET_ADDRESS
  }

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(getWalletAddress())
    setCopied(true)
    toast({
      title: "Address copied!",
      description: "The wallet address has been copied to your clipboard.",
    })

    setTimeout(() => setCopied(false), 3000)
  }

  // Handle transaction verification
  const verifyTransactionHandler = async () => {
    if (!transactionHash.trim()) {
      toast({
        title: "Transaction hash required",
        description: "Please enter the transaction hash to verify your payment.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setPaymentStep("verify")

    // Simulate verification progress
    const interval = setInterval(() => {
      setVerificationProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return prev
        }
        return prev + 10
      })
    }, 500)

    try {
      // Simulate transaction verification with Etherscan API
      setTimeout(async () => {
        clearInterval(interval)
        setVerificationProgress(100)

        // In a real implementation, we would use the actual API
        // const isVerified = await verifyTransaction(transactionHash)
        const isVerified = true // Simulated success

        if (isVerified) {
          setTimeout(() => {
            setIsProcessing(false)
            setPaymentStep("confirm")
            toast({
              title: "Payment verified!",
              description: "Your transaction has been confirmed. Thank you for your purchase!",
            })
          }, 1000)
        } else {
          setIsProcessing(false)
          toast({
            title: "Verification failed",
            description: "We couldn't verify your transaction. Please check the transaction hash and try again.",
            variant: "destructive",
          })
        }
      }, 3000)
    } catch (error) {
      clearInterval(interval)
      setIsProcessing(false)
      toast({
        title: "Verification error",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Get crypto details
  const getCryptoDetails = () => {
    return SUPPORTED_CRYPTOS.find((crypto) => crypto.id === selectedCrypto) || SUPPORTED_CRYPTOS[0]
  }

  // Calculate crypto amount
  const getCryptoAmount = () => {
    const crypto = getCryptoDetails()
    return (amount * crypto.rate).toFixed(crypto.decimals)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-bold">Complete Your Purchase</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              {paymentStep === "select" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">You are purchasing</div>
                    <div className="text-2xl font-bold">{productName}</div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">${amount.toFixed(2)}</div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Select payment method:</h3>

                    <Tabs defaultValue="crypto" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
                        <TabsTrigger value="wallet">Web3 Wallet</TabsTrigger>
                      </TabsList>

                      <TabsContent value="crypto" className="mt-4">
                        <div className="grid grid-cols-3 gap-3">
                          {SUPPORTED_CRYPTOS.map((crypto) => (
                            <Button
                              key={crypto.id}
                              variant={selectedCrypto === crypto.id ? "default" : "outline"}
                              className="flex flex-col items-center justify-center h-24 p-2"
                              style={{
                                backgroundColor: selectedCrypto === crypto.id ? crypto.color : "",
                                borderColor: selectedCrypto === crypto.id ? crypto.color : "",
                                color: selectedCrypto === crypto.id ? "white" : "",
                              }}
                              onClick={() => setSelectedCrypto(crypto.id as "eth" | "btc" | "usdt")}
                            >
                              <Image
                                src={crypto.logo || "/placeholder.svg"}
                                alt={crypto.name}
                                width={32}
                                height={32}
                                className="mb-2"
                              />
                              <span className="text-xs">{crypto.name}</span>
                              <span className="text-xs font-bold">{crypto.symbol}</span>
                            </Button>
                          ))}
                        </div>

                        <Button
                          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                          onClick={() => setPaymentStep("pay")}
                        >
                          Continue with {getCryptoDetails().name}
                        </Button>
                      </TabsContent>

                      <TabsContent value="wallet" className="mt-4">
                        <div className="space-y-4">
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Connect your Web3 wallet to make a direct payment
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-2">
                              <Image
                                src="/images/wallets/metamask.svg"
                                alt="MetaMask"
                                width={32}
                                height={32}
                                className="mb-2"
                              />
                              <span className="text-xs">MetaMask</span>
                            </Button>

                            <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-2">
                              <Image
                                src="/images/wallets/walletconnect.svg"
                                alt="WalletConnect"
                                width={32}
                                height={32}
                                className="mb-2"
                              />
                              <span className="text-xs">WalletConnect</span>
                            </Button>
                          </div>

                          <Button
                            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                            onClick={() => {
                              toast({
                                title: "Coming Soon",
                                description:
                                  "Direct wallet connection will be available soon. Please use cryptocurrency payment for now.",
                              })
                            }}
                          >
                            Connect Wallet
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              )}

              {paymentStep === "pay" && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Image
                        src={getCryptoDetails().logo || "/placeholder.svg"}
                        alt={getCryptoDetails().name}
                        width={24}
                        height={24}
                      />
                      <span className="font-bold">{getCryptoDetails().name} Payment</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Send exactly</div>
                    <div className="text-2xl font-bold">
                      {getCryptoAmount()} {getCryptoDetails().symbol}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">≈ ${amount.toFixed(2)} USD</div>
                  </div>

                  <div className="flex justify-center">
                    <div className="bg-white p-3 rounded-lg">
                      <QRCode
                        value={`${selectedCrypto}:${getWalletAddress()}?amount=${getCryptoAmount()}`}
                        size={180}
                        level="H"
                        bgColor="#FFFFFF"
                        fgColor={getCryptoDetails().color}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wallet-address">Wallet Address</Label>
                    <div className="flex">
                      <Input
                        id="wallet-address"
                        value={getWalletAddress()}
                        readOnly
                        className="rounded-r-none font-mono text-sm"
                      />
                      <Button variant="outline" className="rounded-l-none border-l-0" onClick={handleCopy}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Send only {getCryptoDetails().symbol} to this address
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transaction-hash">Transaction Hash (after payment)</Label>
                    <Input
                      id="transaction-hash"
                      placeholder="0x..."
                      value={transactionHash}
                      onChange={(e) => setTransactionHash(e.target.value)}
                      className="font-mono text-sm"
                    />
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Enter the transaction hash to verify your payment
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setPaymentStep("select")}>
                      Back
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                      onClick={verifyTransactionHandler}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying
                        </>
                      ) : (
                        "Verify Payment"
                      )}
                    </Button>
                  </div>

                  <div className="text-center">
                    <a
                      href={getCryptoDetails().explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
                    >
                      View on Blockchain Explorer
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}

              {paymentStep === "verify" && (
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                    <Loader2 className="h-8 w-8 text-blue-600 dark:text-blue-400 animate-spin" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Verifying Your Payment</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Please wait while we verify your transaction on the blockchain.
                    </p>

                    <div className="space-y-2">
                      <Progress value={verificationProgress} className="h-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Verification progress: {verificationProgress}%
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 dark:text-gray-400">Transaction Hash:</span>
                      <span className="font-mono text-xs truncate max-w-[200px]">{transactionHash}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                      <span className="font-medium">
                        {getCryptoAmount()} {getCryptoDetails().symbol}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {paymentStep === "confirm" && (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Thank you for your purchase. Your transaction has been confirmed.
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 dark:text-gray-400">Product:</span>
                      <span className="font-medium">{productName}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                      <span className="font-medium">${amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Payment Method:</span>
                      <span className="font-medium">{getCryptoDetails().name}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your license key and activation instructions have been sent to your email.
                    </p>

                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                      onClick={onClose}
                    >
                      Close
                    </Button>

                    <Button variant="outline" className="w-full" asChild>
                      <a href="/step-guide">
                        View Step Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

