import "./Styles.module.scss";

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
      className={`check-circle ${checked ? "is-checked" : ""}`}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      type="button"
    >
      <span>✓</span>
      {label && <em>{label}</em>}
    </button>
  );
}
