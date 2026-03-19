// app/api/contact/route.ts
// ─────────────────────────────────────────────────────────
// Nodemailer contact route — Next.js App Router
// Env vars needed in .env.local:
//   GMAIL_USER=aravindhan2215@gmail.com
//   GMAIL_PASS=your-16-char-app-password   ← must be a Gmail App Password
// ─────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body as {
      name: string;
      email: string;
      subject?: string;
      message: string;
    };

    // ── Validation ──────────────────────────────────────────
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
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

    const gmailUser = process.env.GMAIL_USER?.trim();
    // Gmail App Passwords are often copied with spaces (xxxx xxxx xxxx xxxx).
    // Normalize so both formats work.
    const gmailPass = process.env.GMAIL_PASS?.replace(/\s+/g, "");

    if (!gmailUser || !gmailPass) {
      console.error(
        "❌ Missing email env vars. Set GMAIL_USER and GMAIL_PASS (Gmail App Password)."
      );
      return NextResponse.json(
        {
          error:
            "Email is not configured on the server. Please try again later.",
        },
        { status: 500 }
      );
    }
    if (gmailPass.length < 16) {
      console.error("❌ GMAIL_PASS looks invalid (too short).");
      return NextResponse.json(
        {
          error:
            "Email is not configured correctly on the server. Please try again later.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    // Verify SMTP connection before trying to send
    await transporter.verify();
    console.log("✅ SMTP transporter verified — credentials are valid");

    // ── Sanitize message for HTML ───────────────────────────
    const safeMessage = String(message)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br/>");
    const truncatedMessage =
      message.length > 120 ? message.slice(0, 120) + "\u2026" : message;
    const linkedInUrl =
      process.env.NEXT_PUBLIC_LINKEDIN_URL ||
      "https://linkedin.com/in/aravind5338/";

    // ── 1. Notification email → YOU ─────────────────────────
    const notificationHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#030712;font-family:'Segoe UI',system-ui,sans-serif;color:#f8fafc;-webkit-font-smoothing:antialiased}
    .wrap{max-width:580px;margin:40px auto;background:#040e1c;border:1px solid rgba(6,182,212,0.15);border-radius:14px;overflow:hidden}
    .hdr{background:linear-gradient(135deg,#030712 0%,#040e1c 50%,#071428 100%);padding:32px 36px;border-bottom:1px solid rgba(6,182,212,0.12);position:relative;overflow:hidden}
    .logo-wrap{display:flex;align-items:center;gap:10px;margin-bottom:10px}
    .logo-icon{width:32px;height:32px;border:1px solid rgba(6,182,212,0.4);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:.75rem;color:#06b6d4;font-family:monospace;font-weight:700;background:rgba(6,182,212,0.06);line-height:32px;text-align:center}
    .logo-text{font-size:.95rem;font-weight:700;color:#f8fafc;font-family:monospace}
    .logo-text span{color:#06b6d4}
    .badge{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.2);border-radius:20px;font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:#06b6d4;font-family:monospace}
    .body{padding:32px 36px}
    .field{margin-bottom:20px}
    .lbl{font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(148,163,184,0.5);margin-bottom:6px;font-family:monospace}
    .val{font-size:.88rem;color:#e2e8f0;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:12px 16px;line-height:1.65}
    .val a{color:#06b6d4;text-decoration:none}
    .msg{white-space:pre-wrap;word-break:break-word;border-left:2px solid rgba(6,182,212,0.4);border-radius:0 8px 8px 0;background:rgba(6,182,212,0.04)}
    .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(6,182,212,0.12),transparent);margin:8px 0 24px}
    .ftr{padding:16px 36px;border-top:1px solid rgba(255,255,255,0.04);font-size:.67rem;color:rgba(148,163,184,0.35);text-align:center;font-family:monospace}
    .ftr span{color:#06b6d4}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="hdr">
      <div class="logo-wrap">
        <div class="logo-icon">~/</div>
        <div class="logo-text"><span>aravind</span>.dev</div>
      </div>
      <div class="badge">&#10022; New Portfolio Message</div>
    </div>
    <div class="body">
      <div class="field">
        <div class="lbl">From</div>
        <div class="val">${name}</div>
      </div>
      <div class="field">
        <div class="lbl">Email</div>
        <div class="val"><a href="mailto:${email}">${email}</a></div>
      </div>
      ${subject ? `<div class="field"><div class="lbl">Subject</div><div class="val">${subject}</div></div>` : ""}
      <div class="divider"></div>
      <div class="field">
        <div class="lbl">Message</div>
        <div class="val msg">${safeMessage}</div>
      </div>
    </div>
    <div class="ftr">
      Sent from your portfolio &nbsp;&middot;&nbsp; <span>${gmailUser}</span>
    </div>
  </div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: subject
        ? `[Portfolio] ${subject}`
        : `[Portfolio] New message from ${name}`,
      html: notificationHtml,
    });

    console.log("✅ Notification email sent to", gmailUser);

    // ── 2. Auto-reply → SENDER ──────────────────────────────
    const autoReplyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#030712;font-family:'Segoe UI',system-ui,sans-serif;color:#f8fafc;-webkit-font-smoothing:antialiased}
    .wrap{max-width:580px;margin:40px auto;background:#040e1c;border:1px solid rgba(6,182,212,0.15);border-radius:14px;overflow:hidden}
    .hdr{background:linear-gradient(135deg,#030712 0%,#040e1c 60%,#071428 100%);padding:40px 36px 32px;text-align:center;border-bottom:1px solid rgba(6,182,212,0.1);position:relative;overflow:hidden}
    .avatar{width:58px;height:58px;border-radius:50%;border:1.5px solid rgba(6,182,212,0.35);background:rgba(6,182,212,0.08);margin:0 auto 14px;font-size:1.5rem;line-height:58px;text-align:center;position:relative}
    .logo-text{font-size:1.1rem;font-weight:800;color:#f8fafc;font-family:monospace}
    .logo-text span{color:#06b6d4}
    .tagline{margin-top:6px;font-size:.72rem;color:rgba(148,163,184,0.45);font-family:monospace;letter-spacing:.08em}
    .body{padding:36px;text-align:center}
    h2{font-size:1.2rem;font-weight:800;color:#f8fafc;margin-bottom:12px}
    .hi{color:#06b6d4}
    p{color:rgba(148,163,184,0.7);font-size:.87rem;line-height:1.85;margin-bottom:14px}
    .accent{color:#06b6d4;font-weight:600}
    .quote-card{background:rgba(6,182,212,0.04);border:1px solid rgba(6,182,212,0.12);border-left:3px solid rgba(6,182,212,0.5);border-radius:0 8px 8px 0;padding:16px 18px;text-align:left;margin:22px 0;font-size:.82rem;color:rgba(148,163,184,0.55);line-height:1.75;font-style:italic}
    .btn-wrap{margin-top:6px}
    .btn{display:inline-block;padding:11px 28px;background:#06b6d4;color:#030712;border-radius:7px;font-weight:700;font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;font-family:monospace}
    .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(6,182,212,0.1),transparent);margin:8px 0}
    .ftr{padding:16px 36px;border-top:1px solid rgba(255,255,255,0.04);font-size:.67rem;color:rgba(148,163,184,0.3);text-align:center;font-family:monospace;line-height:1.8}
    .ftr a{color:rgba(6,182,212,0.6);text-decoration:none}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="hdr">
      <div class="avatar">&#x1F468;&#x200D;&#x1F4BB;</div>
      <div class="logo-text"><span>aravind</span>.dev</div>
      <div class="tagline">Full-Stack Developer &amp; ML Enthusiast</div>
    </div>
    <div class="body">
      <h2>Hey <span class="hi">${name}</span>! &#x1F44B;</h2>
      <p>
        Thanks for dropping a message on my portfolio.<br/>
        I've received your note and will get back to you
        <span class="accent">within 24&ndash;48 hours</span>.
      </p>
      <div class="divider"></div>
      <div class="quote-card">
        &ldquo;${truncatedMessage}&rdquo;
      </div>
      <p style="font-size:.8rem">
        In the meantime, feel free to check out my work on GitHub or connect on LinkedIn.
      </p>
      <div class="btn-wrap">
        <a class="btn" href="${linkedInUrl}">
          Connect on LinkedIn &rarr;
        </a>
      </div>
    </div>
    <div class="ftr">
      Aravindhan S &nbsp;&middot;&nbsp; Tamil Nadu<br/>
      <a href="mailto:${gmailUser}">${gmailUser}</a>
    </div>
  </div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Aravindhan S" <${gmailUser}>`,
      to: email,
      subject: "Thanks for reaching out! 👋",
      html: autoReplyHtml,
    });

    console.log("✅ Auto-reply sent to", email);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: unknown) {
    // ── FIX 4: Full error logging so you can see exactly what failed ──
    console.error("❌ Nodemailer error:", error);
    if (error instanceof Error) {
      console.error("   Message:", error.message);
      console.error("   Stack:", error.stack);
    }
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}


