import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export default forwardRef(function Input(
  { label, error, className = "", ...props },
  ref
) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-dark mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-2.5 rounded-[10px] border border-border",
          "text-sm text-dark outline-none transition-all duration-200",
          "focus:border-primary focus:ring-2 focus:ring-primary/10",
          "placeholder:text-muted",
          error ? "border-danger focus:border-danger focus:ring-danger/10" : "",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
});
