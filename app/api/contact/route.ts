import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  interest?: string;
  message?: string;
  // Honeypot field — real users leave this empty.
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bot trap: if the hidden honeypot is filled, pretend success and drop it.
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const company = (body.company || "").trim();
  const interest = (body.interest || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please provide your name, email and a message." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Tyrian Advisory <onboarding@resend.dev>";

  if (!apiKey || !to) {
    // Misconfiguration — log for the operator, but don't leak details to the client.
    console.error(
      "Contact form not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL environment variables."
    );
    return NextResponse.json(
      { error: "The contact form is not available right now. Please email us directly." },
      { status: 500 }
    );
  }

  const html = `
    <h2>New enquiry for Tyrian Advisory</h2>
    <p><strong>Name:</strong> ${esc(name)}</p>
    <p><strong>Email:</strong> ${esc(email)}</p>
    <p><strong>Company:</strong> ${esc(company) || "Not provided"}</p>
    <p><strong>Area of interest:</strong> ${esc(interest) || "Not provided"}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${esc(message)}</p>
  `;

  const text = `New enquiry for Tyrian Advisory

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Area of interest: ${interest || "Not provided"}

Message:
${message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend API error:", res.status, detail);
      return NextResponse.json(
        { error: "We couldn't send your message. Please try again shortly." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
