"use client";

import Link from "next/link";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

const HONEY_WORKS: WorksWheelItem[] = [
  {
    title: "Raw Golden Honeycomb",
    image: "/assets/honey/images/raw-golden-honeycomb.jpg",
    href: "/#hive",
  },
  {
    title: "Artisan Apothecary Flacon",
    image: "/assets/honey/images/artisan-honey-jar.jpg",
    href: "/#nectar",
  },
  {
    title: "Slow Dipper Drizzle",
    image: "/assets/honey/images/honey-dipper-drizzle.jpg",
    href: "/#nectar",
  },
  {
    title: "Sub-Alpine Sanctuary",
    image: "/assets/honey/images/alpine-meadow-apiary.jpg",
    href: "/#harvest",
  },
  {
    title: "Living Honeycomb Matrix",
    image: "/assets/honey/images/comb-honey.jpg",
    href: "/#hive",
  },
  {
    title: "Wildflower Mountain Nectar",
    image: "/assets/honey/images/wildflower-honey.jpg",
    href: "/#reserve",
  },
  {
    title: "Silken Acacia Blossom",
    image: "/assets/honey/images/acacia-honey.jpg",
    href: "/#reserve",
  },
  {
    title: "Raw Glucose Crystallization",
    image: "/assets/honey/images/honey-crystallization.jpg",
    href: "/#nectar",
  },
  {
    title: "Honey & Nut Infusion",
    image: "/assets/honey/images/nut-mix-honey.jpg",
    href: "/#reserve",
  },
];

export default function WorksWheelPage() {
  return (
    <div className="bg-[#080503] text-foreground w-full h-screen relative flex flex-col overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-amber-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 honey-hex-pattern opacity-20 pointer-events-none" />

      {/* Top Navigation */}
      <header className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-black/60 hover:bg-amber-950/50 text-amber-300 text-xs font-mono backdrop-blur-md transition-all shadow-lg hover:border-amber-400"
        >
          <span>←</span>
          <span>Return to 3D Flacon</span>
        </Link>

        <div className="hidden sm:flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel border border-amber-500/20 text-[11px] font-mono text-amber-200/80">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>Scroll wheel or drag cards to turn 3D Drum</span>
        </div>
      </header>

      {/* 3D Works Wheel Stage */}
      <div className="flex-1 w-full h-full">
        <WorksWheel items={HONEY_WORKS} label="Nectar '26" action="Explore" />
      </div>
    </div>
  );
}
