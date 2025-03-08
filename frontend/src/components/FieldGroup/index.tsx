import clsx from "clsx";
import React from "react";

function FieldGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx("mb-6", className)}>{children}</div>;
}

export default FieldGroup;
