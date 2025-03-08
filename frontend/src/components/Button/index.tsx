import clsx from "clsx";
import React, { ComponentProps } from "react";

function Button({ className, children, ...props }: ComponentProps<"button">) {
  return (
    <button
      className={clsx(
        "cursor-pointer  rounded-lg bg-teal-oasis text-white w-[268px] h-[48px]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
