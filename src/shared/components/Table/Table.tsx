import React, { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export const Table = ({ className, children }: Props) => (
  <table className={className}>{children}</table>
);
