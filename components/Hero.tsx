"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || window.innerWidth <= 768) return;

    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = wrapper.getBoundingClientRect();
        const scrolled = -rect.top;                          // px scrolled past wrapper top
        const scrollRange = wrapper.offsetHeight - window.innerHeight; // 100vh of scroll room
        const p = Math.max(0, Math.min(1, scrolled / scrollRange));
        wrapper.style.setProperty("--hero-p", p.toFixed(4));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    /* Wrapper is 200vh tall — the extra 100vh is the scroll track for the animation */
    <div
      ref={wrapperRef}
      className="hero-wrapper"
      style={{ "--hero-p": "0" } as React.CSSProperties}
    >
      <section className="hero-section">
        {/* Left border line */}
        <div aria-hidden="true" className="hero-left-line" />

        {/* Rotated "Creative Director" */}
        <div aria-hidden="true" className="hero-rotated-label">
          UI/UX Designer & Creative Director
        </div>

        {/* Rotated year */}
        <div aria-hidden="true" className="hero-rotated-year">
          {new Date().getFullYear()}
        </div>

        {/* Portrait photo — animates toward center while blurring out */}
        <div className="hero-photo">
          <Image
            src="/images/my-image.png"
            alt="Ignatius Musaazi"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
          <div className="hero-photo-fade" />
        </div>

        {/* Content — animates toward center on top of photo */}
        <div className="hero-content">
          <div className="hero-stats">
            <div>
              <p className="hero-stat-num">+100</p>
              <p className="hero-stat-label">Projects completed</p>
            </div>
            <div>
              <p className="hero-stat-num">+5</p>
              <p className="hero-stat-label">Years experience</p>
            </div>
          </div>

          <div>
            <h1 className="hero-heading">
              Hello,{" "}
              <span style={{ color: "var(--accent)" }}>client</span>
            </h1>
            <p className="hero-tagline">
              — I&apos;m Ignatius, a UI/UX Designer & Creative Director
            </p>
          </div>

          <p className="hero-scroll">Scroll down ↓</p>
        </div>
      </section>

      <style>{`
        /* ─────────────────────────────────────────
           Wrapper & sticky section
        ───────────────────────────────────────── */
        .hero-wrapper {
          height: 200vh;       /* 100vh visible + 100vh scroll track */
          position: relative;
        }
        .hero-section {
          position: sticky;
          top: 0;
          height: 100vh;
          background: var(--color1);
          overflow: hidden;
          display: flex;
          align-items: stretch;
        }

        /* ─────────────────────────────────────────
           Left decorations
        ───────────────────────────────────────── */
        .hero-left-line {
          position: absolute;
          left: 32px; top: 0; bottom: 0;
          width: 1px;
          background: var(--color3);
          z-index: 1;
        }
        .hero-rotated-label {
          position: absolute;
          left: 6px; top: 50%;
          transform: rotate(-90deg) translateX(-50%);
          transform-origin: left center;
          font-size: 0.65rem;
          color: var(--color7);
          letter-spacing: 2px;
          text-transform: uppercase;
          white-space: nowrap;
          z-index: 2;
        }
        .hero-rotated-year {
          position: absolute;
          left: 6px; bottom: 40px;
          transform: rotate(-90deg);
          transform-origin: left bottom;
          font-size: 0.65rem;
          color: var(--color7);
          letter-spacing: 2px;
          z-index: 2;
        }

        /* ─────────────────────────────────────────
           Photo — right side, scroll-animated
        ───────────────────────────────────────── */
        .hero-photo {
          position: absolute;
          right: 2%; top: 8%; bottom: 8%;
          width: 48%;
          border-radius: 16px;
          overflow: hidden;
          z-index: 1;
          /* Scroll animation: moves left, blurs, fades */
          transform: translateX(calc(var(--hero-p, 0) * -26vw));
          filter: grayscale(100%) blur(calc(var(--hero-p, 0) * 22px));
          opacity: calc(1 - var(--hero-p, 0));
          will-change: transform, filter, opacity;
        }
        .hero-photo-fade {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 30%;
          background: linear-gradient(to right, var(--color1) 0%, transparent 100%);
        }

        /* ─────────────────────────────────────────
           Content — left side, scroll-animated
        ───────────────────────────────────────── */
        .hero-content {
          position: relative;
          z-index: 2;               /* stays above the photo */
          width: 42%;
          min-width: 300px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 5% 0 5% 6%;
          /* Scroll animation: drifts right toward center */
          transform: translateX(calc(var(--hero-p, 0) * 23vw));
          will-change: transform;
        }

        /* ─────────────────────────────────────────
           Stats / heading / tagline / scroll cue
        ───────────────────────────────────────── */
        .hero-stats {
          display: flex;
          gap: 2.5rem;
          align-items: flex-start;
        }
        .hero-stat-num {
          font-family: "Clash Display", sans-serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--color2);
          margin: 0;
          letter-spacing: -0.03em;
        }
        .hero-stat-label {
          font-size: 0.75rem;
          color: var(--color7);
          margin: 2px 0 0;
        }
        .hero-heading {
          font-family: "Clash Display", sans-serif;
          font-size: clamp(80px, 13vw, 190px);
          font-weight: 400;
          line-height: 0.9;
          letter-spacing: -0.04em;
          color: var(--color2);
          margin: 0 0 1.25rem;
        }
        .hero-tagline {
          font-size: clamp(0.9rem, 1.2vw, 1.1rem);
          color: var(--color2);
          font-weight: 400;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .hero-scroll {
          font-size: 0.875rem;
          color: var(--color7);
          margin: 0;
          letter-spacing: -0.01em;
        }

        /* ─────────────────────────────────────────
           Mobile — single-column, no animation
        ───────────────────────────────────────── */
        @media (max-width: 768px) {
          .hero-wrapper {
            height: auto;
          }
          .hero-section {
            position: static;
            height: auto;
            min-height: auto;
            flex-direction: column;
            padding: calc(56px + 5%) 5% 10%;
            overflow: visible;
            margin-bottom: 0;
          }

          /* Photo: full-width card at top, no animation */
          .hero-photo {
            position: relative;
            right: auto; top: auto; bottom: auto;
            width: 100%;
            aspect-ratio: 4 / 5;
            height: auto;
            border-radius: 20px;
            margin-bottom: 7%;
            order: -1;
            flex-shrink: 0;
            transform: none !important;
            filter: grayscale(100%) !important;
            opacity: 1 !important;
          }
          .hero-photo-fade { display: none; }

          /* Content: full-width, no animation */
          .hero-content {
            width: 100%;
            min-width: unset;
            padding: 0;
            gap: 6%;
            justify-content: flex-start;
            transform: none !important;
          }
          .hero-heading {
            font-size: clamp(64px, 18vw, 100px);
          }

          /* Hide desktop-only decorations */
          .hero-left-line,
          .hero-rotated-label,
          .hero-rotated-year {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
