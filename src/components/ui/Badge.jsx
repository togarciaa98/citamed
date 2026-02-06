import { cn } from "@/lib/utils";

const variants = {
  neutral: "bg-gray-light text-gray",
  primary: "bg-primary-light text-primary",
  success: "bg-success-light text-success",
  warning: "bg-warning-light text-warning",
  danger: "bg-danger-light text-danger",
  accent: "bg-accent-light text-accent",
};

export default function Badge({
  variant = "neutral",
  className = "",
  children,
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
