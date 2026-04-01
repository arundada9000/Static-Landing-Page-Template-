/**
 * ============================================================
 *  SHOP PRODUCT CATALOG — allProducts.ts
 *  Add / edit products here. The UI (listing card, detail page,
 *  cart drawer, and WhatsApp message) all update automatically.
 * ============================================================
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProductOption {
  /** Machine-readable key — used as the key in selectedOptions state  */
  id: string;
  /** Human-readable label shown above the picker (e.g. "Size", "Color") */
  name: string;
  /** Available choices the customer can pick from */
  choices: string[];
}

export interface ShopProduct {
  id: string;
  name: string;
  /** One-liner shown on listing cards */
  shortDescription: string;
  /** Full HTML-safe copy shown on the detail page */
  longDescription: string;
  /** Main price in NPR (or whatever currency; adjust the symbol in siteConfig) */
  price: number;
  /** If provided, the original price is shown struck-through (sale signal) */
  originalPrice?: number;
  /** First image = cover image on the card */
  images: string[];
  /** Used for the filter bar. Keep consistent. */
  category: string;
  /** Optional extra tags shown as small chips */
  tags?: string[];
  /** Optional badge on the card — "Bestseller" | "New" | "Sale" | "Limited" | string */
  badge?: string;
  /** Bullet-point features shown on the detail page */
  features?: string[];
  /**
   *  Dynamic variant system.
   *  Each entry renders a picker on the detail page.
   *  The selected values are woven into the WhatsApp message automatically.
   *
   *  Examples:
   *    { id: "size",    name: "Size",    choices: ["S", "M", "L", "XL"] }
   *    { id: "color",   name: "Color",   choices: ["Black", "White"] }
   *    { id: "license", name: "License", choices: ["Standard", "Extended"] }
   *    { id: "plan",    name: "Plan",    choices: ["Monthly", "Yearly"] }
   */
  options?: ProductOption[];
  /** Set false to hide the product from the listing (soft-delete) */
  active?: boolean;
}

// ─── Currency symbol — change once here to match your client ─────────────────
export const CURRENCY = "NPR ";

// ─── Helper to format a price ────────────────────────────────────────────────
export const formatPrice = (n: number) =>
  `${CURRENCY}${n.toLocaleString("en-IN")}`;

// ─── Category list for the filter bar ────────────────────────────────────────
// Add new categories here when you add new products.
export const shopCategories = [
  "All",
  "Watches",
  "Accessories",
  "Bags",
  "Apparel",
];

// ─── Products Data ─────────────────────────────────────────────────────────────
// Add a new product object to this array — the rest of the UI handles itself.

const rawProducts: ShopProduct[] = [
  {
    id: "t-shirt",
    name: "T-shirt",
    shortDescription: "T-shirt for summer",
    longDescription: "Best cotton t-shirt for summer",
    price: 1199,
    originalPrice: 2000,
    images: [
      "https://res-console.cloudinary.com/dx327tmux/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/SU1HXzE0OTNfazVyd2xo/template_primary",
      "https://res-console.cloudinary.com/dx327tmux/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/QXNoaXNoLVBob3Rvcm9vbV9zbWo1ODQ=/template_primary",
    ],
    category: "Clothes",
    badge: "New",
    tags: ["premium"],
    features: ["cotton"],
    options: [
      {
        id: "x",
        name: "size",
        choices: ["xl", "2xl", "3xl"],
      },
      {
        id: "c",
        name: "color",
        choices: ["white"],
      },
    ],
  },
  // ── 1 ────────────────────────────────────────────────────────────────────
  {
    id: "the-shop-signature",
    name: "THE SHOP Signature Watch",
    shortDescription:
      "Our best-loved timepiece. Swiss-inspired movement, sapphire glass, and a presence that commands any room.",
    longDescription:
      "The THE SHOP Signature is the cornerstone of our collection. Featuring a 40 mm stainless-steel case, scratch-resistant sapphire crystal, and a precision quartz movement accurate to ±15 sec/month. Available in three colourways, each paired with a genuine full-grain leather strap that deepens beautifully with wear.",
    price: 12500,
    originalPrice: 16000,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=900&q=80",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=900&q=80",
    ],
    category: "Watches",
    badge: "Bestseller",
    tags: ["Premium", "Leather Strap"],
    features: [
      "40 mm stainless-steel case",
      "Scratch-resistant sapphire crystal",
      "Precision quartz movement (±15 s/month)",
      "Genuine full-grain leather strap",
      "Water resistant to 5 ATM",
      "2-year international warranty",
    ],
    options: [
      {
        id: "color",
        name: "Colour",
        choices: ["Midnight Black", "Champagne Gold", "Slate Silver"],
      },
      {
        id: "strap",
        name: "Strap",
        choices: ["Classic Leather", "Milanese Mesh"],
      },
    ],
  },

  // ── 2 ────────────────────────────────────────────────────────────────────
  {
    id: "the-shop-elite",
    name: "THE SHOP Elite Chronograph",
    shortDescription:
      "The pinnacle of the THE SHOP line — a full chronograph with dual sub-dials and a titanium case.",
    longDescription:
      "Built for those who accept nothing less than extraordinary. The THE SHOP Elite features a 43 mm Grade-5 titanium case, tri-compax chronograph layout, and a flying-seconds sub-dial. The domed sapphire crystal sits atop a dial hand-treated with Super-LumiNova® for clear readability in any light.",
    price: 28500,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=900&q=80",
    ],
    category: "Watches",
    badge: "Limited",
    tags: ["Titanium", "Chronograph"],
    features: [
      "43 mm Grade-5 titanium case",
      "Tri-compax chronograph",
      "Super-LumiNova® hour markers",
      "Domed sapphire crystal",
      "Steel deployant clasp",
      "Water resistant to 10 ATM",
    ],
    options: [
      {
        id: "dial",
        name: "Dial",
        choices: ["Arctic White", "Obsidian Black", "Pacific Blue"],
      },
    ],
  },

  // ── 3 ────────────────────────────────────────────────────────────────────
  {
    id: "the-shop-sport",
    name: "THE SHOP Sport Active",
    shortDescription:
      "Lightweight, tough, and track-ready. The Sport is built for people on the move.",
    longDescription:
      "The THE SHOP Sport Active strips away excess and doubles down on performance. A 38 mm aerospace-aluminium case, shock-resistant mineral glass, and a breathable silicone strap make it the perfect companion from early runs to evening drinks.",
    price: 7200,
    originalPrice: 8500,
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=900&q=80",
      "https://images.unsplash.com/photo-1581888227599-779811939961?w=900&q=80",
    ],
    category: "Watches",
    badge: "Sale",
    tags: ["Sport", "Lightweight"],
    features: [
      "38 mm aerospace-aluminium case",
      "Shock-resistant mineral glass",
      "Breathable silicone strap",
      "Water resistant to 10 ATM",
      "10-year battery life",
    ],
    options: [
      {
        id: "size",
        name: "Case Size",
        choices: ["38 mm", "42 mm"],
      },
      {
        id: "color",
        name: "Colour",
        choices: ["Stealth Black", "Arctic White", "Coral Red", "Forest Green"],
      },
    ],
  },

  // ── 4 ────────────────────────────────────────────────────────────────────
  {
    id: "leather-card-holder",
    name: "Premium Leather Card Holder",
    shortDescription:
      "Slim, hand-stitched full-grain leather. Holds up to 8 cards and a handful of notes.",
    longDescription:
      "Crafted from Italian full-grain leather, this slim card holder is a daily companion designed to age gracefully with you. Hand-stitched contrasting thread, an internal thumb-notch for easy card access, and a centre slot for folded notes keep you organised without the bulk.",
    price: 2800,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=900&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=80",
    ],
    category: "Accessories",
    badge: "New",
    tags: ["Italian Leather", "Slim"],
    features: [
      "Italian full-grain leather",
      "Hand-stitched contrasting thread",
      "Capacity: 8 cards + notes",
      "Thumb-notch for easy access",
      "Dimensions: 10.5 × 7.5 × 0.6 cm",
    ],
    options: [
      {
        id: "color",
        name: "Colour",
        choices: ["Cognac Tan", "Jet Black", "Burgundy"],
      },
    ],
  },

  // ── 5 ────────────────────────────────────────────────────────────────────
  {
    id: "canvas-tote",
    name: "Heritage Canvas Tote Bag",
    shortDescription:
      "Heavy-duty waxed canvas and reclaimed leather handles — a bag built to last decades.",
    longDescription:
      "Our Heritage Canvas Tote is made from 18 oz waxed canvas with reinforced stress points and reclaimed leather handles. It comfortably carries a 16-inch laptop, gym kit, or a full day of groceries. A zinc-plated brass buckle keeps the bag closed when you need it.",
    price: 5400,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=80",
    ],
    category: "Bags",
    tags: ["Waxed Canvas", "Eco-Friendly"],
    features: [
      "18 oz waxed canvas exterior",
      "Reclaimed leather handles",
      "Fits up to 16-inch laptops",
      "Zinc-plated brass buckle closure",
      "Interior zip pocket",
    ],
    options: [
      {
        id: "color",
        name: "Canvas Colour",
        choices: ["Olive Drab", "Waxed Navy", "Natural Tan"],
      },
      {
        id: "size",
        name: "Size",
        choices: ["Standard", "Large"],
      },
    ],
  },

  // ── 6 ────────────────────────────────────────────────────────────────────
  {
    id: "merino-crewneck",
    name: "Merino Wool Crewneck",
    shortDescription:
      "100% extra-fine Merino. Temperature-regulating, itch-free, and effortlessly smart.",
    longDescription:
      "Knitted from 100% 18.5-micron extra-fine Merino wool, this crewneck is temperature-regulating, naturally odour-resistant, and machine-washable. A relaxed-but-tailored fit works equally well tucked into trousers or layered over a collared shirt.",
    price: 6800,
    originalPrice: 8000,
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=80",
    ],
    category: "Apparel",
    badge: "Sale",
    tags: ["Merino Wool", "Sustainable"],
    features: [
      "100% 18.5-micron extra-fine Merino",
      "Temperature-regulating & odour-resistant",
      "Machine-washable",
      "Relaxed-tailored fit",
      "Ribbed collar, cuffs, and hem",
    ],
    options: [
      {
        id: "size",
        name: "Size",
        choices: ["XS", "S", "M", "L", "XL", "2XL"],
      },
      {
        id: "color",
        name: "Colour",
        choices: [
          "Oatmeal",
          "Charcoal Grey",
          "Navy Blue",
          "Forest Green",
          "Burnt Sienna",
        ],
      },
    ],
  },

  // ── 7 ────────────────────────────────────────────────────────────────────
  {
    id: "polarized-aviators",
    name: "Classic Polarized Aviators",
    shortDescription:
      "Timeless aviator silhouette packed with modern UV400 polarized lenses.",
    longDescription:
      "Meticulously designed for uncompromising sun protection without sacrificing style. These aviators feature ultra-lightweight titanium alloy frames and proprietary diamond-coated polarized lenses that eliminate 99% of reflected glare. Perfect for driving, boating, or everyday city wear.",
    price: 4500,
    originalPrice: 6000,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=900&q=80",
    ],
    category: "Accessories",
    badge: "Trending",
    tags: ["Polarized", "UV400"],
    features: [
      "Ultra-lightweight titanium alloy frame",
      "Diamond-coated polarized lenses",
      "100% UVA/UVB protection",
      "Anti-scratch and anti-reflective coating",
      "Includes premium leather travel case",
    ],
    options: [
      {
        id: "frame_color",
        name: "Frame Colour",
        choices: ["Matte Black", "Gunmetal", "Rose Gold"],
      },
      {
        id: "lens_color",
        name: "Lens Tint",
        choices: ["Midnight Dark", "Gradient Amber", "Ocean Blue"],
      },
    ],
  },

  // ── 8 ────────────────────────────────────────────────────────────────────
  {
    id: "minimalist-backpack",
    name: "Minimalist Commuter Backpack",
    shortDescription:
      "Weather-resistant, structured tech-backpack designed for daily urban transit.",
    longDescription:
      "Simplify your daily commute with a backpack that anticipates your every need. Built from 1000D ballistic nylon, the Minimalist Commuter is highly weather-resistant and holds its structure flawlessly. It features a suspended, fleece-lined laptop sleeve, hidden passport pockets, and a ventilated back-panel.",
    price: 8900,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80",
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=900&q=80",
    ],
    category: "Bags",
    badge: "Bestseller",
    tags: ["Water-Resistant", "Tech Ready"],
    features: [
      "1000D Ballistic Nylon Exterior",
      "Suspended 15-inch laptop sleeve",
      "Hidden anti-theft back pocket",
      "Ergonomic, ventilated back-panel",
      "YKK AquaGuard zippers",
    ],
    options: [
      {
        id: "size",
        name: "Capacity",
        choices: ["18L (Everyday)", "24L (Extended)"],
      },
      {
        id: "color",
        name: "Exterior Colour",
        choices: ["Onyx Black", "Charcoal", "Lunar Grey"],
      },
    ],
  },

  // ── 9 ────────────────────────────────────────────────────────────────────
  {
    id: "cashmere-scarf",
    name: "Mongolian Cashmere Scarf",
    shortDescription:
      "Unbelievably soft, 100% Grade-A Mongolian cashmere for ultimate winter layering.",
    longDescription:
      "Wrap yourself in luxury. Ethically sourced from the high plateaus of Mongolia, our Grade-A cashmere is spun from the longest, finest fibres to prevent pilling while maintaining a cloud-like softness. Large enough to style as a wrap, yet delicate enough to tuck inside a tailored overcoat.",
    price: 5200,
    originalPrice: 6800,
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=900&q=80",
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=900&q=80",
    ],
    category: "Apparel",
    badge: "Sale",
    tags: ["Cashmere", "Winter Essential"],
    features: [
      "100% Grade-A Mongolian Cashmere",
      "Extra-long staple fibres to prevent pilling",
      "Generous 180cm x 30cm dimensions",
      "Lightweight yet remarkably warm",
    ],
    options: [
      {
        id: "color",
        name: "Colour",
        choices: ["Camel", "Ivory", "Midnight", "Burgundy"],
      },
      {
        id: "monogram",
        name: "Add Monogram? (Free)",
        choices: ["No Monogram", "Include Initials (Contact Us)"],
      },
    ],
  },

  // ── 10 ───────────────────────────────────────────────────────────────────
  {
    id: "smart-leather-belt",
    name: "Micro-Adjust Leather Belt",
    shortDescription:
      "A hole-less leather belt that adjusts in quarter-inch increments for a perfect fit.",
    longDescription:
      "Ditch traditional belt holes. Our Micro-Adjust Leather Belt uses a hidden track system sewn into the back, allowing for precise quarter-inch adjustments. Crafted from a single piece of full-grain leather, it ensures zero cracking, zero stretching, and a flawlessly sleek profile.",
    price: 3500,
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=900&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80",
    ],
    category: "Accessories",
    tags: ["Full-Grain", "Innovative"],
    features: [
      "Hidden track system with 30+ size positions",
      "Full-grain leather construction",
      "Solid zinc-alloy buckle (removable/swappable)",
      "Zero holes to stretch or crack",
    ],
    options: [
      {
        id: "leather_color",
        name: "Leather Colour",
        choices: ["Midnight Black", "Espresso Brown", "Walnut"],
      },
      {
        id: "buckle_finish",
        name: "Buckle Finish",
        choices: ["Brushed Gunmetal", "Matte Black", "Polished Silver"],
      },
    ],
  },

  // ── 11 ───────────────────────────────────────────────────────────────────
  {
    id: "smart-ceramic-mug",
    name: "Temp-Control Ceramic Mug",
    shortDescription:
      "A smart heated mug that keeps your coffee exactly at the perfect temperature.",
    longDescription:
      "Never drink cold coffee again. This smart ceramic-coated mug features a built-in precision heating element powered by an all-day battery coaster. Connect via bluetooth to set your exact preferred drinking temperature, and the mug will maintain it for up to 3 hours off-coaster, or all day when docked.",
    price: 18500,
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&q=80",
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=900&q=80",
    ],
    category: "Accessories",
    badge: "Tech",
    tags: ["Smart Home", "Ceramic"],
    features: [
      "Precision temperature control (120°F - 145°F)",
      "3-hour built-in battery life",
      "Scratch-resistant ceramic coating",
      "Auto-sleep and wake tracking",
      "Bluetooth app connectivity",
    ],
    options: [
      {
        id: "color",
        name: "Colour",
        choices: ["Matte White", "Matte Black", "Copper Edition"],
      },
      {
        id: "size",
        name: "Size",
        choices: ["10 oz", "14 oz"],
      },
    ],
  },

  // ── 12 ───────────────────────────────────────────────────────────────────
  {
    id: "weekender-duffel",
    name: "Signature Weekender Duffel",
    shortDescription:
      "The ultimate short-trip companion made from weather-treated canvas and saddle leather.",
    longDescription:
      "Designed perfectly for a 3-day getaway. The Signature Weekender meets all international carry-on size limits while providing cavernous packing space. It features a standalone shoe compartment, waterproof interior zip pockets, and a magnetic quick-access passport slot. Crafted to age beautifully.",
    price: 16500,
    originalPrice: 19000,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=900&q=80",
    ],
    category: "Bags",
    badge: "Sale",
    tags: ["Travel", "Leather"],
    features: [
      "TSA Carry-on approved dimensions",
      "Dedicated ventilated shoe compartment",
      "Vegetable-tanned saddle leather trim",
      "Waterproof interior toiletry pocket",
      "Includes padded shoulder strap",
    ],
    options: [
      {
        id: "color",
        name: "Canvas Colour",
        choices: ["Navy Blue", "Olive Green", "Desert Sand"],
      },
    ],
  },

  // ── 13 ───────────────────────────────────────────────────────────────────
  {
    id: "wireless-anc-headphones",
    name: "Studio Pro ANC Headphones",
    shortDescription:
      "Audiophile-grade wireless over-ear headphones with adaptive noise cancellation.",
    longDescription:
      "Immerse yourself. The Studio Pro combines 50mm beryllium drivers with our state-of-the-art Adaptive ANC algorithm that samples ambient noise 50,000 times per second. Enjoy absolute silence on airplanes or vibrant, distortion-free audio at home, all wrapped in plush lambskin ear-pads.",
    price: 38000,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=900&q=80",
    ],
    category: "Accessories",
    tags: ["Audio", "Wireless"],
    features: [
      "Adaptive Active Noise Cancellation",
      "50mm Beryllium acoustic drivers",
      "40-hour battery life (ANC on)",
      "Premium lambskin leather ear-pads",
      "Multipoint Bluetooth 5.3 connection",
    ],
    options: [
      {
        id: "finish",
        name: "Finish",
        choices: ["Silver/Brown", "All Black", "Gunmetal/Grey"],
      },
    ],
  },

  // ── 14 ───────────────────────────────────────────────────────────────────
  {
    id: "mechanical-keyboard",
    name: "Vanguard Typing Board",
    shortDescription:
      "A heavy CNC-milled aluminum mechanical keyboard built for endless typing comfort.",
    longDescription:
      "Type at the speed of thought. The Vanguard is a 75% layout mechanical keyboard machined from a solid block of aerospace grade aluminum. It features hot-swappable switches, double-shot PBT keycaps that never shine, and a gasket-mounted design that produces a deep, satisfying acoustic profile.",
    price: 24500,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=900&q=80",
    ],
    category: "Accessories",
    badge: "Limited",
    tags: ["Tech", "Productivity"],
    features: [
      "CNC-milled solid aluminum chassis",
      "Hot-swappable PCB (5-pin)",
      "Sound-dampening silicone foam kit",
      "Double-shot PBT keycaps",
      "QMK/VIA fully programmable",
    ],
    options: [
      {
        id: "switches",
        name: "Tactile Feel",
        choices: [
          "Linear (Smooth & Quiet)",
          "Tactile (Bump & Thock)",
          "Clicky (Loud & Sharp)",
        ],
      },
      {
        id: "case_color",
        name: "Case Colour",
        choices: ["E-White", "Anodized Black", "Forest Green"],
      },
    ],
  },

  // ── 15 ───────────────────────────────────────────────────────────────────
  {
    id: "heavyweight-hoodie",
    name: "Heavyweight Box Hoodie",
    shortDescription:
      "A perfectly draping, 500GSM ultra-dense cotton hoodie designed for life.",
    longDescription:
      "We took the staple hoodie and uncompromisingly upgraded every thread. Knitted from custom 500-gram heavy loopback cotton, this hoodie features a modern, slightly boxy fit, dropped shoulders, and a double-lined hood that holds its shape permanently. No strings, no logos — just immaculate tailoring.",
    price: 9500,
    originalPrice: 11000,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&q=80",
      "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=900&q=80",
    ],
    category: "Apparel",
    badge: "Trending",
    tags: ["Streetwear", "Heavyweight"],
    features: [
      "Ultra-heavy 500GSM Loopback Cotton",
      "Pre-shrunk to completely eliminate shrinkage",
      "Double-lined rigid hood construction",
      "Kangaroo pocket with hidden interior phone slot",
      "Modern dropped-shoulder boxy fit",
    ],
    options: [
      {
        id: "size",
        name: "Size",
        choices: ["S", "M", "L", "XL", "2XL"],
      },
      {
        id: "color",
        name: "Colour",
        choices: ["Washed Black", "Heather Grey", "Mocha", "Vintage White"],
      },
    ],
  },
  // ── 16 ───────────────────────────────────────────────────────────────────
  {
    id: "wireless-noise-cancelling-earbuds",
    name: "Aura Pro Wireless Earbuds",
    shortDescription: "Premium true wireless earbuds with active noise cancellation and spatial audio.",
    longDescription: "Experience sound like never before with the Aura Pro. Featuring custom-tuned 11mm dynamic drivers, adaptive ANC that blocks out the world, and immersive spatial audio with head tracking. With up to 8 hours of battery life (32 with the case) and IPX4 sweat resistance, these earbuds are your perfect daily companion.",
    price: 15900,
    originalPrice: 19900,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&q=80",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=900&q=80",
    ],
    category: "Electronics",
    badge: "New",
    tags: ["Wireless", "ANC", "Spatial Audio"],
    features: [
      "Active Noise Cancellation (up to -40dB)",
      "Spatial Audio with dynamic head tracking",
      "11mm custom dynamic drivers",
      "IPX4 sweat and water resistance",
      "32-hour total battery life",
      "Bluetooth 5.3 multipoint connection",
    ],
    options: [
      {
        id: "color",
        name: "Color",
        choices: ["Matte Black", "Pearl White", "Mint Green", "Lavender"],
      },
      {
        id: "case",
        name: "Charging Case",
        choices: ["Standard (Wireless)", "Premium (Wireless + Battery Display)"],
      },
    ],
  },

  // ── 17 ───────────────────────────────────────────────────────────────────
  {
    id: "smart-watch-pro",
    name: "Vitality Smart Watch Pro",
    shortDescription: "Advanced health and fitness smartwatch with AMOLED display and 7-day battery.",
    longDescription: "Track every aspect of your wellbeing with the Vitality Smart Watch Pro. Features include continuous heart rate monitoring, blood oxygen (SpO2) measurement, sleep stage analysis, and over 100 sports modes. The brilliant 1.43\" AMOLED display is always-on and readable under direct sunlight, while the robust titanium case ensures durability.",
    price: 27900,
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=900&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=900&q=80",
    ],
    category: "Electronics",
    badge: "Bestseller",
    tags: ["Fitness", "Health Tracking", "AMOLED"],
    features: [
      "1.43\" AMOLED always-on display",
      "7-day battery life (3 days with always-on)",
      "ECG & SpO2 sensors",
      "GPS, GLONASS, Galileo, Beidou",
      "100+ sports modes with auto-detection",
      "5 ATM water resistance",
    ],
    options: [
      {
        id: "size",
        name: "Case Size",
        choices: ["42 mm", "46 mm"],
      },
      {
        id: "color",
        name: "Finish",
        choices: ["Starlight Aluminum", "Graphite Stainless Steel", "Gold Titanium"],
      },
      {
        id: "band",
        name: "Band Style",
        choices: ["Sport Loop", "Leather Link", "Stainless Steel Mesh"],
      },
    ],
  },

  // ── 18 ───────────────────────────────────────────────────────────────────
  {
    id: "portable-power-station",
    name: "Nomad 300 Power Station",
    shortDescription: "Compact 300Wh portable power station with pure sine wave inverter and fast charging.",
    longDescription: "Stay powered anywhere with the Nomad 300. This compact power station packs a 300Wh LiFePO4 battery, pure sine wave AC output, and multiple USB-C PD ports capable of charging laptops, drones, and small appliances. With a 10-year lifespan and solar charging capability, it's your reliable off-grid companion.",
    price: 42500,
    originalPrice: 49900,
    images: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80",
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=900&q=80",
    ],
    category: "Electronics",
    badge: "Sale",
    tags: ["Portable", "Solar Ready", "LiFePO4"],
    features: [
      "300Wh LiFePO4 battery (3500+ cycles)",
      "300W AC pure sine wave inverter (600W surge)",
      "2x USB-C PD 100W, 2x USB-A",
      "1x 12V car port, 2x DC5521",
      "Solar input up to 100W (MPPT)",
      "Silent operation, no fan noise",
    ],
    options: [
      {
        id: "color",
        name: "Color",
        choices: ["Dark Grey", "Sandstone", "Forest Green"],
      },
      {
        id: "bundle",
        name: "Bundle",
        choices: ["Unit Only", "+ 50W Solar Panel", "+ 100W Solar Panel"],
      },
    ],
  },

  // ── 19 ───────────────────────────────────────────────────────────────────
  {
    id: "gaming-mechanical-keyboard",
    name: "Strike Pro Mechanical Keyboard",
    shortDescription: "Ultra-responsive gaming keyboard with optical switches and customizable RGB.",
    longDescription: "Dominate the competition with the Strike Pro. Featuring magnetic Hall Effect switches with adjustable actuation points, this keyboard delivers lightning-fast input. The aluminum top plate, PBT double-shot keycaps, and programmable macros make it a favorite among esports enthusiasts. Complete with per-key RGB and a detachable USB-C cable.",
    price: 18900,
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=900&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33c9d2cf?w=900&q=80",
    ],
    category: "Electronics",
    tags: ["Gaming", "RGB", "Mechanical"],
    features: [
      "Magnetic Hall Effect switches (adjustable 0.2–4.0mm)",
      "Hot-swappable, 5-pin compatible",
      "CNC aluminum top case",
      "PBT double-shot keycaps",
      "Per-key RGB lighting with software customization",
      "USB-C with braided cable",
    ],
    options: [
      {
        id: "size",
        name: "Form Factor",
        choices: ["60% (Compact)", "65% (Arrow Keys)", "80% (TKL)", "100% (Full Size)"],
      },
      {
        id: "switch",
        name: "Switch Type",
        choices: ["Magnetic Linear (Smooth)", "Magnetic Tactile (Bump)", "Magnetic Clicky (Audible)"],
      },
      {
        id: "color",
        name: "Case Color",
        choices: ["Black", "White", "Retro Beige"],
      },
    ],
  },

  // ── 20 ───────────────────────────────────────────────────────────────────
  {
    id: "ultra-hd-monitor",
    name: "ViewEdge 27\" 4K Studio Monitor",
    shortDescription: "27-inch 4K UHD monitor with 99% sRGB, factory calibration, and USB-C hub.",
    longDescription: "Designed for creators and professionals, the ViewEdge 27 delivers stunning 4K resolution with exceptional color accuracy out of the box. The IPS panel covers 99% sRGB and 95% DCI-P3, while the USB-C port provides 90W power delivery and data to a single cable setup. Height-adjustable stand with VESA compatibility ensures ergonomic comfort.",
    price: 45900,
    originalPrice: 52900,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=900&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&q=80",
    ],
    category: "Electronics",
    badge: "Sale",
    tags: ["4K", "USB-C", "Color Accurate"],
    features: [
      "27\" 4K UHD (3840 x 2160) IPS panel",
      "99% sRGB, 95% DCI-P3 coverage",
      "Factory calibrated (Delta E < 2)",
      "USB-C with 90W PD & data",
      "2x HDMI 2.0, 1x DisplayPort 1.4",
      "Height, tilt, swivel, pivot adjustable",
    ],
    options: [
      {
        id: "finish",
        name: "Finish",
        choices: ["Matte Black", "Silver", "White"],
      },
      {
        id: "stand",
        name: "Stand Type",
        choices: ["Ergonomic Height-Adjustable", "VESA Mount Only (No Stand)"],
      },
    ],
  },

  // ── 21 ───────────────────────────────────────────────────────────────────
  {
    id: "wool-blend-overcoat",
    name: "Heritage Wool-Blend Overcoat",
    shortDescription: "Classic double-breasted overcoat in a luxurious wool-cashmere blend.",
    longDescription: "Elevate your winter wardrobe with this timeless overcoat. Crafted from a premium blend of 80% merino wool and 20% cashmere, it offers exceptional warmth without bulk. The tailored silhouette, notch lapels, and horn-button details exude sophistication. Fully lined with breathable cupro for all-day comfort.",
    price: 28900,
    originalPrice: 35900,
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=900&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=900&q=80",
    ],
    category: "Apparel",
    badge: "Bestseller",
    tags: ["Wool", "Cashmere", "Winter"],
    features: [
      "80% Merino wool, 20% cashmere blend",
      "Double-breasted front with horn buttons",
      "Notch lapels and welt chest pocket",
      "Cupro lining for breathability",
      "Rear vent for ease of movement",
      "Dry clean only",
    ],
    options: [
      {
        id: "size",
        name: "Size",
        choices: ["36 (XS)", "38 (S)", "40 (M)", "42 (L)", "44 (XL)", "46 (2XL)"],
      },
      {
        id: "color",
        name: "Color",
        choices: ["Charcoal", "Navy", "Camel", "Dark Olive"],
      },
    ],
  },

  // ── 22 ───────────────────────────────────────────────────────────────────
  {
    id: "performance-running-shoes",
    name: "Strider Elite Running Shoes",
    shortDescription: "Lightweight running shoes with responsive foam and breathable engineered mesh.",
    longDescription: "Engineered for runners seeking both speed and comfort, the Strider Elite features a nitrogen-infused midsole that provides superior energy return and shock absorption. The engineered mesh upper adapts to foot shape while maintaining breathability, and the carbon-infused outsole delivers traction on any surface.",
    price: 15900,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=900&q=80",
    ],
    category: "Footwear",
    badge: "New",
    tags: ["Running", "Breathable", "Lightweight"],
    features: [
      "Nitrogen-infused EVA foam midsole",
      "Engineered mesh upper with 3D printed overlays",
      "Carbon rubber outsole with flex grooves",
      "8mm heel-to-toe drop",
      "Weight: 230g (size 9 US)",
      "Reflective accents for night running",
    ],
    options: [
      {
        id: "size_us",
        name: "US Men's Size",
        choices: ["7", "8", "9", "10", "11", "12", "13"],
      },
      {
        id: "color",
        name: "Color",
        choices: ["Black/White", "Blue/Neon", "Red/Gray", "All White"],
      },
      {
        id: "width",
        name: "Width",
        choices: ["Standard (D)", "Wide (2E)"],
      },
    ],
  },

  // ── 23 ───────────────────────────────────────────────────────────────────
  {
    id: "ceramic-coffee-maker",
    name: "Artisan Pour-Over Coffee Set",
    shortDescription: "Complete ceramic pour-over set with gooseneck kettle and glass carafe.",
    longDescription: "Brew café-quality coffee at home with this elegant pour-over set. The ceramic dripper with spiral ribs ensures even extraction, while the 1L gooseneck kettle provides precise water flow control. Includes a heat-resistant glass carafe and 100 unbleached paper filters. A perfect gift for coffee enthusiasts.",
    price: 7500,
    originalPrice: 9900,
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&q=80",
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=900&q=80",
    ],
    category: "Home & Living",
    badge: "Sale",
    tags: ["Coffee", "Ceramic", "Artisan"],
    features: [
      "Handcrafted ceramic dripper (glazed finish)",
      "1L stainless steel gooseneck kettle",
      "600ml borosilicate glass carafe",
      "Spiral rib design for optimal flow",
      "Includes 100 unbleached #2 filters",
      "Dishwasher safe components",
    ],
    options: [
      {
        id: "color",
        name: "Dripper Color",
        choices: ["Matte White", "Matte Black", "Terracotta", "Sage Green"],
      },
      {
        id: "kettle",
        name: "Kettle Type",
        choices: ["Stovetop (Gas/Electric)", "Electric (Temperature Control)"],
      },
    ],
  },

  // ── 24 ───────────────────────────────────────────────────────────────────
  {
    id: "leather-chelsea-boots",
    name: "Soho Chelsea Boots",
    shortDescription: "Classic Chelsea boots in full-grain leather with elastic side panels.",
    longDescription: "Effortlessly stylish and versatile, these Chelsea boots are crafted from premium full-grain leather. The elastic gussets allow for easy slip-on, while the Goodyear welted construction ensures durability and easy resoling. A leather-lined interior and cushioned insole provide all-day comfort.",
    price: 18900,
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=900&q=80",
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=900&q=80",
    ],
    category: "Footwear",
    tags: ["Boots", "Leather", "Classic"],
    features: [
      "Full-grain leather upper",
      "Elastic side panels with pull tab",
      "Goodyear welted construction",
      "Leather lining and cushioned insole",
      "Rubber outsole with grip pattern",
      "Stacked leather heel",
    ],
    options: [
      {
        id: "size",
        name: "EU Size",
        choices: ["39", "40", "41", "42", "43", "44", "45", "46"],
      },
      {
        id: "color",
        name: "Color",
        choices: ["Black", "Dark Brown", "Tan", "Burgundy"],
      },
      {
        id: "width",
        name: "Width",
        choices: ["Standard (D)", "Wide (E)"],
      },
    ],
  },

  // ── 25 ───────────────────────────────────────────────────────────────────
  {
    id: "wireless-charging-stand",
    name: "MagSafe 3-in-1 Charging Stand",
    shortDescription: "Premium 3-in-1 wireless charging stand for iPhone, Apple Watch, and AirPods.",
    longDescription: "Declutter your nightstand with this elegant 3-in-1 charging stand. Certified for MagSafe, it delivers fast 15W charging to iPhone, while the dedicated Apple Watch fast-charge module and AirPods pad ensure all your devices are powered simultaneously. Sleek aluminum body with a non-slip base.",
    price: 11500,
    images: [
      "https://images.unsplash.com/photo-1622445275576-721325763afe?w=900&q=80",
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=900&q=80",
    ],
    category: "Electronics",
    badge: "Trending",
    tags: ["MagSafe", "Wireless", "3-in-1"],
    features: [
      "15W MagSafe certified charging",
      "Apple Watch fast-charge module (Series 7+)",
      "5W Qi pad for AirPods",
      "Aluminum body with soft-touch finish",
      "Built-in overcurrent & temperature protection",
      "Includes 30W USB-C power adapter",
    ],
    options: [
      {
        id: "color",
        name: "Finish",
        choices: ["Space Gray", "Silver", "Midnight Blue"],
      },
    ],
  },

  // ── 26 ───────────────────────────────────────────────────────────────────
  {
    id: "camping-hammock",
    name: "Ultralight Camping Hammock",
    shortDescription: "Portable nylon hammock with integrated bug net and tree-friendly straps.",
    longDescription: "Sleep under the stars with this lightweight camping hammock. Made from ripstop nylon, it packs down to the size of a grapefruit and weighs just 500g. The integrated mosquito net keeps bugs at bay, while the included tree straps (no knots required) protect bark and set up in minutes.",
    price: 6500,
    originalPrice: 8200,
    images: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&q=80",
      "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=900&q=80",
    ],
    category: "Outdoor",
    badge: "Sale",
    tags: ["Camping", "Lightweight", "Hammock"],
    features: [
      "Ripstop nylon construction (400lb capacity)",
      "Integrated mosquito net with zipper access",
      "Includes 10ft tree straps and carabiners",
      "Compression stuff sack (6\" x 4\")",
      "Quick-dry, breathable fabric",
      "Total weight: 500g",
    ],
    options: [
      {
        id: "color",
        name: "Hammock Color",
        choices: ["Forest Green", "Charcoal", "Desert Tan", "Midnight Blue"],
      },
      {
        id: "net",
        name: "Bug Net",
        choices: ["Integrated Net (Standard)", "No Net (Lighter Version)"],
      },
    ],
  },

  // ── 27 ───────────────────────────────────────────────────────────────────
  {
    id: "smart-led-bulb",
    name: "Aura Smart Bulb (4-Pack)",
    shortDescription: "Wi-Fi enabled smart LED bulbs with tunable white and millions of colors.",
    longDescription: "Transform your home lighting with these smart LED bulbs. Control them via app or voice assistant to adjust brightness, color temperature (2200K–6500K), or choose from 16 million colors. Set schedules, routines, and scenes. Each bulb consumes just 9W and lasts up to 25,000 hours.",
    price: 4900,
    images: [
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=900&q=80",
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=900&q=80",
    ],
    category: "Home & Living",
    tags: ["Smart Home", "LED", "Voice Control"],
    features: [
      "Wi-Fi 2.4GHz, no hub required",
      "Color temperature: 2200K–6500K tunable white",
      "16 million colors, dimmable",
      "Works with Alexa, Google Assistant, Siri Shortcuts",
      "Energy usage: 9W (equivalent to 60W)",
      "Lifetime: 25,000 hours",
    ],
    options: [
      {
        id: "pack",
        name: "Pack Size",
        choices: ["2 Bulbs", "4 Bulbs", "6 Bulbs"],
      },
      {
        id: "base",
        name: "Base Type",
        choices: ["E26 (Standard)", "E12 (Candelabra)"],
      },
    ],
  },

  // ── 28 ───────────────────────────────────────────────────────────────────
  {
    id: "leather-journal",
    name: "Vintage Leather Journal",
    shortDescription: "Handcrafted leather-bound journal with deckle-edge paper and refillable design.",
    longDescription: "Capture your thoughts in style with this beautifully crafted journal. Made from full-grain vegetable-tanned leather that develops a rich patina over time, it contains 192 pages of acid-free, deckle-edge paper. The wrap-around strap keeps it secure, and the refillable design ensures a lifetime of use.",
    price: 3800,
    images: [
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=900&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&q=80",
    ],
    category: "Accessories",
    tags: ["Stationery", "Leather", "Gift"],
    features: [
      "Full-grain vegetable-tanned leather cover",
      "192 pages, 120gsm acid-free paper",
      "Deckle-edge, lined or blank",
      "Wrap-around leather strap closure",
      "Refillable (standard A5 inserts)",
      "Hand-stitched binding",
    ],
    options: [
      {
        id: "color",
        name: "Leather Color",
        choices: ["Cognac", "Brown", "Black", "Burgundy"],
      },
      {
        id: "paper",
        name: "Paper Style",
        choices: ["Lined", "Blank", "Dotted Grid"],
      },
      {
        id: "size",
        name: "Size",
        choices: ["A5 (5.8\" x 8.3\")", "A6 (4.1\" x 5.8\")"],
      },
    ],
  },

  // ── 29 ───────────────────────────────────────────────────────────────────
  {
    id: "kitchen-knife-set",
    name: "Forge Pro Knife Set (5-Piece)",
    shortDescription: "High-carbon stainless steel kitchen knives with ergonomic handles and storage block.",
    longDescription: "Elevate your culinary experience with this professional knife set. Forged from high-carbon German steel, each blade offers exceptional edge retention and corrosion resistance. The full tang construction provides perfect balance, while the ergonomic Pakkawood handles ensure comfort. Includes a beautiful acacia wood storage block.",
    price: 22500,
    originalPrice: 28900,
    images: [
      "https://images.unsplash.com/photo-1593615696111-3f0f7e4f1f66?w=900&q=80",
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=900&q=80",
    ],
    category: "Home & Living",
    badge: "Bestseller",
    tags: ["Kitchen", "Professional", "Gift"],
    features: [
      "High-carbon German stainless steel (X50CrMoV15)",
      "Full tang for perfect balance",
      "Ergonomic Pakkawood handles",
      "Acacia wood storage block included",
      "Set includes: 8\" chef's, 8\" bread, 7\" santoku, 3.5\" paring, kitchen shears",
      "Lifetime warranty against defects",
    ],
    options: [
      {
        id: "finish",
        name: "Blade Finish",
        choices: ["Polished", "Hammered (Damascus Pattern)"],
      },
    ],
  },

  // ── 30 ───────────────────────────────────────────────────────────────────
  {
    id: "yoga-mat",
    name: "Eco-Friendly Yoga Mat",
    shortDescription: "Non-slip natural rubber yoga mat with alignment lines and carrying strap.",
    longDescription: "Practice with confidence on this sustainable yoga mat. Made from natural tree rubber with a non-toxic, closed-cell surface that prevents sweat absorption and allows for easy cleaning. The 4mm thickness provides optimal cushioning for joints while maintaining stability. Alignment lines help with proper positioning.",
    price: 4900,
    images: [
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=900&q=80",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=80",
    ],
    category: "Fitness",
    tags: ["Yoga", "Eco-Friendly", "Non-Slip"],
    features: [
      "Natural tree rubber base (biodegradable)",
      "Closed-cell surface – sweat resistant",
      "4mm thickness, 72\" x 26\" dimensions",
      "Alignment laser-etched lines",
      "Includes adjustable carrying strap",
      "OEKO-TEX certified, free from phthalates",
    ],
    options: [
      {
        id: "color",
        name: "Color",
        choices: ["Mauve", "Sage Green", "Charcoal", "Midnight Blue"],
      },
      {
        id: "thickness",
        name: "Thickness",
        choices: ["4mm (Standard)", "6mm (Extra Cushion)"],
      },
    ],
  },

  // ── 31 ───────────────────────────────────────────────────────────────────
  {
    id: "wireless-gaming-mouse",
    name: "Phantom X Wireless Gaming Mouse",
    shortDescription: "Ultra-lightweight wireless gaming mouse with 26K DPI sensor and 70-hour battery.",
    longDescription: "Engineered for competitive gamers, the Phantom X delivers pro-level performance with its PixArt 3395 sensor, achieving up to 26,000 DPI and 650 IPS tracking. The honeycomb shell reduces weight to just 59g, while the USB-C fast charging gives 70 hours of gameplay on a single charge.",
    price: 8900,
    originalPrice: 10900,
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93f023c9e1?w=900&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=900&q=80",
    ],
    category: "Electronics",
    badge: "Trending",
    tags: ["Gaming", "Wireless", "Ultralight"],
    features: [
      "PixArt PAW3395 optical sensor (26,000 DPI)",
      "Wireless (2.4GHz) & Bluetooth 5.2",
      "59g honeycomb shell",
      "70-hour battery life, USB-C fast charge",
      "6 programmable buttons, on-board memory",
      "PTFE glides for smooth tracking",
    ],
    options: [
      {
        id: "color",
        name: "Color",
        choices: ["Matte Black", "Arctic White", "Neon Pink"],
      },
      {
        id: "grip",
        name: "Grip Tape",
        choices: ["None", "Pre-cut Grip Tape (Add $5)"],
      },
    ],
  },

  // ── 32 ───────────────────────────────────────────────────────────────────
  {
    id: "handmade-ceramic-vase",
    name: "Artisan Ceramic Vase",
    shortDescription: "Hand-thrown stoneware vase with reactive glaze, perfect for dried or fresh flowers.",
    longDescription: "Add a touch of organic elegance to your home with this unique ceramic vase. Each piece is hand-thrown on a potter's wheel using high-fire stoneware clay, then finished with a reactive glaze that creates subtle variations in color and texture. The wide mouth accommodates bouquets, while the sturdy base ensures stability.",
    price: 4200,
    images: [
      "https://images.unsplash.com/photo-1612196808214-b7e239e5db72?w=900&q=80",
      "https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?w=900&q=80",
    ],
    category: "Home & Living",
    tags: ["Handmade", "Ceramic", "Decor"],
    features: [
      "Hand-thrown stoneware clay",
      "Reactive glaze (unique color variations)",
      "Food-safe, waterproof interior",
      "Dimensions: approx. 6\" H x 5\" W",
      "Dishwasher safe",
      "Each piece is one-of-a-kind",
    ],
    options: [
      {
        id: "glaze",
        name: "Glaze Color",
        choices: ["Oatmeal Speckle", "Moss Green", "Cobalt Blue", "Rust Orange"],
      },
      {
        id: "size",
        name: "Size",
        choices: ["Small (6\")", "Medium (8\")", "Large (10\")"],
      },
    ],
  },

  // ── 33 ───────────────────────────────────────────────────────────────────
  {
    id: "active-noise-cancelling-headphones",
    name: "Silence Pro ANC Headphones",
    shortDescription: "Over-ear headphones with hybrid ANC, 50-hour battery, and plush memory foam earpads.",
    longDescription: "Escape into your world with the Silence Pro. Hybrid active noise cancellation reduces ambient noise by up to 40dB, while 40mm dynamic drivers deliver rich, balanced sound. The ultra-comfortable memory foam earpads are wrapped in soft protein leather, and the foldable design with hard-shell case makes travel effortless.",
    price: 19900,
    originalPrice: 24900,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&q=80",
    ],
    category: "Electronics",
    badge: "Sale",
    tags: ["ANC", "Wireless", "Comfort"],
    features: [
      "Hybrid Active Noise Cancellation (-40dB)",
      "40mm dynamic drivers with Hi-Res Audio",
      "50-hour battery life (ANC on)",
      "Bluetooth 5.0 with aptX HD",
      "Memory foam protein leather earpads",
      "Includes hard-shell travel case and airplane adapter",
    ],
    options: [
      {
        id: "color",
        name: "Color",
        choices: ["Black", "Silver", "Navy Blue"],
      },
      {
        id: "connection",
        name: "Connectivity",
        choices: ["Bluetooth Only", "Bluetooth + Wired (3.5mm)"],
      },
    ],
  },

  // ── 34 ───────────────────────────────────────────────────────────────────
  {
    id: "stainless-steel-water-bottle",
    name: "Insulated Stainless Steel Bottle",
    shortDescription: "Double-wall vacuum insulated bottle keeps drinks cold for 24 hours or hot for 12.",
    longDescription: "Stay hydrated in style with this eco-friendly water bottle. Constructed from 18/8 stainless steel, it's durable, BPA-free, and resistant to condensation. The wide mouth accommodates ice cubes, and the leak-proof lid ensures no spills. Perfect for gym, office, or outdoor adventures.",
    price: 2900,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=80",
      "https://images.unsplash.com/photo-1586363104864-3c21d92a46e3?w=900&q=80",
    ],
    category: "Accessories",
    tags: ["Eco-Friendly", "Insulated", "Stainless Steel"],
    features: [
      "18/8 food-grade stainless steel",
      "Double-wall vacuum insulation",
      "Keeps cold 24h, hot 12h",
      "Wide mouth (fits ice cubes)",
      "Leak-proof, sweat-proof exterior",
      "Powder-coated finish for grip",
    ],
    options: [
      {
        id: "capacity",
        name: "Capacity",
        choices: ["18 oz (530 ml)", "24 oz (710 ml)", "32 oz (946 ml)"],
      },
      {
        id: "color",
        name: "Color",
        choices: ["Matte Black", "White", "Sage Green", "Blush Pink", "Navy"],
      },
      {
        id: "lid",
        name: "Lid Type",
        choices: ["Standard Screw Cap", "Straw Lid", "Coffee Sip Lid"],
      },
    ],
  },

  // ── 35 ───────────────────────────────────────────────────────────────────
  {
    id: "ergonomic-office-chair",
    name: "Aeron-Inspired Ergonomic Chair",
    shortDescription: "Fully adjustable mesh office chair with lumbar support and breathable design.",
    longDescription: "Experience all-day comfort with this premium ergonomic chair. The breathable mesh back and seat promote airflow, while the adjustable lumbar support, seat depth, and armrests allow for a personalized fit. Designed for long hours at the desk, it meets ANSI/BIFMA standards for durability and safety.",
    price: 45900,
    images: [
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=900&q=80",
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=900&q=80",
    ],
    category: "Furniture",
    badge: "Bestseller",
    tags: ["Ergonomic", "Mesh", "Office"],
    features: [
      "Breathable mesh back and seat",
      "Adjustable lumbar support (height + depth)",
      "3D adjustable armrests",
      "Seat depth adjustment (2\" range)",
      "Tilt tension and lock mechanisms",
      "Weight capacity: 350 lbs",
    ],
    options: [
      {
        id: "frame",
        name: "Frame Color",
        choices: ["Black", "Graphite", "Midnight"],
      },
      {
        id: "casters",
        name: "Caster Type",
        choices: ["Hard Floor (Soft Roll)", "Carpet (Standard)"],
      },
    ],
  },
];

// ─── Image Format Utility For External Sources ────────────────────────────────
function formatImageUrl(url: string): string {
  if (!url) return url;

  // 1. Cloudinary Console Dashboard URLs
  if (url.includes("res-console.cloudinary.com")) {
    const match = url.match(/res-console\.cloudinary\.com\/([^/]+)\/thumbnails\/transform\/[^/]+\/image\/upload\/([^/]+)\/v1\/([^/]+)/);
    if (match) {
      try {
        const cloudName = match[1];

        // Base64URL replacing
        const b64Transform = match[2].replace(/-/g, "+").replace(/_/g, "/");
        const b64PublicId = match[3].replace(/-/g, "+").replace(/_/g, "/");

        const transformations = typeof atob === "function"
          ? atob(b64Transform)
          : Buffer.from(b64Transform, "base64").toString();

        const publicId = typeof atob === "function"
          ? atob(b64PublicId)
          : Buffer.from(b64PublicId, "base64").toString();

        return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/v1/${publicId}`;
      } catch (e) {
        // fallback to original if decode fails
      }
    }
  }

  // 2. Google Drive Links
  if (url.includes("drive.google.com")) {
    const fileIdMatch = url.match(/\/file\/d\/([^/]+)/) || url.match(/id=([^&]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
    }
  }

  // 3. Dropbox Links
  if (url.includes("dropbox.com") && url.includes("dl=0")) {
    return url.replace("dl=0", "raw=1");
  }

  return url;
}

// ─── Export Mapped Products ──────────────────────────────────────────────────
export const allProducts: ShopProduct[] = rawProducts.map((product) => ({
  ...product,
  images: product.images.map(formatImageUrl),
}));

// ─── Helper — get a single product by id ─────────────────────────────────────
export const getProductById = (id: string): ShopProduct | undefined =>
  allProducts.find((p) => p.active !== false && p.id === id);

// ─── Helper — get products by category ───────────────────────────────────────
export const getProductsByCategory = (category: string): ShopProduct[] =>
  category === "All"
    ? allProducts.filter((p) => p.active !== false)
    : allProducts.filter((p) => p.active !== false && p.category === category);
