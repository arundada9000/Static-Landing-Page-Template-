import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Sparkles, Eye, Target, Zap, HandHeart } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { aboutContent } from "@/config/content";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name}`,
  description: `Learn the story behind ${siteConfig.name}. ${siteConfig.description}`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-surface-alt)" }}>
      <Navbar />

      <main className="flex-1">

        {/* Hero Banner */}
        <section
          className="relative py-24 md:py-36 overflow-hidden text-center text-white min-h-screen flex items-center justify-center"
          style={{ backgroundColor: "var(--color-primary-dark)" }}
        >
          {/* Glow radial */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--color-primary) 50%, transparent) 0%, transparent 70%)",
            }}
          />

          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 px-4 py-1.5 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm"
              style={{ color: "var(--color-accent)" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Our Story &amp; Heritage
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              About{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--color-accent-light), var(--color-accent))",
                }}
              >
                {siteConfig.name}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
              {siteConfig.description}
            </p>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Image */}
              <div className="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image
                  src={aboutContent.aboutImage}
                  alt={aboutContent.aboutImageAlt}
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ background: "var(--color-primary)" }}
                />
              </div>

              {/* Content */}
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 leading-tight">
                  {aboutContent.headlineStart} <br />
                  <span style={{ color: "var(--color-primary)" }}>
                    {aboutContent.headlineHighlight}
                  </span>
                </h2>
                <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                  <p>{aboutContent.body1}</p>
                  <p>{aboutContent.body2}</p>
                </div>

                {/* Badges */}
                <div className="flex gap-4 pt-4 flex-wrap">
                  <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-stone-100">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)" }}
                    >
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="block text-sm font-extrabold text-stone-900">{aboutContent.feature1Title}</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-stone-100">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--color-accent-light) 35%, transparent)",
                        color: "var(--color-accent)",
                      }}
                    >
                      <HandHeart className="w-5 h-5" />
                    </div>
                    <span className="block text-sm font-extrabold text-stone-900">Community First</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section
          className="py-24 md:py-32 border-t"
          style={{
            backgroundColor: "var(--color-primary-50)",
            borderColor: "var(--color-primary-100)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full border"
                style={{
                  color: "var(--color-primary)",
                  backgroundColor: "white",
                  borderColor: "var(--color-primary-100)",
                }}
              >
                What Drives Us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mt-4">
                Vision &amp; Mission
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

              {/* Vision Card */}
              <div
                className="bg-white rounded-[2rem] p-10 md:p-14 shadow-lg border border-white relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                style={{ boxShadow: "0 8px 32px color-mix(in srgb, var(--color-primary) 8%, transparent)" }}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Eye
                    className="w-48 h-48 -rotate-12 translate-x-10 -translate-y-10"
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>
                <div className="relative z-10 space-y-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner"
                    style={{ backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)" }}
                  >
                    <Eye className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-stone-900">Our Vision</h3>
                  <p className="text-xl text-stone-600 leading-relaxed font-medium">
                    To become a{" "}
                    <strong style={{ color: "var(--color-primary)" }}>
                      globally recognized premium brand
                    </strong>{" "}
                    — bringing extraordinary quality into the hands of discerning customers everywhere.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div
                className="bg-white rounded-[2rem] p-10 md:p-14 shadow-lg border border-white relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                style={{ boxShadow: "0 8px 32px color-mix(in srgb, var(--color-primary) 8%, transparent)" }}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Target
                    className="w-48 h-48 rotate-12 translate-x-10 -translate-y-10"
                    style={{ color: "var(--color-primary)" }}
                  />
                </div>
                <div className="relative z-10 space-y-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner"
                    style={{ backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)" }}
                  >
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-stone-900">Our Mission</h3>
                  <p className="text-xl text-stone-600 leading-relaxed font-medium">
                    To deliver{" "}
                    <strong style={{ color: "var(--color-primary)" }}>
                      best-in-class products
                    </strong>{" "}
                    with unwavering authenticity, transparency, and trust for every customer we serve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SajiloDigital Agency Credit Section */}
        <section className="py-16 bg-white border-t border-stone-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm text-stone-400 mb-3 tracking-wide">This website was designed &amp; developed by</p>
            <a
              href={siteConfig.agency.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 group"
            >
              <div
                className="px-6 py-3 rounded-2xl font-extrabold text-white text-lg tracking-tight shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                }}
              >
                Sajilo<span style={{ color: "var(--color-accent)" }}>Digital</span>
              </div>
            </a>
            <p className="text-xs text-stone-400 mt-3">
              Premium web solutions for businesses in Nepal and beyond —{" "}
              <a
                href={siteConfig.agency.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-stone-600 transition-colors"
              >
                {siteConfig.agency.url}
              </a>
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
