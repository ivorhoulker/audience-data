import React from "react";
import AnswerForm from "../components/AnswerQuestions/AnswerForm";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../app/ReduxStore";
import { Question } from "../types/Question";
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
