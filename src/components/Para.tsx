import React from "react";

interface Props {}

const Para: React.FC<Props> = ({ children }) => {
  return <p className="mb-12">{children}</p>;
};

export default Para;
