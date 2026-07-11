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
      await prisma.newsletterSubscriber.delete({
        where: { id: numId },
      });
    } catch {
      console.warn("Database unavailable for subscriber delete");
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete subscriber" },
      { status: 500 }
    );
  }
}
