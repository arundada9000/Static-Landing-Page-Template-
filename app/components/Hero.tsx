import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { heroContent } from "@/config/content";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroContent.heroImage}
          alt={heroContent.heroImageAlt}
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(55, 48, 163, 0.72)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/25 via-transparent to-stone-900/55" />
      </div>

      {/* Decorative glow blobs */}
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none z-10"
        style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 22%, transparent)" }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none z-10"
        style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)" }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Badge */}
        <div className="inline-flex md:mt-7 items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-sm font-semibold mb-8 uppercase tracking-widest">
          <span
            className="w-2 h-2 rounded-full inline-block animate-pulse"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
          {heroContent.badge}
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight leading-[1.05]">
          {heroContent.headlineStart}{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-accent-light), var(--color-accent))",
            }}
          >
            {heroContent.headlineHighlight}
          </span>
          <br />
          {heroContent.headlineEnd}
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          {heroContent.subheadline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={heroContent.primaryCTA.href}
            className="group flex items-center gap-2 text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-300 shadow-xl active:scale-95 w-full sm:w-auto justify-center"
            style={{ background: "var(--color-primary)" }}
          >
            {heroContent.primaryCTA.label}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href={heroContent.secondaryCTA.href}
            className="flex items-center gap-2 bg-white/15 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-base hover:bg-white/25 transition-all duration-300 active:scale-95 w-full sm:w-auto justify-center"
          >
            <MessageCircle className="w-4 h-4" />
            {heroContent.secondaryCTA.label}
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="mt-20 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
