import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
          replyTo: email.trim(),
          subject: `Mrs. Agro - New Contact Submission from ${name.trim()}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
              <h2 style="color: #1b5e20;">New Contact Submission</h2>
              <p><strong>Name:</strong> ${name.trim()}</p>
              <p><strong>Email:</strong> ${email.trim()}</p>
              <p><strong>Message:</strong></p>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #1b5e20;">
                ${message.trim().replace(/\n/g, "<br>")}
              </div>
            </div>
          `,
        });
      } else {
        console.warn("EMAIL_USER or EMAIL_PASS environment variables are not configured.");
      }
    } catch (emailError) {
      console.error("Failed to send contact submission email:", emailError);
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
