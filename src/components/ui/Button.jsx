import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-hover shadow-sm shadow-primary/10",
  accent:
    "bg-accent text-white hover:bg-accent-hover shadow-sm shadow-accent/10",
  outline:
    "border border-border bg-white text-dark hover:border-primary hover:bg-primary-light",
  ghost: "bg-transparent text-gray hover:bg-gray-light hover:text-dark",
  danger: "bg-danger-light text-danger hover:bg-red-100",
  success: "bg-success-light text-success hover:bg-green-100",
  whatsapp: "bg-[#E8F8EE] text-[#25D366] hover:bg-[#d0f0db]",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-4 py-2.5 text-sm rounded-[--radius-button]",
  lg: "px-6 py-3 text-base rounded-[--radius-button]",
};

export default forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    className = "",
    disabled,
    children,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold",
        "transition-all duration-200 cursor-pointer",
        "hover:scale-[1.02] active:scale-[0.98]",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
