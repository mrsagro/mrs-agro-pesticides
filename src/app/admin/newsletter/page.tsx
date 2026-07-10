import { prisma } from "@/lib/prisma";
import AdminNewsletterClient from "./AdminNewsletterClient";

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminNewsletterClient
      subscribers={subscribers.map((s) => ({
        id: s.id,
        email: s.email,
        createdAt: s.createdAt.toISOString(),
      }))}
    />
  );
}
