import { FormEvent, useState } from "react";
import data from "../../data/finalCta.json";
import styles from "./FinalEnquirySection.module.css";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function FinalEnquirySection() {
  const [state, setState] = useState<SubmitState>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const mobile = String(fd.get("mobile") ?? "").trim();

    const url = import.meta.env.VITE_ENQUIRY_SUBMIT_URL?.trim();
    if (!url) {
      console.warn(
        "[enquiry] Set VITE_ENQUIRY_SUBMIT_URL to your Cloud Function URL for production."
      );
      setState("success");
      form.reset();
      return;
    }

    setState("submitting");
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        throw new Error(json.error || res.statusText);
      }
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  const f = data.form;
  const footnoteClass =
    state === "success"
      ? styles.footnoteDone
      : state === "error"
        ? styles.footnoteError
        : "";

  let footnoteText = f.footnote;
  if (state === "submitting") footnoteText = f.submittingLabel;
  else if (state === "success") footnoteText = f.successFootnote;
  else if (state === "error") footnoteText = f.errorFootnote;

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
          <div className={styles.formCard}>
            <div className={styles.formCardInner}>
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
                      disabled={state === "submitting"}
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
                      disabled={state === "submitting"}
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
                      disabled={state === "submitting"}
                    />
                  </div>
                </div>
                <div className={styles.ctaBlock}>
                  <button
                    type="submit"
                    className={styles.submit}
                    disabled={state === "submitting"}
                  >
                    <span className={styles.submitText}>
                      {state === "submitting" ? f.submittingLabel : f.submitLabel}
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
                    className={`${styles.footnote} ${footnoteClass}`}
                    role={state === "error" ? "alert" : undefined}
                  >
                    {footnoteText}
                  </p>
                  {state === "error" ? (
                    <button
                      type="button"
                      className={styles.retryBtn}
                      onClick={() => setState("idle")}
                    >
                      Try again
                    </button>
                  ) : null}
                </div>
              </form>
            </div>
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
            <a className={styles.metaLink} href="#">
              {data.footer.refund}
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
