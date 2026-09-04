import { 
  Product, 
  SilhouetteOption, 
  MaterialOption, 
  BaseFinishOption, 
  FirmnessOption 
} from './types';

export const CURATED_PRODUCTS: Product[] = [
  {
    id: 'luxe-verona-chesterfield',
    name: 'The Verona Chesterfield',
    subtitle: 'Full-Grain Tuscan Cognac Leather',
    badge: 'SIGNATURE',
    category: 'Chesterfield',
    fabricType: 'Italian Full-Grain Leather',
    materials: ['Tuscan Aniline Leather', 'Kiln-Dried European Beechwood', 'Hand-Spun Brass Studs'],
    colors: [
      { name: 'Cognac Amber', hex: '#8B4513' },
      { name: 'Espresso Noir', hex: '#2A1D1A' },
      { name: 'Olive Drab', hex: '#4B4D3C' },
      { name: 'Saddle Tan', hex: '#B87333' }
    ],
    priceINR: 249000,
    originalPriceINR: 285000,
    rating: 4.95,
    reviewsCount: 38,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1400&auto=format&fit=crop'
    ],
    description: 'A sovereign reimagining of the classic British silhouette. Hand-deep-tufted across 82 individual anchor points using vegetable-tanned Tuscan hides that soften and build a lustrous, irreplaceable patina over decades.',
    dimensions: {
      width: '235 cm (92.5")',
      depth: '102 cm (40.2")',
      height: '76 cm (29.9")',
      seatHeight: '44 cm (17.3")'
    },
    frameMaterial: 'Grade-A Kiln-Dried European Beech with dowelled & mortise joinery',
    cushionFill: 'High-resilience foam core encased in ethically certified European goose down (80/20)',
    warranty: '10-Year Master Craftsman Frame & Suspension Warranty',
    fabricCare: 'Condition biannually with natural beeswax leather balm; shield from prolonged harsh midday ultraviolet rays.',
    leadTime: 'Handcrafted to order: 3 - 4 weeks with white-glove inside delivery',
    inStock: true
  },
  {
    id: 'luxe-aurelia-curved-modular',
    name: 'The Aurelia Sculptural Modular',
    subtitle: 'Architectural Bouclé in Pearl Alabaster',
    badge: 'BEST SELLER',
    category: 'Curved Modular',
    fabricType: 'Architectural Heavy Bouclé',
    materials: ['Textured Wool-Cotton Blend', 'Solid Oak Internal Arch', 'Memory Foam Layering'],
    colors: [
      { name: 'Pearl Alabaster', hex: '#F3EFEA' },
      { name: 'Warm Greige', hex: '#D6CEC5' },
      { name: 'Dune Sand', hex: '#E2D8CC' },
      { name: 'Onyx Charcoal', hex: '#333130' }
    ],
    priceINR: 315000,
    originalPriceINR: 345000,
    rating: 4.98,
    reviewsCount: 52,
    images: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1400&auto=format&fit=crop'
    ],
    description: 'Fluid organic geometry meets unyielding sculptural composure. Curved to invite conversation and lounge contemplation, upholstered in tactile French looped bouclé with water-repellent nanocoating.',
    dimensions: {
      width: '280 cm (110.2")',
      depth: '125 cm (49.2")',
      height: '74 cm (29.1")',
      seatHeight: '41 cm (16.1")'
    },
    frameMaterial: 'Curved multi-ply Russian Birch reinforced with solid White Ash',
    cushionFill: 'Variable-density ergonomic matrix wrapped in hypoallergenic micro-cluster fiberfill',
    warranty: '10-Year Structural Frame Guarantee & 5-Year Fabric Shield',
    fabricCare: 'Vacuum weekly with soft brush upholstery attachment; spot clean with warm pH-neutral foam.',
    leadTime: 'Artisanal bench-built: 4 weeks',
    inStock: true
  },
  {
    id: 'luxe-milano-tuxedo',
    name: 'The Milano Velvet Tuxedo',
    subtitle: 'Royal Crushed Emerald Velvet on Brushed Brass',
    badge: 'NEW ARRIVAL',
    category: 'Minimalist Tuxedo',
    fabricType: 'Royal Crushed Silk Velvet',
    materials: ['Cotton-Silk Velvet', 'Solid Brushed Brass Plinth', 'Kiln-Dried Walnut Frame'],
    colors: [
      { name: 'Emerald Forest', hex: '#1E3A2F' },
      { name: 'Midnight Sapphire', hex: '#1A293D' },
      { name: 'Damson Plum', hex: '#3E1F2F' },
      { name: 'Gilded Ochre', hex: '#9E7832' }
    ],
    priceINR: 195000,
    originalPriceINR: 220000,
    rating: 4.88,
    reviewsCount: 24,
    images: [
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1400&auto=format&fit=crop'
    ],
    description: 'Sharply tailored rectilinear architecture inspired by mid-century Milanese salons. The armrests sit level with the continuous backline, accented with an unbroken brushed antique brass plinth base.',
    dimensions: {
      width: '215 cm (84.6")',
      depth: '94 cm (37.0")',
      height: '72 cm (28.3")',
      seatHeight: '43 cm (16.9")'
    },
    frameMaterial: 'Kiln-dried American Walnut and reinforced aircraft alloy corner plates',
    cushionFill: 'High-density foam enveloped with pure goose feather channeled duvets',
    warranty: '10-Year Warranty on frame, suspension, and metal plinth finish',
    fabricCare: 'Professional dry cleaning; gentle directional velvet brushing to restore pile.',
    leadTime: 'Handcrafted in 2 - 3 weeks',
    inStock: true
  },
  {
    id: 'luxe-amalfi-deep-sectional',
    name: 'The Amalfi Grand Lounger',
    subtitle: 'Belgian Heritage Washed Linen in Oat',
    badge: 'SIGNATURE',
    category: 'Deep Sectional',
    fabricType: 'Belgian Heritage Linen',
    materials: ['100% Belgian Master of Linen', 'Hand-Tied 8-Way Coil Springs', 'Sustainably Harvested Teak'],
    colors: [
      { name: 'Flaxen Oat', hex: '#EAE5D9' },
      { name: 'Bleached Chalk', hex: '#F7F6F2' },
      { name: 'Olive Sage', hex: '#6C705E' },
      { name: 'Washed Indigo', hex: '#37474F' }
    ],
    priceINR: 365000,
    originalPriceINR: 410000,
    rating: 4.96,
    reviewsCount: 45,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop'
    ],
    description: 'Generous 120cm lounge depth designed for relaxed horizontal living. Upholstered in pre-washed heavy Belgian linen with subtle casual flange seams and reversible dual-density down cushions.',
    dimensions: {
      width: '320 cm (126.0")',
      depth: '120 cm (47.2")',
      height: '80 cm (31.5")',
      seatHeight: '42 cm (16.5")'
    },
    frameMaterial: 'Engineered cross-laminated timber & solid seasoned plantation teak',
    cushionFill: 'Channel-quilted down wrap over premium CertiPUR-US resilient core',
    warranty: '10-Year Comprehensive Atelier Craftsmanship Guarantee',
    fabricCare: 'Removable cushion slipcovers machine-washable on delicate wool cycle.',
    leadTime: 'Bespoke execution: 4 - 5 weeks',
    inStock: true
  },
  {
    id: 'luxe-seraphina-daybed',
    name: 'The Seraphina Chaise Daybed',
    subtitle: 'Fine Italian Wool & Smoked Oak Base',
    badge: 'NEW ARRIVAL',
    category: 'Bespoke Lounger',
    fabricType: 'Textured Cashmere & Wool Melange',
    materials: ['Italian Wool Blend', 'Fumed European Smoked Oak', 'Solid Cast Brass Pegs'],
    colors: [
      { name: 'Cashmere Camel', hex: '#C2A382' },
      { name: 'Pebble Slate', hex: '#63676E' },
      { name: 'Warm Ecru', hex: '#ECE7DE' },
      { name: 'Burnt Terracotta', hex: '#9C5144' }
    ],
    priceINR: 179000,
    rating: 4.91,
    reviewsCount: 19,
    images: [
      'https://images.unsplash.com/photo-1506898667547-42e22a46e125?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1400&auto=format&fit=crop'
    ],
    description: 'Low-slung silhouette punctuated by an integrated cantilevered smoked oak side ledge. Hand-stitched French seam detailing with a removable cylindrical neck bolster in matching wool.',
    dimensions: {
      width: '198 cm (78.0")',
      depth: '88 cm (34.6")',
      height: '68 cm (26.8")',
      seatHeight: '39 cm (15.4")'
    },
    frameMaterial: 'Solid Smoked Oak platform with mortise and tenon wood joinery',
    cushionFill: 'Tri-layer ergonomic cold-cure latex cushioning with wool fleece crown',
    warranty: '10-Year Framework Guarantee',
    fabricCare: 'Spot clean only; professional textile care recommended.',
    leadTime: 'Crafted in 3 weeks',
    inStock: true
  },
  {
    id: 'luxe-palladio-grand-lawson',
    name: 'The Palladio Heritage Lawson',
    subtitle: 'Hand-Antiqued Saddle Brown Leather',
    badge: 'BEST SELLER',
    category: 'Chesterfield',
    fabricType: 'Hand-Antiqued Saddle Leather',
    materials: ['Vegetable-Tanned Saddle Hide', 'Kiln-Dried Hard Maple', 'Antiqued Bronze Ferrules'],
    colors: [
      { name: 'Cigar Saddle', hex: '#633B1F' },
      { name: 'Oxblood Bourbon', hex: '#4A151B' },
      { name: 'Aged Whiskey', hex: '#9E6835' },
      { name: 'Jet Raven', hex: '#212121' }
    ],
    priceINR: 275000,
    originalPriceINR: 299000,
    rating: 4.97,
    reviewsCount: 31,
    images: [
      'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1400&auto=format&fit=crop'
    ],
    description: 'An enduring icon re-engineered for the modern architectural estate. Gently rolled armrests, deep channeled seating, and individually hand-hammered bronze tack accents along the apron.',
    dimensions: {
      width: '240 cm (94.5")',
      depth: '104 cm (40.9")',
      height: '82 cm (32.3")',
      seatHeight: '46 cm (18.1")'
    },
    frameMaterial: 'Solid Hard Maple kiln-dried to strict 7% moisture equilibrium',
    cushionFill: 'Heavy-gauge sinuous springs wrapped in high-density resilient foam & duck feather duvet',
    warranty: '10-Year Lifetime Structural Warranty',
    fabricCare: 'Dust regularly with clean microfiber cloth; treat with saddle leather cream annually.',
    leadTime: 'Crafted in 3 - 4 weeks',
    inStock: true
  },
  {
    id: 'luxe-solstice-low-profile',
    name: 'The Solstice Low-Profile Cloud',
    subtitle: 'Chunky Wool Bouclé in Dune Whisper',
    badge: 'NEW ARRIVAL',
    category: 'Curved Modular',
    fabricType: 'Textured Bouclé & Alpaca Weave',
    materials: ['Chunky Merino Bouclé', 'Layered Memory Gel', 'Concealed Solid Ash Skids'],
    colors: [
      { name: 'Dune Whisper', hex: '#F0ECE4' },
      { name: 'Pumice Stone', hex: '#C7C2BA' },
      { name: 'Cocoa Husk', hex: '#52433C' },
      { name: 'Muted Moss', hex: '#545C4B' }
    ],
    priceINR: 289000,
    rating: 4.93,
    reviewsCount: 16,
    images: [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1400&auto=format&fit=crop'
    ],
    description: 'Ground-hugging horizon lines designed for spacious penthouses and open loft environments. The concealed wooden skid base gives the illusion of a sofa floating effortlessly above the hardwood floor.',
    dimensions: {
      width: '260 cm (102.4")',
      depth: '115 cm (45.3")',
      height: '69 cm (27.2")',
      seatHeight: '38 cm (15.0")'
    },
    frameMaterial: 'Solid Northern Ash and interlocking birch plywood gussets',
    cushionFill: 'Quad-tier progressive comfort foam with silk-infused fiber toppers',
    warranty: '10-Year Framework Warranty',
    fabricCare: 'Professional dry cleaning only; steam lightly to revive textured boucle loops.',
    leadTime: 'Handcrafted in 4 weeks',
    inStock: true
  },
  {
    id: 'luxe-versailles-settee',
    name: 'The Versailles Modern Settee',
    subtitle: 'Midnight Blue Silk Velvet with Matte Brass',
    badge: 'SIGNATURE',
    category: 'Minimalist Tuxedo',
    fabricType: 'Silk-Cotton Velvet',
    materials: ['Venetian Silk Velvet', 'Solid Brass Inlay Legs', 'Hand-Carved Walnut Backing'],
    colors: [
      { name: 'Midnight Blue', hex: '#16233B' },
      { name: 'Smoky Amethyst', hex: '#372B3C' },
      { name: 'Burnt Ochre', hex: '#876127' },
      { name: 'Bone White', hex: '#EBE7DF' }
    ],
    priceINR: 165000,
    originalPriceINR: 189000,
    rating: 4.89,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop'
    ],
    description: 'A striking statement settee that anchors formal foyers, library alcoves, and private master dressing rooms. Subtle knife-edge tailoring and polished antique brass needle legs.',
    dimensions: {
      width: '185 cm (72.8")',
      depth: '85 cm (33.5")',
      height: '75 cm (29.5")',
      seatHeight: '43 cm (16.9")'
    },
    frameMaterial: 'Select American Walnut and welded heavy-gauge tubular brass',
    cushionFill: 'Firm ergonomic poly-foam with wool felt wrapping',
    warranty: '10-Year Master Frame Guarantee',
    fabricCare: 'Gently vacuum with velvet brush nozzle; blot liquids immediately with untreated cotton cloth.',
    leadTime: 'Artisan craft: 2 - 3 weeks',
    inStock: true
  }
];

// Bespoke Custom Studio Data Configurations
export const SILHOUETTES: SilhouetteOption[] = [
  {
    id: 'chesterfield',
    name: 'The Chesterfield',
    tagline: 'Deep Button Hand-Tufting & Rolled Arms',
    basePriceINR: 220000,
    description: 'Quintessential heritage craft. 82 hand-knotted tufts, generous arm curvature, and timeless statuesque presence.',
    dimensions: '235 x 102 x 76 cm',
    images: {
      front: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop',
      threeQuarter: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=1200&auto=format&fit=crop',
      top: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop'
    }
  },
  {
    id: 'curved-modular',
    name: 'The Curved Modular',
    tagline: 'Organic Sculptural Flow & Fluid Contours',
    basePriceINR: 260000,
    description: 'Continuous monolithic curves designed to form an architectural centerpiece in expansive modern spaces.',
    dimensions: '280 x 125 x 74 cm',
    images: {
      front: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop',
      threeQuarter: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1200&auto=format&fit=crop',
      top: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1200&auto=format&fit=crop'
    }
  },
  {
    id: 'minimalist-tuxedo',
    name: 'The Minimalist Tuxedo',
    tagline: 'Sharply Tailored Rectilinear Precision',
    basePriceINR: 185000,
    description: 'Clean uniform back-to-arm height with crisp tailored edges and continuous horizontal geometry.',
    dimensions: '215 x 94 x 72 cm',
    images: {
      front: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1200&auto=format&fit=crop',
      threeQuarter: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop',
      top: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop'
    }
  },
  {
    id: 'deep-sectional',
    name: 'The Deep Sectional',
    tagline: '120cm Extended Lounge Depth & Cloud Pillows',
    basePriceINR: 310000,
    description: 'Deep indulgence for relaxed socializing and supreme tactile immersion with reversible feather-down bolsters.',
    dimensions: '320 x 120 x 80 cm',
    images: {
      front: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
      threeQuarter: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop',
      top: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
      detail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop'
    }
  }
];

export const MATERIALS: MaterialOption[] = [
  {
    id: 'leather',
    name: 'Italian Full-Grain Leather',
    origin: 'Tuscan Tanneries, Florence, Italy',
    priceDeltaINR: 45000,
    textureDescription: 'Supple 1.6mm uncorrected aniline hide with natural pebble grain and breathable wax finish.',
    careRating: 'Develops rich patina over 25+ years',
    colorSwatches: [
      { id: 'cognac', name: 'Vintage Cognac', hex: '#8C4D26', bgStyle: 'bg-[#8C4D26]' },
      { id: 'espresso', name: 'Dark Espresso', hex: '#261C18', bgStyle: 'bg-[#261C18]' },
      { id: 'saddle', name: 'Saddle Tan', hex: '#B87333', bgStyle: 'bg-[#B87333]' },
      { id: 'bone', name: 'Raw Calfskin Chalk', hex: '#EAE6DF', bgStyle: 'bg-[#EAE6DF]' }
    ]
  },
  {
    id: 'boucle',
    name: 'Architectural Bouclé',
    origin: 'Lyon Textile Mills, France',
    priceDeltaINR: 30000,
    textureDescription: 'Heavy-weight chunky looped weave combining merino wool and organic cotton yarns.',
    careRating: 'Pre-treated with invisible stain shield',
    colorSwatches: [
      { id: 'pearl', name: 'Pearl Alabaster', hex: '#F3EFEA', bgStyle: 'bg-[#F3EFEA]' },
      { id: 'greige', name: 'Oat Greige', hex: '#D7D0C6', bgStyle: 'bg-[#D7D0C6]' },
      { id: 'pumice', name: 'Pumice Grey', hex: '#AEABA4', bgStyle: 'bg-[#AEABA4]' },
      { id: 'onyx-boucle', name: 'Onyx Bouclé', hex: '#2C2B29', bgStyle: 'bg-[#2C2B29]' }
    ]
  },
  {
    id: 'velvet',
    name: 'Royal Crushed Velvet',
    origin: 'Veneto Silk Guild, Italy',
    priceDeltaINR: 20000,
    textureDescription: 'Dense 650g/m² cotton-silk blend with dual-directional light reflectivity and cashmere softness.',
    careRating: 'High abrasion resistance (80,000 Martindale)',
    colorSwatches: [
      { id: 'emerald', name: 'Forest Emerald', hex: '#1C3B2F', bgStyle: 'bg-[#1C3B2F]' },
      { id: 'sapphire', name: 'Midnight Sapphire', hex: '#16273B', bgStyle: 'bg-[#16273B]' },
      { id: 'ochre', name: 'Imperial Ochre', hex: '#A88234', bgStyle: 'bg-[#A88234]' },
      { id: 'champagne', name: 'Rose Champagne', hex: '#C9A79E', bgStyle: 'bg-[#C9A79E]' }
    ]
  },
  {
    id: 'linen',
    name: 'Belgian Heritage Linen',
    origin: 'Flanders, Belgium',
    priceDeltaINR: 15000,
    textureDescription: 'Master of Linen certified pure flax, stone-washed for casual drape and organic breathability.',
    careRating: '100% natural, hypoallergenic & cool',
    colorSwatches: [
      { id: 'flax', name: 'Natural Flax', hex: '#DDD7C7', bgStyle: 'bg-[#DDD7C7]' },
      { id: 'bleached', name: 'Pure Chalk', hex: '#F9F8F5', bgStyle: 'bg-[#F9F8F5]' },
      { id: 'sage', name: 'Olive Sage', hex: '#7A8070', bgStyle: 'bg-[#7A8070]' },
      { id: 'charcoal-linen', name: 'Smoked Peat', hex: '#3B3835', bgStyle: 'bg-[#3B3835]' }
    ]
  }
];

export const BASE_FINISHES: BaseFinishOption[] = [
  {
    id: 'smoked-oak',
    name: 'Fumed Smoked Oak',
    description: 'Deep dark European oak treated with traditional ammonia-fuming to enrich wood grain.',
    priceDeltaINR: 12000,
    colorHex: '#3A2E26'
  },
  {
    id: 'brushed-brass',
    name: 'Antique Brushed Brass',
    description: 'Solid brass with hand-brushed directional satin finish and protective clear seal.',
    priceDeltaINR: 24000,
    colorHex: '#A37B30'
  },
  {
    id: 'matte-black-steel',
    name: 'Matte Gunmetal Steel',
    description: 'Ultra-refined architectural steel with micro-sandblasted electrostatic black coating.',
    priceDeltaINR: 8000,
    colorHex: '#1E1F21'
  }
];

export const FIRMNESS_OPTIONS: FirmnessOption[] = [
  {
    id: 'cloud-plush',
    name: 'Cloud Plush',
    feel: 'Sink-in relaxed softness',
    priceDeltaINR: 15000,
    description: '80% European down wrapped over multi-layer memory comfort foam. Soft, enveloping bliss.'
  },
  {
    id: 'balanced-ergonomic',
    name: 'Balanced Ergonomic',
    feel: 'Optimal support with gentle give',
    priceDeltaINR: 0,
    description: 'Our signature atelier balance. Responsive high-resilience foam core with 50/50 down duvet crown.'
  },
  {
    id: 'structured-firm',
    name: 'Structured Firm',
    feel: 'Architectural, crisp posture',
    priceDeltaINR: 10000,
    description: 'High-density orthopaedic foam with wool batting for formal gatherings and long-lasting shape retention.'
  }
];

// Quick Search Suggestions
export const QUICK_SEARCH_PILLS = [
  'Chesterfield',
  'Bouclé',
  'Velvet',
  'Italian Leather',
  'Modular'
];

// Helper to format currency in Indian Rupees (INR)
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
