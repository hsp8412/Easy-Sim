import {ChangeEvent} from "react";

type Props = {
  id: string;
  width: string;
  height: string;
  name: string;
  handleChange: (event: ChangeEvent<any>) => void;
  handleBlur: (event: ChangeEvent<any>) => void;
  value: string | number;
};

const InputTextarea = ({
  id,
  name,
  width,
  height,
  handleChange,
  handleBlur,
  value,
}: Props) => {
  return (
    <textarea
      className={
        "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-none focus:ring-primary focus:border-2 focus:border-primary block p-2.5"
      }
      id={id}
      name={String(name)}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      style={{width: width, height: height}}
    />
  );
};

export default InputTextarea;
