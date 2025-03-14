'use client'

import React from 'react'
import { Button } from './button'

interface InteractiveButtonProps {
  onClick: () => void
  className?: string
  children: React.ReactNode
}

export function InteractiveButton({ onClick, className, children }: InteractiveButtonProps) {
  return (
    <Button onClick={onClick} className={className}>
      {children}
    </Button>
  )
}
