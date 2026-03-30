import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { siteConfig } from "@/config/site";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy Policy for ${siteConfig.name}`,
};

export default function PrivacyPage() {
  return (
    <div className="pt-10 min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-surface-alt)" }}>
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
              <ShieldAlert className="w-8 h-8 relative z-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Privacy Policy
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
              At {siteConfig.name}, we are committed to protecting your privacy and ensuring you have a positive experience on our website.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. We collect Device Information using the following technologies:
            </p>
            <ul>
              <li><strong>Cookies</strong> are data files that are placed on your device or computer and often include an anonymous unique identifier.</li>
              <li><strong>Log files</strong> track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Communicate with you and fulfill any orders or requests.</li>
              <li>Screen our orders for potential risk or fraud.</li>
              <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We share your Personal Information with third parties to help us use your Personal Information, as described above. We may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
            </p>

            <h2>4. Your Rights</h2>
            <p>
              If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              When you place an order or make an inquiry through the Site, we will maintain your Information for our records unless and until you ask us to delete this information.
            </p>

            <h2>6. Changes</h2>
            <p>
              We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <strong>{siteConfig.contact.email}</strong> or by mail using the details provided below:
            </p>
            <address className="not-italic opacity-80 mt-4 p-4 rounded-xl bg-stone-50 border border-stone-100">
              <strong>{siteConfig.name}</strong><br />
              {siteConfig.contact.address}<br />
              <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>
            </address>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
