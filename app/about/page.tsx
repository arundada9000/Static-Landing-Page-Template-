import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Leaf, Eye, Target, Mountain, HandHeart } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Nepal Bamboo Salt",
  description:
    "Nepal Bamboo Salt Pvt. Ltd. produces premium bamboo salt using eco-friendly, traditional Korean methods combined with pure Himalayan resources.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-[#1b4a30] text-center text-white">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(41,107,70,0.5) 0%, transparent 70%)",
            }}
          />

          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#d4a853] uppercase mb-6 px-4 py-1.5 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
              <Leaf className="w-3.5 h-3.5" />
              Our Story & Heritage
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f0d49a] to-[#d4a853]">
                Nepal Bamboo Salt
              </span>{" "}
              Pvt. Ltd.
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
              We are a Nepal-based company dedicated to producing premium bamboo
              salt using eco-friendly and traditional techniques.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image
                  src="/images/og-image.png"
                  alt="Ancient salt making techniques"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#296B46]/10 flex items-center justify-center -z-10">
                  <Mountain className="w-32 h-32 text-[#296B46]/20" />
                </div>
              </div>
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 leading-tight">
                  Ancient Korean Methods, <br />
                  <span className="text-[#296B46]">Himalayan Resources.</span>
                </h2>
                <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                  <p>
                    Inspired by ancient Korean salt-making methods, we proudly
                    combine the pristine nature of Himalayan resources with
                    modern quality standards to create a therapeutic product
                    like no other.
                  </p>
                  <p>
                    Our mission is not just about producing salt; it&apos;s
                    about promoting holistic natural health products while
                    deeply supporting local communities and adhering strictly to
                    sustainable practices. Each grain represents uncompromised
                    purity.
                  </p>
                </div>
                <div className="flex gap-4 pt-4">
                  <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-stone-100">
                    <div className="w-10 h-10 rounded-full bg-[#edf7f1] flex items-center justify-center text-[#296B46]">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-sm font-extrabold text-stone-900">
                        Eco-Friendly
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-stone-100">
                    <div className="w-10 h-10 rounded-full bg-[#f0d49a]/30 flex items-center justify-center text-[#d4a853]">
                      <HandHeart className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-sm font-extrabold text-stone-900">
                        Community
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Grid */}
        <section className="bg-[#edf7f1] py-24 md:py-32 border-t border-[#c6ecd7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Vision Card */}
              <div className="bg-white rounded-[2rem] p-10 md:p-14 shadow-lg shadow-[#296B46]/5 border border-white relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Eye className="w-48 h-48 text-[#296B46] -rotate-12 translate-x-10 -translate-y-10" />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#edf7f1] flex items-center justify-center text-[#296B46] shadow-inner">
                    <Eye className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-stone-900">
                    Our Vision
                  </h3>
                  <p className="text-xl text-stone-600 leading-relaxed font-medium">
                    To become a{" "}
                    <strong className="text-[#296B46]">
                      leading bamboo salt brand
                    </strong>{" "}
                    in Nepal and expand our purity to international markets,
                    setting the global standard for natural wellness.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="bg-white rounded-[2rem] p-10 md:p-14 shadow-lg shadow-[#296B46]/5 border border-white relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Target className="w-48 h-48 text-[#296B46] rotate-12 translate-x-10 -translate-y-10" />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#edf7f1] flex items-center justify-center text-[#296B46] shadow-inner">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-stone-900">
                    Our Mission
                  </h3>
                  <p className="text-xl text-stone-600 leading-relaxed font-medium">
                    To deliver{" "}
                    <strong className="text-[#296B46]">
                      high-quality, health-focused
                    </strong>{" "}
                    salt products with unwavering authenticity, transparency,
                    and trust for every household.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
