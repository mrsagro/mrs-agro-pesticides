import type { Metadata } from "next";
import { products } from "@/lib/products";
import ProductsContent from "@/components/ProductsContent";

export const metadata: Metadata = {
  title: "Our Pesticide Varieties | MRS Agro Chemicals",
  description:
    "Browse MRS Agro Chemicals' range of premium certified Pesticide varieties including hybrid maize, wheat, cotton, and Super Basmati rice — selected for Pakistan's diverse growing regions.",
  openGraph: {
    title: "Our Pesticide Varieties | MRS Agro Chemicals",
    description:
      "Browse MRS Agro Chemicals' range of premium certified Pesticide varieties including hybrid maize, wheat, cotton, and Super Basmati rice.",
    type: "website",
  },
};

// This page is static (SSG) because product data is a local file.
// If products.ts is later replaced with a database or CMS fetch,
// add `export const revalidate = 3600` here to enable ISR (hourly
// regeneration) instead of requiring a full rebuild.
export default function ProductsPage() {
  return <ProductsContent products={products} />;
}
