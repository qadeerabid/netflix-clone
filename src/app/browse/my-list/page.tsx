'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MovieCard } from '@/components/browse/MovieCard';
import { MovieModal } from '@/components/browse/MovieModal';
import { useMyListStore } from '@/stores/myListStore';
import { Movie, TVShow } from '@/types';

type MediaItem = (Movie & TVShow) & { media_type?: string };

export default function MyListPage() {
  const { items } = useMyListStore();

  return (
    <div className="bg-netflix-bg min-h-screen">
      <Navbar />
      <div className="pt-24 pb-8 px-4 md:px-12">
        <h1 className="text-white text-3xl font-bold mb-6">My List</h1>
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl mb-4">Your list is empty</p>
            <p className="text-gray-500">Add movies and TV shows to your list to watch them later.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {items.map((item) => (
              <MovieCard key={item.id} item={item as unknown as MediaItem} />
            ))}
          </div>
        )}
      </div>
      <Footer />
      <MovieModal />
    </div>
  );
}
