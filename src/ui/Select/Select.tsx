import "./Styles.module.scss";

import { useEffect, useRef, useState } from "react";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  disabled?: boolean;
};

export function Select({
  label,
  value,
  onChange,
  options,
  disabled,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const selectOption = (nextValue: string) => {
    onChange(nextValue);
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={`select-field custom-select ${disabled ? "is-disabled" : ""}`}
    >
      <span className="field__label">{label}</span>
      <button
        className={`custom-select__button ${open ? "is-open" : ""}`}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selectedOption.label}</span>
        <span className="custom-select__chevron" aria-hidden="true" />
      </button>

      {open && !disabled && (
        <div className="custom-select__dropdown" role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              className={`custom-select__option ${option.value === value ? "is-selected" : ""}`}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => selectOption(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
