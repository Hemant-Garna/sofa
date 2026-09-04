'use client';

import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { CURATED_PRODUCTS } from '@/lib/products-data';
import { Product } from '@/lib/types';
import { X, Sparkles } from 'lucide-react';

interface ProductCatalogProps {
  onOpenDetails: (product: Product) => void;
}

const CATEGORY_TABS = [
  'All Silhouettes',
  'Chesterfield',
  'Curved Modular',
  'Minimalist Tuxedo',
  'Deep Sectional',
  'Bespoke Lounger'
];

export function ProductCatalog({ onOpenDetails }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Silhouettes');
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState<string | null>(null);

  // Filter logic
  const filteredProducts = CURATED_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All Silhouettes' || product.category === selectedCategory;
    const matchesMaterial =
      !selectedMaterialFilter ||
      product.fabricType.toLowerCase().includes(selectedMaterialFilter.toLowerCase()) ||
      product.materials.some(m => m.toLowerCase().includes(selectedMaterialFilter.toLowerCase()));
    return matchesCategory && matchesMaterial;
  });

  const hasActiveFilters = selectedCategory !== 'All Silhouettes' || selectedMaterialFilter !== null;

  const handleClearAll = () => {
    setSelectedCategory('All Silhouettes');
    setSelectedMaterialFilter(null);
  };

  return (
    <section id="catalog-section" className="py-20 sm:py-28 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#A37B30] mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED PIECES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-normal tracking-tight">
            Our Curated Selection
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57534E] leading-relaxed font-light">
            Impeccably proportioned seating crafted from the finest natural hides and structured weaves.
          </p>
        </div>

        {/* Minimal Category Strip & Live Counter with Active Tags (No bulky floating box or sliders) */}
        <div className="mt-10 mb-8 border-b border-[#DFC8C1]/60 pb-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Inline Silhouette Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {CATEGORY_TABS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#1C1917] text-white font-medium shadow-2xs'
                      : 'bg-white hover:bg-[#EBD7D1]/50 text-[#57534E] hover:text-[#1C1917] border border-[#DFC8C1]/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Live item counter & Active Filter Tags with One-click Clear */}
            <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
              <span className="text-xs font-mono text-[#57534E]">
                Showing <strong className="text-[#1C1917]">{filteredProducts.length}</strong> of {CURATED_PRODUCTS.length} pieces
              </span>

              {hasActiveFilters && (
                <div className="flex items-center gap-2">
                  <span className="h-3 w-px bg-[#DFC8C1]" />
                  <button
                    id="btn-clear-catalog-filters"
                    type="button"
                    onClick={handleClearAll}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-[#A37B30] hover:text-[#8C6826] bg-[#EBD7D1]/40 px-2 py-0.5 rounded border border-[#DFC8C1] cursor-pointer"
                  >
                    <span>Clear</span>
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Quick Material Filter Secondary Pills */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs text-[#57534E]">
            <span className="text-[10px] tracking-wider uppercase font-semibold text-[#57534E]/70 shrink-0">
              Filter by Material:
            </span>
            {['Italian Leather', 'Bouclé', 'Silk Velvet', 'Belgian Linen', 'Cashmere Wool'].map((mat) => {
              const isActive = selectedMaterialFilter === mat;
              return (
                <button
                  key={mat}
                  type="button"
                  onClick={() => setSelectedMaterialFilter(isActive ? null : mat)}
                  className={`px-2.5 py-0.5 rounded text-[11px] transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#A37B30] text-white font-medium'
                      : 'bg-white/70 hover:bg-white text-[#57534E] border border-[#DFC8C1]/50'
                  }`}
                >
                  {mat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean 4-Column Product Grid (directly beneath introductory controls) */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white border border-[#DFC8C1] rounded-sm p-8">
            <h3 className="font-serif text-lg text-[#1C1917]">No sofas match your current selection</h3>
            <p className="text-xs text-[#57534E] mt-1.5">Reset your filters to explore the entire Atelier catalog.</p>
            <button
              type="button"
              onClick={handleClearAll}
              className="mt-4 px-4 py-2 bg-[#1C1917] text-white text-xs uppercase tracking-wider rounded-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
