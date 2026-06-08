import { useLocation } from "react-router-dom";
import { BrandLogo } from "../../components/BrandLogo";
import site from "../../data/site.json";
import styles from "./LandingHeader.module.css";

export function LandingHeader() {
  const { pathname } = useLocation();
  const homeHref = pathname === "/" ? "#" : "/";
  const ctaHref =
    site.headerCta.href.startsWith("#") && pathname !== "/"
      ? `/${site.headerCta.href}`
      : site.headerCta.href;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <BrandLogo variant="header" href={homeHref} />
        </div>
        <a className="btn-cta btn-cta--no-shine" href={ctaHref}>
          {site.headerCta.label}
        </a>
      </div>
    </header>
  );
}
