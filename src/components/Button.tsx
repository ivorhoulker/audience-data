import React from "react";

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

const Button: React.FC<Props> = ({ children, onClick }) => {
  return (
    <>
      <button
        className={
          "block  bg-green-900 hover:bg-green-800 text-white p-6 rounded-xl transition duration-150 focus:bg-blue-800"
        }
        onClick={(e) => onClick(e)}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
