export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  /** Generic variant string — could be size, color options, editions, weight, etc. */
  variant: string;
  imagePath: string;
  isBest?: boolean;
}

export const products: Product[] = [
  {
    id: "essential",
    name: "VELA Essentials",
    shortDescription:
      "The perfect entry point to the VELA experience. Clean, premium design with everyday performance built in.",
    variant: "Available in 3 Sizes",
    imagePath:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  },
  {
    id: "signature",
    name: "VELA Signature",
    shortDescription:
      "Our most-loved model. Elevated aesthetics, superior materials, and an experience that sets a new bar.",
    variant: "3 Colorways Available",
    imagePath:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",
    isBest: true,
  },
  {
    id: "elite",
    name: "VELA Elite",
    shortDescription:
      "The pinnacle of the VELA line. Exclusive finishes and ultra-premium materials for those who accept nothing less.",
    variant: "Limited Edition",
    imagePath:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  },
];
