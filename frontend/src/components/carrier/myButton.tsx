"use client";
type Props = {
  onClick?: () => void;
  children: React.ReactNode;
};

const MyButton = ({onClick, children}: Props) => {
  return (
    <button
      className="px-4 py-2 rounded-xl bg-primary hover:bg-primaryDark text-white flex justify-center items-center gap-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MyButton;
