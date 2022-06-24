import React, { memo, ReactNode } from "react";
import { areEqual } from "Utils/equalityChecks";

interface Props {
  className?: string;
  scope?: string;
  children: ReactNode;
}
const Th = ({ className, scope, children }: Props) => (
  <th className={className} scope={scope}>
    {children}
  </th>
);

Th.defaultProps = {
  scope: undefined,
};

const ThMemo = memo(Th, areEqual);
export { ThMemo as TH };
