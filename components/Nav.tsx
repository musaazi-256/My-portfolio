"use client";
import { useState } from "react";

const links = [
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Reviews", href: "#testimonials" },
];

export default function Nav() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@musaazi.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* ── Desktop bottom pill nav ── */}
      <nav
        style={{
          position: "fixed",
          bottom: "24px",
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          padding: "0 1rem",
        }}
        className="fusion-no-small-visibility"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.15rem",
            background: "linear-gradient(180deg, #0a0a0a 0%, #232323 100%)",
            border: "1px solid #dbdbdb",
            borderRadius: "100px",
            padding: "5px",
          }}
        >
          {/* Home icon */}
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50px",
              color: "#eaeaea",
              fontSize: "1.1rem",
              border: "1px solid #4c4c4c",
              textDecoration: "none",
              transition: "color 0.2s, border-color 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#e28800";
              (e.currentTarget as HTMLElement).style.borderColor = "#e28800";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#eaeaea";
              (e.currentTarget as HTMLElement).style.borderColor = "#4c4c4c";
            }}
          >
            <i className="fas fa-home" />
          </a>

          {/* Nav links */}
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                color: "#eaeaea",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontFamily: "var(--font)",
                fontWeight: 400,
                padding: "0.5rem 1rem",
                borderRadius: "50px",
                transition: "color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#e28800")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#eaeaea")}
            >
              {l.label}
            </a>
          ))}

          {/* Contact me CTA */}
          <a
            href="#contact"
            style={{
              background: "#e28800",
              color: "#fff",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontFamily: "var(--font)",
              fontWeight: 500,
              padding: "0.55rem 1.1rem",
              borderRadius: "50px",
              transition: "background 0.2s, color 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#d3d3d3";
              (e.currentTarget as HTMLElement).style.color = "#333333";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#e28800";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
          >
            Contact me
          </a>
        </div>
      </nav>

      {/* ── Mobile top bar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "linear-gradient(180deg, #0a0a0a 0%, #232323 100%)",
          padding: "0.75rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="fusion-no-large-visibility fusion-no-medium-visibility"
      >
        <span style={{ color: "#eaeaea", fontSize: "1rem", fontWeight: 500 }}>
          Musaazi
        </span>
        <button
          onClick={copyEmail}
          style={{
            background: "none",
            border: "1px solid #4c4c4c",
            borderRadius: "8px",
            color: "#eaeaea",
            padding: "0.4rem 0.75rem",
            fontSize: "0.8rem",
            cursor: "pointer",
            fontFamily: "var(--font)",
          }}
        >
          {copied ? "Copied!" : "☰ Menu"}
        </button>
      </nav>

      <style>{`
        @media (min-width: 1000px) {
          .fusion-no-large-visibility { display: none !important; }
        }
        @media (max-width: 999px) {
          .fusion-no-small-visibility { display: none !important; }
        }
      `}</style>
    </>
  );
}
