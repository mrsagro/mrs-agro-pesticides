import { NextResponse } from "next/server";

const VALID_STATUSES = ["new", "contacted", "closed"] as const;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Status must be one of: ${VALID_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    try {
      const { prisma } = await import("@/lib/prisma");
      const numId = Number(id);
      if (numId > 10000) {
        const realId = numId - 10000;
        await prisma.franchiseSubmission.update({
          where: { id: realId },
          data: { status },
        });
      } else {
        await prisma.contactSubmission.update({
          where: { id: numId },
          data: { status },
        });
      }
    } catch {
      console.warn("Database unavailable for status update");
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update submission status" },
      { status: 500 }
    );
  }
}
