"use client";

import React, { useState, useEffect, useRef } from "react";

export default function AudioAmbiance() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const osc1Ref = useRef(null);
  const osc2Ref = useRef(null);

  const toggleAudio = () => {
    if (!isPlaying) {
      // Start procedural gentle meadow drone & soft bee hum
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioContext();
          audioCtxRef.current = ctx;

          const masterGain = ctx.createGain();
          masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
          masterGain.connect(ctx.destination);
          masterGainRef.current = masterGain;

          // Warm harmonic drone (nature foundation)
          const osc1 = ctx.createOscillator();
          osc1.type = "sine";
          osc1.frequency.setValueAtTime(146.83, ctx.currentTime); // D3

          // Soft flutter / bee frequency
          const osc2 = ctx.createOscillator();
          osc2.type = "triangle";
          osc2.frequency.setValueAtTime(220.0, ctx.currentTime); // A3

          // Low pass filter to keep it mellow & relaxing
          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(320, ctx.currentTime);

          // Subtle LFO for breathing movement
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
          lfoGain.gain.setValueAtTime(0.02, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(masterGain.gain);
          lfo.start();

          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(masterGain);

          osc1.start();
          osc2.start();

          osc1Ref.current = osc1;
          osc2Ref.current = osc2;
        } else {
          audioCtxRef.current.resume();
        }
        setIsPlaying(true);
      } catch (e) {
        console.warn("Audio Context init error:", e);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-950/30 hover:bg-amber-900/40 text-amber-300 text-xs transition-all cursor-pointer backdrop-blur-md"
      title={isPlaying ? "Mute meadow ambience" : "Listen to apiary soundscape"}
      type="button"
    >
      <div className="flex items-end gap-0.5 h-3">
        <span
          className={`w-0.5 bg-amber-400 rounded-full transition-all ${
            isPlaying ? "h-3 animate-pulse" : "h-1"
          }`}
        />
        <span
          className={`w-0.5 bg-amber-400 rounded-full transition-all ${
            isPlaying ? "h-2.5 animate-pulse delay-75" : "h-1"
          }`}
        />
        <span
          className={`w-0.5 bg-amber-400 rounded-full transition-all ${
            isPlaying ? "h-3.5 animate-pulse delay-150" : "h-1"
          }`}
        />
      </div>
      <span className="font-mono text-[11px] tracking-wider uppercase">
        {isPlaying ? "Apiary Sound: On" : "Ambiance"}
      </span>
    </button>
  );
}

