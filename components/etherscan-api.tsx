"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

// Etherscan API key
const ETHERSCAN_API_KEY = "MM2A4V75UZ2DSWR28EUM5EEVR8IB4Y1UMC"

interface EtherscanTransaction {
  hash: string
  from: string
  to: string
  value: string
  timeStamp: string
  gasPrice: string
  gasUsed: string
  confirmations: string
}

interface UseEtherscanProps {
  address?: string
  refreshInterval?: number
}

export function useEtherscan({ address, refreshInterval = 30000 }: UseEtherscanProps = {}) {
  const [transactions, setTransactions] = useState<EtherscanTransaction[]>([])
  const [balance, setBalance] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Function to fetch account balance
  const fetchBalance = async (address: string) => {
    try {
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`,
      )
      const data = await response.json()

      if (data.status === "1") {
        // Convert wei to ether (1 ether = 10^18 wei)
        const balanceInEther = Number.parseFloat(data.result) / 1e18
        setBalance(balanceInEther.toFixed(4))
      } else {
        setError(data.message || "Failed to fetch balance")
      }
    } catch (err) {
      setError("Error fetching balance")
      console.error("Error fetching balance:", err)
    }
  }

  // Function to fetch transactions
  const fetchTransactions = async (address: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`,
      )
      const data = await response.json()

      if (data.status === "1") {
        setTransactions(data.result.slice(0, 10)) // Get the 10 most recent transactions
      } else {
        setError(data.message || "Failed to fetch transactions")
      }
    } catch (err) {
      setError("Error fetching transactions")
      console.error("Error fetching transactions:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to verify a transaction
  const verifyTransaction = async (txHash: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${ETHERSCAN_API_KEY}`,
      )
      const data = await response.json()

      if (data.status === "1") {
        return data.result.status === "1" // 1 means success, 0 means failure
      } else {
        toast({
          title: "Verification Error",
          description: data.message || "Failed to verify transaction",
          variant: "destructive",
        })
        return false
      }
    } catch (err) {
      toast({
        title: "Verification Error",
        description: "Error verifying transaction",
        variant: "destructive",
      })
      console.error("Error verifying transaction:", err)
      return false
    }
  }

  // Fetch data when address changes or on interval
  useEffect(() => {
    if (address) {
      fetchBalance(address)
      fetchTransactions(address)

      // Set up interval for refreshing data
      const intervalId = setInterval(() => {
        fetchBalance(address)
        fetchTransactions(address)
      }, refreshInterval)

      return () => clearInterval(intervalId)
    }
  }, [address, refreshInterval])

  return {
    transactions,
    balance,
    isLoading,
    error,
    refreshTransactions: () => address && fetchTransactions(address),
    refreshBalance: () => address && fetchBalance(address),
    verifyTransaction,
  }
}

// Default wallet address for Flash USDT Sender
export const DEFAULT_WALLET_ADDRESS = "0xBFD25B75E9a742cEC6ea68D06d631f6EF14Cfa82"

