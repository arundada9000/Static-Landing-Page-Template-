"use client";

import { useRef } from "react";
import { siteConfig } from "@/config/site";
import {
  ShieldAlert,
  Cookie,
  UserCheck,
  Share2,
  Scale,
  Clock,
  Mail,
  ArrowDown,
} from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PrivacyPage() {
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
      id: "information",
      title: "1. Information We Collect",
      icon: <UserCheck className="w-5 h-5" />,
    },
    {
      id: "usage",
      title: "2. How We Use Your Information",
      icon: <Cookie className="w-5 h-5" />,
    },
    {
      id: "sharing",
      title: "3. Information Sharing",
      icon: <Share2 className="w-5 h-5" />,
    },
    {
      id: "rights",
      title: "4. Your Rights",
      icon: <Scale className="w-5 h-5" />,
    },
    {
      id: "retention",
      title: "5. Data Retention",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      id: "contact",
      title: "6. Contact Us",
      icon: <Mail className="w-5 h-5" />,
    },
  ];

  const floatingOrbs = [
    { size: 380, x: "70%", y: "-5%", delay: 0, dur: 10 },
    { size: 240, x: "-5%", y: "50%", delay: 1.0, dur: 12 },
    { size: 160, x: "40%", y: "70%", delay: 0.7, dur: 8 },
    { size: 100, x: "85%", y: "65%", delay: 2.0, dur: 7 },
    { size: 75, x: "15%", y: "15%", delay: 0.4, dur: 6 },
  ];

  const contentSections = [
    {
      id: "information",
      icon: <UserCheck className="w-6 h-6" />,
      title: "1. Information We Collect",
      body: (
        <>
          <p>
            We automatically collect certain information about your device,
            including information about your web browser, IP address, time zone,
            and some of the cookies that are installed on your device.
          </p>
          <ul>
            <li>
              <strong>Cookies</strong> are data files placed on your device.
            </li>
            <li>
              <strong>Log files</strong> track actions occurring on the Site.
            </li>
            <li>
              <strong>Order Information</strong> when you make a purchase or
              attempt to make a purchase.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "usage",
      icon: <Cookie className="w-6 h-6" />,
      title: "2. How We Use Your Information",
      body: (
        <p>
          We use the Order Information to fulfill orders placed through the
          Site. We use Device Information to screen for potential risk and
          fraud, and to improve and optimize our Site.
        </p>
      ),
    },
    {
      id: "sharing",
      icon: <Share2 className="w-6 h-6" />,
      title: "3. Information Sharing",
      body: (
        <p>
          We share your Personal Information with reliable third parties to help
          us use it as described above. We may also share it to comply with
          applicable laws.
        </p>
      ),
    },
    {
      id: "rights",
      icon: <Scale className="w-6 h-6" />,
      title: "4. Your Rights",
      body: (
        <p>
          You have the right to access personal information we hold about you
          and to ask that it be corrected, updated, or deleted.
        </p>
      ),
    },
    {
      id: "retention",
      icon: <Clock className="w-6 h-6" />,
      title: "5. Data Retention",
      body: (
        <p>
          When you place an order, we will maintain your Information for our
          records unless you ask us to delete it.
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
              src="/images/privacy-hero-bg.jpeg"
              alt="Privacy page background"
              fill
              className="object-cover object-center"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(15,14,60,0.82) 0%, rgba(55,48,163,0.58) 50%, rgba(15,14,60,0.90) 100%)",
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
                  "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 18%, transparent) 0%, transparent 70%)",
                filter: "blur(55px)",
              }}
              animate={{ y: [0, -25, 0], x: [0, -20, 0], scale: [1, 1.09, 1] }}
              transition={{
                duration: orb.dur,
                delay: orb.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Subtle hexagonal pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpolygon points='28,2 54,16 54,44 28,58 2,44 2,16' fill='none' stroke='white' stroke-width='0.8'/%3E%3C/svg%3E\")",
              backgroundSize: "56px 100px",
            }}
          />

          {/* Grid lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
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
              <ShieldAlert
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
              Privacy Policy
            </motion.h1>

            <motion.p
              className="text-xl text-white/70 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              We value your privacy and are committed to protecting your
              personal data transparently and securely.
            </motion.p>

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/80 text-sm font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Clock className="w-4 h-4" />
              Last Updated: {lastUpdated}
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              className="mt-14 flex flex-col items-center gap-2 text-white/40 text-xs tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <span>We care about your data</span>
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
                    <div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-[2rem]"
                      style={{
                        background:
                          "linear-gradient(to right, var(--color-primary), var(--color-accent))",
                      }}
                    />
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-stone-900 mb-6 px-4 pt-2">
                      Contents
                    </h3>
                    <nav className="space-y-1">
                      {sections.map((section, i) => (
                        <motion.a
                          key={section.id}
                          href={`#${section.id}`}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-50 transition-all"
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
                      At{" "}
                      <strong style={{ color: "var(--color-primary)" }}>
                        {siteConfig.name}
                      </strong>
                      , we run our business on trust. This privacy policy
                      explains how we collect, use, and protect your personal
                      information when you use our services.
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
                            <Mail className="w-6 h-6" />
                          </motion.div>
                          <h2 className="text-2xl font-extrabold text-stone-900">
                            6. Contact Us
                          </h2>
                        </div>
                        <p className="text-stone-600 mb-6">
                          For more information about our privacy practices, if
                          you have questions, or if you would like to make a
                          complaint, please contact us.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {[
                            {
                              href: `mailto:${siteConfig.contact.email}`,
                              emoji: "📧",
                              label: siteConfig.contact.email,
                            },
                            {
                              href: `tel:${siteConfig.contact.phone}`,
                              emoji: "📞",
                              label: siteConfig.contact.phone,
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
