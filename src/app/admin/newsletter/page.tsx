import AdminNewsletterClient from "./AdminNewsletterClient";

export default async function AdminNewsletterPage() {
  let subscribers: { id: number; email: string; createdAt: string }[] = [];

  try {
    const { prisma } = await import("@/lib/prisma");
    const data = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
    subscribers = data.map((s) => ({
      id: s.id,
      email: s.email,
      createdAt: s.createdAt.toISOString(),
    }));
  } catch {
    console.warn("Database unavailable for newsletter subscribers");
  }

  return <AdminNewsletterClient subscribers={subscribers} />;
}
