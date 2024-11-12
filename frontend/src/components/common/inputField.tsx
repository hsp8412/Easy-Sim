import {ChangeEvent} from "react";

type Props = {
  id: string;
  label: string;
  name: string;
  required: boolean;
  type: "email" | "text" | "password" | "number" | "checkbox";
  handleChange: (event: ChangeEvent<any>) => void;
  handleBlur: (event: ChangeEvent<any>) => void;
  value: string | number;
  error: string | undefined;
  touched: boolean | undefined;
  checked?: boolean | false;
};

const InputField = ({
  id,
  label,
  name,
  required,
  type,
  handleChange,
  handleBlur,
  value,
  error,
  touched,
  checked,
}: Props) => {
  return (
    <div className="w-full px-3 mt-6">
      <label
        className="block tracking-wide text-primary text-xl font-bold mb-2"
        htmlFor={id}
      >
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <input
        className={
          type != "checkbox"
            ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-white focus:outline-none focus:ring-primary focus:border-2 focus:border-primary block w-full p-2.5"
            : "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
        }
        id={id}
        type={type}
        name={String(name)}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        checked={checked}
      />
      {touched && error && <p className="text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
