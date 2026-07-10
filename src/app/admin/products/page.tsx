import { products, type Product } from "@/lib/products";
import AdminProductsClient from "./AdminProductsClient";

export default function AdminProductsPage() {
  const uniqueCategories = [...new Set(products.map((p) => p.categoryEn))].sort();

  return (
    <AdminProductsClient
      products={products.map((p) => ({
        ...p,
        highlightsEn: [...p.highlightsEn],
        highlightsUr: [...p.highlightsUr],
      }))}
      categories={uniqueCategories}
    />
  );
}
