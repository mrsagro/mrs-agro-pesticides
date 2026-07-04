"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/useTranslation";
import type { Product } from "@/lib/products";

export default function ProductDetailContent({
  product,
}: {
  product: Product;
}) {
  const { t, language } = useTranslation();
  const dir = language === "ur" ? "rtl" : "ltr";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12" dir={dir}>
      <Link
        href="/products"
        className="mb-8 inline-block text-sm text-brand-orange hover:underline"
      >
        {t("products.backToProducts")}
      </Link>

      <div className="overflow-hidden rounded-xl bg-brand-cream shadow-md">
        <div className="relative aspect-[16/9] w-full bg-gray-200">
          <Image
            src={product.imageUrl}
            alt={language === "en" ? product.nameEn : product.nameUr}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-8">
          <h1 className="mb-4 text-3xl font-bold text-brand-dark-green">
            {language === "en" ? product.nameEn : product.nameUr}
          </h1>

          <p className="mb-6 text-lg text-brand-charcoal/70">
            <span className="font-semibold text-brand-dark-green">
              {t("products.varietyLabel")}:
            </span>{" "}
            {language === "en" ? product.varietyEn : product.varietyUr}
          </p>

          <p className="text-base leading-relaxed text-brand-charcoal/80">
            {language === "en" ? product.descriptionEn : product.descriptionUr}
          </p>
        </div>
      </div>
    </div>
  );
}
