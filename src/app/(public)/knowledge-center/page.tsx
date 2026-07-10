import type { Metadata } from "next";
import { KnowledgeCenterContent } from "@/components/KnowledgeCenterContent";

export const metadata: Metadata = {
  title: "Knowledge Center",
  description:
    "Expert insights, guides, and best practices for crop protection, pest management, and agricultural success in Pakistan.",
  openGraph: {
    title: "Knowledge Center | MRS Agro Chemicals",
    description:
      "Expert insights, guides, and best practices for crop protection, pest management, and agricultural success in Pakistan.",
    type: "website",
  },
};

export const revalidate = 60;

export default function KnowledgeCenterPage() {
  return <KnowledgeCenterContent />;
}
