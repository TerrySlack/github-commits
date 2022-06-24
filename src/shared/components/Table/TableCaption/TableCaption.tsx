import React, { memo, ReactNode } from "react";
import { areEqual } from "Utils/equalityChecks";

interface Props {
  className?: string;
  children: ReactNode;
}
const TableCaption = ({ className, children }: Props) => (
  <caption className={className}>{children}</caption>
);
const TableCaptionMemo = memo(TableCaption, areEqual);
export { TableCaptionMemo as Caption };
