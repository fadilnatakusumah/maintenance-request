import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";

function Skeleton({ className, ...props }: ComponentProps<"div">) {
  const baseClasses = cn(
    "bg-gray-200 dark:bg-gray-700",
    "animate-pulse",
    className
  );

  return (
    <div className={baseClasses} {...props}>
      &nbsp;
    </div>
  );
}

export default Skeleton;
