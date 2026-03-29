import { cn } from '@/lib/utils';

export const SkeletonShimmer = ({ className = '' }: { className?: string }) => (
  <div className={cn('shimmer rounded-lg', className)} />
);

export const TableSkeleton = ({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4">
        {Array.from({ length: cols }).map((_, j) => (
          <SkeletonShimmer key={j} className="h-10 flex-1" />
        ))}
      </div>
    ))}
  </div>
);
