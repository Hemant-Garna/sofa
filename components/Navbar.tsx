'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Fingerprint, 
  X, 
  Menu, 
  Sparkles,
  ArrowRight,
  Sliders
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useVIP } from '@/lib/vip-context';
import { CURATED_PRODUCTS, QUICK_SEARCH_PILLS, formatINR } from '@/lib/products-data';
import { Product } from '@/lib/types';

interface NavbarProps {
  onOpenProductModal: (product: Product) => void;
  onScrollToSection: (sectionId: string) => void;
}

export function Navbar({ onOpenProductModal, onScrollToSection }: NavbarProps) {
  const { itemCount, openCart, isMounted } = useCart();
  const { currentUser, openAuthModal } = useVIP();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Track scroll position for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter matching products for live dropdown
  const matchingProducts = searchQuery.trim() === ''
    ? []
    : CURATED_PRODUCTS.filter(p => {
        const query = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.subtitle.toLowerCase().includes(query) ||
          p.fabricType.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.materials.some(m => m.toLowerCase().includes(query))
        );
      });

  const handleProductClickFromSearch = (product: Product) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    onOpenProductModal(product);
  };

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onScrollToSection(sectionId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md shadow-xs border-b border-[#DFC8C1]/60 py-3.5'
          : 'bg-[#FAF8F5]/75 backdrop-blur-xs border-b border-[#DFC8C1]/30 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Mobile Menu Trigger & Brand Logo */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              id="btn-mobile-menu"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#1C1917] hover:text-[#A37B30] transition-colors rounded-md focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Identity: Diamond Emblem Logo on Left */}
            <div
              id="nav-brand-logo"
              className="flex flex-col cursor-pointer select-none"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="flex items-center gap-2.5">
                {/* Diamond Emblem */}
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <div className="absolute inset-0 rotate-45 border border-[#A37B30] bg-[#FAF8F5] transition-transform duration-500 hover:rotate-90 shadow-2xs" />
                  <span className="relative z-10 font-serif text-sm font-bold text-[#A37B30]">L</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-serif tracking-[0.3em] text-lg sm:text-xl font-bold uppercase text-[#1C1917] leading-tight">
                    LUXE
                  </span>
                  <span className="text-[8px] tracking-[0.45em] text-[#57534E] uppercase font-medium -mt-0.5">
                    ATELIER
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-semibold tracking-[0.22em] text-[#1C1917]/80">
            <button
              id="nav-new-arrivals"
              type="button"
              onClick={() => handleNavClick('catalog-section')}
              className="hover:text-[#A37B30] transition-colors uppercase tracking-[0.2em] relative py-1 group cursor-pointer"
            >
              NEW ARRIVALS
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#A37B30] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              id="nav-collections"
              type="button"
              onClick={() => handleNavClick('catalog-section')}
              className="hover:text-[#A37B30] transition-colors uppercase tracking-[0.2em] relative py-1 group cursor-pointer"
            >
              COLLECTIONS
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#A37B30] transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>

          {/* Right Action Icons & Inline Search */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Search Container with Inline Navbar Expansion */}
            <div ref={searchContainerRef} className="relative">
              <button
                id="btn-nav-search-toggle"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsSearchOpen(prev => !prev);
                }}
                className={`p-2 rounded-full transition-all duration-200 cursor-pointer ${
                  isSearchOpen
                    ? 'bg-[#EBD7D1] text-[#A37B30]'
                    : 'text-[#1C1917] hover:text-[#A37B30] hover:bg-[#EBD7D1]/50'
                }`}
                aria-label="Search collection"
                title="Search handcrafted sofas"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Inline Search Input & Real-Time Dropdown (No page scroll) */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute right-0 top-12 w-[340px] sm:w-[460px] bg-white border border-[#DFC8C1] shadow-xl rounded-lg p-3.5 z-50 overflow-hidden"
                  >
                    {/* Inline Input Field */}
                    <div className="relative flex items-center border-b border-[#DFC8C1]/80 pb-2.5">
                      <Search className="w-4 h-4 text-[#57534E] mr-2.5 shrink-0" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by silhouette, bouclé, leather..."
                        className="w-full bg-transparent text-sm text-[#1C1917] placeholder:text-[#57534E]/60 focus:outline-hidden font-sans"
                      />
                      {searchQuery ? (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="text-[#57534E] hover:text-[#1C1917] p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsSearchOpen(false)}
                          className="text-xs text-[#57534E] hover:text-[#1C1917] ml-2 px-1.5 py-0.5 border border-[#DFC8C1] rounded"
                        >
                          ESC
                        </button>
                      )}
                    </div>

                    {/* Dropdown Body: Quick Pills or Live Results */}
                    <div className="mt-3 max-h-[380px] overflow-y-auto">
                      {searchQuery.trim() === '' ? (
                        <div>
                          <div className="flex items-center justify-between text-[10px] tracking-[0.15em] uppercase text-[#57534E] font-semibold mb-2">
                            <span>SUGGESTED ATELIER SEARCHES</span>
                            <Sliders className="w-3 h-3 text-[#A37B30]" />
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {QUICK_SEARCH_PILLS.map((pill) => (
                              <button
                                key={pill}
                                type="button"
                                onClick={() => setSearchQuery(pill)}
                                className="text-xs px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#EBD7D1]/70 border border-[#DFC8C1] rounded-full text-[#1C1917] transition-all hover:border-[#A37B30] cursor-pointer"
                              >
                                {pill}
                              </button>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-[#DFC8C1]/40">
                            <span className="text-[10px] tracking-wider uppercase text-[#57534E] font-medium block mb-2">
                              Signature Pieces
                            </span>
                            <div className="space-y-1.5">
                              {CURATED_PRODUCTS.slice(0, 2).map((prod) => (
                                <div
                                  key={prod.id}
                                  onClick={() => handleProductClickFromSearch(prod)}
                                  className="flex items-center gap-3 p-1.5 rounded-md hover:bg-[#FAF8F5] transition-colors cursor-pointer group"
                                >
                                  <div className="relative w-12 h-10 rounded overflow-hidden bg-stone-100 shrink-0">
                                    <Image
                                      src={prod.images[0]}
                                      alt={prod.name}
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform"
                                      sizes="48px"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0 text-left">
                                    <h4 className="text-xs font-semibold text-[#1C1917] truncate group-hover:text-[#A37B30] transition-colors">
                                      {prod.name}
                                    </h4>
                                    <p className="text-[11px] text-[#57534E] truncate">{prod.fabricType}</p>
                                  </div>
                                  <span className="text-xs font-serif font-medium text-[#A37B30] shrink-0">
                                    {formatINR(prod.priceINR)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-[10px] tracking-[0.15em] uppercase text-[#57534E] font-semibold mb-2">
                            {matchingProducts.length} {matchingProducts.length === 1 ? 'PIECE FOUND' : 'PIECES FOUND'}
                          </div>
                          {matchingProducts.length === 0 ? (
                            <div className="py-6 text-center text-[#57534E]">
                              <p className="text-xs">No handcrafted pieces matching &quot;{searchQuery}&quot;</p>
                              <p className="text-[11px] mt-1 text-[#57534E]/80">Try exploring by material like &quot;Bouclé&quot; or &quot;Leather&quot;</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {matchingProducts.map((prod) => (
                                <div
                                  key={prod.id}
                                  onClick={() => handleProductClickFromSearch(prod)}
                                  className="flex items-center gap-3 p-2 rounded-md hover:bg-[#FAF8F5] border border-transparent hover:border-[#DFC8C1]/60 transition-all cursor-pointer group"
                                >
                                  <div className="relative w-14 h-12 rounded overflow-hidden bg-stone-100 shrink-0">
                                    <Image
                                      src={prod.images[0]}
                                      alt={prod.name}
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform"
                                      sizes="56px"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0 text-left">
                                    <div className="flex items-center gap-1.5">
                                      <h4 className="text-xs font-semibold text-[#1C1917] truncate group-hover:text-[#A37B30] transition-colors">
                                        {prod.name}
                                      </h4>
                                      <span className="text-[9px] px-1.5 py-0.2 bg-[#EBD7D1]/50 text-[#8C6826] font-medium rounded-xs">
                                        {prod.badge}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-[#57534E] truncate">{prod.subtitle}</p>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <span className="text-xs font-serif font-medium text-[#1C1917] block">
                                      {formatINR(prod.priceINR)}
                                    </span>
                                    <span className="text-[10px] text-[#A37B30] flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                      View <ArrowRight className="w-2.5 h-2.5" />
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Account / VIP Passkey Button */}
            <button
              id="btn-nav-vip-account"
              type="button"
              onClick={() => openAuthModal()}
              className="relative p-2 rounded-full text-[#1C1917] hover:text-[#A37B30] hover:bg-[#EBD7D1]/50 transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label="VIP Concierge and Passkey Account"
              title={currentUser ? `${currentUser.name} (${currentUser.tier})` : 'VIP Member & Passkey Access'}
            >
              <div className="relative">
                <User className="w-5 h-5" />
                {currentUser?.passkeyEnabled && (
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#FAF8F5] flex items-center justify-center shadow-xs">
                    <Fingerprint className="w-2.5 h-2.5 text-[#A37B30]" />
                  </span>
                )}
              </div>
              <span className="hidden xl:inline-block text-[11px] font-semibold tracking-wider text-[#57534E] uppercase">
                {currentUser ? currentUser.name.split(' ')[0] : 'VIP'}
              </span>
            </button>

            {/* Shopping Bag Button with SSR-safe Count Badge */}
            <button
              id="btn-nav-cart"
              type="button"
              onClick={openCart}
              className="relative p-2 rounded-full text-[#1C1917] hover:text-[#A37B30] hover:bg-[#EBD7D1]/50 transition-colors flex items-center cursor-pointer"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {isMounted && itemCount > 0 && (
                <span
                  id="cart-item-count-badge"
                  className="absolute -top-0.5 -right-0.5 min-w-[19px] h-[19px] px-1 bg-[#A37B30] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-xs animate-in zoom-in-50 duration-200"
                >
                  {itemCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden border-t border-[#DFC8C1] bg-[#FAF8F5] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <button
                type="button"
                onClick={() => handleNavClick('catalog-section')}
                className="block w-full text-left text-sm font-semibold tracking-[0.2em] text-[#1C1917] hover:text-[#A37B30] py-2 border-b border-[#DFC8C1]/30"
              >
                NEW ARRIVALS
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('catalog-section')}
                className="block w-full text-left text-sm font-semibold tracking-[0.2em] text-[#1C1917] hover:text-[#A37B30] py-2 border-b border-[#DFC8C1]/30"
              >
                COLLECTIONS
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="flex items-center gap-2 text-sm font-medium text-[#57534E] py-2"
              >
                <Fingerprint className="w-4 h-4 text-[#A37B30]" />
                <span>{currentUser ? `${currentUser.name} (${currentUser.tier})` : 'VIP Member Sign In'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
