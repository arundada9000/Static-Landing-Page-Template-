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

// ─── Products ─────────────────────────────────────────────────────────────────
// Add a new product object to this array — the rest of the UI handles itself.

export const allProducts: ShopProduct[] = [
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
];

// ─── Helper — get a single product by id ─────────────────────────────────────
export const getProductById = (id: string): ShopProduct | undefined =>
  allProducts.find((p) => p.active !== false && p.id === id);

// ─── Helper — get products by category ───────────────────────────────────────
export const getProductsByCategory = (category: string): ShopProduct[] =>
  category === "All"
    ? allProducts.filter((p) => p.active !== false)
    : allProducts.filter((p) => p.active !== false && p.category === category);
