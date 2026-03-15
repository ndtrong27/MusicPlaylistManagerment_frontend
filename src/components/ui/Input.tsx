import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              "w-full rounded-xl border border-gray-700 bg-gray-800/60 px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30",
              leftIcon && "pl-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/30",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
