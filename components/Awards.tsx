import Reveal from "./Reveal";

const awards = [
  { title: "Winning UI/UX Designer", platform: "SafeBoda Product Hackathon", date: "2023" },
];

export default function Awards() {
  return (
    <section
      id="awards"
      style={{
        padding: "5% 5% 2%",
        maxWidth: "1064.96px",
        margin: "0 auto",
      }}
    >
      <Reveal>
        <h5 className="section-label" style={{ marginBottom: "0.5rem" }}>
          / International Credibility
        </h5>
        <h3
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "var(--color2)",
            margin: "0 0 1rem",
          }}
        >
          <span style={{ color: "var(--accent)" }}>Awards</span> and Recognition
        </h3>
        <p style={{ color: "var(--color7)", fontSize: "0.9rem", maxWidth: "60%", lineHeight: 1.7, marginBottom: "2rem" }}>
          Awards aren&apos;t everything, but they signal impact, taste, and execution.
          I hold my work to high standards and consistently deliver at that level.
        </p>
      </Reveal>

      <div>
        {awards.map((a, i) => (
          <Reveal key={i} delay={i * 60}>
            <div className="award-row">
              <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--color2)" }}>
                {a.title}
              </span>
              <span style={{ fontSize: "0.9rem", color: "var(--color7)" }}>{a.platform}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--color7)", textAlign: "right" }}>
                {a.date}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
