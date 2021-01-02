import React from "react";
import AnswerForm from "../components/AnswerForm";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Question } from "../types/Question";
interface Props {}

const AnswerQuestions: React.FC<Props> = ({}) => {
  useFirestoreConnect([{ collection: "questions" }]);
  const questions = useSelector<RootState>(
    (state) => state.firestore.ordered.questions
  );
  const firestore = useFirestore();

  async function createQuestion() {
    // return await firestore.collection("questions").add({
    //   english: "test",
    //   chinese: "test",
    //   strength: 1,
    //   category: "economics",
    // });
  }

  return (
    <>
      <AnswerForm questions={questions as Question[]} />
    </>
  );
};

export default AnswerQuestions;
