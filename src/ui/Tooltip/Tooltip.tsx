import "./Styles.module.scss";

import type { PropsWithChildren } from "react";

type TooltipProps = PropsWithChildren<{
  content: string;
}>;

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <span className="tooltip-wrap">
      {children}
      <span className="tooltip" role="tooltip">
        {content}
      </span>
    </span>
  );
}
