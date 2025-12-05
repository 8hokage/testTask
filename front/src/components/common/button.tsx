import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "destructive"
type ButtonSize = "default" | "sm"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseClass =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

const variantClass: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground shadow hover:opacity-90",
  destructive: "bg-destructive text-destructive-foreground shadow-sm hover:opacity-90",
};

const sizeClass: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3 py-1.5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(baseClass, variantClass[variant], sizeClass[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";



