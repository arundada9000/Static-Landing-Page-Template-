"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FadeIn } from "../components/FadeIn";
import { motion } from "framer-motion";
import {
  Send,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function ContactPage() {
  // Try to use environment variable, otherwise fallback to the provided key
  const accessKey =
    process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
    "a70b99ba-e904-480f-9f8b-e420787fbc0d";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [resultMessage, setResultMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error as soon as they type
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim())
      newErrors.message = "Please enter your message";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openWhatsAppFallback = () => {
    const text = `*New Contact Inquiry*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || "Not provided"}\n*Subject:* ${formData.subject || "General Inquiry"}\n\n*Message:*\n${formData.message}`;
    const encodedText = encodeURIComponent(text);
    const phone = siteConfig.contact.whatsapp.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${phone}?text=${encodedText}`, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // If no valid key is present (assuming "YOUR_KEY" means unconfigured)
    if (
      !accessKey ||
      accessKey === "YOUR_ACCESS_KEY_HERE" ||
      accessKey.length < 10
    ) {
      // Fallback directly to WhatsApp
      setTimeout(() => {
        openWhatsAppFallback();
        setIsSubmitting(false);
        setSubmitStatus("success");
        setResultMessage(
          "We are redirecting you to WhatsApp to complete your inquiry.",
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 800);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData, // place spreading first
          Interested_In: formData.subject || "General Inquiry",
          Source_URL: window.location.href,
          access_key: accessKey,
          subject: formData.subject || `New Inquiry from ${formData.name}`,
          from_name: formData.name,
        }),
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        setSubmitStatus("success");
        setResultMessage(
          result.message ||
            "Message sent successfully! Redirecting you to WhatsApp to complete your inquiry.",
        );
        
        // As requested by user, send data to WhatsApp immediately too.
        setTimeout(() => {
          openWhatsAppFallback();
        }, 1500);

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      setResultMessage(
        "Something went wrong with the email server. Redirecting you to WhatsApp...",
      );

      // Secondary Fallback on Web3Forms failure
      setTimeout(() => {
        openWhatsAppFallback();
        setSubmitStatus("idle");
      }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        {/* ── Hero Banner ── */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-stone-900 border-b border-stone-800">
          <div className="absolute inset-0 z-0 opacity-40">
            <Image
              src="/images/contact-img.jpeg"
              alt="Contact Background"
              fill
              className="object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/80 to-stone-900/40" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 100%, color-mix(in srgb, var(--color-primary) 20%, transparent) 0%, transparent 60%)",
              }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <FadeIn>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/10 shadow-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                Get in{" "}
                <span style={{ color: "var(--color-primary)" }}>Touch</span>
              </h1>
              <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto font-medium leading-relaxed">
                Whether you have a question about our products, need tailored
                support, or want to discuss a custom order, we are here to help.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Contact Section ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 antialiased">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Left Column: Contact Info Cards */}
            <div className="lg:col-span-2 space-y-6">
              <FadeIn direction="up" delay={0.1}>
                <div>
                  <h2 className="text-3xl font-extrabold text-stone-900 mb-2">
                    Connect with us
                  </h2>
                  <p className="text-stone-500 mb-8 leading-relaxed font-medium">
                    We usually respond within 24 hours. For urgent inquiries,
                    please call or WhatsApp us directly.
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.2} className="group">
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-md hover:border-[var(--color-primary)] transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all text-stone-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-stone-900 font-extrabold text-lg mb-1">
                      Phone
                    </h3>
                    <p className="text-stone-500 font-medium">
                      {siteConfig.contact.phone}
                    </p>
                  </div>
                </a>
              </FadeIn>

              <FadeIn direction="up" delay={0.3} className="group">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-md hover:border-[var(--color-primary)] transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all text-stone-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-stone-900 font-extrabold text-lg mb-1">
                      Email
                    </h3>
                    <p className="text-stone-500 font-medium break-all">
                      {siteConfig.contact.email}
                    </p>
                  </div>
                </a>
              </FadeIn>

              <FadeIn direction="up" delay={0.4} className="group">
                <div className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-md hover:border-[var(--color-primary)] transition-all">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all text-stone-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-stone-900 font-extrabold text-lg mb-1">
                      Office
                    </h3>
                    <p className="text-stone-500 font-medium leading-relaxed">
                      {siteConfig.contact.address}
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Dynamic Form */}
            <div className="lg:col-span-3">
              <FadeIn direction="left" delay={0.2} className="h-full">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-stone-200 shadow-xl h-full relative overflow-hidden">
                  {/* Decorative background blurs inside the form card */}
                  <div
                    className="absolute -top-32 -right-32 w-64 h-64 rounded-full mix-blend-multiply opacity-20 blur-3xl pointer-events-none"
                    style={{ backgroundColor: "var(--color-primary-light)" }}
                  />

                  <h3 className="text-2xl font-extrabold text-stone-900 mb-8 relative z-10">
                    Send a Message
                  </h3>

                  {submitStatus === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center flex flex-col items-center justify-center h-64"
                    >
                      <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
                      <h4 className="text-xl font-extrabold text-emerald-900 mb-2">
                        Message Sent!
                      </h4>
                      <p className="text-emerald-700 font-medium">
                        {resultMessage}
                      </p>
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-6 relative z-10"
                      noValidate
                    >
                      {submitStatus === "error" && (
                        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-rose-700 text-sm font-medium">
                          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                          <p>{resultMessage}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Input */}
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-extrabold text-stone-700 ml-1"
                          >
                            Full Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={`w-full px-5 py-4 bg-stone-50 border rounded-2xl focus:outline-none focus:ring-4 transition-all text-sm font-medium text-stone-900 ${
                              errors.name
                                ? "border-rose-300 focus:border-rose-400 focus:ring-rose-400/20 bg-rose-50/50"
                                : "border-stone-200 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/10"
                            }`}
                          />
                          {errors.name && (
                            <p className="text-rose-500 text-xs font-bold pl-1 mt-1">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-extrabold text-stone-700 ml-1"
                          >
                            Email Address{" "}
                            <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className={`w-full px-5 py-4 bg-stone-50 border rounded-2xl focus:outline-none focus:ring-4 transition-all text-sm font-medium text-stone-900 ${
                              errors.email
                                ? "border-rose-300 focus:border-rose-400 focus:ring-rose-400/20 bg-rose-50/50"
                                : "border-stone-200 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/10"
                            }`}
                          />
                          {errors.email && (
                            <p className="text-rose-500 text-xs font-bold pl-1 mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Phone Select */}
                        <div className="space-y-2">
                          <label
                            htmlFor="phone"
                            className="text-sm font-extrabold text-stone-700 ml-1"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all text-sm font-medium text-stone-900"
                          />
                        </div>

                        {/* Subject Select */}
                        <div className="space-y-2">
                          <label
                            htmlFor="subject"
                            className="text-sm font-extrabold text-stone-700 ml-1"
                          >
                            Interested In
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all text-sm font-medium text-stone-900 cursor-pointer appearance-none"
                            style={{
                              backgroundImage:
                                "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 1.2rem center",
                              backgroundSize: "1rem",
                            }}
                          >
                            <option value="">General Inquiry</option>
                            <option value="Product Order">
                              Product Order / Question
                            </option>
                            <option value="Custom Order">Custom Order</option>
                            <option value="Support">Post-sales Support</option>
                            <option value="Collaboration">Collaboration</option>
                          </select>
                        </div>
                      </div>

                      {/* Message Input */}
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-extrabold text-stone-700 ml-1"
                        >
                          Your Message <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          rows={4}
                          className={`w-full px-5 py-4 bg-stone-50 border rounded-2xl focus:outline-none focus:ring-4 transition-all text-sm font-medium text-stone-900 resize-none ${
                            errors.message
                              ? "border-rose-300 focus:border-rose-400 focus:ring-rose-400/20 bg-rose-50/50"
                              : "border-stone-200 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/10"
                          }`}
                        />
                        {errors.message && (
                          <p className="text-rose-500 text-xs font-bold pl-1 mt-1">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-3 py-4 md:py-5 px-8 rounded-2xl font-extrabold text-white text-base md:text-lg tracking-tight shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer group"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                          boxShadow:
                            "0 10px 30px color-mix(in srgb, var(--color-primary) 30%, transparent)",
                        }}
                      >
                        {isSubmitting ? (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-stone-400 text-xs font-medium mt-4">
                        By submitting this form, you agree to our privacy
                        policy.
                      </p>
                    </form>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
