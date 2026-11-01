"use client";

import React, { useState } from "react";
import Image from "next/image";
import { OrbitControls } from "@react-three/drei";
import ThreeCanvasWrapper from "../canvas/ThreeCanvasWrapper";
import HoneyJarModel from "../canvas/HoneyJarModel";
import HoneycombShowcaseCanvas from "../canvas/HoneycombShowcaseCanvas";
import NutMixExperience from "../canvas/NutMixExperience";

export const PRODUCTS = [
  {
    id: "wildflower",
    name: "Alpine Wildflower Reserve",
    subtitle: "Raw Mountain Nectar",
    price: 38.0,
    weight: "500g / 17.6 oz",
    batch: "AN-8491",
    mgo: "550+ MGO",
    moisture: "16.1%",
    image: "/assets/honey/images/wildflower-honey.jpg",
    modelType: "jar",
    flavorNotes: ["Wild Mountain Thyme", "Clover Blossom", "Golden Toffee"],
    description:
      "Our hallmark reserve harvested at 1,200m altitude. Thick, deep amber nectar with complex floral depth and potent bio-activity.",
  },
  {
    id: "acacia",
    name: "Silken Acacia Blossom",
    subtitle: "Pure Monofloral Radiance",
    price: 42.0,
    weight: "500g / 17.6 oz",
    batch: "AN-8492",
    mgo: "320+ MGO",
    moisture: "15.8%",
    image: "/assets/honey/images/acacia-honey.jpg",
    modelType: "jar",
    flavorNotes: ["Vanilla Orchid", "White Acacia", "Warm Brioche"],
    description:
      "Ultra-pure monofloral nectar from secluded acacia groves. Exceptionally light, slow to crystallize, and naturally sweet.",
  },
  {
    id: "comb",
    name: "Highland Cut Raw Comb",
    subtitle: "Straight From Hive Frames",
    price: 48.0,
    weight: "450g / 15.8 oz",
    batch: "AN-8493",
    mgo: "600+ MGO",
    moisture: "16.4%",
    image: "/assets/honey/images/comb-honey.jpg",
    modelType: "comb",
    flavorNotes: ["Raw Beeswax", "Alpine Heather", "Living Propolis"],
    description:
      "Virgin beeswax comb filled and sealed by the bees themselves. Chew the wax to release maximum propolis and pollen nutrients.",
  },
  {
    id: "nutmix",
    name: "Acacia Roasted Nut Medley",
    subtitle: "Gourmet Apiary Fusion",
    price: 36.0,
    weight: "400g / 14.1 oz",
    batch: "AN-8494",
    mgo: "300+ MGO",
    moisture: "16.0%",
    image: "/assets/honey/images/nut-mix-honey.jpg",
    modelType: "nutmix",
    flavorNotes: ["Glazed Walnut", "Roasted Almond", "Wild Forest Nectar"],
    description:
      "Select organic walnuts, almonds, and hazelnuts slowly steeped in pure liquid acacia honey. A rich, nourishing morning ritual.",
  },
];

export default function ProductCollectionSection({ onAddToCart }) {
  const [viewModes, setViewModes] = useState({}); // { [productId]: 'photo' | '3d' }

  const toggleViewMode = (id) => {
    setViewModes((prev) => ({
      ...prev,
      [id]: prev[id] === "3d" ? "photo" : "3d",
    }));
  };

  const render3DModel = (type) => {
    switch (type) {
      case "comb":
        return (
          <ThreeCanvasWrapper
            className="w-full h-full cursor-grab active:cursor-grabbing"
            camera={{ position: [0, 0.8, 3.8], fov: 45 }}
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[3, 4, 3]} intensity={2.5} color="#fef08a" />
            <directionalLight position={[-3, -2, -2]} intensity={1} color="#f59e0b" />
            <OrbitControls
              makeDefault
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              minDistance={1.8}
              maxDistance={6.0}
              autoRotate={true}
              autoRotateSpeed={0.8}
            />
            <HoneycombShowcaseCanvas scale={0.9} position={[0, 0, 0]} />
          </ThreeCanvasWrapper>
        );
      case "nutmix":
        return (
          <ThreeCanvasWrapper
            className="w-full h-full cursor-grab active:cursor-grabbing"
            camera={{ position: [0, 0, 4.5], fov: 45 }}
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[3, 4, 3]} intensity={2.2} color="#fef08a" />
            <directionalLight position={[-3, -2, -2]} intensity={1.2} color="#f59e0b" />
            <OrbitControls
              makeDefault
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              minDistance={1.8}
              maxDistance={6.5}
              autoRotate={true}
              autoRotateSpeed={0.8}
            />
            <NutMixExperience scale={0.35} position={[0, 0, 0]} />
          </ThreeCanvasWrapper>
        );
      case "jar":
      default:
        return (
          <ThreeCanvasWrapper
            className="w-full h-full cursor-grab active:cursor-grabbing"
            camera={{ position: [0, 0, 4.2], fov: 45 }}
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[3, 4, 3]} intensity={2.5} color="#fef08a" />
            <directionalLight position={[-3, -2, -2]} intensity={1} color="#f59e0b" />
            <OrbitControls
              makeDefault
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              minDistance={1.8}
              maxDistance={6.0}
              autoRotate={true}
              autoRotateSpeed={0.8}
            />
            <HoneyJarModel scale={0.42} position={[0, 0, 0]} autoRotate={false} />
          </ThreeCanvasWrapper>
        );
    }
  };

  return (
    <section id="collection" className="py-28 relative bg-[#090603]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-medium">
              Curated Harvests
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-amber-100 font-light">
              The Autumn{" "}
              <span className="italic font-semibold gold-text-gradient">
                Reserve Collection
              </span>
            </h2>
            <p className="text-amber-200/60 text-sm sm:text-base max-w-xl">
              Each jar is numbered, sealed with natural beeswax, and certified
              with an individualized laboratory authenticity analysis.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto font-mono text-xs text-amber-400/80 bg-amber-950/30 px-4 py-2 rounded-full border border-amber-500/20">
            <span>✨ 3D Model Inspection Available on All Jars</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => {
            const is3D = viewModes[product.id] === "3d";

            return (
              <div
                key={product.id}
                className="group rounded-3xl glass-panel p-5 flex flex-col justify-between border border-amber-500/15 hover:border-amber-500/35 transition-all duration-300"
              >
                {/* Visual Area: Toggle between 3D model and Studio Photo */}
                <div>
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/60 border border-amber-500/15 mb-4">
                    {is3D ? (
                      <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
                        {render3DModel(product.modelType)}
                        <span className="absolute bottom-2 left-2 text-[10px] font-mono text-amber-300/80 bg-black/60 px-2 py-0.5 rounded-full border border-amber-500/20">
                          3D Interactive
                        </span>
                      </div>
                    ) : (
                      <div className="w-full h-full relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      </div>
                    )}

                    {/* View Switcher Button */}
                    <button
                      onClick={() => toggleViewMode(product.id)}
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[10px] font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer z-10"
                    >
                      <span>{is3D ? "📷 Photo" : "🧊 3D View"}</span>
                    </button>

                    {/* MGO Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-500/90 text-black text-[10px] font-bold font-mono uppercase tracking-wider">
                      {product.mgo}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                      {product.subtitle}
                    </span>
                    <h3 className="font-serif text-lg text-amber-100 group-hover:text-amber-300 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-amber-200/60 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Tasting Flavor Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {product.flavorNotes.map((note, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-950/50 border border-amber-500/15 text-amber-300/80"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & Add to Cart */}
                <div className="pt-5 mt-4 border-t border-amber-500/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-amber-200/50 block font-mono">
                      {product.weight}
                    </span>
                    <span className="text-lg font-mono font-bold text-amber-300">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs uppercase tracking-wider shadow-md shadow-amber-500/15 hover:shadow-amber-500/30 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>+ Reserve</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

