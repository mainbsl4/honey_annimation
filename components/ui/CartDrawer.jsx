"use client";

import React from "react";
import Image from "next/image";

export default function CartDrawer({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
}) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const freeShippingThreshold = 75;
  const progressPercent = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );
  const difference = (freeShippingThreshold - subtotal).toFixed(2);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#120b06] border-l border-amber-500/20 text-[#fbf6ed] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-amber-500/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🍯</span>
              <h2 className="text-lg font-serif tracking-wide text-amber-200">
                Your Nectar Reserve
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-amber-500/20 flex items-center justify-center text-amber-400/80 hover:text-amber-200 hover:border-amber-500/50 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-6 py-4 bg-amber-950/20 border-b border-amber-500/10">
            <div className="flex justify-between text-xs mb-1.5 font-mono">
              <span className="text-amber-300">
                {subtotal >= freeShippingThreshold
                  ? "✓ Complimentary Cold-Chain Delivery unlocked!"
                  : `Add $${difference} for Free Cold-Chain Delivery`}
              </span>
              <span className="text-amber-500">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-amber-500/10">
              <div
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
                <span className="text-4xl opacity-40">🐝</span>
                <p className="text-amber-200/60 font-serif">
                  Your basket is currently empty.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 text-xs uppercase tracking-widest text-amber-400 border-b border-amber-400 pb-0.5"
                >
                  Explore The Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl bg-amber-950/15 border border-amber-500/10 hover:border-amber-500/25 transition-all"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black/40 border border-amber-500/15 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm text-amber-100">
                          {item.name}
                        </h4>
                        <span className="text-amber-400 font-mono text-sm font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-amber-200/50 mt-0.5">
                        {item.weight} • Batch {item.batch}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-amber-500/20 rounded-md overflow-hidden bg-black/30">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-0.5 text-xs text-amber-300 hover:bg-amber-900/40"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-mono text-amber-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-0.5 text-xs text-amber-300 hover:bg-amber-900/40"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-xs text-amber-500/60 hover:text-amber-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Subtotal & Checkout Section */}
          {items.length > 0 && (
            <div className="p-6 border-t border-amber-500/15 bg-black/40 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-amber-200/60">
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-amber-200/60">
                  <span>Cold-Chain Packaging</span>
                  <span className="font-mono text-amber-400">Complimentary</span>
                </div>
                <div className="flex justify-between text-base font-serif text-amber-100 pt-2 border-t border-amber-500/10">
                  <span>Total Due</span>
                  <span className="font-mono text-amber-400 font-bold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  alert("Thank you! Connecting to secure encrypted checkout...")
                }
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-semibold tracking-wider uppercase text-xs shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.01] transition-all cursor-pointer"
              >
                Proceed to Secure Reserve
              </button>

              <p className="text-center text-[10px] text-amber-400/50 uppercase tracking-widest font-mono">
                100% Carbon Neutral Delivery • Raw Bee Pledge
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

