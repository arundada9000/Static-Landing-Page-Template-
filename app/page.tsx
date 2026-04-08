import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutShort from "./components/AboutShort";
import Trust from "./components/Trust";
import Products from "./components/Products";
import Benefits from "./components/Benefits";
import Process from "./components/Process";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

import { faqItems } from "@/config/content";

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        <Hero />
        <AboutShort />
        <Trust />
        <Products />
        <Benefits />
        <Process />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
