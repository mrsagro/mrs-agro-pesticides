import AdminFranchiseClient from "./AdminFranchiseClient";

export default async function AdminFranchisePage() {
  let submissions: {
    id: number;
    name: string;
    phone: string;
    city: string;
    message: string | null;
    status: string;
    createdAt: string;
  }[] = [];

  try {
    const { prisma } = await import("@/lib/prisma");
    const data = await prisma.franchiseSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
    submissions = data.map((s) => ({
      id: s.id,
      name: s.name,
      phone: s.phone,
      city: s.city,
      message: s.message,
      status: s.status,
      createdAt: s.createdAt.toISOString(),
    }));
  } catch {
    console.warn("Database unavailable for franchise submissions");
  }

  return <AdminFranchiseClient submissions={submissions} />;
}
