import type { CSSProperties } from "react";
import data from "../../data/courseStructure.json";
import styles from "./CourseStructureSection.module.css";

export function CourseStructureSection() {
  return (
    <section
      id={data.sectionId}
      className={styles.section}
      aria-labelledby="cs-title"
    >
      <div className={`container ${styles.layout}`}>
        <div className={styles.sticky}>
          <p className={styles.eyebrow}>{data.eyebrow}</p>
          <h2 id="cs-title" className={styles.title}>
            <span className={styles.titleLine}>
              <span className={styles.titleLead}>{data.titleLead}</span>
              <span className={styles.titleAccent}>{data.titleAccent}</span>
            </span>
          </h2>
          <p className={styles.desc}>{data.description}</p>
        </div>
        <div className={styles.accordions}>
          {data.modules.map((m, index) => (
            <details
              key={m.id}
              className={styles.details}
              style={{ "--stack-z": index } as CSSProperties}
            >
              <summary className={styles.summary}>
                <div className={styles.summaryMain}>
                  <span className={styles.code}>{m.code}</span>
                  <span className={styles.summaryTitle}>{m.title}</span>
                </div>
                <span className={styles.toggle} aria-hidden>
                  <span className={styles.togglePlus}>+</span>
                  <span className={styles.toggleMinus}>−</span>
                </span>
              </summary>
              {"lessons" in m && m.lessons && (
                <div className={styles.body}>
                  <ul className={styles.lessons}>
                    {m.lessons.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
