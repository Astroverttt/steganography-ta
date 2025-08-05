import React from "react";

interface InputGroupProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  label,
  name,
  type = "text",
  placeholder = "",
  required = false,
  value = "",
  onChange = () => {},
  containerClassName = "flex flex-col gap-2",
  labelClassName = "w-max text-sm xl:text-base font-normal",
  inputClassName = "px-3 py-2 border border-gray-300 placeholder:text-gray-400 text-sm xl:text-base focus:outline-0 focus:ring-1 focus:ring-black rounded-lg",
}) => {
  return (
    <div className={containerClassName}>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClassName}
      />
    </div>
  );
};
