import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "primary";
  hoverable?: boolean;
}

export default function Card({ 
  className, 
  variant = "default", 
  hoverable = true,
  children, 
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300 border",
        variant === "default" && "bg-white/5 border-white/5 text-text-light",
        variant === "glass" &&
          "bg-white/5 border-white/10 backdrop-blur-md shadow-xl",
        variant === "primary" && 
          "bg-primary-700 border-primary-700/20 text-text-light shadow-lg shadow-primary-700/20",
        hoverable && "hover:border-white/20 hover:bg-white/[0.08] cursor-pointer hover:-translate-y-1 shadow-2xl shadow-black/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
