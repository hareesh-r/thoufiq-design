import { FormEvent, useState } from "react";
import { BrandLogo } from "../../components/BrandLogo";
import { gasRequestSucceeded, postToGoogleAppsScript } from "../../config/googleAppsScript";
import data from "../../data/finalCta.json";
import styles from "./FinalEnquirySection.module.css";

type Phase = "form" | "success";

export function FinalEnquirySection() {
  const [phase, setPhase] = useState<Phase>("form");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("mobile") ?? "").trim();
    if (!name || !email || !phone) return;

    setSubmitting(true);
    setSubmitError(false);
    try {
      const res = await postToGoogleAppsScript({
        name,
        email,
        phone,
        source: "enquiry",
      });
      if (!(await gasRequestSucceeded(res))) throw new Error("Apps Script error");
      setPhase("success");
      form.reset();
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
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
              <span className={styles.headlineLead}>
                <span className={styles.headlineLine1}>{data.headlineLine1}</span>
                <span className={styles.headlineLine2}>{data.headlineLine2}</span>
              </span>
              <span className={styles.headlineAccent}>{data.headlineAccent}</span>
            </h2>
            <p className={styles.sub}>{data.subhead}</p>
          </div>
          <div className={styles.formCard}>
            <div
              className={`${styles.formCardInner} ${phase === "form" ? styles.formCardInnerWithForm : ""}`}
            >
              {phase === "success" ? (
                <>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle} id="final-enquiry-success-heading">
                      {data.successCardTitle}
                    </h3>
                    <p className={styles.cardBody}>{data.successCardBody}</p>
                  </div>
                  <div
                    className={styles.successPanel}
                    role="status"
                    aria-live="polite"
                    aria-labelledby="final-enquiry-success-heading"
                    aria-atomic="true"
                  >
                    <div className={styles.successIconWrap} aria-hidden>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="rgba(255, 255, 255, 0.12)"
                          stroke="rgba(255, 255, 255, 0.35)"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M8 12l3 3 5-5"
                          stroke="rgba(255, 255, 255, 0.95)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className={styles.successInfoBox}>
                      <p className={styles.successInfoPrimary}>{data.successInfoPrimary}</p>
                      <p className={styles.successInfoSecondary}>{data.successInfoSecondary}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>
                      {data.cardTitleBefore}
                      <span className={styles.cardTitleEm}>{data.cardTitleHighlight}</span>
                      {data.cardTitleAfter}
                    </h3>
                    <p className={styles.cardBody}>{data.cardBody}</p>
                  </div>

                  <form className={styles.form} onSubmit={onSubmit}>
                  <div className={styles.fields}>
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
                        disabled={submitting}
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
                        disabled={submitting}
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
                        required
                        autoComplete="tel"
                        disabled={submitting}
                      />
                    </div>
                  </div>
                  <div className={styles.ctaBlock}>
                    <button
                      type="submit"
                      className={`cta-motion btn-cta--no-shine ${styles.submit}`}
                      disabled={submitting}
                    >
                      <span className={styles.submitText}>
                        {submitting ? f.submittingLabel : f.submitLabel}
                      </span>
                      <svg
                        className={styles.submitArrow}
                        viewBox="0 0 16 16"
                        width={16}
                        height={16}
                        aria-hidden
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.33"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <p
                      className={`${styles.footnote} ${submitError ? styles.footnoteError : ""}`}
                    >
                      {submitError ? f.errorFootnote : f.footnote}
                    </p>
                  </div>
                </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footerBand} aria-label="Site footer">
        <div className={`container ${styles.footerInner}`}>
          <div className={styles.logoRow}>
            <BrandLogo variant="footer" href="/" />
          </div>
          <div className={styles.metaRow}>
            <span className={styles.copyright}>
              © {new Date().getFullYear()} {data.footer.copyrightEntity}
            </span>
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
            <a className={styles.metaLink} href="/refund">
              {data.footer.refund}
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
