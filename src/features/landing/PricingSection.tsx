import { useId } from "react";
import data from "../../data/pricing.json";
import styles from "./PricingSection.module.css";

function CheckIcon() {
  const id = useId().replace(/:/g, "");
  const gradId = `pricing-check-${id}`;
  return (
    <span className={styles.checkWrap} aria-hidden>
      <svg className={styles.checkSvg} viewBox="0 0 20 20" width={20} height={20}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#222cdc" />
            <stop offset="100%" stopColor="#2388ff" />
          </linearGradient>
        </defs>
        <circle cx="10" cy="10" r="10" fill={`url(#${gradId})`} />
        <path
          d="M5.5 10.2 8.5 13.2 14.5 6.8"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function PricingSection() {
  return (
    <section id={data.sectionId} className={styles.section} aria-labelledby="price-title">
      <div className={`container ${styles.inner}`}>
        <h2 id="price-title" className={styles.headline}>
          <span className={styles.titleLead}>{data.titleLead}</span>{" "}
          <span className={styles.titleAccent}>{data.titleAccent}</span>
        </h2>

        <div className={styles.card}>
          <div className={styles.banner}>{data.banner}</div>
          <div className={styles.body}>
            <div className={styles.priceStack}>
              <div className={styles.priceOriginalWrap}>
                <span className={styles.priceOriginal}>{data.priceOriginal}</span>
              </div>
              <p className={styles.priceCurrent}>{data.priceCurrent}</p>
              <p className={styles.footnote}>{data.footnote}</p>
            </div>

            <div className={styles.divider} aria-hidden />

            <ul className={styles.list}>
              {data.features.map((f) => (
                <li key={f} className={styles.listItem}>
                  <CheckIcon />
                  <span className={styles.featureText}>{f}</span>
                </li>
              ))}
            </ul>

            <a className={styles.cta} href={data.cta.href}>
              <span className={styles.ctaLabel}>{data.cta.label}</span>
              <svg className={styles.ctaArrow} viewBox="0 0 16 16" width={16} height={16} aria-hidden>
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
