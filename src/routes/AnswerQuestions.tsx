import React from "react";
import AnswerForm from "../components/AnswerForm";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Question } from "../types/Question";
import Page from "../layout/Page";
import Container from "../layout/Container";
interface Props {}

const AnswerQuestions: React.FC<Props> = ({}) => {
  useFirestoreConnect([{ collection: "questions" }]);
  const questions = useSelector<RootState>(
    (state) => state.firestore.ordered.questions
  );
  const uid = useSelector<RootState>(
    (state) => state.firebase.auth.uid
  ) as string;
  return (
    <Page>
      <Container>
        <AnswerForm uid={uid} questions={questions as Question[]} />
      </Container>
    </Page>
  );
};

export default AnswerQuestions;
