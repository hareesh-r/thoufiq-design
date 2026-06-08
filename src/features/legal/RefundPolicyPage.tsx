import { Link } from "react-router-dom";
import { PageSEO } from "../../components/seo/PageSEO";
import { BrandLogo } from "../../components/BrandLogo";
import { LandingHeader } from "../landing/LandingHeader";
import site from "../../data/site.json";
import data from "../../data/refundPolicy.json";
import type { PolicyBlock } from "./refundPolicyTypes";
import styles from "./RefundPolicyPage.module.css";

function PolicyBlocks({ blocks }: { blocks: PolicyBlock[] }) {
  return (
    <div className={styles.sectionBlocks}>
      {blocks.map((block, i) => {
        if (block.type === "p") {
          return (
            <p key={i} className={styles.sectionBody}>
              {block.text}
            </p>
          );
        }
        return (
          <div key={i} className={styles.blockList}>
            {block.lead ? <p className={styles.listLead}>{block.lead}</p> : null}
            <ul className={styles.bulletList}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {block.outro ? <p className={styles.listOutro}>{block.outro}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

export function RefundPolicyPage() {
  return (
    <>
      <PageSEO
        title={data.seoTitle}
        description={data.seoDescription}
        path="/refund"
        structuredData="minimal"
      />
      <LandingHeader />
      <main className={styles.page}>
        <div className={`container ${styles.wrap}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/" className={styles.crumb}>
              Home
            </Link>
            <span className={styles.crumbSep} aria-hidden>
              /
            </span>
            <span className={styles.crumbCurrent}>Refund policy</span>
          </nav>

          <article className={styles.article}>
            <p className={styles.eyebrow}>{data.eyebrow}</p>
            <h1 className={styles.title}>
              <span className={styles.titleLead}>{data.titleLead}</span>{" "}
              <span className={styles.titleAccent}>{data.titleAccent}</span>
            </h1>
            <p className={styles.intro}>{data.intro}</p>
            <p className={styles.lastUpdated}>
              <span className={styles.lastUpdatedLabel}>Last updated</span>{" "}
              {data.lastUpdated}
            </p>

            <ol className={styles.sectionList}>
              {data.sections.map((section, index) => (
                <li key={section.title} className={styles.section}>
                  <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionNum}>{index + 1}.</span>{" "}
                    {section.title}
                  </h2>
                  <PolicyBlocks blocks={section.blocks as PolicyBlock[]} />
                </li>
              ))}
            </ol>

            <div className={styles.contactCard}>
              <h2 className={styles.contactHeading}>
                <span className={styles.sectionNum}>9.</span> {data.contact.heading}
              </h2>
              <p className={styles.contactIntro}>{data.contact.body}</p>
              <p className={styles.contactEntity}>{data.contact.entity}</p>
              <a className={styles.contactEmail} href={`mailto:${data.contact.email}`}>
                {data.contact.email}
              </a>
            </div>

            <p className={styles.backWrap}>
              <Link to="/" className={styles.backLink}>
                ← Back to home
              </Link>
            </p>
          </article>
        </div>
      </main>
      <footer className={styles.siteFooter} aria-label="Page footer">
        <div className={`container ${styles.footerInner}`}>
          <BrandLogo variant="header" href="/" />
          <span className={styles.footerMeta}>© {new Date().getFullYear()} {site.siteName}</span>
        </div>
      </footer>
    </>
  );
}
