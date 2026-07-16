import styles from './Styles.module.scss';

type LoaderPageProps = {
  text?: string;
};

export const LoaderPage = ({
  text = 'Собираем букет...',
}: LoaderPageProps) => {
  return (
    <div
      className={styles.loader}
      role="status"
      aria-live="polite"
    >
      <div className={styles.flower}>
        <span className={styles.petal} />
        <span className={styles.petal} />
        <span className={styles.petal} />
        <span className={styles.petal} />
        <span className={styles.center} />
      </div>

      <p>{text}</p>
    </div>
  );
};