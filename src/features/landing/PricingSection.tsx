import data from "../../data/pricing.json";
import styles from "./PricingSection.module.css";

export function PricingSection() {
  return (
    <section id={data.sectionId} className={styles.section} aria-labelledby="price-title">
      <div className="container">
        <h2 id="price-title" className={styles.headline}>
          {data.headline}
        </h2>
        <div className={styles.card}>
          <div className={styles.banner}>{data.banner}</div>
          <div className={styles.body}>
            <div className={styles.priceRow}>
              <span className={styles.was}>{data.priceOriginal}</span>
              <span className={styles.now}>{data.priceCurrent}</span>
            </div>
            <p className={styles.footnote}>{data.footnote}</p>
            <ul className={styles.list}>
              {data.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a
              className={`btn-cta btn-cta--block ${styles.cta}`}
              href={data.cta.href}
            >
              {data.cta.label} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
