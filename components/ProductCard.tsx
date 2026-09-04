'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, ShoppingBag, Check, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatINR } from '@/lib/products-data';
import { useCart } from '@/lib/cart-context';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      isCustom: false,
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      image: product.images[0],
      fabric: product.fabricType,
      colorName: selectedColor.name,
      colorHex: selectedColor.hex,
      unitPriceINR: product.priceINR,
      quantity: 1
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2200);
  };

  const getBadgeStyle = (badge: Product['badge']) => {
    switch (badge) {
      case 'SIGNATURE':
        return 'bg-[#A37B30] text-white';
      case 'BEST SELLER':
        return 'bg-[#1C1917] text-white';
      case 'NEW ARRIVAL':
        return 'bg-[#EBD7D1] text-[#57534E] border border-[#DFC8C1]';
      default:
        return 'bg-[#1C1917] text-white';
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white border border-[#DFC8C1]/60 hover:border-[#A37B30]/60 transition-all duration-300 rounded-sm overflow-hidden"
    >
      {/* Top Image Container */}
      <div 
        className="relative aspect-4/3 sm:aspect-16/11 w-full bg-[#FAF8F5] overflow-hidden cursor-pointer"
        onClick={() => onOpenDetails(product)}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          referrerPolicy="no-referrer"
        />

        {/* Luxury Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`text-[9px] tracking-[0.2em] font-bold uppercase px-2.5 py-1 rounded-xs shadow-2xs ${getBadgeStyle(product.badge)}`}>
            {product.badge}
          </span>
        </div>

        {/* Quick Preview Hover Button (Eye icon) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="pointer-events-auto px-4 py-2 bg-[#1C1917]/85 backdrop-blur-xs text-white text-[11px] uppercase tracking-[0.2em] font-medium rounded-xs flex items-center gap-1.5 shadow-md hover:bg-[#A37B30] transition-colors cursor-pointer"
            aria-label={`Quick look at ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick Look</span>
          </button>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Fabric Type & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#57534E] mb-1.5">
            <span className="uppercase tracking-[0.15em] font-medium text-[#A37B30]">
              {product.fabricType}
            </span>
            <div className="flex items-center gap-1 text-[#1C1917]">
              <Star className="w-3 h-3 fill-[#A37B30] text-[#A37B30]" />
              <span className="font-semibold text-xs">{product.rating}</span>
              <span className="text-[10px] text-[#57534E]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenDetails(product)}
            className="font-serif text-base sm:text-lg font-medium text-[#1C1917] group-hover:text-[#A37B30] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-[#57534E] mt-0.5 line-clamp-1">
            {product.subtitle}
          </p>

          {/* Color Swatch Dots */}
          <div className="mt-3 flex items-center space-x-1.5">
            {product.colors.map((color, index) => (
              <button
                key={color.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(index);
                }}
                className={`relative w-4 h-4 rounded-full transition-all cursor-pointer ${
                  selectedColorIndex === index
                    ? 'ring-1.5 ring-[#A37B30] ring-offset-1 scale-110'
                    : 'hover:scale-105 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex }}
                title={`${color.name}`}
                aria-label={`Select ${color.name}`}
              />
            ))}
            <span className="text-[10px] text-[#57534E] ml-1.5 capitalize font-medium">
              {selectedColor.name}
            </span>
          </div>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="mt-4 pt-3 border-t border-[#DFC8C1]/40 flex items-center justify-between gap-2">
          {/* Price formatted in INR */}
          <div>
            <div className="text-sm sm:text-base font-serif font-bold text-[#1C1917]">
              {formatINR(product.priceINR)}
            </div>
            {product.originalPriceINR && (
              <div className="text-[10px] text-[#57534E] line-through -mt-0.5">
                {formatINR(product.originalPriceINR)}
              </div>
            )}
          </div>

          {/* Action buttons: "Details" and "Cart" */}
          <div className="flex items-center space-x-1.5">
            <button
              id={`btn-details-${product.id}`}
              type="button"
              onClick={() => onOpenDetails(product)}
              className="px-2.5 sm:px-3 py-1.5 border border-[#DFC8C1] hover:border-[#1C1917] text-[#1C1917] text-[11px] uppercase tracking-wider rounded-xs transition-colors font-medium cursor-pointer"
            >
              Details
            </button>

            <button
              id={`btn-quick-cart-${product.id}`}
              type="button"
              onClick={handleQuickAdd}
              className={`px-3 py-1.5 rounded-xs text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1 transition-all duration-300 cursor-pointer ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#1C1917] hover:bg-[#A37B30] text-white'
              }`}
              title="Add to Shopping Bag"
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 animate-in zoom-in-50" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cart</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
