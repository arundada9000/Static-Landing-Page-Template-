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
  // ── 51 ───────────────────────────────────────────────────────────────────
  {
    id: "eternity-solitaire-ring",
    name: "Eternity Solitaire Ring",
    shortDescription: "Some things are simple… and somehow mean everything.",
    longDescription:
      "There are moments that don’t need many words. This piece was made for one of those moments. A single brilliant-cut diamond, quietly holding light the way certain people hold your world together. Set in 14k white gold, timeless, steady… certain. Maybe it’s just a ring. Or maybe it’s something you’ve been meaning to say.",
    price: 125000,
    originalPrice: 149000,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80",
      "https://images.unsplash.com/photo-1536610656141-0d4b7e47d3e0?w=900&q=80",
    ],
    category: "Jewelry",
    badge: "Limited",
    tags: ["Forever", "Unsaid", "Important"],
    features: [
      "A single diamond, chosen to stand alone",
      "Classic setting that never goes out of time",
      "Made to last longer than words sometimes can",
      "Comfort-fit, because some things should just feel right",
      "Comes in a velvet box… for a moment that might matter",
    ],
    options: [
      {
        id: "ring_size",
        name: "Ring Size (US)",
        choices: ["4", "5", "6", "7", "8", "9"],
      },
      {
        id: "metal",
        name: "Metal",
        choices: ["14k White Gold", "14k Yellow Gold", "Platinum (+$250)"],
      },
      {
        id: "engraving",
        name: "Engraving (inside band)",
        choices: ["None", "Date (mm/dd/yyyy)", "Custom Text (up to 20 chars)"],
      },
    ],
  },

  // ── 52 ───────────────────────────────────────────────────────────────────
  {
    id: "forever-bloom-bouquet",
    name: "Forever Bloom Bouquet",
    shortDescription:
      "Not just flowers… something people give when they feel too much.",
    longDescription:
      "Roses have always been the easy way out… when saying it directly feels harder. Twenty-four of them, carefully chosen, deep red, impossible to ignore. Soft petals, but loud meaning. You could call it a gift. Or maybe just a hint.",
    price: 7800,
    originalPrice: 9200,
    images: [
      "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=900&q=80",
      "https://images.unsplash.com/photo-1490750967868-88aa4476b946?w=900&q=80",
      "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=900&q=80",
    ],
    category: "Flowers",
    badge: "Bestseller",
    tags: ["Roses", "Unspoken", "Feelings"],
    features: [
      "24 roses… not random, never random",
      "Wrapped carefully, like something fragile",
      "Fresh, but meant to leave a lasting impression",
      "Includes a note… if you decide to write what you mean",
    ],
    options: [
      {
        id: "quantity",
        name: "Roses",
        choices: ["12 Roses", "24 Roses", "36 Roses", "50 Roses (Premium)"],
      },
      {
        id: "ribbon",
        name: "Ribbon Color",
        choices: ["Ivory Silk", "Red Velvet", "Blush Satin"],
      },
    ],
  },

  // ── 53 ───────────────────────────────────────────────────────────────────
  {
    id: "memory-lane-photo-album",
    name: "Memory Lane Personalized Album",
    shortDescription: "For things you didn’t realize were becoming important.",
    longDescription:
      "It’s strange how small moments turn into the ones you never forget. This album wasn’t just made to store photos… but to hold everything in between them. The laughs, the pauses, the almost-said things. Maybe it’s just a collection. Or maybe it’s a story you’re still writing.",
    price: 8900,
    images: [
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=900&q=80",
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=900&q=80",
      "https://images.unsplash.com/photo-1588099768523-f4e1a16f0174?w=900&q=80",
    ],
    category: "Gifts",
    tags: ["Memories", "Us?", "Keepsake"],
    features: [
      "Made to hold more than just pictures",
      "Pages that won’t fade, even if time passes",
      "Custom embossing… names, dates, or something only you understand",
      "A place for moments that mattered more than expected",
    ],
    options: [
      {
        id: "cover_color",
        name: "Leather Color",
        choices: ["Cognac Brown", "Jet Black", "Navy Blue", "Burgundy"],
      },
      {
        id: "embossing",
        name: "Embossing Text",
        choices: [
          "Names (e.g., 'Alex & Jamie')",
          "Date (e.g., 'June 12, 2025')",
          "Custom Phrase (max 20 chars)",
        ],
      },
      {
        id: "size",
        name: "Album Size",
        choices: [
          '8" x 8" (Square)',
          '10" x 8" (Landscape)',
          '12" x 10" (Large)',
        ],
      },
    ],
  },

  // ── 54 ───────────────────────────────────────────────────────────────────
  {
    id: "romantic-getaway-hamper",
    name: "Romantic Getaway Hamper",
    shortDescription: "For a night that might mean more than planned.",
    longDescription:
      "Some evenings are just… different. This set was made for one of those. Soft light, something sweet, something warm, and just enough quiet to say what you’ve been holding back. Everything here is carefully chosen—but what happens around it… that part is up to you.",
    price: 12500,
    originalPrice: 15900,
    images: [
      "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=900&q=80",
      "https://images.unsplash.com/photo-1542013936693-884638f95419?w=900&q=80",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900&q=80",
    ],
    category: "Gifts",
    badge: "Trending",
    tags: ["Moment", "Maybe Tonight", "Something"],
    features: [
      "A bottle meant to be opened at the right time",
      "Chocolate… because some things should be shared",
      "A candle, for softer conversations",
      "Two glasses… just in case",
      "A setup that feels intentional, even if you say it isn’t",
    ],
    options: [
      {
        id: "champagne",
        name: "Champagne Selection",
        choices: [
          "Moët & Chandon",
          "Veuve Clicquot",
          "Dom Pérignon (upgrade +$80)",
        ],
      },
      {
        id: "chocolates",
        name: "Chocolate Type",
        choices: [
          "Milk Chocolate Assortment",
          "Dark Chocolate Collection",
          "Mixed (milk & dark)",
        ],
      },
    ],
  },

  // ── 55 ───────────────────────────────────────────────────────────────────
  {
    id: "proposal-in-a-box",
    name: "Proposal in a Box – Complete Set",
    shortDescription: "Everything… if you’re ready for everything.",
    longDescription:
      "This isn’t just a set. It’s what happens when you stop overthinking and just decide. Every piece here has a role—but none of them matter as much as the moment they lead to. You could call it a gift. Or you could call it what it really is: a question, waiting.",
    price: 149900,
    originalPrice: 179900,
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80",
      "https://images.unsplash.com/photo-1515562121150-06d323b3be5c?w=900&q=80",
      "https://images.unsplash.com/photo-1604336020151-c88412fd7be3?w=900&q=80",
    ],
    category: "Gifts",
    badge: "Exclusive",
    tags: ["Big Step", "No Turning Back", "Real"],
    features: [
      "Everything needed… except the courage",
      "Carefully arranged, like it was always meant to happen",
      "Designed for a moment you won’t forget",
      "Includes space for one important question",
    ],
    options: [
      {
        id: "ring",
        name: "Ring Selection",
        choices: [
          "Eternity Solitaire (0.5 ct)",
          "Eternity Solitaire (1.0 ct, +$24000)",
          "Custom Ring (contact for quote)",
        ],
      },
      {
        id: "album_embossing",
        name: "Album Embossing",
        choices: ["Names", "Date", "Custom Message"],
      },
      {
        id: "delivery",
        name: "Special Delivery",
        choices: [
          "Standard Shipping",
          "White Glove (hand-delivered by concierge, +$5000)",
        ],
      },
    ],
  },

  // ── 56 ───────────────────────────────────────────────────────────────────
  {
    id: "eternity-couple-bracelets",
    name: "Eternity Couple Bracelets",
    shortDescription: "For two people… who somehow ended up connected.",
    longDescription:
      "It’s funny how one place, one moment, or one meeting can change everything. These bracelets hold coordinates—but they’re really about what happened there. Subtle, simple, easy to wear… but impossible to ignore once you know what they mean.",
    price: 5900,
    images: [
      "https://images.unsplash.com/photo-1589674781759-21f0bbfea1b1?w=900&q=80",
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=900&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80",
    ],
    category: "Jewelry",
    tags: ["Us", "Somewhere", "Connected"],
    features: [
      "Coordinates that mean something (to you)",
      "A quiet reminder, worn every day",
      "Two pieces… meant to exist together",
      "Simple design, complicated meaning",
    ],
    options: [
      {
        id: "leather_color",
        name: "Leather Color",
        choices: ["Black", "Brown", "Tan", "Navy"],
      },
      {
        id: "coordinates",
        name: "Coordinates",
        choices: ["Our First Meeting", "Custom (enter address/place name)"],
      },
    ],
  },
  // ─── Flower Products Data ─────────────────────────────────────────────────────────────

  // ── 1 ────────────────────────────────────────────────────────────────────
  {
    id: "eternal-rose-bouquet",
    name: "Eternal Rose Bouquet",
    shortDescription:
      "A dozen premium long-stem roses, hand-tied with elegant satin ribbon.",
    longDescription:
      "Nothing says 'I love you' like a dozen of our finest roses. Sourced from sustainable farms, each stem is carefully selected for its vibrant color and full bloom. Arranged in a classic hand-tied bouquet and wrapped in elegant satin ribbon, these roses arrive fresh and ready to impress.",
    price: 4500,
    originalPrice: 5500,
    images: [
      "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=900&q=80",
      "https://images.unsplash.com/photo-1490750967868-88aa4476b946?w=900&q=80",
      "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=900&q=80",
    ],
    category: "Flowers",
    badge: "Bestseller",
    tags: ["Roses", "Romantic", "Fresh"],
    features: [
      "12 premium long-stem roses",
      "Hand-tied with satin ribbon",
      "Fresh from sustainable farms",
      "Arrives in hydrating water pack",
      "Gift message included",
    ],
    options: [
      {
        id: "color",
        name: "Color",
        choices: ["Classic Red", "Blush Pink", "Pure White", "Sunset Orange"],
      },
      {
        id: "size",
        name: "Bouquet Size",
        choices: ["12 Roses", "24 Roses", "36 Roses"],
      },
    ],
  },

  // ── 2 ────────────────────────────────────────────────────────────────────
  {
    id: "tulip-trio",
    name: "Dutch Tulip Trio",
    shortDescription: "Three vibrant tulip varieties in a rustic ceramic vase.",
    longDescription:
      "Bring the colors of spring indoors with this cheerful tulip arrangement. Featuring three distinct varieties – classic red, sunny yellow, and delicate pink – each stem is hand-selected for its sturdy stem and vibrant petal. Presented in a handcrafted ceramic vase that complements any decor.",
    price: 3200,
    images: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=900&q=80",
      "https://images.unsplash.com/photo-1470506028280-a011fb34b6f7?w=900&q=80",
    ],
    category: "Flowers",
    tags: ["Tulips", "Spring", "Vase Included"],
    features: [
      "24 stems of premium tulips",
      "3 color varieties: red, yellow, pink",
      "Handcrafted ceramic vase",
      "Fresh-cut and hydrated",
      "Lasts 7–10 days with proper care",
    ],
    options: [
      {
        id: "color_mix",
        name: "Color Mix",
        choices: ["Classic Rainbow", "Pastel Harmony", "Sunset Blend"],
      },
      {
        id: "vase",
        name: "Vase Style",
        choices: ["White Ceramic", "Navy Ceramic", "Clear Glass"],
      },
    ],
  },

  // ── 3 ────────────────────────────────────────────────────────────────────
  {
    id: "sunflower-sunburst",
    name: "Sunflower Sunburst",
    shortDescription:
      "A radiant bouquet of sunflowers, accented with eucalyptus and seasonal greens.",
    longDescription:
      "Brighten anyone's day with the cheerful beauty of sunflowers. This arrangement features 5–7 large sunflowers surrounded by fragrant eucalyptus and fresh greenery. The bold yellow petals and sturdy stems create a stunning display that brings warmth and joy to any space.",
    price: 3800,
    originalPrice: 4400,
    images: [
      "https://images.unsplash.com/photo-1493804714600-6edb1cd93080?w=900&q=80",
      "https://images.unsplash.com/photo-1595539302830-8e2c14c9c3e8?w=900&q=80",
    ],
    category: "Flowers",
    badge: "Sale",
    tags: ["Sunflowers", "Cheerful", "Summer"],
    features: [
      "5–7 premium sunflowers",
      "Fresh eucalyptus and seasonal greens",
      "Hand-tied with natural jute",
      "Hydration pack included",
      "Perfect for birthdays or get-well wishes",
    ],
    options: [
      {
        id: "size",
        name: "Arrangement Size",
        choices: [
          "Standard (5 stems)",
          "Deluxe (7 stems)",
          "Premium (10 stems)",
        ],
      },
      {
        id: "add_greenery",
        name: "Greenery Style",
        choices: ["Eucalyptus Only", "Mixed Greens", "Ruscus & Leatherleaf"],
      },
    ],
  },

  // ── 4 ────────────────────────────────────────────────────────────────────
  {
    id: "orchid-zen",
    name: "Orchid Zen Garden",
    shortDescription:
      "A live Phalaenopsis orchid in a sleek ceramic pot with decorative moss.",
    longDescription:
      "Elegance personified. This live orchid features two graceful spikes with multiple blooms in a pure white or soft lavender hue. Planted in a modern ceramic pot and topped with preserved moss, it makes a sophisticated gift that keeps on giving – with proper care, orchids re-bloom for years.",
    price: 6500,
    images: [
      "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=900&q=80",
      "https://images.unsplash.com/photo-1566136025003-77ffa4ec09f1?w=900&q=80",
    ],
    category: "Flowers",
    badge: "New",
    tags: ["Orchids", "Live Plant", "Low Maintenance"],
    features: [
      "Phalaenopsis orchid with 2 spikes",
      "Multiple blooms per spike",
      "Sleek ceramic pot with drainage",
      "Decorative preserved moss top",
      "Care instructions included",
      "Re-blooms annually with proper care",
    ],
    options: [
      {
        id: "color",
        name: "Bloom Color",
        choices: ["Pure White", "Lavender Mist", "Hot Pink", "Yellow Splash"],
      },
      {
        id: "pot",
        name: "Pot Style",
        choices: ["Matte White Ceramic", "Glossy Black Ceramic", "Terracotta"],
      },
    ],
  },

  // ── 5 ────────────────────────────────────────────────────────────────────
  {
    id: "peony-paradise",
    name: "Peony Paradise Bouquet",
    shortDescription: "Lush, fragrant peonies in a romantic hand-tied bouquet.",
    longDescription:
      "Few flowers capture romance like the peony. This stunning bouquet features 8–10 freshly cut peonies in your choice of color, from soft blush to deep burgundy. Each petal unfurls to reveal a delicate, ruffled bloom that fills the room with a sweet, delicate fragrance. Perfect for weddings, anniversaries, or simply because.",
    price: 7200,
    originalPrice: 8500,
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&q=80",
      "https://images.unsplash.com/photo-1490750967868-88aa4476b946?w=900&q=80",
    ],
    category: "Flowers",
    badge: "Bestseller",
    tags: ["Peonies", "Fragrant", "Romantic"],
    features: [
      "8–10 premium peonies",
      "Hand-tied with silk ribbon",
      "Fragrant blooms",
      "Hydration pack included",
      "Peak season: April–June",
    ],
    options: [
      {
        id: "color",
        name: "Color",
        choices: ["Blush Pink", "Coral", "Burgundy", "White"],
      },
      {
        id: "size",
        name: "Bouquet Size",
        choices: ["8 Stems", "12 Stems", "18 Stems"],
      },
    ],
  },

  // ── 6 ────────────────────────────────────────────────────────────────────
  {
    id: "wildflower-meadow",
    name: "Wildflower Meadow Mix",
    shortDescription:
      "A colorful mix of seasonal wildflowers in a rustic mason jar.",
    longDescription:
      "Bring the beauty of a countryside meadow indoors with this cheerful arrangement. Our florist selects the freshest seasonal wildflowers – including daisies, snapdragons, larkspur, and more – to create a relaxed, whimsical display. Presented in a reusable mason jar tied with twine.",
    price: 2900,
    images: [
      "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=900&q=80",
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=900&q=80",
    ],
    category: "Flowers",
    tags: ["Wildflowers", "Rustic", "Seasonal"],
    features: [
      "Seasonal wildflower mix",
      "Arranged in a glass mason jar",
      "Hand-tied with natural twine",
      "Unique color palette varies by season",
      "Perfect for casual gifting",
    ],
    options: [
      {
        id: "jar",
        name: "Container",
        choices: ["Mason Jar", "Galvanized Tin", "Woven Basket"],
      },
      {
        id: "size",
        name: "Size",
        choices: [
          "Small (6–8 stems)",
          "Medium (12–15 stems)",
          "Large (20+ stems)",
        ],
      },
    ],
  },

  // ── 7 ────────────────────────────────────────────────────────────────────
  {
    id: "lily-elegance",
    name: "Lily Elegance Arrangement",
    shortDescription:
      "Tall, graceful lilies arranged with lush greenery in a glass vase.",
    longDescription:
      "Make a statement with the timeless beauty of lilies. This arrangement features 5–7 stems of premium Oriental or Asiatic lilies, known for their large, fragrant blooms and long vase life. Accented with leatherleaf fern and seasonal greenery, it's a sophisticated choice for any occasion.",
    price: 5400,
    images: [
      "https://images.unsplash.com/photo-1511105441045-5b8d7ef20b9c?w=900&q=80",
      "https://images.unsplash.com/photo-1562486873-6a3ac00c0e3c?w=900&q=80",
    ],
    category: "Flowers",
    badge: "New",
    tags: ["Lilies", "Fragrant", "Tall Arrangement"],
    features: [
      "5–7 premium lily stems",
      "Fragrant Oriental or Asiatic varieties",
      "Arranged in clear glass vase",
      "Greenery: leatherleaf fern and eucalyptus",
      "Vase life: 7–10 days",
    ],
    options: [
      {
        id: "color",
        name: "Color",
        choices: ["White", "Pink", "Yellow", "Orange"],
      },
      {
        id: "vase",
        name: "Vase Style",
        choices: ["Cylinder Glass", "Flared Glass", "No Vase (Hand-Tied)"],
      },
    ],
  },

  // ── 8 ────────────────────────────────────────────────────────────────────
  {
    id: "hydrangea-heaven",
    name: "Hydrangea Heaven",
    shortDescription: "Full, billowy hydrangeas in a chic ceramic container.",
    longDescription:
      "Few flowers offer the fullness and lush texture of hydrangeas. This arrangement features 5–7 large hydrangea blooms in your choice of color, artfully arranged in a modern ceramic pot. The long-lasting blooms make a stunning centerpiece for any table.",
    price: 4900,
    originalPrice: 5900,
    images: [
      "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=900&q=80",
      "https://images.unsplash.com/photo-1588561726653-f1e6c1b5f6d8?w=900&q=80",
    ],
    category: "Flowers",
    badge: "Sale",
    tags: ["Hydrangeas", "Full Blooms", "Centerpiece"],
    features: [
      "5–7 large hydrangea blooms",
      "Modern ceramic container",
      "Color options: blue, pink, white, purple",
      "Foliage accents included",
      "Lasts 7–10 days with proper care",
    ],
    options: [
      {
        id: "color",
        name: "Color",
        choices: ["Sky Blue", "Soft Pink", "Pure White", "Lavender"],
      },
      {
        id: "container",
        name: "Container Style",
        choices: ["White Ceramic", "Navy Ceramic", "Terracotta"],
      },
    ],
  },

  // ── 9 ────────────────────────────────────────────────────────────────────
  {
    id: "carnation-classic",
    name: "Carnation Classic Bouquet",
    shortDescription:
      "A timeless bouquet of carnations in a cheerful color palette.",
    longDescription:
      "Simple, classic, and long-lasting – carnations are a favorite for their ruffled petals and impressive vase life. This bouquet features 24 stems of premium carnations in your choice of solid or mixed colors, hand-tied with a coordinating ribbon. A wonderful gift for birthdays, anniversaries, or just because.",
    price: 2800,
    images: [
      "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=900&q=80",
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=900&q=80",
    ],
    category: "Flowers",
    tags: ["Carnations", "Long-Lasting", "Affordable"],
    features: [
      "24 premium carnation stems",
      "Hand-tied with ribbon",
      "Vase life: 14+ days",
      "Available in solid or mixed colors",
      "Gift message included",
    ],
    options: [
      {
        id: "color",
        name: "Color Theme",
        choices: [
          "Solid Red",
          "Mixed Pastels",
          "Vibrant Rainbow",
          "White Elegance",
        ],
      },
      {
        id: "size",
        name: "Quantity",
        choices: ["12 Stems", "24 Stems", "36 Stems"],
      },
    ],
  },

  // ── 10 ───────────────────────────────────────────────────────────────────
  {
    id: "succulent-garden",
    name: "Succulent Garden Dish",
    shortDescription:
      "A low-maintenance arrangement of assorted succulents in a ceramic dish.",
    longDescription:
      "Perfect for the modern plant lover, this succulent garden features a curated selection of 5–7 different succulents, including echeveria, haworthia, and sedum. Planted in a shallow ceramic dish with decorative stones, it's a living work of art that requires minimal care – just bright light and occasional water.",
    price: 3900,
    images: [
      "https://images.unsplash.com/photo-1459257831348-f0cdd359235f?w=900&q=80",
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=900&q=80",
    ],
    category: "Flowers",
    badge: "Trending",
    tags: ["Succulents", "Low Maintenance", "Live Plant"],
    features: [
      "5–7 assorted succulent varieties",
      "Ceramic dish with drainage",
      "Decorative top dressing",
      "Care instructions included",
      "Thrives indoors with bright light",
    ],
    options: [
      {
        id: "size",
        name: "Dish Size",
        choices: ["Small (6 inches)", "Medium (8 inches)", "Large (10 inches)"],
      },
      {
        id: "style",
        name: "Style",
        choices: [
          "Mixed Succulents",
          "Cactus Garden",
          "Fairy Garden (with miniatures)",
        ],
      },
    ],
  },

  // ── 11 ───────────────────────────────────────────────────────────────────
  {
    id: "rose-gerbera-daisy",
    name: "Gerbera Daisy Cheer",
    shortDescription: "Bright, bold gerbera daisies in a colorful arrangement.",
    longDescription:
      "Bring a burst of happiness with these vibrant gerbera daisies. Known for their large, colorful blooms and sturdy stems, gerberas are a favorite for adding instant cheer. This bouquet includes 10 stems in a mix of bright colors, arranged with seasonal greenery in a clear glass vase.",
    price: 3600,
    images: [
      "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?w=900&q=80",
      "https://images.unsplash.com/photo-1490750967868-88aa4476b946?w=900&q=80",
    ],
    category: "Flowers",
    tags: ["Gerberas", "Bright", "Cheerful"],
    features: [
      "10 gerbera daisy stems",
      "Mixed bright colors",
      "Arranged in glass vase",
      "Greenery accents",
      "Vase life: 7–10 days",
    ],
    options: [
      {
        id: "color_mix",
        name: "Color Palette",
        choices: [
          "Rainbow Bright",
          "Pastel Dreams",
          "Sunset Hues",
          "Primary Colors",
        ],
      },
      {
        id: "vase",
        name: "Vase Included?",
        choices: ["Yes (Glass Cylinder)", "No (Hand-Tied Only)"],
      },
    ],
  },

  // ── 12 ───────────────────────────────────────────────────────────────────
  {
    id: "lavender-lullaby",
    name: "Lavender Lullaby",
    shortDescription: "Aromatic lavender bunches tied with rustic twine.",
    longDescription:
      "Fill your home with the calming scent of lavender. This bundle contains 10–15 freshly cut lavender stems, harvested from local farms. The purple spikes and silvery foliage create a soothing, fragrant display that can be hung to dry for lasting enjoyment.",
    price: 2200,
    images: [
      "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?w=900&q=80",
      "https://images.unsplash.com/photo-1475154196671-f23b2b6acb32?w=900&q=80",
    ],
    category: "Flowers",
    tags: ["Lavender", "Aromatic", "Dried Flowers"],
    features: [
      "10–15 fresh lavender stems",
      "Tied with natural twine",
      "Can be used fresh or dried",
      "Calming fragrance",
      "Perfect for sachets or arrangements",
    ],
    options: [
      {
        id: "bundle",
        name: "Bundle Size",
        choices: ["Small (10 stems)", "Large (20 stems)"],
      },
    ],
  },

  // ── 13 ───────────────────────────────────────────────────────────────────
  {
    id: "spring-blossom",
    name: "Spring Blossom Wreath",
    shortDescription:
      "A handcrafted wreath featuring fresh seasonal blooms and foliage.",
    longDescription:
      "Welcome guests with this beautiful wreath made from fresh spring flowers. Our florist weaves together seasonal favorites like ranunculus, freesia, and jasmine with eucalyptus and ivy to create a lush, fragrant display. Perfect for doors, walls, or as a stunning centerpiece.",
    price: 5900,
    originalPrice: 6900,
    images: [
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=900&q=80",
      "https://images.unsplash.com/photo-1499540633125-484965b60031?w=900&q=80",
    ],
    category: "Flowers",
    badge: "New",
    tags: ["Wreath", "Seasonal", "Handcrafted"],
    features: [
      "Fresh seasonal blooms and foliage",
      "Handcrafted on a wire base",
      "Approx. 14–16 inches diameter",
      "Includes hanging loop",
      "Lasts 1–2 weeks with misting",
    ],
    options: [
      {
        id: "style",
        name: "Style",
        choices: ["Spring Pastels", "Wildflower Meadow", "Rustic Greenery"],
      },
    ],
  },

  // ── 14 ───────────────────────────────────────────────────────────────────
  {
    id: "callalily-statement",
    name: "Calla Lily Statement",
    shortDescription: "Sleek, sculptural calla lilies in a tall glass vase.",
    longDescription:
      "For a modern, minimalist look, nothing beats the elegant curve of calla lilies. This arrangement features 10 stems of premium calla lilies in your choice of white, yellow, or deep purple, arranged in a tall clear glass vase. The clean lines make it a sophisticated centerpiece for weddings or corporate events.",
    price: 7800,
    images: [
      "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=900&q=80",
      "https://images.unsplash.com/photo-1531592900765-82a0cc2d1028?w=900&q=80",
    ],
    category: "Flowers",
    tags: ["Calla Lilies", "Modern", "Sculptural"],
    features: [
      "10 premium calla lily stems",
      "Tall glass vase",
      "Color options: white, yellow, purple, pink",
      "Minimalist arrangement",
      "Perfect for modern decor",
    ],
    options: [
      {
        id: "color",
        name: "Color",
        choices: ["Pure White", "Sunshine Yellow", "Deep Purple", "Blush Pink"],
      },
      {
        id: "vase",
        name: "Vase Height",
        choices: ["12 inch", "16 inch", "20 inch"],
      },
    ],
  },

  // ── 15 ───────────────────────────────────────────────────────────────────
  {
    id: "dried-floral-bouquet",
    name: "Everlasting Dried Bouquet",
    shortDescription:
      "A timeless bouquet of dried flowers and preserved botanicals.",
    longDescription:
      "Enjoy the beauty of flowers that last for years. This artfully arranged dried bouquet features a mix of preserved roses, statice, bunny tails, and eucalyptus in muted earth tones. Perfect for those who want a low-maintenance, long-lasting floral accent that adds texture and warmth to any space.",
    price: 4200,
    images: [
      "https://images.unsplash.com/photo-1518721099412-ded6f48308a3?w=900&q=80",
      "https://images.unsplash.com/photo-1544033527-192b05d1473b?w=900&q=80",
    ],
    category: "Flowers",
    badge: "Trending",
    tags: ["Dried Flowers", "Long-Lasting", "Boho"],
    features: [
      "Mixed dried flowers and grasses",
      "Preserved botanicals",
      "Hand-tied with natural twine",
      "No maintenance required",
      "Lasts indefinitely",
    ],
    options: [
      {
        id: "palette",
        name: "Color Palette",
        choices: [
          "Warm Neutrals",
          "Blush & Cream",
          "Dusty Blues",
          "Terracotta & Rust",
        ],
      },
      {
        id: "size",
        name: "Size",
        choices: ["Small (12 stems)", "Medium (20 stems)", "Large (30 stems)"],
      },
    ],
  },

  // ── 16 ───────────────────────────────────────────────────────────────────
  {
    id: "tropical-lei",
    name: "Tropical Paradise Lei",
    shortDescription:
      "A vibrant Hawaiian-style lei made with fresh orchids and tropical flowers.",
    longDescription:
      "Bring the spirit of aloha to any celebration. This beautiful lei is hand-strung with fresh orchids, plumeria, and ti leaves, creating a fragrant and colorful garland. Perfect for graduations, weddings, or simply to make someone feel special.",
    price: 3900,
    images: [
      "https://images.unsplash.com/photo-1606293459302-1a8cce63e2f8?w=900&q=80",
      "https://images.unsplash.com/photo-1549476176-415fca8dbe6a?w=900&q=80",
    ],
    category: "Flowers",
    tags: ["Tropical", "Orchids", "Garland"],
    features: [
      "Fresh orchids and tropical flowers",
      "Hand-strung on cotton cord",
      "Fragrant and colorful",
      "Approx. 40 inches long",
      "Suitable for all occasions",
    ],
    options: [
      {
        id: "style",
        name: "Style",
        choices: ["Orchid Lei", "Plumeria Lei", "Mixed Tropical"],
      },
    ],
  },

  // ── 17 ───────────────────────────────────────────────────────────────────
  {
    id: "mini-rose-bonsai",
    name: "Mini Rose Bonsai",
    shortDescription:
      "A charming miniature rose plant in a ceramic bonsai pot.",
    longDescription:
      "Adorable and long-lasting, this miniature rose bonsai features a compact rose plant with delicate blooms, trained in a traditional bonsai style. Planted in a glazed ceramic pot, it's a unique gift that combines the beauty of roses with the art of bonsai. With proper care, it will bloom repeatedly.",
    price: 5500,
    images: [
      "https://images.unsplash.com/photo-1589561454226-796a8aa89b05?w=900&q=80",
      "https://images.unsplash.com/photo-1531072901881-d644216d4bf9?w=900&q=80",
    ],
    category: "Flowers",
    tags: ["Bonsai", "Roses", "Live Plant"],
    features: [
      "Miniature rose plant",
      "Trained in bonsai style",
      "Ceramic bonsai pot",
      "Blooms repeatedly",
      "Care instructions included",
    ],
    options: [
      {
        id: "color",
        name: "Bloom Color",
        choices: ["Red", "Pink", "Yellow", "White"],
      },
    ],
  },

  // ── 18 ───────────────────────────────────────────────────────────────────
  {
    id: "seasonal-subscription",
    name: "Seasonal Flower Subscription – 3 Months",
    shortDescription:
      "A 3-month subscription delivering fresh, seasonal bouquets to your door.",
    longDescription:
      "Give the gift of fresh flowers all season long. Our subscription delivers a hand-tied bouquet of the freshest seasonal blooms to your recipient's door every month for three months. Each arrangement is unique, featuring flowers at their peak from local growers.",
    price: 12900,
    originalPrice: 14700,
    images: [
      "https://images.unsplash.com/photo-1561181286-d3fee7d50764?w=900&q=80",
      "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=900&q=80",
    ],
    category: "Flowers",
    badge: "Bestseller",
    tags: ["Subscription", "Seasonal", "Gift"],
    features: [
      "3 monthly deliveries",
      "Hand-tied seasonal bouquets",
      "Locally sourced flowers",
      "Customizable delivery schedule",
      "Gift message with first delivery",
    ],
    options: [
      {
        id: "duration",
        name: "Subscription Length",
        choices: ["3 Months", "6 Months", "12 Months"],
      },
      {
        id: "size",
        name: "Bouquet Size",
        choices: ["Standard (10–12 stems)", "Deluxe (18–20 stems)"],
      },
    ],
  },

  // ── 19 ───────────────────────────────────────────────────────────────────
  {
    id: "protea-exotic",
    name: "Exotic Protea Arrangement",
    shortDescription:
      "Bold, architectural protea flowers with unique texture and form.",
    longDescription:
      "For those who appreciate the unusual, this arrangement showcases the dramatic beauty of protea. Featuring 3–5 large protea blooms (king, pink, or pin cushion) combined with banksia, leucadendron, and eucalyptus, it's a sculptural masterpiece that demands attention.",
    price: 8900,
    images: [
      "https://images.unsplash.com/photo-1561181286-d3fee7d50764?w=900&q=80",
      "https://images.unsplash.com/photo-1531592900765-82a0cc2d1028?w=900&q=80",
    ],
    category: "Flowers",
    tags: ["Protea", "Exotic", "Sculptural"],
    features: [
      "3–5 large protea blooms",
      "Mixed with banksia and eucalyptus",
      "Long-lasting (up to 2 weeks)",
      "Perfect for modern interiors",
      "Available in king, pink, or pin cushion varieties",
    ],
    options: [
      {
        id: "style",
        name: "Style",
        choices: ["King Protea Focus", "Pink Protea Mix", "Pin Cushion Protea"],
      },
    ],
  },

  // ── 20 ───────────────────────────────────────────────────────────────────
  {
    id: "freesia-fragrance",
    name: "Freesia Fragrance Bouquet",
    shortDescription:
      "A delicate bouquet of freesias, known for their sweet, citrusy scent.",
    longDescription:
      "Fill your home with the delightful fragrance of freesias. This elegant bouquet features 15–20 stems of freesia in a mix of pastel colors, arranged with delicate baby's breath. The sweet, citrusy scent and graceful blooms make it a favorite for spring celebrations.",
    price: 4100,
    images: [
      "https://images.unsplash.com/photo-1490750967868-88aa4476b946?w=900&q=80",
      "https://images.unsplash.com/photo-1589561454226-796a8aa89b05?w=900&q=80",
    ],
    category: "Flowers",
    tags: ["Freesia", "Fragrant", "Spring"],
    features: [
      "15–20 freesia stems",
      "Mixed pastel colors",
      "Sweet, citrusy fragrance",
      "Arranged with baby's breath",
      "Vase life: 7–10 days",
    ],
    options: [
      {
        id: "color_mix",
        name: "Color Palette",
        choices: ["Pastel Rainbow", "White & Yellow", "Pink & Purple"],
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
    shortDescription:
      "Premium true wireless earbuds with active noise cancellation and spatial audio.",
    longDescription:
      "Experience sound like never before with the Aura Pro. Featuring custom-tuned 11mm dynamic drivers, adaptive ANC that blocks out the world, and immersive spatial audio with head tracking. With up to 8 hours of battery life (32 with the case) and IPX4 sweat resistance, these earbuds are your perfect daily companion.",
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
        choices: [
          "Standard (Wireless)",
          "Premium (Wireless + Battery Display)",
        ],
      },
    ],
  },

  // ── 17 ───────────────────────────────────────────────────────────────────
  {
    id: "smart-watch-pro",
    name: "Vitality Smart Watch Pro",
    shortDescription:
      "Advanced health and fitness smartwatch with AMOLED display and 7-day battery.",
    longDescription:
      'Track every aspect of your wellbeing with the Vitality Smart Watch Pro. Features include continuous heart rate monitoring, blood oxygen (SpO2) measurement, sleep stage analysis, and over 100 sports modes. The brilliant 1.43" AMOLED display is always-on and readable under direct sunlight, while the robust titanium case ensures durability.',
    price: 27900,
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=900&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=900&q=80",
    ],
    category: "Electronics",
    badge: "Bestseller",
    tags: ["Fitness", "Health Tracking", "AMOLED"],
    features: [
      '1.43" AMOLED always-on display',
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
        choices: [
          "Starlight Aluminum",
          "Graphite Stainless Steel",
          "Gold Titanium",
        ],
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
    shortDescription:
      "Compact 300Wh portable power station with pure sine wave inverter and fast charging.",
    longDescription:
      "Stay powered anywhere with the Nomad 300. This compact power station packs a 300Wh LiFePO4 battery, pure sine wave AC output, and multiple USB-C PD ports capable of charging laptops, drones, and small appliances. With a 10-year lifespan and solar charging capability, it's your reliable off-grid companion.",
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
    shortDescription:
      "Ultra-responsive gaming keyboard with optical switches and customizable RGB.",
    longDescription:
      "Dominate the competition with the Strike Pro. Featuring magnetic Hall Effect switches with adjustable actuation points, this keyboard delivers lightning-fast input. The aluminum top plate, PBT double-shot keycaps, and programmable macros make it a favorite among esports enthusiasts. Complete with per-key RGB and a detachable USB-C cable.",
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
        choices: [
          "60% (Compact)",
          "65% (Arrow Keys)",
          "80% (TKL)",
          "100% (Full Size)",
        ],
      },
      {
        id: "switch",
        name: "Switch Type",
        choices: [
          "Magnetic Linear (Smooth)",
          "Magnetic Tactile (Bump)",
          "Magnetic Clicky (Audible)",
        ],
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
    name: 'ViewEdge 27" 4K Studio Monitor',
    shortDescription:
      "27-inch 4K UHD monitor with 99% sRGB, factory calibration, and USB-C hub.",
    longDescription:
      "Designed for creators and professionals, the ViewEdge 27 delivers stunning 4K resolution with exceptional color accuracy out of the box. The IPS panel covers 99% sRGB and 95% DCI-P3, while the USB-C port provides 90W power delivery and data to a single cable setup. Height-adjustable stand with VESA compatibility ensures ergonomic comfort.",
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
      '27" 4K UHD (3840 x 2160) IPS panel',
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
    shortDescription:
      "Classic double-breasted overcoat in a luxurious wool-cashmere blend.",
    longDescription:
      "Elevate your winter wardrobe with this timeless overcoat. Crafted from a premium blend of 80% merino wool and 20% cashmere, it offers exceptional warmth without bulk. The tailored silhouette, notch lapels, and horn-button details exude sophistication. Fully lined with breathable cupro for all-day comfort.",
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
        choices: [
          "36 (XS)",
          "38 (S)",
          "40 (M)",
          "42 (L)",
          "44 (XL)",
          "46 (2XL)",
        ],
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
    shortDescription:
      "Lightweight running shoes with responsive foam and breathable engineered mesh.",
    longDescription:
      "Engineered for runners seeking both speed and comfort, the Strider Elite features a nitrogen-infused midsole that provides superior energy return and shock absorption. The engineered mesh upper adapts to foot shape while maintaining breathability, and the carbon-infused outsole delivers traction on any surface.",
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
    shortDescription:
      "Complete ceramic pour-over set with gooseneck kettle and glass carafe.",
    longDescription:
      "Brew café-quality coffee at home with this elegant pour-over set. The ceramic dripper with spiral ribs ensures even extraction, while the 1L gooseneck kettle provides precise water flow control. Includes a heat-resistant glass carafe and 100 unbleached paper filters. A perfect gift for coffee enthusiasts.",
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
    shortDescription:
      "Classic Chelsea boots in full-grain leather with elastic side panels.",
    longDescription:
      "Effortlessly stylish and versatile, these Chelsea boots are crafted from premium full-grain leather. The elastic gussets allow for easy slip-on, while the Goodyear welted construction ensures durability and easy resoling. A leather-lined interior and cushioned insole provide all-day comfort.",
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
    shortDescription:
      "Premium 3-in-1 wireless charging stand for iPhone, Apple Watch, and AirPods.",
    longDescription:
      "Declutter your nightstand with this elegant 3-in-1 charging stand. Certified for MagSafe, it delivers fast 15W charging to iPhone, while the dedicated Apple Watch fast-charge module and AirPods pad ensure all your devices are powered simultaneously. Sleek aluminum body with a non-slip base.",
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
    shortDescription:
      "Portable nylon hammock with integrated bug net and tree-friendly straps.",
    longDescription:
      "Sleep under the stars with this lightweight camping hammock. Made from ripstop nylon, it packs down to the size of a grapefruit and weighs just 500g. The integrated mosquito net keeps bugs at bay, while the included tree straps (no knots required) protect bark and set up in minutes.",
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
      'Compression stuff sack (6" x 4")',
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
    shortDescription:
      "Wi-Fi enabled smart LED bulbs with tunable white and millions of colors.",
    longDescription:
      "Transform your home lighting with these smart LED bulbs. Control them via app or voice assistant to adjust brightness, color temperature (2200K–6500K), or choose from 16 million colors. Set schedules, routines, and scenes. Each bulb consumes just 9W and lasts up to 25,000 hours.",
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
    shortDescription:
      "Handcrafted leather-bound journal with deckle-edge paper and refillable design.",
    longDescription:
      "Capture your thoughts in style with this beautifully crafted journal. Made from full-grain vegetable-tanned leather that develops a rich patina over time, it contains 192 pages of acid-free, deckle-edge paper. The wrap-around strap keeps it secure, and the refillable design ensures a lifetime of use.",
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
        choices: ['A5 (5.8" x 8.3")', 'A6 (4.1" x 5.8")'],
      },
    ],
  },

  // ── 29 ───────────────────────────────────────────────────────────────────
  {
    id: "kitchen-knife-set",
    name: "Forge Pro Knife Set (5-Piece)",
    shortDescription:
      "High-carbon stainless steel kitchen knives with ergonomic handles and storage block.",
    longDescription:
      "Elevate your culinary experience with this professional knife set. Forged from high-carbon German steel, each blade offers exceptional edge retention and corrosion resistance. The full tang construction provides perfect balance, while the ergonomic Pakkawood handles ensure comfort. Includes a beautiful acacia wood storage block.",
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
      'Set includes: 8" chef\'s, 8" bread, 7" santoku, 3.5" paring, kitchen shears',
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
    shortDescription:
      "Non-slip natural rubber yoga mat with alignment lines and carrying strap.",
    longDescription:
      "Practice with confidence on this sustainable yoga mat. Made from natural tree rubber with a non-toxic, closed-cell surface that prevents sweat absorption and allows for easy cleaning. The 4mm thickness provides optimal cushioning for joints while maintaining stability. Alignment lines help with proper positioning.",
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
      '4mm thickness, 72" x 26" dimensions',
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
    shortDescription:
      "Ultra-lightweight wireless gaming mouse with 26K DPI sensor and 70-hour battery.",
    longDescription:
      "Engineered for competitive gamers, the Phantom X delivers pro-level performance with its PixArt 3395 sensor, achieving up to 26,000 DPI and 650 IPS tracking. The honeycomb shell reduces weight to just 59g, while the USB-C fast charging gives 70 hours of gameplay on a single charge.",
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
    shortDescription:
      "Hand-thrown stoneware vase with reactive glaze, perfect for dried or fresh flowers.",
    longDescription:
      "Add a touch of organic elegance to your home with this unique ceramic vase. Each piece is hand-thrown on a potter's wheel using high-fire stoneware clay, then finished with a reactive glaze that creates subtle variations in color and texture. The wide mouth accommodates bouquets, while the sturdy base ensures stability.",
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
      'Dimensions: approx. 6" H x 5" W',
      "Dishwasher safe",
      "Each piece is one-of-a-kind",
    ],
    options: [
      {
        id: "glaze",
        name: "Glaze Color",
        choices: [
          "Oatmeal Speckle",
          "Moss Green",
          "Cobalt Blue",
          "Rust Orange",
        ],
      },
      {
        id: "size",
        name: "Size",
        choices: ['Small (6")', 'Medium (8")', 'Large (10")'],
      },
    ],
  },

  // ── 33 ───────────────────────────────────────────────────────────────────
  {
    id: "active-noise-cancelling-headphones",
    name: "Silence Pro ANC Headphones",
    shortDescription:
      "Over-ear headphones with hybrid ANC, 50-hour battery, and plush memory foam earpads.",
    longDescription:
      "Escape into your world with the Silence Pro. Hybrid active noise cancellation reduces ambient noise by up to 40dB, while 40mm dynamic drivers deliver rich, balanced sound. The ultra-comfortable memory foam earpads are wrapped in soft protein leather, and the foldable design with hard-shell case makes travel effortless.",
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
    shortDescription:
      "Double-wall vacuum insulated bottle keeps drinks cold for 24 hours or hot for 12.",
    longDescription:
      "Stay hydrated in style with this eco-friendly water bottle. Constructed from 18/8 stainless steel, it's durable, BPA-free, and resistant to condensation. The wide mouth accommodates ice cubes, and the leak-proof lid ensures no spills. Perfect for gym, office, or outdoor adventures.",
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
    shortDescription:
      "Fully adjustable mesh office chair with lumbar support and breathable design.",
    longDescription:
      "Experience all-day comfort with this premium ergonomic chair. The breathable mesh back and seat promote airflow, while the adjustable lumbar support, seat depth, and armrests allow for a personalized fit. Designed for long hours at the desk, it meets ANSI/BIFMA standards for durability and safety.",
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
      'Seat depth adjustment (2" range)',
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
  // ── 36 ───────────────────────────────────────────────────────────────────
  {
    id: "organic-coffee-beans",
    name: "Single-Origin Organic Coffee Beans",
    shortDescription:
      "Freshly roasted, ethically sourced Arabica beans from Ethiopian highlands.",
    longDescription:
      "Start your morning right with these specialty-grade coffee beans. Sourced from small-scale farmers in the Yirgacheffe region, these beans are shade-grown, organic-certified, and roasted to a medium profile that highlights notes of jasmine, bergamot, and dark chocolate. Each bag is vacuum-sealed within 48 hours of roasting to preserve peak flavor.",
    price: 1350,
    images: [
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&q=80",
    ],
    category: "Groceries",
    badge: "New",
    tags: ["Organic", "Specialty", "Fair Trade"],
    features: [
      "100% Arabica, single-origin Ethiopia Yirgacheffe",
      "USDA Organic & Fair Trade certified",
      "Medium roast, whole bean",
      "Tasting notes: jasmine, bergamot, dark chocolate",
      "Roasted-to-order, vacuum-sealed",
      "12 oz (340g) bag",
    ],
    options: [
      {
        id: "grind",
        name: "Grind",
        choices: ["Whole Bean", "French Press", "Drip", "Espresso"],
      },
      {
        id: "size",
        name: "Size",
        choices: ["12 oz", "2 lb", "5 lb"],
      },
    ],
  },

  // ── 37 ───────────────────────────────────────────────────────────────────
  {
    id: "modular-sectional-sofa",
    name: "Modular Velvet Sectional Sofa",
    shortDescription:
      "Customizable L-shaped sofa with plush velvet upholstery and deep seats.",
    longDescription:
      "Transform your living space with this versatile modular sofa. The set includes 4 individual modules that can be arranged into an L-shape, chaise, or separate seating. Upholstered in stain-resistant velvet, the cushions are filled with high-density foam and feather toppers for sink-in comfort. Hidden storage compartments in the ottoman add practicality.",
    price: 89900,
    originalPrice: 109900,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80",
    ],
    category: "Furniture",
    badge: "Sale",
    tags: ["Modular", "Velvet", "Storage"],
    features: [
      "4 modular pieces (corner, armless, ottoman, chaise)",
      "Stain-resistant velvet upholstery",
      "High-density foam + feather blend cushions",
      "Hidden storage in ottoman module",
      "Solid hardwood frame, non-marking feet",
      "Seat depth: 22 inches",
    ],
    options: [
      {
        id: "color",
        name: "Color",
        choices: ["Emerald Green", "Navy Blue", "Charcoal Grey", "Blush Pink"],
      },
      {
        id: "config",
        name: "Configuration",
        choices: [
          "Left-facing L-shape",
          "Right-facing L-shape",
          "Chaise Only",
          "Full Set (4 modules)",
        ],
      },
    ],
  },

  // ── 38 ───────────────────────────────────────────────────────────────────
  {
    id: "smart-air-purifier",
    name: "BreatheSmart Air Purifier",
    shortDescription:
      "HEPA 13 air purifier with smart sensors, Wi-Fi, and coverage up to 500 sq ft.",
    longDescription:
      "Breathe cleaner air with this intelligent air purifier. The true HEPA 13 filter captures 99.97% of airborne particles down to 0.3 microns, including allergens, dust, and pet dander. Built-in air quality sensors automatically adjust fan speed, and the companion app provides real-time PM2.5 readings. Whisper-quiet operation makes it perfect for bedrooms.",
    price: 28900,
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=900&q=80",
      "https://images.unsplash.com/photo-1585779034823-7a9ac8fa6b4d?w=900&q=80",
    ],
    category: "Electronics",
    tags: ["HEPA", "Smart Home", "Allergy"],
    features: [
      "True HEPA 13 filter (99.97% efficiency)",
      "Activated carbon pre-filter for odors",
      "Smart sensor auto-mode",
      "Wi-Fi + app control, works with Alexa/Google",
      "Coverage: 500 sq ft (4.8 ACH)",
      "CADR: 200 CFM, noise: 22–50 dB",
    ],
    options: [
      {
        id: "color",
        name: "Color",
        choices: ["White", "Black"],
      },
      {
        id: "filter",
        name: "Filter Bundle",
        choices: ["Unit Only", "+ 1 Extra Filter", "+ 2 Extra Filters"],
      },
    ],
  },

  // ── 39 ───────────────────────────────────────────────────────────────────
  {
    id: "handwoven-wool-rug",
    name: "Handwoven Wool Area Rug",
    shortDescription:
      "100% wool rug with traditional geometric patterns, hand-tufted by artisans.",
    longDescription:
      "Add warmth and texture to any room with this artisan-crafted wool rug. Hand-tufted using 100% New Zealand wool, it features a timeless geometric design in muted earth tones. The thick pile provides cushioning underfoot, and the cotton canvas backing prevents slipping. Sustainably produced without synthetic dyes.",
    price: 24900,
    originalPrice: 32900,
    images: [
      "https://images.unsplash.com/photo-1575417375460-2399d3c8a2f0?w=900&q=80",
      "https://images.unsplash.com/photo-1600166898405-df6c2a2f3c4f?w=900&q=80",
    ],
    category: "Home & Living",
    badge: "Bestseller",
    tags: ["Wool", "Handmade", "Eco-Friendly"],
    features: [
      "100% New Zealand wool pile",
      'Hand-tufted, 0.5" pile height',
      "Traditional geometric patterns",
      "Cotton canvas backing (rug pad recommended)",
      "Stain-resistant and naturally flame-retardant",
      "Fair Trade certified production",
    ],
    options: [
      {
        id: "size",
        name: "Size",
        choices: ["5' x 7'", "6' x 9'", "8' x 10'", "9' x 12'"],
      },
      {
        id: "pattern",
        name: "Pattern",
        choices: ["Heritage Medallion", "Diamond Trellis", "Abstract Wave"],
      },
    ],
  },

  // ── 40 ───────────────────────────────────────────────────────────────────
  {
    id: "reusable-produce-bags",
    name: "Organic Cotton Produce Bags (Set of 6)",
    shortDescription:
      "Zero-waste mesh bags for fruits, vegetables, and bulk items. Machine washable.",
    longDescription:
      "Ditch single-use plastic with these durable produce bags. Made from 100% GOTS-certified organic cotton mesh, they are lightweight, breathable, and tare-weight labeled for easy checkout. Each set includes 6 bags in assorted sizes, perfect for groceries, bulk bin items, and even as travel laundry bags.",
    price: 1800,
    images: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80",
      "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=900&q=80",
    ],
    category: "Groceries",
    tags: ["Zero Waste", "Organic", "Eco-Friendly"],
    features: [
      "100% GOTS-certified organic cotton mesh",
      "Set of 6: 2 small, 2 medium, 2 large",
      "Tare weight printed on each bag",
      "Drawstring closure, machine washable",
      "Breathable design keeps produce fresh",
      "Reusable alternative to plastic bags",
    ],
    options: [
      {
        id: "color",
        name: "Bag Color",
        choices: ["Natural Cotton", "Charcoal", "Sage"],
      },
    ],
  },

  // ── 41 ───────────────────────────────────────────────────────────────────
  {
    id: "mid-century-desk",
    name: "Walnut Mid-Century Modern Desk",
    shortDescription:
      "Solid walnut desk with tapered legs, hidden drawer, and cable management.",
    longDescription:
      "A timeless piece for any home office. Crafted from solid American walnut with a matte lacquer finish, this desk features a spacious work surface, a single dovetailed drawer with soft-close slides, and a built-in cable management tray. The tapered legs give it a classic mid-century silhouette that pairs beautifully with both modern and traditional decor.",
    price: 58900,
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=900&q=80",
      "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=900&q=80",
    ],
    category: "Furniture",
    badge: "New",
    tags: ["Walnut", "Mid-Century", "Home Office"],
    features: [
      "Solid American walnut construction",
      "Matte lacquer finish, hand-rubbed",
      'Dimensions: 55"W x 27"D x 30"H',
      "Single dovetail drawer with soft-close",
      "Integrated cable management grommet",
      "Tapered solid wood legs",
    ],
    options: [
      {
        id: "finish",
        name: "Finish",
        choices: ["Natural Walnut", "Dark Walnut", "Espresso"],
      },
      {
        id: "drawer",
        name: "Drawer Configuration",
        choices: ["Single Drawer", "Two Drawers (+$120)"],
      },
    ],
  },

  // ── 42 ───────────────────────────────────────────────────────────────────
  {
    id: "greek-olive-oil",
    name: "Extra Virgin Olive Oil – Cold Pressed",
    shortDescription:
      "Single-estate Greek olive oil, cold-extracted, high polyphenol content.",
    longDescription:
      "Experience the true taste of Kalamata olives with this award-winning extra virgin olive oil. Harvested and cold-pressed within hours of picking, it retains high levels of antioxidants and a robust, peppery finish. Perfect for finishing dishes, dipping bread, or as a base for vinaigrettes.",
    price: 2200,
    originalPrice: 2800,
    images: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=900&q=80",
      "https://images.unsplash.com/photo-1534237886190-ced2a7ec0c90?w=900&q=80",
    ],
    category: "Groceries",
    badge: "Sale",
    tags: ["Organic", "Artisanal", "High Phenolic"],
    features: [
      "Single-estate, Koroneiki olives",
      "Cold-extracted within 4 hours of harvest",
      "High polyphenol content (>400 mg/kg)",
      "Acidity <0.4%, unfiltered",
      "Dark glass bottle protects from light",
      "500 ml (16.9 oz)",
    ],
    options: [
      {
        id: "size",
        name: "Size",
        choices: ["500 ml", "1 L", "2 L"],
      },
    ],
  },

  // ── 43 ───────────────────────────────────────────────────────────────────
  {
    id: "foldable-treadmill",
    name: "UltraFold Walking Treadmill",
    shortDescription:
      "Compact under-desk treadmill with 7.5 mph max speed and remote control.",
    longDescription:
      "Stay active while working or watching TV with this space-saving treadmill. The hydraulic folding system allows it to stand vertically, taking up just 2 sq ft of floor space. A 2.5 HP quiet motor supports speeds from 0.5–7.5 mph, and the shock-absorbing deck reduces joint impact. Includes remote control and LED display.",
    price: 34900,
    originalPrice: 42900,
    images: [
      "https://images.unsplash.com/photo-1570829460005-c840387bb1ca?w=900&q=80",
      "https://images.unsplash.com/photo-1590496793929-36417d3117de?w=900&q=80",
    ],
    category: "Fitness",
    badge: "Trending",
    tags: ["Under Desk", "Folding", "Walking"],
    features: [
      'Folding design: 56" L x 22" W x 5" H (folded)',
      "2.5 HP continuous-duty motor",
      "Speed range: 0.5–7.5 mph",
      "Shock-absorbing running deck",
      "Remote control + LED display",
      "Weight capacity: 265 lbs",
    ],
    options: [
      {
        id: "color",
        name: "Frame Color",
        choices: ["Black", "White"],
      },
      {
        id: "handrail",
        name: "Handrail",
        choices: ["No Handrail (Compact)", "Folding Handrail (+$80)"],
      },
    ],
  },

  // ── 44 ───────────────────────────────────────────────────────────────────
  {
    id: "artisan-sourdough-starter",
    name: "San Francisco Sourdough Starter Kit",
    shortDescription:
      "Everything you need to bake artisan sourdough: dehydrated starter, banneton, and lame.",
    longDescription:
      "Begin your sourdough journey with this complete kit. Includes a dehydrated 100-year-old San Francisco sourdough culture, a proofing basket (banneton), scoring lame, bench scraper, and detailed recipe guide. The starter comes alive in just 3 days, producing bakery-quality loaves with a tangy flavor and crisp crust.",
    price: 4200,
    images: [
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=900&q=80",
      "https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=900&q=80",
    ],
    category: "Groceries",
    tags: ["Baking", "Artisan", "Kit"],
    features: [
      "Dehydrated sourdough starter (100+ year culture)",
      "9-inch round banneton proofing basket",
      "Stainless steel scoring lame (5 blades)",
      "Stainless steel bench scraper",
      "Cloth liner for banneton",
      "Printable recipe guide with video tutorials",
    ],
    options: [
      {
        id: "kit",
        name: "Kit Type",
        choices: ["Standard Kit", "Premium Kit (+ Dutch Oven & Digital Scale)"],
      },
    ],
  },

  // ── 45 ───────────────────────────────────────────────────────────────────
  {
    id: "leather-recliner-chair",
    name: "Leather Power Recliner Chair",
    shortDescription:
      "Single-motor power recliner with USB charging and heat massage.",
    longDescription:
      "Relax in ultimate comfort with this power recliner. The high-quality top-grain leather upholstery is soft and durable, while the infinite-position power recline allows you to stop at any angle. Built-in USB ports keep devices charged, and the lumbar heat and vibration massage soothe tired muscles.",
    price: 52900,
    images: [
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=900&q=80",
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=900&q=80",
    ],
    category: "Furniture",
    tags: ["Leather", "Power Recline", "Massage"],
    features: [
      "Top-grain leather seating surfaces",
      "Infinite-position power recline",
      "Dual USB charging ports",
      "Lumbar heat and vibration massage (5 settings)",
      "Wall-hugger design (saves space)",
      "Weight capacity: 300 lbs",
    ],
    options: [
      {
        id: "color",
        name: "Color",
        choices: ["Cognac Brown", "Black", "Dark Grey"],
      },
      {
        id: "size",
        name: "Size",
        choices: ['Standard (35"W)', 'Oversized (41"W)'],
      },
    ],
  },

  // ── 46 ───────────────────────────────────────────────────────────────────
  {
    id: "wireless-doorbell-camera",
    name: "Smart Video Doorbell",
    shortDescription:
      "Wireless 2K doorbell camera with facial recognition and two-way audio.",
    longDescription:
      "Keep your home secure with this advanced video doorbell. The 2K HDR camera captures crisp details day or night, while AI-powered facial recognition can alert you when familiar or unknown faces appear. Two-way audio lets you speak to visitors remotely, and the wireless design means easy installation with the included rechargeable battery.",
    price: 15900,
    originalPrice: 19900,
    images: [
      "https://images.unsplash.com/photo-1558002038-1055e2e28d9b?w=900&q=80",
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=900&q=80",
    ],
    category: "Electronics",
    badge: "New",
    tags: ["Smart Home", "Security", "Wireless"],
    features: [
      "2K HDR video with night vision",
      "AI facial recognition & smart alerts",
      "Two-way audio with noise cancellation",
      "Rechargeable battery (up to 6 months per charge)",
      "IP65 weather resistance",
      "Works with Alexa, Google Assistant",
    ],
    options: [
      {
        id: "power",
        name: "Power Source",
        choices: [
          "Battery Only",
          "Hardwired (Existing Doorbell Wires)",
          "Battery + Solar Panel",
        ],
      },
      {
        id: "color",
        name: "Color",
        choices: ["Matte Black", "Silver"],
      },
    ],
  },

  // ── 47 ───────────────────────────────────────────────────────────────────
  {
    id: "bamboo-cutting-board",
    name: "End-Grain Bamboo Cutting Board",
    shortDescription:
      "Large, reversible cutting board with juice groove and built-in knife sharpener.",
    longDescription:
      "A chef's essential, this end-grain bamboo board is gentle on knife edges and highly durable. The reversible design features a deep juice groove on one side for meats and a flat surface on the other for vegetables. An integrated ceramic knife sharpener and non-slip feet add functionality. Made from sustainable Moso bamboo.",
    price: 5400,
    images: [
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=900&q=80",
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=900&q=80",
    ],
    category: "Home & Living",
    tags: ["Bamboo", "Eco-Friendly", "Kitchen"],
    features: [
      "End-grain construction (knife-friendly)",
      "Reversible: juice groove + flat side",
      "Integrated ceramic knife sharpener",
      "Non-slip silicone feet",
      'Dimensions: 18" x 12" x 1.5"',
      "Sustainable Moso bamboo, food-safe finish",
    ],
    options: [
      {
        id: "size",
        name: "Size",
        choices: [
          'Small (12" x 9")',
          'Large (18" x 12")',
          'Extra Large (20" x 15")',
        ],
      },
      {
        id: "finish",
        name: "Finish",
        choices: ["Natural Bamboo", "Charcoal Bamboo"],
      },
    ],
  },

  // ── 48 ───────────────────────────────────────────────────────────────────
  {
    id: "weighted-blanket",
    name: "Cooling Weighted Blanket",
    shortDescription:
      "10 lb bamboo viscose weighted blanket with glass beads, breathable and machine washable.",
    longDescription:
      "Experience deeper sleep with this therapeutic weighted blanket. The 10 lb weight is ideal for individuals (approx. 10% of body weight) and evenly distributed using non-toxic glass beads sewn into 7-layer quilted pockets. The bamboo viscose cover is naturally cooling, moisture-wicking, and machine washable for easy care.",
    price: 8900,
    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&q=80",
    ],
    category: "Home & Living",
    tags: ["Sleep", "Therapeutic", "Cooling"],
    features: [
      '10 lbs weight, 48" x 72" dimensions',
      "Non-toxic glass bead fill (lead-free)",
      "7-layer quilted design for even distribution",
      "Breathable bamboo viscose cover",
      "Machine washable (cover and insert)",
      "Hypoallergenic and OEKO-TEX certified",
    ],
    options: [
      {
        id: "weight",
        name: "Weight",
        choices: [
          "10 lbs (Twin)",
          "15 lbs (Full/Queen)",
          "20 lbs (Queen/King)",
        ],
      },
      {
        id: "color",
        name: "Cover Color",
        choices: ["Light Grey", "Navy", "Blush", "White"],
      },
    ],
  },

  // ── 49 ───────────────────────────────────────────────────────────────────
  {
    id: "electric-guitar",
    name: "Vintage Style Electric Guitar",
    shortDescription:
      "Solid-body electric guitar with alder body, maple neck, and dual humbuckers.",
    longDescription:
      "Capture classic rock tones with this well-crafted electric guitar. The alder body offers balanced resonance, while the bolt-on maple neck with rosewood fingerboard provides smooth playability. Two vintage-voiced humbuckers deliver warm, articulate sound suitable for blues, rock, and beyond. Includes a padded gig bag.",
    price: 34900,
    originalPrice: 42900,
    images: [
      "https://images.unsplash.com/photo-1542728926-5229d2c3b981?w=900&q=80",
      "https://images.unsplash.com/photo-1509564899744-209f5d44c9c7?w=900&q=80",
    ],
    category: "Electronics",
    badge: "Sale",
    tags: ["Music", "Guitar", "Vintage"],
    features: [
      "Alder body, gloss finish",
      "Bolt-on maple neck, rosewood fingerboard",
      "Two vintage-style humbucker pickups",
      "Tune-o-matic bridge with stopbar tailpiece",
      "Die-cast tuning machines",
      "Includes gig bag and truss rod tool",
    ],
    options: [
      {
        id: "color",
        name: "Color",
        choices: ["Sunburst", "Black", "Cherry Red", "Olympic White"],
      },
      {
        id: "case",
        name: "Case",
        choices: ["Gig Bag (Included)", "Hard Shell Case (+$120)"],
      },
    ],
  },

  // ── 50 ───────────────────────────────────────────────────────────────────
  {
    id: "ceramic-plant-pot",
    name: "Self-Watering Ceramic Plant Pot",
    shortDescription:
      "Glazed ceramic pot with hidden reservoir for low-maintenance plant care.",
    longDescription:
      "Keep your plants thriving with this elegant self-watering planter. The glazed ceramic exterior resists moisture, while an internal reservoir holds up to 1 liter of water. A cotton wick system delivers water gradually, preventing over or under-watering. Perfect for busy plant parents or as a thoughtful gift.",
    price: 3200,
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=900&q=80",
      "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=900&q=80",
    ],
    category: "Home & Living",
    tags: ["Plants", "Self-Watering", "Ceramic"],
    features: [
      "Glazed ceramic exterior, frost-proof",
      "Hidden water reservoir (1L capacity)",
      "Cotton wick self-watering system",
      "Removable inner pot for easy refill",
      "Saucer included for overflow protection",
      "Available in multiple colors and sizes",
    ],
    options: [
      {
        id: "size",
        name: "Pot Diameter",
        choices: ['4" (Small)', '6" (Medium)', '8" (Large)'],
      },
      {
        id: "color",
        name: "Color",
        choices: ["White", "Terracotta", "Sage Green", "Navy"],
      },
    ],
  },
];

// ─── Image Format Utility For External Sources ────────────────────────────────
function formatImageUrl(url: string): string {
  if (!url) return url;

  // 1. Cloudinary Console Dashboard URLs
  if (url.includes("res-console.cloudinary.com")) {
    const match = url.match(
      /res-console\.cloudinary\.com\/([^/]+)\/thumbnails\/transform\/[^/]+\/image\/upload\/([^/]+)\/v1\/([^/]+)/,
    );
    if (match) {
      try {
        const cloudName = match[1];

        // Base64URL replacing
        const b64Transform = match[2].replace(/-/g, "+").replace(/_/g, "/");
        const b64PublicId = match[3].replace(/-/g, "+").replace(/_/g, "/");

        const transformations =
          typeof atob === "function"
            ? atob(b64Transform)
            : Buffer.from(b64Transform, "base64").toString();

        const publicId =
          typeof atob === "function"
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
    const fileIdMatch =
      url.match(/\/file\/d\/([^/]+)/) || url.match(/id=([^&]+)/);
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
