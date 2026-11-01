"use client";

import React, { useState } from "react";

const RITUALS = [
  {
    id: "cheese",
    title: "Artisanal Cheese & Fig Platter",
    pairWith: "Alpine Wildflower Reserve",
    subtitle: "Savory & Floral Contrast",
    steps: [
      "Slice aged sharp Pecorino, Comte, or fresh chèvre.",
      "Drizzle thick amber wildflower honey over ripe black mission figs.",
      "Sprinkle with flaky sea salt to amplify the caramel floral undertones.",
    ],
    sommelierNote:
      "The natural acidity of sheep's milk cheese balances the dense floral complexity of high-altitude nectar.",
  },
  {
    id: "matcha",
    title: "Morning Ceremonial Elixir",
    pairWith: "Silken Acacia Blossom",
    subtitle: "Enzymatic Vitality",
    steps: [
      "Whisk ceremonial grade stone-ground Uji matcha with 70°C spring water.",
      "Allow elixir to cool slightly below 40°C to protect living honey enzymes.",
      "Stir in one generous teaspoon of Silken Acacia honey until seamlessly emulsified.",
    ],
    sommelierNote:
      "Acacia honey possesses low sucrose and light crystalline sweetness that complements the umami notes of matcha without overpowering them.",
  },
  {
    id: "sourdough",
    title: "Crusty Sourdough & Cultured Butter",
    pairWith: "Highland Cut Raw Comb",
    subtitle: "Textures of the Hearth",
    steps: [
      "Toast thick slices of naturally leavened whole-grain sourdough.",
      "Spread generous room-temperature salted cultured pasture butter.",
      "Cut a square of virgin raw honeycomb directly onto the hot bread so it softens into the crumb.",
    ],
    sommelierNote:
      "The edible beeswax adds a pleasant rustic chewiness while delivering maximum propolis and cellular bio-potency.",
  },
];

export default function TastingRitualSection() {
  const [activeRitual, setActiveRitual] = useState(RITUALS[0]);

  return (
    <section id="rituals" className="py-24 bg-[#0d0905] relative border-t border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-medium">
            Art of Savoring
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-amber-100 font-light">
            The Sommelier{" "}
            <span className="italic font-semibold gold-text-gradient">
              Pairing Rituals
            </span>
          </h2>
          <p className="text-sm sm:text-base text-amber-200/60">
            Raw honey is not mere sugar—it is a vintage product of terroir, soil,
            and season. Elevate your culinary moments.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {RITUALS.map((ritual) => (
            <button
              key={ritual.id}
              onClick={() => setActiveRitual(ritual)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeRitual.id === ritual.id
                  ? "bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/25"
                  : "bg-amber-950/30 border border-amber-500/20 text-amber-300/80 hover:text-amber-100"
              }`}
            >
              {ritual.title}
            </button>
          ))}
        </div>

        {/* Card Content */}
        <div className="max-w-4xl mx-auto rounded-3xl glass-panel border border-amber-500/25 p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">
                Recommended Pairing: {activeRitual.pairWith}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-amber-100 font-medium">
                {activeRitual.title}
              </h3>
              <p className="text-xs text-amber-300/70 font-mono">
                {activeRitual.subtitle}
              </p>

              <div className="space-y-3 pt-2">
                {activeRitual.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-amber-200/80">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 bg-[#140c06] rounded-2xl p-6 border border-amber-500/15 space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono block">
                Sommelier Tasting Note
              </span>
              <p className="text-xs text-amber-200/90 leading-relaxed italic font-serif">
                &ldquo;{activeRitual.sommelierNote}&rdquo;
              </p>
              <div className="pt-3 border-t border-amber-500/10 flex items-center gap-2">
                <span className="text-lg">🍯</span>
                <span className="text-xs font-mono text-amber-400">
                  Ideal Serving Temp: 18°C – 22°C
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

