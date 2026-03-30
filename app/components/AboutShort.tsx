"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { aboutContent } from "@/config/content";

export default function AboutShort() {
  return (
    <section className="py-24 bg-white overflow-hidden relative" id="about">
      {/* Decorative background blobs */}
      <div
        className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{ backgroundColor: "var(--color-primary-50)" }}
      />
      <div
        className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-light) 30%, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl z-10">
              <Image
                src={aboutContent.aboutImage}
                alt={aboutContent.aboutImageAlt}
                fill
                className="object-cover"
              />
            </div>
            {/* Circular badge */}
            <div
              className="absolute -bottom-8 -right-8 text-white p-8 rounded-full hidden sm:flex flex-col items-center justify-center shadow-xl w-36 h-36 z-20 border-8 border-white hover:scale-105 transition-transform duration-300"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))" }}
            >
              <span className="text-3xl font-extrabold pb-1">{aboutContent.badgeValue}</span>
              <span className="text-xs font-bold tracking-widest uppercase opacity-80">
                {aboutContent.badgeLabel}
              </span>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <span
                className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full border"
                style={{
                  color: "var(--color-primary)",
                  backgroundColor: "var(--color-primary-50)",
                  borderColor: "var(--color-primary-100)",
                }}
              >
                {aboutContent.badge}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
                {aboutContent.headlineStart}
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--color-primary), var(--color-primary-dark))",
                  }}
                >
                  {aboutContent.headlineHighlight}
                </span>
              </h2>
            </div>

            <p className="text-lg text-stone-600 leading-relaxed font-medium">
              {aboutContent.body1}
            </p>
            <p className="text-stone-500 leading-relaxed">{aboutContent.body2}</p>

            {/* Feature mini-cards */}
            <div className="grid grid-cols-2 gap-6 pt-4 pb-2">
              <div className="flex flex-col gap-2">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2"
                  style={{ backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)" }}
                >
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-stone-900">{aboutContent.feature1Title}</h4>
                <p className="text-sm text-stone-500">{aboutContent.feature1Desc}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2"
                  style={{ backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)" }}
                >
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-stone-900">{aboutContent.feature2Title}</h4>
                <p className="text-sm text-stone-500">{aboutContent.feature2Desc}</p>
              </div>
            </div>

            {/* CTA link */}
            <div className="pt-2">
              <Link
                href={aboutContent.cta.href}
                className="inline-flex items-center gap-2 text-base font-bold transition-colors group"
                style={{ color: "var(--color-primary)" }}
              >
                {aboutContent.cta.label}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "var(--color-primary-50)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.backgroundColor =
                      "var(--color-primary-100)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.backgroundColor =
                      "var(--color-primary-50)")
                  }
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
