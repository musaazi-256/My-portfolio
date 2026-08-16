"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const visualWork = [
  {
    number: "01",
    category: "Product UI",
    title: "Interface Direction",
    image: "/visual-work/adwrap-dashboard.jpg",
    alt: "ADWrap product dashboard interface",
    type: "hero",
  },
  {
    number: "02",
    category: "Brand Work",
    title: "Campaign Visuals",
    image: "/visual-work/safeboda-campaign.jpg",
    alt: "SafeBoda campaign visual",
    type: "portrait",
  },
  {
    number: "03",
    category: "Mobile Product",
    title: "Mobile App Flow",
    image: "/visual-work/dondolo-mobile.jpg",
    alt: "Dondolo mobile application interface",
    type: "portrait",
  },
  {
    number: "04",
    category: "Pitch Design",
    title: "Founder Pitch Visual",
    image: "/visual-work/pitch-design.jpg",
    alt: "Product pitch presentation design",
    type: "portrait",
  },
  {
    number: "05",
    category: "Web Design",
    title: "Responsive Web UI",
    image: "/visual-work/kyanja-web.jpg",
    alt: "Kyanja Junior School responsive website",
    type: "portrait",
  },
  {
    number: "06",
    category: "Motion",
    title: "Motion & Content",
    image: "/visual-work/motion-design.jpg",
    alt: "Motion graphics and content design",
    type: "portrait",
  },
  {
    number: "07",
    category: "Frontend",
    title: "Build Ready",
    image: "/visual-work/frontend-build.jpg",
    alt: "Frontend implementation",
    type: "wide",
  },
];

const capabilities = [
  {
    title: "Product Thinking",
    description: "Focused on solving real problems with clarity.",
    icon: "grid",
  },
  {
    title: "Visual Storytelling",
    description: "Crafting visuals that communicate and convert.",
    icon: "brush",
  },
  {
    title: "System & Scale",
    description: "Building reusable systems that grow with products.",
    icon: "layers",
  },
  {
    title: "Developer Handoff",
    description: "Pixel-perfect specs and smooth collaboration.",
    icon: "code",
  },
  {
    title: "Speed & Iteration",
    description: "Fast execution without compromising quality.",
    icon: "bolt",
  },
];

function CapabilityIcon({ type }: { type: string }) {
  if (type === "brush") {
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 4l6 6" />
        <path d="M17 2l5 5" />
        <path d="M19 8L8 19" />
        <path d="M5 22c2.5-1 4-2.5 4-5-3.5 0-5 1.5-6 4-.2.6.4 1.2 2 1z" />
      </svg>
    );
  }

  if (type === "layers") {
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l9 5-9 5-9-5 9-5z" />
        <path d="M3 12l9 5 9-5" />
        <path d="M3 17l9 5 9-5" />
      </svg>
    );
  }

  if (type === "code") {
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 9l-4 3 4 3" />
        <path d="M16 9l4 3-4 3" />
        <path d="M14 5l-4 14" />
      </svg>
    );
  }

  if (type === "bolt") {
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    );
  }

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export function VisualArchive() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  const [translateX, setTranslateX] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const calculateDimensions = useCallback(() => {
    const section = sectionRef.current;
    const rail = railRef.current;

    if (!section || !rail) return;

    if (window.innerWidth < 768) {
      section.style.height = "auto";
      setMaxTranslate(0);
      return;
    }

    const distance = Math.max(
      0,
      rail.scrollWidth - window.innerWidth
    );

    setMaxTranslate(distance);

    /*
     * Vertical distance available for the horizontal
     * gallery movement.
     */
    section.style.height = `${
      window.innerHeight + distance
    }px`;
  }, []);

  useEffect(() => {
    calculateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      calculateDimensions();
    });

    if (railRef.current) {
      resizeObserver.observe(railRef.current);
    }

    window.addEventListener("resize", calculateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateDimensions);
    };
  }, [calculateDimensions]);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const section = sectionRef.current;

      if (!section || window.innerWidth < 768) {
        ticking = false;
        return;
      }

      const rect = section.getBoundingClientRect();

      const scrolled = Math.max(0, -rect.top);

      const available =
        section.offsetHeight - window.innerHeight;

      const nextProgress =
        available > 0
          ? Math.min(1, Math.max(0, scrolled / available))
          : 0;

      const nextTranslate =
        nextProgress * maxTranslate;

      setProgress(nextProgress);
      setTranslateX(nextTranslate);

      /*
       * Determine which card is visually dominant.
       */
      const nextIndex = Math.min(
        visualWork.length - 1,
        Math.round(
          nextProgress * (visualWork.length - 1)
        )
      );

      setActiveIndex(nextIndex);

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [maxTranslate]);

  const goToSlide = (index: number) => {
    const section = sectionRef.current;

    if (!section || window.innerWidth < 768) return;

    const nextIndex = Math.max(
      0,
      Math.min(visualWork.length - 1, index)
    );

    const nextProgress =
      nextIndex / (visualWork.length - 1);

    const target =
      section.offsetTop +
      nextProgress *
        (section.offsetHeight - window.innerHeight);

    window.scrollTo({
      top: target,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="visual-archive-section"
    >
      <div className="visual-archive-sticky">

        {/* ================= HEADER ================= */}

        <header className="mx-auto w-full max-w-[1540px] px-5 sm:px-6 lg:px-10 xl:px-14">
          <p className="section-kicker">/ Visual Archive</p>
          <h2 className="mt-4 max-w-xl text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl">
            Selected <span className="accent-text">Visual Work</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-ink/[0.68] sm:mt-6 sm:text-lg sm:leading-8">
            A fast browse through product screens, brand systems, campaign visuals, and interface ideas that show range even when they do not need a full case study.
          </p>
        </header>


        {/* ================= DESKTOP RAIL ================= */}

        <div className="visual-archive-gallery">

          <div className="visual-archive-viewport">

            <div
              ref={railRef}
              className="visual-archive-rail"
              style={{
                transform: `translate3d(-${translateX}px, 0, 0)`,
              }}
            >

              {visualWork.map((item, index) => (
                <figure
                  key={item.number}
                  className={[
                    "visual-work-card",
                    index === activeIndex
                      ? "is-active"
                      : "",
                  ].join(" ")}
                >

                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    priority={index < 3}
                    sizes="(max-width: 768px) 88vw, 42vw"
                    className="visual-work-image"
                  />

                  <div className="visual-work-overlay" />

                  {index === activeIndex && (
                    <div className="visual-work-active-glow" />
                  )}

                  <button
                    type="button"
                    className="visual-work-arrow"
                    aria-label={`View ${item.title}`}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </button>

                  <figcaption>

                    <div className="visual-work-meta">

                      <span className="visual-work-category">
                        {item.category}
                      </span>

                    </div>

                    <strong>
                      {item.title}
                    </strong>

                    <div className="visual-work-number">
                      {item.number}
                    </div>

                    <div className="visual-work-card-line">
                      <span
                        style={{
                          transform:
                            index === activeIndex
                              ? "scaleX(1)"
                              : "scaleX(0)",
                        }}
                      />
                    </div>

                  </figcaption>

                </figure>
              ))}

            </div>

          </div>


          {/* ================= CONTROLS ================= */}

          <div className="visual-archive-controls">

            <div className="visual-archive-progress">

              <div className="visual-archive-counter">
                <strong>
                  {String(activeIndex + 1).padStart(2, "0")}
                </strong>

                <span>/</span>

                <span>
                  {String(visualWork.length).padStart(2, "0")}
                </span>
              </div>

              <div className="visual-archive-progress-track">
                <span
                  style={{
                    width: `${Math.max(
                      4,
                      progress * 100
                    )}%`,
                  }}
                />
              </div>

            </div>


            <div className="visual-archive-drag">

              <span />
              <span className="drag-icon">✦</span>
              <span>Drag to explore</span>
              <span />
              
            </div>


            <div className="visual-archive-arrows">

              <button
                type="button"
                onClick={() =>
                  goToSlide(activeIndex - 1)
                }
                disabled={activeIndex === 0}
                aria-label="Previous visual work"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() =>
                  goToSlide(activeIndex + 1)
                }
                disabled={
                  activeIndex === visualWork.length - 1
                }
                aria-label="Next visual work"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>

            </div>

          </div>

        </div>


        {/* ================= CAPABILITIES ================= */}

        <div className="visual-archive-capabilities">

          {capabilities.map((item) => (
            <div
              key={item.title}
              className="visual-capability"
            >

              <div className="visual-capability-icon">
                <CapabilityIcon type={item.icon} />
              </div>

              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>

            </div>
          ))}

        </div>


        {/* ================= MOBILE ================= */}

        <div className="visual-archive-mobile">

          <div className="visual-archive-mobile-track">

            {visualWork.map((item) => (
              <figure
                key={item.number}
                className="visual-mobile-card"
              >

                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="88vw"
                  className="visual-work-image"
                />

                <div className="visual-work-overlay" />

                <figcaption>

                  <span className="visual-work-category">
                    {item.category}
                  </span>

                  <strong>
                    {item.title}
                  </strong>

                  <small>
                    {item.number} / 07
                  </small>

                </figcaption>

              </figure>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}
