'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { VideoPlayer } from '@/components/player/VideoPlayer';
import { tmdbService } from '@/services/tmdb';
import { Video } from '@/types';
import { Loading } from '@/components/ui/Loading';

export default function WatchPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [trailerKey, setTrailerKey] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const numId = parseInt(id, 10);
    const fetchVideo = async () => {
      try {
        const [movieVideos, movieDetails] = await Promise.all([
          tmdbService.getMovieVideos(numId),
          tmdbService.getMovieDetails(numId),
        ]);
        const trailer = movieVideos.results.find((v: Video) => v.type === 'Trailer' && v.site === 'YouTube');
        setTrailerKey(trailer?.key);
        setTitle(movieDetails.title || '');
      } catch {
        try {
          const [tvVideos, tvDetails] = await Promise.all([
            tmdbService.getTVVideos(numId),
            tmdbService.getTVDetails(numId),
          ]);
          const trailer = tvVideos.results.find((v: Video) => v.type === 'Trailer' && v.site === 'YouTube');
          setTrailerKey(trailer?.key);
          setTitle(tvDetails.name || '');
        } catch {
          // Use default
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-6xl">
          <VideoPlayer
            videoId={trailerKey}
            title={title}
            onBack={() => router.back()}
          />
        </div>
      </div>
    </div>
  );
}
