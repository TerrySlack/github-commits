import React, { memo, ReactNode } from "react";
import { areEqual } from "Utils/equalityChecks";

interface Props {
  className?: string;
  children: ReactNode;
}
const TableHeader = ({ className, children }: Props) => (
  <thead className={className}>{children}</thead>
);

const TableHeaderMemo = memo(TableHeader, areEqual);
export { TableHeaderMemo as THead };
