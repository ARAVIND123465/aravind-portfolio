import nodemailer from "nodemailer";

async function testEmail() {
  console.log("Testing with User:", process.env.GMAIL_USER);
  console.log("Password length:", process.env.GMAIL_PASS?.length);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      logger: true,
      debug: true,
    });

    console.log("Verifying connection...");
    await transporter.verify();
    
    console.log("Connection verified! Attempting to send...");
    const info = await transporter.sendMail({
      from: `"Test" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: "Test Email from Nodemailer",
      text: "This is a test email.",
    });
    
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Nodemailer Error:");
    console.error(error);
  }
}

testEmail();
