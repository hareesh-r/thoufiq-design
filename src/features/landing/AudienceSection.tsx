import data from "../../data/audience.json";
import styles from "./AudienceSection.module.css";

interface Persona {
  icon: string;
  iconBg: string;
  iconBorder: string;
  title: string;
  body: string;
}

export function AudienceSection() {
  const row1 = data.personas.slice(0, 3);
  const row2 = data.personas.slice(3, 6);

  return (
    <section
      id={data.sectionId}
      className={styles.section}
      aria-labelledby="aud-title"
    >
      <div className="container">
        <div className={styles.inner}>
          {/* Header: eyebrow, title, subtitle */}
          <div className={styles.header}>
            <div className={styles.eyebrowGroup}>
              <p className={styles.eyebrow}>{data.eyebrow}</p>
              <h2 id="aud-title" className={styles.title}>
                {data.title}
                <span className={styles.titleItalic}>{data.titleItalic}</span>
              </h2>
            </div>
            <p className={styles.subtitle}>{data.subtitle}</p>
          </div>

          {/* Cards + CTA */}
          <div className={styles.cardsArea}>
            <div className={styles.cardRows}>
              <div className={styles.cardRow}>
                {row1.map((p) => (
                  <PersonaCard key={p.title} persona={p} />
                ))}
              </div>
              <div className={styles.cardRow}>
                {row2.map((p) => (
                  <PersonaCard key={p.title} persona={p} />
                ))}
              </div>
            </div>
            <a href={data.cta.href} className={styles.cta}>
              <span className={styles.ctaLabel}>
                Yes, this is for me - <span className={styles.ctaBold}>Let's go</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PersonaCard({ persona }: { persona: Persona }) {
  return (
    <article className={styles.card}>
      <div
        className={styles.iconCircle}
        style={{
          background: persona.iconBg,
          border: `1px solid ${persona.iconBorder}`,
        }}
      >
        <img src={persona.icon} alt="" />
      </div>
      <div className={styles.cardText}>
        <h3 className={styles.cardTitle}>{persona.title}</h3>
        <p className={styles.cardBody}>{persona.body}</p>
      </div>
    </article>
  );
}
