import type { CSSProperties } from "react";
import data from "../../data/faq.json";
import styles from "./LandingFaq.module.css";

export function LandingFaq() {
  return (
    <section id={data.sectionId} className={styles.section} aria-labelledby="faq-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.introCol}>
          <h2 id="faq-title" className={styles.title}>
            <span className={styles.titleLead}>{data.titleLead}</span>{" "}
            <span className={styles.titleAccent}>{data.titleAccent}</span>
          </h2>
          <p className={styles.intro}>{data.intro}</p>
        </div>
        <div className={styles.accordions}>
          {data.items.map((item, index) => (
            <details
              key={item.question}
              className={styles.details}
              open={index === 0}
              style={{ "--stack-z": index } as CSSProperties}
            >
              <summary className={styles.summary}>
                <span className={styles.question}>{item.question}</span>
                <span className={styles.toggle} aria-hidden>
                  <span className={styles.togglePlus}>+</span>
                  <span className={styles.toggleMinus}>−</span>
                </span>
              </summary>
              <div className={styles.body}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
