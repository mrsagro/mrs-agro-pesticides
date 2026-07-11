import { NextResponse } from "next/server";

function escapeCsvField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  try {
    let contacts: { createdAt: Date; name: string; email: string; message: string; status: string }[] = [];
    let franchises: { createdAt: Date; name: string; phone: string; city: string; message: string | null; status: string }[] = [];

    try {
      const { prisma } = await import("@/lib/prisma");
      contacts = await prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
      });
      franchises = await prisma.franchiseSubmission.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch {
      console.warn("Database unavailable for export");
    }

    const headers = ["Date", "Type", "Name", "Contact Info", "Details", "Status"];
    const rows = [
      ...contacts.map((s) =>
        [
          escapeCsvField(s.createdAt.toISOString()),
          "Contact",
          escapeCsvField(s.name),
          escapeCsvField(s.email),
          escapeCsvField(s.message),
          escapeCsvField(s.status),
        ].join(",")
      ),
      ...franchises.map((s) =>
        [
          escapeCsvField(s.createdAt.toISOString()),
          "Franchise",
          escapeCsvField(s.name),
          escapeCsvField(s.phone),
          escapeCsvField(`City: ${s.city}${s.message ? ` | ${s.message}` : ""}`),
          escapeCsvField(s.status),
        ].join(",")
      ),
    ];

    const csv = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition":
          'attachment; filename="mrs-agro-submissions.csv"',
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to export submissions" },
      { status: 500 }
    );
  }
}
