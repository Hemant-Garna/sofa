export type ProductBadge = 'SIGNATURE' | 'BEST SELLER' | 'NEW ARRIVAL';

export interface ProductColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  badge: ProductBadge;
  category: 'Chesterfield' | 'Curved Modular' | 'Minimalist Tuxedo' | 'Deep Sectional' | 'Bespoke Lounger';
  fabricType: string;
  materials: string[];
  colors: ProductColorOption[];
  priceINR: number;
  originalPriceINR?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  dimensions: {
    width: string;
    depth: string;
    height: string;
    seatHeight: string;
  };
  frameMaterial: string;
  cushionFill: string;
  warranty: string;
  fabricCare: string;
  leadTime: string;
  inStock: boolean;
}

export interface SilhouetteOption {
  id: 'chesterfield' | 'curved-modular' | 'minimalist-tuxedo' | 'deep-sectional';
  name: string;
  tagline: string;
  basePriceINR: number;
  description: string;
  dimensions: string;
  images: {
    front: string;
    threeQuarter: string;
    top: string;
    detail: string;
  };
}

export interface MaterialOption {
  id: 'leather' | 'velvet' | 'linen' | 'boucle';
  name: string;
  origin: string;
  priceDeltaINR: number;
  textureDescription: string;
  careRating: string;
  colorSwatches: {
    id: string;
    name: string;
    hex: string;
    bgStyle: string;
  }[];
}

export interface BaseFinishOption {
  id: 'smoked-oak' | 'brushed-brass' | 'matte-black-steel';
  name: string;
  description: string;
  priceDeltaINR: number;
  colorHex: string;
}

export interface FirmnessOption {
  id: 'cloud-plush' | 'balanced-ergonomic' | 'structured-firm';
  name: string;
  feel: string;
  priceDeltaINR: number;
  description: string;
}

export interface CustomSofaConfig {
  silhouette: SilhouetteOption;
  material: MaterialOption;
  selectedColor: {
    id: string;
    name: string;
    hex: string;
  };
  baseFinish: BaseFinishOption;
  firmness: FirmnessOption;
  totalPriceINR: number;
  customNotes?: string;
}

export interface CartItem {
  id: string;
  isCustom: boolean;
  productId?: string;
  name: string;
  subtitle?: string;
  image: string;
  fabric: string;
  colorName: string;
  colorHex: string;
  baseFinishName?: string;
  firmnessName?: string;
  unitPriceINR: number;
  quantity: number;
  customDetails?: {
    silhouette: string;
    material: string;
    baseFinish: string;
    firmness: string;
  };
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotalINR: number;
  discountINR: number;
  whiteGloveShippingINR: number;
  totalINR: number;
  deliveryStatus: 'Atelier Crafting' | 'Leather Cutting' | 'Frame Assembling' | 'Quality Inspection' | 'En Route';
  estimatedDelivery: string;
  shippingAddress: string;
}

export interface VIPUser {
  id: string;
  name: string;
  email: string;
  tier: 'Atelier Guild' | 'Connoisseur' | 'Patron VIP';
  passkeyEnabled: boolean;
  memberSince: string;
  preferredConcierge: string;
  orders: Order[];
}
