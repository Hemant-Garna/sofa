'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from './types';

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  promoCode: string;
  discountPercent: number;
  promoError: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  itemCount: number;
  subtotalINR: number;
  discountINR: number;
  whiteGloveShippingINR: number;
  totalINR: number;
  isMounted: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'init-item-1',
    isCustom: false,
    productId: 'luxe-verona-chesterfield',
    name: 'The Verona Chesterfield',
    subtitle: 'Italian Full-Grain Tuscan Cognac Leather',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
    fabric: 'Italian Full-Grain Leather',
    colorName: 'Cognac Amber',
    colorHex: '#8B4513',
    unitPriceINR: 249000,
    quantity: 1
  }
];

const LOCAL_STORAGE_KEY = 'luxe_atelier_cart_v1';
const PROMO_STORAGE_KEY = 'luxe_atelier_promo_v1';

const emptySubscribe = () => () => {};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState<string | null>(null);

  // SSR Hydration safety via useSyncExternalStore
  const isMounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Load stored state after mount asynchronously
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        }

        const savedPromo = localStorage.getItem(PROMO_STORAGE_KEY);
        if (savedPromo) {
          const promo = JSON.parse(savedPromo);
          setPromoCode(promo.code || '');
          setDiscountPercent(promo.percent || 0);
        }
      } catch {
        // Fallback to initial
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage whenever items change after mounting
  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
      } catch {
        // Storage access error handling
      }
    }
  }, [items, isMounted]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const addItem = (itemToAdd: Omit<CartItem, 'id'>) => {
    setItems(prevItems => {
      // Check if exact same item exists (same product, fabric, color, custom properties)
      const existingIndex = prevItems.findIndex(item => {
        if (item.isCustom !== itemToAdd.isCustom) return false;
        if (!item.isCustom) {
          return item.productId === itemToAdd.productId && item.colorHex === itemToAdd.colorHex;
        }
        return (
          item.customDetails?.silhouette === itemToAdd.customDetails?.silhouette &&
          item.customDetails?.material === itemToAdd.customDetails?.material &&
          item.colorHex === itemToAdd.colorHex &&
          item.customDetails?.baseFinish === itemToAdd.customDetails?.baseFinish &&
          item.customDetails?.firmness === itemToAdd.customDetails?.firmness
        );
      });

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (itemToAdd.quantity || 1)
        };
        return updated;
      }

      const newItem: CartItem = {
        ...itemToAdd,
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
      };
      return [newItem, ...prevItems];
    });

    // Auto open cart drawer to provide clear confirmation
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setItems([]);
    if (isMounted) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setPromoError('Please enter a coupon code');
      return { success: false, message: 'Please enter a coupon code' };
    }

    if (cleanCode === 'VIPATELIER') {
      setPromoCode('VIPATELIER');
      setDiscountPercent(15);
      setPromoError(null);
      if (isMounted) {
        localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify({ code: 'VIPATELIER', percent: 15 }));
      }
      return { success: true, message: 'VIP Atelier Privileges applied: 15% bespoke reduction' };
    } else if (cleanCode === 'LUXE10') {
      setPromoCode('LUXE10');
      setDiscountPercent(10);
      setPromoError(null);
      if (isMounted) {
        localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify({ code: 'LUXE10', percent: 10 }));
      }
      return { success: true, message: 'Welcome to Luxe Atelier: 10% privilege applied' };
    } else if (cleanCode === 'WHITEGLOVE') {
      setPromoCode('WHITEGLOVE');
      setDiscountPercent(5);
      setPromoError(null);
      if (isMounted) {
        localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify({ code: 'WHITEGLOVE', percent: 5 }));
      }
      return { success: true, message: 'Complimentary White-Glove Installation & 5% Privilege applied' };
    } else {
      setPromoError('Invalid invitation or voucher code');
      return { success: false, message: 'Invalid invitation or voucher code' };
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
    setPromoError(null);
    if (isMounted) {
      localStorage.removeItem(PROMO_STORAGE_KEY);
    }
  };

  // Safe SSR calculations
  const itemCount = isMounted ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const subtotalINR = isMounted ? items.reduce((sum, item) => sum + item.unitPriceINR * item.quantity, 0) : 0;
  const discountINR = isMounted ? Math.round((subtotalINR * discountPercent) / 100) : 0;
  // White-glove installation is free if subtotal > 200,000 or WHITEGLOVE promo, otherwise ₹4,999
  const whiteGloveShippingINR = isMounted && items.length > 0
    ? (subtotalINR >= 200000 || promoCode === 'WHITEGLOVE' ? 0 : 4999)
    : 0;
  const totalINR = isMounted ? Math.max(0, subtotalINR - discountINR + whiteGloveShippingINR) : 0;

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        promoCode,
        discountPercent,
        promoError,
        applyPromoCode,
        removePromoCode,
        itemCount,
        subtotalINR,
        discountINR,
        whiteGloveShippingINR,
        totalINR,
        isMounted
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
