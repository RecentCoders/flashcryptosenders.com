'use client';

import { useState } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { PaymentModal } from "@/components/payment-modal"

interface PaymentButtonProps extends ButtonProps {
  productName: string
  amount: number
  oneClick?: boolean
}

export function PaymentButton({ productName, amount, oneClick = false, children, ...props }: PaymentButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    if (oneClick) {
      // For one-click payments, you might want to implement a different flow
      // This is a simplified example
      window.open(`ethereum:0xBFD25B75E9a742cEC6ea68D06d631f6EF14Cfa82?value=${amount}`, "_blank")
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <Button onClick={handleClick} {...props}>
        {children}
      </Button>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={amount}
        productName={productName}
      />
    </>
  )
}

