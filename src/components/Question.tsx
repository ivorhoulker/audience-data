import React from "react";
import { Question as QuestionType } from "../types/Question";

const QuestionComponent: React.FC<{ question: QuestionType }> = ({
  question,
}) => {
  return (
    <>
      <ul>
        <li>{question.question}</li>
        <li>{question.category}</li>
      </ul>
    </>
  );
};

export default QuestionComponent;
