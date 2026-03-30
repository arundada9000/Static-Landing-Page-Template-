import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { siteConfig } from "@/config/site";
import { ShieldAlert, Cookie, UserCheck, Share2, Scale, Clock, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy Policy and data handling practices for ${siteConfig.name}`,
};

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const sections = [
    { id: "information", title: "1. Information We Collect", icon: <UserCheck className="w-5 h-5" /> },
    { id: "usage", title: "2. How We Use Your Information", icon: <Cookie className="w-5 h-5" /> },
    { id: "sharing", title: "3. Information Sharing", icon: <Share2 className="w-5 h-5" /> },
    { id: "rights", title: "4. Your Rights", icon: <Scale className="w-5 h-5" /> },
    { id: "retention", title: "5. Data Retention", icon: <Clock className="w-5 h-5" /> },
    { id: "contact", title: "6. Contact Us", icon: <Mail className="w-5 h-5" /> },
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
                "radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--color-primary) 30%, transparent) 0%, transparent 50%), radial-gradient(circle at 0% 100%, color-mix(in srgb, var(--color-accent) 15%, transparent) 0%, transparent 50%)",
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center justify-center p-4 rounded-3xl mb-8 relative overflow-hidden group">
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                style={{ backgroundColor: "var(--color-accent)" }}
              />
              <div className="absolute inset-0 backdrop-blur-md" />
              <ShieldAlert
                className="w-10 h-10 relative z-10"
                style={{ color: "var(--color-accent-light)" }}
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-white">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              We value your privacy and are committed to protecting your personal data transparently and securely.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white/80 text-sm font-medium">
              <Clock className="w-4 h-4" />
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
                    Contents
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
                    At <strong style={{ color: "var(--color-primary)" }}>{siteConfig.name}</strong>, we run our business on trust. This privacy policy explains how we collect, use, and protect your personal information when you use our services.
                  </p>

                  <div className="mt-12 space-y-16">
                    {/* Section 1 */}
                    <div id="information" className="scroll-mt-32">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner border border-stone-100/50"
                          style={{ backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)" }}
                        >
                          <UserCheck className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">
                          1. Information We Collect
                        </h2>
                      </div>
                      <div className="prose prose-stone prose-lg max-w-none text-stone-600">
                        <p>We automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>
                        <ul>
                          <li><strong>Cookies</strong> are data files placed on your device.</li>
                          <li><strong>Log files</strong> track actions occurring on the Site.</li>
                          <li><strong>Order Information</strong> when you make a purchase or attempt to make a purchase.</li>
                        </ul>
                      </div>
                    </div>

                    {/* Section 2 */}
                    <div id="usage" className="scroll-mt-32">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner border border-stone-100/50"
                          style={{ backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)" }}
                        >
                          <Cookie className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">
                          2. How We Use Your Information
                        </h2>
                      </div>
                      <div className="prose prose-stone prose-lg max-w-none text-stone-600">
                        <p>We use the Order Information to fulfill orders placed through the Site. We use Device Information to screen for potential risk and fraud, and to improve and optimize our Site.</p>
                      </div>
                    </div>

                    {/* Section 3 */}
                    <div id="sharing" className="scroll-mt-32">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner border border-stone-100/50"
                          style={{ backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)" }}
                        >
                          <Share2 className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">
                          3. Information Sharing
                        </h2>
                      </div>
                      <div className="prose prose-stone prose-lg max-w-none text-stone-600">
                        <p>We share your Personal Information with reliable third parties to help us use it as described above. We may also share it to comply with applicable laws.</p>
                      </div>
                    </div>

                    {/* Section 4 */}
                    <div id="rights" className="scroll-mt-32">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner border border-stone-100/50"
                          style={{ backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)" }}
                        >
                          <Scale className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">
                          4. Your Rights
                        </h2>
                      </div>
                      <div className="prose prose-stone prose-lg max-w-none text-stone-600">
                        <p>You have the right to access personal information we hold about you and to ask that it be corrected, updated, or deleted.</p>
                      </div>
                    </div>

                    {/* Section 5 */}
                    <div id="retention" className="scroll-mt-32">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner border border-stone-100/50"
                          style={{ backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)" }}
                        >
                          <Clock className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900">
                          5. Data Retention
                        </h2>
                      </div>
                      <div className="prose prose-stone prose-lg max-w-none text-stone-600">
                        <p>When you place an order, we will maintain your Information for our records unless you ask us to delete it.</p>
                      </div>
                    </div>

                    {/* Section 6 - Contact */}
                    <div id="contact" className="scroll-mt-32 bg-stone-50 rounded-3xl p-8 border border-stone-100">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                          style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", color: "white" }}
                        >
                          <Mail className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-extrabold text-stone-900">
                          6. Contact Us
                        </h2>
                      </div>
                      <p className="text-stone-600 mb-6">
                        For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-stone-200 hover:shadow-md transition-shadow">
                          <span style={{ color: "var(--color-primary)" }}>📧</span>
                          <span className="font-bold text-stone-900">{siteConfig.contact.email}</span>
                        </a>
                        <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-stone-200 hover:shadow-md transition-shadow">
                          <span style={{ color: "var(--color-primary)" }}>📞</span>
                          <span className="font-bold text-stone-900">{siteConfig.contact.phone}</span>
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
