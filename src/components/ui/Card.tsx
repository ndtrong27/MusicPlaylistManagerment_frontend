import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass";
}

export default function Card({ className, variant = "default", children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 transition-all duration-200",
        variant === "default" && "bg-gray-900 border-gray-800 hover:border-gray-700",
        variant === "glass" &&
          "bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
