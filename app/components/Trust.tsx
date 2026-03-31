"use client";

import { trustFeatures } from "@/config/content";
import { motion } from "framer-motion";

export default function Trust() {
  return (
    <section className="relative z-10 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {trustFeatures.map(({ title, desc, Icon }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col items-center text-center p-5 rounded-2xl border border-stone-200 transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-md"
              style={{
                ["--hover-bg" as string]: "var(--color-primary-50)",
                ["--hover-border" as string]: "var(--color-primary-100)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = "var(--color-primary-50)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-primary-100)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = "";
                (e.currentTarget as HTMLDivElement).style.borderColor = "";
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl mb-4 transition-colors"
                style={{ backgroundColor: "var(--color-primary-50)" }}
              >
                <Icon className="w-6 h-6" style={{ color: "var(--color-primary)" }} />
              </div>
              <h3 className="font-bold text-stone-900 text-sm leading-tight mb-1">{title}</h3>
              <p className="text-xs text-stone-500">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
