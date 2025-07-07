// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success?: boolean; error?: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { to, subject, body } = req.body;
  if (!to || !subject || !body) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // Configure Zoho SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to,
      subject,
      text: body,
    });
    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Zoho send error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
