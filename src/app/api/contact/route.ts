import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const headers = {
    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    "Content-Type": "application/json",
  };

  // Email 1 — notify us
  const internalRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers,
    body: JSON.stringify({
      from: "Quantyx Advisory <noreply@quantyxadvisory.com>",
      to: "contact@quantyxadvisory.com",
      reply_to: email,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${message}</p>
      `,
    }),
  });

  if (!internalRes.ok) {
    console.error("Resend error (internal):", await internalRes.text());
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  // Email 2 — confirmation to enquirer
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers,
    body: JSON.stringify({
      from: "Quantyx Advisory <noreply@quantyxadvisory.com>",
      to: email,
      subject: "We've received your enquiry",
      text: `Hi ${name},\n\nThanks for getting in touch — we've received your enquiry and will be back in touch within 1 business day.\n\nBest,\nQuantyx Advisory`,
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for getting in touch — we've received your enquiry and will be back in touch within 1 business day.</p>
        <br />
        <p>Best,<br />Quantyx Advisory</p>
      `,
    }),
  });

  return NextResponse.json({ ok: true });
}
