"use client";

import { useTranslation } from "@/lib/useTranslation";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export default function ProductsContent({ products }: { products: Product[] }) {
  const { t } = useTranslation();

  return (
    <div className="bg-brand-cream">
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-brand-dark-green md:text-5xl">
            {t("products.pageTitle")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-brand-charcoal/80">
            {t("products.pageSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
