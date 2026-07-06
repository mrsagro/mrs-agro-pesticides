import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { page, referrer, country, city, deviceType } = await request.json();

    await prisma.visitLog.create({
      data: {
        page: page || "/",
        referrer: referrer || null,
        country: country || null,
        city: city || null,
        deviceType: deviceType || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    // Fail silently — tracking must never break the page
    return NextResponse.json({ success: true });
  }
}
