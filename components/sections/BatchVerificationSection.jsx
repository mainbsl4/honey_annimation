"use client";

import React, { useState } from "react";

const BATCH_DATABASE = {
  "AN-8491": {
    batch: "AN-8491",
    variety: "Alpine Wildflower Reserve",
    harvestDate: "March 18, 2026",
    elevation: "1,240m (High Alpine Range)",
    location: "Southern Alps Valley Sanctuary",
    beekeeper: "Master Apiarist Liam Thorne",
    mgo: "562 mg/kg",
    moisture: "16.1%",
    hmf: "4.8 mg/kg (Zero thermal damage)",
    enzymes: "34.2 DN (Diastase Activity)",
    purityStatus: "100% Certified Authentic Raw",
    pollenProfile: [
      { name: "Sub-Alpine White Clover", pct: "48%" },
      { name: "Wild Mountain Thyme", pct: "32%" },
      { name: "Highland Heather", pct: "20%" },
    ],
  },
  "AN-8492": {
    batch: "AN-8492",
    variety: "Silken Acacia Blossom",
    harvestDate: "April 02, 2026",
    elevation: "820m (Sunny Acacia Forest)",
    location: "Mist River Forest Valley",
    beekeeper: "Apiarist Sofia Moreau",
    mgo: "328 mg/kg",
    moisture: "15.8%",
    hmf: "3.2 mg/kg (Zero thermal damage)",
    enzymes: "29.6 DN (Diastase Activity)",
    purityStatus: "100% Certified Authentic Raw",
    pollenProfile: [
      { name: "Robinia Pseudoacacia", pct: "78%" },
      { name: "Wild Bramble Bloom", pct: "14%" },
      { name: "Meadow Sweet", pct: "8%" },
    ],
  },
  "AN-8493": {
    batch: "AN-8493",
    variety: "Highland Cut Raw Comb",
    harvestDate: "February 24, 2026",
    elevation: "1,310m (Pinnacle Ridge)",
    location: "Pinnacle Apiary Hives",
    beekeeper: "Master Apiarist Liam Thorne",
    mgo: "614 mg/kg",
    moisture: "16.4%",
    hmf: "2.9 mg/kg (Direct hive frame cut)",
    enzymes: "38.1 DN (Virgin Comb Peak)",
    purityStatus: "100% Certified Virgin Beeswax Comb",
    pollenProfile: [
      { name: "Alpine Clover", pct: "52%" },
      { name: "Wild Thyme", pct: "28%" },
      { name: "Snow Tussock Flora", pct: "20%" },
    ],
  },
};

export default function BatchVerificationSection() {
  const [inputBatch, setInputBatch] = useState("AN-8491");
  const [activeCert, setActiveCert] = useState(BATCH_DATABASE["AN-8491"]);

  const handleSearch = (e) => {
    e.preventDefault();
    const clean = inputBatch.trim().toUpperCase();
    if (BATCH_DATABASE[clean]) {
      setActiveCert(BATCH_DATABASE[clean]);
    } else {
      // Fallback to nearest batch
      setActiveCert(BATCH_DATABASE["AN-8491"]);
    }
  };

  return (
    <section id="verifier" className="py-24 bg-[#0a0703] relative border-t border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Form & Mission */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-medium">
              Single-Batch Traceability
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-amber-100 font-light leading-tight">
              Verify Your Jar&apos;s{" "}
              <span className="italic font-semibold gold-text-gradient">
                DNA & Terroir
              </span>
            </h2>
            <p className="text-sm text-amber-200/70 leading-relaxed">
              Every jar of Aura Nectar carries a laser-etched batch code on its
              base. Enter your batch number to access third-party mass
              spectrometry and botanical pollen chromatography.
            </p>

            {/* Batch Search Form */}
            <form onSubmit={handleSearch} className="space-y-3 pt-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-amber-400/80">
                Enter Laser-Etched Batch Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputBatch}
                  onChange={(e) => setInputBatch(e.target.value)}
                  placeholder="e.g. AN-8491"
                  className="flex-1 bg-[#140c06] border border-amber-500/30 rounded-xl px-4 py-3 text-amber-100 font-mono text-sm focus:outline-none focus:border-amber-400 transition-colors uppercase"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Verify
                </button>
              </div>

              {/* Sample quick tags */}
              <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-amber-300/60">
                <span>Quick inspect:</span>
                {Object.keys(BATCH_DATABASE).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setInputBatch(code);
                      setActiveCert(BATCH_DATABASE[code]);
                    }}
                    className={`underline hover:text-amber-300 transition-colors cursor-pointer ${
                      activeCert.batch === code ? "text-amber-400 font-bold" : ""
                    }`}
                  >
                    #{code}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* Right Verified Certificate Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#140d07] border-2 border-amber-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Certificate watermark seal */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full border-4 border-amber-500/10 flex items-center justify-center pointer-events-none rotate-12">
                <span className="text-amber-500/15 font-serif text-6xl font-black">
                  PURE
                </span>
              </div>

              {/* Top Certificate Header */}
              <div className="flex flex-wrap items-center justify-between pb-6 border-b border-amber-500/15 gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                    Independent Laboratory Certificate of Analysis
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-amber-100 font-semibold mt-0.5">
                    Batch #{activeCert.batch} • {activeCert.variety}
                  </h3>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
                  <span>✓ Authenticated Pure</span>
                </div>
              </div>

              {/* Grid of Results */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 py-6 border-b border-amber-500/15">
                <div>
                  <span className="text-[10px] uppercase font-mono text-amber-400/60 block">
                    Harvest Date
                  </span>
                  <span className="text-sm font-mono text-amber-200 font-medium">
                    {activeCert.harvestDate}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-amber-400/60 block">
                    Apiary Elevation
                  </span>
                  <span className="text-sm font-mono text-amber-200 font-medium">
                    {activeCert.elevation}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-amber-400/60 block">
                    Lead Apiarist
                  </span>
                  <span className="text-sm font-mono text-amber-200 font-medium">
                    {activeCert.beekeeper}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-amber-400/60 block">
                    Active MGO Potency
                  </span>
                  <span className="text-base font-mono text-amber-400 font-bold">
                    {activeCert.mgo}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-amber-400/60 block">
                    Moisture Content
                  </span>
                  <span className="text-base font-mono text-amber-400 font-bold">
                    {activeCert.moisture}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-amber-400/60 block">
                    HMF (Thermal Heat Index)
                  </span>
                  <span className="text-base font-mono text-emerald-400 font-bold">
                    {activeCert.hmf}
                  </span>
                </div>
              </div>

              {/* Pollen Profile Spectrum */}
              <div className="pt-6 space-y-3">
                <span className="text-xs uppercase font-mono text-amber-400 tracking-wider block">
                  Pollen Floral DNA Spectrum
                </span>
                <div className="space-y-2">
                  {activeCert.pollenProfile.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-amber-200">{item.name}</span>
                        <span className="text-amber-400 font-semibold">{item.pct}</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-amber-500/10">
                        <div
                          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
                          style={{ width: item.pct }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

