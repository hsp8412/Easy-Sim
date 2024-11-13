import { FC, ReactNode } from "react";

interface CardProps {
  header?: string | null;
  cdivs?: cardDiv[];
}

interface cardDiv {
  title?: string | null;
  content: ReactNode;
  buttonText?: string | null;
  onClick?: () => void;
}

const AddDiv: FC<cardDiv> = ({ title, content, buttonText, onClick }) => {
  return (
    <div className="bg-gray-100 p-4">
      <h5 className="text-lg font-bold mb-2">{title}</h5>
      <p className="mb-4">{content}</p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

const Card: FC<CardProps> = ({ header, cdivs }) => (
  <div className="w-full sm:w-1/2 md:w-1/3 p-4 text-black">
    <div className="border border-gray-300 rounded-lg shadow-lg grid divide-y divide-gray-400">
      {header ? (
        <div className="bg-gray-100 p-4 font-semibold">{header}</div>
      ) : null}
      {cdivs && cdivs.map((cdiv, index) => <AddDiv key={index} {...cdiv} />)}
    </div>
  </div>
);

export default Card;
