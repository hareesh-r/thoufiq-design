import site from "../data/site.json";
import styles from "./BrandLogo.module.css";

type Props = {
  variant: "header" | "footer";
  href?: string;
  className?: string;
};

export function BrandLogo({ variant, href = "/", className }: Props) {
  const label = `${site.logoWordmark} home`;
  const logoSrc =
    variant === "footer" ? site.logoFooterSrc : site.logoSrc;

  return (
    <a
      href={href}
      className={`${styles.root} ${variant === "header" ? styles.header : styles.footer} ${className ?? ""}`}
      aria-label={label}
    >
      <img
        src={logoSrc}
        alt=""
        className={styles.logoImg}
        decoding="async"
      />
    </a>
  );
}
