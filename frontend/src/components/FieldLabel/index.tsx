import clsx from "clsx";
import React, { ComponentProps } from "react";

function FieldLabel({
  children,
  className,
  required,
  ...props
}: ComponentProps<"label"> & { required?: boolean }) {
  return (
    <label className={clsx("block text-steel-blue text-sm", className)} {...props}>
      {children} {required && <span>*</span>}
    </label>
  );
}

export default FieldLabel;
