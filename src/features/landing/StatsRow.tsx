import { useLayoutEffect, useState } from "react";
import data from "../../data/stats.json";
import styles from "./StatsRow.module.css";

function parseStatValue(value: string): { n: number; suffix: string } | null {
  const m = value.match(/^(\d+)(.*)$/);
  if (!m) return null;
  return { n: parseInt(m[1], 10), suffix: m[2] ?? "" };
}

function AnimatedStatValue({ value }: { value: string }) {
  const parsed = parseStatValue(value);
  const [n, setN] = useState(0);

  useLayoutEffect(() => {
    const p = parseStatValue(value);
    if (!p) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setN(p.n);
      return;
    }

    setN(0);
    const duration = 2000;
    const start = performance.now();
    let raf = 0;

    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) * (1 - t);
      setN(Math.round(p.n * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  if (!parsed) {
    return <span className={styles.value}>{value}</span>;
  }

  return (
    <span className={styles.value}>
      {n}
      {parsed.suffix}
    </span>
  );
}

export function StatsRow() {
  return (
    <div className={styles.row} role="list">
      {data.items.map((item) => (
        <div key={item.label} className={styles.cell} role="listitem">
          <AnimatedStatValue value={item.value} />
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
