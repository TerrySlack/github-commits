import React, { memo, ReactNode } from "react";
import { areEqual } from "Utils/equalityChecks";

interface Props {
  className?: string;
  children: ReactNode;
}
const TableBody = ({ className, children }: Props) => (
  <tbody className={className}>{children}</tbody>
);

const TableBodyMemo = memo(TableBody, areEqual);
export { TableBodyMemo as TBody };
