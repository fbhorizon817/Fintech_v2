import SectionHeading from "@/components/SectionHeading.jsx";
import { Eye, Target, Heart, Award, Users, Handshake } from "lucide-react";

const values = [
  { icon: Heart, title: "Integrity & Professionalism" },
  { icon: Award, title: "Innovation & Continuous Learning" },
  { icon: Users, title: "Client-Centered Approach" },
  { icon: Target, title: "Excellence in Delivery" },
  { icon: Handshake, title: "Long-Term Partnerships" },
];

const About = () => (
  <main>
    <section className="gradient-primary py-20 text-primary-foreground">
      <div className="container text-center">
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl mb-4">About Us</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
          A technology consulting firm specializing in ERP implementation, customization, and professional training.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="container max-w-3xl">
        <SectionHeading title="Who We Are" gradient />
        <p className="text-muted-foreground text-lg leading-relaxed text-center">
          Fintech Balance Horizon is a technology consulting firm specializing in ERP implementation, customization, and professional training. As a partner of Odoo, we help organizations integrate and automate their business processes into one unified system — improving efficiency, transparency, and decision-making.
        </p>
      </div>
    </section>

    <section className="py-20 section-alt">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-2xl p-8 card-shadow">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <Eye size={24} className="text-primary-foreground" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-3 text-foreground">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become a leading provider of ERP solutions and digital transformation services in the region.
            </p>
          </div>
          <div className="bg-card rounded-2xl p-8 card-shadow">
            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
              <Target size={24} className="text-primary-foreground" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-3 text-foreground">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To empower businesses through technology, training, and strategic ERP implementation.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <SectionHeading title="Our Values" gradient />
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {values.map((v) => (
            <div key={v.title} className="bg-card rounded-xl p-6 text-center card-shadow hover:card-shadow-hover transition-all duration-300">
              <v.icon size={28} className="text-primary mx-auto mb-3" />
              <span className="font-medium text-sm text-foreground">{v.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default About;
