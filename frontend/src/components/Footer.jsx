import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const Footer = () => (
  <footer className="gradient-primary text-primary-foreground">
    <div className="container py-16">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-heading font-bold text-xl mb-4">Fintech Balance Horizon</h3>
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            ERP Consulting | Odoo Training | Digital Transformation
          </p>
          <p className="text-primary-foreground/60 text-xs mt-2">Official Partner of Odoo</p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/80">
            <Link to="/about" className="hover:text-primary-foreground transition-colors">About Us</Link>
            <Link to="/services" className="hover:text-primary-foreground transition-colors">Services</Link>
            <Link to="/training" className="hover:text-primary-foreground transition-colors">Training</Link>
            <Link to="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link>
            <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Services</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/80">
            <span>Odoo Implementation</span>
            <span>Odoo Customization</span>
            <span>ERP Consulting</span>
            <span>Odoo Training</span>
            <span>Support & Maintenance</span>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/80">
            <a href="mailto:info@fintechbalancehorizon.com" className="flex items-center gap-2 hover:text-primary-foreground">
              <Mail size={16} /> info@fintechbalancehorizon.com
            </a>
            <span className="flex items-center gap-2"><Phone size={16} /> +92 XXX XXX XXXX</span>
            <a href="https://www.fintechbalancehorizon.com" className="flex items-center gap-2 hover:text-primary-foreground">
              <Globe size={16} /> www.fintechbalancehorizon.com
            </a>
            <span className="flex items-center gap-2"><MapPin size={16} /> Pakistan</span>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-12 pt-6 text-center text-sm text-primary-foreground/60">
        © {new Date().getFullYear()} Fintech Balance Horizon. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
