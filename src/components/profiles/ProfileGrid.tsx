'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { ProfileCard } from './ProfileCard';
import { useProfileStore } from '@/stores/profileStore';
import { useAuthStore } from '@/stores/authStore';
import { Profile } from '@/types';
import { ROUTES } from '@/constants';

const COLORS = ['#E50914', '#0071EB', '#E87C03', '#54B9C5', '#2ECC71', '#9B59B6'];

export function ProfileGrid() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { profiles, setActiveProfile, addProfile, initializeProfiles } = useProfileStore();

  useEffect(() => {
    if (user) {
      initializeProfiles(user.id);
    }
  }, [user, initializeProfiles]);

  const userProfiles = profiles.filter((p) => p.userId === user?.id);

  const handleSelectProfile = (profile: Profile) => {
    setActiveProfile(profile);
    router.push(ROUTES.BROWSE);
  };

  const handleAddProfile = () => {
    if (!user) return;
    const colorIndex = userProfiles.length % COLORS.length;
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letter = letters[userProfiles.length] || 'Z';
    addProfile({
      name: `Profile ${userProfiles.length + 1}`,
      avatar: letter,
      color: COLORS[colorIndex],
      userId: user.id,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-netflix-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <h1 className="text-white text-3xl sm:text-5xl font-medium mb-8">Who&apos;s watching?</h1>
        <div className="flex flex-wrap justify-center gap-6 max-w-2xl">
          {userProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} onClick={handleSelectProfile} />
          ))}
          {userProfiles.length < 5 && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={handleAddProfile}
              className="flex flex-col items-center gap-3 cursor-pointer group"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-md border-2 border-gray-500 flex items-center justify-center group-hover:border-white transition">
                <FiPlus className="text-gray-500 group-hover:text-white w-12 h-12 transition" />
              </div>
              <p className="text-gray-500 group-hover:text-white text-sm transition">Add Profile</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
