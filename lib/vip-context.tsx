'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { VIPUser, Order } from './types';

interface VIPContextType {
  currentUser: VIPUser | null;
  isAuthModalOpen: boolean;
  activeTab: 'signin' | 'signup' | 'orders' | 'passkey';
  openAuthModal: (tab?: 'signin' | 'signup' | 'orders' | 'passkey') => void;
  closeAuthModal: () => void;
  setActiveTab: (tab: 'signin' | 'signup' | 'orders' | 'passkey') => void;
  signInWithPassword: (email: string, pass: string) => Promise<boolean>;
  signInWithPasskey: () => Promise<boolean>;
  registerWithPasskey: (name: string, email: string) => Promise<boolean>;
  signUp: (name: string, email: string, pass: string) => Promise<boolean>;
  signOut: () => void;
  addOrder: (order: Order) => void;
  isMounted: boolean;
}

const VIPContext = createContext<VIPContextType | null>(null);

const VIP_STORAGE_KEY = 'luxe_atelier_vip_user_v1';

const INITIAL_VIP_USER: VIPUser = {
  id: 'vip-8849',
  name: 'Lady Eleanor Vance',
  email: 'eleanor.vance@atelier-private.com',
  tier: 'Patron VIP',
  passkeyEnabled: true,
  memberSince: 'October 2024',
  preferredConcierge: 'Henri de Montmorency (Milan Atelier)',
  orders: [
    {
      id: 'ORD-LUXE-9482',
      date: '14 Jan 2026',
      items: [
        {
          id: 'hist-1',
          isCustom: true,
          name: 'The Verona Chesterfield [Bespoke]',
          subtitle: 'Tuscan Aniline Leather in Vintage Cognac',
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop',
          fabric: 'Italian Full-Grain Leather',
          colorName: 'Vintage Cognac',
          colorHex: '#8C4D26',
          unitPriceINR: 289000,
          quantity: 1,
          customDetails: {
            silhouette: 'The Chesterfield',
            material: 'Italian Full-Grain Leather',
            baseFinish: 'Antique Brushed Brass',
            firmness: 'Cloud Plush'
          }
        }
      ],
      subtotalINR: 289000,
      discountINR: 43350,
      whiteGloveShippingINR: 0,
      totalINR: 245650,
      deliveryStatus: 'Atelier Crafting',
      estimatedDelivery: '18 Mar 2026',
      shippingAddress: 'Penthouse 42B, The Imperial Residence, Altamount Road, Mumbai 400026'
    }
  ]
};

const emptySubscribe = () => () => {};

export function VIPProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<VIPUser | null>(INITIAL_VIP_USER);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'orders' | 'passkey'>('signin');

  const isMounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedUser = localStorage.getItem(VIP_STORAGE_KEY);
        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
        }
      } catch {
        // Fallback to initial
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const saveUser = (user: VIPUser | null) => {
    setCurrentUser(user);
    if (isMounted) {
      if (user) {
        localStorage.setItem(VIP_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(VIP_STORAGE_KEY);
      }
    }
  };

  const openAuthModal = (tab?: 'signin' | 'signup' | 'orders' | 'passkey') => {
    if (tab) {
      setActiveTab(tab);
    } else if (currentUser) {
      setActiveTab('orders');
    } else {
      setActiveTab('signin');
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signInWithPassword = async (email: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const user: VIPUser = {
      id: `vip-${Math.floor(1000 + Math.random() * 9000)}`,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Patron VIP',
      email,
      tier: 'Connoisseur',
      passkeyEnabled: true,
      memberSince: 'February 2026',
      preferredConcierge: 'Gilles Laurent (Paris Atelier)',
      orders: currentUser?.orders || []
    };
    saveUser(user);
    return true;
  };

  const signInWithPasskey = async (): Promise<boolean> => {
    // Biometric mock WebAuthn authentication simulation with authentic delay
    await new Promise(resolve => setTimeout(resolve, 1400));
    const user: VIPUser = {
      id: 'vip-passkey-01',
      name: currentUser?.name || 'Lord Alistair Sterling',
      email: currentUser?.email || 'alistair.sterling@mayfair-holdings.co.uk',
      tier: 'Patron VIP',
      passkeyEnabled: true,
      memberSince: 'August 2024',
      preferredConcierge: 'Elena Castiglione (Florence Workshop)',
      orders: currentUser?.orders || INITIAL_VIP_USER.orders
    };
    saveUser(user);
    return true;
  };

  const registerWithPasskey = async (name: string, email: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const user: VIPUser = {
      id: `vip-${Date.now().toString().slice(-4)}`,
      name,
      email,
      tier: 'Atelier Guild',
      passkeyEnabled: true,
      memberSince: 'Today',
      preferredConcierge: 'Matteo Rossi (Master Woodworker)',
      orders: []
    };
    saveUser(user);
    return true;
  };

  const signUp = async (name: string, email: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const user: VIPUser = {
      id: `vip-${Date.now().toString().slice(-4)}`,
      name,
      email,
      tier: 'Atelier Guild',
      passkeyEnabled: false,
      memberSince: 'Today',
      preferredConcierge: 'Camilla Moreau (Atelier Lead)',
      orders: []
    };
    saveUser(user);
    return true;
  };

  const signOut = () => {
    saveUser(null);
    setActiveTab('signin');
  };

  const addOrder = (newOrder: Order) => {
    if (!currentUser) return;
    const updatedUser: VIPUser = {
      ...currentUser,
      orders: [newOrder, ...currentUser.orders]
    };
    saveUser(updatedUser);
  };

  return (
    <VIPContext.Provider
      value={{
        currentUser,
        isAuthModalOpen,
        activeTab,
        openAuthModal,
        closeAuthModal,
        setActiveTab,
        signInWithPassword,
        signInWithPasskey,
        registerWithPasskey,
        signUp,
        signOut,
        addOrder,
        isMounted
      }}
    >
      {children}
    </VIPContext.Provider>
  );
}

export function useVIP() {
  const context = useContext(VIPContext);
  if (!context) {
    throw new Error('useVIP must be used within a VIPProvider');
  }
  return context;
}
