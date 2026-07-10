import { prisma } from "@/lib/prisma";
import { products } from "@/lib/products";
import AdminDashboardClient from "./AdminDashboardClient";

function getCategoriesCount(): number {
  const uniqueCategories = new Set(products.map((p) => p.categoryEn));
  return uniqueCategories.size;
}

export default async function AdminDashboardPage() {
  const totalSubmissions = await prisma.contactSubmission.count();
  const totalFranchise = await prisma.franchiseSubmission.count();
  const totalNewsletter = await prisma.newsletterSubscriber.count();
  const totalProducts = products.length;
  const totalCategories = getCategoriesCount();
  const unreadSubmissions = await prisma.contactSubmission.count({
    where: { status: "new" },
  });
  const unreadFranchise = await prisma.franchiseSubmission.count({
    where: { status: "new" },
  });
  const totalUnread = unreadSubmissions + unreadFranchise;

  const recentSubmissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  const recentFranchise = await prisma.franchiseSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <AdminDashboardClient
      totalProducts={totalProducts}
      totalCategories={totalCategories}
      totalInquiries={totalSubmissions}
      totalFranchise={totalFranchise}
      totalNewsletter={totalNewsletter}
      totalUnread={totalUnread}
      recentSubmissions={recentSubmissions.map((s) => ({
        id: s.id,
        type: "contact" as const,
        name: s.name,
        email: s.email,
        message: s.message,
        status: s.status,
        createdAt: s.createdAt.toISOString(),
      }))}
      recentFranchise={recentFranchise.map((s) => ({
        id: s.id,
        type: "franchise" as const,
        name: s.name,
        phone: s.phone,
        city: s.city,
        status: s.status,
        createdAt: s.createdAt.toISOString(),
      }))}
    />
  );
}
