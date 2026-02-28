'use client';

export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-netflix-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-netflix-red border-t-transparent rounded-full animate-spin" />
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  );
}
