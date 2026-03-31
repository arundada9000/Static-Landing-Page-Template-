"use client";

import Image from "next/image";
import { processContent, processSteps } from "@/config/content";
import { motion } from "framer-motion";

export default function Process() {
  return (
    <section
      id="process"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-surface-alt)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div
          className="absolute top-0 right-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--color-primary-50)" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-accent-light) 25%, transparent)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full border"
            style={{
              color: "var(--color-primary)",
              backgroundColor: "var(--color-primary-50)",
              borderColor: "var(--color-primary-100)",
            }}
          >
            {processContent.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mt-4 mb-4">
            {processContent.headline}
          </h2>
          <p className="text-stone-500 text-lg leading-relaxed">
            {processContent.subheadline}
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {processSteps.map(({ num, title, desc, img, Icon }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group relative flex flex-col"
            >
              <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col flex-1">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={img}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />

                  {/* Step badge */}
                  <div
                    className="absolute top-3 left-3 w-10 h-10 rounded-xl text-white flex items-center justify-center font-extrabold text-sm shadow-lg"
                    style={{ background: "var(--color-primary)" }}
                  >
                    {num}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div
                    className="w-10 h-10 rounded-xl border flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: "var(--color-primary-50)",
                      borderColor: "var(--color-primary-100)",
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "var(--color-primary)" }}
                    />
                  </div>
                  <h3 className="font-extrabold text-stone-900 text-lg mb-2">
                    {title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed flex-1">
                    {desc}
                  </p>
                </div>
              </div>

              {/* Connector arrow */}
              {idx < processSteps.length - 1 && (
                <div className="hidden xl:flex absolute top-24 -right-3 z-10 w-6 h-6 items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-5 h-5 text-stone-300"
                  >
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
