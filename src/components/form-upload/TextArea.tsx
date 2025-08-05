import React from "react";

interface TextAreaProps {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  containerClassName?: string;
  labelClassName?: string;
  textareaClassName?: string;
  counterClassName?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  required = false,
  placeholder = "",
  maxLength = 300,
  value = "",
  onChange = () => {},
  containerClassName = "flex flex-col gap-2",
  labelClassName = "w-max text-sm xl:text-base font-normal",
  textareaClassName = "h-56 px-3 py-2 border border-gray-300 placeholder:text-gray-400 text-sm xl:text-base focus:outline-0 focus:ring-1 focus:ring-black transition-all duration-200 rounded-lg",
  counterClassName = "font-light text-xs xl:text-sm text-gray-400",
}) => {
  return (
    <div className={containerClassName}>
      <div className="flex justify-between items-center">
        <label htmlFor={name} className={labelClassName}>
          {label}
        </label>
        <span className={counterClassName}>
          {value.length}/{maxLength}
        </span>
      </div>
      <textarea
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        className={textareaClassName}
      />
    </div>
  );
};
