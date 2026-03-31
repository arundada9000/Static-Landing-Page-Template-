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

export default function Home() {
  return (
    <>
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
