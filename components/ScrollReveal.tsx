'use client';

import React, { useEffect, useRef, useState } from 'react';

export type ScrollAnimationType = 
  | 'fade-up' 
  | 'fade-down' 
  | 'fade-left' 
  | 'fade-right' 
  | 'zoom-in' 
  | 'fade';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: ScrollAnimationType;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in seconds (default: 0.75s)
  threshold?: number; // Visibility threshold (0 to 1)
  className?: string;
  as?: React.ElementType;
  id?: string;
}

export function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.75,
  threshold = 0.12,
  className = '',
  as: Component = 'div',
  id,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check if element is already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const animationClass = `scroll-reveal-${animation}`;

  const style: React.CSSProperties = {
    transitionDuration: `${duration}s`,
    ...(delay > 0 ? { transitionDelay: `${delay}ms` } : {}),
  };

  return (
    <Component
      ref={elementRef}
      id={id}
      style={style}
      className={`scroll-reveal ${animationClass} ${isRevealed ? 'is-revealed' : ''} ${className}`}
      data-revealed={isRevealed ? 'true' : 'false'}
    >
      {children}
    </Component>
  );
}

/**
 * Global hook to observe any element decorated with `.scroll-reveal`
 */
export function useScrollAnimationObserver() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            entry.target.setAttribute('data-revealed', 'true');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll('.scroll-reveal:not(.is-revealed)');
    elements.forEach((el) => {
      // If already in view on load
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed');
        el.setAttribute('data-revealed', 'true');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
