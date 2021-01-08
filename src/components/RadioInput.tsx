import React, { Ref } from "react";

interface Props {
  id: string;
  value: string;
  handleChange: () => void;
  checked: boolean;
  children: React.ReactChild;
  className?: string;
}

const RadioInput = React.forwardRef<HTMLInputElement, Props>(
  ({ id, value, handleChange, checked, children, className }, ref) => {
    const classList = () => {
      let cls =
        "flex items-center justify-center block h-full w-full overflow-hidden text-base text-center hover:bg-green-500 px-3 py-1 transition ease-in duration-150 w-full " +
        className;
      if (checked) {
        cls += " bg-green-400";
      } else {
        cls += " bg-green-700 ";
      }
      return cls;
    };
    return (
      <>
        <div className=" flex-1 flex-grow pointer-events-auto justify-center items-center ">
          <input
            type="radio"
            className="hidden"
            id={id}
            name={id}
            value={value}
            autoComplete="off"
            ref={ref}
            onChange={handleChange}
          />
          <label className={classList()} htmlFor={id}>
            <span className="py-2 px-1">{children}</span>
          </label>
        </div>
      </>
    );
  }
);

export default RadioInput;
