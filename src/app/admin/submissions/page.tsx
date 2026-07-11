import AdminInquiriesClient from "./AdminInquiriesClient";

export default async function AdminSubmissionsPage() {
  let submissions: {
    id: number;
    name: string;
    email: string;
    message: string;
    status: string;
    createdAt: string;
  }[] = [];

  try {
    const { prisma } = await import("@/lib/prisma");
    const contactSubmissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
    submissions = contactSubmissions.map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      message: s.message,
      status: s.status,
      createdAt: s.createdAt.toISOString(),
    }));
  } catch {
    console.warn("Database unavailable for submissions page");
  }

  return <AdminInquiriesClient submissions={submissions} />;
}
