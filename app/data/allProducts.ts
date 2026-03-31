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
  // ── 1 ────────────────────────────────────────────────────────────────────
  {
    id: "vela-signature",
    name: "VELA Signature Watch",
    shortDescription:
      "Our best-loved timepiece. Swiss-inspired movement, sapphire glass, and a presence that commands any room.",
    longDescription:
      "The VELA Signature is the cornerstone of our collection. Featuring a 40 mm stainless-steel case, scratch-resistant sapphire crystal, and a precision quartz movement accurate to ±15 sec/month. Available in three colourways, each paired with a genuine full-grain leather strap that deepens beautifully with wear.",
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
    id: "vela-elite",
    name: "VELA Elite Chronograph",
    shortDescription:
      "The pinnacle of the VELA line — a full chronograph with dual sub-dials and a titanium case.",
    longDescription:
      "Built for those who accept nothing less than extraordinary. The VELA Elite features a 43 mm Grade-5 titanium case, tri-compax chronograph layout, and a flying-seconds sub-dial. The domed sapphire crystal sits atop a dial hand-treated with Super-LumiNova® for clear readability in any light.",
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
    id: "vela-sport",
    name: "VELA Sport Active",
    shortDescription:
      "Lightweight, tough, and track-ready. The Sport is built for people on the move.",
    longDescription:
      "The VELA Sport Active strips away excess and doubles down on performance. A 38 mm aerospace-aluminium case, shock-resistant mineral glass, and a breathable silicone strap make it the perfect companion from early runs to evening drinks.",
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
];

// ─── Helper — get a single product by id ─────────────────────────────────────
export const getProductById = (id: string): ShopProduct | undefined =>
  allProducts.find((p) => p.active !== false && p.id === id);

// ─── Helper — get products by category ───────────────────────────────────────
export const getProductsByCategory = (category: string): ShopProduct[] =>
  category === "All"
    ? allProducts.filter((p) => p.active !== false)
    : allProducts.filter(
        (p) => p.active !== false && p.category === category
      );
