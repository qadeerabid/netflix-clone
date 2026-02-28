'use client';

import { useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useUIStore } from '@/stores/uiStore';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useUIStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex items-center gap-2 bg-black/80 border border-white px-4 py-2 w-full max-w-xl">
      <FiSearch className="text-white w-5 h-5 flex-shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Titles, people, genres"
        className="bg-transparent text-white placeholder-gray-400 flex-1 focus:outline-none text-sm"
      />
      {searchQuery && (
        <button onClick={() => setSearchQuery('')} className="text-white hover:text-gray-300 transition">
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
