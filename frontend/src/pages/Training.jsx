import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button.jsx";
import SectionHeading from "@/components/SectionHeading.jsx";
import { CheckCircle2, BookOpen, Users, Monitor, Laptop } from "lucide-react";

const programs = [
  {
    title: "Odoo Accounting Training",
    items: ["Financial management", "Invoicing and billing", "Reporting and analytics", "Tax configuration", "Bank reconciliation"],
  },
  {
    title: "Odoo CRM & Sales",
    items: ["Customer management", "Sales pipeline", "Quotations and orders", "Sales reporting"],
  },
  {
    title: "Inventory & Supply Chain",
    items: ["Warehouse management", "Inventory control", "Procurement processes", "Logistics management"],
  },
  {
    title: "HR & Payroll",
    items: ["Employee records", "Payroll automation", "Attendance tracking", "Performance management"],
  },
];

const formats = [
  { icon: Users, label: "Corporate Training" },
  { icon: Monitor, label: "Online Courses" },
  { icon: BookOpen, label: "On-site Workshops" },
  { icon: Laptop, label: "Hands-on Practical Labs" },
];

const Training = () => (
  <main>
    <section className="gradient-primary py-20 text-primary-foreground">
      <div className="container text-center">
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl mb-4">Training Programs</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
          Professional Odoo training programs focused on real-world industry applications.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <SectionHeading title="Our Training Programs" gradient subtitle="Industry-focused training on Odoo for individuals and teams" />
        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((p) => (
            <div key={p.title} className="bg-card rounded-xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300">
              <h3 className="font-heading font-bold text-xl mb-4 text-foreground">{p.title}</h3>
              <div className="flex flex-col gap-2">
                {p.items.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-secondary shrink-0" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 section-alt">
      <div className="container">
        <SectionHeading title="Training Formats" gradient />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formats.map((f) => (
            <div key={f.label} className="bg-card rounded-xl p-6 text-center card-shadow">
              <f.icon size={32} className="text-primary mx-auto mb-3" />
              <span className="font-medium text-sm text-foreground">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <div className="gradient-primary rounded-2xl p-12 text-center text-primary-foreground">
          <h2 className="font-heading font-bold text-3xl mb-4">Start Your ERP Journey Today</h2>
          <p className="text-primary-foreground/90 mb-8">Enroll in our professional training programs and master Odoo.</p>
          <Link to="/contact">
            <Button variant="hero-outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Enroll in Training Programs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </main>
);

export default Training;
