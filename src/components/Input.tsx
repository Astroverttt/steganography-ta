import type { InputHTMLAttributes } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  required?: boolean;
  id: string;
};

export default function Input({
  label,
  error,
  className = "",
  isPassword = false,
  showPassword = false,
  onTogglePassword,
  required = false,
  id,
  ...props
}: InputProps) {
  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : props.type;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {inputType === "description" ? (
          <textarea
            id={id}
            name={props.name || id}
            placeholder={props.placeholder}
            className={`w-full px-4 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200`}
          />
        ) : (
          <input
            id={id}
            name={props.name || id}
            type={inputType}
            className={`w-full px-4 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200`}
            {...props}
          />
        )}
        {isPassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

Input.displayName = "Input";
