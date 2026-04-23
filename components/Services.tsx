import Reveal from "./Reveal";

const services = [
  {
    number: "01",
    label: "Top performing",
    title: "Brand Identity",
    desc: "I build cohesive visual identities from the ground up — logos, colour systems, typography, and brand guidelines that make businesses instantly recognisable and memorable.",
    tools: ["Logo Design", "Visual Identity", "Brand Strategy", "Style Guides", "Stationery & Print"],
    rotate: "scaleX(1) scaleY(1) translateX(5px) rotate(-1deg)",
    top: 80,
  },
  {
    number: "02",
    label: "User Focused",
    title: "UI / UX Design",
    desc: "I design intuitive digital experiences — from wireframes to polished high-fidelity prototypes. Testing and research keep every design grounded in what users actually need.",
    tools: ["User Research", "Wireframing", "Prototyping", "Figma", "Design Systems", "Framer"],
    rotate: "scaleX(1) scaleY(1) translateX(-5px) rotate(1deg)",
    top: 90,
  },
  {
    number: "03",
    label: "Modern & Fast",
    title: "Web Development",
    desc: "I build fast, responsive websites and web apps with modern frameworks. Clean code, great performance, and pixel-perfect execution from design to deployment.",
    tools: ["React / Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Flutter", "Vercel"],
    rotate: "scaleX(1) scaleY(1) translateX(5px) rotate(-1deg)",
    top: 100,
  },
  {
    number: "04",
    label: "Brand Defining",
    title: "Graphic Design",
    desc: "Highly skilled in creating digital visuals, posters, banners, ads, and marketing collateral to deliver clear messaging and engage audiences across every touchpoint.",
    tools: ["Adobe Illustrator", "Photoshop", "Figma", "Canva", "Social Media Visuals", "Print Design"],
    rotate: "scaleX(1) scaleY(1) translateX(-5px) rotate(1deg)",
    top: 110,
  },
  {
    number: "05",
    label: "Motion with Purpose",
    title: "Motion Graphics",
    desc: "Bringing brands to life with animation. Logo reveals, explainer videos, reels, and After Effects driven motion content that boosts brand presence and engagement.",
    tools: ["After Effects", "Premiere Pro", "Logo Animation", "Video Editing", "Explainer Videos", "Reels"],
    rotate: "scaleX(1) scaleY(1) translateX(5px) rotate(-1deg)",
    top: 120,
  },
];

export default function Services() {
  return (
    <section
      id="skills"
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
        className="services-grid"
      >
        {/* Left: sticky description */}
        <div style={{ position: "sticky", top: "20px" }}>
          <Reveal>
            <h5 className="section-label" style={{ marginBottom: "0.5rem" }}>
              / Services, Skills, Abilities
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
              What I do{" "}
              <span style={{ color: "var(--accent)" }}>best</span>
              <span style={{ color: "var(--accent)" }}>?</span>
            </h3>
            <p style={{ color: "var(--color7)", fontSize: "0.95rem", lineHeight: 1.7 }}>
              I lead brands, teams, and projects – creating design, web, video,
              and marketing solutions that help businesses grow and make a real
              impact.
            </p>
          </Reveal>
        </div>

        {/* Right: sticky stacking cards */}
        <div>
          {services.map((s) => (
            <div
              key={s.number}
              className="service-card"
              style={{
                position: "sticky",
                top: `${s.top}px`,
                zIndex: s.top - 70,
                marginBottom: "10%",
                transform: s.rotate,
              }}
            >
              <h6
                style={{
                  fontFamily: '"Gloria Hallelujah", cursive',
                  fontSize: "14px",
                  color: "var(--color7)",
                  fontWeight: 400,
                  margin: "3% 0",
                  letterSpacing: "0",
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </h6>
              <h3
                style={{
                  fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                  fontWeight: 600,
                  color: "var(--color2)",
                  letterSpacing: "-0.02em",
                  margin: "0 0 0.75rem",
                }}
              >
                {s.number}. {s.title}
              </h3>
              <p
                style={{
                  color: "var(--color2)",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  marginBottom: 0,
                }}
              >
                {s.desc}
              </p>
              <ul
                style={{
                  marginTop: "0.75rem",
                  paddingLeft: "1.1rem",
                  color: "#a5a5a5",
                  fontSize: "14px",
                  letterSpacing: "-0.3px",
                  lineHeight: 1.8,
                }}
              >
                {s.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 999px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
