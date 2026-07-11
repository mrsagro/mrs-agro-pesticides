import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.contactSubmission.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        },
      });
    } catch (dbError) {
      console.warn("Database unavailable, submission logged:", JSON.stringify({
        type: "contact",
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
      }));
      console.error("DB error:", dbError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
