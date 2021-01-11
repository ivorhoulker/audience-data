import React from "react";
import "./BlinkingCursor.css";
interface Props {}

const BlinkingCursor: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="blink inline-block bg-white w-3 h-full -mb-1 "> </div>
    </>
  );
};

export default BlinkingCursor;
