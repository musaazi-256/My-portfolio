import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "5% 5% 10%",
        maxWidth: "1064.96px",
        margin: "0 auto",
      }}
    >
      <Reveal>
        <h5 className="section-label" style={{ marginBottom: "0.5rem" }}>
          / Contact
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
          Let&apos;s work <span style={{ color: "var(--accent)" }}>together</span>
        </h3>
      </Reveal>

      <Reveal delay={80}>
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--color3)",
            borderRadius: "35px",
            padding: "5% 7%",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.6rem, 4vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "var(--color2)",
              marginBottom: "1rem",
            }}
          >
            Have a project in mind?
          </h2>
          <p
            style={{
              color: "var(--color7)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              maxWidth: "440px",
              margin: "0 auto 2rem",
            }}
          >
            I&apos;m always open to new opportunities, collaborations, and interesting
            projects. Let&apos;s create something great together.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:musaaziignatius@gmail.com" className="btn-accent">
              <i className="fas fa-envelope" />
              musaaziignatius@gmail.com
            </a>
            <a
              href="https://calendar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-border"
            >
              <i className="fas fa-calendar-alt" />
              Schedule a call
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
