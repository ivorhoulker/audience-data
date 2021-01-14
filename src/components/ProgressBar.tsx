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
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
          ></div>
          <div
            style={{ width: `${widths()[2]}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-600"
          ></div>
        </div>
        <div className="absolute  h-full w-full flex rounded flex mb-2 items-center ">
          <div className="flex-1">
            <span className="text-xs font-semibold inline-block text-gray-400">
              {leftLabel}
            </span>
          </div>

          <div className="text-right flex-1">
            <span className="text-xs font-semibold inline-block  text-gray-400">
              {rightLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
