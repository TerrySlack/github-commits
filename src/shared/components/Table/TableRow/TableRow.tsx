import React, { memo, ReactNode, MouseEvent } from "react";
import { areEqual } from "Utils/equalityChecks";

interface Props {
  className?: string;
  dataId?: number;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLTableRowElement>) => void;
}

const TableRow = ({ className, dataId, children, onClick }: Props) => (
  <tr className={className} data-id={dataId} onClick={onClick}>
    {children}
  </tr>
);

TableRow.defaultProps = {
  dataId: null,
  onClick: null,
};

const TableRowMemo = memo(TableRow, areEqual);
export { TableRowMemo as TR };
