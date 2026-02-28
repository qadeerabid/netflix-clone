'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { PlayerControls } from './PlayerControls';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactPlayer = dynamic<any>(
  () => import('react-player').then((mod) => mod.default),
  { ssr: false }
);

interface VideoPlayerProps {
  videoId?: string;
  title?: string;
  onBack?: () => void;
}

export function VideoPlayer({ videoId, title, onBack }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const url = videoId
    ? `https://www.youtube.com/watch?v=${videoId}`
    : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  return (
    <div className={`relative bg-black ${fullscreen ? 'fixed inset-0 z-50' : 'w-full aspect-video'}`}>
      <ReactPlayer
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        width="100%"
        height="100%"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onProgress={(state: any) => setPlayed(state.played)}
      />
      <PlayerControls
        playing={playing}
        volume={volume}
        muted={muted}
        played={played}
        title={title}
        onPlayPause={() => setPlaying(!playing)}
        onVolumeChange={setVolume}
        onMuteToggle={() => setMuted(!muted)}
        onBack={onBack}
        onFullscreen={() => setFullscreen(!fullscreen)}
      />
    </div>
  );
}
