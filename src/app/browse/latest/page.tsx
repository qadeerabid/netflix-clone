'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Row } from '@/components/browse/Row';
import { MovieModal } from '@/components/browse/MovieModal';
import { SkeletonRow } from '@/components/ui/SkeletonCard';
import { tmdbService } from '@/services/tmdb';
import { Movie, TVShow } from '@/types';

type MediaItem = (Movie & TVShow) & { media_type?: string };

export default function LatestPage() {
  const [sections, setSections] = useState<{ title: string; items: MediaItem[] }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trending, nowPlaying, airingToday, upcoming] = await Promise.all([
          tmdbService.getTrending('all', 'day'),
          tmdbService.getNowPlayingMovies(),
          tmdbService.getAiringTodayTV(),
          tmdbService.getUpcomingMovies(),
        ]);
        setSections([
          { title: 'Trending Today', items: trending.results as unknown as MediaItem[] },
          { title: 'Now Playing in Theaters', items: nowPlaying.results as unknown as MediaItem[] },
          { title: 'Airing Today on TV', items: airingToday.results as unknown as MediaItem[] },
          { title: 'Coming Soon', items: upcoming.results as unknown as MediaItem[] },
        ]);
      } catch (e) {
        console.error('Failed to fetch latest', e);
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
        <h1 className="text-white text-3xl font-bold px-4 md:px-12 mb-6">New & Popular</h1>
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
          : sections.map((s) => <Row key={s.title} title={s.title} items={s.items} />)}
      </div>
      <Footer />
      <MovieModal />
    </div>
  );
}
