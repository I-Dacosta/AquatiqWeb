import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden relative group hover:scale-[1.03]",
  {
    variants: {
      variant: {
        default:
          "bg-[#151F6D] text-white shadow",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600",
        outline:
          "border border-gray-300 bg-transparent shadow-sm hover:bg-white hover:text-[#1a1d1d]",
        secondary:
          "bg-[#FDEA10] text-[#1a1d1d] shadow-sm hover:bg-[#1a1d1d] hover:text-[#FDEA10]",
        ghost: "hover:bg-black/5",
        link: "text-[#151F6D] underline-offset-4 hover:underline hover:-translate-y-[1px]",
      },
      size: {
        default: "h-12 px-8 py-2",
        sm: "h-10 px-6 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    // If outline/ghost, we might not want the dark fill span
    const isSolid = variant === "default" || variant === "secondary" || variant === "destructive";

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isSolid && (
          <span className="absolute inset-0 z-0 bg-black/15 translate-y-[100%] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {props.children}
        </span>
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
