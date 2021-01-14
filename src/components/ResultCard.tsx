import React from "react";
import ProgressBar from "./ProgressBar";

interface Props {
  name: string;
  results: any;
  id: string;
}

const ResultCard: React.FC<Props> = ({ name, results, id }) => {
  console.log("results", results);
  const { economics, culture, government } = results;
  return (
    <>
      <div
        id={id}
        className="flex flex-col bg-gray-700 mb-10 rounded-2xl shadow-2xl w-full "
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl p-12 font-bold">{name}</h2>
          <small className="text-xs text-gray-400 p-12">{id}</small>
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
