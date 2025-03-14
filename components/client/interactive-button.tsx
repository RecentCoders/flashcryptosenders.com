'use client'

import React from 'react'
import { Button } from './button'

interface InteractiveButtonProps {
  onClick: () => void
  className?: string
  children: React.ReactNode
  disabled?: boolean
}

export function InteractiveButton({ 
  onClick, 
  className, 
  children,
  disabled = false 
}: InteractiveButtonProps) {
  const handleClick = React.useCallback(() => {
    if (!disabled) {
      onClick()
    }
  }, [onClick, disabled])

  return (
    <Button 
      onClick={handleClick} 
      className={className}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}
