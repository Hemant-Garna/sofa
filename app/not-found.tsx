import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] text-[#1C1917] px-4 text-center">
      <h1 className="font-serif text-6xl text-[#A37B30] mb-4">404</h1>
      <h2 className="text-xl font-medium tracking-wider uppercase mb-2">Page Not Found</h2>
      <p className="text-[#57534E] max-w-md mb-8">
        The handcrafted piece or salon view you are seeking cannot be located.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-semibold rounded-xs hover:bg-[#A37B30] transition-colors"
      >
        Return to Atelier
      </Link>
    </div>
  );
}
