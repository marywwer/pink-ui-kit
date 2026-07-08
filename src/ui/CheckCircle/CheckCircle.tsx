import styles from "./Styles.module.scss";

type CheckCircleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export function CheckCircle({
  checked,
  onChange,
  label,
  disabled,
}: CheckCircleProps) {
  return (
    <button
      className={`${styles.checkCircle} ${checked ? styles.isChecked : ""}`}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      type="button"
    >
      <span>✓</span>
      {label && <em>{label}</em>}
    </button>
  );
}
