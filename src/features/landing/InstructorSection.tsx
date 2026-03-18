import data from "../../data/instructor.json";
import styles from "./InstructorSection.module.css";

/** Fixed order: YouTube → LinkedIn → Instagram → Behance */
const SOCIAL_ORDER = ["YouTube", "LinkedIn", "Instagram", "Behance"] as const;

function SocialIcon({ platform }: { platform: (typeof SOCIAL_ORDER)[number] }) {
  const svg = { className: styles.socialSvg, "aria-hidden": true as const, viewBox: "0 0 24 24" };
  switch (platform) {
    case "YouTube":
      /* Rounded TV + play — readable at small sizes */
      return (
        <svg {...svg}>
          <path
            fill="currentColor"
            d="M21.6 7.2c.2 1.1.2 3.4.2 4.8s0 3.7-.2 4.8c-.2.9-.8 1.6-1.7 1.8-1.5.4-7.9.4-7.9.4s-6.4 0-7.9-.4c-.9-.2-1.5-.9-1.7-1.8C2 15.7 2 13.4 2 12s0-3.7.2-4.8c.2-.9.8-1.6 1.7-1.8C5.4 5 12 5 12 5s6.6 0 7.9.4c.9.2 1.5.9 1.7 1.8zM10 9.5v5L15.2 12 10 9.5z"
          />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg {...svg}>
          <path
            fill="currentColor"
            d="M20.45 20.45h-3.55v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 112.05-2.06 2.06 2.06 0 01-2.05 2.06zM8.12 20.45H3.56V9h4.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
          />
        </svg>
      );
    case "Instagram":
      /* Camera: rounded square + circle + dot */
      return (
        <svg {...svg}>
          <path
            fill="currentColor"
            d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5C22 19.55 19.55 22 16.25 22h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm8.5 2h-8.5C5.57 4 4 5.57 4 7.75v8.5C4 18.43 5.57 20 7.75 20h8.5c2.18 0 3.75-1.57 3.75-3.75v-8.5C20 5.57 18.43 4 16.25 4zM12 7.25A4.75 4.75 0 1016.75 12 4.75 4.75 0 0012 7.25zm0 2a2.75 2.75 0 11-2.75 2.75A2.75 2.75 0 0112 9.25zm5.25-3.65a1.1 1.1 0 11-1.1 1.1 1.1 1.1 0 011.1-1.1z"
          />
        </svg>
      );
    case "Behance":
      return (
        <svg {...svg} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M7.2 6.8c.9 0 1.5-.5 1.5-1.4S8 4 6.9 4H4v2.8h3.2zm-3.2 3h3.4c1.1 0 1.7-.5 1.7-1.5S8.8 7 7.3 7H4v2.8zm0 3.2h3.8c1.2 0 1.9-.6 1.9-1.6 0-1.1-.7-1.7-2-1.7H4V13zm8.3-6.1h5.5v1.4h-5.5V6.9zm2.6 5.2c-1.7 0-2.8 1.3-2.8 3.2s1.2 3.2 3 3.2c1.4 0 2.3-.6 2.7-1.6h-2.5c-.1.4-.5.7-1 .7-.7 0-1-.4-1.1-1.2h4.1c0-2.3-1.1-3.8-2.9-3.8zm-1.1 2.4c.1.7.4 1.1 1 1.1s.9-.3 1-1.1h-2zm-9.8 4.4h6.8c2.1 0 3.3-1 3.3-2.7 0-1-.5-1.8-1.5-2.2.8-.4 1.3-1 1.3-2 0-1.6-1.2-2.6-3.1-2.6H4v9.5z"
          />
        </svg>
      );
    default:
      return null;
  }
}

export function InstructorSection() {
  return (
    <section id={data.sectionId} className={styles.section} aria-labelledby="ins-title">
      <div className={`container ${styles.wrap}`}>
        <div className={styles.left}>
          <div className={styles.blueCard}>
            <div className={styles.gridPattern} aria-hidden />
            <div className={styles.radialGlow} aria-hidden />
            <div className={styles.gridPatternOverlay} aria-hidden />
            <div className={styles.photoSlot}>
              <div className={styles.photoHorizClip}>
                <img
                  className={styles.photo}
                  src={data.portraitImage}
                  alt=""
                  width={539}
                  height={900}
                />
              </div>
              <div className={styles.photoShade} aria-hidden />
              <div className={styles.glassStack}>
                <div className={styles.nameplate}>
                  <p className={styles.nameText}>{data.name}</p>
                  <p className={styles.roleLine}>{data.roleLine}</p>
                </div>
                <div className={styles.socialRow}>
                  {SOCIAL_ORDER.map((platform) => {
                    const s = data.social.find((x) => x.label === platform);
                    if (!s) return null;
                    return (
                      <a
                        key={platform}
                        href={s.href}
                        className={styles.socialBtn}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={platform}
                      >
                        <SocialIcon platform={platform} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <p className={styles.eyebrow}>{data.heading}</p>
          <h2 id="ins-title" className={styles.headline}>
            {data.titleLead}
            <span className={styles.headlineAccent}>{data.titleAccent}</span>
          </h2>
          <p className={styles.bio}>{data.bio}</p>
          <div className={styles.tags}>
            {data.tags.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>
          <div className={styles.stats}>
            {data.stats.map((s) => (
              <article key={s.title} className={styles.stat}>
                <h3 className={styles.statTitle}>{s.title}</h3>
                <p className={styles.statBody}>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
