"use client";

import React from "react";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

const HONEY_WORKS: WorksWheelItem[] = [
  {
    title: "Raw Golden Honeycomb",
    image: "/assets/honey/images/raw-golden-honeycomb.jpg",
    href: "#hive",
  },
  {
    title: "Artisan Apothecary Flacon",
    image: "/assets/honey/images/artisan-honey-jar.jpg",
    href: "#nectar",
  },
  {
    title: "Slow Dipper Drizzle",
    image: "/assets/honey/images/honey-dipper-drizzle.jpg",
    href: "#nectar",
  },
  {
    title: "Sub-Alpine Sanctuary",
    image: "/assets/honey/images/alpine-meadow-apiary.jpg",
    href: "#harvest",
  },
  {
    title: "Living Honeycomb Matrix",
    image: "/assets/honey/images/comb-honey.jpg",
    href: "#hive",
  },
  {
    title: "Wildflower Mountain Nectar",
    image: "/assets/honey/images/wildflower-honey.jpg",
    href: "#reserve",
  },
  {
    title: "Silken Acacia Blossom",
    image: "/assets/honey/images/acacia-honey.jpg",
    href: "#reserve",
  },
  {
    title: "Raw Glucose Crystallization",
    image: "/assets/honey/images/honey-crystallization.jpg",
    href: "#nectar",
  },
  {
    title: "Honey & Nut Infusion",
    image: "/assets/honey/images/nut-mix-honey.jpg",
    href: "#reserve",
  },
];

export default function WorksWheelSection() {
  return (
    <section id="wheel" className="py-24 bg-[#080503] relative border-t border-amber-500/10 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-amber-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 honey-hex-pattern opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center space-y-3 relative z-10">
        <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-medium">
          Interactive Portfolio Wheel
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-white font-light">
          Botanical{" "}
          <span className="italic font-semibold gold-text-gradient">
            Archive & Harvest
          </span>
        </h2>
        <p className="text-amber-200/60 text-xs sm:text-sm max-w-lg mx-auto font-light">
          Scroll or drag the 3D drum to explore the single-origin harvests, raw comb structures, and apian photography.
        </p>
      </div>

      {/* 3D Wheel Drum Container */}
      <div className="w-full h-[620px] sm:h-[720px] relative">
        <WorksWheel items={HONEY_WORKS} label="Nectar '26" action="Explore" />
      </div>
    </section>
  );
}

