import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button.jsx";
import SectionHeading from "@/components/SectionHeading.jsx";
import { Settings, Code, BarChart3, Wrench, CheckCircle2 } from "lucide-react";

const servicesData = [
  {
    icon: Settings,
    title: "Odoo ERP Implementation",
    desc: "We provide complete implementation services tailored to your organization.",
    items: ["Business Analysis", "Solution Design", "System Configuration", "Data Migration", "User Training", "Go-Live & Support"],
  },
  {
    icon: Code,
    title: "Odoo Customization & Development",
    desc: "We customize Odoo to match your exact needs.",
    items: ["Custom modules", "Workflow automation", "API integrations", "Custom dashboards and reports"],
  },
  {
    icon: BarChart3,
    title: "ERP Consulting",
    desc: "We help businesses optimize operations through ERP strategy.",
    items: ["Process optimization", "ERP planning and selection", "Digital transformation strategy", "Project management"],
  },
  {
    icon: Wrench,
    title: "Support & Maintenance",
    desc: "Reliable ongoing support to keep your ERP system running smoothly.",
    items: ["Technical support", "System upgrades", "Troubleshooting", "Performance optimization"],
  },
];

const Services = () => (
  <main>
    <section className="gradient-primary py-20 text-primary-foreground">
      <div className="container text-center">
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl mb-4">Our Services</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
          Comprehensive ERP solutions from implementation to ongoing support.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <div className="flex flex-col gap-16">
          {servicesData.map((s, i) => (
            <div key={s.title} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <s.icon size={28} className="text-primary-foreground" />
                </div>
                <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">{s.title}</h2>
                <p className="text-muted-foreground mb-6">{s.desc}</p>
                <div className="flex flex-col gap-3">
                  {s.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-secondary shrink-0" />
                      <span className="text-foreground text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`section-alt rounded-2xl p-8 h-full flex items-center justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <s.icon size={120} className="text-primary/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <div className="gradient-primary rounded-2xl p-12 text-center text-primary-foreground">
          <h2 className="font-heading font-bold text-3xl mb-4">Need a Tailored ERP Solution?</h2>
          <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">Let us analyze your business needs and propose the best approach.</p>
          <Link to="/contact">
            <Button variant="hero-outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </main>
);

export default Services;
