import React, { useState } from "react";

import QuestionComponent from "../components/Question";
import { firestore } from "../Firebase";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Question } from "../types/Question";

interface Props {}

const SetQuestions: React.FC<Props> = ({}) => {
  const questionsRef = firestore.collection("questions");
  const query = questionsRef.limit(9999);

  const [
    questions,
    questionsLoading,
    questionsError,
  ] = useCollectionData<Question>(query);

  console.log(questions);
  const handleSubmit = () => {};
  return (
    <>
      {questionsError && (
        <strong>Error: {JSON.stringify(questionsError)}</strong>
      )}
      {questionsLoading && <span>Collection: Loading...</span>}
      {questions &&
        questions.map((q, i) => {
          return <QuestionComponent question={q} />;
        })}
    </>
  );
};

export default SetQuestions;
