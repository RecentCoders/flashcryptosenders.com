'use client'

import { ReactNode } from 'react'

interface InteractiveElementProps {
  onClick: () => void
  children: ReactNode
  className?: string
}

const InteractiveElement = ({ onClick, children, className }: InteractiveElementProps) => {
  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  )
}

export default InteractiveElement
