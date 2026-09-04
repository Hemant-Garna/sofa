'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Fingerprint, 
  User, 
  Lock, 
  Mail, 
  CheckCircle2, 
  Package, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  LogOut
} from 'lucide-react';
import { useVIP } from '@/lib/vip-context';
import { formatINR } from '@/lib/products-data';

export function VIPAuthModal() {
  const {
    currentUser,
    isAuthModalOpen,
    closeAuthModal,
    activeTab,
    setActiveTab,
    signInWithPassword,
    signInWithPasskey,
    signUp,
    signOut
  } = useVIP();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [passkeyScanning, setPasskeyScanning] = useState(false);
  const [authSuccessMessage, setAuthSuccessMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handlePasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsAuthenticating(true);
    await signInWithPassword(email, password);
    setIsAuthenticating(false);
    setAuthSuccessMessage(`Welcome back, ${email.split('@')[0]}`);
    setTimeout(() => {
      setAuthSuccessMessage(null);
      setActiveTab('orders');
    }, 1200);
  };

  const handlePasskeyAuth = async () => {
    setPasskeyScanning(true);
    try {
      await signInWithPasskey();
      setPasskeyScanning(false);
      setAuthSuccessMessage('Biometric WebAuthn Passkey Verified. Welcome.');
      setTimeout(() => {
        setAuthSuccessMessage(null);
        setActiveTab('orders');
      }, 1200);
    } catch {
      setPasskeyScanning(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setIsAuthenticating(true);
    await signUp(name, email, password);
    setIsAuthenticating(false);
    setAuthSuccessMessage('Atelier Guild Membership Initialized.');
    setTimeout(() => {
      setAuthSuccessMessage(null);
      setActiveTab('orders');
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-[#1C1917]/70 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-white rounded-sm border border-[#DFC8C1] shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeAuthModal}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#57534E] hover:text-[#1C1917] transition-colors border border-[#DFC8C1] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="bg-[#FAF8F5] p-6 sm:p-7 border-b border-[#DFC8C1] text-center">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-white border border-[#A37B30]/50 flex items-center justify-center shadow-xs">
              <Fingerprint className="w-5 h-5 text-[#A37B30]" />
            </div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A37B30] font-semibold block mb-1">
              {currentUser ? currentUser.tier : 'ATELIER CONCIERGE'}
            </span>
            <h2 className="font-serif text-2xl text-[#1C1917] font-normal">
              {currentUser ? currentUser.name : 'VIP Member Access'}
            </h2>
            <p className="text-xs text-[#57534E] mt-1 font-light">
              {currentUser
                ? `Member since ${currentUser.memberSince} &bull; Concierge: ${currentUser.preferredConcierge}`
                : 'Sign in to access your bespoke commission ledger, private showroom appointments, and biometric passkeys.'}
            </p>

            {/* Navigation Tabs */}
            <div className="flex border-b border-[#DFC8C1] mt-5 -mb-7 text-xs font-semibold tracking-wider uppercase">
              {currentUser ? (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'orders'
                        ? 'border-[#1C1917] text-[#1C1917]'
                        : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    Bespoke Orders
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('passkey')}
                    className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'passkey'
                        ? 'border-[#1C1917] text-[#1C1917]'
                        : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    Passkey Security
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveTab('signin')}
                    className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'signin'
                        ? 'border-[#1C1917] text-[#1C1917]'
                        : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('passkey')}
                    className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'passkey'
                        ? 'border-[#1C1917] text-[#1C1917]'
                        : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    Biometric Passkey
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('signup')}
                    className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'signup'
                        ? 'border-[#1C1917] text-[#1C1917]'
                        : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    Guild Application
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-7">
            {authSuccessMessage && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xs text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{authSuccessMessage}</span>
              </div>
            )}

            {/* TAB: Sign In with Password */}
            {activeTab === 'signin' && !currentUser && (
              <form onSubmit={handlePasswordSignIn} className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917] block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#57534E] absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="eleanor.vance@atelier-private.com"
                      className="w-full text-xs pl-9 pr-3 py-2.5 border border-[#DFC8C1] rounded-xs bg-[#FAF8F5] text-[#1C1917] focus:outline-hidden focus:border-[#A37B30]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917] block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#57534E] absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full text-xs pl-9 pr-3 py-2.5 border border-[#DFC8C1] rounded-xs bg-[#FAF8F5] text-[#1C1917] focus:outline-hidden focus:border-[#A37B30]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-3.5 bg-[#1C1917] hover:bg-[#A37B30] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isAuthenticating ? 'Verifying Credentials...' : 'Authenticate & Sign In'}
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={handlePasskeyAuth}
                    className="text-xs text-[#A37B30] hover:underline inline-flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Fingerprint className="w-3.5 h-3.5" />
                    <span>Instant Login with Touch ID / Face ID Passkey</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB: Biometric Passkey Authentication */}
            {activeTab === 'passkey' && (
              <div className="text-center py-4 space-y-5">
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                  <motion.div
                    animate={passkeyScanning ? { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] } : {}}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-[#A37B30]/60"
                  />
                  <div className="w-20 h-20 rounded-full bg-[#FAF8F5] border border-[#DFC8C1] flex items-center justify-center shadow-md">
                    <Fingerprint className={`w-10 h-10 ${passkeyScanning ? 'text-[#A37B30] animate-pulse' : 'text-[#1C1917]'}`} />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-[#1C1917]">
                    {passkeyScanning ? 'Scanning Biometric Sensor...' : 'WebAuthn Cryptographic Passkey'}
                  </h3>
                  <p className="text-xs text-[#57534E] mt-1 max-w-xs mx-auto leading-relaxed">
                    Fast, passwordless authentication secured by your device&apos;s Secure Enclave (Apple Touch ID / Face ID or Windows Hello).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handlePasskeyAuth}
                  disabled={passkeyScanning}
                  className="px-8 py-3.5 bg-[#A37B30] hover:bg-[#8C6826] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-xs transition-colors shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  <Fingerprint className="w-4 h-4" />
                  <span>{passkeyScanning ? 'Authenticating...' : 'Authenticate with Passkey'}</span>
                </button>

                <div className="text-[11px] text-[#57534E] flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>FIDO2 / W3C WebAuthn Compliant</span>
                </div>
              </div>
            )}

            {/* TAB: Sign Up Guild Application */}
            {activeTab === 'signup' && !currentUser && (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917] block mb-1">
                    Full Name & Title
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#57534E] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lord Julian Sterling"
                      className="w-full text-xs pl-9 pr-3 py-2.5 border border-[#DFC8C1] rounded-xs bg-[#FAF8F5] text-[#1C1917] focus:outline-hidden focus:border-[#A37B30]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917] block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#57534E] absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@residence.com"
                      className="w-full text-xs pl-9 pr-3 py-2.5 border border-[#DFC8C1] rounded-xs bg-[#FAF8F5] text-[#1C1917] focus:outline-hidden focus:border-[#A37B30]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#1C1917] block mb-1">
                    Security Passcode
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#57534E] absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create confidential passcode"
                      className="w-full text-xs pl-9 pr-3 py-2.5 border border-[#DFC8C1] rounded-xs bg-[#FAF8F5] text-[#1C1917] focus:outline-hidden focus:border-[#A37B30]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-3.5 bg-[#1C1917] hover:bg-[#A37B30] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isAuthenticating ? 'Registering...' : 'Submit Atelier Guild Application'}
                </button>
              </form>
            )}

            {/* TAB: Bespoke Order History Viewer */}
            {activeTab === 'orders' && currentUser && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#57534E] pb-2 border-b border-[#DFC8C1]/60">
                  <span>Commission Ledger ({currentUser.orders.length})</span>
                  <button
                    type="button"
                    onClick={signOut}
                    className="flex items-center gap-1 text-red-700 hover:underline cursor-pointer"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Sign Out</span>
                  </button>
                </div>

                {currentUser.orders.length === 0 ? (
                  <div className="py-8 text-center text-[#57534E]">
                    <Package className="w-8 h-8 mx-auto text-[#DFC8C1] mb-2" />
                    <p className="text-xs">No active commissions recorded in your ledger.</p>
                    <p className="text-[11px] text-[#57534E]/70 mt-1">Configure your bespoke sofa in the studio to begin.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                    {currentUser.orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 rounded-xs border border-[#DFC8C1] bg-[#FAF8F5] space-y-3"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <strong className="text-[#1C1917] font-mono">{order.id}</strong>
                            <span className="text-[#57534E] ml-2">({order.date})</span>
                          </div>
                          <span className="px-2 py-0.5 bg-[#A37B30] text-white text-[10px] uppercase font-bold tracking-wider rounded-xs">
                            {order.deliveryStatus}
                          </span>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2 pt-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <span className="text-[#1C1917] font-medium truncate max-w-[260px]">
                                {item.name} &times; {item.quantity}
                              </span>
                              <span className="font-mono text-[#57534E]">
                                {formatINR(item.unitPriceINR * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Delivery Progress Bar */}
                        <div className="pt-2 border-t border-[#DFC8C1]/60">
                          <div className="flex justify-between text-[10px] text-[#57534E] mb-1 font-mono">
                            <span>Stage: Hand-Tufting & Cushion Fitting</span>
                            <span>Est. Delivery: {order.estimatedDelivery}</span>
                          </div>
                          <div className="w-full bg-[#EBD7D1] h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#A37B30] h-full w-3/5 rounded-full" />
                          </div>
                        </div>

                        <div className="text-[10px] text-[#57534E] flex items-center justify-between pt-1">
                          <span>Total Paid: <strong className="text-[#1C1917] font-serif">{formatINR(order.totalINR)}</strong></span>
                          <span className="text-emerald-700 font-medium">Insured White-Glove Transit</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
