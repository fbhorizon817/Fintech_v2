import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button.jsx";
import SectionHeading from "@/components/SectionHeading.jsx";
import heroBg from "@/assets/hero-bg.jpg";
import {
  Settings, Code, GraduationCap, BarChart3, CheckCircle2,
  Factory, ShoppingCart, Landmark, HeartPulse, BookOpen, Truck, ArrowRight,
} from "lucide-react";

const services = [
  { icon: Settings, title: "Odoo Implementation", desc: "End-to-end ERP deployment designed to align with your business processes." },
  { icon: Code, title: "Odoo Customization", desc: "Tailored solutions to meet your unique operational requirements." },
  { icon: GraduationCap, title: "Odoo Training", desc: "Professional training programs for individuals and corporate teams." },
  { icon: BarChart3, title: "ERP Consulting", desc: "Strategic advisory to support digital transformation and efficiency." },
];

const whyUs = [
  "Certified expertise in Odoo",
  "Business-focused implementation approach",
  "Practical, hands-on training programs",
  "End-to-end ERP lifecycle support",
  "Customized solutions for every client",
];

const industries = [
  { icon: Factory, label: "Manufacturing" },
  { icon: ShoppingCart, label: "Retail & Distribution" },
  { icon: Landmark, label: "Financial Services" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: BookOpen, label: "Education" },
  { icon: Truck, label: "Logistics & Supply Chain" },
];

const Index = () => (
  <main>
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-primary opacity-85" />
      </div>
      <div className="container relative z-10 py-20">
        <div className="max-w-3xl animate-fade-up">
          <p className="text-primary-foreground/80 font-medium mb-4 tracking-wide uppercase text-sm">
            ERP Consulting · Odoo Training · Digital Transformation
          </p>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-6">
            Digital Transformation Starts with the Right ERP
          </h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
            Fintech Balance Horizon empowers businesses to implement, customize, and master Odoo — helping you streamline operations, gain financial clarity, and scale with confidence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact">
              <Button variant="hero-outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Book Free Consultation
              </Button>
            </Link>
            <Link to="/training">
              <Button variant="ghost" size="lg" className="text-primary-foreground hover:bg-primary-foreground/10">
                Explore Training Programs <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <SectionHeading title="Our Core Services" subtitle="Comprehensive ERP solutions to drive your digital transformation" gradient />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="group bg-card rounded-xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                <s.icon size={24} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 section-alt">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading title="Why Choose Fintech Balance Horizon" centered={false} />
            <div className="flex flex-col gap-4">
              {whyUs.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="text-secondary mt-0.5 shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="gradient-primary rounded-2xl p-8 text-primary-foreground">
            <h3 className="font-heading font-bold text-2xl mb-4">Official Odoo Partner</h3>
            <p className="text-primary-foreground/90 leading-relaxed">
              As a certified partner of Odoo, we bring proven expertise and direct access to the world's most versatile open-source ERP platform.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <SectionHeading title="Industries We Serve" subtitle="Delivering ERP excellence across diverse sectors" gradient />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((ind) => (
            <div key={ind.label} className="bg-card rounded-xl p-6 text-center card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1">
              <ind.icon size={32} className="text-primary mx-auto mb-3" />
              <span className="text-sm font-medium text-foreground">{ind.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <div className="gradient-primary rounded-2xl p-12 md:p-16 text-center text-primary-foreground">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Ready to Transform Your Business?</h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-xl mx-auto">
            Let our ERP experts guide your journey toward efficiency and growth.
          </p>
          <Link to="/contact">
            <Button variant="hero-outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Schedule a Consultation Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </main>
);

export default Index;
