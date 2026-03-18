import data from "../../data/bonuses.json";
import styles from "./BonusesSection.module.css";

export function BonusesSection() {
  return (
    <section id={data.sectionId} className={styles.section} aria-labelledby="bonus-title">
      <div className="container">
        <header className={styles.head}>
          <p className={styles.title}>{data.title}</p>
          <h2 id="bonus-title" className={styles.subtitle}>
            {data.subtitle}
          </h2>
        </header>
        <div className={styles.grid}>
          {data.items.map((item) => (
            <article key={item.name} className={styles.card}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className={styles.worthRow}>
                <span className={styles.worth}>{item.worthLabel}</span>
                <span className={styles.price}>{item.worthAmount}</span>
                <span className={styles.cta}>{item.cta}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
