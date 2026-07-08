import styles from "./Styles.module.scss";

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export function Toggle({ checked, onChange, label, disabled }: ToggleProps) {
  return (
    <label className={`${styles.toggle} ${disabled ? styles.isDisabled : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className={styles.toggle__track}>
        <span className={styles.toggle__thumb} />
      </span>
      {label && <span className={styles.controlLabel}>{label}</span>}
    </label>
  );
}
