import type {Metadata} from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css'; // Global styles

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LUXE Atelier | Handcrafted Ultra-Luxury Designer Sofas',
  description: 'Ultra-luxury handcrafted sofa atelier offering bespoke silhouettes, fine Italian leathers, and architectural comfort.',
  openGraph: {
    title: 'LUXE Atelier | Handcrafted Ultra-Luxury Designer Sofas',
    description: 'Ultra-luxury handcrafted sofa atelier offering bespoke silhouettes, fine Italian leathers, and architectural comfort.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUXE Atelier | Handcrafted Ultra-Luxury Designer Sofas',
    description: 'Ultra-luxury handcrafted sofa atelier offering bespoke silhouettes, fine Italian leathers, and architectural comfort.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased text-[#1C1917] bg-[#FAF8F5] selection:bg-[#A37B30]/20 selection:text-[#1C1917]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

