"use client";
type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  red?: boolean;
};

const MyButton = ({onClick, children, red}: Props) => {
  return (
    <button
      className={`px-4 py-2 rounded-xl ${
        red ? "bg-red-600 hover:bg-red-500" : "bg-primary hover:bg-primaryDark"
      } text-white flex justify-center items-center gap-2`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MyButton;
