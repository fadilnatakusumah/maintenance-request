"use client";

import type React from "react";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface DropdownFieldProps extends ComponentProps<"select"> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const DropdownField = ({
  label,
  error,
  helperText,
  className,
  fullWidth = false,
  ...props
}: DropdownFieldProps) => {
  return (
    <div className={cn("relative", fullWidth ? "w-full" : "")}>
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={cn(
            "appearance-none block px-3 py-2 pr-10 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors",
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "",
            fullWidth ? "w-full" : "",
            className
          )}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown size={18} className="text-gray-500 dark:text-gray-400" />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default DropdownField;
