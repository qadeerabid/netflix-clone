'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, FiArrowLeft } from 'react-icons/fi';

interface PlayerControlsProps {
  playing: boolean;
  volume: number;
  muted: boolean;
  played: number;
  title?: string;
  onPlayPause: () => void;
  onVolumeChange: (v: number) => void;
  onMuteToggle: () => void;
  onBack?: () => void;
  onFullscreen: () => void;
}

export function PlayerControls({
  playing, volume, muted, played, title,
  onPlayPause, onVolumeChange, onMuteToggle, onBack, onFullscreen,
}: PlayerControlsProps) {
  const [showControls, setShowControls] = useState(true);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-between"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-between h-full"
          >
            <div className="bg-gradient-to-b from-black/70 to-transparent p-4 flex items-center gap-4">
              {onBack && (
                <button onClick={onBack} className="text-white hover:text-gray-300 transition">
                  <FiArrowLeft className="w-6 h-6" />
                </button>
              )}
              {title && <p className="text-white font-semibold">{title}</p>}
            </div>

            <div className="bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="w-full h-1 bg-gray-600 rounded mb-4 cursor-pointer">
                <div className="h-full bg-netflix-red rounded" style={{ width: `${played * 100}%` }} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={onPlayPause} className="text-white hover:text-gray-300 transition">
                    {playing ? <FiPause className="w-6 h-6" /> : <FiPlay className="w-6 h-6" />}
                  </button>
                  <button onClick={onMuteToggle} className="text-white hover:text-gray-300 transition">
                    {muted ? <FiVolumeX className="w-5 h-5" /> : <FiVolume2 className="w-5 h-5" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={muted ? 0 : volume}
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                    className="w-20 accent-netflix-red"
                  />
                </div>
                <button onClick={onFullscreen} className="text-white hover:text-gray-300 transition">
                  <FiMaximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
