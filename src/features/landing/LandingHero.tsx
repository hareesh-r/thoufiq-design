import { useEffect, useLayoutEffect, useRef, useState } from "react";
import data from "../../data/hero.json";
import site from "../../data/site.json";
import styles from "./LandingHero.module.css";

const ROTATE_MS = 4000;

function RotatingTestimonials({
  items,
}: {
  items: { initial: string; text: string }[];
}) {
  const [index, setIndex] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);
  const [widthPx, setWidthPx] = useState<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      ROTATE_MS
    );
    return () => window.clearInterval(id);
  }, [items.length]);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const w = el.getBoundingClientRect().width;
    const max = typeof window !== "undefined" ? window.innerWidth - 32 : w;
    setWidthPx(Math.min(w, max));
  }, [index, items]);

  const current = items[index] ?? items[0];

  return (
    <>
      <div
        ref={measureRef}
        className={`${styles.testimonial} ${styles.testimonialMeasure}`}
        aria-hidden
      >
        <div className={styles.avatar}>{current.initial}</div>
        <p className={styles.testimonialLine}>{current.text}</p>
      </div>
      <div
        className={`${styles.testimonial} ${styles.testimonialAnimated}`}
        style={
          widthPx != null
            ? {
                width: `${widthPx}px`,
              }
            : undefined
        }
      >
        <div className={styles.avatar} aria-hidden>
          {current.initial}
        </div>
        <p className={styles.testimonialLine} aria-live="polite">
          {current.text}
        </p>
      </div>
    </>
  );
}

export function LandingHero() {
  return (
    <section className={styles.section} aria-labelledby="hero-title">
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.stack}>
            <p className={styles.badge}>{data.badge}</p>
            <h1 id="hero-title" className={styles.title}>
              {data.title}
              <span className={styles.titleAccent}>{data.titleAccent}</span>
            </h1>
            <p className={styles.subtitle}>{data.subtitle}</p>
            <a className={styles.heroEnroll} href={site.heroCta.href}>
              <span className={styles.heroEnrollShine} aria-hidden>
                <span className={styles.heroEnrollShineBeam} />
              </span>
              <span className={styles.heroEnrollRow}>
                <svg
                  className={styles.heroEnrollSparkle}
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M20 3v4M22 5h-4M4 17v2M5 18H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>{site.heroCta.label}</span>
              </span>
            </a>
            <RotatingTestimonials items={data.testimonials} />
          </div>
        </div>
      </div>

      <div className={styles.secondaryHero}>
        <div className={styles.secondaryInner}>
          <p className={styles.videoEyebrow}>{data.videoEyebrow}</p>
          <h2 className={styles.videoHeading}>
            <span className={styles.videoTitleLine}>
              <span className={styles.videoTitleLead}>{data.videoTitleLead}</span>
              <span className={styles.videoTitleAccent}> {data.videoTitleAccent}</span>
            </span>
          </h2>
          <p className={styles.videoDesc}>{data.videoDescription}</p>

          <div className={styles.videoFrame}>
            <div className={styles.videoInner}>
              <img
                className={styles.videoThumb}
                src={data.videoThumbnail}
                alt=""
                width={1242}
                height={596}
                decoding="async"
              />
              <button type="button" className={styles.playFab} aria-label={data.videoPlayLabel}>
                <span className={styles.playGlassRing} aria-hidden />
                <span className={styles.playFabInner} aria-hidden>
                  <img src="/assets/hero-play.svg" alt="" width={28} height={28} />
                </span>
              </button>
              <div className={styles.videoQuoteOverlay}>
                <p className={styles.videoQuote}>
                  <span className={styles.quoteMark} aria-hidden>
                    “
                  </span>
                  {data.videoQuotePrefix}
                  <strong className={styles.videoQuoteBold}>{data.videoQuoteEmphasis}</strong>
                  {data.videoQuoteSuffix}
                  <span className={styles.quoteMark} aria-hidden>
                    ”
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
