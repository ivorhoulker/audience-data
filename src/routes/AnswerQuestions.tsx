import React from "react";
import AnswerForm from "../components/AnswerForm";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Question } from "../types/Question";
interface Props {}

const AnswerQuestions: React.FC<Props> = ({}) => {
  useFirestoreConnect([
    { collection: "questions" }, // or 'todos'
  ]);
  const questions = useSelector<RootState>(
    (state) => state.firestore.ordered.questions
  );
  console.log("REDUX QUESTIONS FOR REAL: ", questions);
  return (
    <>
      <AnswerForm questions={questions as Question[]} />
    </>
  );
};

export default AnswerQuestions;
