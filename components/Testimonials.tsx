import Reveal from "./Reveal";

const reviews = [
  {
    quote: "Musaazi has an incredible eye for detail. He transformed our brand from scratch and delivered something we are genuinely proud of. The process was smooth and the results speak for themselves.",
    name: "Sarah Nakito",
    role: "Founder, NaturalHue Uganda",
    initials: "SN",
  },
  {
    quote: "Ignatius has completely transformed how Kyanja Junior School presents itself digitally. From our website to social media flyers, every platform now looks professional and consistent. Parents notice the difference and our enrolment inquiries have increased significantly. He manages everything — we just focus on teaching.",
    name: "Miti Julius",
    role: "Board Member, Kyanja Junior School",
    initials: "MJ",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        padding: "5% 5%",
        maxWidth: "1064.96px",
        margin: "0 auto",
      }}
    >
      <Reveal>
        <h5 className="section-label" style={{ marginBottom: "0.5rem" }}>
          / Client Reviews
        </h5>
        <h3
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "var(--color2)",
            margin: "0 0 2rem",
          }}
        >
          What clients <span style={{ color: "var(--accent)" }}>say</span>
        </h3>
      </Reveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.25rem",
        }}
        className="reviews-grid"
      >
        {reviews.map((r, i) => (
          <Reveal key={r.name} delay={i * 60}>
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--color3)",
                borderRadius: "20px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                height: "100%",
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: "3px" }}>
                {[1,2,3,4,5].map((n) => (
                  <i key={n} className="fas fa-star" style={{ color: "var(--accent)", fontSize: "11px" }} />
                ))}
              </div>

              <p style={{ color: "var(--color2)", fontSize: "0.875rem", lineHeight: 1.75, flex: 1 }}>
                &ldquo;{r.quote}&rdquo;
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", borderTop: "1px solid var(--color3)", paddingTop: "1rem" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "var(--color1)",
                    border: "1px solid var(--color3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--color2)",
                    flexShrink: 0,
                  }}
                >
                  {r.initials}
                </div>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color2)" }}>{r.name}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--color7)" }}>{r.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
