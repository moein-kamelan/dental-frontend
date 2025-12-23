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
    "max-md:max-w-[630px] max-sm:max-w-[470px] max-xs:!max-w-[290px] mx-auto overflow-x-auto border border-[#5e5b5b17] rounded-xl shadow-sm custom-scrollbar ";

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
