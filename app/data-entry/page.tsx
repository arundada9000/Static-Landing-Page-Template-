"use client";

import { useState, useEffect } from "react";
import {
  Plus, Trash2, Download, Copy, Mail, MessageSquare,
  Eye, EyeOff, Package, Edit3, Check, X, Image as ImageIcon,
  Tag, Layers, DollarSign, AlignLeft, Info, ExternalLink,
  AlertCircle, Sparkles, Save, Settings2, Send, Lock,
} from "lucide-react";
import { allProducts } from "../data/allProducts";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductOption {
  id: string;
  name: string;
  choices: string[]; // stored as comma-separated string in form
}

interface FormProduct {
  uid: string; // internal ui id
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: string;
  originalPrice: string;
  images: string[];
  category: string;
  customCategory: string;
  tags: string;
  badge: string;
  customBadge: string;
  features: string[];
  options: { id: string; name: string; choices: string }[];
  active: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_CATEGORIES = ["Watches", "Accessories", "Bags", "Apparel", "Electronics", "Food", "Beauty", "Sports", "Other"];
const DEFAULT_BADGES = ["", "Bestseller", "New", "Sale", "Limited", "Trending", "Custom…"];
const STORAGE_KEY = "sajilo_data_entry_v1";
const DEFAULT_EMAIL = "arunneupane0000@gmail.com";
const DEFAULT_WHATSAPP = "9779811420975"; // +977-9811420975

function makeUid() {
  return Math.random().toString(36).slice(2, 10);
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function emptyProduct(): FormProduct {
  return {
    uid: makeUid(),
    id: "",
    name: "",
    shortDescription: "",
    longDescription: "",
    price: "",
    originalPrice: "",
    images: [""],
    category: "Accessories",
    customCategory: "",
    tags: "",
    badge: "",
    customBadge: "",
    features: [""],
    options: [],
    active: true,
  };
}

// ─── TypeScript generator ─────────────────────────────────────────────────────

function generateTS(products: FormProduct[], currency: string, categories: string[], domain: string, passcode: string): string {
  const allCats = ["All", ...categories.filter(Boolean)];
  const catList = allCats.map((c) => `  "${c}"`).join(",\n");

  const productBlocks = products
    .map((p, i) => {
      const effectiveCategory = p.category === "Other" ? p.customCategory || "Other" : p.category;
      const effectiveBadge = p.badge === "Custom…" ? p.customBadge : p.badge;
      const images = p.images.filter(Boolean);
      const tags = p.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const features = p.features.filter(Boolean);
      const price = parseFloat(p.price) || 0;
      const originalPrice = parseFloat(p.originalPrice);

      const lines: string[] = [];
      lines.push(`  // ── ${i + 1} ${"─".repeat(68)}`);
      lines.push(`  {`);
      lines.push(`    id: "${p.id || slugify(p.name) || "product-" + (i + 1)}",`);
      lines.push(`    name: "${escape(p.name)}",`);
      lines.push(`    shortDescription:`);
      lines.push(`      "${escape(p.shortDescription)}",`);
      lines.push(`    longDescription:`);
      lines.push(`      "${escape(p.longDescription)}",`);
      lines.push(`    price: ${price},`);
      if (!isNaN(originalPrice) && originalPrice > 0) {
        lines.push(`    originalPrice: ${originalPrice},`);
      }
      lines.push(`    images: [`);
      images.forEach((img) => lines.push(`      "${img}",`));
      if (images.length === 0) lines.push(`      "",`);
      lines.push(`    ],`);
      lines.push(`    category: "${effectiveCategory}",`);
      if (effectiveBadge) lines.push(`    badge: "${effectiveBadge}",`);
      if (tags.length > 0) {
        lines.push(`    tags: [${tags.map((t) => `"${t}"`).join(", ")}],`);
      }
      if (features.length > 0) {
        lines.push(`    features: [`);
        features.forEach((f) => lines.push(`      "${escape(f)}",`));
        lines.push(`    ],`);
      }
      const validOptions = p.options.filter((o) => o.name && o.choices.trim());
      if (validOptions.length > 0) {
        lines.push(`    options: [`);
        validOptions.forEach((opt) => {
          const choices = opt.choices
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean);
          const optId = opt.id || slugify(opt.name);
          lines.push(`      {`);
          lines.push(`        id: "${optId}",`);
          lines.push(`        name: "${escape(opt.name)}",`);
          lines.push(`        choices: [${choices.map((c) => `"${escape(c)}"`).join(", ")}],`);
          lines.push(`      },`);
        });
        lines.push(`    ],`);
      }
      if (p.active === false) lines.push(`    active: false,`);
      lines.push(`  },`);
      return lines.join("\n");
    })
    .join("\n\n");

  return `// Sent by: ${passcode}\n// Origin: ${domain}\n\n[\n${productBlocks}\n]`;
}

function escape(str: string) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ImageUrlInput({
  value,
  onChange,
  onRemove,
  index,
  isOnly,
}: {
  value: string;
  onChange: (v: string) => void;
  onRemove: () => void;
  index: number;
  isOnly: boolean;
}) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.trim();
    // Auto-convert Cloudinary console thumbnail URLs to public delivery URLs
    const cloudinaryRegex = /^https:\/\/res-console\.cloudinary\.com\/([^\/]+)\/thumbnails\/transform\/v1\/image\/upload\/[^\/]+\/v1\/([^\/]+)(?:\/.*)?$/;
    const match = val.match(cloudinaryRegex);
    if (match) {
      try {
        const cloudName = match[1];
        const publicId = atob(match[2]);
        val = `https://res.cloudinary.com/${cloudName}/image/upload/v1/${publicId}`;
      } catch {
        // ignore errors
      }
    }
    onChange(val);
  };

  return (
    <div className="flex gap-2 items-start">
      <div className="flex-1 space-y-1">
        <div className="relative">
          <input
            type="url"
            value={value}
            onChange={handleChange}
            placeholder={`Image ${index + 1} URL — e.g. https://images.unsplash... or Cloudinary console URL`}
            className="w-full px-3 py-2.5 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 pr-10"
          />
          {value && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isValid === true && <Check className="w-4 h-4 text-emerald-500" />}
              {isValid === false && <AlertCircle className="w-4 h-4 text-rose-400" />}
            </div>
          )}
        </div>
        {value && (
          <div className="rounded-xl overflow-hidden border border-stone-100 bg-stone-50 h-20">
            <img
              src={value}
              alt="preview"
              className="w-full h-full object-cover"
              onLoad={() => setIsValid(true)}
              onError={() => setIsValid(false)}
            />
          </div>
        )}
      </div>
      {!isOnly && (
        <button
          type="button"
          onClick={onRemove}
          className="mt-1 p-2 text-rose-400 hover:bg-rose-50 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

function SectionHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
        style={{ background: "var(--color-primary)" }}
      >
        {icon}
      </div>
      <span className="font-bold text-stone-700 text-sm uppercase tracking-widest">{label}</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DataEntryPage() {
  const [products, setProducts] = useState<FormProduct[]>([]);
  const [current, setCurrent] = useState<FormProduct>(emptyProduct());
  const [editingUid, setEditingUid] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currency, setCurrency] = useState("NPR ");
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [agencyEmail, setAgencyEmail] = useState(DEFAULT_EMAIL);
  const [agencyWhatsapp, setAgencyWhatsapp] = useState(DEFAULT_WHATSAPP);
  const [showSettings, setShowSettings] = useState(false);

  // New Passcode States
  const [passcode, setPasscode] = useState("");
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<"copy" | "download" | "email" | "whatsapp" | null>(null);

  const allCategories = [...DEFAULT_CATEGORIES, ...customCategories.filter(
    (c) => !DEFAULT_CATEGORIES.includes(c)
  )];

  // ── Persist ──────────────────────────────────────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { products: p, currency: c, customCategories: cc, agencyEmail: ae, agencyWhatsapp: aw } = JSON.parse(saved);
        if (p && p.length > 0) {
          setProducts(p);
        } else {
          // Preload from allProducts map if empty
          const mapped = allProducts.map(prod => ({
            ...emptyProduct(),
            ...prod,
            uid: makeUid(),
            options: (prod.options || []).map(opt => ({ ...opt, choices: opt.choices.join(", ") })),
            features: prod.features || [""],
            images: prod.images || [""],
            tags: (prod.tags || []).join(", "),
            price: prod.price.toString(),
            originalPrice: prod.originalPrice ? prod.originalPrice.toString() : "",
          }));
          setProducts(mapped as unknown as FormProduct[]);
        }
        if (c) setCurrency(c);
        if (cc) setCustomCategories(cc);
        if (ae) setAgencyEmail(ae);
        if (aw) setAgencyWhatsapp(aw);
      } else {
        // Preload completely fresh
        const mapped = allProducts.map(prod => ({
          ...emptyProduct(),
          ...prod,
          uid: makeUid(),
          options: (prod.options || []).map(opt => ({ ...opt, choices: opt.choices.join(", ") })),
          features: prod.features || [""],
          images: prod.images || [""],
          tags: (prod.tags || []).join(", "),
          price: prod.price.toString(),
          originalPrice: prod.originalPrice ? prod.originalPrice.toString() : "",
        }));
        setProducts(mapped as unknown as FormProduct[]);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ products, currency, customCategories, agencyEmail, agencyWhatsapp }));
    } catch { /* ignore */ }
  }, [products, currency, customCategories, agencyEmail, agencyWhatsapp]);

  // ── Toast helper ──────────────────────────────────────────────────────────
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // ── Auto-slug name → id ───────────────────────────────────────────────────
  const handleNameChange = (name: string) => {
    setCurrent((prev) => ({
      ...prev,
      name,
      id: editingUid ? prev.id : slugify(name),
    }));
  };

  // ── Validate current product ──────────────────────────────────────────────
  const validate = (): string | null => {
    if (!current.name.trim()) return "Product name is required.";
    if (!current.shortDescription.trim()) return "Short description is required.";
    if (!current.price || isNaN(parseFloat(current.price))) return "A valid price is required.";
    if (current.images.filter(Boolean).length === 0) return "At least one image URL is required.";
    return null;
  };

  // ── Save product ──────────────────────────────────────────────────────────
  const saveProduct = () => {
    const err = validate();
    if (err) { showToast("⚠️ " + err); return; }

    const finalProduct = {
      ...current,
      id: current.id || slugify(current.name),
    };

    if (editingUid) {
      setProducts((prev) => prev.map((p) => (p.uid === editingUid ? finalProduct : p)));
      setEditingUid(null);
    } else {
      setProducts((prev) => [...prev, finalProduct]);
    }

    // Add custom category if needed
    const effectiveCat = current.category === "Other"
      ? current.customCategory
      : current.category;
    if (effectiveCat && !allCategories.includes(effectiveCat)) {
      setCustomCategories((prev) => [...prev, effectiveCat]);
    }

    setCurrent(emptyProduct());
    showToast(editingUid ? "✅ Product updated!" : "✅ Product added!");
  };

  // ── Edit product ──────────────────────────────────────────────────────────
  const editProduct = (uid: string) => {
    const p = products.find((x) => x.uid === uid);
    if (!p) return;
    setCurrent(p);
    setEditingUid(uid);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Delete product ────────────────────────────────────────────────────────
  const deleteProduct = (uid: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setProducts((prev) => prev.filter((p) => p.uid !== uid));
    if (editingUid === uid) { setEditingUid(null); setCurrent(emptyProduct()); }
    showToast("🗑️ Product removed.");
  };

  // ── Cancel edit ───────────────────────────────────────────────────────────
  const cancelEdit = () => { setEditingUid(null); setCurrent(emptyProduct()); };

  // ── Export Actions with Passcode Check ────────────────────────────────────
  const executeExport = (action: "copy" | "download" | "email" | "whatsapp") => {
    const domain = typeof window !== "undefined" ? window.location.hostname : "unknown";
    const generatedCode = generateTS(products, currency, allCategories.filter((c) => c !== "All"), domain, passcode);

    if (action === "copy") {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast("📋 Copied to clipboard!");
    } else if (action === "download") {
      const blob = new Blob([generatedCode], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "product-data.ts";
      a.click();
      URL.revokeObjectURL(url);
      showToast("⬇️ product-data.ts downloaded!");
    } else if (action === "email") {
      const subject = `Product Data from ${domain} — ${products.length} Products`;
      const pageUrl = window.location.href;
      const body = `Hello SajiloDigital,\n\nVerified Code: ${passcode}\nOrigin: ${domain}\n\nPlease find my product catalog below, generated from ${pageUrl}.\n\nCopy the array below into your project:\n\n---\n\n${generatedCode}`;
      window.open(`mailto:${agencyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
    } else if (action === "whatsapp") {
      const phone = agencyWhatsapp.replace(/[^0-9]/g, "");
      const pageUrl = window.location.href;
      const msg =
        `*Update from ${domain}*\nVerified Passcode: ${passcode}\n\n` +
        `Hello! 👋 I've mapped out my product catalog using the template tool.\n\n` +
        `🔗 *Tool URL:* ${pageUrl}\n\n` +
        `📦 *${products.length} Products Below:*\n\n${generatedCode}`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
    }

    setShowPasscodeModal(false);
    setPendingAction(null);
  };

  const requirePasscodeAndExecute = (action: "copy" | "download" | "email" | "whatsapp") => {
    if (!passcode.trim()) {
      setPendingAction(action);
      setShowPasscodeModal(true);
    } else {
      executeExport(action);
    }
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      showToast("⚠️ Secret Code cannot be empty");
      return;
    }
    if (pendingAction) {
      executeExport(pendingAction);
    }
  };

  // ── Image helpers ─────────────────────────────────────────────────────────
  const updateImage = (idx: number, val: string) => {
    setCurrent((prev) => {
      const imgs = [...prev.images];
      imgs[idx] = val;
      return { ...prev, images: imgs };
    });
  };
  const addImage = () => setCurrent((prev) => ({ ...prev, images: [...prev.images, ""] }));
  const removeImage = (idx: number) =>
    setCurrent((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));

  // ── Feature helpers ───────────────────────────────────────────────────────
  const updateFeature = (idx: number, val: string) => {
    setCurrent((prev) => {
      const fs = [...prev.features];
      fs[idx] = val;
      return { ...prev, features: fs };
    });
  };
  const addFeature = () => setCurrent((prev) => ({ ...prev, features: [...prev.features, ""] }));
  const removeFeature = (idx: number) =>
    setCurrent((prev) => ({ ...prev, features: prev.features.filter((_, i) => i !== idx) }));

  // ── Option helpers ────────────────────────────────────────────────────────
  const addOption = () =>
    setCurrent((prev) => ({
      ...prev,
      options: [...prev.options, { id: "", name: "", choices: "" }],
    }));
  const updateOption = (idx: number, key: "name" | "choices" | "id", val: string) =>
    setCurrent((prev) => {
      const opts = prev.options.map((o, i) => {
        if (i !== idx) return o;
        const updated = { ...o, [key]: val };
        if (key === "name" && !o.id) updated.id = slugify(val);
        return updated;
      });
      return { ...prev, options: opts };
    });
  const removeOption = (idx: number) =>
    setCurrent((prev) => ({ ...prev, options: prev.options.filter((_, i) => i !== idx) }));

  // ─────────────────────────────────────────────────────────────────────────

  const badgeToShow = current.badge === "Custom…" ? current.customBadge : current.badge;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-surface-alt)" }}>

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-30 shadow-lg"
        style={{ background: "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0 border border-white/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-extrabold text-sm leading-none">Product Data Entry</p>
              <p className="text-white/60 text-[10px] font-medium leading-none mt-0.5 truncate">
                SajiloDigital · {products.length} product{products.length !== 1 ? "s" : ""} added
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setShowPreview(!showPreview)}
              title={showPreview ? "Hide preview" : "Preview generated cards"}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold transition-all"
            >
              {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showPreview ? "Edit Form" : "Preview"}
            </button>

            <button
              onClick={() => requirePasscodeAndExecute("copy")}
              disabled={products.length === 0}
              title="Copy generated TypeScript"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 disabled:opacity-30 text-white text-xs font-bold transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{copied ? "Copied!" : "Copy"}</span>
            </button>

            <button
              onClick={() => requirePasscodeAndExecute("download")}
              disabled={products.length === 0}
              title="Download Product Data"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 disabled:opacity-30 text-white text-xs font-bold transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Download Data</span>
            </button>

            <div className="w-px h-4 bg-white/20" />

            <button
              onClick={() => requirePasscodeAndExecute("whatsapp")}
              disabled={products.length === 0}
              title="Send summary via WhatsApp"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg disabled:opacity-30 text-white text-xs font-bold transition-all hover:brightness-110 active:scale-95"
              style={{ background: "#25D366" }}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              onClick={() => requirePasscodeAndExecute("email")}
              disabled={products.length === 0}
              title="Email full file to agency"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg disabled:opacity-30 text-stone-900 text-xs font-bold transition-all hover:brightness-105 active:scale-95"
              style={{ background: "var(--color-accent)" }}
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Email</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-stone-900 text-white text-sm font-bold shadow-2xl animate-slide-up">
          {toast}
        </div>
      )}

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">

        {/* ── Left: Product List ── */}
        <aside className="lg:w-72 xl:w-80 shrink-0 space-y-4">
          {/* Global settings */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-stone-100 flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white" style={{ background: "var(--color-primary)" }}>
                <Settings2 className="w-3 h-3" />
              </div>
              <p className="text-xs font-bold text-stone-700 uppercase tracking-widest">Settings</p>
            </div>
            <div className="p-4 space-y-4">
              {/* Currency */}
              <div>
                <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-widest mb-1.5">Currency Symbol</label>
                <input
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none"
                  placeholder='e.g. "NPR " or "$ "'
                />
                <p className="text-[10px] text-stone-400 mt-1">Include trailing space if needed</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-stone-100" />

              {/* Agency contact — collapsible */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center justify-between w-full group"
                >
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Send To (Agency)</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${showSettings ? "bg-stone-200 text-stone-700" : "bg-stone-100 text-stone-500 group-hover:bg-stone-200"}`}>
                    {showSettings ? "Hide" : "Edit"}
                  </span>
                </button>

                {/* Always show current values */}
                {!showSettings && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                      <Mail className="w-3 h-3 shrink-0 text-stone-400" />
                      <span className="truncate font-medium">{agencyEmail}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                      <MessageSquare className="w-3 h-3 shrink-0 text-stone-400" />
                      <span className="truncate font-medium">+{agencyWhatsapp}</span>
                    </div>
                  </div>
                )}

                {showSettings && (
                  <div className="mt-3 space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-500 mb-1 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> Agency Email
                      </label>
                      <input
                        type="email"
                        value={agencyEmail}
                        onChange={(e) => setAgencyEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none font-mono"
                        placeholder="agency@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-500 mb-1 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" /> WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={agencyWhatsapp}
                        onChange={(e) => setAgencyWhatsapp(e.target.value)}
                        className="w-full px-3 py-2 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none font-mono"
                        placeholder="9779811420975"
                      />
                      <p className="text-[10px] text-stone-400 mt-1">Digits only, include country code</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowSettings(false)}
                      className="w-full py-1.5 text-[11px] font-bold text-white rounded-lg transition-all"
                      style={{ background: "var(--color-primary)" }}
                    >
                      Save Settings
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product list */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-stone-100 flex items-center justify-between">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Products</p>
              <span className="text-xs font-extrabold text-white px-2 py-0.5 rounded-full" style={{ background: "var(--color-primary)" }}>
                {products.length}
              </span>
            </div>

            {products.length === 0 ? (
              <div className="p-8 text-center text-stone-400">
                <Package className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-xs font-medium">No products yet.<br />Fill the form and click Add.</p>
              </div>
            ) : (
              <ul className="divide-y divide-stone-100 max-h-96 overflow-y-auto">
                {products.map((p) => (
                  <li
                    key={p.uid}
                    className={`flex items-center gap-3 p-3 hover:bg-stone-50 transition-colors ${editingUid === p.uid ? "bg-primary-50" : ""}`}
                    style={editingUid === p.uid ? { backgroundColor: "var(--color-primary-50)" } : {}}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                      {p.images[0] ? (
                        <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-4 h-4 text-stone-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-stone-900 truncate">{p.name || "Unnamed"}</p>
                      <p className="text-[11px] text-stone-400 truncate">{p.category} · {currency}{parseFloat(p.price || "0").toLocaleString()}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => editProduct(p.uid)} className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteProduct(p.uid)} className="p-1.5 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Image hosting tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-amber-800 mb-1">Free Image Hosting</p>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  This is a static site — paste a public image URL. Use these free hosts:
                </p>
                <ul className="mt-2 space-y-1">
                  {[
                    { name: "ImgBB (free)", url: "https://imgbb.com" },
                    { name: "Cloudinary (free tier)", url: "https://cloudinary.com" },
                    { name: "Unsplash (placeholder)", url: "https://unsplash.com" },
                  ].map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-900"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {s.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          {products.length > 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-stone-100 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white" style={{ background: "var(--color-primary)" }}>
                  <Send className="w-3 h-3" />
                </div>
                <p className="text-xs font-bold text-stone-700 uppercase tracking-widest">Send to Agency</p>
              </div>
              <div className="p-3 space-y-2">
                <button
                  onClick={() => requirePasscodeAndExecute("download")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))" }}
                >
                  <Download className="w-4 h-4" />
                  Download Data
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => requirePasscodeAndExecute("whatsapp")}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-white text-xs transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ background: "#25D366" }}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => requirePasscodeAndExecute("email")}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-stone-900 text-xs transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ background: "var(--color-accent)" }}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </button>
                </div>

                <p className="text-[10px] text-stone-400 text-center leading-relaxed pt-1">
                  WhatsApp sends a product summary · Email sends the full .ts file
                </p>
              </div>
            </div>
          )}
        </aside>

        {/* ── Right: Form / Preview ── */}
        <main className="flex-1 min-w-0">
          {showPreview ? (
            /* Card Grid Preview */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-stone-900">Live Card Preview</h2>
                  <p className="text-sm text-stone-500">How your products will look on the shop page</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-stone-400">
                    <p className="text-sm font-medium">No products added yet.</p>
                  </div>
                ) : (
                  products.map((p) => {
                    const badgeToShow = p.badge === "Custom…" ? p.customBadge : p.badge;
                    return (
                      <div key={p.uid} className="bg-white rounded-[1.5rem] overflow-hidden border border-stone-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                        <div className="relative aspect-[4/3] bg-stone-100">
                          {p.images[0] ? (
                            <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-10 h-10 text-stone-300" />
                            </div>
                          )}
                          {badgeToShow && (
                            <div className="absolute top-3 left-3 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-lg" style={{ background: "var(--color-primary)" }}>
                              {badgeToShow}
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-extrabold text-stone-900 text-base mb-1 line-clamp-2">{p.name || "Unnamed Product"}</h3>
                          <p className="text-stone-500 text-xs mb-3 line-clamp-2">{p.shortDescription || "No description provided."}</p>
                          <div className="flex items-center gap-3">
                            <span className="font-black text-sm text-white px-3 py-1 rounded-lg" style={{ background: "var(--color-primary)" }}>
                              {currency}{parseFloat(p.price || "0").toLocaleString()}
                            </span>
                            {p.originalPrice && (
                              <span className="text-xs text-stone-400 line-through">{currency}{parseFloat(p.originalPrice).toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            /* Product Form */
            <div className="space-y-6">
              {/* Form header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-stone-900">
                  {editingUid ? "✏️ Edit Product" : "➕ Add New Product"}
                </h2>
                {editingUid && (
                  <button onClick={cancelEdit} className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 font-bold transition-colors">
                    <X className="w-4 h-4" /> Cancel
                  </button>
                )}
              </div>

              {/* ── Section 1: Basic Info ── */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
                <SectionHeader icon={<Package className="w-3.5 h-3.5" />} label="Basic Info" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-stone-600 mb-1.5">Product Name *</label>
                    <input
                      value={current.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g. Signature Leather Watch"
                      className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1.5">
                      URL Slug (ID)
                      <span className="ml-1 text-stone-400 font-normal">(auto-filled)</span>
                    </label>
                    <input
                      value={current.id}
                      onChange={(e) => setCurrent((p) => ({ ...p, id: e.target.value }))}
                      placeholder="signature-leather-watch"
                      className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1.5">Category</label>
                    <select
                      value={current.category}
                      onChange={(e) => setCurrent((p) => ({ ...p, category: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none bg-white"
                    >
                      {allCategories.filter((c) => c !== "All").map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                      <option value="Other">+ Add New Category…</option>
                    </select>
                    {current.category === "Other" && (
                      <input
                        value={current.customCategory}
                        onChange={(e) => setCurrent((p) => ({ ...p, customCategory: e.target.value }))}
                        placeholder="Type custom category name"
                        className="w-full mt-2 px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1.5">Badge</label>
                    <select
                      value={current.badge}
                      onChange={(e) => setCurrent((p) => ({ ...p, badge: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-900 focus:outline-none bg-white"
                    >
                      <option value="">None</option>
                      {DEFAULT_BADGES.filter(Boolean).map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    {current.badge === "Custom…" && (
                      <input
                        value={current.customBadge}
                        onChange={(e) => setCurrent((p) => ({ ...p, customBadge: e.target.value }))}
                        placeholder="Type custom badge text"
                        className="w-full mt-2 px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={current.active}
                        onChange={(e) => setCurrent((p) => ({ ...p, active: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div
                        className="w-10 h-6 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                        style={{
                          backgroundColor: current.active ? "var(--color-primary)" : "#d1d5db",
                        }}
                      />
                    </label>
                    <span className="text-sm font-bold text-stone-700">
                      {current.active ? "Active (visible in shop)" : "Hidden (draft)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Section 2: Copy ── */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
                <SectionHeader icon={<AlignLeft className="w-3.5 h-3.5" />} label="Product Copy" />
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1.5">
                      Short Description * <span className="text-stone-400 font-normal">(shown on listing card)</span>
                    </label>
                    <input
                      value={current.shortDescription}
                      onChange={(e) => setCurrent((p) => ({ ...p, shortDescription: e.target.value }))}
                      placeholder="One compelling sentence about this product."
                      className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
                      maxLength={160}
                    />
                    <p className="text-[10px] text-stone-400 mt-1">{current.shortDescription.length}/160 characters</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1.5">
                      Long Description <span className="text-stone-400 font-normal">(full product detail page)</span>
                    </label>
                    <textarea
                      value={current.longDescription}
                      onChange={(e) => setCurrent((p) => ({ ...p, longDescription: e.target.value }))}
                      placeholder="Detailed product description. Talk about materials, construction, benefits, and what makes it special."
                      rows={5}
                      className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none resize-y"
                    />
                  </div>
                </div>
              </div>

              {/* ── Section 3: Pricing ── */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
                <SectionHeader icon={<DollarSign className="w-3.5 h-3.5" />} label="Pricing" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1.5">
                      Price * <span className="text-stone-400 font-normal">({currency.trim()})</span>
                    </label>
                    <input
                      type="number"
                      value={current.price}
                      onChange={(e) => setCurrent((p) => ({ ...p, price: e.target.value }))}
                      placeholder="5000"
                      min={0}
                      className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 mb-1.5">
                      Original Price <span className="text-stone-400 font-normal">(optional — shows as strikethrough)</span>
                    </label>
                    <input
                      type="number"
                      value={current.originalPrice}
                      onChange={(e) => setCurrent((p) => ({ ...p, originalPrice: e.target.value }))}
                      placeholder="7000"
                      min={0}
                      className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
                    />
                  </div>
                </div>
                {current.price && current.originalPrice && (
                  <div className="mt-3 flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <span className="font-black text-emerald-700">
                      {Math.round((1 - parseFloat(current.price) / parseFloat(current.originalPrice)) * 100)}% OFF
                    </span>
                    <span className="text-sm text-stone-500">
                      {currency}{parseFloat(current.originalPrice).toLocaleString()} → {currency}{parseFloat(current.price).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* ── Section 4: Images ── */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
                <SectionHeader icon={<ImageIcon className="w-3.5 h-3.5" />} label="Images (URLs)" />
                <div className="space-y-3 mb-4">
                  {current.images.map((img, idx) => (
                    <ImageUrlInput
                      key={idx}
                      value={img}
                      onChange={(v) => updateImage(idx, v)}
                      onRemove={() => removeImage(idx)}
                      index={idx}
                      isOnly={current.images.length === 1}
                    />
                  ))}
                </div>
                {current.images.length < 6 && (
                  <button
                    type="button"
                    onClick={addImage}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border border-dashed border-stone-300 text-stone-500 hover:border-stone-400 hover:text-stone-700 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add another image URL
                  </button>
                )}
                <p className="text-[11px] text-stone-400 mt-3">
                  💡 First image is the cover shown on listing cards. Upload to{" "}
                  <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="underline">ImgBB</a>{" "}
                  or{" "}
                  <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="underline">Cloudinary</a>{" "}
                  and paste the URL here.
                </p>
              </div>

              {/* ── Section 5: Features & Tags ── */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
                <SectionHeader icon={<Layers className="w-3.5 h-3.5" />} label="Features & Tags" />

                <div className="mb-5">
                  <label className="block text-xs font-bold text-stone-600 mb-2">
                    Bullet-Point Features <span className="text-stone-400 font-normal">(shown on detail page)</span>
                  </label>
                  <div className="space-y-2">
                    {current.features.map((f, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="w-5 h-5 rounded-full text-[10px] font-black text-white flex items-center justify-center mt-2.5 shrink-0" style={{ background: "var(--color-primary)" }}>
                          {idx + 1}
                        </span>
                        <input
                          value={f}
                          onChange={(e) => updateFeature(idx, e.target.value)}
                          placeholder={`Feature ${idx + 1} — e.g. "Scratch-resistant sapphire crystal"`}
                          className="flex-1 px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
                        />
                        {current.features.length > 1 && (
                          <button type="button" onClick={() => removeFeature(idx)} className="p-2 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors mt-0.5">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFeature}
                      className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border border-dashed border-stone-300 text-stone-500 hover:border-stone-400 hover:text-stone-700 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add feature
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1.5">
                    Tags <span className="text-stone-400 font-normal">(comma-separated chips on the listing)</span>
                  </label>
                  <input
                    value={current.tags}
                    onChange={(e) => setCurrent((p) => ({ ...p, tags: e.target.value }))}
                    placeholder='e.g. "Premium, Leather, Swiss-Made"'
                    className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
                  />
                  {current.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {current.tags.split(",").map((t) => t.trim()).filter(Boolean).map((t) => (
                        <span key={t} className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: "var(--color-primary-50)", color: "var(--color-primary)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Section 6: Variant Options ── */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
                <SectionHeader icon={<Tag className="w-3.5 h-3.5" />} label="Variant Options" />
                <p className="text-xs text-stone-500 mb-4 leading-relaxed">
                  Add options like Size, Color, Material etc. Each option shows a picker on the product detail page. Customer picks are included automatically in the WhatsApp order message.
                </p>

                {current.options.length === 0 ? (
                  <div className="text-center py-4 text-stone-400">
                    <p className="text-xs font-medium">No variants yet. Add one below.</p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-4">
                    {current.options.map((opt, idx) => (
                      <div key={idx} className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-stone-600 uppercase tracking-widest">Option {idx + 1}</span>
                          <button type="button" onClick={() => removeOption(idx)} className="p-1.5 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-stone-500 mb-1">Option Name</label>
                            <input
                              value={opt.name}
                              onChange={(e) => updateOption(idx, "name", e.target.value)}
                              placeholder='e.g. "Size" or "Color"'
                              className="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-stone-500 mb-1">Option ID</label>
                            <input
                              value={opt.id}
                              onChange={(e) => updateOption(idx, "id", e.target.value)}
                              placeholder="size"
                              className="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none bg-white font-mono"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-stone-500 mb-1">Choices (comma-separated)</label>
                          <input
                            value={opt.choices}
                            onChange={(e) => updateOption(idx, "choices", e.target.value)}
                            placeholder='e.g. "S, M, L, XL" or "Black, White, Navy"'
                            className="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none bg-white"
                          />
                          {opt.choices && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {opt.choices.split(",").map((c) => c.trim()).filter(Boolean).map((c) => (
                                <span key={c} className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-600">{c}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={addOption}
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border border-dashed border-stone-300 text-stone-500 hover:border-stone-400 hover:text-stone-700 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add variant option
                </button>
              </div>

              {/* ── Preview card ── */}
              {current.name && (
                <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">Card Preview</p>
                  <div className="max-w-xs rounded-[1.5rem] overflow-hidden border border-stone-200 shadow-sm">
                    <div className="relative aspect-[4/3] bg-stone-100">
                      {current.images[0] ? (
                        <img src={current.images[0]} alt={current.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-10 h-10 text-stone-300" />
                        </div>
                      )}
                      {badgeToShow && (
                        <div className="absolute top-3 left-3 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-lg" style={{ background: "var(--color-primary)" }}>
                          {badgeToShow}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-extrabold text-stone-900 text-base mb-1 line-clamp-2">{current.name}</h3>
                      <p className="text-stone-500 text-xs mb-3 line-clamp-2">{current.shortDescription}</p>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-sm text-white px-3 py-1 rounded-lg" style={{ background: "var(--color-primary)" }}>
                          {currency}{parseFloat(current.price || "0").toLocaleString()}
                        </span>
                        {current.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">{currency}{parseFloat(current.originalPrice).toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Save Button ── */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={saveProduct}
                  className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-extrabold text-white text-base shadow-xl transition-all hover:-translate-y-1"
                  style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))" }}
                >
                  {editingUid ? (
                    <><Save className="w-5 h-5" /> Update Product</>
                  ) : (
                    <><Plus className="w-5 h-5" /> Add to Product List</>
                  )}
                </button>
                {editingUid && (
                  <button type="button" onClick={cancelEdit} className="px-5 py-4 rounded-2xl font-bold text-stone-500 bg-white border border-stone-200 hover:bg-stone-50 transition-all">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Passcode Modal ── */}
      {showPasscodeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 animate-scale-in border border-stone-200">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-5 border border-rose-100">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-stone-900 mb-2">Security Check</h2>
            <p className="text-[13px] text-stone-500 mb-6 leading-relaxed">
              Please enter your Secret Passcode to securely export this catalog. We verify this code to block unauthorized changes.
            </p>
            <form onSubmit={handlePasscodeSubmit}>
              <input
                type="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 font-black tracking-widest text-center focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 mb-6 uppercase"
                placeholder="YOUR CODE"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPasscodeModal(false)}
                  className="flex-1 py-3 px-4 font-bold text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-stone-900 text-white font-extrabold rounded-xl hover:brightness-110 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
