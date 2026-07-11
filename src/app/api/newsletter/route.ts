import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.trim()) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    try {
      const { prisma } = await import("@/lib/prisma");
      const existing = await prisma.newsletterSubscriber.findUnique({
        where: { email: email.trim() },
      });

      if (existing) {
        return NextResponse.json({ success: true, message: "Already subscribed" });
      }

      await prisma.newsletterSubscriber.create({
        data: { email: email.trim() },
      });
    } catch {
      console.warn("Database unavailable for newsletter subscription");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
