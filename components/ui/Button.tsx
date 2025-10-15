"use client"

import React, { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost"
export type ButtonSize = "sm" | "md" | "lg" | "xl"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-[#FF6B35] text-white hover:bg-[#E55A2B] focus:ring-[#FF6B35] shadow": variant === "primary",
            "bg-[#2EC4B6] text-white hover:bg-[#25A99A] focus:ring-[#2EC4B6] shadow": variant === "secondary",
            "border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white focus:ring-[#FF6B35]": variant === "outline",
            "text-gray-700 hover:bg-gray-100 focus:ring-gray-500": variant === "ghost",
            "px-3 py-1 text-sm": size === "sm",
            "px-4 py-2 text-base": size === "md",
            "px-6 py-3 text-lg": size === "lg",
            "px-8 py-4 text-xl": size === "xl",
          },
          className
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Loading...
          </div>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }