import { contactInfo } from "@/lib/contactInfo";
import AdminSettingsClient from "./AdminSettingsClient";

export default async function AdminSettingsPage() {
  let subscriberCount = 0;
  let adminUser: { username: string } | null = null;

  try {
    const { prisma } = await import("@/lib/prisma");
    subscriberCount = await prisma.newsletterSubscriber.count();
    const user = await prisma.user.findUnique({
      where: { username: "admin" },
    });
    if (user) {
      adminUser = { username: user.username };
    }
  } catch {
    console.warn("Database unavailable for settings page");
  }

  return (
    <AdminSettingsClient
      adminUser={adminUser}
      subscriberCount={subscriberCount}
      contactInfo={contactInfo}
    />
  );
}
