import { cn } from "@/lib/utils";

export function Skeleton({ className = "" }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-gray-light",
        className
      )}
    />
  );
}

export function SkeletonLine({ className = "" }) {
  return <Skeleton className={cn("h-4 w-full", className)} />;
}

export function SkeletonCircle({ size = 40, className = "" }) {
  return (
    <Skeleton
      className={cn("rounded-full shrink-0", className)}
      style={{ width: size, height: size }}
    />
  );
}

export function SkeletonCard({ className = "" }) {
  return (
    <div className={cn("bg-white rounded-[--radius-card] border border-border p-5", className)}>
      <div className="flex items-center gap-3 mb-4">
        <SkeletonCircle size={36} />
        <div className="flex-1 space-y-2">
          <SkeletonLine className="h-4 w-3/4" />
          <SkeletonLine className="h-3 w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <SkeletonLine className="h-3 w-full" />
        <SkeletonLine className="h-3 w-5/6" />
      </div>
    </div>
  );
}
