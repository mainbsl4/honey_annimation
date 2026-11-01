"use client";

import React, { useState, useEffect, useRef } from "react";

export default function AudioAmbiance() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    // Audio instance for the user's bee buzzing sound effect
    const audio = new Audio("/assets/honey/audio/bees-buzzing.mp3");
    audio.loop = true;
    audio.volume = 0.32;
    audioRef.current = audio;

    // Attempt gentle playback on first user gesture (satisfies browser autoplay policies)
    const handleFirstGesture = () => {
      if (audioRef.current && !isPlayingRef.current) {
        audioRef.current
          .play()
          .then(() => {
            isPlayingRef.current = true;
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay blocked by browser policy; user can toggle manually
          });
      }
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("scroll", handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("scroll", handleFirstGesture);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const toggleAudio = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      isPlayingRef.current = false;
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          isPlayingRef.current = true;
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio playback blocked:", err);
        });
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer backdrop-blur-md ${
        isPlaying
          ? "border-amber-400/50 bg-amber-950/60 text-amber-300 shadow-md shadow-amber-500/20"
          : "border-amber-500/20 bg-amber-950/30 hover:bg-amber-900/40 text-amber-200/70"
      }`}
      title={isPlaying ? "Mute bee buzzing ambience" : "Listen to wild bees buzzing soundscape"}
      type="button"
      aria-label="Toggle bee buzzing background sound effect"
    >
      {/* Animated Equalizer Waveform Bars */}
      <div className="flex items-end gap-0.5 h-3">
        <span
          className={`w-0.5 bg-amber-400 rounded-full transition-all duration-300 ${
            isPlaying ? "h-3 animate-pulse" : "h-1 opacity-50"
          }`}
        />
        <span
          className={`w-0.5 bg-amber-400 rounded-full transition-all duration-300 ${
            isPlaying ? "h-2 animate-pulse delay-75" : "h-1 opacity-50"
          }`}
        />
        <span
          className={`w-0.5 bg-amber-400 rounded-full transition-all duration-300 ${
            isPlaying ? "h-3.5 animate-pulse delay-150" : "h-1 opacity-50"
          }`}
        />
        <span
          className={`w-0.5 bg-amber-400 rounded-full transition-all duration-300 ${
            isPlaying ? "h-1.5 animate-pulse delay-100" : "h-1 opacity-50"
          }`}
        />
      </div>

      <span className="font-mono text-[11px] tracking-wider uppercase flex items-center gap-1.5">
        <span>🐝</span>
        <span>{isPlaying ? "Bees: Buzzing" : "Bee Ambience"}</span>
      </span>
    </button>
  );
}
