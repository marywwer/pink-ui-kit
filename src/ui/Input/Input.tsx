import type { InputHTMLAttributes } from "react";
import styles from "./Styles.module.scss";

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
};

export function Input({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  disabled,
  type = "text",
  id,
  ...props
}: InputProps) {
  const inputId = id || `field-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <label
      className={`${styles.field} ${disabled ? styles.isDisabled : ""}`}
      htmlFor={inputId}
    >
      <span className={styles.field__label}>{label}</span>

      <input
        {...props}
        id={inputId}
        className={styles.field__input}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      />

      {helperText && (
        <small className={styles.field__helper}>{helperText}</small>
      )}
    </label>
  );
}
