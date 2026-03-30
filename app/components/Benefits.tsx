"use client";

import Image from "next/image";
import { benefits, benefitsContent } from "@/config/content";

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "var(--color-primary-50)" }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-60"
        style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-light) 35%, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Image column */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[500px] lg:h-[620px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={benefitsContent.benefitsImage}
                alt={benefitsContent.benefitsImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top right, color-mix(in srgb, var(--color-primary-dark) 45%, transparent), transparent)",
                }}
              />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-white rounded-2xl shadow-xl p-5 border border-stone-100 max-w-[190px]">
              <div
                className="text-4xl font-extrabold leading-none"
                style={{ color: "var(--color-primary)" }}
              >
                {benefitsContent.statValue}
              </div>
              <div className="text-sm text-stone-500 mt-1 font-medium">
                {benefitsContent.statLabel}
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -top-5 -left-4 lg:-left-8 text-white rounded-2xl shadow-xl p-4 text-center min-w-[70px]"
              style={{ background: "var(--color-primary)" }}
            >
              <div className="text-2xl font-extrabold leading-none">
                {benefitsContent.badgeValue}
              </div>
              <div className="text-xs font-semibold mt-0.5 opacity-90">
                {benefitsContent.badgeLabel}
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="order-1 lg:order-2">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full border"
              style={{
                color: "var(--color-primary)",
                backgroundColor: "var(--color-primary-50)",
                borderColor: "var(--color-primary-100)",
              }}
            >
              {benefitsContent.badge}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mt-4 mb-5 leading-tight">
              {benefitsContent.headlineStart}
              <br />
              <span style={{ color: "var(--color-primary)" }}>
                {benefitsContent.headlineHighlight}
              </span>{" "}
              {benefitsContent.headlineEnd}
            </h2>
            <p className="text-stone-500 text-lg mb-10 leading-relaxed">
              {benefitsContent.subheadline}
            </p>

            <div className="space-y-4">
              {benefits.map(({ title, desc, Icon }, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 items-start group p-4 rounded-2xl border border-transparent transition-all duration-300 cursor-default"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor =
                      "var(--color-primary-50)";
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "var(--color-primary-100)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = "";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "";
                  }}
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl border transition-colors"
                    style={{
                      backgroundColor: "var(--color-primary-50)",
                      borderColor: "var(--color-primary-100)",
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">{title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
