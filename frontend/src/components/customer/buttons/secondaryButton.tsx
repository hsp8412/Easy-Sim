type SecondaryButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const SecondaryButton = ({
  onClick,
  children,
  disabled,
  type,
}: SecondaryButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled ?? false}
      onClick={onClick}
      className="bg-white px-2 py-1.5 box-border border-[3px] border-primary text-primary rounded-md font-bold hover:bg-primary hover:text-white text-xl transition-all duration-300 ease-in"
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
