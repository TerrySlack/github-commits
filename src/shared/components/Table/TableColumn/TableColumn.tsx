import React, { memo, ReactNode } from "react";
import { areEqual } from "Utils/equalityChecks";

interface Props {
  className?: string;
  title?: string;
  children: ReactNode;
}
const TableColumn = ({ className, title, children }: Props) => (
  <td className={className} title={title}>
    {children}
  </td>
);
const TableColumnMemo = memo(TableColumn, areEqual);
export { TableColumnMemo as TD };
