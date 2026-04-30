import "dotenv/config";
import express from "express";
import cors from "cors";
import { Resend } from "resend";

const app = express();
const PORT = process.env.PORT || 5000;

// ── Resend setup ───────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);

// ── CORS ───────────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://fintechbalance.net',
    'https://www.fintechbalance.net',
    'https://fintech-v2.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());

app.use(express.json({ limit: "10kb" }));

// ── Health check ───────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running ✅" });
});

// ── Contact form ───────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  const { name, company, email, phone, service, message } = req.body;

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

  const html = `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif">
  <h2>📬 New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Company:</strong> ${company || "Not provided"}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
  <p><strong>Service:</strong> ${serviceLabel}</p>
  <p><strong>Message:</strong><br/>${message}</p>
  <p><strong>Submitted:</strong> ${submittedAt}</p>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: "Fintech Contact <onboarding@fintechbalance.net >", 
      to: process.env.EMAIL_TO, 
      subject: `📬 New Contact Form Submission — ${name}`,
      html,
      reply_to: email,
    });

    return res.status(200).json({
      success: true,
      message: "Your message has been received! Our team will get back to you shortly.",
    });

  } catch (err) {
    console.error("Email sending failed:", err);
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