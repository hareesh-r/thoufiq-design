import data from "../../data/faq.json";
import styles from "./LandingFaq.module.css";

export function LandingFaq() {
  return (
    <section id={data.sectionId} className={styles.section} aria-labelledby="faq-title">
      <div className={`container ${styles.layout}`}>
        <div>
          <h2 id="faq-title" className={styles.title}>
            {data.title}
          </h2>
          <p className={styles.intro}>{data.intro}</p>
        </div>
        <div className={styles.list}>
          {data.items.map((item) => (
            <details key={item.question} className={styles.details}>
              <summary className={styles.summary}>
                {item.question}
                <span className={styles.chev} aria-hidden>
                  ⌄
                </span>
              </summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
