import { prisma } from "@/lib/prisma";
import AdminFranchiseClient from "./AdminFranchiseClient";

export default async function AdminFranchisePage() {
  const submissions = await prisma.franchiseSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminFranchiseClient
      submissions={submissions.map((s) => ({
        id: s.id,
        name: s.name,
        phone: s.phone,
        city: s.city,
        message: s.message,
        status: s.status,
        createdAt: s.createdAt.toISOString(),
      }))}
    />
  );
}
