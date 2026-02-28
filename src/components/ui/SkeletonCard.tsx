'use client';

export function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-40 sm:w-48 md:w-52 aspect-[2/3] bg-gray-800 rounded animate-pulse" />
  );
}

export function SkeletonRow() {
  return (
    <div className="mb-8">
      <div className="h-6 w-48 bg-gray-800 rounded mb-3 animate-pulse" />
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
