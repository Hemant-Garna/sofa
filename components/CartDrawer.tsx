'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Tag, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatINR } from '@/lib/products-data';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onExploreCatalog: () => void;
}

export function CartDrawer({ onProceedToCheckout, onExploreCatalog }: CartDrawerProps) {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotalINR,
    discountINR,
    discountPercent,
    promoCode,
    promoError,
    applyPromoCode,
    removePromoCode,
    whiteGloveShippingINR,
    totalINR,
    itemCount
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyPromoCode(inputCoupon);
    setCouponFeedback(res.message);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#1C1917]/60 backdrop-blur-xs transition-opacity"
          />

          {/* Slide-out Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md sm:max-w-lg bg-white border-l border-[#DFC8C1] shadow-2xl flex flex-col justify-between"
            >
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#DFC8C1] flex items-center justify-between bg-[#FAF8F5]">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#A37B30]" />
                  <h2 className="font-serif text-lg sm:text-xl text-[#1C1917] font-medium tracking-tight">
                    Your Shopping Bag
                  </h2>
                  <span className="text-xs font-mono bg-[#EBD7D1]/70 px-2 py-0.5 rounded-full text-[#57534E]">
                    {itemCount} {itemCount === 1 ? 'piece' : 'pieces'}
                  </span>
                </div>

                <button
                  id="btn-close-cart-drawer"
                  type="button"
                  onClick={closeCart}
                  className="p-1.5 rounded-full hover:bg-white text-[#57534E] hover:text-[#1C1917] transition-colors border border-transparent hover:border-[#DFC8C1] cursor-pointer"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body: Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[#57534E]">
                    <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#DFC8C1] flex items-center justify-center mb-4 text-[#A37B30]">
                      <ShoppingBag className="w-8 h-8 opacity-60" />
                    </div>
                    <h3 className="font-serif text-lg text-[#1C1917]">Your shopping bag is empty</h3>
                    <p className="text-xs text-[#57534E] mt-1 max-w-xs leading-relaxed">
                      Discover our sovereign silhouettes crafted from full-grain Tuscan hides and heavy French bouclé.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        closeCart();
                        onExploreCatalog();
                      }}
                      className="mt-6 px-6 py-3 bg-[#1C1917] hover:bg-[#A37B30] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-xs transition-colors cursor-pointer"
                    >
                      Explore Curated Pieces
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-sm border border-[#DFC8C1]/70 bg-[#FAF8F5]/50 hover:bg-[#FAF8F5] transition-colors group"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xs overflow-hidden bg-white shrink-0 border border-[#DFC8C1]/60">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          loading="lazy"
                          className="object-cover"
                          sizes="96px"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-sm font-semibold text-[#1C1917] line-clamp-1">
                              {item.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-[#57534E] hover:text-red-700 transition-colors p-0.5 cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-[11px] text-[#57534E] mt-0.5 flex flex-wrap items-center gap-1.5">
                            <span>{item.fabric}</span>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block border border-stone-300"
                                style={{ backgroundColor: item.colorHex }}
                              />
                              {item.colorName}
                            </span>
                          </div>

                          {item.isCustom && item.customDetails && (
                            <div className="text-[10px] text-[#A37B30] mt-1 space-x-1 font-mono">
                              <span>Base: {item.customDetails.baseFinish}</span>
                              <span>&bull;</span>
                              <span>{item.customDetails.firmness}</span>
                            </div>
                          )}
                        </div>

                        {/* Price & Quantity Modifiers */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#DFC8C1]/40">
                          {/* Modifiers */}
                          <div className="flex items-center border border-[#DFC8C1] rounded-xs bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2 py-0.5 text-xs text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF8F5] cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold text-[#1C1917]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2 py-0.5 text-xs text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF8F5] cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-serif text-sm font-bold text-[#1C1917]">
                            {formatINR(item.unitPriceINR * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer: Calculations, Promo Code & Checkout Trigger */}
              {items.length > 0 && (
                <div className="p-6 border-t border-[#DFC8C1] bg-white space-y-4">
                  
                  {/* Promo Coupon Form */}
                  <div>
                    {promoCode ? (
                      <div className="flex items-center justify-between p-2.5 bg-[#FAF8F5] border border-[#A37B30]/40 rounded-xs text-xs">
                        <div className="flex items-center gap-2 text-[#A37B30] font-medium">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Privilege Code: <strong>{promoCode}</strong> (-{discountPercent}%)</span>
                        </div>
                        <button
                          type="button"
                          onClick={removePromoCode}
                          className="text-[#57534E] hover:text-[#1C1917] text-xs underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={inputCoupon}
                            onChange={(e) => setInputCoupon(e.target.value)}
                            placeholder="Enter VIP Atelier Code (e.g. VIPATELIER)"
                            className="w-full text-xs px-3 py-2.5 border border-[#DFC8C1] rounded-xs bg-[#FAF8F5] text-[#1C1917] placeholder:text-[#57534E]/60 focus:outline-hidden focus:border-[#A37B30] uppercase"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#1C1917] hover:bg-[#A37B30] text-white text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </form>
                    )}

                    {promoError && (
                      <p className="text-[11px] text-red-600 mt-1">{promoError}</p>
                    )}
                    {couponFeedback && !promoError && (
                      <p className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{couponFeedback}</span>
                      </p>
                    )}
                  </div>

                  {/* White-Glove Installation Notice */}
                  <div className="p-3 bg-[#FAF8F5] border border-[#DFC8C1]/60 rounded-xs flex items-center gap-3 text-xs text-[#57534E]">
                    <Truck className="w-4 h-4 text-[#A37B30] shrink-0" />
                    <div>
                      {whiteGloveShippingINR === 0 ? (
                        <p className="text-[#1C1917] font-medium">
                          Complimentary White-Glove Inside Delivery & Assembly
                        </p>
                      ) : (
                        <p>
                          White-Glove Installation: {formatINR(whiteGloveShippingINR)} (Complimentary on orders above ₹2,00,000)
                        </p>
                      )}
                      <p className="text-[10px] text-[#57534E]">Uncrating, placement, room-level inspection, packaging removal</p>
                    </div>
                  </div>

                  {/* Summary Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#57534E]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-[#1C1917]">{formatINR(subtotalINR)}</span>
                    </div>

                    {discountINR > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>VIP Atelier Privilege ({discountPercent}%)</span>
                        <span className="font-mono">-{formatINR(discountINR)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>White-Glove Logistics & Assembly</span>
                      <span className="font-mono text-[#1C1917]">
                        {whiteGloveShippingINR === 0 ? 'Complimentary' : formatINR(whiteGloveShippingINR)}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[#DFC8C1] flex justify-between items-baseline text-sm font-semibold text-[#1C1917]">
                      <span className="font-serif text-base">Total Investment</span>
                      <span className="font-serif text-lg sm:text-xl text-[#A37B30]">
                        {formatINR(totalINR)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Trigger */}
                  <button
                    id="btn-cart-checkout"
                    type="button"
                    onClick={() => {
                      closeCart();
                      onProceedToCheckout();
                    }}
                    className="w-full py-4 bg-[#1C1917] hover:bg-[#A37B30] text-white text-xs uppercase tracking-[0.25em] font-semibold rounded-xs shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Bespoke Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center justify-center gap-3 text-[10px] text-[#57534E] text-center pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#A37B30]" />
                      10-Year Warranty
                    </span>
                    <span>&bull;</span>
                    <span>100% Insured Transit</span>
                  </div>

                </div>
              )}

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
