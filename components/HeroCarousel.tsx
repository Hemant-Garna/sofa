'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroCarouselProps {
  onExploreClick: () => void;
  onBespokeClick?: () => void;
}

interface HeroSlide {
  id: string;
  tagline: string;
  title: string;
  subtitle: string;
  provenance: string;
  image: string;
  accent: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    tagline: 'THE ATELIER COLLECTION',
    title: 'Sculptural Comfort Reimagined',
    subtitle: 'Hand-tufted vegetable-tanned Tuscan hides paired with kiln-dried European beechwood frameworks engineered to transcend generations.',
    provenance: 'Artisan Bench-Built in Florence & Lyon',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=85&w=1920&auto=format&fit=crop',
    accent: 'Tuscan Full-Grain Leather'
  },
  {
    id: 'slide-2',
    tagline: 'BESPOKE ARCHITECTURAL SEATING',
    title: 'Organic Monoliths in Bouclé',
    subtitle: 'Sensual curved silhouettes upholstered in heavy-weight French looped wool bouclé with invisible protective nanocoating.',
    provenance: 'Master Weave from Rhône-Alpes',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=85&w=1920&auto=format&fit=crop',
    accent: 'Architectural Heavy Bouclé'
  },
  {
    id: 'slide-3',
    tagline: 'TIMELESS FORM & FUNCTION',
    title: 'Rectilinear Elegance in Pure Velvet',
    subtitle: 'Sovereign precision highlighted by continuous brushed brass plinth lines and channeled pure goose down duvets.',
    provenance: 'Veneto Silk & Velvet Guild',
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=85&w=1920&auto=format&fit=crop',
    accent: 'Royal Crushed Silk Velvet'
  }
];

export function HeroCarousel({ onExploreClick }: HeroCarouselProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  // Autoplay functionality with smooth crossfade
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slide = HERO_SLIDES[currentSlideIndex];

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-[95vh] bg-[#1C1917] overflow-hidden flex items-center pt-20">
      {/* Background Images with Seamless Crossfade (No Black Flash) */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((s, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={s.image}
                alt={s.title}
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : 'lazy'}
                className={`object-cover object-center brightness-[0.75] transition-transform duration-[6000ms] ease-out ${
                  isActive ? 'scale-100' : 'scale-105'
                }`}
                sizes="100vw"
                referrerPolicy="no-referrer"
              />
              {/* Ambient luxury vignettes and warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/40 to-transparent" />
              <div className="absolute inset-0 bg-radial from-transparent via-[#1C1917]/30 to-[#1C1917]/70" />
            </div>
          );
        })}
      </div>

      {/* Hero Content Container - Centered */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full flex justify-center">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-6 flex flex-col items-center text-center"
            >
              {/* Provenance Badge & Tagline */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#FAF8F5] font-medium">
                  <Sparkles className="w-3 h-3 text-[#E8C988]" />
                  {slide.tagline}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#FAF8F5]/80 font-light">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A37B30]" />
                  10-Year Framework Warranty
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.15] tracking-tight text-center max-w-2xl">
                {slide.title}
              </h1>

              {/* Hero Action CTA */}
              <div className="pt-2 flex items-center justify-center">
                <button
                  id="btn-hero-explore-curated"
                  type="button"
                  onClick={onExploreClick}
                  className="px-8 py-4 bg-[#FAF8F5] hover:bg-white text-[#1C1917] text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-white/10 rounded-xs flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Explore Curated Pieces</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
