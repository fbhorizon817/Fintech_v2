import "dotenv/config";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 5000;

const frontends = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "http://localhost:5173",
].filter(Boolean);

// app.use(cors({
//   origin: frontends,
//   methods: ["GET", "POST"],
//   allowedHeaders: ["Content-Type"],
// }));
// app.use(cors({ origin: ['http://localhost:3000','http://fintechbalance.net','https://fintech-v2.vercel.app/'] }));
app.use(cors({ 
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://fintechbalance.net',
    'https://fintech-v2.vercel.app' // ✅ NO slash
  ],
  methods: ["GET", "POST"],
}));
app.use(express.json({ limit: "10kb" }));

// ── Nodemailer transporter ─────────────────────────────────
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Ready ✅");
  }
});
// ── Health check ───────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running ✅" });
});

// ── Contact form ───────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  const { name, company, email, phone, service, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(422).json({
      success: false,
      message: "Name, email, and message are required.",
    });
  }

  const serviceLabels = {
    implementation: "Odoo Implementation",
    customization: "Odoo Customization",
    training: "Odoo Training",
    consulting: "ERP Consulting",
    support: "Support & Maintenance",
  };

  const serviceLabel = serviceLabels[service] || service || "Not specified";
  const submittedAt = new Date().toLocaleString("en-PK", {
    timeZone: "Asia/Karachi",
    dateStyle: "full",
    timeStyle: "short",
  });

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:20px;background:#f1f5f9;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto">
    <div style="background:linear-gradient(135deg,#1e3a5f,#2563eb);padding:28px 32px;border-radius:12px 12px 0 0">
      <p style="margin:0 0 4px;color:rgba(255,255,255,0.7);font-size:12px;text-transform:uppercase;letter-spacing:1px">Fintech Balance Horizon</p>
      <h2 style="margin:0;color:#fff;font-size:20px;font-weight:700">📬 New Contact Form Submission</h2>
    </div>
    <div style="background:#fff;padding:28px 32px;border:1px solid #e2e8f0;border-radius:0 0 12px 12px">
      <p style="color:#374151;margin:0 0 16px">A new contact form has been submitted on your website:</p>
      <table style="width:100%;border-collapse:collapse;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px">
        <tr>
          <td style="padding:10px 14px;color:#64748b;font-weight:600;font-size:13px;width:130px;vertical-align:top">👤 Name</td>
          <td style="padding:10px 14px;color:#1e293b;font-size:13px">${name}</td>
        </tr>
        <tr style="background:#fff">
          <td style="padding:10px 14px;color:#64748b;font-weight:600;font-size:13px;vertical-align:top">🏢 Company</td>
          <td style="padding:10px 14px;color:#1e293b;font-size:13px">${company || "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;color:#64748b;font-weight:600;font-size:13px;vertical-align:top">📧 Email</td>
          <td style="padding:10px 14px;font-size:13px"><a href="mailto:${email}" style="color:#2563eb">${email}</a></td>
        </tr>
        <tr style="background:#fff">
          <td style="padding:10px 14px;color:#64748b;font-weight:600;font-size:13px;vertical-align:top">📞 Phone</td>
          <td style="padding:10px 14px;color:#1e293b;font-size:13px">${phone || "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;color:#64748b;font-weight:600;font-size:13px;vertical-align:top">🛠️ Service</td>
          <td style="padding:10px 14px;color:#1e293b;font-size:13px">${serviceLabel}</td>
        </tr>
        <tr style="background:#fff">
          <td style="padding:10px 14px;color:#64748b;font-weight:600;font-size:13px;vertical-align:top">💬 Message</td>
          <td style="padding:10px 14px;color:#1e293b;font-size:13px;white-space:pre-wrap">${message}</td>
        </tr>
      </table>
      <div style="margin-top:16px">
        <a href="mailto:${email}" style="display:inline-block;padding:10px 20px;background:#2563eb;color:#fff;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600">↩ Reply to ${name}</a>
      </div>
      <p style="margin-top:16px;padding:10px 14px;background:#eff6ff;border-radius:6px;color:#1d4ed8;font-size:12px">📅 Submitted on: ${submittedAt}</p>
    </div>
    <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:16px">© ${new Date().getFullYear()} Fintech Balance Horizon · Pakistan</p>
  </div>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Fintech Balance Horizon" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `📬 New Contact Form Submission — ${name}`,
      html,
    });

    return res.status(200).json({
      success: true,
      message: "Your message has been received! Our team will get back to you shortly.",
    });
  } catch (err) {
    console.error("Email sending failed:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send your message. Please try again later.",
    });
  }
});

// ── 404 ────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
