'use client';

import { Navbar } from '@/components/layout/Navbar';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { MovieModal } from '@/components/browse/MovieModal';
import { useUIStore } from '@/stores/uiStore';

export default function SearchPage() {
  const { searchQuery } = useUIStore();

  return (
    <div className="bg-netflix-bg min-h-screen">
      <Navbar />
      <div className="pt-20 px-4 md:px-12 mb-6 flex justify-center">
        <SearchBar />
      </div>
      <SearchResults query={searchQuery} />
      <MovieModal />
    </div>
  );
}
