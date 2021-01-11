import React from "react";
import Container from "../layout/Container";
import Page from "../layout/Page";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  return (
    <Page>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl lg:text-8xl font-bold align-middle p-3 ">
          Are You R?
        </h1>
      </div>
    </Page>
  );
};

export default Home;
