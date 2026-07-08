import styles from "./Styles.module.scss";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
  }
>;

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variantClass = styles[`btn--${variant}`];
  
  return (
    <button 
      className={`${styles.btn} ${variantClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}
