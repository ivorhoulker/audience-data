import React from "react";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  type: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <>
      <button
        type={type}
        className={
          "block focus:outline-none bg-green-900 hover:bg-green-800 text-white p-6 rounded-xl transition duration-150 focus:bg-green-700 outline-none " +
          className
        }
        onClick={onClick ? (e) => onClick(e) : undefined}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
