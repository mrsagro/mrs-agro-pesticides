import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactInfo } from "@/lib/contactInfo";

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: contactInfo.email,
      subject: "New Franchise Application",
      text: `Name: ${name}\nPhone: ${phone}\nCity: ${city}\nMessage: ${message || "N/A"}`,
      html: `
        <h2>New Franchise Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Franchise email error:", error);
    return NextResponse.json(
      { error: "Failed to send application. Please try again." },
      { status: 500 }
    );
  }
}
