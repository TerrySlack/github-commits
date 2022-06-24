import React, { memo, ReactNode } from "react";
import { areEqual } from "Utils/equalityChecks";

interface Props {
  className?: string;
  children: ReactNode;
}
const TableFooter = ({ className, children }: Props) => (
  <tfoot className={className}>{children}</tfoot>
);
const TableFooterMemo = memo(TableFooter, areEqual);
export { TableFooterMemo as TFoot };
