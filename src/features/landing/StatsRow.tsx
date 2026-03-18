import data from "../../data/stats.json";
import styles from "./StatsRow.module.css";

export function StatsRow() {
  return (
    <div className={styles.wrap}>
    <div className={styles.row} role="list">
      {data.items.map((item) => (
        <div key={item.label} className={styles.cell} role="listitem">
          <span className={styles.value}>{item.value}</span>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
    </div>
  );
}
