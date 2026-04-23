export default function Footer() {
  const marqueeText =
    "Let's work together  ✱  Let's work together  ✱  Let's work together  ✱  Let's work together  ✱  Let's work together  ✱  ";

  return (
    <footer style={{ background: "var(--color1)", marginTop: "3%" }}>

      {/* ── Banner section ──
          Outer div has NO overflow:hidden — the watermark clips itself.
          Height is driven by content (marquee + contact) plus generous padding.
      */}
      <div
        style={{
          position: "relative",
          paddingTop: "6%",
          paddingBottom: "6%",
          minHeight: "380px",
        }}
      >
        {/* Watermark name — absolutely fills the banner, clips its own wide text */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",   /* clips the h2 horizontally to the banner bounds */
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <h2
            style={{
              fontFamily: '"Clash Display", sans-serif',
              fontSize: "16vw",
              fontWeight: 400,
              letterSpacing: "-0.5px",
              color: "#eaeaea",
              WebkitTextStroke: "2px #d8d8d8",
              lineHeight: 1.2,
              margin: 0,
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            Ignatius Musaazi
          </h2>
        </div>

        {/* Marquee — sits above watermark */}
        <div
          className="marquee-wrap"
          style={{ position: "relative", zIndex: 1, marginBottom: "6%" }}
        >
          <div className="marquee-track">
            <span
              style={{
                fontSize: "clamp(2rem, 4vw, 4rem)",
                fontWeight: 500,
                letterSpacing: "-1px",
                lineHeight: 3,
                color: "var(--color2)",
                whiteSpace: "nowrap",
              }}
            >
              {marqueeText}
            </span>
            <span
              style={{
                fontSize: "clamp(2rem, 4vw, 4rem)",
                fontWeight: 500,
                letterSpacing: "-1px",
                lineHeight: 3,
                color: "var(--color2)",
                whiteSpace: "nowrap",
              }}
            >
              {marqueeText}
            </span>
          </div>
        </div>

        {/* Contact details — centered below marquee, above watermark */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <a
            href="mailto:musaaziignatius@gmail.com"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
              fontWeight: 500,
              letterSpacing: "-1.3px",
              color: "var(--color2)",
              textDecoration: "none",
            }}
          >
            <i className="fas fa-envelope" style={{ fontSize: "15px" }} />
            musaaziignatius@gmail.com
          </a>
          <a
            href="tel:+256783244291"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
              fontWeight: 500,
              letterSpacing: "-1.3px",
              color: "var(--color2)",
              textDecoration: "none",
            }}
          >
            <i className="fas fa-phone" style={{ fontSize: "15px" }} />
            +256 783 244 291
          </a>
        </div>
      </div>

      {/* ── Footer bar ── */}
      <div
        style={{
          padding: "3% 5% 8%",
          maxWidth: "1064.96px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            letterSpacing: "-1.3px",
            color: "var(--color2)",
          }}
        >
          {new Date().getFullYear()}
        </span>
        <span
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            letterSpacing: "-1.3px",
            color: "var(--color2)",
          }}
        >
          All rights reserved.
        </span>
      </div>
    </footer>
  );
}
