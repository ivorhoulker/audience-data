import React, { useState } from "react";

import EditableQuestion from "../components/EditableQuestion";
import { firestore } from "../Firebase";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Question } from "../types/Question";
import QuestionsForm from "../components/QuestionsForm";

interface Props {}

const SetQuestions: React.FC<Props> = ({}) => {
  const questionsRef = firestore.collection("questions");
  const query = questionsRef.limit(9999);

  const [
    questions,
    questionsLoading,
    questionsError,
  ] = useCollectionData<Question>(query);

  questions && console.log(questions);
  const handleAddQuestion = () => {
    //TODO
    console.log("adding...");
  };
  return (
    <>
      {questionsError && (
        <strong>Error: {JSON.stringify(questionsError)}</strong>
      )}
      {questionsLoading && <span>Collection: Loading...</span>}
      {questions &&
        questions.map((q, i) => {
          return <EditableQuestion key={i} question={q} />;
        })}
      <div>
        <QuestionsForm />
      </div>
    </>
  );
};

export default SetQuestions;
