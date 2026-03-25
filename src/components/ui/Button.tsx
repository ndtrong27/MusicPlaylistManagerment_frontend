import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "white";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const variantClasses = {
  primary:
    "bg-accent-green hover:bg-accent-green/90 text-bg-dark shadow-lg shadow-accent-green/20 hover:shadow-accent-green/40 hover:-translate-y-0.5 active:scale-[0.98]",
  secondary:
    "bg-primary-700 hover:bg-primary-700/90 text-text-light shadow-lg shadow-primary-700/20 hover:shadow-primary-700/40 hover:-translate-y-0.5 active:scale-[0.98]",
  ghost: "hover:bg-white/10 text-text-light/60 hover:text-text-light active:scale-[0.98]",
  danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-0.5 active:scale-[0.98]",
  white: "bg-white hover:bg-gray-100 text-bg-dark shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-0.5 active:scale-[0.98]",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
