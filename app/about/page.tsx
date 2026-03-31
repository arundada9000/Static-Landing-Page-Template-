"use client";

import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Sparkles, Eye, Target, Zap, HandHeart, ArrowDown } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { aboutContent } from "@/config/content";
import { FadeIn } from "../components/FadeIn";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const floatingOrbs = [
    { size: 320, x: "5%", y: "10%", delay: 0, duration: 8 },
    { size: 200, x: "75%", y: "60%", delay: 1.5, duration: 10 },
    { size: 150, x: "55%", y: "15%", delay: 0.8, duration: 7 },
    { size: 100, x: "20%", y: "70%", delay: 2, duration: 9 },
    { size: 80, x: "88%", y: "20%", delay: 0.3, duration: 6 },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--color-surface-alt)" }}
    >
      <Navbar />

      <main className="flex-1">
        {/* ── Hero Banner ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden text-center text-white min-h-screen flex items-center justify-center"
        >
          {/* Parallax background image */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{ y: bgY }}
          >
            <Image
              src="/images/about-hero-bg.jpeg"
              alt="About page background"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(30,27,75,0.72) 0%, rgba(55,48,163,0.55) 60%, rgba(30,27,75,0.85) 100%)",
              }}
            />
          </motion.div>

          {/* Animated floating orbs */}
          {floatingOrbs.map((orb, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: orb.size,
                height: orb.size,
                left: orb.x,
                top: orb.y,
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 25%, transparent) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: orb.duration,
                delay: orb.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Animated grid lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Hero content */}
          <motion.div
            className="max-w-4xl mx-auto px-4 relative z-10 py-32"
            style={{ y: textY, opacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.span
                className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 px-4 py-1.5 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm"
                style={{ color: "var(--color-accent)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Our Story &amp; Heritage
              </motion.span>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
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
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
              >
                {siteConfig.description}
              </motion.p>

              {/* Scroll indicator */}
              <motion.div
                className="mt-14 flex flex-col items-center gap-2 text-white/50 text-xs tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <span>Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowDown className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Brand Story Section ── */}
        <section className="py-20 md:py-32 bg-white relative overflow-hidden">
          {/* Decorative blob */}
          <div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, var(--color-primary-50) 0%, transparent 70%)",
            }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <FadeIn
                direction="right"
                className="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl group"
              >
                <Image
                  src={aboutContent.aboutImage}
                  alt={aboutContent.aboutImageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ background: "var(--color-primary)" }}
                />
                {/* Shine sweep on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
                  }}
                />
              </FadeIn>

              {/* Content */}
              <FadeIn direction="left" className="space-y-8">
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

                {/* Animated Badges */}
                <div className="flex gap-4 pt-4 flex-wrap">
                  {[
                    {
                      icon: <Zap className="w-5 h-5" />,
                      label: aboutContent.feature1Title,
                      bg: "var(--color-primary-50)",
                      color: "var(--color-primary)",
                    },
                    {
                      icon: <HandHeart className="w-5 h-5" />,
                      label: "Community First",
                      bg: "color-mix(in srgb, var(--color-accent-light) 35%, transparent)",
                      color: "var(--color-accent)",
                    },
                  ].map((badge, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-stone-100 cursor-default"
                      whileHover={{
                        y: -4,
                        boxShadow: "0 12px 32px rgba(79,70,229,0.12)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: badge.bg,
                          color: badge.color,
                        }}
                      >
                        {badge.icon}
                      </div>
                      <span className="block text-sm font-extrabold text-stone-900">
                        {badge.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Vision & Mission ── */}
        <section
          className="py-24 md:py-32 border-t relative overflow-hidden"
          style={{
            backgroundColor: "var(--color-primary-50)",
            borderColor: "var(--color-primary-100)",
          }}
        >
          {/* Animated background dots pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(var(--color-primary-100) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <FadeIn className="text-center mb-14">
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
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {[
                {
                  icon: <Eye className="w-8 h-8" />,
                  bigIcon: (
                    <Eye className="w-48 h-48 -rotate-12 translate-x-10 -translate-y-10" />
                  ),
                  title: "Our Vision",
                  text: (
                    <>
                      To become a{" "}
                      <strong style={{ color: "var(--color-primary)" }}>
                        globally recognized premium brand
                      </strong>{" "}
                      — bringing extraordinary quality into the hands of
                      discerning customers everywhere.
                    </>
                  ),
                  delay: 0.1,
                },
                {
                  icon: <Target className="w-8 h-8" />,
                  bigIcon: (
                    <Target className="w-48 h-48 rotate-12 translate-x-10 -translate-y-10" />
                  ),
                  title: "Our Mission",
                  text: (
                    <>
                      To deliver{" "}
                      <strong style={{ color: "var(--color-primary)" }}>
                        best-in-class products
                      </strong>{" "}
                      with unwavering authenticity, transparency, and trust for
                      every customer we serve.
                    </>
                  ),
                  delay: 0.2,
                },
              ].map((card, i) => (
                <FadeIn key={i} delay={card.delay}>
                  <motion.div
                    className="bg-white rounded-[2rem] p-10 md:p-14 shadow-lg border border-white relative overflow-hidden h-full"
                    style={{
                      boxShadow:
                        "0 8px 32px color-mix(in srgb, var(--color-primary) 8%, transparent)",
                    }}
                    whileHover={{
                      y: -8,
                      boxShadow:
                        "0 24px 48px color-mix(in srgb, var(--color-primary) 14%, transparent)",
                    }}
                    transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5 hover:opacity-10 transition-opacity">
                      <div style={{ color: "var(--color-primary)" }}>
                        {card.bigIcon}
                      </div>
                    </div>
                    <div className="relative z-10 space-y-6">
                      <motion.div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner"
                        style={{
                          backgroundColor: "var(--color-primary-50)",
                          color: "var(--color-primary)",
                        }}
                        whileHover={{ rotate: 8, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {card.icon}
                      </motion.div>
                      <h3 className="text-3xl font-extrabold text-stone-900">
                        {card.title}
                      </h3>
                      <p className="text-xl text-stone-600 leading-relaxed font-medium">
                        {card.text}
                      </p>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Agency Credit ── */}
        <section className="py-16 bg-white border-t border-stone-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-sm text-stone-400 mb-3 tracking-wide">
              This website was designed &amp; developed by
            </p>
            <a
              href={siteConfig.agency.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 group"
            >
              <motion.div
                className="px-6 py-3 rounded-2xl font-extrabold text-white text-lg tracking-tight shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                }}
                whileHover={{
                  y: -2,
                  boxShadow:
                    "0 12px 32px color-mix(in srgb, var(--color-primary) 30%, transparent)",
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Sajilo
                <span style={{ color: "var(--color-accent)" }}>Digital</span>
              </motion.div>
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
