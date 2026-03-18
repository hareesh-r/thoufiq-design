import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageSEO } from "../../components/seo/PageSEO";
import data from "../../data/wishlist.json";
import { LandingHeader } from "../landing/LandingHeader";
import styles from "./WishlistPage.module.css";

const STORAGE_KEY = "dc-wishlist-ids";

type Course = (typeof data.courses)[number];

function loadIds(): string[] {
  const allIds = data.courses.map((c) => c.id);
  const valid = new Set(allIds);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw == null) return allIds;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return allIds;
    return parsed.filter((id): id is string => typeof id === "string" && valid.has(id));
  } catch {
    return allIds;
  }
}

function saveIds(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

function HeartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s-7-4.35-10-9c-2.5-4.2 1-8 5-5.5C9 8 12 11 12 11s3-3 5-4.5c4-2.5 7.5 1.2 5 5.5-3 4.65-10 9-10 9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

export function WishlistPage() {
  const [ids, setIds] = useState<string[]>(loadIds);
  const [pendingRemove, setPendingRemove] = useState<Course | null>(null);

  const byId = useMemo(() => new Map(data.courses.map((c) => [c.id, c])), []);

  const items = useMemo(
    () => ids.map((id) => byId.get(id)).filter((c): c is Course => Boolean(c)),
    [ids, byId]
  );

  const count = items.length;

  const confirmRemove = useCallback(() => {
    if (!pendingRemove) return;
    const next = ids.filter((id) => id !== pendingRemove.id);
    setIds(next);
    saveIds(next);
    setPendingRemove(null);
  }, [ids, pendingRemove]);

  const countLine = data.countLine
    .replace("{count}", String(count))
    .replace(
      "{label}",
      count === 1 ? data.countLabel : data.countLabelPlural
    );

  useEffect(() => {
    if (!pendingRemove) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPendingRemove(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pendingRemove]);

  return (
    <>
      <PageSEO
        title={data.seoTitle}
        description={data.seoDescription}
        path="/wishlist"
      />
      <div className={styles.page}>
        <LandingHeader />
        <main className={styles.main}>
          <div className="container">
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden>/</span>
              <span aria-current="page">{data.title}</span>
            </nav>

            <div className={styles.shell}>
              <header className={styles.shellHeader}>
                <p className={styles.shellEyebrow}>{data.eyebrow}</p>
                <h1 className={styles.shellTitle}>{data.title}</h1>
                <p className={styles.shellIntro}>{data.intro}</p>
                {count > 0 && (
                  <p className={styles.shellCount}>{countLine}</p>
                )}
              </header>

              {count === 0 ? (
                <div className={styles.empty}>
                  <div className={styles.emptyIcon} aria-hidden>
                    <HeartIcon />
                  </div>
                  <h2 className={styles.emptyTitle}>{data.empty.title}</h2>
                  <p className={styles.emptyBody}>{data.empty.body}</p>
                  <div className={styles.emptyActions}>
                    <a className={styles.emptyPrimary} href={data.empty.cta.href}>
                      {data.empty.cta.label}
                    </a>
                    <a
                      className={styles.emptySecondary}
                      href={data.empty.secondaryCta.href}
                    >
                      {data.empty.secondaryCta.label}
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <ul className={styles.list}>
                    {items.map((course) => (
                      <li key={course.id}>
                        <article className={styles.item}>
                          <div className={styles.iconCircle} aria-hidden>
                            <img src={course.icon} alt="" width={24} height={24} />
                          </div>
                          <div className={styles.itemBody}>
                            <h2 className={styles.itemTitle}>{course.title}</h2>
                            <p className={styles.itemMeta}>{course.meta}</p>
                            {course.tag ? (
                              <span className={styles.tag}>{course.tag}</span>
                            ) : null}
                          </div>
                          <div className={styles.itemAside}>
                            <div>
                              <div className={styles.priceWas}>
                                {course.priceWas}
                              </div>
                              <div className={styles.priceNow}>
                                {course.priceNow}
                              </div>
                            </div>
                            <div className={styles.actionRow}>
                              <button
                                type="button"
                                className={styles.removeBtn}
                                aria-label={`Remove ${course.title} from wishlist`}
                                onClick={() => setPendingRemove(course)}
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  aria-hidden
                                >
                                  <path
                                    d="M12 21s-7-4.35-10-9c-2.5-4.2 1-8 5-5.5C9 8 12 11 12 11s3-3 5-4.5c4-2.5 7.5 1.2 5 5.5-3 4.65-10 9-10 9Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </button>
                              <a
                                className={styles.cardCta}
                                href={data.cardCta.href}
                              >
                                {data.cardCta.label}
                              </a>
                            </div>
                          </div>
                        </article>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.bottomBar}>
                    <p className={styles.bottomCaption}>{data.bar.caption}</p>
                    <a
                      className={`btn-cta ${styles.barCta}`}
                      href={data.bar.cta.href}
                    >
                      {data.bar.cta.label} →
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>

        {pendingRemove && (
          <div
            className={styles.overlay}
            role="presentation"
            onClick={() => setPendingRemove(null)}
          >
            <div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="wishlist-remove-title"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="wishlist-remove-title" className={styles.modalTitle}>
                {data.removeModal.title}
              </h2>
              <p className={styles.modalBody}>{data.removeModal.body}</p>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.modalCancel}
                  onClick={() => setPendingRemove(null)}
                >
                  {data.removeModal.cancel}
                </button>
                <button
                  type="button"
                  className={styles.modalConfirm}
                  onClick={confirmRemove}
                >
                  {data.removeModal.confirm}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
