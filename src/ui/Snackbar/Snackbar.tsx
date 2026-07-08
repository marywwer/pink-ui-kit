import styles from "./Styles.module.scss";

type SnackbarItem = {
  id: number;
  title?: string;
  message: string;
  leaving?: boolean;
};

type SnackbarProps = {
  items: SnackbarItem[];
  onClose: (id: number) => void;
};

export function Snackbar({ items, onClose }: SnackbarProps) {
  return (
    <div className={styles.snackbarStack} aria-live="polite" aria-atomic="false">
      {items.map((item) => (
        <div
          key={item.id}
          className={`${styles.snackbar} ${styles.isOpen} ${item.leaving ? styles.isLeaving : ""}`}
          role="status"
        >
          <div>
            {item.title && <strong>{item.title}</strong>}
            <span>{item.message}</span>
          </div>
          <button
            type="button"
            onClick={() => onClose(item.id)}
            aria-label="Закрыть"
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}
