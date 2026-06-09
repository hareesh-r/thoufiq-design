import { FormEvent, useEffect, useState } from "react";
import { gasRequestSucceeded, postToGoogleAppsScript } from "../config/googleAppsScript";
import data from "../data/finalCta.json";
import styles from "./EnquiryPopup.module.css";

type Phase = "form" | "success";

export function EnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("form");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Retrieve storage flags
    const isDismissed = sessionStorage.getItem("enquiry_popup_dismissed") === "true";
    const isSubmitted = localStorage.getItem("enquiry_popup_submitted") === "true";

    // Show popup after a 2-second delay if not dismissed/submitted before
    if (!isDismissed && !isSubmitted) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("enquiry_popup_dismissed", "true");
  };

  const handleSuccessClose = () => {
    setIsOpen(false);
    // Persist submission status forever so they aren't asked again
    localStorage.setItem("enquiry_popup_submitted", "true");
  };

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
        source: "enquiry", // Stores in same sheet as the footer enquiry form
      });

      if (!(await gasRequestSucceeded(res))) {
        throw new Error("Apps Script request failed");
      }

      setPhase("success");
      // Pre-emptively flag submitted state
      localStorage.setItem("enquiry_popup_submitted", "true");
      form.reset();
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  const f = data.form;

  return (
    <div className={styles.overlay} onClick={handleClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Icon Button */}
        <button
          className={styles.closeBtn}
          onClick={phase === "success" ? handleSuccessClose : handleClose}
          aria-label="Close dialogue"
        >
          <svg
            className={styles.closeIcon}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {phase === "success" ? (
          <div className={styles.successPanel}>
            <div className={styles.successIconWrap} aria-hidden="true">
              <svg
                className={styles.successIcon}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            
            <div className={styles.header}>
              <h3 className={styles.title} style={{ textAlign: "center", width: "100%" }}>
                {data.successCardTitle}
              </h3>
            </div>

            <div className={styles.successInfoBox}>
              <p className={styles.successInfoPrimary}>{data.successInfoPrimary}</p>
              <p className={styles.successInfoSecondary}>{data.successInfoSecondary}</p>
            </div>

            <button className={styles.closeDoneBtn} onClick={handleSuccessClose}>
              Dismiss
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <h3 className={styles.title}>
                {data.cardTitleBefore}
                <span className={styles.titleHighlight}>{data.cardTitleHighlight}</span>
                {data.cardTitleAfter}
              </h3>
              <p className={styles.bodyText}>{data.cardBody}</p>
            </div>

            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.fields}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="popup-name">
                    {f.fullNameLabel}
                  </label>
                  <input
                    id="popup-name"
                    name="name"
                    type="text"
                    className={styles.input}
                    placeholder={f.fullNamePlaceholder}
                    required
                    autoComplete="name"
                    disabled={submitting}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="popup-email">
                    {f.emailLabel}
                  </label>
                  <input
                    id="popup-email"
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
                  <label className={styles.label} htmlFor="popup-mobile">
                    {f.mobileLabel}
                  </label>
                  <input
                    id="popup-mobile"
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
                <button type="submit" className={styles.submit} disabled={submitting}>
                  <span>{submitting ? "Requesting Callback…" : "Get a Callback"}</span>
                  <svg
                    className={styles.submitArrow}
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                
                {submitError && (
                  <p className={`${styles.footnote} ${styles.footnoteError}`}>
                    {f.errorFootnote}
                  </p>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
