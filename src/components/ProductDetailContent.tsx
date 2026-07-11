"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/useTranslation";
import { products } from "@/lib/products";
import type { Product } from "@/lib/products";

const categorySpecs: Record<string, { label: string; value: string }[]> = {
  Insecticide: [
    { label: "Type", value: "Broad-spectrum Insecticide" },
    { label: "Target Pests", value: "Aphids, Jassids, Whitefly, Thrips, Bollworms" },
    { label: "Target Crops", value: "Cotton, Vegetables, Rice, Maize" },
    { label: "Application", value: "Foliar spray during early infestation" },
    { label: "Formulation", value: "Suspension Concentrate (SC)" },
    { label: "Safety Period", value: "7–14 days PHI" },
  ],
  Herbicide: [
    { label: "Type", value: "Selective / Non-Selective Herbicide" },
    { label: "Target Weeds", value: "Broadleaf & Grassy Weeds" },
    { label: "Target Crops", value: "Wheat, Rice, Maize" },
    { label: "Application", value: "Pre- or post-emergence spray" },
    { label: "Formulation", value: "Emulsifiable Concentrate (EC)" },
    { label: "Safety Period", value: "14+ days PHI" },
  ],
  Fungicide: [
    { label: "Type", value: "Systemic / Contact Fungicide" },
    { label: "Target Diseases", value: "Powdery Mildew, Rust, Blight" },
    { label: "Target Crops", value: "Wheat, Maize, Vegetables, Fruits" },
    { label: "Application", value: "Foliar spray at first sign of disease" },
    { label: "Formulation", value: "Wettable Powder (WP)" },
    { label: "Safety Period", value: "10–14 days PHI" },
  ],
};

const defaultSpecs = [
  { label: "Type", value: "Formulated Pesticide" },
  { label: "Application", value: "As per label instructions" },
  { label: "Safety Period", value: "Refer to product label" },
];

export default function ProductDetailContent({ product }: { product: Product }) {
  const { language } = useTranslation();
  const isUrdu = language === "ur";
  const [zoomed, setZoomed] = useState(false);

  const name = isUrdu ? product.nameUr : product.nameEn;
  const category = isUrdu ? product.categoryUr : product.categoryEn;
  const description = isUrdu ? product.descriptionUr : product.descriptionEn;
  const highlights = isUrdu ? product.highlightsUr : product.highlightsEn;

  const specs = categorySpecs[product.categoryEn] || defaultSpecs;

  const related = products
    .filter((p) => p.categoryEn === product.categoryEn && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-brand-cream">
      {/* Hero */}
      <section className="relative pt-28 pb-12 lg:pt-36 lg:pb-20 overflow-hidden bg-gradient-to-br from-brand-dark-green/5 via-white to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-brand-charcoal/40 hover:text-brand-dark-green transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {isUrdu ? "مصنوعات پر واپس جائیں" : "Back to Products"}
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div
                className="relative aspect-square rounded-[32px] overflow-hidden bg-gradient-to-br from-brand-cream via-white to-brand-wheat-gold/5 border border-brand-dark-green/5 cursor-zoom-in group"
                onClick={() => setZoomed(!zoomed)}
              >
                <Image
                  src={product.imageUrl}
                  alt={name}
                  fill
                  className={`object-contain p-6 sm:p-10 lg:p-14 transition-all duration-700 ${
                    zoomed ? "scale-150" : "group-hover:scale-105"
                  }`}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5" />
              </div>
              <div className="mt-4 flex gap-3">
                <span className="inline-block rounded-full bg-brand-dark-green/10 px-4 py-2 text-xs font-medium text-brand-dark-green">
                  {isUrdu ? "زوم کرنے کے لیے کلک کریں" : "Click to zoom"}
                </span>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div>
                <span className="inline-block rounded-full bg-brand-dark-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-dark-green mb-4">
                  {category}
                </span>
                <h1 className="text-3xl lg:text-5xl font-bold text-brand-dark-green font-fraunces leading-tight">
                  {name}
                </h1>
              </div>

              <p className="text-brand-charcoal/60 leading-relaxed text-base lg:text-lg">
                {description}
              </p>

              <div>
                <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-brand-wheat-gold mb-4">
                  {isUrdu ? "فوائد" : "Key Benefits"}
                </h3>
                <ul className="space-y-3">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-brand-charcoal/70">
                      <svg className="w-5 h-5 text-brand-dark-green shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specs */}
              <div className="rounded-2xl bg-white border border-brand-dark-green/5 p-6 lg:p-8">
                <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-brand-wheat-gold mb-5">
                  {isUrdu ? "تکنیکی معلومات" : "Technical Specifications"}
                </h3>
                <div className="space-y-4">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between items-baseline pb-3 border-b border-brand-dark-green/5 last:border-0 last:pb-0">
                      <span className="text-sm text-brand-charcoal/50">{spec.label}</span>
                      <span className="text-sm font-medium text-brand-charcoal text-right max-w-[60%]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-dark-green px-8 py-4 text-sm font-bold text-white transition-all hover:bg-brand-dark-green/90 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-brand-dark-green/20"
              >
                {isUrdu ? "آرڈر کریں" : "Inquire About This Product"}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-20 lg:py-28 bg-white border-t border-brand-dark-green/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-brand-dark-green font-fraunces mb-10">
              {isUrdu ? "متعلقہ مصنوعات" : "Related Products"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rp, i) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={`/products/${rp.slug}`}
                    className="group block rounded-2xl border border-brand-dark-green/5 overflow-hidden transition-all duration-500 hover:shadow-[0_15px_40px_-10px_rgba(27,94,32,0.12)] hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-cream to-white">
                      <Image
                        src={rp.imageUrl}
                        alt={isUrdu ? rp.nameUr : rp.nameEn}
                        fill
                        className="object-contain p-3 sm:p-6 transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-brand-charcoal/40 uppercase tracking-wider font-medium mb-1">
                        {isUrdu ? rp.categoryUr : rp.categoryEn}
                      </p>
                      <h3 className="font-bold text-brand-dark-green font-fraunces text-sm">
                        {isUrdu ? rp.nameUr : rp.nameEn}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
