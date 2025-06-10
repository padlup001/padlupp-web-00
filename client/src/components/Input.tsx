import type { ChangeEvent } from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
}

export const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  showPasswordToggle = false,
  className = "",
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const validateInput = (value: string): string => {
    if (required && !value.trim()) {
      return "Required field";
    }

    switch (type) {
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email address";
        }
        break;
      case "password":
        if (value && value.length < 8) {
          return "Password must be at least 8 characters";
        }
        if (value && !/[A-Z]/.test(value)) {
          return "Password must contain at least one uppercase letter";
        }
        if (value && !/[a-z]/.test(value)) {
          return "Password must contain at least one lowercase letter";
        }
        if (value && !/[0-9]/.test(value)) {
          return "Password must contain at least one number";
        }
        if (value && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          return "Password must contain at least one special character";
        }
        break;
    }
    return "";
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsDirty(true);
  };

  const validationError = isDirty ? validateInput(value) : error;
  const showError = validationError || error;

  const fieldsetBorderClasses = showError
    ? "border-red-500"
    : isFocused
    ? "border-[#4E92F4]"
    : "border-gray-300";

  const legendTextClasses = showError
    ? "text-red-500"
    : isFocused
    ? "text-[#4E92F4]"
    : "text-gray-600";

  return (
    <div className={`relative ${className}`}>
      <fieldset
        className={`
          border rounded-lg pt-1 pb-0 px-0 relative
          ${fieldsetBorderClasses}
          transition-all duration-200
        `}
      >
        {label && (
          <legend
            className={`
              text-sm font-medium px-1 ml-3 
              bg-white
              transition-all duration-200
              ${legendTextClasses}
            `}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </legend>
        )}
        <div className="relative px-3 pb-2">
          <input
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            className={`
              w-full bg-transparent text-gray-900 placeholder-gray-400
              focus:outline-none focus:ring-0 border-0 outline-0
              text-lg py-3
              ${className}
            `}
          />
          {showPasswordToggle && type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
      </fieldset>
      {showError && (
        <p className="mt-1 text-sm text-red-500 pl-4">
          {validationError || error}
        </p>
      )}
    </div>
  );
};
