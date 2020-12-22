import React from "react";
import AnswerForm from "../components/AnswerForm";
import {
  useFirebase,
  useFirestore,
  useFirestoreConnect,
} from "react-redux-firebase";
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
    return await firestore.collection("questions").add({
      english: "test",
      chinese: "test",
      strength: 1,
      category: "economics",
    });
  }
  console.log("REDUX QUESTIONS FOR REAL: ", questions);
  return (
    <>
      <AnswerForm questions={questions as Question[]} />
      <button onClick={createQuestion}>TEst</button>
    </>
  );
};

export default AnswerQuestions;
