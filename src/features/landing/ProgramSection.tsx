import data from "../../data/program.json";
import styles from "./ProgramSection.module.css";

export function ProgramSection() {
  const row1 = data.cards.slice(0, 3);
  const row2 = data.cards.slice(3, 6);

  return (
    <section
      id={data.sectionId}
      className={styles.section}
      aria-labelledby="prog-title"
    >
      <div className="container">
        <div className={styles.card}>
          <div className={styles.inner}>
            {/* Header: eyebrow, title, description */}
            <div className={styles.header}>
              <div className={styles.eyebrowGroup}>
                <p className={styles.eyebrow}>{data.eyebrow}</p>
                <h2 id="prog-title" className={styles.title}>
                  {data.titleLead}
                  <span className={styles.titleAccent}>{data.titleAccent}</span>
                </h2>
              </div>
              <p className={styles.desc}>{data.description}</p>
            </div>

            {/* Cards area */}
            <div className={styles.cardsArea}>
              <div className={styles.cardRows}>
                <div className={styles.cardRow}>
                  {row1.map((c) => (
                    <FeatureCard key={c.title} card={c} />
                  ))}
                </div>
                <div className={styles.cardRow}>
                  {row2.map((c) => (
                    <FeatureCard key={c.title} card={c} />
                  ))}
                </div>
              </div>

              {/* Bottom bar: avatars + caption | CTA */}
              <div className={styles.bottomBar}>
                <div className={styles.captionGroup}>
                  <div className={styles.avatarStack} aria-hidden>
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <p className={styles.captionText}>{data.captionText}</p>
                </div>
                <a href={data.ctaHref} className={`btn-cta ${styles.cta}`}>
                  <span className={styles.ctaLabel}>{data.ctaLabel}</span>
                  <img
                    src="/assets/arrow-right.svg"
                    alt=""
                    className={styles.ctaArrow}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  card,
}: {
  card: { icon: string; title: string; desc: string };
}) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureCardInner}>
        <div className={styles.iconCircle}>
          <img src={card.icon} alt="" />
        </div>
        <div className={styles.featureText}>
          <h3 className={styles.featureTitle}>{card.title}</h3>
          <p className={styles.featureDesc}>{card.desc}</p>
        </div>
      </div>
    </div>
  );
}
