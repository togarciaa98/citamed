import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-light shadow-md",
  accent: "bg-accent text-white hover:brightness-110 shadow-lg",
  outline:
    "border-2 border-gray-light bg-white text-dark hover:border-primary hover:bg-primary-pale",
  ghost: "bg-transparent text-primary hover:bg-primary-pale",
  danger: "bg-danger-light text-danger hover:bg-red-100",
  success: "bg-success-light text-success hover:bg-green-100",
  whatsapp: "bg-[#E8F8EE] text-[#25D366] hover:bg-[#d0f0db]",
};

const sizes = {
  sm: "px-3.5 py-1.5 text-xs rounded-lg",
  md: "px-5 py-3 text-sm rounded-[--radius-button]",
  lg: "px-8 py-4 text-base rounded-[--radius-button]",
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
        "disabled:opacity-50 disabled:cursor-not-allowed",
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
