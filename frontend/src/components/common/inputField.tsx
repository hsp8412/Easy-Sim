import {ChangeEvent} from "react";

type Props = {
  id: string;
  width: string;
  type: "email" | "text" | "password" | "number";
  name: string;
  handleChange: (event: ChangeEvent<any>) => void;
  handleBlur: (event: ChangeEvent<any>) => void;
  value: string | number;
  disabled?: boolean;
};

const InputField = ({
  id,
  type,
  name,
  width,
  handleChange,
  handleBlur,
  value,
  disabled,
}: Props) => {
  return (
    <input
      className={`${
        disabled ? "bg-neutral-200" : "bg-white"
      } border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-none focus:ring-primary focus:border-2 focus:border-primary block p-2.5`}
      id={id}
      type={type}
      name={String(name)}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      style={{width: width}}
      disabled={disabled}
    />
  );
};

export default InputField;
