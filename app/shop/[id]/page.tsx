import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductClient from "./ProductClient";
import { getProductById, allProducts, CURRENCY } from "../../data/allProducts";
import { siteConfig } from "@/config/site";

export async function generateStaticParams() {
  return allProducts.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | ${siteConfig.name}`,
    description: product.shortDescription,
    alternates: {
      canonical: `${siteConfig.url}/shop/${product.id}`,
    },
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.shortDescription,
      url: `${siteConfig.url}/shop/${product.id}`,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: [product.images[0]],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  const currencyCode = CURRENCY.trim() || "USD";

  // Generate JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.longDescription,
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/shop/${product.id}`,
      priceCurrency: currencyCode,
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navbar />
      <ProductClient product={product} />
      <Footer />
    </div>
  );
}
