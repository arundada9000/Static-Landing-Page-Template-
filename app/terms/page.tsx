import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { siteConfig } from "@/config/site";
import { CopyCheck, FileText, Lock, Globe, AlertTriangle, Scale, HeadphonesIcon } from "lucide-react";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Terms and conditions of use for ${siteConfig.name}`,
};

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const sections = [
    { id: "agreement", title: "1. Agreement to Terms", icon: <FileText className="w-5 h-5" /> },
    { id: "license", title: "2. License & Access", icon: <Lock className="w-5 h-5" /> },
    { id: "intellectual", title: "3. Intellectual Property", icon: <CopyCheck className="w-5 h-5" /> },
    { id: "warranties", title: "4. Products & Warranties", icon: <AlertTriangle className="w-5 h-5" /> },
    { id: "law", title: "5. Governing Law", icon: <Globe className="w-5 h-5" /> },
    { id: "contact", title: "6. Support & Contact", icon: <HeadphonesIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-surface-alt)" }}>
      <Navbar />

      <main className="flex-1">
        {/* Header Section */}
        <section
          className="relative py-24 md:py-32 overflow-hidden min-h-screen"
          style={{ backgroundColor: "var(--color-primary-dark)" }}
        >
          {/* Decorative background elements */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--color-primary) 30%, transparent) 0%, transparent 50%), radial-gradient(circle at 100% 100%, color-mix(in srgb, var(--color-accent) 15%, transparent) 0%, transparent 50%)",
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center justify-center p-4 rounded-3xl mb-8 relative overflow-hidden group">
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                style={{ backgroundColor: "var(--color-accent)" }}
              />
              <div className="absolute inset-0 backdrop-blur-md" />
              <Scale
                className="w-10 h-10 relative z-10"
                style={{ color: "var(--color-accent-light)" }}
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-white">
              Terms of Service
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Please read these terms carefully before using our platform.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/80 text-sm font-medium">
              <FileText className="w-4 h-4" />
              Last Updated: {lastUpdated}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 items-start">

              {/* Sticky Sidebar */}
              <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-32">
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-200">
                  <h3 className="text-sm font-extrabold uppercase tracking-widest text-stone-900 mb-6 px-4">
                    Document Sections
                  </h3>
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-50 transition-all group"
                      >
                        <span
                          className="text-stone-400 group-hover:text-stone-900 transition-colors"
                          style={{ color: "var(--color-primary-light)" }}
                        >
                          {section.icon}
                        </span>
                        {section.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Main Content Areas */}
              <div className="flex-1 max-w-4xl space-y-8">
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-stone-200">
                  <p
                    className="text-xl leading-relaxed text-stone-600 mb-0 font-medium pb-8 border-b border-stone-100"
                  >
                    Welcome to <strong style={{ color: "var(--color-primary)" }}>{siteConfig.name}</strong>. By accessing this website or purchasing our products, you agree to be bound by these Terms.
                  </p>

                  <div className="mt-12 space-y-16">
                    {/* Section 1 */}
                    <div id="agreement" className="scroll-mt-32">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner border border-stone-100/50"
                          style={{ backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)" }}
                        >
                          <FileText className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">
                          1. Agreement to Terms
                        </h2>
                      </div>
                      <div className="prose prose-stone prose-lg max-w-none text-stone-600">
                        <p>By accessing and using this website ({siteConfig.url}), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's services, you shall be subject to any posted guidelines.</p>
                      </div>
                    </div>

                    {/* Section 2 */}
                    <div id="license" className="scroll-mt-32">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner border border-stone-100/50"
                          style={{ backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)" }}
                        >
                          <Lock className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">
                          2. License and Site Access
                        </h2>
                      </div>
                      <div className="prose prose-stone prose-lg max-w-none text-stone-600">
                        <p>We grant you a limited license to access and make personal use of this site and not to download or modify it, except with express written consent. This license does not include commercial use of this site or its contents.</p>
                      </div>
                    </div>

                    {/* Section 3 */}
                    <div id="intellectual" className="scroll-mt-32">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner border border-stone-100/50"
                          style={{ backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)" }}
                        >
                          <CopyCheck className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">
                          3. Intellectual Property
                        </h2>
                      </div>
                      <div className="prose prose-stone prose-lg max-w-none text-stone-600">
                        <p>The Site and its original content, features, and functionality are owned by {siteConfig.name} and are protected by international copyright, trademark, and other intellectual property rights laws.</p>
                      </div>
                    </div>

                    {/* Section 4 */}
                    <div id="warranties" className="scroll-mt-32">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner border border-stone-100/50"
                          style={{ backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)" }}
                        >
                          <AlertTriangle className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">
                          4. Product Descriptions & Warranties
                        </h2>
                      </div>
                      <div className="prose prose-stone prose-lg max-w-none text-stone-600">
                        <p>We attempt to be as accurate as possible. However, we do not warrant that product descriptions are perfectly accurate, complete, reliable, or error-free.</p>
                        <p>THIS SITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE MAKE NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.</p>
                      </div>
                    </div>

                    {/* Section 5 */}
                    <div id="law" className="scroll-mt-32">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner border border-stone-100/50"
                          style={{ backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)" }}
                        >
                          <Globe className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">
                          5. Governing Law
                        </h2>
                      </div>
                      <div className="prose prose-stone prose-lg max-w-none text-stone-600">
                        <p>These Terms shall be governed and construed in accordance with the laws of our jurisdiction, without regard to its conflict of law provisions.</p>
                      </div>
                    </div>

                    {/* Section 6 - Contact */}
                    <div id="contact" className="scroll-mt-32 bg-stone-50 rounded-3xl p-8 border border-stone-100">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                          style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", color: "white" }}
                        >
                          <HeadphonesIcon className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-extrabold text-stone-900">
                          6. Support & Contact
                        </h2>
                      </div>
                      <p className="text-stone-600 mb-6">
                        If you have any questions or require support regarding these terms, please reach out to our team.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-stone-200 hover:shadow-md transition-shadow">
                          <span style={{ color: "var(--color-primary)" }}>✉️</span>
                          <span className="font-bold text-stone-900">Email Support</span>
                        </a>
                        <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-stone-200 hover:shadow-md transition-shadow">
                          <span style={{ color: "var(--color-primary)" }}>📞</span>
                          <span className="font-bold text-stone-900">Call Us</span>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
