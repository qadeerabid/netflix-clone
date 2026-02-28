'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiPlay, FiPlus, FiMinus } from 'react-icons/fi';
import { Modal } from '@/components/ui/Modal';
import { useUIStore } from '@/stores/uiStore';
import { useMyListStore } from '@/stores/myListStore';
import { tmdbService } from '@/services/tmdb';
import { getImageUrl, getMediaTitle, formatDate, formatRating } from '@/utils';
import { Movie, TVShow } from '@/types';
import { ROUTES } from '@/constants';

type MediaItem = (Movie | TVShow) & { media_type?: string };

export function MovieModal() {
  const { isModalOpen, selectedItem, closeModal } = useUIStore();
  const { isInList, addItem, removeItem } = useMyListStore();
  const router = useRouter();
  const [similar, setSimilar] = useState<MediaItem[]>([]);

  useEffect(() => {
    if (!selectedItem) return;
    const isTV = !('title' in selectedItem) || selectedItem.media_type === 'tv';

    const fetchData = async () => {
      try {
        const similarData = isTV
          ? await tmdbService.getSimilarTV(selectedItem.id)
          : await tmdbService.getSimilarMovies(selectedItem.id);
        setSimilar(similarData.results.slice(0, 6) as MediaItem[]);
      } catch {
        // silently fail
      }
    };
    fetchData();
  }, [selectedItem]);

  if (!selectedItem) return null;

  const title = getMediaTitle(selectedItem);
  const date = 'release_date' in selectedItem ? selectedItem.release_date : ('first_air_date' in selectedItem ? selectedItem.first_air_date : '');
  const inList = isInList(selectedItem.id);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="relative w-full aspect-video bg-gray-900">
        <Image
          src={getImageUrl(selectedItem.backdrop_path, 'original')}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        <div className="absolute bottom-4 left-6 flex items-center gap-3">
          <button
            onClick={() => { closeModal(); router.push(`${ROUTES.WATCH}/${selectedItem.id}`); }}
            className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded font-semibold hover:bg-gray-200 transition"
          >
            <FiPlay className="w-4 h-4 fill-current" />
            Play
          </button>
          <button
            onClick={() => inList ? removeItem(selectedItem.id) : addItem(selectedItem)}
            className="bg-transparent text-white border-2 border-white rounded-full p-2 hover:border-gray-300 transition"
          >
            {inList ? <FiMinus className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-white text-2xl font-bold mb-2">{title}</h2>
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="text-green-500 font-semibold">{formatRating(selectedItem.vote_average * 10)}% Match</span>
          {date && <span className="text-gray-400 text-sm">{formatDate(date)}</span>}
          <span className="text-gray-400 text-sm border border-gray-600 px-1">{'adult' in selectedItem && selectedItem.adult ? '18+' : 'PG-13'}</span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-6">{selectedItem.overview}</p>

        {similar.length > 0 && (
          <div>
            <h3 className="text-white font-semibold mb-3">More Like This</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {similar.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 rounded overflow-hidden cursor-pointer hover:bg-gray-700 transition"
                  onClick={() => {
                    closeModal();
                    setTimeout(() => useUIStore.getState().openModal(item), 100);
                  }}
                >
                  <div className="relative aspect-video bg-gray-900">
                    <Image
                      src={getImageUrl(item.backdrop_path || item.poster_path, 'w342')}
                      alt={getMediaTitle(item)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-white text-xs font-medium">{getMediaTitle(item)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
