import { Link, useLocation } from "react-router-dom";
import site from "../../data/site.json";
import styles from "./LandingHeader.module.css";

export function LandingHeader() {
  const { pathname } = useLocation();
  const homeHref = pathname === "/" ? "#" : "/";

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <a href={homeHref} className={styles.logo} aria-label={`${site.logoWordmark} home`}>
            {site.logoWordmark}
            <span>.</span>
          </a>
          <Link
            to="/waitlist"
            className={styles.navLink}
            aria-current={pathname === "/waitlist" ? "page" : undefined}
          >
            Waitlist
          </Link>
        </div>
        <a className="btn-cta" href={site.headerCta.href}>
          {site.headerCta.label}
        </a>
      </div>
    </header>
  );
}
