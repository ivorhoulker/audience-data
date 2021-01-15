import React from "react";

interface Props {
  percentage: number;
  leftLabel: string;
  rightLabel: string;
  category: string;
}

const ProgressBar: React.FC<Props> = ({
  percentage,
  leftLabel,
  rightLabel,
  category,
}) => {
  const widths = () => {
    //50 = 50, 0, 50
    //25 = 25, 25, 50
    //70 = 50, 20, 30

    if (percentage > 50) {
      const base = percentage - 50;
      const remain = 50 - base;
      return [50, base, remain];
    }
    if (percentage < 50) {
      const remain = 50 - percentage;
      return [percentage, remain, 50];
    }
    return [50, 0, 50];
  };
  const fakePercentage = () => {
    return Math.round(Math.abs((percentage - 50) * 2));
  };
  const leftClass = () => {
    if (percentage < 50) return " flex-1 text-white ";
    return " flex1-1 text-gray-400";
  };
  const rightClass = () => {
    if (percentage > 50) return " text-right flex-1 text-white ";
    return " text-right flex-1 text-gray-400";
  };
  return (
    <div className="py-1 w-full px-5">
      <div className="relative h-6">
        <div className="absolute overflow-hidden h-full w-full flex rounded">
          <div
            style={{ width: `${widths()[0]}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-600"
          ></div>
          <div
            style={{ width: `${widths()[1]}%` }}
            className="relative shadow-none text-xs overflow-visible flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
          >
            <span
              className={
                percentage < 50
                  ? "text-right absolute h-full top-0 left-0 right-0 bottom-0 p-1"
                  : "text-left absolute h-full top-0 left-0 right-0 bottom-0 p-1"
              }
            >
              {fakePercentage()}%
            </span>
          </div>
          <div
            style={{ width: `${widths()[2]}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-600"
          ></div>
        </div>
        <div className="absolute  h-full w-full rounded flex mb-2 items-center ">
          <div className={leftClass()}>
            <span className="px-1 text-xs font-semibold inline-block ">
              {/* {percentage < 50 && fakePercentage() + "% "} */}
              {leftLabel}
            </span>
          </div>

          <div className={rightClass()}>
            <span className="px-1 text-xs font-semibold inline-block ">
              {rightLabel}
              {/* {percentage > 50 && " " + fakePercentage() + "%"} */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
