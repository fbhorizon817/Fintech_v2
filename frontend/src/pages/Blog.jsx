import SectionHeading from "@/components/SectionHeading.jsx";
import { ArrowRight } from "lucide-react";

const posts = [
  { title: "Why Businesses Are Moving to ERP Systems", excerpt: "Discover how ERP improves efficiency and decision-making across organizations of every size.", date: "Apr 10, 2026", tag: "ERP Strategy" },
  { title: "Benefits of Using Odoo for SMEs", excerpt: "Learn why Odoo is ideal for growing businesses looking for a flexible, affordable ERP solution.", date: "Mar 28, 2026", tag: "Odoo" },
  { title: "Common ERP Implementation Mistakes", excerpt: "Avoid costly errors during ERP deployment with these key insights from industry experts.", date: "Mar 15, 2026", tag: "Implementation" },
  { title: "Digital Transformation Strategies", excerpt: "How businesses can adapt to modern challenges through technology-driven transformation.", date: "Mar 2, 2026", tag: "Digital" },
];

const Blog = () => (
  <main>
    <section className="gradient-primary py-20 text-primary-foreground">
      <div className="container text-center">
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl mb-4">Insights & Resources</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
          Stay updated with the latest trends in ERP and digital transformation.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article key={post.title} className="bg-card rounded-xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
              <span className="text-xs font-medium text-secondary bg-accent px-3 py-1 rounded-full">{post.tag}</span>
              <h3 className="font-heading font-bold text-xl mt-4 mb-2 text-foreground group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{post.date}</span>
                <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more <ArrowRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default Blog;
