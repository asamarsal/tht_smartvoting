import type { SelectHTMLAttributes } from "react";

interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
}

interface DropdownProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "onChange"
> {
  label?: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

export default function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  error,
  className = "",
  ...props
}: DropdownProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={props.id}
          className="block text-lg font-semibold text-gray-800 mb-4 text-center"
        >
          {label}
        </label>
      )}

      <div className="flex justify-center">
        <div className="relative w-full max-w-lg">
          <select
            {...props}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`
              w-full px-6 py-3 pr-12 text-lg 
              border-2 border-gray-300 rounded-xl 
              focus:rounded-b-none
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              outline-none transition-all duration-200 bg-white 
              hover:border-blue-400 cursor-pointer shadow-sm
              appearance-none
              ${error ? "border-red-500 focus:ring-red-500" : ""}
            `}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.icon && `${option.icon} `}
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom Chevron Icon */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}
