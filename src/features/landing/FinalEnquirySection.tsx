import { FormEvent, useState } from "react";
import data from "../../data/finalCta.json";
import styles from "./FinalEnquirySection.module.css";

export function FinalEnquirySection() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  const f = data.form;
  return (
    <section
      id={data.sectionId}
      className={styles.section}
      aria-labelledby="final-headline"
    >
      <div className={`container ${styles.sectionMain}`}>
        <div className={styles.grid}>
          <div>
            <h2 id="final-headline" className={styles.headline}>
              {data.headlinePrefix}{" "}
              <span className={styles.headlineAccent}>{data.headlineAccent}</span>
            </h2>
            <p className={styles.sub}>{data.subhead}</p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>{data.cardTitle}</h3>
            <p className={styles.cardBody}>{data.cardBody}</p>
            <form onSubmit={onSubmit}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="fe-name">
                  {f.fullNameLabel}
                </label>
                <input
                  id="fe-name"
                  name="name"
                  className={styles.input}
                  placeholder={f.fullNamePlaceholder}
                  required
                  autoComplete="name"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="fe-email">
                  {f.emailLabel}
                </label>
                <input
                  id="fe-email"
                  name="email"
                  type="email"
                  className={styles.input}
                  placeholder={f.emailPlaceholder}
                  required
                  autoComplete="email"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="fe-mobile">
                  {f.mobileLabel}
                </label>
                <input
                  id="fe-mobile"
                  name="mobile"
                  type="tel"
                  className={styles.input}
                  placeholder={f.mobilePlaceholder}
                  autoComplete="tel"
                />
              </div>
              <button
                type="submit"
                className={`btn-cta btn-cta--block ${styles.submit}`}
              >
                {f.submitLabel} →
              </button>
              <p className={styles.footnote}>
                {done ? "Thanks — we'll be in touch." : f.footnote}
              </p>
            </form>
          </div>
        </div>
      </div>

      <footer className={styles.footerBand} aria-label="Site footer">
        <div className={`container ${styles.footerInner}`}>
          <div className={styles.logoRow}>
            <img
              src={data.footer.logoPlaceholder}
              alt=""
              width={160}
              height={48}
              className={styles.footerLogoPlaceholder}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className={styles.metaDivider} aria-hidden />
          <div className={styles.metaRow}>
            <span className={styles.copyright}>{data.footer.copyright}</span>
            <span className={styles.metaDot} aria-hidden>
              •
            </span>
            <a
              className={styles.metaLink}
              href={`mailto:${data.footer.email}`}
            >
              {data.footer.email}
            </a>
            <span className={styles.metaDot} aria-hidden>
              •
            </span>
            <a className={styles.metaLink} href="#">
              {data.footer.refund}
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
