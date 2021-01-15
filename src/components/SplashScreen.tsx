import React from "react";
import Typing from "react-typing-animation";

interface Props {}

const SplashScreen: React.FC<Props> = () => {
  return (
    <div className="flex flex-grow flex-col justify-items-center items-center overflow-y-auto">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl lg:text-8xl font-bold align-middle p-3 ">
          <Typing>Are You R?</Typing>
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
