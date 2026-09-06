import React from "react";

interface TableContainerProps {
  children: React.ReactNode;
  className?: string;
  withBg?: boolean;
  withMargin?: boolean;
}

function TableContainer({
  children,
  className = "",
  withBg = false,
  withMargin = false,
}: TableContainerProps) {
  const baseClasses =
    "admin-table-shell w-full max-w-full mx-auto overflow-x-auto custom-scrollbar";

  const classes = [
    baseClasses,
    withBg && "bg-white",
    withMargin && "mb-6",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}

export default TableContainer;
