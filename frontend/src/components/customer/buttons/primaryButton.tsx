type PrimaryButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const PrimaryButton = ({
  onClick,
  children,
  disabled,
  type,
}: PrimaryButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled ?? false}
      onClick={onClick}
      className="bg-primary px-4 py-2 text-white rounded-md font-bold hover:bg-primaryDark text-xl transition-all duration-300 ease-in"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
