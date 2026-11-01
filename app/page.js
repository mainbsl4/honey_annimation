"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/sections/HeroSection";
import SingleProductFeature from "../components/sections/SingleProductFeature";
import WorksWheelSection from "../components/sections/WorksWheelSection";
import VideoCinematicBanner from "../components/sections/VideoCinematicBanner";
import Honeycomb3DSection from "../components/sections/Honeycomb3DSection";
import HarvestFilmReel from "../components/sections/HarvestFilmReel";
import SingleProductReserve from "../components/sections/SingleProductReserve";
import Footer from "../components/Footer";

export default function Home() {
  const [reservedCount, setReservedCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const scrollToReserve = () => {
    const el = document.getElementById("reserve");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReserveSuccess = (qty) => {
    setReservedCount((prev) => prev + qty);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-[#070402] text-[#fbf6ed] relative selection:bg-amber-500 selection:text-black">
      {/* Minimal Luxury Navigation */}
      <Navbar onOpenReserve={scrollToReserve} />

      {/* Hero Section: 3D Jar, Animated Bee & Drizzling Dipper */}
      <HeroSection onReserveClick={scrollToReserve} />

      {/* Single Product 3D Interactive Feature Stage */}
      <SingleProductFeature onReserveClick={scrollToReserve} />

      {/* Interactive 3D Works Wheel Section */}
      <WorksWheelSection />

      {/* Full-Bleed Cinematic Video Parallax Banner */}
      <VideoCinematicBanner />

      {/* 3D Honeycomb Architecture with Full Mouse Navigation */}
      <Honeycomb3DSection />

      {/* 4K Harvest Film Reel Showcase */}
      <HarvestFilmReel />

      {/* Single Bottle Acquisition Card */}
      <SingleProductReserve onReserveSuccess={handleReserveSuccess} />

      {/* Minimalist Eco-Pledge Footer */}
      <Footer />

      {/* Purchase Confirmation Toast */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel border border-amber-400/40 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in bg-[#140c06]/95">
          <span className="text-2xl">🍯</span>
          <div>
            <h4 className="font-serif text-sm text-white font-medium">
              Reservation Added!
            </h4>
            <p className="text-[11px] font-mono text-amber-300">
              Batch EX-001 ({reservedCount} {reservedCount === 1 ? "bottle" : "bottles"}) reserved for delivery.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
