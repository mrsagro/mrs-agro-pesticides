import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    // Send email notification
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `Mrs. Agro - New Franchise Application from ${name.trim()}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
              <h2 style="color: #1b5e20;">New Franchise Application</h2>
              <p><strong>Name:</strong> ${name.trim()}</p>
              <p><strong>Phone:</strong> ${phone.trim()}</p>
              <p><strong>City:</strong> ${city.trim()}</p>
              <p><strong>Message:</strong></p>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #1b5e20;">
                ${message ? message.trim().replace(/\n/g, "<br>") : "<em>No message provided</em>"}
              </div>
            </div>
          `,
        });
      } else {
        console.warn("EMAIL_USER or EMAIL_PASS environment variables are not configured.");
      }
    } catch (emailError) {
      console.error("Failed to send franchise submission email:", emailError);
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
