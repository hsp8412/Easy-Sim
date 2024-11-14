type Props = {
  label: string;
  id: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
};

const Checkbox = ({label, id, checked, setChecked}: Props) => {
  return (
    <div className="flex items-center justify-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
      />
      <label htmlFor={id} className="ms-2 text-sm font-medium text-gray-800">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
