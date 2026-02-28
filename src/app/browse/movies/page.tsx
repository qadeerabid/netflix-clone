'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Row } from '@/components/browse/Row';
import { MovieModal } from '@/components/browse/MovieModal';
import { SkeletonRow } from '@/components/ui/SkeletonCard';
import { tmdbService } from '@/services/tmdb';
import { Movie, TVShow } from '@/types';
import { GENRES } from '@/constants';

type MediaItem = (Movie & TVShow) & { media_type?: string };

export default function MoviesPage() {
  const [sections, setSections] = useState<{ title: string; items: MediaItem[] }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popular, topRated, nowPlaying, upcoming, action, comedy, horror, romance] = await Promise.all([
          tmdbService.getPopularMovies(),
          tmdbService.getTopRatedMovies(),
          tmdbService.getNowPlayingMovies(),
          tmdbService.getUpcomingMovies(),
          tmdbService.getMoviesByGenre(GENRES.ACTION),
          tmdbService.getMoviesByGenre(GENRES.COMEDY),
          tmdbService.getMoviesByGenre(GENRES.HORROR),
          tmdbService.getMoviesByGenre(GENRES.ROMANCE),
        ]);
        setSections([
          { title: 'Popular Movies', items: popular.results as unknown as MediaItem[] },
          { title: 'Top Rated', items: topRated.results as unknown as MediaItem[] },
          { title: 'Now Playing', items: nowPlaying.results as unknown as MediaItem[] },
          { title: 'Upcoming', items: upcoming.results as unknown as MediaItem[] },
          { title: 'Action', items: action.results as unknown as MediaItem[] },
          { title: 'Comedy', items: comedy.results as unknown as MediaItem[] },
          { title: 'Horror', items: horror.results as unknown as MediaItem[] },
          { title: 'Romance', items: romance.results as unknown as MediaItem[] },
        ]);
      } catch (e) {
        console.error('Failed to fetch movies', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-netflix-bg min-h-screen">
      <Navbar />
      <div className="pt-24 pb-8">
        <h1 className="text-white text-3xl font-bold px-4 md:px-12 mb-6">Movies</h1>
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
          : sections.map((s) => <Row key={s.title} title={s.title} items={s.items} />)}
      </div>
      <Footer />
      <MovieModal />
    </div>
  );
}
