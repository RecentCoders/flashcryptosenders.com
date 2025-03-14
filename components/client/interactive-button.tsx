'use client'

import React from 'react'
import { Button } from './button'

interface InteractiveButtonProps {
  onClick: () => void
  className?: string
  children: React.ReactNode
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function InteractiveButton({ 
  onClick, 
  className, 
  children,
  disabled = false,
  type = 'button' 
}: InteractiveButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!disabled) {
      onClick()
    }
  }

  return (
    <Button 
      type={type}
      onClick={handleClick} 
      className={className}
      disabled={disabled}
      data-interactive="true"
    >
      {children}
    </Button>
  )
}
