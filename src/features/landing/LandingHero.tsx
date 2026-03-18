import data from "../../data/hero.json";
import site from "../../data/site.json";
import styles from "./LandingHero.module.css";

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
            <a className="btn-cta" href={site.heroCta.href}>
              {site.heroCta.label}
            </a>
            <div className={styles.testimonial}>
              <div className={styles.avatar} aria-hidden>
                {data.testimonialInitial}
              </div>
              <p>{data.testimonialText}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.secondaryHero}>
        <div className={styles.secondaryInner}>
          <p className={styles.videoEyebrow}>{data.videoEyebrow}</p>
          <h2 className={styles.videoHeading}>
            <span className={styles.videoTitleLead}>{data.videoTitleLead}</span>{" "}
            <span className={styles.videoTitleAccent}>{data.videoTitleAccent}</span>
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
