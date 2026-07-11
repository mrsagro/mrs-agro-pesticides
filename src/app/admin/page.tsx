import { products } from "@/lib/products";
import AdminDashboardClient from "./AdminDashboardClient";

function getCategoriesCount(): number {
  const uniqueCategories = new Set(products.map((p) => p.categoryEn));
  return uniqueCategories.size;
}

export default async function AdminDashboardPage() {
  const totalProducts = products.length;
  const totalCategories = getCategoriesCount();
  let totalSubmissions = 0;
  let totalFranchise = 0;
  let totalNewsletter = 0;
  let totalUnread = 0;
  let recentSubmissions: { id: number; type: "contact"; name: string; email: string; message: string; status: string; createdAt: string }[] = [];
  let recentFranchise: { id: number; type: "franchise"; name: string; phone: string; city: string; status: string; createdAt: string }[] = [];

  try {
    const { prisma } = await import("@/lib/prisma");
    totalSubmissions = await prisma.contactSubmission.count();
    totalFranchise = await prisma.franchiseSubmission.count();
    totalNewsletter = await prisma.newsletterSubscriber.count();
    const unreadSubmissions = await prisma.contactSubmission.count({
      where: { status: "new" },
    });
    const unreadFranchise = await prisma.franchiseSubmission.count({
      where: { status: "new" },
    });
    totalUnread = unreadSubmissions + unreadFranchise;

    const contactResults = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    recentSubmissions = contactResults.map((s) => ({
      id: s.id,
      type: "contact" as const,
      name: s.name,
      email: s.email,
      message: s.message,
      status: s.status,
      createdAt: s.createdAt.toISOString(),
    }));

    const franchiseResults = await prisma.franchiseSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    recentFranchise = franchiseResults.map((s) => ({
      id: s.id,
      type: "franchise" as const,
      name: s.name,
      phone: s.phone,
      city: s.city,
      status: s.status,
      createdAt: s.createdAt.toISOString(),
    }));
  } catch {
    console.warn("Database unavailable for admin dashboard");
  }

  return (
    <AdminDashboardClient
      totalProducts={totalProducts}
      totalCategories={totalCategories}
      totalInquiries={totalSubmissions}
      totalFranchise={totalFranchise}
      totalNewsletter={totalNewsletter}
      totalUnread={totalUnread}
      recentSubmissions={recentSubmissions}
      recentFranchise={recentFranchise}
    />
  );
}
