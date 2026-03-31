"use client";

import { useRef } from "react";
import { siteConfig } from "@/config/site";
import {
  CopyCheck,
  FileText,
  Lock,
  Globe,
  AlertTriangle,
  Scale,
  HeadphonesIcon,
  ArrowDown,
} from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const sections = [
    {
      id: "agreement",
      title: "1. Agreement to Terms",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "license",
      title: "2. License & Access",
      icon: <Lock className="w-5 h-5" />,
    },
    {
      id: "intellectual",
      title: "3. Intellectual Property",
      icon: <CopyCheck className="w-5 h-5" />,
    },
    {
      id: "warranties",
      title: "4. Products & Warranties",
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    {
      id: "law",
      title: "5. Governing Law",
      icon: <Globe className="w-5 h-5" />,
    },
    {
      id: "contact",
      title: "6. Support & Contact",
      icon: <HeadphonesIcon className="w-5 h-5" />,
    },
  ];

  const floatingOrbs = [
    { size: 350, x: "-8%", y: "5%", delay: 0, dur: 9 },
    { size: 220, x: "80%", y: "55%", delay: 1.2, dur: 11 },
    { size: 140, x: "60%", y: "10%", delay: 0.6, dur: 8 },
    { size: 90, x: "25%", y: "75%", delay: 2.1, dur: 7 },
    { size: 70, x: "90%", y: "25%", delay: 0.4, dur: 6 },
  ];

  const contentSections = [
    {
      id: "agreement",
      icon: <FileText className="w-6 h-6" />,
      title: "1. Agreement to Terms",
      body: (
        <p>
          By accessing and using this website ({siteConfig.url}), you accept and
          agree to be bound by the terms and provision of this agreement. In
          addition, when using this website&apos;s services, you shall be
          subject to any posted guidelines.
        </p>
      ),
    },
    {
      id: "license",
      icon: <Lock className="w-6 h-6" />,
      title: "2. License and Site Access",
      body: (
        <p>
          We grant you a limited license to access and make personal use of this
          site and not to download or modify it, except with express written
          consent. This license does not include commercial use of this site or
          its contents.
        </p>
      ),
    },
    {
      id: "intellectual",
      icon: <CopyCheck className="w-6 h-6" />,
      title: "3. Intellectual Property",
      body: (
        <p>
          The Site and its original content, features, and functionality are
          owned by {siteConfig.name} and are protected by international
          copyright, trademark, and other intellectual property rights laws.
        </p>
      ),
    },
    {
      id: "warranties",
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "4. Product Descriptions & Warranties",
      body: (
        <>
          <p>
            We attempt to be as accurate as possible. However, we do not warrant
            that product descriptions are perfectly accurate, complete,
            reliable, or error-free.
          </p>
          <p>
            THIS SITE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS
            AVAILABLE&quot; BASIS. WE MAKE NO REPRESENTATIONS OR WARRANTIES OF
            ANY KIND, EXPRESS OR IMPLIED.
          </p>
        </>
      ),
    },
    {
      id: "law",
      icon: <Globe className="w-6 h-6" />,
      title: "5. Governing Law",
      body: (
        <p>
          These Terms shall be governed and construed in accordance with the
          laws of our jurisdiction, without regard to its conflict of law
          provisions.
        </p>
      ),
    },
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
          className="relative overflow-hidden text-white min-h-screen flex items-center justify-center"
        >
          {/* Parallax BG */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{ y: bgY }}
          >
            <Image
              src="/images/terms-hero-bg.jpeg"
              alt="Terms page background"
              fill
              className="object-cover object-center"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(20,18,68,0.80) 0%, rgba(55,48,163,0.60) 50%, rgba(20,18,68,0.88) 100%)",
              }}
            />
          </motion.div>

          {/* Floating orbs */}
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
                  "radial-gradient(circle, color-mix(in srgb, var(--color-primary-light) 20%, transparent) 0%, transparent 70%)",
                filter: "blur(50px)",
              }}
              animate={{ y: [0, -28, 0], x: [0, 18, 0], scale: [1, 1.1, 1] }}
              transition={{
                duration: orb.dur,
                delay: orb.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Grid lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Content */}
          <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-32"
            style={{ y: textY, opacity }}
          >
            {/* Icon badge */}
            <motion.div
              className="inline-flex items-center justify-center p-4 rounded-3xl mb-8 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "backOut" }}
              whileHover={{ scale: 1.08 }}
            >
              <div
                className="absolute inset-0 opacity-25"
                style={{ backgroundColor: "var(--color-accent)" }}
              />
              <div className="absolute inset-0 backdrop-blur-md" />
              <Scale
                className="w-10 h-10 relative z-10"
                style={{ color: "var(--color-accent-light)" }}
              />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Terms of Service
            </motion.h1>

            <motion.p
              className="text-xl text-white/70 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Please read these terms carefully before using our platform.
            </motion.p>

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/80 text-sm font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <FileText className="w-4 h-4" />
              Last Updated: {lastUpdated}
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              className="mt-14 flex flex-col items-center gap-2 text-white/40 text-xs tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <span>Read below</span>
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
        </section>

        {/* ── Content Section ── */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Sticky Sidebar */}
              <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-32">
                <FadeIn direction="right">
                  <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-200 overflow-hidden relative">
                    {/* Subtle gradient top bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-[2rem]"
                      style={{
                        background:
                          "linear-gradient(to right, var(--color-primary), var(--color-accent))",
                      }}
                    />
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-stone-900 mb-6 px-4 pt-2">
                      Document Sections
                    </h3>
                    <nav className="space-y-1">
                      {sections.map((section, i) => (
                        <motion.a
                          key={section.id}
                          href={`#${section.id}`}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-50 transition-all group"
                          whileHover={{ x: 4 }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                        >
                          <span style={{ color: "var(--color-primary-light)" }}>
                            {section.icon}
                          </span>
                          {section.title}
                        </motion.a>
                      ))}
                    </nav>
                  </div>
                </FadeIn>
              </aside>

              {/* Main Content */}
              <div className="flex-1 max-w-4xl space-y-8">
                <FadeIn direction="left">
                  <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-stone-200">
                    <p className="text-xl leading-relaxed text-stone-600 mb-0 font-medium pb-8 border-b border-stone-100">
                      Welcome to{" "}
                      <strong style={{ color: "var(--color-primary)" }}>
                        {siteConfig.name}
                      </strong>
                      . By accessing this website or purchasing our products,
                      you agree to be bound by these Terms.
                    </p>

                    <div className="mt-12 space-y-16">
                      {contentSections.map((s, i) => (
                        <motion.div
                          key={s.id}
                          id={s.id}
                          className="scroll-mt-32"
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 0.5, delay: i * 0.05 }}
                        >
                          <div className="flex items-center gap-4 mb-6">
                            <motion.div
                              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner border border-stone-100/50"
                              style={{
                                backgroundColor: "var(--color-primary-50)",
                                color: "var(--color-primary)",
                              }}
                              whileHover={{ rotate: 8, scale: 1.12 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              {s.icon}
                            </motion.div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">
                              {s.title}
                            </h2>
                          </div>
                          <div className="prose prose-stone prose-lg max-w-none text-stone-600">
                            {s.body}
                          </div>
                        </motion.div>
                      ))}

                      {/* Section 6 — Contact */}
                      <motion.div
                        id="contact"
                        className="scroll-mt-32 rounded-3xl p-8 border border-stone-100 relative overflow-hidden"
                        style={{ backgroundColor: "var(--color-primary-50)" }}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Accent top border */}
                        <div
                          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                          style={{
                            background:
                              "linear-gradient(to right, var(--color-primary), var(--color-accent))",
                          }}
                        />
                        <div className="flex items-center gap-4 mb-6">
                          <motion.div
                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                            style={{
                              background:
                                "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                              color: "white",
                            }}
                            whileHover={{ rotate: 8, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <HeadphonesIcon className="w-6 h-6" />
                          </motion.div>
                          <h2 className="text-2xl font-extrabold text-stone-900">
                            6. Support &amp; Contact
                          </h2>
                        </div>
                        <p className="text-stone-600 mb-6">
                          If you have any questions or require support regarding
                          these terms, please reach out to our team.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {[
                            {
                              href: `mailto:${siteConfig.contact.email}`,
                              emoji: "✉️",
                              label: "Email Support",
                            },
                            {
                              href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
                              emoji: "📞",
                              label: "Call Us",
                            },
                          ].map((item, i) => (
                            <motion.a
                              key={i}
                              href={item.href}
                              className="flex items-center gap-3 bg-white p-4 rounded-xl border border-stone-200"
                              whileHover={{
                                y: -3,
                                boxShadow: "0 8px 24px rgba(79,70,229,0.12)",
                              }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <span style={{ color: "var(--color-primary)" }}>
                                {item.emoji}
                              </span>
                              <span className="font-bold text-stone-900">
                                {item.label}
                              </span>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
