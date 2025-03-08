import { ChevronDown } from "lucide-react";
import { ComponentProps } from "react";

interface DropdownOption {
  value: string;
  label: string;
}

function DropdownField({
  options,
  placeholder = "Select a dropdown option",
  ...props
}: ComponentProps<"select"> & {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className="relative text-sm">
      <select
        className="w-full bg-white border-none appearance-none p-4 rounded-xl shadow-md"
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option
            className="cursor-pointer"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <ChevronDown className="text-steel-blue" />
      </span>
    </div>
  );
}

export default DropdownField;
