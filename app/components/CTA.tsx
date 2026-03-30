import Link from "next/link";
import { Phone, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ctaContent } from "@/config/content";

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export default function CTA() {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    `Hi! I want to order from ${siteConfig.name}`
  )}`;
  const callHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

  return (
    <section
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-primary-dark)" }}
    >
      {/* Decorative glows */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-40"
        style={{ backgroundColor: "var(--color-primary)" }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25"
        style={{ backgroundColor: "var(--color-primary-light)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Badge */}
        <span
          className="inline-block text-xs font-bold tracking-widest uppercase mb-6 px-3 py-1 rounded-full border border-white/20"
          style={{ color: "var(--color-accent)", backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          {ctaContent.badge}
        </span>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          {ctaContent.headlineStart}{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-accent-light), var(--color-accent))",
            }}
          >
            {ctaContent.headlineHighlight}
          </span>
        </h2>

        <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          {ctaContent.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* WhatsApp */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-300 shadow-xl active:scale-95 w-full sm:w-auto justify-center"
          >
            <WhatsAppIcon />
            {ctaContent.whatsappBtnLabel}
          </a>

          {/* Shop */}
          <Link
            href={ctaContent.storeBtnHref}
            className="flex items-center gap-3 text-white border border-white/30 bg-white/10 hover:bg-white/20 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 active:scale-95 w-full sm:w-auto justify-center backdrop-blur-sm"
          >
            <ShoppingBag className="w-5 h-5" />
            {ctaContent.storeBtnLabel}
          </Link>

          {/* Call */}
          <a
            href={callHref}
            className="flex items-center gap-3 text-white border border-white/30 bg-white/10 hover:bg-white/20 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 active:scale-95 w-full sm:w-auto justify-center backdrop-blur-sm"
          >
            <Phone className="w-5 h-5" />
            {ctaContent.callBtnLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
