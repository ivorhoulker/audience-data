import React from "react";
import ProgressBar from "./ProgressBar";

interface Props {
  name: string;
  results: any;
  id: string;
}

const ResultCard: React.FC<Props> = ({ name, results, id }) => {
  console.log("results", results);
  const HARMLESS = "Mostly harmless";
  const { economics, culture, government } = results;
  const label = () => {
    let output = [];
    if (economics < 40) {
      output.push("communist");
    }
    if (economics > 60) {
      output.push("capitalist");
    }
    if (government < 40) {
      output.push("anarchist");
    }
    if (government > 60) {
      output.push("dictator");
    }
    if (culture < 40) {
      output.push("postmodernist");
    }
    if (culture > 60) {
      output.push("conservative");
    }
    const result = output.join(", ");
    const capped =
      "Warning: " + result.charAt(0).toUpperCase() + result.slice(1);
    return output.length ? capped : HARMLESS;
  };
  const labelClass = () => {
    if (label() === HARMLESS) return " text-green-400";
    return " text-red-400";
  };
  return (
    <>
      <div
        id={id}
        className="flex flex-col bg-gray-700 mb-10 rounded-2xl shadow-2xl w-full "
      >
        <div className="flex items-start justify-between my-4">
          <h2 className="text-2xl px-6 font-bold">{name}</h2>
          <div className="flex flex-col px-6 items-end justify-items-end">
            <small className="block text-xs text-gray-400 p-1 break-all">
              {id}
            </small>
            <small className={"block text-xs p-1 break-all" + labelClass()}>
              {label()}
            </small>
          </div>
        </div>
        <div className="pb-5">
          <ProgressBar
            category="culture"
            leftLabel="liberal"
            rightLabel="traditionalist"
            percentage={culture}
          />
          <ProgressBar
            category="economics"
            leftLabel="left"
            rightLabel="right"
            percentage={economics}
          />
          <ProgressBar
            category="government"
            leftLabel="libertarian"
            rightLabel="authoritarian"
            percentage={government}
          />
        </div>
      </div>
    </>
  );
};

export default ResultCard;
