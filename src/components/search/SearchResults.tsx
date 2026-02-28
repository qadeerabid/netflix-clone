'use client';

import { useEffect, useState } from 'react';
import { Movie, TVShow } from '@/types';
import { MovieCard } from '@/components/browse/MovieCard';
import { tmdbService } from '@/services/tmdb';
import { useDebounce } from '@/hooks/useDebounce';

type MediaItem = (Movie | TVShow) & { media_type?: string };

interface SearchResultsProps {
  query: string;
}

export function SearchResults({ query }: SearchResultsProps) {
  const debouncedQuery = useDebounce(query, 400);
  const [results, setResults] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    tmdbService
      .searchMulti(debouncedQuery)
      .then((data) => setResults(data.results.slice(0, 20) as MediaItem[]))
      .catch(() => setResults([]))
      .finally(() => setIsLoading(false));
  }, [debouncedQuery]);

  if (!query) return null;

  return (
    <div className="pt-24 px-4 md:px-12">
      {isLoading ? (
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="w-40 sm:w-44 aspect-[2/3] bg-gray-800 rounded animate-pulse" />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {results.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-lg">No results for &quot;{query}&quot;</p>
      )}
    </div>
  );
}
