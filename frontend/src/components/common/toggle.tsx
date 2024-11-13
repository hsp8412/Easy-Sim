type Props = {
  value: boolean;
  label?: string;
  name: string;
  setValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

const Toggle = ({value, label, name, setValue}: Props) => {
  const handleChange = () => {
    setValue(name, !value);
  };

  return (
    <div className={""}>
      {label && <p className="text-primary text-xl font-bold mb-2">{label}</p>}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          className="sr-only peer"
          onChange={handleChange}
        />
        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
      </label>
    </div>
  );
};

export default Toggle;
