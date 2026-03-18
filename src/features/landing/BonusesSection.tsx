import data from "../../data/bonuses.json";
import styles from "./BonusesSection.module.css";

export function BonusesSection() {
  const { notebook, resourceKit, headline, eyebrow } = data;

  return (
    <section id={data.sectionId} className={styles.section} aria-labelledby="bonus-title">
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id="bonus-title" className={styles.title}>
            <span className={styles.titleLine1}>
              <span className={styles.titleGradient}>{headline.highlight}</span>{" "}
              <span className={styles.titleMuted}>{headline.line1Rest}</span>
            </span>
            <span className={styles.titleYours}>{headline.line2}</span>
          </h2>
        </header>

        <div className={styles.cardsRow}>
          <article className={styles.cardNotebook} aria-labelledby="bonus-notebook-heading">
            <div className={styles.cardBody}>
              <div className={styles.textBlock}>
                <h3 id="bonus-notebook-heading" className={styles.cardHeading}>
                  {notebook.name}
                </h3>
                <p className={styles.cardDesc}>{notebook.description}</p>
              </div>
              <div className={styles.worthRow}>
                <span className={styles.worthLabel}>{notebook.worthLabel}</span>
                <span className={styles.priceStrike}>
                  <span className={styles.price}>{notebook.worthAmount}</span>
                </span>
                <span className={styles.cta}>{notebook.cta}</span>
              </div>
            </div>
            <div className={styles.notebookFrame}>
              <img
                className={styles.notebookImg}
                src={notebook.image}
                alt={notebook.imageAlt}
                width={356}
                height={358}
                loading="lazy"
                decoding="async"
              />
            </div>
          </article>

          <article className={styles.cardKit} aria-labelledby="bonus-kit-heading">
            <div className={styles.kitTop}>
              <div className={styles.textBlock}>
                <h3 id="bonus-kit-heading" className={styles.cardHeading}>
                  {resourceKit.name}
                </h3>
                <p className={styles.cardDesc}>{resourceKit.description}</p>
              </div>
              <div className={styles.worthRow}>
                <span className={styles.worthLabel}>{resourceKit.worthLabel}</span>
                <span className={styles.priceStrike}>
                  <span className={styles.price}>{resourceKit.worthAmount}</span>
                </span>
                <span className={styles.cta}>{resourceKit.cta}</span>
              </div>
            </div>
            <div className={styles.kitFan} aria-hidden>
              {resourceKit.covers.map((cover, i) => (
                <div
                  key={cover.title}
                  className={styles.kitCover}
                  data-gradient={cover.gradient}
                  style={{
                    transform: `rotate(${cover.rotate}deg)`,
                    zIndex: resourceKit.covers.length - i,
                  }}
                >
                  <div className={styles.kitCoverGlow} />
                  <span className={styles.kitCoverTitle}>{cover.title}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
