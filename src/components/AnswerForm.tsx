import React from "react";

import { Question } from "../types/Question";

import AnswerGroup from "./AnswerGroup";
interface Props {
  questions: Question[];
}

const AnswerQuestions: React.FC<Props> = ({ questions }) => {
  return (
    <>
      {/* {questionsError && (
        <strong>Error: {JSON.stringify(questionsError)}</strong>
      )}
      {questionsLoading && <span>Collection: Loading...</span>}
      {questions &&
        questions.map((q, i) => {
          return <EditableQuestion key={i} question={q} />;
        })} */}
      <form>
        <div className="container-fluid mb-3">
          {questions &&
            questions.map((question, i) => (
              <div key={i} className="card mb-3 bg-light">
                <div className="card-body">
                  <div className="col-md-6">
                    <blockquote>{question.english}</blockquote>

                    <AnswerGroup question={question}></AnswerGroup>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </form>
    </>
  );
};

export default AnswerQuestions;
