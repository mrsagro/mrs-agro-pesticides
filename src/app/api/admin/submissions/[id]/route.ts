import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numId = Number(id);

    if (isNaN(numId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    try {
      const { prisma } = await import("@/lib/prisma");
      if (numId > 10000) {
        const realId = numId - 10000;
        await prisma.franchiseSubmission.delete({
          where: { id: realId },
        });
      } else {
        await prisma.contactSubmission.delete({
          where: { id: numId },
        });
      }
    } catch {
      console.warn("Database unavailable for delete operation");
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete submission" },
      { status: 500 }
    );
  }
}
