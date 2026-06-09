import data from "../../data/addons.json";
import styles from "./AddOnsSection.module.css";

export function AddOnsSection() {
  return (
    <section id={data.sectionId} className={styles.section} aria-labelledby="addons-title">
      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>{data.eyebrow}</p>
          <h2 id="addons-title" className={styles.title}>
            {data.title}
          </h2>
          <p className={styles.subtitle}>{data.subtitle}</p>
        </header>

        <div className={styles.cardsRow}>
          {data.items.map((item) => (
            <article key={item.id} className={styles.card} aria-labelledby={`addon-${item.id}-title`}>
              <span className={styles.priceBadge}>{item.price}</span>
              <div className={styles.visual}>
                <div className={styles.visualRing} aria-hidden>
                  <img
                    className={styles.visualImg}
                    src={item.image}
                    alt={item.imageAlt}
                    width={280}
                    height={180}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className={styles.cardBody}>
                <h3 id={`addon-${item.id}-title`} className={styles.cardTitle}>
                  {item.title}
                </h3>
                <p className={styles.cardDesc}>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
