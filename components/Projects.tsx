"use client";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

const projects = [
  {
    title: "SafeBoda — Art Direction",
    role: "Art Director",
    category: "Brand · Campaign",
    image: "/images/project-safeboda.jpg",
    href: null,
  },
  {
    title: "Union Boda Boda — Brand Campaign",
    role: "Art Director & Brand Manager",
    category: "Brand Identity · Campaign",
    image: "/images/project-union-tusimbudde.jpg",
    href: null,
  },
  {
    title: "Union Boda Boda — Driver Training",
    role: "Art Director & Brand Manager",
    category: "Print · Social Media",
    image: "/images/project-union-driver.jpg",
    href: null,
  },
  {
    title: "ADWrap — OOH OwnerHub",
    role: "Product Design Lead",
    category: "UI/UX · Case Study",
    image: "/images/project-uiux.png",
    href: "/case-study/adwrap",
  },
];

export default function Projects() {
  return (
    <section
      id="portfolio"
      style={{
        padding: "5% 5%",
        maxWidth: "1064.96px",
        margin: "0 auto",
      }}
    >
      <Reveal>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h5 className="section-label" style={{ marginBottom: "0.5rem" }}>
              / Portfolio Projects
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
              <span style={{ color: "var(--accent)" }}>Selected</span> Work Samples
            </h3>
          </div>
        </div>
      </Reveal>

      {/* 2×2 image grid */}
      <div
        className="portfolio-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.25rem",
          marginBottom: "1.25rem",
        }}
      >
        {projects.map((p, i) => {
          const cardStyle = {
            display: "block",
            background: "#f7f7f7",
            border: "1px solid #ffffff",
            borderRadius: "25px",
            overflow: "hidden",
            cursor: p.href ? "pointer" : "default",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            textDecoration: "none",
            color: "inherit",
          };
          const inner = () => (
            <>
              <div style={{ position: "relative", aspectRatio: "1 / 1", background: "#ebebeb" }}>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center center" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div style={{ padding: "1rem 1.25rem" }}>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color2)", marginBottom: "0.2rem" }}>
                  {p.title}
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--color7)" }}>
                  {p.role} · {p.category}
                </p>
                {p.href && (
                  <p style={{ fontSize: "0.78rem", color: "var(--accent)", marginTop: "0.35rem", fontWeight: 600 }}>
                    View case study →
                  </p>
                )}
              </div>
            </>
          );

          const hoverOn = (e: React.MouseEvent<HTMLElement>) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)";
          };
          const hoverOff = (e: React.MouseEvent<HTMLElement>) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          };

          return (
            <Reveal key={p.title} delay={i * 60}>
              {p.href ? (
                <Link href={p.href} style={cardStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                  {inner()}
                </Link>
              ) : (
                <div style={cardStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                  {inner()}
                </div>
              )}
            </Reveal>
          );
        })}
      </div>

      {/* Full-width dashed CTA card */}
      <Reveal delay={280}>
        <a
          href="#contact"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            width: "100%",
            background: "#ffffff",
            border: "1px dashed #c6c6c6",
            borderRadius: "25px",
            padding: "2rem",
            textDecoration: "none",
            color: "var(--color2)",
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            transition: "background 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#f7f7f7";
            (e.currentTarget as HTMLElement).style.borderColor = "#aaaaaa";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#ffffff";
            (e.currentTarget as HTMLElement).style.borderColor = "#c6c6c6";
          }}
        >
          Click here to see my Complete Portfolio »
        </a>
      </Reveal>

      <style>{`
        @media (max-width: 600px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
