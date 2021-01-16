import React from "react";
import AnswerForm from "../components/AnswerQuestions/AnswerForm";
import Page from "../layout/Page";
import Container from "../layout/Container";
interface Props {}

const AnswerQuestions: React.FC<Props> = () => {
  // useFirestoreConnect([{ collection: "questions" }]);

  return (
    <Page>
      <Container>
        <AnswerForm />
      </Container>
    </Page>
  );
};

export default AnswerQuestions;
