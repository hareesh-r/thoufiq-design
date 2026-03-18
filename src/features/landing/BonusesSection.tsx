import data from "../../data/bonuses.json";
import styles from "./BonusesSection.module.css";

function RichDesc({ html }: { html: string }) {
  const parts = html.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className={styles.cardDesc}>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

export function BonusesSection() {
  const { notebook, resourceKit, headline, eyebrow } = data;

  return (
    <section id={data.sectionId} className={styles.section} aria-labelledby="bonus-title">
      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id="bonus-title" className={styles.title}>
            <span className={styles.titleLine1}>
              <span className={styles.titleAccent}>{headline.highlight}</span>{" "}
              <span className={styles.titleRest}>{headline.line1Rest}</span>
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
            <div className={styles.notebookClip}>
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
            </div>
          </article>

          <article className={styles.cardKit} aria-labelledby="bonus-kit-heading">
            <div className={styles.kitTop}>
              <div className={styles.textBlock}>
                <h3 id="bonus-kit-heading" className={styles.cardHeading}>
                  {resourceKit.name}
                </h3>
                <RichDesc html={resourceKit.description} />
              </div>
              <div className={styles.worthRow}>
                <span className={styles.worthLabel}>{resourceKit.worthLabel}</span>
                <span className={styles.priceStrike}>
                  <span className={styles.price}>{resourceKit.worthAmount}</span>
                </span>
                <span className={styles.cta}>{resourceKit.cta}</span>
              </div>
            </div>
            <div className={styles.kitVisual}>
              <div className={styles.kitRow}>
                {resourceKit.covers.map((cover) => (
                  <div key={cover.src} className={styles.kitCoverWrap}>
                    <img
                      src={cover.src}
                      alt={cover.alt}
                      className={styles.kitCoverImg}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
