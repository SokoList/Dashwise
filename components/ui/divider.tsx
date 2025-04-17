import type React from "react"

interface DividerProps {
  children?: React.ReactNode
  className?: string
}

export function Divider({ children, className = "" }: DividerProps) {
  return (
    <div className={`relative flex items-center py-2 ${className}`}>
      <div className="flex-grow border-t border-gray-300"></div>
      {children && <span className="flex-shrink mx-4 text-sm text-gray-500">{children}</span>}
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  )
}
