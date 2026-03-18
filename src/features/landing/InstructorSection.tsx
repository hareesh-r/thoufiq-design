import data from "../../data/instructor.json";
import styles from "./InstructorSection.module.css";

export function InstructorSection() {
  return (
    <section id={data.sectionId} className={styles.section} aria-labelledby="ins-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.photoWrap}>
          <div className={styles.photo} role="img" aria-label={data.name} />
          <div className={styles.chip}>
            <strong>{data.name}</strong>
            <span>{data.roleLine}</span>
          </div>
        </div>
        <div>
          <p className={styles.heading}>{data.heading}</p>
          <h2 id="ins-title" className={styles.subheading}>
            {data.subheading}
          </h2>
          <p className={styles.bio}>{data.bio}</p>
          <div className={styles.tags}>
            {data.tags.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>
          <div className={styles.stats}>
            {data.stats.map((s) => (
              <article key={s.title} className={styles.stat}>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
