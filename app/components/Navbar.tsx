"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Package, Info, ShoppingBag, Phone, Menu, X, Star, Settings, Heart } from "lucide-react";
import { siteConfig, navLinks } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const mobileLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Products", href: "/#products", icon: Package },
  { label: "Shop", href: "/shop", icon: ShoppingBag },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Phone },
];

const sidebarLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop", href: "/shop", icon: ShoppingBag },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "About", href: "/about", icon: Info },
  { label: "Products", href: "/#products", icon: Package },
  { label: "Benefits", href: "/#benefits", icon: Star },
  { label: "Contact", href: "/contact", icon: Phone },
];

export default function Navbar() {
  const { openCart, totalItems } = useCart();
  const { wishlist } = useWishlist();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) setActiveHash(id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll("section[id], footer[id], div[id]");
    sections.forEach((section) => observer.observe(section));

    if (window.location.hash) {
      setActiveHash(window.location.hash.replace("#", ""));
    } else if (window.scrollY === 0) {
      setActiveHash("");
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const getIsActive = (href: string) => {
    if (href.startsWith("/#")) {
      const hash = href.replace("/#", "");
      return pathname === "/" && activeHash === hash;
    }
    if (href === "/") return pathname === "/" && !activeHash;
    return pathname.startsWith(href) && href !== "/";
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveHash("");
      setMobileMenuOpen(false);
      return;
    }
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const hash = href.replace("/", "");
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", hash);
      }
      setMobileMenuOpen(false);
      return;
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop floating pill / Mobile top bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:top-5 md:left-1/2 md:-translate-x-1/2 md:w-[95%] lg:w-[85%] md:max-w-6xl md:rounded-full ${scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg border-b md:border border-stone-200/50"
          : "bg-white/70 md:bg-white/80 backdrop-blur-md md:shadow-md border-b md:border border-transparent md:border-stone-100"
          }`}
      >
        <div className="px-4 sm:px-6 md:px-5 lg:px-6">
          <div className="flex items-center justify-between h-16 md:h-[70px] gap-4">

            {/* Logo */}
            <Link
              href="/"
              onClick={(e) => handleLinkClick(e, "/")}
              className="flex items-center gap-3 group shrink-0"
            >
              {siteConfig.logoSrc ? (
                <div className="relative w-10 h-10 md:w-11 md:h-11">
                  <Image
                    src={siteConfig.logoSrc}
                    alt={siteConfig.name}
                    fill
                    sizes="44px"
                    priority
                    className="object-contain"
                  />
                </div>
              ) : (
                <div
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center font-extrabold text-lg text-white shadow-lg group-hover:shadow-primary/40 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))" }}
                >
                  {siteConfig.name.charAt(0)}
                </div>
              )}
              <div className="hidden sm:block leading-none">
                <span
                  className="font-extrabold text-base lg:text-lg text-stone-900 block transition-colors"
                >
                  {siteConfig.name}
                </span>
                <span
                  className="text-[10px] font-bold tracking-widest uppercase"
                  style={{ color: "var(--color-primary)" }}
                >
                  {siteConfig.tagline}
                </span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex flex-1 justify-center items-center">
              <div className="flex items-center gap-2 lg:gap-3 bg-stone-100/50 rounded-full p-1.5 border border-stone-200/50 shadow-inner">
                {navLinks.map((link) => {
                  const isActive = getIsActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`px-4 lg:px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ease-out select-none ${isActive
                        ? "bg-white shadow-sm ring-1 ring-black/5 scale-[1.02]"
                        : "text-stone-500 hover:text-stone-900 hover:bg-black/5 hover:scale-[1.02]"
                        }`}
                      style={isActive ? { color: "var(--color-primary)" } : {}}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop CTA & Mobile Hamburger */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
              {/* Shop Now CTA */}
              <Link
                href="/shop"
                className="hidden xl:flex items-center gap-2 text-white px-5 lg:px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 group"
                style={{
                  background: "linear-gradient(to right, var(--color-primary), var(--color-primary-dark))",
                  boxShadow: "0 4px 20px color-mix(in srgb, var(--color-primary) 35%, transparent)",
                }}
              >
                <ShoppingBag className="w-4 h-4 group-hover:-rotate-12 transition-transform duration-300" />
                <span className="whitespace-nowrap">Shop Now</span>
              </Link>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="relative p-2 text-stone-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors active:scale-95 hidden sm:flex items-center justify-center"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={openCart}
                className="relative p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors active:scale-95 flex items-center justify-center cursor-pointer"
                style={{ ["--tw-text-opacity" as string]: "1" }}
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button
                className="lg:hidden p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors active:scale-95 flex items-center justify-center cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className={`pt-24 px-6 space-y-3 transition-transform duration-500 delay-75 ${mobileMenuOpen ? "translate-y-0" : "translate-y-8"
            }`}
        >
          {sidebarLinks.map((link) => {
            const isActive = getIsActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center gap-4 text-2xl font-extrabold pb-4 border-b border-stone-100 transition-colors text-stone-700 hover:text-stone-900 group"
                style={isActive ? { color: "var(--color-primary)" } : {}}
              >
                <div
                  className={`p-2 rounded-xl transition-colors ${isActive ? "bg-[var(--color-primary)]/10" : "bg-stone-50 group-hover:bg-stone-100"}`}
                >
                  <Icon className="w-6 h-6" style={isActive ? { color: "var(--color-primary)" } : {}} />
                </div>
                {link.label}
              </Link>
            );
          })}
          <div className="pt-6 pb-24">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 text-white px-6 py-4 rounded-full font-bold w-full text-lg shadow-lg active:scale-95 transition-all"
              style={{ background: "var(--color-primary)" }}
            >
              <ShoppingBag className="w-5 h-5" />
              Visit Shop
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, delay: 0.3 }}
        className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-stone-200/60 z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      >
        <div className="flex items-center justify-around px-2 h-[68px]">
          {mobileLinks.map((link) => {
            const isActive = getIsActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                className="flex flex-col items-center justify-center w-[20%] pt-1 pb-1 relative group"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {isActive && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-b-full shadow-md transition-all duration-300"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                )}
                <div
                  className={`p-1.5 rounded-xl transition-all duration-300 ease-out ${isActive ? "scale-110 mb-0.5" : "text-stone-500 group-hover:text-stone-800 group-hover:scale-105 group-hover:bg-black/5"
                    }`}
                >
                  <Icon
                    className="w-[22px] h-[22px] transition-colors duration-300"
                    style={isActive ? { color: "var(--color-primary)" } : {}}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                <span
                  className={`text-[10px] font-bold tracking-tight transition-all duration-300 ${isActive ? "translate-y-0" : "text-stone-500 -translate-y-0.5"
                    }`}
                  style={isActive ? { color: "var(--color-primary)" } : {}}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
