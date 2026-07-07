import "./Styles.module.scss";

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
    <label className={`radio ${disabled ? "is-disabled" : ""}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
      />
      <span className="radio__dot" aria-hidden="true" />
      <span className="control-label">{label}</span>
    </label>
  );
}
