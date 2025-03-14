"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

// Define the context type
interface Web3PaymentContextType {
  isConnected: boolean
  walletAddress: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  makePayment: (amount: number, recipient: string) => Promise<string | null>
  isProcessing: boolean
}

// Create context with default values
const Web3PaymentContext = createContext<Web3PaymentContextType>({
  isConnected: false,
  walletAddress: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  makePayment: async () => null,
  isProcessing: false,
})

// Hook to use the context
export const useWeb3Payment = () => useContext(Web3PaymentContext)

interface Web3PaymentProviderProps {
  children: ReactNode
}

export function Web3PaymentProvider({ children }: Web3PaymentProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  // Check if ethereum is available in the window object
  const hasEthereum = () => {
    return typeof window !== "undefined" && window.ethereum !== undefined
  }

  // Connect wallet
  const connectWallet = async () => {
    if (!hasEthereum()) {
      toast({
        title: "Wallet not found",
        description: "Please install MetaMask or another Web3 wallet to continue.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsProcessing(true)

      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length > 0) {
        setWalletAddress(accounts[0])
        setIsConnected(true)

        toast({
          title: "Wallet connected",
          description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
        })
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      toast({
        title: "Connection failed",
        description: "Failed to connect to your wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletAddress(null)
    setIsConnected(false)

    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected.",
    })
  }

  // Make a payment
  const makePayment = async (amount: number, recipient: string): Promise<string | null> => {
    if (!isConnected || !walletAddress) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to make a payment.",
        variant: "destructive",
      })
      return null
    }

    if (!hasEthereum()) {
      toast({
        title: "Wallet not found",
        description: "Please install MetaMask or another Web3 wallet to continue.",
        variant: "destructive",
      })
      return null
    }

    try {
      setIsProcessing(true)

      // Convert amount to wei (1 ETH = 10^18 wei)
      const amountInWei = BigInt(Math.floor(amount * 1e18)).toString(16)

      // Send transaction
      const transactionParameters = {
        to: recipient,
        from: walletAddress,
        value: `0x${amountInWei}`,
      }

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })

      toast({
        title: "Payment sent",
        description: "Your transaction has been submitted to the network.",
      })

      return txHash
    } catch (error) {
      console.error("Error making payment:", error)
      toast({
        title: "Payment failed",
        description: "Failed to send your payment. Please try again.",
        variant: "destructive",
      })
      return null
    } finally {
      setIsProcessing(false)
    }
  }

  // Listen for account changes
  useEffect(() => {
    if (hasEthereum()) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          setWalletAddress(null)
          setIsConnected(false)
        } else if (accounts[0] !== walletAddress) {
          // User switched accounts
          setWalletAddress(accounts[0])
          setIsConnected(true)
        }
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)

      // Check if already connected
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0])
            setIsConnected(true)
          }
        })
        .catch((err: any) => {
          console.error("Error checking accounts:", err)
        })

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [walletAddress])

  const value = {
    isConnected,
    walletAddress,
    connectWallet,
    disconnectWallet,
    makePayment,
    isProcessing,
  }

  return <Web3PaymentContext.Provider value={value}>{children}</Web3PaymentContext.Provider>
}

