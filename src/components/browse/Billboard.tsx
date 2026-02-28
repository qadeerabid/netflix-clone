'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiPlay, FiInfo } from 'react-icons/fi';
import { Movie, TVShow } from '@/types';
import { getImageUrl, getMediaTitle, truncateText } from '@/utils';
import { useUIStore } from '@/stores/uiStore';
import { ROUTES } from '@/constants';

type MediaItem = (Movie | TVShow) & { media_type?: string };

interface BillboardProps {
  item: MediaItem;
}

export function Billboard({ item }: BillboardProps) {
  const router = useRouter();
  const { openModal } = useUIStore();
  const title = getMediaTitle(item);

  return (
    <div className="relative w-full h-[56vw] max-h-[700px] min-h-[400px]">
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(item.backdrop_path, 'original')}
          alt={title}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute bottom-[20%] left-0 px-4 md:px-12 max-w-2xl"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-gray-200 mb-6 line-clamp-3 drop-shadow">
          {truncateText(item.overview, 200)}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push(`${ROUTES.WATCH}/${item.id}`)}
            className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition text-sm sm:text-base"
          >
            <FiPlay className="w-4 h-4 fill-current" />
            Play
          </button>
          <button
            onClick={() => openModal(item)}
            className="flex items-center gap-2 bg-gray-500/70 text-white px-6 py-2 rounded font-semibold hover:bg-gray-500/50 transition text-sm sm:text-base"
          >
            <FiInfo className="w-4 h-4" />
            More Info
          </button>
        </div>
      </motion.div>
    </div>
  );
}
