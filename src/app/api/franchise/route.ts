import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, city, message } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!phone || !phone.trim()) {
      return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
    }
    if (!city || !city.trim()) {
      return NextResponse.json({ error: "City is required." }, { status: 400 });
    }

    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.franchiseSubmission.create({
        data: {
          name: name.trim(),
          phone: phone.trim(),
          city: city.trim(),
          message: message?.trim() || null,
        },
      });
    } catch (dbError) {
      console.warn("Database unavailable, submission logged:", JSON.stringify({
        type: "franchise",
        name: name.trim(),
        phone: phone.trim(),
        city: city.trim(),
        message: message?.trim() || null,
        timestamp: new Date().toISOString(),
      }));
      console.error("DB error:", dbError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Franchise form error:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
