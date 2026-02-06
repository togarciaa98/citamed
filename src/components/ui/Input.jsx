import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export default forwardRef(function Input(
  { label, error, className = "", ...props },
  ref
) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold text-dark mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-3 rounded-[10px] border-2 border-gray-light",
          "text-[15px] outline-none transition-colors duration-200",
          "focus:border-primary placeholder:text-gray/50",
          error ? "border-danger" : "",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
});
