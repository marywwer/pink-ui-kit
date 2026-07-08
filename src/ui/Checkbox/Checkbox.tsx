import styles from "./Styles.module.scss";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
};

export function Checkbox({
  checked,
  onChange,
  label,
  disabled,
}: CheckboxProps) {
  return (
    <label className={`${styles.checkbox} ${disabled ? styles.isDisabled : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className={styles.checkbox__box} aria-hidden="true">
        ✓
      </span>
      <span className={styles.controlLabel}>{label}</span>
    </label>
  );
}
