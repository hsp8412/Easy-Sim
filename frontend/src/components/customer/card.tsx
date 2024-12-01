import React, { FC, ReactNode } from "react";

interface CardProps {
  header?: string | null;
  cdivs?: cardDiv[];
}

interface cardDiv {
  title?: string | null;
  content?: ReactNode[];
  buttonText?: string | null;
  onClick?: () => void;
}

const AddDiv: FC<cardDiv> = ({ title, content, buttonText, onClick }) => {
  return (
    <div className="bg-gray-100 p-4 flex flex-col justify-between">
      {title && <h5 className="text-lg font-bold mb-2">{title}</h5>}
      <div className="flex-grow overflow-y-auto mb-4">
        {content && content.map((node, index) => <div key={index}>{node}</div>)}
      </div>
      {buttonText && (
        <button
          className="bg-[#00A2FF] text-white py-1 px-4 rounded-full hover:bg-blue-600 transition-all duration-300 ease-in"
          onClick={onClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

const Card: FC<CardProps> = ({ header, cdivs }) => (
  <div className="w-full sm:w-1/2 md:w-1/3 p-4">
    <div className="h-5/6 border border-gray-300 bg-gray-100 rounded-lg shadow-lg flex flex-col divide-y divide-gray-400">
      {header && (
        <div className="bg-gray-100 p-4 font-semibold text-center rounded-t-lg">
          {header}
        </div>
      )}
      <div className="flex-grow overflow-y-auto divide-y divide-gray-400">
        {cdivs && cdivs.map((cdiv, index) => <AddDiv key={index} {...cdiv} />)}
      </div>
    </div>
  </div>
);

export default Card;
