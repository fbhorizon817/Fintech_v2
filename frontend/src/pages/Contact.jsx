import { useState } from "react";
import { Button } from "@/components/ui/Button.jsx";
import SectionHeading from "@/components/SectionHeading.jsx";
import { Mail, Phone, Globe, MapPin, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;


const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { type: "success"|"error", message: "" }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = {
      name:    e.target.name.value.trim(),
      company: e.target.company.value.trim(),
      email:   e.target.email.value.trim(),
      phone:   e.target.phone.value.trim(),
      service: e.target.service.value,
      message: e.target.message.value.trim(),
    };

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setResult({ type: "success", message: data.message });
        e.target.reset();
      } else {
        const errMsg =
          data.errors?.map((err) => err.msg).join(", ") ||
          data.message ||
          "Something went wrong. Please try again.";
        setResult({ type: "error", message: errMsg });
      }
    } catch (err) {
      setResult({
        type: "error",
        message: "Could not connect to the server. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="gradient-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl mb-4">Get in Touch</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            We are ready to help you with ERP implementation, training, and consulting.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <SectionHeading title="Contact Information" centered={false} />
              <div className="flex flex-col gap-6">
                <a href="mailto:info@fintechbalancehorizon.com" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">info@fintechbalance.net</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">+92 XXX XXX XXXX</p>
                  </div>
                </div>
                <a href="https://www.fintechbalance.net/" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                    <Globe size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <p className="font-medium">www.fintechbalance.net</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 card-shadow">
              <h3 className="font-heading font-bold text-xl mb-6 text-foreground">Send Us a Message</h3>

              {/* Success / Error Alert */}
              {result && (
                <div className={`flex items-start gap-3 p-4 rounded-lg mb-5 text-sm
                  ${result.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"}`}>
                  {result.type === "success"
                    ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                    : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
                  <span>{result.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  name="name"
                  placeholder="Name *"
                  required
                  maxLength={100}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <input
                  name="company"
                  placeholder="Company"
                  maxLength={100}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email *"
                  required
                  maxLength={255}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  maxLength={20}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <select
                  name="service"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Service Required</option>
                  <option value="implementation">Odoo Implementation</option>
                  <option value="customization">Odoo Customization</option>
                  <option value="training">Odoo Training</option>
                  <option value="consulting">ERP Consulting</option>
                  <option value="support">Support & Maintenance</option>
                </select>
                <textarea
                  name="message"
                  placeholder="Message *"
                  rows={4}
                  required
                  maxLength={1000}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <Button variant="hero" size="lg" type="submit" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
