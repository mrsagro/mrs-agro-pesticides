"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

type ProductItem = {
  id: string;
  slug: string;
  imageUrl: string;
  nameEn: string;
  nameUr: string;
  categoryEn: string;
  categoryUr: string;
  descriptionEn: string;
  descriptionUr: string;
  highlightsEn: string[];
  highlightsUr: string[];
};

export default function AdminProductsClient({
  products,
  categories,
}: {
  products: ProductItem[];
  categories: string[];
}) {
  const { language } = useLanguage();
  const isUrdu = language === "ur";
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [previewProduct, setPreviewProduct] = useState<ProductItem | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const nameMatch = p.nameEn.toLowerCase().includes(search.toLowerCase()) ||
        p.nameUr.includes(search);
      const catMatch = categoryFilter === "all" || p.categoryEn === categoryFilter;
      return nameMatch && catMatch;
    });
  }, [products, search, categoryFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--admin-text)" }}>
          {isUrdu ? "مصنوعات" : "Products"}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--admin-text-muted)" }}>
          {isUrdu ? `کل ${products.length} مصنوعات` : `${products.length} products in catalog (read-only)`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "var(--admin-text-muted)" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isUrdu ? "مصنوعات تلاش کریں..." : "Search products..."}
            className="w-full rounded-xl border px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: "var(--admin-input)",
              borderColor: "var(--admin-input-border)",
              color: "var(--admin-text)",
            }}
          />
        </div>

        <div className="flex rounded-xl border p-0.5" style={{ borderColor: "var(--admin-border)", backgroundColor: "var(--admin-surface)" }}>
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              categoryFilter === "all"
                ? "bg-emerald-600 text-white shadow-sm"
                : "hover:bg-[var(--admin-hover)]"
            }`}
            style={{ color: categoryFilter === "all" ? "#fff" : "var(--admin-text-secondary)" }}
          >
            {isUrdu ? "سب" : "All"} ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                categoryFilter === cat
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "hover:bg-[var(--admin-hover)]"
              }`}
              style={{ color: categoryFilter === cat ? "#fff" : "var(--admin-text-secondary)" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl" style={{ border: "1px solid var(--admin-border)", backgroundColor: "var(--admin-card)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}>
            <svg className="w-7 h-7" style={{ color: "var(--admin-text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <p className="text-sm font-medium" style={{ color: "var(--admin-text-secondary)" }}>
            {isUrdu ? "کوئی مصنوعات نہیں ملیں" : "No products found"}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--admin-text-muted)" }}>
            {isUrdu ? "اپنی تلاش یا فلٹر تبدیل کریں" : "Try adjusting your search or filter"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{
                backgroundColor: "var(--admin-card)",
                border: "1px solid var(--admin-border)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
              onClick={() => setPreviewProduct(product)}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-emerald-50 to-stone-50">
                <Image
                  src={product.imageUrl}
                  alt={product.nameEn}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
                {/* Category badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-sm shadow-sm"
                  style={{ color: "var(--admin-text-secondary)" }}
                >
                  {isUrdu ? product.categoryUr : product.categoryEn}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-bold truncate" style={{ color: "var(--admin-text)" }}>
                  {isUrdu ? product.nameUr : product.nameEn}
                </h3>
                <p className="text-xs mt-1.5 line-clamp-2 leading-relaxed" style={{ color: "var(--admin-text-muted)" }}>
                  {isUrdu ? product.descriptionUr : product.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewProduct(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl rounded-2xl overflow-hidden animate-scale-in"
            style={{
              backgroundColor: "var(--admin-card)",
              border: "1px solid var(--admin-border)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setPreviewProduct(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-xl flex items-center justify-center bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors text-white cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="h-64 md:h-full bg-gradient-to-br from-emerald-50 to-stone-50 relative p-8">
                <Image
                  src={previewProduct.imageUrl}
                  alt={previewProduct.nameEn}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Details */}
              <div className="p-6 overflow-y-auto max-h-[80vh]">
                <span
                  className="inline-flex px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider mb-3"
                  style={{ backgroundColor: "var(--admin-surface)", color: "var(--admin-text-secondary)", border: "1px solid var(--admin-border)" }}
                >
                  {isUrdu ? previewProduct.categoryUr : previewProduct.categoryEn}
                </span>

                <h2 className="text-xl font-bold mb-3" style={{ color: "var(--admin-text)" }}>
                  {isUrdu ? previewProduct.nameUr : previewProduct.nameEn}
                </h2>

                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--admin-text-secondary)" }}>
                  {isUrdu ? previewProduct.descriptionUr : previewProduct.descriptionEn}
                </p>

                {/* Highlights */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--admin-text-muted)" }}>
                    {isUrdu ? "خصوصیات" : "Key Highlights"}
                  </h4>
                  <ul className="space-y-1.5">
                    {(isUrdu ? previewProduct.highlightsUr : previewProduct.highlightsEn).map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--admin-text-secondary)" }}>
                        <svg className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
