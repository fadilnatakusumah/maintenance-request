import clsx from "clsx";
import { ComponentProps } from "react";

function Label({
  className,
  color = "green",
  children,
  ...props
}: ComponentProps<"div"> & { color: "green" | "gray" }) {
  return (
    <div
      className={clsx(
        "px-2.5 py-0.5 text-xs text-white rounded-full mt-2.5 flex justify-center items-center",
        color === "green" && "bg-teal-oasis",
        color === "gray" && "bg-steel-blue",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Label;
