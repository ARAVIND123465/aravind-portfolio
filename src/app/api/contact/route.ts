// app/api/contact/route.ts
// Nodemailer API Route — Next.js App Router
//
// Setup:
//   npm install nodemailer
//   npm install --save-dev @types/nodemailer
//
// Add to your .env.local:
//   MAIL_USER=your_gmail@gmail.com
//   MAIL_PASS=your_gmail_app_password   ← NOT your Gmail login password
//   MAIL_TO=as1084@gmail.com            ← where you receive messages
//
// Gmail App Password guide:
//   1. Enable 2-Step Verification on your Google account
//   2. Go to Google Account → Security → App Passwords
//   3. Generate a password for "Mail" → paste it as MAIL_PASS

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // ── Validate ────────────────────────────────────────────
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // ── Transporter ─────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // ── Email to YOU (Aravindhan) ────────────────────────────
    const toOwnerMail = {
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: subject
        ? `[Portfolio] ${subject}`
        : `[Portfolio] New message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              body { font-family: 'Segoe UI', sans-serif; background: #f5f2ed; margin: 0; padding: 24px; }
              .card { background: #fff; border-radius: 12px; padding: 36px; max-width: 560px; margin: 0 auto; border: 1px solid #e5e1db; }
              .label { font-family: monospace; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #a8a29e; margin-bottom: 4px; }
              .value { font-size: 15px; color: #1c1917; margin-bottom: 20px; }
              .message-box { background: #fafaf9; border-left: 3px solid #e11d48; padding: 16px 20px; border-radius: 6px; color: #44403c; font-size: 14px; line-height: 1.7; white-space: pre-wrap; }
              .badge { display: inline-block; background: #fff1f2; color: #e11d48; font-family: monospace; font-size: 11px; padding: 3px 10px; border-radius: 999px; border: 1px solid #fecdd3; margin-bottom: 28px; }
              .footer { margin-top: 28px; font-size: 11px; color: #a8a29e; font-family: monospace; text-align: center; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="badge">📬 New Portfolio Message</div>
              <div class="label">From</div>
              <div class="value">${name} &lt;${email}&gt;</div>
              <div class="label">Subject</div>
              <div class="value">${subject || "No subject"}</div>
              <div class="label">Message</div>
              <div class="message-box">${message}</div>
              <div class="footer">
                Sent via aravindhan.dev · Reply directly to this email to respond to ${name}
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // ── Auto-reply to SENDER ─────────────────────────────────
    const toSenderMail = {
      from: `"Aravindhan S" <${process.env.MAIL_USER}>`,
      to: email,
      subject: `Got your message, ${name.split(" ")[0]}! 👋`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              body { font-family: 'Segoe UI', sans-serif; background: #0c0a09; margin: 0; padding: 24px; }
              .card { background: #1c1917; border-radius: 12px; padding: 36px; max-width: 520px; margin: 0 auto; border: 1px solid #292524; }
              h2 { font-family: Georgia, serif; color: #fff; font-size: 22px; margin: 0 0 12px; }
              p { color: #a8a29e; font-size: 14px; line-height: 1.7; margin: 0 0 16px; }
              .highlight { color: #fb7185; }
              .reply-box { background: #0c0a09; border-left: 3px solid #e11d48; padding: 14px 18px; border-radius: 6px; color: #78716c; font-size: 13px; line-height: 1.6; margin: 20px 0; white-space: pre-wrap; }
              .btn { display: inline-block; margin-top: 8px; padding: 10px 22px; background: #e11d48; color: #fff; border-radius: 6px; text-decoration: none; font-size: 13px; font-family: monospace; letter-spacing: 0.05em; }
              .footer { margin-top: 28px; font-size: 11px; color: #44403c; font-family: monospace; text-align: center; border-top: 1px solid #292524; padding-top: 16px; }
            </style>
          </head>
          <body>
            <div class="card">
              <h2>Hey ${name.split(" ")[0]}<span class="highlight">.</span></h2>
              <p>Thanks for reaching out! I've received your message and will get back to you as soon as possible — usually within 24–48 hours.</p>
              <p>Here's a copy of what you sent:</p>
              <div class="reply-box">${message}</div>
              <p style="margin-top: 20px;">In the meantime, feel free to check out my work on GitHub.</p>
              <a class="btn" href="https://github.com/aravindhan-s">View My GitHub →</a>
              <div class="footer">
                Aravindhan S · Full-Stack Developer & ML Enthusiast<br/>
                as1084@gmail.com · Krishnagiri, Tamil Nadu
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // ── Send both emails ─────────────────────────────────────
    await transporter.sendMail(toOwnerMail);
    await transporter.sendMail(toSenderMail);

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Nodemailer error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
