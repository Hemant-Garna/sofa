'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Play, Pause, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

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

export function HeroCarousel({ onExploreClick, onBespokeClick }: HeroCarouselProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Autoplay functionality with pause capability
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

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

              {/* Editorial Description */}
              <p className="text-sm sm:text-base lg:text-lg text-[#FAF8F5]/80 max-w-2xl font-light leading-relaxed text-center mx-auto">
                {slide.subtitle}
              </p>

              {/* Artisan Note */}
              <div className="pt-1 text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#E8C988] font-medium text-center">
                {slide.provenance} &mdash; <span className="text-white/90">{slide.accent}</span>
              </div>

              {/* Hero Action CTA */}
              <div className="pt-4 flex items-center justify-center">
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

      {/* Slideshow Control Strip (Dots, Play/Pause, Next/Prev) */}
      <div className="absolute bottom-8 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-t border-white/15 pt-5 text-white">
          
          {/* Indicator Dots */}
          <div className="flex items-center space-x-3">
            {HERO_SLIDES.map((s, index) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentSlideIndex(index)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentSlideIndex === index
                    ? 'w-8 h-1.5 bg-[#A37B30]'
                    : 'w-2 h-1.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
            
            {/* Play / Pause Toggle */}
            <button
              id="btn-hero-play-pause"
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="ml-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/80 hover:text-white cursor-pointer"
              title={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
              aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
            >
              {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
            </button>
          </div>

          {/* Slide Arrow Navigation */}
          <div className="flex items-center space-x-2">
            <span className="text-[11px] tracking-widest text-white/60 mr-2 font-mono">
              0{currentSlideIndex + 1} / 0{HERO_SLIDES.length}
            </span>
            <button
              type="button"
              onClick={prevSlide}
              className="p-2 rounded-full border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/15 transition-all text-white cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="p-2 rounded-full border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/15 transition-all text-white cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
