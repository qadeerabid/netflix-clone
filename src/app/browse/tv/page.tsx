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

export default function TVPage() {
  const [sections, setSections] = useState<{ title: string; items: MediaItem[] }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popular, topRated, airingToday, onTheAir] = await Promise.all([
          tmdbService.getPopularTV(),
          tmdbService.getTopRatedTV(),
          tmdbService.getAiringTodayTV(),
          tmdbService.getOnTheAirTV(),
        ]);
        setSections([
          { title: 'Popular TV Shows', items: popular.results as unknown as MediaItem[] },
          { title: 'Top Rated TV Shows', items: topRated.results as unknown as MediaItem[] },
          { title: 'Airing Today', items: airingToday.results as unknown as MediaItem[] },
          { title: 'On The Air', items: onTheAir.results as unknown as MediaItem[] },
        ]);
      } catch (e) {
        console.error('Failed to fetch TV shows', e);
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
        <h1 className="text-white text-3xl font-bold px-4 md:px-12 mb-6">TV Shows</h1>
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
          : sections.map((s) => <Row key={s.title} title={s.title} items={s.items} />)}
      </div>
      <Footer />
      <MovieModal />
    </div>
  );
}
