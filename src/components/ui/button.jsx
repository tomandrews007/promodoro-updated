import * as React from "react"
    import { cn } from "../../lib/utils"

    const Button = React.forwardRef(
      ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? "button" : "button"
        return (
          <Comp
            className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
              variant === "default" &&
                "bg-primary text-primary-foreground shadow hover:bg-primary/90",
              variant === "destructive" &&
                "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
              variant === "outline" &&
                "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
              variant === "secondary" &&
                "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
              variant === "ghost" &&
                "hover:bg-accent hover:text-accent-foreground",
              size === "default" && "px-4 py-2",
              size === "sm" && "px-3 py-1 rounded-md",
              size === "lg" && "px-8 py-3 rounded-md",
              className
            )}
            ref={ref}
            {...props}
          />
        )
      }
    )
    Button.displayName = "Button"

    export { Button }
