import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/ReduxStore";

import NameForm from "../components/NameForm";

import Para from "../layout/Para";
import Container from "../layout/Container";
import Page from "../layout/Page";

interface Props {}

const Home: React.FC<Props> = () => {
  const uid = useSelector<RootState>(
    (state) => state.firebase.auth.uid
  ) as string;

  return (
    <Page>
      <Container>
        <Para>Welcome, fellow human.</Para>
        <Para>
          In order to establish harmonious understanding, please answer the
          questions assigned to you.
        </Para>
        <Para>
          Begin by stating your name and/or model number.
          {/* <BlinkingCursor /> */}
        </Para>
        <div className="pb-3">
          <NameForm uid={uid} />
        </div>
      </Container>
    </Page>
  );
};

export default Home;
