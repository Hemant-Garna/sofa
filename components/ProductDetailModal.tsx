'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShoppingBag, 
  Check, 
  Star, 
  ShieldCheck, 
  Clock, 
  Ruler, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Info
} from 'lucide-react';
import { Product } from '@/lib/types';
import { formatINR } from '@/lib/products-data';
import { useCart } from '@/lib/cart-context';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const { addItem } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care'>('details');

  if (!isOpen || !product) return null;

  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];

  const handleAddToCart = () => {
    addItem({
      isCustom: false,
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      image: product.images[activeImageIndex] || product.images[0],
      fabric: product.fabricType,
      colorName: selectedColor.name,
      colorHex: selectedColor.hex,
      unitPriceINR: product.priceINR,
      quantity
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2200);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1C1917]/70 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-5xl bg-white rounded-sm border border-[#DFC8C1] shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#1C1917] hover:text-[#A37B30] transition-colors border border-[#DFC8C1] shadow-xs cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Gallery Carousel */}
          <div className="md:w-1/2 bg-[#FAF8F5] p-5 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#DFC8C1]">
            
            {/* Main Carousel Display */}
            <div className="relative aspect-4/3 w-full rounded-sm overflow-hidden bg-white shadow-xs border border-[#DFC8C1]/60 group">
              <Image
                src={product.images[activeImageIndex]}
                alt={`${product.name} view ${activeImageIndex + 1}`}
                fill
                priority
                className="object-cover object-center transition-all duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next Carousel Controls */}
              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-[#1C1917] shadow-xs transition-all opacity-80 hover:opacity-100 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-[#1C1917] shadow-xs transition-all opacity-80 hover:opacity-100 cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Image Counter Badge */}
              <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono rounded">
                0{activeImageIndex + 1} / 0{product.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="mt-4 flex items-center space-x-3 overflow-x-auto no-scrollbar py-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-12 rounded-xs overflow-hidden shrink-0 border transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#A37B30] ring-1 ring-[#A37B30]'
                      : 'border-[#DFC8C1] opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="64px"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

            {/* Artisan Assurance Note */}
            <div className="mt-6 pt-4 border-t border-[#DFC8C1]/60 flex items-center justify-between text-xs text-[#57534E]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#A37B30]" />
                {product.warranty}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#A37B30]" />
                Handcrafted to Order
              </span>
            </div>

          </div>

          {/* Right Column: Specifications & Cart Action */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            
            <div className="space-y-5">
              
              {/* Top Header & Badge */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A37B30] bg-[#EBD7D1]/50 px-2.5 py-0.5 rounded-xs">
                    {product.badge}
                  </span>
                  <span className="text-xs text-[#57534E] uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-medium">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#57534E] mt-0.5">
                  {product.subtitle}
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <div className="flex items-center text-[#A37B30]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#A37B30] text-[#A37B30]" />
                    ))}
                  </div>
                  <span className="font-semibold text-[#1C1917]">{product.rating}</span>
                  <span className="text-[#57534E]">({product.reviewsCount} verified connoisseur reviews)</span>
                </div>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-[#DFC8C1]/60">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
                  {formatINR(product.priceINR)}
                </span>
                {product.originalPriceINR && (
                  <span className="text-sm text-[#57534E] line-through">
                    {formatINR(product.originalPriceINR)}
                  </span>
                )}
                <span className="text-[11px] text-[#A37B30] font-medium uppercase tracking-wider ml-auto">
                  Inclusive of All Luxury Duties
                </span>
              </div>

              {/* Color Swatch Selection */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#57534E] font-medium">Curated Leather / Textile Hue:</span>
                  <strong className="text-[#1C1917]">{selectedColor.name}</strong>
                </div>
                <div className="flex items-center space-x-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`relative w-7 h-7 rounded-full transition-all cursor-pointer ${
                        selectedColorIndex === idx
                          ? 'ring-2 ring-[#A37B30] ring-offset-2 scale-110 shadow-xs'
                          : 'hover:scale-105 opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColorIndex === idx && (
                        <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto drop-shadow-xs" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tabbed Specifications View */}
              <div>
                <div className="flex border-b border-[#DFC8C1]/60 text-xs font-semibold tracking-wider uppercase">
                  <button
                    type="button"
                    onClick={() => setActiveTab('details')}
                    className={`py-2 px-3 transition-colors border-b-2 cursor-pointer ${
                      activeTab === 'details'
                        ? 'border-[#1C1917] text-[#1C1917]'
                        : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('specs')}
                    className={`py-2 px-3 transition-colors border-b-2 cursor-pointer ${
                      activeTab === 'specs'
                        ? 'border-[#1C1917] text-[#1C1917]'
                        : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    Dimensions & Frame
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('care')}
                    className={`py-2 px-3 transition-colors border-b-2 cursor-pointer ${
                      activeTab === 'care'
                        ? 'border-[#1C1917] text-[#1C1917]'
                        : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    Fabric Care
                  </button>
                </div>

                <div className="py-3 text-xs text-[#57534E] leading-relaxed">
                  {activeTab === 'details' && (
                    <p className="font-light">{product.description}</p>
                  )}

                  {activeTab === 'specs' && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2 bg-[#FAF8F5] p-2.5 rounded border border-[#DFC8C1]/50">
                        <div>
                          <span className="font-semibold text-[#1C1917] block">Dimensions:</span>
                          <span>W: {product.dimensions.width} &bull; D: {product.dimensions.depth}</span>
                          <span className="block">H: {product.dimensions.height} (Seat: {product.dimensions.seatHeight})</span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#1C1917] block">Framework:</span>
                          <span>{product.frameMaterial}</span>
                        </div>
                      </div>
                      <p className="text-[11px] italic text-[#57534E]">
                        Cushion Fill: {product.cushionFill}
                      </p>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <div className="space-y-1.5">
                      <p>{product.fabricCare}</p>
                      <p className="text-[11px] text-[#A37B30] font-medium">
                        White-glove placement and packaging removal included with every order.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Bottom Actions: Quantity Selector & Add to Bag Button */}
            <div className="mt-6 pt-4 border-t border-[#DFC8C1] space-y-3">
              
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-[#DFC8C1] rounded-xs bg-[#FAF8F5]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm text-[#1C1917] hover:bg-[#EBD7D1]/50 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-semibold text-[#1C1917]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sm text-[#1C1917] hover:bg-[#EBD7D1]/50 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  id="btn-modal-add-to-bag"
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xs text-xs uppercase tracking-[0.25em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#1C1917] hover:bg-[#A37B30] text-white shadow-md'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 animate-in zoom-in" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag &bull; {formatINR(product.priceINR * quantity)}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-[10px] text-[#57534E]">
                <span>Concierge White-Glove Installation Included &bull; 10-Year Framework Guarantee</span>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
