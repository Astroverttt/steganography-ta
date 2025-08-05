type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  placeholder: string;
  className?: string;
  label?: string;
  id: string;
  options: { value: string; label: string }[];
  required?: boolean;
};

export default function Select({
  placeholder,
  className,
  label,
  id,
  options,
  required = false,
  ...props
}: SelectProps) {
  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={props.name || id}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-[#14110D]/10 focus:border-transparent outline-none transition-all duration-200"
        required={required}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
