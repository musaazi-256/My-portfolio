"use client";
import { useState } from "react";
import Reveal from "./Reveal";

const marqueeText =
  "5+ Years of Experience   /  80+ Successful Projects   /  30+ Happy Clients   /   100% Customer Satisfaction Rate   /  Brand Identity · UI/UX · Web Dev · Motion Graphics   /   Kampala, Uganda   /   Maisha Studio   /";

const socials = [
  { icon: "fa-brands fa-x-twitter", href: "https://x.com/musaazi", label: "X" },
  { icon: "fa-brands fa-instagram", href: "https://instagram.com/musaazi", label: "Instagram" },
  { icon: "fa-brands fa-youtube", href: "https://youtube.com/@musaazi", label: "YouTube" },
  { icon: "fa-brands fa-linkedin-in", href: "https://linkedin.com/in/musaazi", label: "LinkedIn" },
  { icon: "fa-brands fa-behance", href: "https://behance.net/musaazi", label: "Behance" },
];

export default function About() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("musaaziignatius@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const doubled = marqueeText + "   " + marqueeText;

  return (
    <>
      <section
        id="about"
        style={{
          padding: "0 5% 5%",
          maxWidth: "1064.96px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 3.84%",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left: sticky text */}
          <div style={{ position: "sticky", top: "20px" }}>
            <Reveal>
              <h5 className="section-label" style={{ marginBottom: "0.5rem" }}>
                / About Me
              </h5>
              <h3
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  color: "var(--color2)",
                  margin: "0 0 1.25rem",
                }}
              >
                <span style={{ color: "var(--accent)" }}>Creative</span>
                {" "}at the Core
              </h3>

              <p style={{ color: "var(--color2)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "0.75rem" }}>
                Designer. Marketer. Founder. Problem-solver.
              </p>
              <p style={{ color: "var(--color7)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "0.75rem" }}>
                With 5+ years of experience, I bridge creativity and technical
                ability — solving problems across branding, digital products,
                and motion design that strengthen businesses and drive real
                impact.
              </p>
              <p style={{ color: "var(--color7)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                I founded <strong style={{ color: "var(--color2)" }}>Maisha Studio</strong> where
                I lead creative work for brands and startups across Uganda and
                beyond. My impact is incomparable.
              </p>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                <a
                  href="https://calendar.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent"
                >
                  <i className="fas fa-calendar-alt" />
                  Schedule a call
                </a>
                <button className="btn-border" onClick={copyEmail}>
                  {copied ? "Copied!" : "Copy email"}
                </button>
              </div>

              {/* Stars + social */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.4rem" }}>
                {[1, 2, 3, 4].map((n) => (
                  <i key={n} className="fas fa-star" style={{ color: "var(--accent)", fontSize: "10px" }} />
                ))}
                <i className="fas fa-star" style={{ color: "var(--accent)", fontSize: "10px", opacity: 0.9 }} />
                <span style={{ fontSize: "0.85rem", color: "var(--color2)", marginLeft: "0.35rem" }}>
                  4.9 / 5
                </span>
              </div>
              <p style={{ fontSize: "0.9rem", color: "var(--color2)", marginBottom: "1rem" }}>
                Trusted by over 30+ clients
              </p>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    title={s.label}
                  >
                    <i className={s.icon} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: spacer (mirrors left column height) */}
          <div />
        </div>
      </section>

      {/* ── Marquee ── */}
      <div
        style={{
          overflow: "hidden",
          marginTop: "50px",
          marginBottom: "2%",
        }}
      >
        <div
          style={{
            fontSize: "0.9rem",
            color: "var(--color7)",
            fontFamily: "var(--font)",
            whiteSpace: "nowrap",
            display: "inline-block",
            animation: "marquee 50s linear infinite",
          }}
        >
          {doubled}
          &nbsp;&nbsp;&nbsp;
          {doubled}
        </div>
      </div>

      <style>{`
        @media (max-width: 999px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
