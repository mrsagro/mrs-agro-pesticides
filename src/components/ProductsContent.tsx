"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/useTranslation";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export default function ProductsContent({ products }: { products: Product[] }) {
  const { language } = useTranslation();
  const isUrdu = language === "ur";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-brand-cream">
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark-green/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-bold tracking-[0.2em] uppercase text-brand-wheat-gold mb-4"
          >
            {isUrdu ? "ہماری مصنوعات" : "Our Products"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl lg:text-6xl font-bold text-brand-dark-green font-fraunces leading-tight mb-6"
          >
            {isUrdu ? "اعلیٰ معیار کی زرعی مصنوعات" : "Premium Crop Protection"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-brand-charcoal/50 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {isUrdu
              ? "ہماری مصنوعات کی رینج دیکھیں، جو پاکستان کے متنوع زرعی علاقوں کے لیے تیار کی گئی ہیں۔"
              : "Explore our range of certified pesticide products, carefully formulated for Pakistan's diverse growing regions."}
          </motion.p>
        </div>
      </section>

      <section className="pb-28 lg:pb-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
