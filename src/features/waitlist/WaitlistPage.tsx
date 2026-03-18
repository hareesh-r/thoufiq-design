import { Link } from "react-router-dom";
import { PageSEO } from "../../components/seo/PageSEO";
import site from "../../data/site.json";
import data from "../../data/waitlist.json";
import styles from "./WaitlistPage.module.css";

function DiamondLogo() {
  return (
    <svg
      className={styles.brandMark}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M18 4L22 10L18 16L14 10L18 4Z"
        fill="#5EB0FF"
        fillOpacity="0.95"
      />
      <path
        d="M10 10L14 16L10 22L6 16L10 10Z"
        fill="#5EB0FF"
        fillOpacity="0.75"
      />
      <path
        d="M26 10L30 16L26 22L22 16L26 10Z"
        fill="#5EB0FF"
        fillOpacity="0.75"
      />
      <path
        d="M18 16L22 22L18 28L14 22L18 16Z"
        fill="#5EB0FF"
        fillOpacity="0.55"
      />
    </svg>
  );
}

export function WaitlistPage() {
  function onReserveClick() {
    /* Next step: form / modal — wired by you */
  }

  return (
    <>
      <PageSEO
        title={data.seoTitle}
        description={data.seoDescription}
        path="/waitlist"
      />
      <div className={styles.root}>
        <div className={styles.gridOverlay} aria-hidden />

        <header className={styles.header}>
          <Link to="/" className={styles.brand} aria-label={`${site.logoWordmark} home`}>
            <DiamondLogo />
            <span className={styles.brandName}>{site.logoWordmark}</span>
          </Link>
          <a className={styles.headerCta} href={data.headerCta.href}>
            {data.headerCta.label}
          </a>
        </header>

        <main className={styles.main}>
          <div className={styles.hero}>
            <p className={styles.badge}>{data.badge}</p>

            <h1 className={styles.title}>
              <span className={styles.titleLine1}>
                {data.titleBefore}{" "}
                <span className={styles.titleItalic}>{data.titleItalic}</span>
                <span className={styles.titleDash}> {data.titleAfter}</span>
              </span>
              <span className={styles.titleLine2}>{data.titleLine2}</span>
            </h1>

            <p className={styles.subtitle}>{data.subtitle}</p>

            <button
              type="button"
              id={data.primaryCta.id}
              className={styles.primaryCta}
              onClick={onReserveClick}
            >
              {data.primaryCta.label}
            </button>

            <p className={styles.microcopy}>{data.primaryMicrocopy}</p>
          </div>
        </main>
      </div>
    </>
  );
}
