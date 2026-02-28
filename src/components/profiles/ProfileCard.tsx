'use client';

import { motion } from 'framer-motion';
import { Profile } from '@/types';

interface ProfileCardProps {
  profile: Profile;
  onClick: (profile: Profile) => void;
}

export function ProfileCard({ profile, onClick }: ProfileCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={() => onClick(profile)}
      className="flex flex-col items-center gap-3 cursor-pointer group"
    >
      <div
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-md flex items-center justify-center text-white text-4xl font-bold group-hover:ring-2 ring-white transition"
        style={{ backgroundColor: profile.color }}
      >
        {profile.avatar}
      </div>
      <p className="text-gray-400 group-hover:text-white text-sm font-medium transition">{profile.name}</p>
    </motion.div>
  );
}
