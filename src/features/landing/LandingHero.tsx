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
            <a className={styles.enroll} href={site.heroCta.href}>
              {site.heroCta.label}
            </a>
            <div className={styles.testimonial}>
              <div className={styles.avatar} aria-hidden>
                {data.testimonialInitial}
              </div>
              <p>{data.testimonialText}</p>
            </div>
          </div>
          <div className={styles.grid2}>
            <div className={styles.videoBlock}>
              <p className={styles.videoEyebrow}>{data.videoEyebrow}</p>
              <p className={styles.videoTitle}>{data.videoTitle}</p>
              <p className={styles.videoDesc}>{data.videoDescription}</p>
            </div>
            <div className={styles.videoCard}>
              <div className={styles.play} aria-hidden>
                <img src="/assets/hero-play.svg" alt="" width={39} height={39} />
              </div>
              <span className={styles.quoteOpen} aria-hidden>
                “
              </span>
              <p className={styles.videoQuote}>{data.videoCardQuote}</p>
              <span className={styles.quoteClose} aria-hidden>
                ”
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
