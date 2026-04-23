import Reveal from "./Reveal";

const jobs = [
  { role: "Product Design Lead (UI/UX)", company: "ADWrap", period: "2025 – Present" },
  { role: "Art Director & Brand Manager", company: "Union Boda Boda Uganda", period: "2025" },
  { role: "Art Director", company: "SafeBoda Kenya", period: "2023 – 2024" },
  { role: "Art Director", company: "SafeBoda Uganda", period: "2020 – 2024" },
  { role: "Freelance Motion Graphics Designer", company: "Various Clients", period: "2019 – Present" },
];

export default function Career() {
  return (
    <section
      id="career"
      style={{
        padding: "5% 5% 2%",
        maxWidth: "1064.96px",
        margin: "0 auto",
      }}
    >
      <Reveal>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
          <div>
            <h5 className="section-label" style={{ marginBottom: "0.5rem" }}>
              / Career
            </h5>
            <h3
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                color: "var(--color2)",
                margin: 0,
              }}
            >
              Work <span style={{ color: "var(--accent)" }}>Experience</span>
            </h3>
          </div>
        </div>
      </Reveal>

      <div>
        {jobs.map((j, i) => (
          <Reveal key={i} delay={i * 60}>
            <div className="career-row">
              <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color2)" }}>
                {j.role}
              </span>
              <span style={{ fontSize: "0.9rem", color: "var(--color7)" }}>{j.company}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--color7)", textAlign: "right" }}>{j.period}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
