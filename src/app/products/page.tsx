import { products } from "@/lib/products";
import ProductsContent from "@/components/ProductsContent";

export default function ProductsPage() {
  return <ProductsContent products={products} />;
}
