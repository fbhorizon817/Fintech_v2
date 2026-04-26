const SectionHeading = ({ title, subtitle, gradient = false, centered = true }) => (
  <div className={`mb-12 ${centered ? "text-center" : ""}`}>
    <h2 className={`font-heading font-bold text-3xl md:text-4xl mb-4 ${gradient ? "gradient-text" : "text-foreground"}`}>
      {title}
    </h2>
    {subtitle && (
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
    )}
  </div>
);

export default SectionHeading;
