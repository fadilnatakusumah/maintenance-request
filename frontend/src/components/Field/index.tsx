import clsx from "clsx";
import React, { ComponentProps } from "react";

function Field({
  className,
  textarea: isTextArea,
  ...props
}: ComponentProps<"input" | "textarea"> & { textarea?: boolean }) {
  if (isTextArea) {
    return (
      <textarea
        className={clsx(
          "w-full bg-white border-none appearance-none p-4 rounded-xl shadow-md overflow-clip",
          className
        )}
        {...(props as ComponentProps<"textarea">)}
      />
    );
  }

  return (
    <input
      className={clsx(
        "w-full bg-white border-none appearance-none p-4 rounded-xl shadow-md",
        className
      )}
      {...(props as ComponentProps<"input">)}
    />
  );
}

export default Field;
