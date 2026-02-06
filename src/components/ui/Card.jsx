import { cn } from "@/lib/utils";

export default function Card({ className = "", children, ...props }) {
  return (
    <div
      className={cn(
        "bg-white rounded-[--radius-card] shadow-sm border border-border",
        "transition-shadow duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
