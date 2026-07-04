"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/useTranslation";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const { t, language } = useTranslation();

  const isPlaceholder = product.imageUrl.includes("placeholder");

  return (
    <div className="group rounded-lg border border-brand-light-green/30 bg-brand-cream shadow-sm transition-shadow hover:shadow-md">
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-t-lg bg-gray-200">
        {isPlaceholder ? (
          <span className="px-4 text-center text-sm text-gray-500">
            {t("products.noImageText")}
          </span>
        ) : (
          <Image
            src={product.imageUrl}
            alt={language === "en" ? product.nameEn : product.nameUr}
            width={400}
            height={300}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-col p-5">
        <h3 className="mb-2 text-xl font-semibold text-brand-dark-green">
          {language === "en" ? product.nameEn : product.nameUr}
        </h3>

        <p className="mb-3 text-sm text-brand-charcoal/70">
          <span className="font-medium text-brand-dark-green">
            {t("products.varietyLabel")}:
          </span>{" "}
          {language === "en" ? product.varietyEn : product.varietyUr}
        </p>

        <p className="mb-4 text-sm leading-relaxed text-brand-charcoal/80">
          {language === "en" ? product.descriptionEn : product.descriptionUr}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="mt-auto inline-block self-start rounded bg-brand-orange px-5 py-2 text-sm font-medium text-brand-cream transition-colors hover:bg-brand-orange/90"
        >
          {t("products.viewDetailsButton")}
        </Link>
      </div>
    </div>
  );
}
