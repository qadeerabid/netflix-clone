'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiPlay, FiPlus, FiMinus, FiChevronDown } from 'react-icons/fi';
import { Movie, TVShow } from '@/types';
import { getImageUrl, getMediaTitle, formatDate, formatRating } from '@/utils';
import { useMyListStore } from '@/stores/myListStore';
import { useUIStore } from '@/stores/uiStore';
import { ROUTES } from '@/constants';

type MediaItem = (Movie | TVShow) & { media_type?: string };

interface MovieCardProps {
  item: MediaItem;
}

export function MovieCard({ item }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isInList, addItem, removeItem } = useMyListStore();
  const { openModal } = useUIStore();
  const router = useRouter();
  const inList = isInList(item.id);
  const title = getMediaTitle(item);
  const date = 'release_date' in item ? item.release_date : ('first_air_date' in item ? item.first_air_date : '');

  return (
    <motion.div
      className="relative flex-shrink-0 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-40 sm:w-44 md:w-48 aspect-[2/3] rounded overflow-hidden bg-gray-800">
        <Image
          src={getImageUrl(item.poster_path, 'w342')}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 160px, (max-width: 768px) 176px, 192px"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-poster.png';
          }}
        />
      </div>

      <motion.div
        className="absolute inset-0 rounded overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white font-semibold text-sm mb-2 line-clamp-2">{title}</p>
          <div className="flex items-center gap-1 mb-2 flex-wrap">
            <span className="text-green-500 font-semibold text-xs">{formatRating(item.vote_average * 10)}% Match</span>
            {date && <span className="text-gray-400 text-xs">{formatDate(date)}</span>}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); router.push(`${ROUTES.WATCH}/${item.id}`); }}
              className="bg-white text-black rounded-full p-1.5 hover:bg-gray-200 transition"
              title="Play"
            >
              <FiPlay className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (inList) { removeItem(item.id); } else { addItem(item); }
              }}
              className="bg-gray-700/80 text-white rounded-full p-1.5 hover:bg-gray-600 transition border border-gray-500"
              title={inList ? 'Remove from My List' : 'Add to My List'}
            >
              {inList ? <FiMinus className="w-3 h-3" /> : <FiPlus className="w-3 h-3" />}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); openModal(item); }}
              className="ml-auto bg-gray-700/80 text-white rounded-full p-1.5 hover:bg-gray-600 transition border border-gray-500"
              title="More Info"
            >
              <FiChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
