import styles from "./Styles.module.scss";

import type { PropsWithChildren } from "react";

type TooltipProps = PropsWithChildren<{
  content: string;
}>;

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <span className={styles.tooltipWrap}>
      {children}
      <span className={styles.tooltip} role="tooltip">
        {content}
      </span>
    </span>
  );
}