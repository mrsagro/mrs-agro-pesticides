import { prisma } from "@/lib/prisma";
import AdminInquiriesClient from "./AdminInquiriesClient";

export default async function AdminSubmissionsPage() {
  const contactSubmissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminInquiriesClient
      submissions={contactSubmissions.map((s) => ({
        id: s.id,
        name: s.name,
        email: s.email,
        message: s.message,
        status: s.status,
        createdAt: s.createdAt.toISOString(),
      }))}
    />
  );
}
