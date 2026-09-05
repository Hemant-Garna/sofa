'use client';

import React, { useState } from 'react';
import { CartProvider } from '@/lib/cart-context';
import { VIPProvider, useVIP } from '@/lib/vip-context';
import { Navbar } from '@/components/Navbar';
import { HeroCarousel } from '@/components/HeroCarousel';
import { ProductCatalog } from '@/components/ProductCatalog';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { CartDrawer } from '@/components/CartDrawer';
import { VIPAuthModal } from '@/components/VIPAuthModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { Footer } from '@/components/Footer';
import { useScrollAnimationObserver } from '@/components/ScrollReveal';
import { Product } from '@/lib/types';
import { CURATED_PRODUCTS } from '@/lib/products-data';

function AtelierAppContent() {
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Initialize smooth scroll-driven Intersection Observer
  useScrollAnimationObserver();

  const { openAuthModal } = useVIP();

  const handleOpenProductModal = (product: Product) => {
    setSelectedProductForModal(product);
    setIsDetailModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsDetailModalOpen(false);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] selection:bg-[#A37B30]/20 selection:text-[#1C1917]">
      
      {/* Sticky Header & Top Navigation with Inline Search and VIP Trigger */}
      <Navbar
        onOpenProductModal={handleOpenProductModal}
        onScrollToSection={handleScrollToSection}
      />

      {/* Hero Carousel Section with Ambient Luxury Editorial Slides */}
      <HeroCarousel
        onExploreClick={() => handleScrollToSection('catalog-section')}
        onBespokeClick={() => openAuthModal()}
      />

      {/* Curated Product Catalog (4-column grid directly beneath introductory text) */}
      <ProductCatalog
        onOpenDetails={handleOpenProductModal}
      />

      {/* Atelier Footer */}
      <Footer
        onScrollToSection={handleScrollToSection}
        onOpenVIPModal={() => openAuthModal()}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        isOpen={isDetailModalOpen}
        onClose={handleCloseProductModal}
      />

      {/* Slide-Out Shopping Bag Drawer */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onExploreCatalog={() => handleScrollToSection('catalog-section')}
      />

      {/* VIP Concierge Auth & Passkey Modal */}
      <VIPAuthModal />

      {/* Bespoke Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

    </div>
  );
}

export default function AtelierHome() {
  return (
    <VIPProvider>
      <CartProvider>
        <AtelierAppContent />
      </CartProvider>
    </VIPProvider>
  );
}
