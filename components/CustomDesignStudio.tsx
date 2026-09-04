'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SILHOUETTES, 
  MATERIALS, 
  BASE_FINISHES, 
  FIRMNESS_OPTIONS, 
  formatINR 
} from '@/lib/products-data';
import { useCart } from '@/lib/cart-context';
import { 
  Sparkles, 
  Check, 
  ShoppingBag, 
  RotateCcw, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Palette,
  Maximize2
} from 'lucide-react';

export function CustomDesignStudio() {
  const { addItem } = useCart();

  // Custom configuration state
  const [selectedSilhouette, setSelectedSilhouette] = useState(SILHOUETTES[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [selectedColor, setSelectedColor] = useState(MATERIALS[0].colorSwatches[0]);
  const [selectedBaseFinish, setSelectedBaseFinish] = useState(BASE_FINISHES[1]); // Brushed Brass default
  const [selectedFirmness, setSelectedFirmness] = useState(FIRMNESS_OPTIONS[1]); // Balanced default
  const [activePerspective, setActivePerspective] = useState<'front' | 'threeQuarter' | 'top' | 'detail'>('threeQuarter');
  const [isOrdered, setIsOrdered] = useState(false);

  // When material changes, update default selected color to that material's first swatch
  const handleMaterialSelect = (material: typeof MATERIALS[0]) => {
    setSelectedMaterial(material);
    setSelectedColor(material.colorSwatches[0]);
  };

  // Real-time dynamic price calculator
  const totalPriceINR = 
    selectedSilhouette.basePriceINR + 
    selectedMaterial.priceDeltaINR + 
    selectedBaseFinish.priceDeltaINR + 
    selectedFirmness.priceDeltaINR;

  const handleOrderCustomBuild = () => {
    addItem({
      isCustom: true,
      name: `${selectedSilhouette.name} [Bespoke Atelier]`,
      subtitle: `${selectedMaterial.name} in ${selectedColor.name} & ${selectedBaseFinish.name}`,
      image: selectedSilhouette.images[activePerspective] || selectedSilhouette.images.threeQuarter,
      fabric: selectedMaterial.name,
      colorName: selectedColor.name,
      colorHex: selectedColor.hex,
      baseFinishName: selectedBaseFinish.name,
      firmnessName: selectedFirmness.name,
      unitPriceINR: totalPriceINR,
      quantity: 1,
      customDetails: {
        silhouette: selectedSilhouette.name,
        material: selectedMaterial.name,
        baseFinish: selectedBaseFinish.name,
        firmness: selectedFirmness.name
      }
    });

    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
    }, 2400);
  };

  // Perspective image mapping
  const currentPreviewImage = selectedSilhouette.images[activePerspective];

  return (
    <section id="studio-section" className="py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#DFC8C1]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Studio Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#A37B30] mb-2.5">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>BESPOKE ATELIER STUDIO</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal tracking-tight">
            Design Your Custom Sofa
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57534E] leading-relaxed font-light">
            Select your architectural silhouette, curated textile, base alloy finish, and ergonomics. Bench-crafted to your bespoke specifications.
          </p>
        </div>

        {/* Studio Main Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center Column: Visual 3D / Perspective Preview & Live Specs (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Visual Stage Container */}
            <div className="relative aspect-16/11 sm:aspect-16/10 w-full bg-white rounded-sm border border-[#DFC8C1] overflow-hidden shadow-xs">
              
              {/* Active Preview Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedSilhouette.id}-${activePerspective}`}
                  initial={{ opacity: 0.5, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.5 }}
                  transition={{ duration: 0.35 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentPreviewImage}
                    alt={selectedSilhouette.name}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle color tone overlay reflecting custom swatch */}
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-color opacity-25 transition-colors duration-500"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* View Perspective Switcher Toolbar */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2 py-1 rounded-sm border border-[#DFC8C1]/80 shadow-2xs">
                <span className="text-[9px] uppercase tracking-wider font-semibold text-[#57534E] mr-1">Angle:</span>
                {(['threeQuarter', 'front', 'top', 'detail'] as const).map((view) => {
                  const labels = {
                    threeQuarter: '3/4 Perspective',
                    front: 'Front Elevation',
                    top: 'Plan / Overhead',
                    detail: 'Craft Detail'
                  };
                  return (
                    <button
                      key={view}
                      type="button"
                      onClick={() => setActivePerspective(view)}
                      className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-xs transition-all cursor-pointer ${
                        activePerspective === view
                          ? 'bg-[#1C1917] text-white font-medium'
                          : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      {labels[view]}
                    </button>
                  );
                })}
              </div>

              {/* Active Selection Overlay Chip */}
              <div className="absolute bottom-4 left-4 z-10 bg-[#1C1917]/90 backdrop-blur-md text-white px-3.5 py-2 rounded-xs border border-white/10 shadow-md">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#A37B30] font-semibold">
                  {selectedSilhouette.name}
                </div>
                <div className="text-xs font-serif font-light text-white/90">
                  {selectedMaterial.name} in {selectedColor.name}
                </div>
              </div>

              {/* Live Price Tag on Stage */}
              <div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xs border border-[#DFC8C1] shadow-md text-right">
                <span className="text-[9px] uppercase tracking-wider text-[#57534E] block">Bespoke Build Total</span>
                <span className="text-base sm:text-lg font-serif font-bold text-[#1C1917]">
                  {formatINR(totalPriceINR)}
                </span>
              </div>
            </div>

            {/* Architectural Specifications Strip */}
            <div className="bg-white p-5 rounded-sm border border-[#DFC8C1] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#57534E]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#57534E]/80 block font-semibold">Dimensions</span>
                <span className="text-[#1C1917] font-medium mt-0.5 block">{selectedSilhouette.dimensions}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#57534E]/80 block font-semibold">Fabric Origin</span>
                <span className="text-[#1C1917] font-medium mt-0.5 block">{selectedMaterial.origin.split(',')[0]}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#57534E]/80 block font-semibold">Lead Time</span>
                <span className="text-[#1C1917] font-medium mt-0.5 block">3 - 4 Weeks</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#57534E]/80 block font-semibold">Warranty</span>
                <span className="text-[#1C1917] font-medium mt-0.5 block">10-Year Framework</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Configuration Steps (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-sm border border-[#DFC8C1] space-y-7 shadow-xs">
            
            {/* Step 1: Silhouette Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1C1917] flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#1C1917] text-white text-[9px] flex items-center justify-center">1</span>
                  <span>Select Silhouette</span>
                </label>
                <span className="text-[11px] font-mono text-[#A37B30]">
                  from {formatINR(selectedSilhouette.basePriceINR)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {SILHOUETTES.map((sil) => {
                  const isSelected = selectedSilhouette.id === sil.id;
                  return (
                    <button
                      key={sil.id}
                      type="button"
                      onClick={() => setSelectedSilhouette(sil)}
                      className={`p-3 text-left border rounded-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#A37B30] bg-[#FAF8F5] ring-1 ring-[#A37B30]'
                          : 'border-[#DFC8C1]/70 hover:border-[#1C1917] hover:bg-[#FAF8F5]/50'
                      }`}
                    >
                      <div className="font-serif text-xs font-semibold text-[#1C1917] truncate">
                        {sil.name}
                      </div>
                      <div className="text-[10px] text-[#57534E] mt-0.5 line-clamp-1">
                        {sil.tagline}
                      </div>
                      <div className="text-[11px] font-mono text-[#A37B30] mt-1.5">
                        {formatINR(sil.basePriceINR)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Material & Fabric Selection + Color Swatches */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1C1917] flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#1C1917] text-white text-[9px] flex items-center justify-center">2</span>
                  <span>Curated Textile & Color</span>
                </label>
                <span className="text-[11px] text-[#57534E]">
                  {selectedMaterial.origin.split(',')[0]}
                </span>
              </div>

              {/* Material Tabs */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {MATERIALS.map((mat) => {
                  const isSelected = selectedMaterial.id === mat.id;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => handleMaterialSelect(mat)}
                      className={`px-3 py-2 text-left border rounded-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#A37B30] bg-[#FAF8F5] font-semibold text-[#1C1917]'
                          : 'border-[#DFC8C1]/70 text-[#57534E] hover:border-[#1C1917]'
                      }`}
                    >
                      <div className="text-xs">{mat.name}</div>
                      <div className="text-[10px] text-[#A37B30]">+{formatINR(mat.priceDeltaINR)}</div>
                    </button>
                  );
                })}
              </div>

              {/* Interactive Color Swatches */}
              <div className="bg-[#FAF8F5] p-3 rounded-xs border border-[#DFC8C1]/60">
                <div className="flex items-center justify-between text-[11px] text-[#57534E] mb-2.5">
                  <span>Selected Shade: <strong className="text-[#1C1917]">{selectedColor.name}</strong></span>
                  <span className="text-[10px] uppercase font-mono">{selectedColor.hex}</span>
                </div>
                <div className="flex items-center space-x-3">
                  {selectedMaterial.colorSwatches.map((swatch) => {
                    const isCurrentColor = selectedColor.id === swatch.id;
                    return (
                      <button
                        key={swatch.id}
                        type="button"
                        onClick={() => setSelectedColor(swatch)}
                        className={`relative w-7 h-7 rounded-full transition-all cursor-pointer ${
                          isCurrentColor
                            ? 'ring-2 ring-[#A37B30] ring-offset-2 scale-110 shadow-sm'
                            : 'hover:scale-105 opacity-85 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: swatch.hex }}
                        title={`${swatch.name}`}
                        aria-label={`Select ${swatch.name}`}
                      >
                        {isCurrentColor && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white drop-shadow-xs" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-[#57534E] mt-2.5 italic">
                  {selectedMaterial.textureDescription}
                </p>
              </div>
            </div>

            {/* Step 3: Base & Leg Finishes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1C1917] flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#1C1917] text-white text-[9px] flex items-center justify-center">3</span>
                  <span>Base & Leg Finish</span>
                </label>
                <span className="text-[11px] text-[#A37B30]">
                  +{formatINR(selectedBaseFinish.priceDeltaINR)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {BASE_FINISHES.map((finish) => {
                  const isSelected = selectedBaseFinish.id === finish.id;
                  return (
                    <button
                      key={finish.id}
                      type="button"
                      onClick={() => setSelectedBaseFinish(finish)}
                      className={`p-2.5 text-center border rounded-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#A37B30] bg-[#FAF8F5] ring-1 ring-[#A37B30]'
                          : 'border-[#DFC8C1]/70 hover:border-[#1C1917]'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full mx-auto mb-1.5 border border-stone-300 shadow-2xs"
                        style={{ backgroundColor: finish.colorHex }}
                      />
                      <div className="text-[11px] font-medium text-[#1C1917] truncate">{finish.name}</div>
                      <div className="text-[9px] text-[#57534E] mt-0.5">+{formatINR(finish.priceDeltaINR)}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Cushion Ergonomics & Firmness */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1C1917] flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-[#1C1917] text-white text-[9px] flex items-center justify-center">4</span>
                  <span>Cushion Firmness</span>
                </label>
                <span className="text-[11px] text-[#A37B30]">
                  {selectedFirmness.priceDeltaINR > 0 ? `+${formatINR(selectedFirmness.priceDeltaINR)}` : 'Standard'}
                </span>
              </div>

              <div className="space-y-1.5">
                {FIRMNESS_OPTIONS.map((opt) => {
                  const isSelected = selectedFirmness.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedFirmness(opt)}
                      className={`w-full p-2.5 text-left border rounded-xs transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[#A37B30] bg-[#FAF8F5] ring-1 ring-[#A37B30]'
                          : 'border-[#DFC8C1]/70 hover:border-[#1C1917]'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-medium text-[#1C1917]">{opt.name}</span>
                        <span className="text-[11px] text-[#57534E] ml-2 font-light">({opt.feel})</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#57534E]">
                        {opt.priceDeltaINR > 0 ? `+${formatINR(opt.priceDeltaINR)}` : 'Included'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary Breakdown & Dynamic Price Footer */}
            <div className="pt-4 border-t border-[#DFC8C1] space-y-3">
              
              <div className="space-y-1 text-xs text-[#57534E]">
                <div className="flex justify-between">
                  <span>Base Silhouette ({selectedSilhouette.name}):</span>
                  <span>{formatINR(selectedSilhouette.basePriceINR)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fabric ({selectedMaterial.name}):</span>
                  <span>+{formatINR(selectedMaterial.priceDeltaINR)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Base Alloy ({selectedBaseFinish.name}):</span>
                  <span>+{formatINR(selectedBaseFinish.priceDeltaINR)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ergonomics ({selectedFirmness.name}):</span>
                  <span>+{formatINR(selectedFirmness.priceDeltaINR)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#DFC8C1]/40 text-sm font-semibold text-[#1C1917]">
                  <span className="font-serif">Calculated Bespoke Investment:</span>
                  <span className="font-serif text-[#A37B30] text-base">{formatINR(totalPriceINR)}</span>
                </div>
              </div>

              {/* Order Custom Build Button */}
              <button
                id="btn-order-custom-build"
                type="button"
                onClick={handleOrderCustomBuild}
                className={`w-full py-4 text-xs uppercase tracking-[0.25em] font-semibold rounded-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  isOrdered
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#1C1917] hover:bg-[#A37B30] text-white shadow-md'
                }`}
              >
                {isOrdered ? (
                  <>
                    <Check className="w-4 h-4 animate-in zoom-in" />
                    <span>Configuration Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order Custom Build &bull; {formatINR(totalPriceINR)}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-[#57534E] text-center pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A37B30]" />
                  10-Yr Framework Warranty
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#A37B30]" />
                  White-Glove Delivery in 3-4 Weeks
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
