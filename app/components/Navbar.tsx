"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag } from "lucide-react";

const links = [
  { label: "Home",     href: "/" },
  { label: "Products", href: "/#products" },
  { label: "Benefits", href: "/#benefits" },
  { label: "Process",  href: "/#process" },
  { label: "Contact",  href: "/#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-md border-b border-stone-200"
          : "bg-white/80 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group py-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#296B46]/20 group-hover:ring-[#296B46]/50 transition-all duration-300">
              <Image
                src="/images/circular-logo.png"
                alt="Nepal Bamboo Salt"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block leading-tight">
              <span className="font-extrabold text-lg text-stone-900 block">Nepal Bamboo Salt</span>
              <span className="text-xs text-[#296B46] font-semibold tracking-widest uppercase">Pvt. Ltd.</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-[#296B46] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#296B46] rounded-full group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/shop"
              className="flex items-center gap-2 bg-[#296B46] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#1b4a30] transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 hover:text-[#296B46] transition-all"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-stone-200 px-4 py-6 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center px-4 py-3 rounded-xl text-stone-700 font-medium hover:bg-[#edf7f1] hover:text-[#296B46] transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-stone-200 mt-4">
            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#296B46] text-white px-6 py-3 rounded-full font-bold w-full hover:bg-[#1b4a30] transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              Visit Shop
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
