'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Billboard } from '@/components/browse/Billboard';
import { Row } from '@/components/browse/Row';
import { MovieModal } from '@/components/browse/MovieModal';
import { SkeletonRow } from '@/components/ui/SkeletonCard';
import { tmdbService } from '@/services/tmdb';
import { Movie, TVShow } from '@/types';
import { GENRES } from '@/constants';

type MediaItem = (Movie & TVShow) & { media_type?: string };

export default function BrowsePage() {
  const [trending, setTrending] = useState<MediaItem[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [popularTV, setPopularTV] = useState<TVShow[]>([]);
  const [topRatedTV, setTopRatedTV] = useState<TVShow[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingData, popularMoviesData, topRatedMoviesData, popularTVData, topRatedTVData, actionData, comedyData] =
          await Promise.all([
            tmdbService.getTrending('all', 'week'),
            tmdbService.getPopularMovies(),
            tmdbService.getTopRatedMovies(),
            tmdbService.getPopularTV(),
            tmdbService.getTopRatedTV(),
            tmdbService.getMoviesByGenre(GENRES.ACTION),
            tmdbService.getMoviesByGenre(GENRES.COMEDY),
          ]);
        setTrending(trendingData.results as MediaItem[]);
        setPopularMovies(popularMoviesData.results);
        setTopRatedMovies(topRatedMoviesData.results);
        setPopularTV(popularTVData.results);
        setTopRatedTV(topRatedTVData.results);
        setActionMovies(actionData.results);
        setComedyMovies(comedyData.results);
      } catch (e) {
        console.error('Failed to fetch data', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const billboard = trending[0];

  return (
    <div className="bg-netflix-bg min-h-screen">
      <Navbar />
      {isLoading ? (
        <div className="pt-20">
          <div className="w-full h-[56vw] max-h-[700px] bg-gray-900 animate-pulse" />
          <div className="px-4 md:px-12 mt-8">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)}
          </div>
        </div>
      ) : (
        <>
          {billboard && <Billboard item={billboard} />}
          <div className="pb-8 -mt-24 relative z-10">
            <Row title="Trending Now" items={trending as MediaItem[]} />
            <Row title="Popular Movies" items={popularMovies as unknown as MediaItem[]} />
            <Row title="Top Rated Movies" items={topRatedMovies as unknown as MediaItem[]} />
            <Row title="Popular TV Shows" items={popularTV as unknown as MediaItem[]} />
            <Row title="Top Rated TV Shows" items={topRatedTV as unknown as MediaItem[]} />
            <Row title="Action Movies" items={actionMovies as unknown as MediaItem[]} />
            <Row title="Comedy Movies" items={comedyMovies as unknown as MediaItem[]} />
          </div>
        </>
      )}
      <Footer />
      <MovieModal />
    </div>
  );
}
