import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export default function VideoSlider() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      const currentTime = videoRef.current.currentTime;
      setProgress(duration ? (currentTime / duration) * 100 : 0);
    }
  };

  const handleProgressChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = percent * videoRef.current.duration;
      setProgress(percent * 100);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden bg-black/30 border border-indigo-500/20">
      {/* Video Container */}
      <div className="relative bg-black">
        <video
          ref={videoRef}
          className="w-full h-auto aspect-video"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 720'%3E%3Crect fill='%230a0e27' width='1280' height='720'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Space Grotesk' font-size='48' fill='%236366f1'%3EVideo Antes/Despu%C3%A9s%3C/text%3E%3C/svg%3E"
        >
          <source src="https://media.example.com/aalti-demo.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>

        {/* Play Button Overlay */}
        {!isPlaying && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition group cursor-pointer"
          >
            <div className="bg-indigo-600 rounded-full p-4 group-hover:scale-110 transition">
              <Play size={40} className="text-white fill-white" />
            </div>
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-t from-black/80 to-transparent p-4 space-y-3">
        {/* Progress Bar */}
        <div
          className="h-1 bg-slate-700 rounded-full cursor-pointer group hover:h-2 transition"
          onClick={handleProgressChange}
        >
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePlayPause}
            className="text-white hover:text-cyan-400 transition p-2"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="fill-white" />}
          </button>
          <p className="text-xs text-slate-400 font-dm-sans">
            {videoRef.current ? `${Math.floor(videoRef.current.currentTime)}s` : '0s'} /{' '}
            {videoRef.current ? `${Math.floor(videoRef.current.duration)}s` : '0s'}
          </p>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
        <div className="text-sm font-space-grotesk font-bold text-red-400/70">❌ Antes: Caos Manual</div>
        <div className="text-sm font-space-grotesk font-bold text-green-400/70">✓ Después: 24/7 IA</div>
      </div>
    </div>
  );
}
