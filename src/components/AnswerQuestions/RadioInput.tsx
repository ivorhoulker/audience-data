import React from "react";
interface Props {
  id: string;
  value: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  children: React.ReactChild;
  className?: string;
  index: number;
}

const RadioInput = React.forwardRef<HTMLInputElement, Props>(
  ({ index, id, value, handleChange, checked, children, className }, ref) => {
    const classList = () => {
      let cls =
        "cursor-pointer pointer-events-auto flex items-center justify-center block h-full w-full overflow-hidden text-base text-center x-3 py-1 transition ease-in duration-150 w-full " +
        className;
      if (checked) {
        cls += " bg-green-600 hover:bg-green-700 ";
      } else if (!checked) {
        cls += " bg-green-800 hover:bg-green-700 ";
      }

      return cls;
    };
    return (
      <>
        <div className="flex-1 flex-grow bg-pointer-events-auto justify-center items-center ">
          <input
            type="radio"
            className="hidden"
            id={id + "id" + index}
            name={id}
            value={value}
            autoComplete="off"
            ref={ref}
            onChange={handleChange ?? undefined}
          />
          <label className={classList()} htmlFor={id + "id" + index}>
            <span className="py-2 px-1">{children}</span>
          </label>
        </div>
      </>
    );
  }
);

export default RadioInput;
