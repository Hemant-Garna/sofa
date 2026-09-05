'use client';

import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Mail, 
  Check, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenVIPModal: () => void;
}

export function Footer({ onScrollToSection, onOpenVIPModal }: FooterProps) {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmailInput('');
    }, 4000);
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Provenance & Value Pillars with Staggered Scroll-Driven Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-14 border-b border-white/10 text-xs">
          <ScrollReveal animation="fade-up" delay={50} duration={0.7}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-[#A37B30]/50 flex items-center justify-center shrink-0 text-[#A37B30]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Certified Pure Textiles</h4>
                <p className="text-[#FAF8F5]/60 mt-1 leading-relaxed">
                  Vegetable-tanned Tuscan hides, heavy French bouclé, and Master of Linen certified flax.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150} duration={0.7}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-[#A37B30]/50 flex items-center justify-center shrink-0 text-[#A37B30]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">White-Glove Installation</h4>
                <p className="text-[#FAF8F5]/60 mt-1 leading-relaxed">
                  In-residence placement, professional assembly, debris removal, and room-level inspection.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={250} duration={0.7}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-[#A37B30]/50 flex items-center justify-center shrink-0 text-[#A37B30]">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Dedicated Concierge</h4>
                <p className="text-[#FAF8F5]/60 mt-1 leading-relaxed">
                  Personal design consultations, complimentary tactile swatch books, and architectural CAD support.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Main Footer Links & Newsletter with Scroll-Driven Animations */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <ScrollReveal animation="fade-up" delay={100} duration={0.75}>
              <div className="flex items-center gap-2.5">
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <div className="absolute inset-0 rotate-45 border border-[#A37B30] bg-[#1C1917]" />
                  <span className="relative z-10 font-serif text-sm font-bold text-[#A37B30]">L</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif tracking-[0.3em] text-lg font-bold uppercase text-white leading-tight">
                    LUXE
                  </span>
                  <span className="text-[8px] tracking-[0.45em] text-[#A37B30] uppercase font-medium -mt-0.5">
                    ATELIER
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#FAF8F5]/70 max-w-sm leading-relaxed font-light mt-3">
                An independent high-craft atelier dedicated to architectural seating. Handcrafted bench-by-bench by master artisans in Florence, Lyon, and Mumbai.
              </p>

              <div className="text-[11px] text-[#FAF8F5]/50 space-y-1 font-mono mt-3">
                <p>Private Showroom: 14 Dr. Annie Besant Rd, Worli, Mumbai</p>
                <p>Direct Concierge: +91 22 6840 9200</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Quick Nav Col */}
          <div className="md:col-span-2 space-y-3">
            <ScrollReveal animation="fade-up" delay={200} duration={0.75}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A37B30]">
                Curations
              </h4>
              <ul className="space-y-2 text-xs text-[#FAF8F5]/70 mt-3">
                <li>
                  <button
                    type="button"
                    onClick={() => onScrollToSection('catalog-section')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Chesterfield Classics
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onScrollToSection('catalog-section')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Curved Modulars
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onScrollToSection('catalog-section')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Minimalist Tuxedos
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onScrollToSection('catalog-section')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Deep Sectionals
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onScrollToSection('catalog-section')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Bespoke Daybeds
                  </button>
                </li>
              </ul>
            </ScrollReveal>
          </div>

          {/* Studio & VIP Col */}
          <div className="md:col-span-2 space-y-3">
            <ScrollReveal animation="fade-up" delay={250} duration={0.75}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A37B30]">
                Atelier Services
              </h4>
              <ul className="space-y-2 text-xs text-[#FAF8F5]/70 mt-3">
                <li>
                  <button
                    type="button"
                    onClick={onOpenVIPModal}
                    className="hover:text-white transition-colors cursor-pointer text-[#A37B30]"
                  >
                    Private Concierge Consultation
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenVIPModal}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    VIP Passkey Vault
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenVIPModal}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Commission Ledger
                  </button>
                </li>
                <li>
                  <span className="text-[#FAF8F5]/40">Swatch Sample Box</span>
                </li>
                <li>
                  <span className="text-[#FAF8F5]/40">Trade & Architect Program</span>
                </li>
              </ul>
            </ScrollReveal>
          </div>

          {/* VIP Invitation Form Col */}
          <div className="md:col-span-4 space-y-3">
            <ScrollReveal animation="fade-up" delay={300} duration={0.75}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A37B30]">
                The Atelier Gazette
              </h4>
              <p className="text-xs text-[#FAF8F5]/70 leading-relaxed font-light mt-1">
                Receive private invitations to limited hide allocations, new seasonal fabric releases, and salon viewings.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-2 mt-3">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full text-xs px-3.5 py-2.5 bg-white/5 border border-white/20 text-white placeholder:text-white/40 rounded-l-xs focus:outline-hidden focus:border-[#A37B30]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#A37B30] hover:bg-[#8C6826] text-white text-xs uppercase font-semibold rounded-r-xs transition-colors shrink-0 cursor-pointer"
                  >
                    {isSubscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>

                {isSubscribed && (
                  <p className="text-[11px] text-[#A37B30] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Invitation dispatched. Welcome to the Atelier Circle.</span>
                  </p>
                )}
              </form>
            </ScrollReveal>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <ScrollReveal animation="fade" delay={150} duration={0.8}>
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FAF8F5]/50 gap-4">
            <p>&copy; {new Date().getFullYear()} LUXE ATELIER CRAFTSMANSHIP S.A. All rights reserved.</p>
            <div className="flex items-center space-x-6 text-[10px] tracking-wider uppercase">
              <span>Tuscan Tannery Guild</span>
              <span>&bull;</span>
              <span>Master of Linen Certified</span>
              <span>&bull;</span>
              <span>FIDO2 Passkey Compliant</span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
}
