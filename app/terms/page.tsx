import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { siteConfig } from "@/config/site";
import { Scale } from "lucide-react";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Terms and conditions of use for ${siteConfig.name}`,
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-surface-alt)" }}>
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div
          className="pt-32 pb-16 px-4 text-center text-white"
          style={{ backgroundColor: "var(--color-primary-dark)" }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl mb-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
              <Scale className="w-8 h-8 relative z-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-white/80 text-lg">
              Effective Date: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-stone-200 prose prose-stone max-w-none prose-headings:font-extrabold prose-h2:text-2xl prose-h2:text-stone-900 prose-a:text-[var(--color-primary)]">
            <p className="lead text-xl text-stone-600 mb-10 border-l-4 pl-6" style={{ borderColor: "var(--color-primary)" }}>
              Welcome to {siteConfig.name}. By accessing this website, you agree to be bound by these Terms of Service.
            </p>

            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing and using this website ({siteConfig.url}), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement.
            </p>

            <h2>2. License and Site Access</h2>
            <p>
              {siteConfig.name} grants you a limited license to access and make personal use of this site and not to download (other than page caching) or modify it, or any portion of it, except with express written consent of {siteConfig.name}. This license does not include any resale or commercial use of this site or its contents; any collection and use of any product listings, descriptions, or prices; any derivative use of this site or its contents; or any use of data mining, robots, or similar data gathering and extraction tools.
            </p>

            <h2>3. Intellectual Property</h2>
            <p>
              The Site and its original content, features, and functionality are owned by {siteConfig.name} and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>

            <h2>4. Product Descriptions & Warranties</h2>
            <p>
              {siteConfig.name} attempts to be as accurate as possible. However, {siteConfig.name} does not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free.
            </p>

            <h2>5. Disclaimer of Warranties and Limitation of Liability</h2>
            <p>
              THIS SITE IS PROVIDED BY {siteConfig.name} ON AN "AS IS" AND "AS AVAILABLE" BASIS. {siteConfig.name} MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THIS SITE OR THE INFORMATION, CONTENT, MATERIALS, OR PRODUCTS INCLUDED ON THIS SITE.
            </p>

            <h2>6. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of our jurisdiction, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>

            <h2>7. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. We will make reasonable efforts to provide notice prior to any new terms taking effect.
            </p>

            <h2>8. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <ul className="list-none pl-0 mt-4 space-y-2">
              <li><strong>Email:</strong> <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></li>
              <li><strong>Phone:</strong> <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a></li>
              <li><strong>Address:</strong> {siteConfig.contact.address}</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
