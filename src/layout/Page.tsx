import React from "react";
import Navbar from "../components/Navbar";

const Page: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-grow flex-col justify-items-center items-center overflow-y-auto solid-lines">
        {children}
      </div>
    </>
  );
};

export default Page;
