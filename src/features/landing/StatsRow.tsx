import { useEffect, useMemo, useRef, useState } from "react";
import data from "../../data/stats.json";
import styles from "./StatsRow.module.css";

const STORAGE_KEY = "course_stats_countup_done";

function parseStatValue(value: string): { n: number; suffix: string } | null {
  const m = value.match(/^(\d+)(.*)$/);
  if (!m) return null;
  return { n: parseInt(m[1], 10), suffix: m[2] ?? "" };
}

function persistDone() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const animStartedRef = useRef(false);
  const targets = useMemo(
    () => data.items.map((item) => parseStatValue(item.value)!),
    []
  );
  const [counts, setCounts] = useState<number[]>(() => targets.map(() => 0));

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") {
        setCounts(targets.map((t) => t.n));
        return;
      }
    } catch {
      /* storage blocked — still animate once in view */
    }

    const el = ref.current;
    if (!el) return;

    const finishImmediate = () => {
      setCounts(targets.map((t) => t.n));
      persistDone();
    };

    const startAnimation = () => {
      if (animStartedRef.current) return;
      animStartedRef.current = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finishImmediate();
        return;
      }

      const duration = 2000;
      const start = performance.now();

      const step = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - t) * (1 - t);
        setCounts(targets.map((tt) => Math.round(tt.n * eased)));
        if (t < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          persistDone();
        }
      };

      rafRef.current = requestAnimationFrame(step);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        obs.disconnect();
        startAnimation();
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(rafRef.current);
      if (animStartedRef.current) {
        try {
          if (localStorage.getItem(STORAGE_KEY) !== "1") {
            finishImmediate();
          }
        } catch {
          finishImmediate();
        }
      }
    };
  }, [targets]);

  return (
    <div ref={ref} className={styles.row} role="list">
      {data.items.map((item, i) => {
        const t = targets[i];
        return (
          <div key={item.label} className={styles.cell} role="listitem">
            <span className={styles.value}>
              {t ? `${counts[i]}${t.suffix}` : item.value}
            </span>
            <span className={styles.label}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
