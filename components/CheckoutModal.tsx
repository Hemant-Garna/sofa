'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  Calendar, 
  MapPin, 
  User, 
  CreditCard, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useVIP } from '@/lib/vip-context';
import { formatINR } from '@/lib/products-data';
import { Order } from '@/lib/types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const {
    items,
    subtotalINR,
    discountINR,
    whiteGloveShippingINR,
    totalINR,
    clearCart
  } = useCart();
  const { currentUser, addOrder } = useVIP();

  const [fullName, setFullName] = useState(currentUser?.name || 'Lady Eleanor Vance');
  const [email, setEmail] = useState(currentUser?.email || 'eleanor.vance@atelier-private.com');
  const [phone, setPhone] = useState('+91 98200 48210');
  const [address, setAddress] = useState('Penthouse 42B, The Imperial Residence, Altamount Road');
  const [city, setCity] = useState('Mumbai');
  const [postalCode, setPostalCode] = useState('400026');
  const [deliveryDate, setDeliveryDate] = useState('Preferred Friday Morning Placement');
  const [conciergeNotes, setConciergeNotes] = useState('Freight elevator booked; please bring floor protective runners.');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury order verification
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const newOrder: Order = {
      id: `ORD-LUXE-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Today',
      items: [...items],
      subtotalINR,
      discountINR,
      whiteGloveShippingINR,
      totalINR,
      deliveryStatus: 'Atelier Crafting',
      estimatedDelivery: '3 - 4 Weeks',
      shippingAddress: `${address}, ${city} ${postalCode}`
    };

    addOrder(newOrder);
    setCompletedOrder(newOrder);
    clearCart();
    setIsSubmitting(false);
  };

  const handleFinish = () => {
    setCompletedOrder(null);
    onClose();
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
          className="relative w-full max-w-3xl bg-white rounded-sm border border-[#DFC8C1] shadow-2xl overflow-hidden z-10 my-8 max-h-[92vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#57534E] hover:text-[#1C1917] transition-colors border border-[#DFC8C1] cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="bg-[#FAF8F5] p-6 border-b border-[#DFC8C1]">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#A37B30] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>WHITE-GLOVE ATELIER CONCIERGE</span>
            </div>
            <h2 className="font-serif text-2xl text-[#1C1917]">
              {completedOrder ? 'Commission Confirmed' : 'Finalize Bespoke Acquisition'}
            </h2>
            <p className="text-xs text-[#57534E] mt-0.5">
              {completedOrder
                ? 'Your bespoke sofa build has been scheduled into the master artisan workshop schedule.'
                : 'Direct white-glove placement, room-level inspection, and comprehensive transit insurance.'}
            </p>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1">
            {completedOrder ? (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-700">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs font-mono text-[#A37B30] uppercase tracking-wider block mb-1">
                    Order Reference: {completedOrder.id}
                  </span>
                  <h3 className="font-serif text-2xl text-[#1C1917]">
                    Handcrafted Commission Initiated
                  </h3>
                  <p className="text-xs text-[#57534E] max-w-md mx-auto mt-2 leading-relaxed">
                    A formal leather-bound dossier and master artisan dispatch schedule have been routed to <strong>{email}</strong>. Our senior concierge will contact you within 24 hours.
                  </p>
                </div>

                <div className="max-w-md mx-auto p-4 bg-[#FAF8F5] rounded-xs border border-[#DFC8C1] text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Bespoke Pieces:</span>
                    <span className="font-medium text-[#1C1917]">{completedOrder.items.length} items</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Delivery Address:</span>
                    <span className="font-medium text-[#1C1917] text-right truncate max-w-[240px]">{completedOrder.shippingAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Est. Delivery:</span>
                    <span className="font-medium text-[#1C1917]">{completedOrder.estimatedDelivery}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#DFC8C1]/60 font-semibold text-[#1C1917]">
                    <span>Total Settled:</span>
                    <span className="font-serif text-[#A37B30] text-sm">{formatINR(completedOrder.totalINR)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-8 py-3.5 bg-[#1C1917] hover:bg-[#A37B30] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-xs transition-colors cursor-pointer"
                >
                  Return to Atelier
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitOrder} className="space-y-6">
                
                {/* Contact & VIP Profile */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1C1917] mb-3 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#A37B30]" />
                    <span>Client Credentials</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-[#57534E] block mb-1">
                        Full Name & Title
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-[#DFC8C1] rounded-xs bg-[#FAF8F5] text-[#1C1917] focus:outline-hidden focus:border-[#A37B30]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-[#57534E] block mb-1">
                        Private Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-[#DFC8C1] rounded-xs bg-[#FAF8F5] text-[#1C1917] focus:outline-hidden focus:border-[#A37B30]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-[#57534E] block mb-1">
                        Concierge Contact Telephone
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-[#DFC8C1] rounded-xs bg-[#FAF8F5] text-[#1C1917] focus:outline-hidden focus:border-[#A37B30]"
                      />
                    </div>
                  </div>
                </div>

                {/* White-Glove Shipping Address */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1C1917] mb-3 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#A37B30]" />
                    <span>Residence & Placement Location</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-3">
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-[#57534E] block mb-1">
                        Street Address & Residence / Suite
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-[#DFC8C1] rounded-xs bg-[#FAF8F5] text-[#1C1917] focus:outline-hidden focus:border-[#A37B30]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-[#57534E] block mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-[#DFC8C1] rounded-xs bg-[#FAF8F5] text-[#1C1917] focus:outline-hidden focus:border-[#A37B30]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-[#57534E] block mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-[#DFC8C1] rounded-xs bg-[#FAF8F5] text-[#1C1917] focus:outline-hidden focus:border-[#A37B30]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-[#57534E] block mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        disabled
                        value="India"
                        className="w-full text-xs px-3 py-2 border border-[#DFC8C1] rounded-xs bg-stone-100 text-[#1C1917] cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Concierge Delivery Preferences */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1C1917] mb-3 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#A37B30]" />
                    <span>White-Glove Placement Instructions</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-[#57534E] block mb-1">
                        Delivery Window Preference
                      </label>
                      <input
                        type="text"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-[#DFC8C1] rounded-xs bg-[#FAF8F5] text-[#1C1917] focus:outline-hidden focus:border-[#A37B30]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-[#57534E] block mb-1">
                        Architectural Access Notes (Freight elevator, spiral staircase, door width)
                      </label>
                      <textarea
                        rows={2}
                        value={conciergeNotes}
                        onChange={(e) => setConciergeNotes(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-[#DFC8C1] rounded-xs bg-[#FAF8F5] text-[#1C1917] focus:outline-hidden focus:border-[#A37B30]"
                      />
                    </div>
                  </div>
                </div>

                {/* Total Investment Summary */}
                <div className="p-4 bg-[#FAF8F5] rounded-xs border border-[#DFC8C1] space-y-2 text-xs">
                  <div className="flex justify-between text-[#57534E]">
                    <span>Items Subtotal ({items.length} pieces):</span>
                    <span className="font-mono text-[#1C1917]">{formatINR(subtotalINR)}</span>
                  </div>
                  {discountINR > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Privilege Reduction:</span>
                      <span className="font-mono">-{formatINR(discountINR)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#57534E]">
                    <span>Insured White-Glove Installation:</span>
                    <span className="font-mono text-[#1C1917]">
                      {whiteGloveShippingINR === 0 ? 'Complimentary' : formatINR(whiteGloveShippingINR)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#DFC8C1] flex justify-between items-baseline font-semibold text-sm text-[#1C1917]">
                    <span className="font-serif text-base">Grand Total (INR):</span>
                    <span className="font-serif text-xl text-[#A37B30]">{formatINR(totalINR)}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  id="btn-confirm-bespoke-order"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#1C1917] hover:bg-[#A37B30] text-white text-xs uppercase tracking-[0.25em] font-semibold rounded-xs shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    'Routing Commission to Master Workshop...'
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Confirm Bespoke Commission &bull; {formatINR(totalINR)}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-[10px] text-[#57534E]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    256-bit Encrypted Private Settlement
                  </span>
                  <span>&bull;</span>
                  <span>10-Year Framework Warranty</span>
                </div>

              </form>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
