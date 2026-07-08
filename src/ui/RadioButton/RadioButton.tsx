import styles from "./Styles.module.scss";

type RadioButtonProps = {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  disabled?: boolean;
};

export function RadioButton({
  name,
  value,
  checked,
  onChange,
  label,
  disabled,
}: RadioButtonProps) {
  return (
    <label className={`${styles.radio} ${disabled ? styles.isDisabled : ""}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
      />
      <span className={styles.radio__dot} aria-hidden="true" />
      <span className={styles.controlLabel}>{label}</span>
    </label>
  );
}
