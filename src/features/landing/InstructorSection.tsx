import type { CSSProperties } from "react";
import data from "../../data/instructor.json";
import styles from "./InstructorSection.module.css";

/** Fixed order: YouTube → LinkedIn → Instagram → Behance */
const SOCIAL_ORDER = ["YouTube", "LinkedIn", "Instagram", "Behance"] as const;

function SocialIcon({ platform }: { platform: (typeof SOCIAL_ORDER)[number] }) {
  const svg = { className: styles.socialSvg, "aria-hidden": true as const, viewBox: "0 0 24 24" };
  switch (platform) {
    case "YouTube":
      return (
        <svg
          className={styles.socialSvg}
          aria-hidden
          viewBox="0 0 35 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M34.1145 6.43297C33.9031 4.39249 33.4483 2.13682 31.7745 0.951416C30.4782 0.0321601 28.7742 -0.001824 27.1834 6.35943e-05C23.8207 6.35943e-05 20.4561 0.00573374 17.0934 0.00762133C13.859 0.0113965 10.6247 0.0132818 7.39027 0.017057C6.03916 0.017057 4.72578 -0.0867628 3.4709 0.49839C2.3934 1.00049 1.5499 1.95562 1.04229 3.01833C0.338423 4.49631 0.191242 6.1706 0.106325 7.80526C-0.0502984 10.782 -0.0333151 13.7663 0.153501 16.7411C0.291255 18.9118 0.640351 21.311 2.31792 22.6946C3.80491 23.9196 5.90328 23.98 7.83183 23.9819C13.9534 23.9876 20.0768 23.9932 26.2002 23.997C26.9852 23.9989 27.8042 23.9838 28.6043 23.897C30.1781 23.7271 31.6783 23.2759 32.6897 22.1094C33.7106 20.9334 33.9729 19.2969 34.1277 17.7472C34.5051 13.9871 34.5013 10.1912 34.1145 6.43297ZM13.5533 17.2696V6.72744L22.6791 11.9976L13.5533 17.2696Z"
            fill="currentColor"
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
        <svg
          className={styles.socialSvg}
          aria-hidden
          viewBox="0 0 38 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.3864 13.2445C15.8102 12.5217 15.1504 11.9686 14.4116 11.5945C15.0644 11.1971 15.6267 10.709 16.0913 10.128C16.8743 9.14728 17.2716 7.91789 17.2716 6.47236C17.2716 5.2662 16.9533 4.15764 16.3237 3.17924C15.6964 2.20083 14.7624 1.41532 13.5473 0.843615C12.3577 0.28353 10.9243 0 9.29096 0H0V24H9.71845C11.3099 24 12.7318 23.7095 13.9422 23.1378C15.1759 22.5568 16.1378 21.7434 16.7976 20.7232C17.4598 19.6983 17.7966 18.5339 17.7966 17.2627C17.7966 15.773 17.3227 14.4228 16.3864 13.2468V13.2445ZM11.4516 8.87072C10.8778 9.33552 10.0391 9.57257 8.96337 9.57257H4.94403V4.25525H8.96337C10.0344 4.25525 10.8685 4.49927 11.4424 4.98267C11.993 5.44514 12.2602 6.08425 12.2602 6.93019C12.2602 7.77612 11.9953 8.43149 11.4516 8.87072ZM4.94403 13.8302H9.25843C10.3876 13.8302 11.2565 14.1044 11.914 14.6691C12.5436 15.2106 12.8503 15.9287 12.8503 16.8676C12.8503 17.8065 12.5668 18.4689 11.9814 18.9639C11.375 19.4775 10.5037 19.7378 9.38854 19.7378H4.94403V13.8302Z"
            fill="currentColor"
          />
          <path
            d="M36.7781 9.2308C36.03 7.87823 34.9706 6.81151 33.6277 6.06318C32.2871 5.31485 30.7375 4.93604 29.0275 4.93604C27.3176 4.93604 25.6517 5.32647 24.2787 6.09572C22.9032 6.86729 21.8206 7.97583 21.0632 9.3958C20.3058 10.8134 19.9224 12.4774 19.9224 14.3413C19.9224 16.2051 20.3174 17.8715 21.098 19.2868C21.8787 20.7044 22.9706 21.8199 24.346 22.6008C25.7191 23.3817 27.2943 23.7767 29.0298 23.7767C31.1603 23.7767 32.9702 23.2353 34.4107 22.1685C35.8511 21.1018 36.8594 19.7121 37.4101 18.0411L37.4496 17.9226H33.2351L33.2095 17.9737C32.3987 19.6168 30.993 20.4488 29.0275 20.4488C27.6591 20.4488 26.4881 20.0142 25.5472 19.1613C24.6295 18.327 24.1021 17.2114 23.9789 15.8426H37.7609L37.7725 15.7659C37.8608 15.2151 37.9049 14.5923 37.9049 13.916C37.9049 12.159 37.5262 10.5834 36.7781 9.2308ZM25.6122 9.47249C26.509 8.67071 27.6033 8.26634 28.8626 8.26634C30.2542 8.26634 31.4368 8.67768 32.3777 9.49109C33.2931 10.2812 33.7787 11.3433 33.8205 12.6448H24.0184C24.2043 11.3224 24.741 10.2557 25.6146 9.47482L25.6122 9.47249Z"
            fill="currentColor"
          />
          <path
            d="M33.5024 0.550781H24.3229V2.72605H33.5024V0.550781Z"
            fill="currentColor"
          />
        </svg>
      );
    default:
      return null;
  }
}

type InstructorLayout = {
  leftColumnMaxWidthPx?: number;
  photoSlotTopPx?: number;
  photoMaxWidthPercent?: number;
  /** Min height of the whole Meet Your Instructor `<section>` (px) */
  sectionMinHeightPx?: number;
  /** Min height of the inner row (photo + copy). Both columns stretch to at least this on desktop. */
  wrapMinHeightPx?: number;
};

export function InstructorSection() {
  const lay = ((data as { layout?: InstructorLayout }).layout ?? {}) as InstructorLayout;
  const sectionStyle: CSSProperties & Record<string, string> = {
    ["--ins-left-max"]: `${lay.leftColumnMaxWidthPx ?? 539}px`,
    ["--ins-photo-top"]: `-${lay.photoSlotTopPx ?? 75}px`,
    ["--ins-photo-max-w"]: `${lay.photoMaxWidthPercent ?? 100}%`,
  };
  if (lay.sectionMinHeightPx != null && lay.sectionMinHeightPx > 0) {
    sectionStyle["--ins-section-min-h"] = `${lay.sectionMinHeightPx}px`;
  }
  if (lay.wrapMinHeightPx != null && lay.wrapMinHeightPx > 0) {
    sectionStyle["--ins-wrap-min-h"] = `${lay.wrapMinHeightPx}px`;
  }

  return (
    <section
      id={data.sectionId}
      className={styles.section}
      style={sectionStyle}
      aria-labelledby="ins-title"
    >
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
