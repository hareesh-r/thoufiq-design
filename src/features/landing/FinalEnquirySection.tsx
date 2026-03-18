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
      <div className="container">
        <div className={styles.grid}>
          <div>
            <h2 id="final-headline" className={styles.headline}>
              {data.headline}
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
              <button type="submit" className={`btn-cta ${styles.submit}`}>
                {f.submitLabel} →
              </button>
              <p className={styles.footnote}>
                {done ? "Thanks — we'll be in touch." : f.footnote}
              </p>
            </form>
          </div>
        </div>
        <div className={styles.footerBar}>
          <img
            src="/assets/footer-icon-1.svg"
            alt=""
            className={styles.footerLogo}
            width={139}
            height={63}
          />
          <div className={styles.bar}>
            <span>{data.footer.copyright}</span>
            <span aria-hidden>•</span>
            <a href={`mailto:${data.footer.email}`}>{data.footer.email}</a>
            <span aria-hidden>•</span>
            <a href="#">{data.footer.refund}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
