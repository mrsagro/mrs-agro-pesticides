import { prisma } from "@/lib/prisma";
import { contactInfo } from "@/lib/contactInfo";
import AdminSettingsClient from "./AdminSettingsClient";

export default async function AdminSettingsPage() {
  const subscriberCount = await prisma.newsletterSubscriber.count();
  const adminUser = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  return (
    <AdminSettingsClient
      adminUser={adminUser ? { username: adminUser.username } : null}
      subscriberCount={subscriberCount}
      contactInfo={contactInfo}
    />
  );
}
